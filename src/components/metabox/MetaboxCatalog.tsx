'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import MetaboxSelect from './MetaboxSelect'
import { catalogTitle, collections, environments, products, profile, sofaName, type CatalogItem } from './catalog-fixtures'
import styles from './metabox-catalog.module.css'
import controls from './metabox-controls.module.css'

const assetBase = '/images/metabox/catalog/'
const materials = ['Warm greige', 'Pebble', 'Natural oak']
const libraryItems = [
  { label: 'Products', icon: 'products' },
  { label: 'Renders', icon: 'renders' },
  { label: 'Configurators', icon: 'configurators' },
  { label: 'Metadata', icon: 'metadata' },
] as const

type Dialog = 'search' | 'profile' | 'metadata' | 'share' | 'more'
  | 'add-product' | 'add-environment' | 'product-material' | 'environment-material' | 'action'

function Icon({ name }: { name: string }) {
  const tall = ['products', 'renders', 'configurators', 'metadata'].includes(name)
  const width = tall || ['down', 'home', 'search', 'close', 'plus-lg'].includes(name) ? 20 : 16
  return <img src={assetBase + name + '.svg'} width={width} height={tall ? 21 : width} alt="" aria-hidden="true" />
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (next: boolean) => void }) {
  return <button type="button" className={styles.switch} role="switch" aria-label={label} aria-checked={checked} onClick={() => onChange(!checked)}>
    <span />
  </button>
}

function ItemList({ items, selected, onSelect, onRemove, onMove }: {
  items: CatalogItem[]
  selected: string
  onSelect: (id: string) => void
  onRemove: (id: string) => void
  onMove: (id: string, index: number) => void
}) {
  return <div className={styles.items}>
    {items.map((item, index) => <div className={styles.item} key={item.id}
      data-selected={item.id === selected} data-default={item.id === 'sofa'}
      onDragOver={event => {
        if (!event.dataTransfer.types.includes('application/x-metabox-item')) return
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
      }}
      onDrop={event => {
        const id = event.dataTransfer.getData('application/x-metabox-item')
        if (!id) return
        event.preventDefault()
        onMove(id, index)
      }}>
      <button type="button" className={styles.rowGrip} draggable
        aria-label={`Reorder ${item.displayName} with Up and Down arrows`}
        onDragStart={event => {
          event.dataTransfer.effectAllowed = 'move'
          event.dataTransfer.setData('application/x-metabox-item', item.id)
        }}
        onKeyDown={event => {
          if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return
          event.preventDefault()
          onMove(item.id, index + (event.key === 'ArrowUp' ? -1 : 1))
        }}>
        <Icon name="drag" />
      </button>
      <button type="button" className={styles.itemSelect} aria-label={item.displayName} aria-pressed={item.id === selected} onClick={() => onSelect(item.id)}>
        <img className={styles.thumbnail} src={assetBase + item.asset} width={64} height={64} alt="" />
        <span className={styles.itemText}>
          <span className={styles.itemTitle}>{item.name}</span>
          <span className={styles.itemDetail}><span>Display name:</span> {item.displayName}</span>
        </span>
        {item.id === 'sofa' && <span className={styles.badge}>Default</span>}
      </button>
      {item.id !== 'sofa' && <button type="button" className={styles.remove} aria-label={`Remove ${item.displayName}`} onClick={() => onRemove(item.id)}>
        <Icon name="close" />
      </button>}
    </div>)}
  </div>
}

function moveItem(items: CatalogItem[], id: string, index: number) {
  const from = items.findIndex(item => item.id === id)
  if (from < 0 || from === index || index < 0 || index >= items.length) return items
  const next = [...items]
  const [item] = next.splice(from, 1)
  next.splice(index, 0, item)
  return next
}

