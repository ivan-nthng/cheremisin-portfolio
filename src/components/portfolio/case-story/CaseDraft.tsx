'use client'

import { useState, type ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter'
import ProjectNavigation from '@/components/ProjectNavigation'
import { CaseDemoArrow, CaseTemplate } from './CaseTemplate'
import { CaseHero, type CaseImage } from './CaseHero'
import { CaseGuidedShowcase } from './CaseGuidedShowcase'
import { CaseDemoMedia } from './CaseDemoMedia'
import { GuidedPreview } from './GuidedPreview'
import { CaseDetails, CaseFeatureCard, CaseFeatureGrid, CaseTextFeature, type CaseTextFeatureProps } from './CaseDetails'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import type { MetaboxCardKind } from '@/components/metabox/MetaboxCardScene'
import caseStyles from '@/components/citymobil-case/case.module.css'
import { DraftDemoProvider } from './DraftDemoProvider'
import { caseDemoForHref, useCaseDemo } from './CaseDemoOverlay'
import { LitresLibraryHeroFlow } from '@/components/litres-readers/LitresLibraryHeroFlow'
import styles from './case-draft.module.css'
import editorial from './case-editorial.module.css'
import { demoLinks } from '@/lib/portfolio/demo-links'

type DraftDemo = { label: string; href: string; description: string }
type StoryBeat = { label?: string; title: string; body: string }

export type CaseDraftData = {
  projectHref: string
  name: string
  title: string
  introduction: string
  variant: 'litres' | 'metabox'
  hero?: CaseImage
  heroPreview?: boolean
  context?: {
    layout?: 'columns'
    title: string
    body: string
    beats: [StoryBeat, StoryBeat, StoryBeat]
  }
  story?: { label: string; title: string; paragraphs: string[] }[]
  poster: CaseImage
  showcase: { kicker: string; lines: [string, string]; chrome: string }
  demos: [DraftDemo, ...DraftDemo[]]
  textFeatures?: { columns: 2 | 3; items: CaseTextFeatureProps[] }
}

const DraftNativeScene = dynamic(() => import('./DraftNativeScene').then(module => module.DraftNativeScene))

// Route imports keep server-rendered gallery styles and IDs in the same tree.
type CaseDraftProps = { data: CaseDraftData } & (
  | { ReaderGallery: ComponentType<{ suspended: boolean }>; MetaboxScene?: never }
  | { ReaderGallery?: never; MetaboxScene: ComponentType<{ kind: MetaboxCardKind; suspended: boolean }> }
)

function DemoLink({ demo, live = false, sharedEntry = false }: { demo: DraftDemo; live?: boolean; sharedEntry?: boolean }) {
  const { open } = useCaseDemo()
  const kind = caseDemoForHref(demo.href)
  return kind ? <button className={`editorial-link ${caseStyles.desktopDemoEntry}`} type="button" aria-haspopup="dialog" data-shared-demo-entry={sharedEntry || undefined} onClick={event => open(kind, event.currentTarget)}>
    {live ? 'Try Live Demo' : demo.label}<CaseDemoArrow />
  </button> : <a className="editorial-link" href={demo.href} target="_blank" rel="noopener">
    {demo.label}<span className="sr-only"> (opens in a new tab)</span><CaseDemoArrow />
  </a>
}

function CaseDraftContent({ data, ReaderGallery, MetaboxScene }: CaseDraftProps) {
  const { active } = useCaseDemo()
  const [expandedMicrodemo, setExpandedMicrodemo] = useState<string | null>(null)
  const hero = data.hero ?? data.poster
  const libraryGrid = data.heroPreview && data.variant === 'litres'
  const contextColumns = data.context?.layout === 'columns'
  const primaryDemo = data.demos[0]
  const poster = <img {...data.poster} className={styles.poster} draggable={false} loading="lazy" />
  const featureCards = data.demos.map(demo => {
    const kind = caseDemoForHref(demo.href)
    const hasPreview = kind === 'metabox-products' || kind === 'metabox-camera' || kind === 'metabox-projects'
    return <CaseFeatureCard key={demo.href} id={kind && demoLinks[kind].anchor !== 'showcase' ? demoLinks[kind].anchor : undefined} listItem span={data.variant === 'metabox' ? 'third' : 'full'} title={<><DemoLink demo={demo} sharedEntry /><span className={caseStyles.mobileDemoLabel}>{demo.label}</span></>} description={demo.description}>
      {MetaboxScene && hasPreview && <CaseDemoMedia reveal title={demo.label} expanded={expandedMicrodemo === kind}
        onExpand={() => setExpandedMicrodemo(kind)} onClose={() => setExpandedMicrodemo(null)}>
        <MetaboxScene kind={kind} suspended={active || expandedMicrodemo !== null && expandedMicrodemo !== kind} />
      </CaseDemoMedia>}
    </CaseFeatureCard>
  })

  return <CaseTemplate className={styles.page} data-draft={data.variant} data-restored-case
      hero={<CaseHero headingId="case-draft-title" title={data.title} introduction={data.introduction}
        kicker={data.name} cover={data.hero ? 'image' : 'workspace'}
        effects={libraryGrid ? <LitresLibraryHeroFlow suspended={active} /> : undefined}
        artwork={data.heroPreview ? undefined : hero}
        actions={<><DemoLink demo={primaryDemo} live />
          <a className="editorial-link" href={data.story ? "#process" : "#demos"}>{data.story ? "Read the story" : "View demos"}</a></>}
        rightUI={data.heroPreview && !libraryGrid ? { label: hero.alt, content: <>
          <div className={caseStyles.chrome} aria-hidden="true">{data.showcase.chrome}</div>
          <GuidedPreview still={<img {...hero} className={styles.poster} draggable={false} fetchPriority="high" />}>
            <DraftNativeScene variant={data.variant} />
          </GuidedPreview>
        </> } : undefined}
      />}
      context={data.context && <RepeatReveal active={contextColumns || undefined}><section className={styles.context} aria-labelledby="case-context-title">
        <RepeatReveal className={styles.contextIntro} active={contextColumns ? undefined : true}>
          {!contextColumns && <p className={styles.kicker}>Context</p>}
          <h2 id="case-context-title" className={editorial.sectionTitle}>{data.context.title}</h2>
          <p className={styles.storyIntro}>{data.context.body}</p>
        </RepeatReveal>
        {contextColumns ? <CaseFeatureGrid columns={3} variant="text" className={styles.contextFeatures}>
          {data.context.beats.map(beat => <CaseTextFeature key={beat.title} title={beat.title} description={beat.body} heading="h3" />)}
        </CaseFeatureGrid> : data.context.beats.map(beat => <RepeatReveal key={beat.title}>
          <div className={styles.storyBeat} data-labeled={beat.label ? '' : undefined}>
            {beat.label && <p className={styles.kicker}>{beat.label}</p>}
            <div><h3>{beat.title}</h3><p>{beat.body}</p></div>
          </div>
        </RepeatReveal>)}
      </section></RepeatReveal>}
      showcase={<CaseGuidedShowcase id="showcase" headingId="case-showcase-title" {...data.showcase}
        still={poster} scene={<DraftNativeScene variant={data.variant} />}
        mobilePoster={data.poster}
        entry={<DemoLink demo={primaryDemo} live sharedEntry />}
      />}
      details={<>
        <CaseDetails editorial={false} className={`${styles.detailSection} ${styles.trackSection}`} id="demos" aria-labelledby="case-demos-title">
          <RepeatReveal><p className={styles.kicker}>Workspace</p>
          <h2 id="case-demos-title" className={editorial.sectionTitle}>Interactive demos</h2></RepeatReveal>
          {ReaderGallery ? <ReaderGallery suspended={active} /> : <CaseFeatureGrid variant="tracks">{featureCards}</CaseFeatureGrid>}
        </CaseDetails>
        {data.textFeatures && <CaseDetails editorial={false} className={styles.detailSection} id="features" aria-label="Product capabilities">
          <CaseFeatureGrid columns={data.textFeatures.columns} variant="text">
            {data.textFeatures.items.map(item => <CaseTextFeature key={item.title} {...item} />)}
          </CaseFeatureGrid>
        </CaseDetails>}
        {data.story && <RepeatReveal><CaseDetails editorial={false} className={styles.detailSection} id="process" aria-labelledby="case-process-title">
          <p className={styles.kicker}>Case study</p>
          <h2 id="case-process-title" className={editorial.sectionTitle}>Process and results</h2>
          {data.story.map(({ label, title, paragraphs }) => <div key={label} className={styles.storyBeat} data-labeled="">
            <p className={styles.kicker}>{label}</p>
            <div><h3>{title}</h3>{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>)}
        </CaseDetails></RepeatReveal>}
      </>}
      further={<ProjectNavigation href={data.projectHref} />}
      footer={<PortfolioFooter />}
    />
}

export default function CaseDraft(props: CaseDraftProps) {
  return <DraftDemoProvider><CaseDraftContent {...props} /></DraftDemoProvider>
}
