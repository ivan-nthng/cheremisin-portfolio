/** Server-visible decoration and parser bootstrap, rendered only by the home
 * Header. Serialize once in RootLayout: server/client compilers may emit
 * different function bodies. React is not the document's readiness gate. */
export function HomeEyeLoader({ bootstrap }: { bootstrap: string }) {
  return <>
    <link rel="preload" as="image" href="/images/home/loader-ring.svg" />
    <link rel="preload" as="image" href="/images/home/loader-eye.svg" />
    <script id="home-eye-bootstrap" dangerouslySetInnerHTML={{ __html: bootstrap }} />
    <div className="home-eye-loader" style={{ display: 'none' }}>
      <div className="home-eye-surface">
        <div className="home-eye-grid portfolio-grid-lane portfolio-grid-tracks" aria-hidden="true">
          <div className="home-eye-slot">
            <div className="home-eye-mark">
              {/* Exact MCP exports, kept at their intrinsic design dimensions. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="home-eye-ring" src="/images/home/loader-ring.svg" width={144} height={144} alt="" decoding="sync" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="home-eye-logo" src="/images/home/loader-eye.svg" width={40} height={40} alt="" decoding="sync" />
            </div>
          </div>
        </div>
        <span className="home-eye-status sr-only" role="status">Loading introduction</span>
      </div>
    </div>
  </>
}
