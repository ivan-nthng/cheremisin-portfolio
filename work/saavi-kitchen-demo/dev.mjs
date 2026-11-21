import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const saavi=process.env.SAAVI_SOURCE_ROOT || path.resolve(root,'../../../saavi');
const {createServer}=await import(pathToFileURL(path.join(saavi,'node_modules/vite/dist/node/index.js')).href);
const server=await createServer({configFile:path.join(root,'vite.config.mjs')});
await server.listen();server.printUrls();
