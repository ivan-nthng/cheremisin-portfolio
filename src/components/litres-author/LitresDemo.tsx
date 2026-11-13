'use client'

import { useEffect, useState } from 'react'
import DemoShell from '@/components/portfolio/demo/DemoShell'
import { litresCaseReturn } from './demo-return'
import LitresAuthor from './LitresAuthor'

function close() {
  location.replace(litresCaseReturn())
}

export default function LitresDemo({ onReturn }: { onReturn?: () => void } = {}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [visit, setVisit] = useState(0)

  function restart() {
    if (!onReturn && location.hash) history.replaceState(history.state, '', location.pathname + location.search)
    setVisit(value => value + 1)
    if (!onReturn) window.scrollTo({ top: 0, behavior: 'instant' })
  }

  useEffect(() => {
    if (onReturn) return
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing) return
      event.preventDefault()
      close()
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [onReturn])

  return <DemoShell label="LitRes portfolio demo" theme={theme} onTheme={setTheme} onRestart={restart} onReturn={onReturn ?? close}>
    <LitresAuthor key={visit} theme={theme} hosted={Boolean(onReturn)} selectionActions />
  </DemoShell>
}
