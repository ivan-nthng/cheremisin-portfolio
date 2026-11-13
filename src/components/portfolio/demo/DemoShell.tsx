'use client'

import { useId, useLayoutEffect, useRef, type CSSProperties, type KeyboardEvent, type KeyboardEventHandler, type ReactNode } from 'react'
import { AnimatePresence, useIsPresent, useReducedMotion } from 'framer-motion'
import * as motion from 'framer-motion/client'
import { X } from 'lucide-react'
import styles from './shell.module.css'
import { DemoScenarioTabs, type DemoScenario } from './DemoScenarioTabs'

export type { DemoScenario } from './DemoScenarioTabs'
type Theme = 'light' | 'dark'
type SharedProps = {
  children: ReactNode
  label: string
  style?: CSSProperties
  theme: Theme
  onTheme: (theme: Theme) => void
  onReturn?: () => void
  onKeyDownCapture?: KeyboardEventHandler<HTMLDivElement>
}
export type DemoScenarioSelection<Id extends string> = {
  controlsId?: string
  scenarios: readonly DemoScenario<Id>[]
  scenario: Id
  onScenario: (scenario: Id, restart?: boolean) => void
}
type ScenarioProps<Id extends string> = DemoScenarioSelection<Id> & {
  completed?: boolean
  covered?: boolean
  onCover?: (covered: boolean) => void
  completion?: { label: string; description: string; nextScenario: Id; replayIcon: string; nextIcon: string }
  onRestart?: () => void
}
type WorkspaceProps = { onRestart: () => void; scenarios?: never }
type Props<Id extends string> = SharedProps & (ScenarioProps<Id> | WorkspaceProps)
const replayIcon = '/images/citymobil/demo/shell/replay.svg'

function CompletionCover({ children, titleId, onDismiss }: { children: ReactNode; titleId: string; onDismiss: () => void }) {
  const present = useIsPresent()
  const reduced = useReducedMotion()
  return <motion.div className={styles.cover} role="dialog" aria-modal="true" aria-labelledby={titleId}
    inert={!present || undefined} aria-hidden={!present || undefined} data-demo-presence={present ? 'present' : 'exiting'}
    initial={{ opacity: 0, transform: 'none' }} animate={{ opacity: 1, transform: 'none' }} exit={{ opacity: 0, transform: 'none' }}
    transition={{ duration: reduced ? 0 : .4, ease: [.23, 1, .32, 1] }} style={!present ? { pointerEvents: 'none' } : undefined}
    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onDismiss() }
      if (event.key === 'Tab') {
        const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'))
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
        event.preventDefault(); buttons[(index + (event.shiftKey ? buttons.length - 1 : 1)) % buttons.length]?.focus()
      }
    }}>{children}</motion.div>
}

function CompletionIcon({ src }: { src: string }) {
  return <span aria-hidden="true" className={styles.completionIcon} style={{ maskImage: `url("${src}")`, WebkitMaskImage: `url("${src}")` }}/>
}

/** Portfolio-owned presentation only. Native demo state, copy and commands are supplied by its caller. */
export default function DemoShell<Id extends string>(props: Props<Id> & { presentation?: boolean }) {
  const { children, label, style, theme, onTheme, onReturn, onKeyDownCapture } = props
  const story = props.scenarios ? props : undefined
  const completion = story?.completion
  const covered = story?.covered ?? false
  const shell = useRef<HTMLDivElement>(null)
  const toolbar = useRef<HTMLDivElement>(null)
  const scenarioBar = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const restart = useRef<HTMLButtonElement>(null)
  const result = useRef<HTMLButtonElement>(null)
  const id = useId()
  useLayoutEffect(() => {
    const update = () => {
      const height = (toolbar.current?.offsetHeight ?? 0) + (scenarioBar.current?.offsetHeight ?? 0)
      shell.current?.style.setProperty('--demo-toolbar-height', `${height}px`)
    }
    update(); const observer = new ResizeObserver(update)
    if (toolbar.current) observer.observe(toolbar.current)
    if (scenarioBar.current) observer.observe(scenarioBar.current)
    return () => observer.disconnect()
  }, [props.presentation, Boolean(story)])
  useLayoutEffect(() => { if (covered) restart.current?.focus({ preventScroll: true }) }, [covered])
  function focusScenario(value: Id) {
    tabs.current[story?.scenarios.findIndex(item => item.id === value) ?? -1]?.focus({ preventScroll: true })
  }
  function activate(value: Id, reset = false) { story?.onScenario(value, reset); requestAnimationFrame(() => focusScenario(value)) }
  function dismiss() { story?.onCover?.(false); requestAnimationFrame(() => result.current?.focus({ preventScroll: true })) }
  const scenarioControls = story && <>
    <DemoScenarioTabs scenarios={story.scenarios} scenario={story.scenario} controlsId={story.controlsId} buttonRefs={tabs} onScenario={activate} />
    {story.completed && <button ref={result} type="button" className={styles.result} onClick={() => story.onCover?.(true)}>View result</button>}
  </>
  return <div ref={shell} className={styles.shell} style={style} role="region" aria-label={label} data-hosted={Boolean(onReturn)}
    onKeyDownCapture={onKeyDownCapture}>
    <div inert={covered || undefined}>
      {!props.presentation && <div ref={toolbar} className={styles.toolbar}>
        <button type="button" role="switch" aria-label="Dark theme" aria-checked={theme === 'dark'} className={styles.themeSwitch}
          onClick={() => onTheme(theme === 'light' ? 'dark' : 'light')}>
          <span className={styles.switchTrack} aria-hidden="true"><span className={styles.switchThumb}/></span>
        </button>
        <button type="button" className={styles.hostAction} aria-label="Restart" title="Restart" onClick={() => props.onRestart ? props.onRestart() : story && activate(story.scenario, true)}><CompletionIcon src={completion?.replayIcon ?? replayIcon}/></button>
        {onReturn && <button type="button" className={styles.hostAction} aria-label="Close" title="Close" onClick={onReturn}><X size={16} aria-hidden="true"/></button>}
      </div>}
      {children}
      {!props.presentation && story && <div ref={scenarioBar} className={`${styles.toolbar} ${styles.scenarioBar}`} data-demo-scenario-bar="bottom">{scenarioControls}</div>}
    </div>
    <AnimatePresence initial={false}>{story && completion && covered && <CompletionCover key="completion" titleId={id + '-completed-title'} onDismiss={dismiss}>
      <div className={styles.completionCard}><p>{completion.label} · local demo</p><h2 id={id + '-completed-title'}>Scenario completed</h2><p>{completion.description}</p>
        <div className={styles.completionActions}><button ref={restart} type="button" onClick={() => activate(story.scenario, true)}><CompletionIcon src={completion.replayIcon}/>Try again</button>
          <button type="button" onClick={() => activate(completion.nextScenario)}>Next scenario<CompletionIcon src={completion.nextIcon}/></button></div>
        <button type="button" className={styles.dismiss} onClick={dismiss}>View completed conversation <span>Esc</span></button>
      </div>
    </CompletionCover>}</AnimatePresence>
  </div>
}
