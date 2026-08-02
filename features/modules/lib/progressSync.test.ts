import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { emptyTab, type TabAnswers } from "../store/answerStore"
import { triggerTabUnlockIfComplete, syncTabProgress } from "./progressSync"

// Hoisted mocks so store behavior is configurable per test.
const store = vi.hoisted(() => {
  const getTabAnswers = vi.fn()
  const setProgress = vi.fn()
  return { getTabAnswers, setProgress }
})

vi.mock("../store/answerStore", () => ({
  useAnswerStore: {
    getState: () => ({ getTabAnswers: store.getTabAnswers }),
  },
  emptyTab: (slug: string, tab: string) => ({
    slug,
    tab,
    percobaan: { fields: {}, isChecked: false, status: "unsubmitted", attempt: 1 },
    pengamatan: { fields: {}, isChecked: false, status: "unsubmitted", attempt: 1 },
    penyimpulan: { fields: {}, isChecked: false, status: "unsubmitted", attempt: 1 },
    cekPemahaman: { selections: [], isChecked: false },
  }),
}))

vi.mock("../store/tabProgressStore", () => ({
  useTabProgressStore: {
    getState: () => ({ setProgress: store.setProgress }),
  },
}))

const fetchMock = vi.fn()
vi.stubGlobal("fetch", fetchMock)

function terminalTab(overrides: Partial<TabAnswers> = {}): TabAnswers {
  return {
    ...emptyTab("translasi", "titik"),
    percobaan: { fields: { "1": { a: "2" } }, isChecked: true, status: "correct", attempt: 1, score: 100 },
    pengamatan: { fields: { "1": { a: "2" } }, isChecked: true, status: "correct", attempt: 1, score: 100 },
    penyimpulan: { fields: { "1": { a: "2" } }, isChecked: true, status: "correct", attempt: 1, score: 100 },
    cekPemahaman: { selections: [1], isChecked: true, status: "correct", attempt: 1, score: 100 },
    ...overrides,
  }
}

function jsonResponse(payload: unknown) {
  return { ok: true, json: async () => payload }
}

describe("triggerTabUnlockIfComplete", () => {
  beforeEach(() => {
    store.getTabAnswers.mockReset()
    store.setProgress.mockReset()
    fetchMock.mockReset()
    vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("does not call the API when the tab is not fully terminal", async () => {
    const answers = terminalTab()
    answers.pengamatan = { ...answers.pengamatan, status: "unsubmitted" }
    store.getTabAnswers.mockReturnValue(answers)

    await triggerTabUnlockIfComplete("translasi", "titik")
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("returns early with a non-terminal cekPemahaman", async () => {
    const answers = terminalTab()
    answers.cekPemahaman = { ...answers.cekPemahaman, status: "wrong_attempt1" }
    store.getTabAnswers.mockReturnValue(answers)

    await triggerTabUnlockIfComplete("translasi", "titik")
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("POSTs terminal claims for all 4 sections and updates the store", async () => {
    store.getTabAnswers.mockReturnValue(terminalTab())
    const progress = [{ tab: "titik", unlocked: true, completed: true }]
    fetchMock.mockResolvedValue(jsonResponse({ ok: true, data: { progress } }))

    await triggerTabUnlockIfComplete("translasi", "titik")

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe("/api/modul/translasi/progress/unlock")
    expect(init.method).toBe("POST")

    const body = JSON.parse(init.body)
    expect(body.completedTab).toBe("titik")
    expect(body.sections).toHaveLength(4)
    expect(body.sections.map((s: { sectionType: string }) => s.sectionType)).toEqual([
      "pengamatan",
      "percobaan",
      "penyimpulan",
      "cek-pemahaman",
    ])
    expect(body.sections[3].answer).toEqual({ selections: [1] })

    expect(store.setProgress).toHaveBeenCalledWith("translasi", progress)
  })

  it("sends cek-pemahaman without an answer field when selections are empty", async () => {
    const answers = terminalTab()
    answers.cekPemahaman = { ...answers.cekPemahaman, selections: [] }
    store.getTabAnswers.mockReturnValue(answers)
    fetchMock.mockResolvedValue(jsonResponse({ ok: true, data: { progress: [] } }))

    await triggerTabUnlockIfComplete("translasi", "titik")

    const [, init] = fetchMock.mock.calls[0]
    const body = JSON.parse(init.body)
    const cp = body.sections.find((s: { sectionType: string }) => s.sectionType === "cek-pemahaman")
    expect(cp).not.toHaveProperty("answer")
  })

  it("maps wrong_attempt2 into the claims with attempt 2", async () => {
    const answers = terminalTab()
    answers.percobaan = { ...answers.percobaan, status: "wrong_attempt2", attempt: 2, score: 50 }
    store.getTabAnswers.mockReturnValue(answers)
    fetchMock.mockResolvedValue(jsonResponse({ ok: true, data: { progress: [] } }))

    await triggerTabUnlockIfComplete("translasi", "titik")

    const [, init] = fetchMock.mock.calls[0]
    const body = JSON.parse(init.body)
    const percobaan = body.sections.find((s: { sectionType: string }) => s.sectionType === "percobaan")
    expect(percobaan.status).toBe("wrong_attempt2")
    expect(percobaan.attempt).toBe(2)
    expect(percobaan.score).toBe(50)
  })

  it("logs an error and does not update the store when the API rejects", async () => {
    store.getTabAnswers.mockReturnValue(terminalTab())
    fetchMock.mockResolvedValue(
      jsonResponse({ ok: false, error: { code: "TAB_LOCKED", message: "locked" } }),
    )

    await triggerTabUnlockIfComplete("translasi", "titik")

    expect(console.error).toHaveBeenCalled()
    expect(store.setProgress).not.toHaveBeenCalled()
  })

  it("logs an error when the fetch itself throws", async () => {
    store.getTabAnswers.mockReturnValue(terminalTab())
    fetchMock.mockRejectedValue(new Error("network down"))

    await triggerTabUnlockIfComplete("translasi", "titik")

    expect(console.error).toHaveBeenCalled()
    expect(store.setProgress).not.toHaveBeenCalled()
  })
})

describe("syncTabProgress", () => {
  beforeEach(() => {
    store.setProgress.mockReset()
    fetchMock.mockReset()
  })

  it("updates the store and returns tabs on success", async () => {
    const tabs = [{ tab: "titik", unlocked: true, completed: false }]
    fetchMock.mockResolvedValue(jsonResponse({ ok: true, data: { tabs } }))

    const result = await syncTabProgress("translasi")
    expect(result).toEqual(tabs)
    expect(store.setProgress).toHaveBeenCalledWith("translasi", tabs)
  })

  it("returns null on a non-ok payload", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ ok: false }))
    expect(await syncTabProgress("translasi")).toBeNull()
    expect(store.setProgress).not.toHaveBeenCalled()
  })

  it("returns null when fetch throws", async () => {
    fetchMock.mockRejectedValue(new Error("boom"))
    expect(await syncTabProgress("translasi")).toBeNull()
  })
})
