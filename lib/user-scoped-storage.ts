/**
 * User-scoped localStorage adapter for Zustand persist middleware.
 *
 * When a userId is set, storage keys are namespaced as `{name}-{userId}`.
 * When no userId is set (pre-auth), falls back to the bare `{name}` key.
 * On userId change, `rehydrate()` is called to reload persisted data under the new key.
 *
 * Legacy (unscoped) keys are migrated on first read: if the scoped key is empty
 * but the unscoped key exists, data is moved to the scoped key and the old key removed.
 */

let _currentUserId: string | null = null

/** Set the current userId and trigger store rehydration. */
export function setGlobalUserId(userId: string | null) {
  const changed = _currentUserId !== userId
  _currentUserId = userId
  if (changed) {
    // Lazy import to avoid circular deps — the stores import this file,
    // and this file imports the stores. Using dynamic import breaks the cycle.
    import("@/features/modules/store/answerStore").then((m) =>
      m.useAnswerStore.persist.rehydrate(),
    )
    import("@/features/quiz/store").then((m) =>
      m.useQuizStore.persist.rehydrate(),
    )
  }
}

/** Return the current userId (may be null before auth session loads). */
export function getGlobalUserId(): string | null {
  return _currentUserId
}

/**
 * Build a localStorage key scoped to the current user.
 * Falls back to bare `name` when no userId is set.
 */
function scopedKey(name: string): string {
  return _currentUserId ? `${name}-${_currentUserId}` : name
}

/**
 * Create a Zustand `StateStorage` that namespaces keys by userId.
 *
 * Migration: on `getItem`, if the scoped key has no data but the legacy
 * (unscoped) key does, the data is moved to the scoped key and the legacy
 * key is removed.
 */
export function createUserScopedStorage() {
  return {
    getItem: (name: string) => {
      const scoped = scopedKey(name)
      const raw = localStorage.getItem(scoped)

      // Migration: legacy unscoped key → scoped key
      if (!raw && _currentUserId) {
        const legacy = localStorage.getItem(name)
        if (legacy) {
          localStorage.setItem(scoped, legacy)
          localStorage.removeItem(name)
          return legacy
        }
      }

      return raw
    },
    setItem: (name: string, value: string) => {
      localStorage.setItem(scopedKey(name), value)
    },
    removeItem: (name: string) => {
      localStorage.removeItem(scopedKey(name))
    },
  }
}
