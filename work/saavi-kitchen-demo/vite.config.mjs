import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {createReadStream} from 'node:fs';
import {adminPresentation} from './admin-adapter.mjs';
const root = path.dirname(fileURLToPath(import.meta.url));
const portfolio = path.resolve(root, '../..');
const saavi = process.env.SAAVI_SOURCE_ROOT || path.resolve(portfolio, '../saavi');
const staticBuild = process.env.SAAVI_DEMO_STATIC_BUILD === '1';
export default {
  root, base: staticBuild ? '/saavi-kitchen-demo/' : '/',
  publicDir: staticBuild ? false : path.join(portfolio, 'public'),
  resolve: { alias: [
    {find: 'next/navigation', replacement: path.join(root, 'navigation.ts')},
    {find: /^@native\/(.*)/, replacement: `${saavi}/apps/web/src/$1`},
    {find: /^@saavi\/design-system\/assets\/(.*)/, replacement: `${saavi}/packages/design-system/assets/$1`},
    {find: /^@saavi\/design-system\/patterns$/, replacement: `${saavi}/packages/design-system/src/patterns/index.ts`},
    {find: /^@saavi\/design-system\/(?!components$)(.*)/, replacement: `${saavi}/packages/design-system/src/$1`},
    {find: /^@saavi\/i18n\/hub$/, replacement: `${saavi}/packages/i18n/src/hub.ts`},
    {find: '@saavi/i18n', replacement: `${saavi}/packages/i18n/src/index.ts`},
    {find: '@saavi/contracts', replacement: `${saavi}/packages/contracts/src/index.ts`},
    {find: '@portfolio', replacement: `${portfolio}/src`},
    {find: /^react-dom(\/.*)?$/, replacement: `${portfolio}/node_modules/react-dom$1`},
    {find: /^react(\/.*)?$/, replacement: `${portfolio}/node_modules/react$1`},
  ], dedupe: ['react', 'react-dom'] },
  plugins: [{ name: 'standalone-presentation', enforce: 'pre', resolveId(source, importer) {
    if (source === '@saavi/design-system/components') return importer?.endsWith('/kitchen/dish-editor.tsx') ? path.join(root, 'dish-dialog.tsx') : `${saavi}/packages/design-system/src/components/index.ts`;
    if (!importer?.startsWith(`${saavi}/apps/web/src/`)) return;
    if (source.endsWith('/workspace-services')) return path.join(root, 'roles.tsx');
    if (source === './kitchen-orders-parts') return path.join(root, 'order-presentation.tsx');
    if (source === './admin-order-payment') return path.join(root, 'admin-order-payment.tsx');
  }, transform(code, id) {
    if(id.startsWith(saavi))code=adminPresentation(code,id);
    if(id.endsWith('/components/kitchen/kitchen-orders.tsx')) {
      // Keep the native detail row; label the same fictional method shown by its icon.
      code=`import {demoPaymentMethod} from ${JSON.stringify(path.join(root,'store.ts'))};\n`+code.replace('{m.cash}', '{demoPaymentMethod(order.orderId)}');
    }
    if(id.endsWith('/components/kitchen/kitchen-production.tsx')) {
      code=code.replace('<OrderMethod order={facts}', '<OrderMethod order={{...facts,orderId:value.orderId}}');
    }
    // Native focus still runs, but authored iframe navigation must not scroll its parent page.
    const focusOwners = ['/apps/web/src/components/kitchen/kitchen-overview.tsx', '/packages/design-system/src/components/Menu/Menu.tsx', '/packages/design-system/src/components/modal/focus-scope.ts'];
    if (!id.startsWith(saavi) || !focusOwners.some(owner => id.endsWith(owner))) return code;
    return code.replace(/\.focus\(\)/g, ".focus({ preventScroll: new URLSearchParams(location.search).get('mode') === 'guided' })");
  } }, { name: 'local-demo-media' , configureServer(server) { server.middlewares.use((req, res, next) => {
    const url = new URL(req.url, 'http://localhost');
    if (['/demo-role-kitchen.png','/demo-role-admin.png'].includes(url.pathname)) {
      const role=url.pathname.includes('kitchen')?'kitchen':'admin';
      res.setHeader('Content-Type','image/png');createReadStream(path.join(saavi,`packages/design-system/assets/hub-soft-3d/png-64/hub-${role}.png`)).pipe(res);return;
    }
    if (!['/api/kitchen/dishes/photo','/api/kitchen/production/media','/api/admin/offers/media','/api/admin/submitted/photo'].includes(url.pathname)) return next();
    const index = Number((url.searchParams.get('assetId') || '').slice(-12)) - 300;
    const files = [path.join(portfolio, 'public/images/saavi/kitchen/soy-chicken-detail.jpg'), ...['lentils','fish','chicken','risotto','pasta'].map(name=>path.join(saavi, `apps/web/public/landing/${name}.png`))];
    if (!files[index]) {res.statusCode=404;res.end();return;}
    res.setHeader('Content-Type',index===0?'image/jpeg':'image/png');createReadStream(files[index]).pipe(res);
  }); } }, { name: 'native-next-image-metadata', transform(code, id) {
    if (!id.startsWith(saavi) || !/\.[jt]sx?$/.test(id)) return;
    return code.replace(/import (\w+) from (["'][^"']+\.(?:png|jpg|webp)["']);/g, (_, name, file) => `import ${name}Url from ${file}; const ${name} = { src: ${name}Url };`);
  } }],
  // Native sources are being developed in parallel; a review session must not reset itself.
  server: { hmr: false, host: '127.0.0.1', port: 3310, strictPort: true, fs: {allow: [portfolio, saavi]} },
  build: { outDir: staticBuild ? path.join(portfolio, 'public/saavi-kitchen-demo') : '/tmp/saavi-kitchen-standalone-build', emptyOutDir: true, copyPublicDir: false },
  // Isolate this entry from the portfolio's Tailwind/PostCSS and Next compilation.
  css: {postcss: {plugins: []}},
  esbuild: {jsx: 'automatic'},
};
