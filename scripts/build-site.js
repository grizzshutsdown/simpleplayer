import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const assetsSource = join(root, 'assets');
const assetsTarget = join(dist, 'assets');

mkdirSync(assetsTarget, { recursive: true });
cpSync(assetsSource, assetsTarget, { recursive: true });

const html = readFileSync(join(root, 'index.html'), 'utf8')
  .replaceAll('./dist/simple-player.js', './simple-player.js');

writeFileSync(join(dist, 'index.html'), html);
