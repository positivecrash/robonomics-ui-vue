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

// 2. Copy package.json to dist
fs.copyFileSync(
  path.resolve(__dirname, 'package.json'),
  path.resolve(__dirname, distDir, 'package.json')
);

// 3. Clean target dir
fs.readdirSync(dappPackagePath).forEach(file => {
  const fullPath = path.join(dappPackagePath, file);
  if (fs.lstatSync(fullPath).isFile() && ['.js', '.css'].includes(path.extname(file)) || file === 'package.json') {
    fs.rmSync(fullPath, { force: true });
  } else if (fs.lstatSync(fullPath).isDirectory() && file === 'iconfonts') {
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
});

// 4. Copy dist files
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