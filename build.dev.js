// Скрипт для того, чтобы собирать пакет локально:
// копирует сбилженную версию пакета локально в папку пакета в даппе

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dappPackagePath } from './build.config.local.mjs';

const distDir = './dist';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Build with Vite
execSync('vite build', { stdio: 'inherit' });

// 2. Clean target dir
fs.readdirSync(dappPackagePath).forEach(file => {
  const fullPath = path.join(dappPackagePath, file);
  if (
    fs.lstatSync(fullPath).isFile() &&
    ['.js', '.css'].includes(path.extname(file))
  ) {
    fs.rmSync(fullPath, { force: true });
  } else if (
    fs.lstatSync(fullPath).isDirectory() &&
    file === 'iconfonts'
  ) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
});

// 3. Copy dist files
fs.readdirSync(distDir).forEach(file => {
  const src = path.join(distDir, file);
  const dest = path.join(dappPackagePath, file);

  if (fs.lstatSync(src).isDirectory()) {
    fs.cpSync(src, dest, { recursive: true });
  } else {
    fs.copyFileSync(src, dest);
  }
});

console.log('✅ Build and copy complete (ESM mode).');