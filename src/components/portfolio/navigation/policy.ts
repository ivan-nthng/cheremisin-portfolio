export const casePaths = [
  '/projects/taxi-aggregator-support-workspace', '/projects/litres',
  '/projects/ds-hito',
  '/projects/litres-library', '/projects/metabox',
  '/preview/citymobil-case', '/preview/litres',
  '/preview/litres-library-case', '/preview/metabox-case',
] as const

export const ordinaryPaths = new Set<string>(['/', '/manifesto', '/projects', ...casePaths])
export const isCasePath = (path: string) => (casePaths as readonly string[]).includes(path)
export const isPagesPath = (path: string) => path === '/projects/ds-hito'
export const homeBackHref = (path: string) => isCasePath(path) ? '/#projects' : '/'

export function ordinaryNavigation(from: URL, to: URL) {
  return from.origin === to.origin && from.pathname !== to.pathname &&
    ordinaryPaths.has(from.pathname) && ordinaryPaths.has(to.pathname)
}

export function appPopstateRecoveryHref(state: unknown, pathname: string | null, destination: URL) {
  if (state !== null || !pathname || isPagesPath(destination.pathname) ||
      !ordinaryNavigation(new URL(pathname, destination.origin), destination)) return null
  return destination.pathname + destination.search + destination.hash
}

// Runs before first paint in both documents. Native snapshots are progressive
// enhancement only; unsupported browsers retain normal document navigation.
export const nativePageMotion = `(() => {
  const paths = new Set(${JSON.stringify([...ordinaryPaths])});
  const allowed = (from, to) => {
    if (!from || !to || matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const a = new URL(from), b = new URL(to);
    return a.origin === b.origin && a.pathname !== b.pathname && b.pathname !== '/' &&
      paths.has(a.pathname) && paths.has(b.pathname) && !document.querySelector('dialog[open],[role="dialog"][aria-modal="true"]');
  };
  addEventListener('pageswap', e => {
    if (e.viewTransition && !allowed(e.activation?.from?.url, e.activation?.entry?.url)) e.viewTransition.skipTransition();
  });
  addEventListener('pagereveal', e => {
    const activation = window.navigation?.activation;
    if (e.viewTransition && !allowed(activation?.from?.url, location.href)) e.viewTransition.skipTransition();
  });
})();`
