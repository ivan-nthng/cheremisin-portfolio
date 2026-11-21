import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const portfolio = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const saavi = process.env.SAAVI_SOURCE_ROOT || path.resolve(portfolio, '../saavi');
const vite = path.join(saavi, 'node_modules/vite/bin/vite.js');
const output = path.join(portfolio, 'public/saavi-kitchen-demo');
const processResult = await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [vite, 'build', '--config', 'work/saavi-kitchen-demo/vite.config.mjs'], {
    cwd: portfolio, stdio: 'inherit', env: { ...process.env, SAAVI_DEMO_STATIC_BUILD: '1' },
  });
  child.on('error', reject);
  child.on('exit', (code) => resolve(code));
});
if (processResult !== 0) process.exit(processResult || 1);

await mkdir(path.join(output, 'media'), { recursive: true });
const images = [
  path.join(portfolio, 'public/images/saavi/kitchen/soy-chicken-detail.jpg'),
  ...['lentils', 'fish', 'chicken', 'risotto', 'pasta'].map(name => path.join(saavi, `apps/web/public/landing/${name}.png`)),
];
for (const [index, source] of images.entries()) {
  await sharp(source).resize({ width: 1100, withoutEnlargement: true }).webp({ quality: 82 })
    .toFile(path.join(output, `media/${index}.webp`));
}
for (const role of ['kitchen', 'admin']) {
  await copyFile(path.join(saavi, `packages/design-system/assets/hub-soft-3d/png-64/hub-${role}.png`),
    path.join(portfolio, `public/demo-role-${role}.png`));
}
