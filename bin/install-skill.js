#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(packageRoot, 'skill', 'simpleplayer');
const codexHome = process.env.CODEX_HOME || join(process.env.HOME || process.cwd(), '.codex');
const target = join(codexHome, 'skills', 'simpleplayer');

if (!existsSync(source)) {
  console.error('Could not find the bundled simpleplayer skill.');
  process.exit(1);
}

mkdirSync(dirname(target), { recursive: true });
rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });

console.log(`Installed SimplePlayer skill to ${target}`);
console.log('Restart Codex if the skill list is already open.');
