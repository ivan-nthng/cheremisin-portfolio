import { Fragment } from 'react'

const mapCredits = [
  { name: '© OpenMapTiles', href: 'https://www.openmaptiles.org/' },
  { name: 'OpenStreetMap', href: 'https://www.openstreetmap.org/copyright' },
]

export function MapAttribution({ linked = true }: { linked?: boolean }) {
  return mapCredits.map(({ name, href }, i) => <Fragment key={href}>
    {i > 0 && ' · '}
    {linked ? <a href={href} target="_blank" rel="noreferrer">{name}</a> : name}
  </Fragment>)
}
