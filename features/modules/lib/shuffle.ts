/** Fisher-Yates shuffle with a deterministic seed so server/client match. */
export function seededShuffle(arr: number[], seed: number): number[] {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
