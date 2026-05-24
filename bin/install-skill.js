#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(packageRoot, 'skill', 'simpleplayer');
const args = process.argv.slice(2);

const help = `
SimplePlayer skill installer

Usage:
  npx @grizzshutsdown/simpleplayer
  npx @grizzshutsdown/simpleplayer --dir ~/.ai/skills

Options:
  --dir <path>   Skills directory used by your AI tool
  --help         Show this help
`;

if (args.includes('--help') || args.includes('-h')) {
  console.log(help.trim());
  process.exit(0);
}

const dirIndex = args.findIndex((arg) => arg === '--dir' || arg === '--skills-dir');
const requestedDir = dirIndex >= 0 ? args[dirIndex + 1] : '';
const skillsDir = resolve(
  requestedDir ||
    process.env.SIMPLEPLAYER_SKILLS_DIR ||
    process.env.AI_SKILLS_DIR ||
    join(process.env.HOME || process.cwd(), '.ai', 'skills'),
);
const target = join(skillsDir, 'simpleplayer');

if (!existsSync(source)) {
  console.error('Could not find the bundled simpleplayer skill.');
  process.exit(1);
}

mkdirSync(skillsDir, { recursive: true });
rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });

console.log(`Installed SimplePlayer skill to ${target}`);
console.log(`Use this skills directory in your AI tool: ${skillsDir}`);
