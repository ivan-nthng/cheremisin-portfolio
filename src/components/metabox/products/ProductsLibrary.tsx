'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useId, useRef, useState, type ChangeEvent } from 'react'
import { collections, profile } from '../catalog-fixtures'
import sidebar from '../metabox-catalog.module.css'
import { collectionProductIds, porsche, renderProducts, type RenderProduct } from './product-fixtures'
import styles from './products-library.module.css'

const libraryArt = '/images/metabox/products/library/'
const catalogArt = '/images/metabox/catalog/'
const uploadTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']
const filters = [
  { value: 'all', label: 'All products' },
  { value: 'rendered', label: 'With preview' },
  { value: 'without-preview', label: 'Without preview' },
] as const
const sorts = [
  { value: 'default', label: 'Library order' },
  { value: 'ascending', label: 'Name A–Z' },
  { value: 'descending', label: 'Name Z–A' },
] as const
type Filter = typeof filters[number]['value']
type Sort = typeof sorts[number]['value']
type Panel = 'filter' | 'sort' | 'search'
type LibrarySection = 'products' | 'renders'

export type LibraryRender = { id: string; name: string; image: string; detail: string }

function Icon({ name, width = 16, height = width, shared = false }: {
  name: string
  width?: number
  height?: number
  shared?: boolean
}) {
  return <img src={`${shared ? catalogArt : libraryArt}${name}.svg`} width={width} height={height} alt="" aria-hidden="true" />
}

function AssetTile({ name, image, detail, onClick, selected }: {
  name: string
  image?: string
  detail: string
  onClick: () => void
  selected?: boolean
}) {
  return <button type="button" className={styles.tile} aria-label={name} aria-description={detail} aria-pressed={selected}
    onClick={event => {
      event.currentTarget.focus({ preventScroll: true })
      onClick()
    }}>
    <span className={styles.tileHeader}>
      <Icon name="type-render" height={17} />
      <span className={styles.tileName} title={name}>{name}</span>
      <span className={styles.tileType} title={detail}>{detail}</span>
    </span>
    <span className={styles.thumbnail}>
      {image ? <Image src={image} fill alt="" sizes="(max-width: 640px) 50vw, (max-width: 1050px) 30vw, 20vw"
        unoptimized={image.startsWith('blob:')} /> : <Icon name="placeholder" width={28} />}
    </span>
  </button>
}

export function ProductTile({ product, onClick, selected }: {
  product: RenderProduct
  onClick: () => void
  selected?: boolean
}) {
  return <AssetTile name={product.name} image={product.image} detail="Product" onClick={onClick} selected={selected} />
}

