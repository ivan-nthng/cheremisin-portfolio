/** Shared case modal lock. Restore only while the visitor remains on this route. */
export function lockCaseScroll() {
  const body = document.body, html = document.documentElement
  const position = { left: scrollX, top: scrollY }, route = location.href
  const keys = ['position', 'top', 'left', 'width', 'overflow', 'padding-right']
  const before = keys.map(key => [key, body.style.getPropertyValue(key), body.style.getPropertyPriority(key)])
  const overflow = html.style.overflow
  const scrollbar = innerWidth - html.clientWidth
  Object.assign(body.style, { position: 'fixed', top: `${-position.top}px`, left: `${-position.left}px`, width: '100%', overflow: 'hidden' })
  if (scrollbar) body.style.paddingRight = `${scrollbar}px`
  html.style.overflow = 'hidden'
  return {
    route,
    restore() {
      before.forEach(([key, value, priority]) => { if (value) body.style.setProperty(key, value, priority); else body.style.removeProperty(key) })
      html.style.overflow = overflow
      if (location.href === route) window.scrollTo({ ...position, behavior: 'instant' })
    },
  }
}
