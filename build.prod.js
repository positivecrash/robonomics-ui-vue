// build.prod.js — Production build script

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = './dist';

// 1. Сборка через Vite
execSync('vite build', { stdio: 'inherit' });

// 2. Копируем важные файлы в dist
const filesToCopy = ['package.json', 'README.md', 'LICENSE', 'NOTICE', 'AUTHORS'];

filesToCopy.forEach((file) => {
  const from = path.resolve(__dirname, file);
  const to = path.resolve(__dirname, distDir, file);

  try {
    fs.copyFileSync(from, to);
    console.log(`📦 ${file} → dist/`);
  } catch (err) {
    console.warn(`⚠️ Не удалось скопировать ${file}: ${err.message}`);
  }
});

console.log('✅ Production build complete.');
