import { ImageResponse } from 'next/og'
import { siteName, socialImage } from '@/lib/seo'

export const alt = socialImage.alt
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      width: '100%', height: '100%', padding: '72px 80px',
      background: '#3A0823', color: '#FFE7A3', fontFamily: 'sans-serif',
    }}>
      <div style={{ display: 'flex', fontSize: 28 }}>cheremisin.co.uk</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', fontSize: 76, letterSpacing: -3 }}>{siteName}</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 36, lineHeight: 1.35 }}>
          <div style={{ display: 'flex' }}>Product designer</div>
          <div style={{ display: 'flex' }}>Product builder</div>
        </div>
      </div>
    </div>,
    size,
  )
}