export default function MetaboxCatalog({ onSetCamera, onPreview, onSave, measurements, onMeasurementsChange, onOpenApplications }: {
  onOpenApplications?: () => void
  onSetCamera: (trigger: HTMLButtonElement) => void
  onPreview: (trigger: HTMLButtonElement) => void
  onSave: (message: string) => void
  measurements?: boolean
  onMeasurementsChange?: (enabled: boolean) => void
}) {
  const [active, setActive] = useState('Configurators')
  const [collection, setCollection] = useState(collections[0])
  const [collectionLabels, setCollectionLabels] = useState<Record<string, string>>({})
  const [title, setTitle] = useState(catalogTitle)
  const [productItems, setProductItems] = useState(products)
  const [environmentItems, setEnvironmentItems] = useState(environments)
  const [selectedProduct, setSelectedProduct] = useState('sofa')
  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[0].id)
  const [streaming, setStreaming] = useState(true)
  const [localMeasurements, setLocalMeasurements] = useState(false)
  const [productMaterial, setProductMaterial] = useState('')
  const [environmentMaterial, setEnvironmentMaterial] = useState('')
  const [action, setAction] = useState('')
  const [dialog, setDialog] = useState<Dialog | null>(null)
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const productsRef = useRef<HTMLElement>(null)
  const environmentsRef = useRef<HTMLElement>(null)
  const sequence = useRef(0)
  const canSetCamera = selectedProduct === 'sofa'
  const showMeasurements = measurements ?? localMeasurements

  useEffect(() => {
    const node = dialogRef.current
    if (dialog && node && !node.open) node.showModal()
    if (!dialog && node?.open) node.close()
  }, [dialog])

  function open(next: Dialog, value = '') {
    setDraft(value)
    setDialog(next)
  }

  function jump(section: 'Products' | 'Renders' | 'Configurators' | 'Home') {
    setActive(section === 'Home' ? 'Configurators' : section)
    const node = section === 'Renders' ? environmentsRef.current : productsRef.current
    node?.scrollIntoView({ block: 'nearest' })
  }

  function addItem(target: 'product' | 'environment') {
    const item = (target === 'product' ? products : environments).find(entry => entry.id === draft)
    if (!item) return false
    const added = { ...item, id: `${item.id}-copy-${++sequence.current}` }
    if (target === 'product') {
      setProductItems(previous => [...previous, added])
      setSelectedProduct(added.id)
    } else {
      setEnvironmentItems(previous => [...previous, added])
      setSelectedEnvironment(added.id)
    }
    return true
  }

  function saveDialog() {
    const value = draft.trim()
    let message: string
    switch (dialog) {
      case 'metadata':
        if (!value) return
        setTitle(value)
        message = 'Configurator name saved'
        break
      case 'action':
        setAction(value)
        message = 'Action button saved'
        break
      case 'product-material':
        setProductMaterial(value)
        message = 'Product material saved'
        break
      case 'environment-material':
        setEnvironmentMaterial(value)
        message = 'Environment material saved'
        break
      case 'add-product':
        if (!addItem('product')) return
        message = 'Product added'
        break
      case 'add-environment':
        if (!addItem('environment')) return
        message = 'Environment added'
        break
      default: return
    }
    setDialog(null)
    onSave(message)
  }

  const dialogTitle = dialog === 'search' ? 'Search products'
    : dialog === 'profile' ? 'Workspace'
    : dialog === 'metadata' ? 'Edit configurator'
    : dialog === 'share' ? 'Share preview'
    : dialog === 'more' ? 'Configurator options'
    : dialog === 'action' ? 'Custom action button'
    : dialog === 'add-product' ? 'Add product'
    : dialog === 'add-environment' ? 'Add environment' : 'Assign materials'

  let dialogBody: ReactNode = null
  if (dialog === 'search') {
    const query = draft.trim().toLowerCase()
    const matches = productItems.filter(item => [item.displayName, item.name].some(name => name.toLowerCase().includes(query)))
    dialogBody = <>
      <label className={styles.dialogLabel}>Product name<input className={controls.field} value={draft} onChange={event => setDraft(event.target.value)} /></label>
      <div className={styles.searchResults}>
        {matches.map(item =>
          <button type="button" key={item.id} className={`${controls.button} ${controls.secondary}`} onClick={() => {
            setSelectedProduct(item.id)
            setDialog(null)
            jump('Products')
          }}>{item.displayName}</button>)}
        {!matches.length && <p>No products match.</p>}
      </div>
    </>
  } else if (dialog === 'profile') {
    dialogBody = <p>{profile.name} · {profile.workspace}</p>
  } else if (dialog === 'share') {
    dialogBody = <p>Open Preview to inspect this configurator on this device.</p>
  } else if (dialog === 'more') {
    dialogBody = <button type="button" className={`${controls.button} ${controls.secondary}`} onClick={() => open('metadata', title)}>Edit configurator</button>
  } else if (dialog === 'metadata' || dialog === 'action') {
    dialogBody = <label className={styles.dialogLabel}>{dialog === 'metadata' ? 'Configurator name' : 'Button label'}
      <input className={controls.field} value={draft} maxLength={80} onChange={event => setDraft(event.target.value)} />
    </label>
  } else if (dialog) {
    const items = dialog === 'add-product' ? products : dialog === 'add-environment' ? environments : null
    const options = items?.map(item => ({ value: item.id, label: item.displayName })) ?? materials.map(label => ({ value: label, label }))
    const label = dialog === 'add-product' ? 'Product' : dialog === 'add-environment' ? 'Environment' : 'Material'
    dialogBody = <div className={styles.dialogLabel}>
      <span>{label}</span>
      <MetaboxSelect label={label} value={draft} options={options} onChange={setDraft} />
    </div>
  }

  const editableDialog = dialog && !['search', 'profile', 'share', 'more'].includes(dialog)
  return <div className={styles.catalog}>
    <aside className={styles.sidebar} aria-label="Metabox navigation">
      <button type="button" className={styles.profile} onClick={() => open('profile')}>
        <span className={styles.avatar} aria-hidden="true">{profile.initials}</span><span>{profile.name}</span><Icon name="down" />
      </button>
      <nav className={styles.navigation}>
        <div className={styles.navGroup}>
          <button type="button" onClick={() => jump('Home')}><Icon name="home" /><span>Home</span></button>
          <button type="button" onClick={() => open('search')}><Icon name="search" /><span>Search</span></button>
        </div>
        <span className={styles.navLabel}>Library</span>
        <div className={styles.navGroup}>
          {libraryItems.map(item => <button type="button" key={item.label} aria-current={active === item.label ? 'page' : undefined} onClick={() => {
            if (item.label === 'Metadata') open('metadata', title)
            else jump(item.label)
          }}><span className={styles.navIcon}><Icon name={item.icon} /></span><span>{item.label}</span></button>)}
        </div>
        <span className={styles.navLabel}>Collections</span>
        <div className={styles.navGroup}>
          {collections.map(entry => <button type="button" key={entry.id} aria-pressed={collection.id === entry.id} onClick={() => {
            setCollection(entry)
            jump('Configurators')
          }}>{entry.name}</button>)}
        </div>
      </nav>
      {onOpenApplications ? <button type="button" className={styles.powered} onClick={onOpenApplications}><Icon name="brand" /> Powered by Metabox</button> : <Link className={styles.powered} href="/preview/metabox/suite"><Icon name="brand" /> Powered by Metabox</Link>}
    </aside>

    <section className={styles.workspace} aria-label="Metabox configurator">
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <button type="button" className={`${controls.button} ${controls.quiet} ${controls.compact} ${styles.iconButton}`} aria-label="Back to products" onClick={() => jump('Products')}><Icon name="left" /></button>
          <h1>{title}</h1>
          <button type="button" className={`${controls.button} ${controls.quiet} ${controls.compact} ${styles.iconButton}`} aria-label="Rename configurator" onClick={() => open('metadata', title)}><Icon name="edit" /></button>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={`${controls.button} ${controls.quiet} ${controls.compact} ${styles.iconButton}`} aria-label="Share preview" onClick={() => open('share')}><Icon name="share" /></button>
          <button type="button" className={`${controls.button} ${controls.quiet} ${controls.compact} ${styles.iconButton}`} aria-label="Configurator options" onClick={() => open('more')}><Icon name="more" /></button>
          <button type="button" className={`${controls.button} ${controls.primary} ${controls.compact} ${styles.previewButton}`} disabled={!streaming || !canSetCamera} onClick={event => onPreview(event.currentTarget)}><Icon name="preview" /> Preview</button>
        </div>
      </header>

      <div className={styles.columns}>
        <div className={styles.catalogList}>
          <section ref={productsRef} className={styles.card} aria-labelledby="metabox-products">
            <div className={styles.cardHeading}>
              <h2 id="metabox-products">Products</h2>
              <div className={styles.cardActions}>
                <button type="button" className={`${controls.button} ${controls.secondary} ${styles.toolbarButton}`} onClick={() => open('product-material', productMaterial || materials[0])}><Icon name="materials" /> Assign Materials</button>
                <button type="button" className={`${controls.button} ${controls.secondary} ${styles.toolbarButton}`} onClick={() => open('add-product', products[0].id)}><Icon name="plus" /> Add Product</button>
              </div>
            </div>
            <label className={styles.collectionLabel}>
              <span>Collection label</span>
              <input className={controls.field} value={collectionLabels[collection.id] ?? collection.label} onChange={event => {
                const label = event.target.value
                setCollectionLabels(labels => ({ ...labels, [collection.id]: label }))
              }} />
            </label>
            {productMaterial && <p className={styles.applied}>Product material: {productMaterial}</p>}
            <ItemList items={productItems} selected={selectedProduct} onSelect={setSelectedProduct}
              onMove={(id, index) => setProductItems(items => moveItem(items, id, index))} onRemove={id => {
              setProductItems(items => items.filter(item => item.id !== id))
              if (id === selectedProduct) setSelectedProduct('sofa')
            }} />
          </section>

          <section ref={environmentsRef} className={styles.card} aria-labelledby="metabox-environments">
            <div className={styles.cardHeading}>
              <h2 id="metabox-environments">Environments</h2>
              <div className={styles.cardActions}>
                <button type="button" className={`${controls.button} ${controls.secondary} ${styles.toolbarButton}`} onClick={() => open('environment-material', environmentMaterial || materials[0])}><Icon name="materials" /> Assign Materials</button>
                <button type="button" className={`${controls.button} ${controls.secondary} ${styles.toolbarButton}`} onClick={() => open('add-environment', environments[0].id)}><Icon name="plus" /> Add Environment</button>
              </div>
            </div>
            {environmentMaterial && <p className={styles.applied}>Environment material: {environmentMaterial}</p>}
            <ItemList items={environmentItems} selected={selectedEnvironment} onSelect={setSelectedEnvironment}
              onMove={(id, index) => setEnvironmentItems(items => moveItem(items, id, index))} onRemove={id => {
              setEnvironmentItems(items => items.filter(item => item.id !== id))
              if (id === selectedEnvironment) setSelectedEnvironment('')
            }} />
          </section>
        </div>

        <aside className={styles.settings} aria-label="Configurator settings">
          <section className={styles.cameraCard}>
            <div className={styles.settingHeading}>
              <h2>Camera Position</h2>
              <button type="button" className={`${controls.button} ${controls.secondary} ${styles.toolbarButton}`} disabled={!canSetCamera} onClick={event => onSetCamera(event.currentTarget)}><Icon name="camera" /> Set Camera</button>
            </div>
            {!canSetCamera && <p>Choose {sofaName} to edit its camera.</p>}
          </section>

          <section className={styles.settingCard}>
            <div className={styles.settingRow}>
              <div>
                <h2>Streaming</h2>
                <p>Turning streaming off makes the configurator unavailable to the users and for preview</p>
              </div>
              <Toggle label="Streaming" checked={streaming} onChange={setStreaming} />
            </div>
            <div className={styles.settingRow}>
              <div>
                <h2>3D Measurements Overlay</h2>
                <p>Show dynamic rulers and dimensions next to 3D objects for accurate size visualization inside the scene.</p>
              </div>
              <Toggle label="3D Measurements Overlay" checked={showMeasurements} onChange={enabled => {
                setLocalMeasurements(enabled)
                onMeasurementsChange?.(enabled)
              }} />
            </div>
          </section>

          <section className={styles.settingCard}>
            <h2>Custom Action Button</h2>
            <p>Add a configurable call-to-action button inside the configurator. Sends the selected setup to your system.</p>
            <button type="button" className={`${controls.button} ${controls.secondary} ${styles.actionButton}`} onClick={() => open('action', action)}>
              <Icon name={action ? 'edit' : 'plus-lg'} /> {action || 'Add Button'}
            </button>
          </section>
        </aside>
      </div>
      <span className={styles.srOnly} role="status">{status}</span>
    </section>

    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="metabox-catalog-dialog-title" onCancel={() => setDialog(null)}>
      <form onSubmit={event => {
        event.preventDefault()
        if (editableDialog) saveDialog()
        else setDialog(null)
      }}>
        <div className={styles.dialogHeading}>
          <h2 id="metabox-catalog-dialog-title">{dialogTitle}</h2>
          <button type="button" className={`${controls.button} ${controls.quiet} ${controls.compact} ${styles.iconButton}`} aria-label="Close dialog" onClick={() => setDialog(null)}><Icon name="close" /></button>
        </div>
        {dialogBody}
        <div className={styles.dialogActions}>
          {dialog === 'share' && <button type="button" className={`${controls.button} ${controls.secondary}`} onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href)
              setStatus('Preview link copied')
              setDialog(null)
            } catch {
              setStatus('Preview link could not be copied')
            }
          }}>Copy link</button>}
          <button type="button" className={`${controls.button} ${controls.secondary}`} onClick={() => setDialog(null)}>{editableDialog ? 'Cancel' : 'Done'}</button>
          {editableDialog && <button type="submit" className={`${controls.button} ${controls.primary}`} disabled={dialog !== 'action' && !draft.trim()}>Save</button>}
        </div>
      </form>
    </dialog>
  </div>
}
