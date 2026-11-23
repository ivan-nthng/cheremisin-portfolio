'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Box, Check } from 'lucide-react'
import DemoShell, { type DemoScenarioSelection } from '@/components/portfolio/demo/DemoShell'
import type { CaseDemo } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { profile } from '../catalog-fixtures'
import controls from '../metabox-controls.module.css'
import shell from '../metabox.module.css'
import ProductsLibrary from './ProductsLibrary'
import RenderConfirm from './RenderConfirm'
import RenderHistoryMenu from './RenderHistoryMenu'
import RenderSettingsPanel from './RenderSettingsPanel'
import { getPorscheOutline } from './porsche-outlines'
import { porsche, renderProducts, type RenderProduct } from './product-fixtures'
import { cameraViews, currentCamera, environmentName, renderCamera, type RenderFormat, type RenderSize } from './render-fixtures'
import s from './products-demo.module.css'

const editorAssets = '/images/metabox/products/editor/'
const initialCameras = [currentCamera, ...cameraViews]

type RenderOutput = {
  id: string
  product: RenderProduct
  name: string
  file: string
  url: string
  sourceImage?: string
  detail: string
}

const archivedRenders: RenderOutput[] = [
  { id: 'exterior-proof', product: porsche, name: environmentName + ' exterior', file: 'porsche-911-exterior-proof.webp', url: currentCamera.image, detail: 'WebP · Yesterday' },
  ...renderProducts.filter(product => product.image && product.id !== porsche.id).slice(0, 2).map((product, index) => ({
    id: 'archive-' + product.id, product, name: 'Studio preview', file: product.id + '-studio.png', url: product.image!,
    detail: index === 0 ? 'PNG · 3 days ago' : 'PNG · 5 days ago',
  })),
  { id: 'side-proof', product: porsche, name: 'Profile study', file: 'porsche-911-profile-study.webp', url: cameraViews[2].image, detail: 'WebP · Last week' },
]

