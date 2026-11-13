import { NextRequest, NextResponse } from 'next/server'

/** Fixed fictional photo IDs from the published Saavi demo bundle. */
export function GET(request: NextRequest) {
  const assetId = request.nextUrl.searchParams.get('assetId')
  if (!assetId || !/^[-\w]+$/.test(assetId)) return new NextResponse(null, { status: 404 })
  const index = Number(assetId.slice(-12)) - 300
  if (!Number.isInteger(index) || index < 0 || index > 5) return new NextResponse(null, { status: 404 })
  return NextResponse.redirect(new URL(`/saavi-kitchen-demo/media/${index}.webp`, request.url), 307)
}