export default function ProductsLibrary({ onOpen, onOpenConfigurator, onOpenApplications, renders, newRenderCount, onRendersRead, onOpenRender, productThumbnails }: {
  onOpenConfigurator?: () => void
  onOpenApplications?: () => void
  onOpen: (product: RenderProduct) => void
  renders: readonly LibraryRender[]
  newRenderCount: number
  onRendersRead: () => void
  onOpenRender: (renderId: string) => void
  productThumbnails: Readonly<Record<string, string>>
}) {
  const [section, setSection] = useState<LibrarySection>('products')
  const [panel, setPanel] = useState<Panel | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [sort, setSort] = useState<Sort>('default')
  const [query, setQuery] = useState('')
  const [renderQuery, setRenderQuery] = useState('')
  const [collectionId, setCollectionId] = useState('')
  const [uploads, setUploads] = useState<RenderProduct[]>([])
  const [uploadStatus, setUploadStatus] = useState('')
  const popupId = useId()
  const headingId = useId()
  const renderCountId = useId()
  const toolbar = useRef<HTMLDivElement>(null)
  const popup = useRef<HTMLDivElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const results = useRef<HTMLDivElement>(null)
  const triggers = useRef<Partial<Record<Panel, HTMLButtonElement>>>({})
  const objectUrls = useRef<string[]>([])

  useEffect(() => {
    if (!panel) return
    popup.current?.querySelector<HTMLInputElement>('input[type="search"], input:checked')?.focus({ preventScroll: true })
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !toolbar.current?.contains(event.target)) setPanel(null)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [panel])

  useEffect(() => {
    const urls = objectUrls.current
    return () => urls.forEach(url => URL.revokeObjectURL(url))
  }, [])

  useEffect(() => {
    if (results.current) results.current.scrollTop = 0
  }, [section])

  const isRenders = section === 'renders'
  const heading = isRenders ? 'Renders' : 'Products'
  const searchLabel = isRenders ? 'Search renders' : 'Search products'
  const searchTerm = query.trim().toLowerCase()
  const renderSearchTerm = renderQuery.trim().toLowerCase()
  const collection = collections.find(item => item.id === collectionId)
  const visibleProducts = [...uploads, ...renderProducts].map(product => {
    const image = productThumbnails[product.id] ?? product.image
    return image === product.image ? product : { ...product, image }
  })
  const matching = visibleProducts.filter(product => (
    (!collection || collectionProductIds[collection.id].includes(product.id)) &&
    (filter === 'all' || Boolean(product.image) === (filter === 'rendered')) &&
    product.name.toLowerCase().includes(searchTerm)
  ))
  if (sort !== 'default') {
    matching.sort((first, second) => first.name.localeCompare(second.name) * (sort === 'ascending' ? 1 : -1))
  }
  const visibleRenders = renders.filter(render => render.name.toLowerCase().includes(renderSearchTerm))

  function closePanel() {
    if (panel) triggers.current[panel]?.focus({ preventScroll: true })
    setPanel(null)
  }

  function resetView() {
    setPanel(null)
    setFilter('all')
    setSort('default')
    setQuery('')
    setCollectionId('')
  }

  function showSection(next: LibrarySection) {
    setPanel(null)
    setSection(next)
    if (next === 'renders') onRendersRead()
  }

  function goHome() {
    setSection('products')
    resetView()
  }

  function openProduct(product: RenderProduct) {
    setPanel(null)
    onOpen(product)
  }

  function addUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''
    if (!file) return
    if (!uploadTypes.includes(file.type) || file.size === 0 || file.size > 10 * 1024 * 1024) {
      setUploadStatus('Choose a PNG, JPEG, WebP, GIF, or AVIF image up to 10 MB.')
      return
    }
    const image = URL.createObjectURL(file)
    objectUrls.current.push(image)
    const name = file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim() || 'Uploaded image'
    setUploads(previous => [{ id: image, name, image }, ...previous])
    resetView()
    setUploadStatus(`${name} added to this demo.`)
  }

  const tiles = isRenders ? visibleRenders.map(render => <li key={render.id}>
    <AssetTile name={render.name} image={render.image} detail={render.detail} onClick={() => {
      setPanel(null)
      onOpenRender(render.id)
    }} />
  </li>) : matching.map(product => <li key={product.id}>
    <ProductTile product={product} onClick={() => openProduct(product)} />
  </li>)
  const listLabel = isRenders ? 'Render archive' : collection?.name ?? 'Product assets'
  const emptyLabel = isRenders
    ? renderSearchTerm ? 'No renders match your search.' : 'No renders yet.'
    : 'No products match your filters.'

  return <div className={sidebar.catalog}>
    <aside className={sidebar.sidebar} aria-label="Metabox navigation">
      <details className={styles.profileArea}>
        <summary className={sidebar.profile}>
          <span className={sidebar.avatar}>{profile.initials}</span><span>{profile.name}</span><Icon name="down" width={20} shared />
        </summary>
        <div className={styles.profileDetails}>{profile.workspace}</div>
      </details>
      <nav className={sidebar.navigation}>
        <div className={sidebar.navGroup}>
          <button type="button" onClick={goHome}><Icon name="home" width={20} shared /><span>Home</span></button>
          <button type="button" onClick={() => {
            if (panel === 'search') search.current?.focus()
            else setPanel('search')
          }}><Icon name="search" width={20} shared /><span>Search</span></button>
        </div>
        <span className={sidebar.navLabel}>Library</span>
        <div className={sidebar.navGroup}>
          <button type="button" aria-current={isRenders ? undefined : 'page'} onClick={() => showSection('products')}>
            <span className={sidebar.navIcon}><Icon name="nav-products" width={20} height={21} /></span><span>Products</span>
          </button>
          <button type="button" aria-current={isRenders ? 'page' : undefined} aria-label="Renders"
            aria-describedby={newRenderCount > 0 ? renderCountId : undefined} onClick={() => showSection('renders')}>
            <span className={sidebar.navIcon}><Icon name="nav-renders" width={20} height={21} /></span><span>Renders</span>
            {newRenderCount > 0 && <>
              <span className={styles.renderCount} aria-hidden="true">+{newRenderCount}</span>
              <span id={renderCountId} className={sidebar.srOnly}>{newRenderCount} new {newRenderCount === 1 ? 'render' : 'renders'}</span>
            </>}
          </button>
          <button type="button" onClick={onOpenConfigurator ?? (() => window.location.assign('/preview/metabox'))}><span className={sidebar.navIcon}><Icon name="nav-configurators" width={20} height={21} /></span><span>Configurators</span></button>
          <button type="button" disabled><span className={sidebar.navIcon}><Icon name="nav-metadata" width={20} height={21} /></span><span>Metadata</span></button>
        </div>
        <span className={sidebar.navLabel}>Collections</span>
        <div className={sidebar.navGroup}>
          {collections.map(item => <button type="button" key={item.id} aria-pressed={!isRenders && item.id === collectionId}
            onClick={() => {
              showSection('products')
              setCollectionId(!isRenders && item.id === collectionId ? '' : item.id)
            }}>{item.name}</button>)}
        </div>
      </nav>
      {onOpenApplications ? <button type="button" className={sidebar.powered} onClick={onOpenApplications}><Icon name="brand" shared /> Powered by Metabox</button> : <Link className={sidebar.powered} href="/preview/metabox/suite"><Icon name="brand" shared /> Powered by Metabox</Link>}
    </aside>

    <section className={styles.workspace} aria-labelledby={headingId}>
      <header className={styles.header}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <button type="button" className={styles.crumbButton} onClick={goHome}><Icon name="breadcrumb-home" /> Home</button>
          <span aria-hidden="true">/</span><span aria-current="page">{heading}</span>
        </nav>
        {!isRenders && <button type="button" className={styles.secondary} onClick={() => fileInput.current?.click()}>
          <Icon name="upload" width={20} /> Upload Assets
        </button>}
        <input ref={fileInput} type="file" accept={uploadTypes.join(',')} hidden onChange={addUpload} />
      </header>
      <div className={styles.toolbar}>
        <h1 id={headingId}>{heading}</h1>
        <div className={styles.actions} ref={toolbar} onKeyDown={event => {
          if (event.key === 'Escape' && panel) {
            event.preventDefault()
            event.stopPropagation()
            closePanel()
          }
        }}>
          <div className={styles.tools}>
            {(isRenders ? ['search'] as const : ['filter', 'sort', 'search'] as const).map(tool => {
              const label = { filter: 'Filter products', sort: 'Sort products', search: searchLabel }[tool]
              const active = { filter: filter !== 'all', sort: sort !== 'default', search: !!(isRenders ? renderSearchTerm : searchTerm) }[tool]
              return <button type="button" key={tool} className={styles.tool} aria-label={label} title={label}
                ref={node => { if (node) triggers.current[tool] = node }} data-active={active}
                aria-expanded={panel === tool} aria-controls={panel === tool ? popupId : undefined}
                onClick={event => {
                  event.currentTarget.focus({ preventScroll: true })
                  setPanel(panel === tool ? null : tool)
                }}><Icon name={tool} /></button>
            })}
          </div>
          <button type="button" className={styles.create} onClick={event => {
            event.currentTarget.focus({ preventScroll: true })
            openProduct(porsche)
          }}><Icon name="plus" shared /> Create Render</button>
          {panel && <div ref={popup} id={popupId} className={styles.popup}>
            {panel === 'search' ? <label className={styles.searchLabel}>
              {searchLabel}
              <input ref={search} className={styles.search} type="search" value={isRenders ? renderQuery : query}
                placeholder={isRenders ? 'Render name' : 'Product name'}
                onChange={event => (isRenders ? setRenderQuery : setQuery)(event.target.value)} />
            </label> : panel === 'filter' ? <fieldset>
              <legend>Preview status</legend>
              {filters.map(option => <label key={option.value}>
                <input type="radio" name={`${popupId}-filter`} checked={filter === option.value} onChange={() => setFilter(option.value)} />{option.label}
              </label>)}
            </fieldset> : <fieldset>
              <legend>Sort products</legend>
              {sorts.map(option => <label key={option.value}>
                <input type="radio" name={`${popupId}-sort`} checked={sort === option.value} onChange={() => setSort(option.value)} />{option.label}
              </label>)}
            </fieldset>}
          </div>}
        </div>
      </div>
      {!isRenders && uploadStatus && <p className={styles.uploadStatus} role="status">{uploadStatus}</p>}
      <div className={styles.results} ref={results}>
        {tiles.length ? <ul className={styles.tiles} aria-label={listLabel}>{tiles}</ul>
          : <div className={styles.empty}>
            <p>{emptyLabel}</p>
            {(!isRenders || renderSearchTerm) && <button type="button" className={styles.secondary}
              onClick={isRenders ? () => setRenderQuery('') : resetView}>Show all {section}</button>}
          </div>}
      </div>
    </section>
  </div>
}
