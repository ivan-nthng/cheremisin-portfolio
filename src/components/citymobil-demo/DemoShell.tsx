'use client'

import { useLayoutEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import { Sun, Moon } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { demoNavigationShortcut, type ScenarioId } from '@/lib/portfolio/client/citymobil-demo'
import DemoMotion from './DemoMotion'
import styles from './shell.module.css'

function completionIcon(name: 'replay' | 'next') { const url = 'url("/images/citymobil/demo/shell/' + name + '.svg")'; return <span aria-hidden="true" className={styles.completionIcon} style={{ maskImage: url, WebkitMaskImage: url } as CSSProperties}/> }

const scenarios: { id: ScenarioId; label: string }[] = [{ id: 'lost', label: 'Lost item' }, { id: 'pickup', label: 'Pickup mix-up' }, { id: 'income', label: 'Guaranteed income' }]
type Props = { children: ReactNode; theme: 'light' | 'dark'; scenario: ScenarioId; completed: boolean; covered: boolean; menuOpen: boolean; onTheme: (theme: 'light' | 'dark') => void; onScenario: (scenario: ScenarioId, restart?: boolean) => void; onCover: (value: boolean) => void; onPalette: (trigger: HTMLElement) => void; onTrack: (trigger: HTMLElement) => void }
export default function DemoShell({ children, theme, scenario, completed, covered, menuOpen, onTheme, onScenario, onCover, onPalette, onTrack }: Props) {
  const shell = useRef<HTMLDivElement>(null)
  const toolbar = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const update = () => shell.current?.style.setProperty('--cm-toolbar-height', `${toolbar.current?.getBoundingClientRect().height ?? 44}px`)
    update()
    const observer = new ResizeObserver(update)
    if (toolbar.current) observer.observe(toolbar.current)
    return () => observer.disconnect()
  }, [])
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const restart = useRef<HTMLButtonElement>(null)
  const result = useRef<HTMLButtonElement>(null)
  useLayoutEffect(() => { if (covered) restart.current?.focus({ preventScroll: true }) }, [covered])
  function dismiss() { onCover(false); requestAnimationFrame(() => result.current?.focus({ preventScroll: true })) }
  function activate(id: ScenarioId, reset = false) { onScenario(id, reset); requestAnimationFrame(() => tabs.current[scenarios.findIndex(item => item.id === id)]?.focus({ preventScroll: true })) }
  return <div ref={shell} className={styles.shell} role="region" aria-label="Citymobil portfolio demo" onKeyDownCapture={event => {
    const command = demoNavigationShortcut(event.key, { ctrl: event.ctrlKey, meta: event.metaKey, alt: event.altKey, shift: event.shiftKey, composing: event.nativeEvent.isComposing }, covered || menuOpen)
    if (!command) return
    if (event.target instanceof HTMLElement) { event.preventDefault(); event.stopPropagation(); if (command === 'track') onTrack(event.target); else onPalette(event.target) }
  }}>
    <div inert={covered || undefined}>
      <div ref={toolbar} className={styles.toolbar}>
        <div className={styles.themes} role="group" aria-label="Preview theme">{(['light', 'dark'] as const).map(value => <button type="button" key={value} aria-label={value === 'light' ? 'Light' : 'Dark'} aria-pressed={theme === value} onClick={() => onTheme(value)}>{value === 'light' ? <Sun size={18} aria-hidden="true"/> : <Moon size={18} aria-hidden="true"/>}</button>)}</div>
        <div className={styles.scenarios} role="tablist" aria-label="Demo scenario">{scenarios.map((item, index) => <button type="button" role="tab" key={item.id} ref={node => { tabs.current[index] = node }} aria-selected={scenario === item.id} aria-controls="citymobil-demo" tabIndex={scenario === item.id ? 0 : -1} onClick={() => activate(item.id)} onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3; tabs.current[next]?.focus() } }}>{item.label}</button>)}</div>
        {completed && <button ref={result} type="button" className={styles.result} onClick={() => onCover(true)}>View result</button>}
      </div>
      {children}
    </div>
    <AnimatePresence initial={false}>{covered && <DemoMotion key="completion" kind="fade" className={styles.cover} role="dialog" aria-modal="true" aria-labelledby="citymobil-completed-title" onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); dismiss() }
      if (event.key === 'Tab') { const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button')); const index = buttons.indexOf(document.activeElement as HTMLButtonElement); event.preventDefault(); buttons[(index + (event.shiftKey ? buttons.length - 1 : 1)) % buttons.length]?.focus() }
    }}><div className={styles.completionCard}><p>{scenario === 'pickup' ? 'Pickup mix-up' : 'Lost item'} · local demo</p><h2 id="citymobil-completed-title">Scenario completed</h2><p>{scenario === 'pickup' ? 'You guided Jason, received Ivan’s confirmation and sent the €5 next-trip promo. Jason received the code and can see Ivan at the main entrance.' : 'You confirmed the trip, contacted the driver, recorded permission and shared their demo contact. The rider has arranged to collect the backpack.'}</p><div className={styles.completionActions}><button ref={restart} type="button" onClick={() => activate(scenario, true)}>{completionIcon('replay')}Try again</button><button type="button" onClick={() => activate(scenario === 'lost' ? 'pickup' : 'income')}>Next scenario{completionIcon('next')}</button></div><button type="button" className={styles.dismiss} onClick={dismiss}>View completed conversation <span>Esc</span></button></div></DemoMotion>}</AnimatePresence>
  </div>
}
