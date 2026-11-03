'use client'

import { useLayoutEffect, useRef } from 'react'
import type { RefObject } from 'react'

// Local textarea geometry only; canonical reply text and keyboard behavior stay in the composer.
export function useComposerCaret(inputRef: RefObject<HTMLTextAreaElement | null>, revision: number, value: string, active: boolean) {
  const toolsRef = useRef<HTMLDivElement>(null)
  const mirrorRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const input = inputRef.current
    const tools = toolsRef.current
    const mirror = mirrorRef.current
    if (!input || !tools || !mirror || !active) return
    function update(event?: Event) {
      if (!input || !tools || !mirror) return
      const caret = input.selectionDirection === 'backward' ? input.selectionStart : input.selectionEnd
      const marker = document.createElement('span')
      marker.textContent = '\u200b'
      mirror.replaceChildren(document.createTextNode(input.value.slice(0, caret)), marker, document.createTextNode(input.value.slice(caret) || '\u200b'))
      mirror.style.width = input.clientWidth + 'px'
      const line = marker.getBoundingClientRect()
      const base = mirror.getBoundingClientRect()
      const x = line.left - base.left
      const y = line.top - base.top
      // Native scrolling remains free; edits/navigation keep only the insertion line visible.
      if (event?.type !== 'scroll') {
        if (y < input.scrollTop) input.scrollTop = y
        else if (y + line.height > input.scrollTop + input.clientHeight) input.scrollTop = y + line.height - input.clientHeight
      }
      if (ghostRef.current) ghostRef.current.scrollTop = input.scrollTop
      const field = input.parentElement!.getBoundingClientRect()
      const viewportLeft = Math.max(0, -field.left + 8)
      const viewportRight = Math.min(input.clientWidth - 28, document.documentElement.clientWidth - field.left - 8)
      const left = Math.max(viewportLeft, Math.min(x, viewportRight - tools.offsetWidth))
      const caretTop = input.offsetTop + y - input.scrollTop
      const ranges = [mirror, ghostRef.current].filter(Boolean).flatMap(element => {
        const range = document.createRange()
        range.selectNodeContents(element!)
        const scroll = element === mirror ? input.scrollTop : 0
        return Array.from(range.getClientRects()).map(rect => ({ left: rect.left - field.left, right: rect.right - field.left, top: rect.top - field.top - scroll, bottom: rect.bottom - field.top - scroll }))
      })
      const candidates = [caretTop - tools.offsetHeight - 6, caretTop + line.height + 6]
      const top = candidates.find(candidate => candidate >= 0 && candidate + tools.offsetHeight <= input.parentElement!.clientHeight && !ranges.some(rect => rect.right > left && rect.left < left + tools.offsetWidth && rect.bottom > candidate - 4 && rect.top < candidate + tools.offsetHeight + 4))
      tools.style.left = left + 'px'
      tools.style.top = (top ?? 4) + 'px'
      tools.dataset.placement = top === undefined ? 'top-lane' : 'caret'
      tools.dataset.caret = String(caret)
      tools.dataset.line = String(y)
    }
    update()
    const events = ['select', 'keyup', 'click', 'scroll', 'input'] as const
    events.forEach(event => input.addEventListener(event, update))
    const observer = new ResizeObserver(() => update())
    observer.observe(input)
    observer.observe(tools)
    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) update() })
    document.fonts.addEventListener('loadingdone', update)
    return () => {
      disposed = true
      events.forEach(event => input.removeEventListener(event, update))
      observer.disconnect()
      document.fonts.removeEventListener('loadingdone', update)
    }
  }, [inputRef, revision, value, active])
  return { toolsRef, mirrorRef, ghostRef }
}
