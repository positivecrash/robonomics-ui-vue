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

// 2. Копируем SVG иконок расширений в dist (для опционального использования путём /assets/extensions/; в бандле иконки уже встроены как data URI)
const extensionsDir = path.resolve(__dirname, 'lib/components/polkadot/extensions');
const outExtensionsDir = path.resolve(__dirname, distDir, 'assets/extensions');
if (fs.existsSync(extensionsDir)) {
  fs.mkdirSync(outExtensionsDir, { recursive: true });
  for (const name of ['SubWalletLogo.svg', 'TalismanLogo.svg', 'PolkadotJSLogo.svg', 'NovaWalletLogo.svg']) {
    const src = path.join(extensionsDir, name);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(outExtensionsDir, name));
    }
  }
  console.log('📦 extension logos → dist/assets/extensions/');
}

// 4. Копируем основной CSS как style.css (приложение импортирует "robonomics-ui-vue/style.css")
const mainCss = path.resolve(__dirname, distDir, 'robonomics-ui-vue.css');
const styleCss = path.resolve(__dirname, distDir, 'style.css');
if (fs.existsSync(mainCss)) {
  fs.copyFileSync(mainCss, styleCss);
  console.log('📦 robonomics-ui-vue.css → dist/style.css');
}

// 5. Копируем важные файлы в dist
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
