export type LitresEntry = 'hero' | 'workspace'

const storageKey = 'litres-case-demo-entry'
const casePath = '/projects/litres'
const demoPath = '/projects/litres/demo'

export function litresDemoHref(entry: LitresEntry) {
  return `${demoPath}?from=${entry}`
}

export function rememberLitresEntry(entry: LitresEntry) {
  sessionStorage.setItem(storageKey, JSON.stringify({ entry, top: scrollY }))
}

export function readLitresEntry(): { entry: LitresEntry; top: number } | null {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null')
    if ((saved?.entry === 'hero' || saved?.entry === 'workspace') && Number.isFinite(saved.top)) return saved
  } catch { /* Stale entries from an earlier preview are ignored. */ }
  return null
}

export function clearLitresEntry() {
  sessionStorage.removeItem(storageKey)
}

export function litresCaseReturn() {
  const from = new URLSearchParams(location.search).get('from')
  const saved = readLitresEntry()
  return saved && saved.entry === from ? `${casePath}?demo-return=${saved.entry}` : casePath
}
