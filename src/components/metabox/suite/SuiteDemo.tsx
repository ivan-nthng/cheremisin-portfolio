'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import DemoShell, { type DemoScenarioSelection } from '@/components/portfolio/demo/DemoShell'
import type { CardPlayback, CaseDemo } from '@/components/portfolio/case-story/CaseDemoOverlay'
import MetaboxSuite from './MetaboxSuite'
import styles from './metabox-suite.module.css'

export default function SuiteDemo({ projects = false, close, navigate, scenarioControls, guided = false, playback,
  imageAttempt, onReady, onUnavailable }: {
  projects?: boolean; close: () => void; navigate: (next: CaseDemo) => void; scenarioControls: DemoScenarioSelection<CaseDemo>;
  guided?: boolean; playback?: CardPlayback; imageAttempt?: number; onReady?: () => void; onUnavailable?: () => void
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [visit, setVisit] = useState(0)
  const body = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!guided || !playback) return
    playback.view = projects ? 'metabox-projects' : 'metabox-suite'
    setTheme('light')
    body.current?.querySelector('details[open]')?.removeAttribute('open')
    return () => { delete playback.view }
  }, [guided, projects, playback])
  useLayoutEffect(() => {
    if (!onReady || !onUnavailable) return
    const image = body.current?.querySelector<HTMLImageElement>('img[data-suite-image]')
    if (!image) return
    image.addEventListener('load', onReady)
    image.addEventListener('error', onUnavailable)
    if (image.complete) (image.naturalWidth ? onReady : onUnavailable)()
    return () => { image.removeEventListener('load', onReady); image.removeEventListener('error', onUnavailable) }
  }, [projects, imageAttempt, visit, onReady, onUnavailable])
  return <DemoShell {...scenarioControls} presentation={guided} label="Metabox projects demo" theme={theme}
    onTheme={setTheme} onRestart={() => setVisit(value => value + 1)} onReturn={close}>
    <div ref={body} className={guided ? styles.guided : styles.manual}>
      <MetaboxSuite key={visit} projects={projects} hosted theme={theme} imageAttempt={imageAttempt}
        onOpenApplications={() => navigate('metabox-suite')}
        onLaunch={destination => navigate(destination === 'projects' ? 'metabox-projects' : 'metabox-products')} />
    </div>
  </DemoShell>
}
