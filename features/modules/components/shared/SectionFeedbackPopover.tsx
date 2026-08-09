"use client"

import { useMemo } from "react"
import { Button } from "@/components/retroui/Button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/retroui/Popover"
import { FEEDBACK_SECTION_DELIMITER } from "../../lib/feedback"

interface SectionFeedbackPopoverProps {
  aiFeedback: string
  isLocked: boolean
}

/** Render bullet-point lines (split by •) as styled inline spans. */
function BulletList({ text }: { text: string }) {
  const parts = text.split("•").filter(Boolean)
  if (parts.length <= 1) {
    return <span className="text-black text-xs md:text-sm whitespace-pre-line">{text}</span>
  }
  return (
    <span className="text-black text-xs md:text-sm leading-relaxed block">
      {parts.map((part, i) => {
        const trimmed = part.trim()
        if (!trimmed) return null
        return (
          <span key={i} className="block mt-2 first:mt-0">
            <span className="inline-flex items-start gap-2">
              <span className="shrink-0">{"•"}</span>
              <span className="whitespace-pre-line">{trimmed}</span>
            </span>
          </span>
        )
      })}
    </span>
  )
}

interface ParsedSection {
  type: "correct" | "wrong" | "plain"
  heading: string
  body: string
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Parse structured feedback into display sections.
 * Feedback may contain §CORRECT§ / §WRONG§ markers; plain feedback has none.
 */
function parseFeedback(raw: string): ParsedSection[] {
  const CORRECT = FEEDBACK_SECTION_DELIMITER.CORRECT
  const WRONG = FEEDBACK_SECTION_DELIMITER.WRONG

  if (!raw.includes(CORRECT) && !raw.includes(WRONG)) {
    return [{ type: "plain", heading: "", body: raw.trim() }]
  }

  const sections: ParsedSection[] = []
  const chunks = raw
    .split(new RegExp(`(${escapeRe(CORRECT)}|${escapeRe(WRONG)})`, "g"))
    .filter(Boolean)

  let currentType: "correct" | "wrong" | null = null
  for (const chunk of chunks) {
    if (chunk === CORRECT) { currentType = "correct"; continue }
    if (chunk === WRONG) { currentType = "wrong"; continue }
    if (!currentType) continue
    const trimmed = chunk.trim()
    if (!trimmed) continue
    const pembahasanMatch = trimmed.match(/pembahasan:/i)
    const pembahasanIdx = pembahasanMatch ? pembahasanMatch.index ?? -1 : -1
    const heading = pembahasanIdx !== -1 ? trimmed.slice(0, pembahasanIdx).trim() : trimmed
    const body = pembahasanIdx !== -1 ? trimmed.slice(pembahasanIdx + (pembahasanMatch?.[0].length ?? 11)).trim() : ""
    sections.push({ type: currentType, heading, body })
    currentType = null
  }

  return sections
}

/** Floating popover button that shows AI feedback after checking answers. */
export function SectionFeedbackPopover({
  aiFeedback,
  isLocked,
}: SectionFeedbackPopoverProps) {
  const label = isLocked ? "Lihat Pembahasan" : "Lihat Hint"
  const title = isLocked ? "Pembahasan" : "Hint"

  const sections = useMemo<ParsedSection[] | null>(() => {
    if (!aiFeedback) return null
    const raw = aiFeedback.trim()
    if (!raw) return null
    return parseFeedback(raw)
  }, [aiFeedback])

  if (!sections) return null

  return (
    <div className="flex justify-center">
      <Popover>
        <PopoverTrigger render={<Button className="font-bold uppercase text-xs md:text-sm" />}>
          {label}
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>{title}</PopoverTitle>
            <PopoverDescription>
              <span className="block space-y-3">
                {sections.map((sec, i) => {
                  if (sec.type === "plain") {
                    return <BulletList key={i} text={sec.body || sec.heading} />
                  }

                  return (
                    <span key={i} className="block">
                      {i > 0 && (
                        <span className="block border-t-2 border-black mb-3" />
                      )}
                      {sec.heading && (
                        <span className="block mb-1.5 text-xs md:text-sm text-black">
                          {sec.heading}
                        </span>
                      )}
                      {sec.body && (
                        <span className="block">
                          {sec.heading && !sec.heading.toUpperCase().includes("PEMBAHASAN") && (
                            <span className="block text-xs md:text-sm text-black mb-1">
                              Pembahasan:
                            </span>
                          )}
                          <BulletList text={sec.body} />
                        </span>
                      )}
                    </span>
                  )
                })}
              </span>
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  )
}