export default function ProductsDemo({ guidedCamera, imageAttempt = 0, onReady, onUnavailable, onReturn, onOpenConfigurator, onOpenApplications, scenarioControls }: {
  imageAttempt?: number;
  onReady?: () => void; onUnavailable?: () => void;
  guidedCamera?: string; onReturn?: () => void; onOpenConfigurator?: () => void; onOpenApplications?: () => void;
  scenarioControls?: DemoScenarioSelection<CaseDemo>
} = {}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [version, setVersion] = useState(0)
  const [product, setProduct] = useState<RenderProduct | null>(guidedCamera ? porsche : null)
  const [cameras, setCameras] = useState(initialCameras)
  const [selected, setSelected] = useState<string[]>([guidedCamera ?? currentCamera.id])
  const [active, setActive] = useState(guidedCamera ?? currentCamera.id)
  const previousGuide = useRef(guidedCamera)
  const [batch, setBatch] = useState(true)
  const [size, setSize] = useState<RenderSize>('full-hd')
  const [format, setFormat] = useState<RenderFormat>('png')
  const [outputs, setOutputs] = useState<RenderOutput[]>([])
  const [newRenderCount, setNewRenderCount] = useState(0)
  const [productThumbnails, setProductThumbnails] = useState<Record<string, string>>({})
  const [currentOutput, setCurrentOutput] = useState<RenderOutput | null>(null)
  const [loadedScene, setLoadedScene] = useState<string>()
  const [historyTab, setHistoryTab] = useState<'renders' | 'spinners'>('renders')
  const [confirming, setConfirming] = useState(false)
  const [rendering, setRendering] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState<{ message: string } | null>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const returnToLibrary = useRef<{ element: HTMLElement | null; scrollTop: number } | null>(null)
  const request = useRef(0)
  const savedViews = useRef(0)
  const urls = useRef<string[]>([])

  useEffect(() => {
    const objectUrls = urls.current
    return () => {
      request.current += 1
      objectUrls.splice(0).forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  useLayoutEffect(() => {
    if (guidedCamera || !returnToLibrary.current) return
    if (product) {
      if (!onReturn) window.scrollTo({ top: 0, behavior: 'instant' })
      heading.current?.focus({ preventScroll: true })
    } else if (returnToLibrary.current) {
      const { element, scrollTop } = returnToLibrary.current
      returnToLibrary.current = null
      if (!onReturn) window.scrollTo({ top: scrollTop, behavior: 'instant' })
      element?.focus({ preventScroll: true })
    }
  }, [product, guidedCamera, onReturn])

  useEffect(() => {
    if (!notice) return
    const timeout = window.setTimeout(() => setNotice(null), 4000)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const isPorsche = product?.id === porsche.id
  const activeView = cameras.find(view => view.id === active) ?? currentCamera
  const queuedViews = cameras.filter(view => selected.includes(view.id))
  const currentImage = currentOutput?.url ?? (isPorsche ? activeView.image : product?.image)
  useLayoutEffect(() => {
    if (!currentImage || currentImage === loadedScene) onReady?.()
  }, [currentImage, loadedScene, onReady])
  const outline = isPorsche ? getPorscheOutline(currentOutput?.sourceImage ?? currentImage) : undefined
  const allRenders = [...outputs, ...archivedRenders]
  const history = allRenders.filter(output => output.product.id === product?.id)

  function openProduct(next: RenderProduct, output: RenderOutput | null = null) {
    returnToLibrary.current = {
      element: document.activeElement instanceof HTMLElement ? document.activeElement : null,
      scrollTop: window.scrollY,
    }
    setProduct(next)
    setCurrentOutput(output)
    setHistoryTab('renders')
  }

  function openRender(id: string) {
    const output = allRenders.find(render => render.id === id)
    if (output) openProduct(output.product, output)
  }

  function back() {
    setProduct(null)
    setCurrentOutput(null)
    setConfirming(false)
  }

  function restart() {
    request.current += 1
    urls.current.splice(0).forEach(url => URL.revokeObjectURL(url))
    savedViews.current = 0
    returnToLibrary.current = null
    if (!onReturn) window.scrollTo({ top: 0, behavior: 'instant' })
    back()
    setCameras(initialCameras)
    setSelected([currentCamera.id])
    setActive(currentCamera.id)
    setBatch(true)
    setSize('full-hd')
    setFormat('png')
    setOutputs([])
    setNewRenderCount(0)
    setProductThumbnails({})
    setRendering(false)
    setError('')
    setNotice(null)
    setVersion(previous => previous + 1)
  }

  useLayoutEffect(() => {
    const resume = !previousGuide.current
    previousGuide.current = guidedCamera
    if (!guidedCamera) return
    if (resume) { restart(); setTheme('light') }
    setProduct(porsche)
    setSelected([guidedCamera])
    setActive(guidedCamera)
    setCurrentOutput(null)
  }, [guidedCamera]) // Only an authored camera change may write to the manual selection.

  function previewCamera(id: string) {
    setActive(id)
    setCurrentOutput(null)
  }

  function toggleCamera(id: string) {
    const next = selected.includes(id) ? selected.filter(value => value !== id) : [...selected, id]
    setSelected(next)
    previewCamera(id)
    if (next.length > 1) setBatch(true)
  }

  function toggleAllCameras() {
    if (selected.length === cameras.length) setSelected([])
    else {
      setSelected(cameras.map(view => view.id))
      setBatch(true)
    }
  }

  function changeBatch(enabled: boolean) {
    setBatch(enabled)
    if (!enabled && selected.length > 1) {
      const id = selected.includes(active) ? active : selected[0]
      setSelected([id])
      previewCamera(id)
    }
  }

  function saveView(name: string) {
    const view = { ...activeView, id: 'saved-' + ++savedViews.current, name }
    setCameras(previous => [...previous, view])
    previewCamera(view.id)
    setNotice({ message: 'Camera view saved' })
  }

  function setThumbnail(output: RenderOutput) {
    setProductThumbnails(previous => ({ ...previous, [output.product.id]: output.url }))
    setNotice({ message: 'Product thumbnail updated' })
  }

  async function createRenders() {
    if (rendering || !isPorsche || !queuedViews.length) return
    const id = ++request.current
    setRendering(true)
    setError('')
    try {
      const [images] = await Promise.all([
        Promise.all(queuedViews.map(view => renderCamera(view, size, format))),
        new Promise(resolve => window.setTimeout(resolve, 380)),
      ])
      if (id !== request.current) return

      const next = queuedViews.map((view, index): RenderOutput => {
        const url = URL.createObjectURL(images[index])
        urls.current.push(url)
        return {
          id: id + '-' + view.id,
          product: porsche,
          name: view.name,
          file: porsche.id + '-' + view.id + (format === 'jpeg' ? '.jpg' : '.png'),
          url,
          sourceImage: view.image,
          detail: format.toUpperCase() + ' · Just now',
        }
      })
      setOutputs(previous => [...next, ...previous])
      setNewRenderCount(previous => previous + next.length)
      setCurrentOutput(next[0])
      setHistoryTab('renders')
      setConfirming(false)
      setNotice({ message: next.length === 1 ? 'Render created' : next.length + ' renders created' })
    } catch {
      if (id === request.current) setError('Could not create the renders. Try again.')
    } finally {
      if (id === request.current) setRendering(false)
    }
  }

  const workspace = <main id={guidedCamera || onReturn ? undefined : "main-content"} className={shell.app + ' ' + s.app} data-theme={theme} onKeyDown={event => {
      if (event.key === 'Escape' && !onReturn && product && !confirming && !event.defaultPrevented) back()
    }}>
      <div className={shell.notifications} role="status" aria-atomic="true">
        {notice && <div className={shell.toast}><Check size={16} aria-hidden="true" /><span>{notice.message}</span></div>}
      </div>
      <div className={s.library} hidden={Boolean(product)}>
        <ProductsLibrary onOpenConfigurator={onOpenConfigurator} onOpenApplications={onOpenApplications} key={version} onOpen={openProduct} onOpenRender={openRender} onRendersRead={() => setNewRenderCount(0)}
          newRenderCount={newRenderCount} productThumbnails={productThumbnails} renders={allRenders.map(output => ({
            id: output.id, name: output.product.name + ' · ' + output.name, image: output.url, detail: output.detail,
          }))} />
      </div>
      {product && <div className={s.editor}>
        <aside className={s.history} aria-label="Render history">
          <img className={s.wordmark} src={editorAssets + 'metabox-wordmark.svg'} alt="Metabox" width="135.86" height={24} />
          <div className={s.tabs} role="group" aria-label="History type">
            <button type="button" aria-pressed={historyTab === 'renders'} onClick={() => setHistoryTab('renders')}>Renders</button>
            <button type="button" aria-pressed={historyTab === 'spinners'} onClick={() => setHistoryTab('spinners')}>Spinners</button>
          </div>
          <div className={s.historyList}>
            {historyTab === 'renders' && history.map(output => <div className={s.historyRow} data-render-history-row key={output.id}>
              <button type="button" className={s.historyItem} aria-pressed={currentOutput?.id === output.id} onClick={() => setCurrentOutput(output)}>
                <img src={output.url} alt="" width={32} height={32} />
                <span><strong>{output.name}</strong><small>{output.detail}</small></span>
              </button>
              <RenderHistoryMenu name={output.name} url={output.url} file={output.file}
                isThumbnail={productThumbnails[product.id] === output.url} onThumbnail={() => setThumbnail(output)} />
            </div>)}
            {historyTab === 'spinners' && <p>No spinners yet</p>}
            {historyTab === 'renders' && !history.length && <p>No renders yet</p>}
          </div>
          <div className={s.profile}><span aria-hidden="true">{profile.initials}</span>{profile.name}</div>
        </aside>

        <section className={s.workspace} aria-label="Render preview">
          <header className={s.header}>
            <button type="button" aria-label="Back to library" onClick={back}
              className={controls.button + ' ' + controls.secondary + ' ' + controls.compact + ' ' + s.iconButton}>
              <img src={editorAssets + 'back.svg'} alt="" width={16} height={16} />
            </button>
            <h1 ref={heading} tabIndex={-1}>{product.name}</h1>
          </header>
          <div className={s.stage}>
            {currentImage
              ? <img key={currentImage + ':' + imageAttempt} className={s.scene} src={currentImage}
                onLoad={() => setLoadedScene(currentImage)}
                onError={() => { setLoadedScene(undefined); onUnavailable?.() }}
                alt={product.name + (currentOutput ? ' · ' + currentOutput.name : isPorsche ? ' · ' + activeView.name : '')} />
              : <div className={s.noPreview}><Box size={28} aria-hidden="true" />No preview available</div>}
            {outline && currentImage === loadedScene && <svg className={s.sceneOutline}
              viewBox={`0 0 ${outline.width} ${outline.height}`} aria-hidden="true" focusable="false">
              <path d={outline.path} vectorEffect="non-scaling-stroke" />
            </svg>}
          </div>
        </section>

        {isPorsche ? <RenderSettingsPanel key={version} cameras={cameras} selected={selected} active={active} guided={Boolean(guidedCamera)}
          product={{ ...porsche, image: productThumbnails[porsche.id] ?? porsche.image }} onProduct={() => previewCamera(currentCamera.id)}
          size={size} format={format} onCamera={toggleCamera} onSelectAll={toggleAllCameras} onSaveView={saveView} onSize={setSize}
          onFormat={setFormat} onBatch={changeBatch} batch={batch} onRender={() => { setError(''); setConfirming(true) }} rendering={rendering} />
          : <aside className={s.unavailable}><h2>Camera Views</h2><p>Open Porsche 911 Carrera to try batch rendering.</p></aside>}

        <RenderConfirm open={confirming} onClose={() => setConfirming(false)} onRender={createRenders}
          views={queuedViews} size={size} format={format} onSize={setSize} onFormat={setFormat}
          productName={product.name} rendering={rendering} error={error} />
      </div>}
    </main>
  return <DemoShell presentation={Boolean(guidedCamera)} {...(scenarioControls ?? { scenarios: undefined })} label="Metabox Products demo" theme={theme} onTheme={setTheme} onRestart={restart}
    onReturn={onReturn ?? (() => window.location.assign('/'))}>{workspace}</DemoShell>
}
