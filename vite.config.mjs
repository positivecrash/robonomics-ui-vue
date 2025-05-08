import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs/promises';
import path from 'path';
import { optimize } from 'svgo';
import { fileURLToPath } from 'url';
import * as webfontModule from 'webfont';

const { webfont } = webfontModule;

// ✅ Эмуляция __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔧 Оптимизация SVG-файлов
async function optimizeSVGs(inputDir) {
  console.log('🔍 Оптимизируем SVG перед генерацией шрифта...');

  const files = await fs.readdir(inputDir);
  const svgFiles = files.filter(file => file.endsWith('.svg'));

  for (const file of svgFiles) {
    const filePath = path.join(inputDir, file);
    const svgContent = await fs.readFile(filePath, 'utf-8');

    const optimizedSVG = optimize(svgContent, {
      multipass: true,
      plugins: [
        'removeDoctype',
        'removeXMLProcInst',
        'removeComments',
        'removeMetadata',
        'removeTitle',
        'removeDesc',
        'removeEmptyAttrs',
        'removeHiddenElems',
        'removeEmptyText',
        'removeEmptyContainers',
        'convertPathData',
        'collapseGroups',
        'mergePaths',
        {
          name: 'removeAttrs',
          params: {
            attrs: '(stroke|clip-path|mask|id|width|height)',
          },
        },
        {
          name: 'convertShapeToPath',
          params: { convertArcs: true },
        },
      ],
    });

    await fs.writeFile(filePath, optimizedSVG.data, 'utf-8');
  }
}

// 🎨 Генерация шрифта
async function generateIconFont() {
  const ICONS_DIR = path.resolve(__dirname, 'lib/icons-source');
  const OUTPUT_FONTS_DIR = path.resolve(__dirname, 'dist/iconfonts');
  const OUTPUT_CSS_FILE = path.resolve(__dirname, 'dist/iconfonts/icons.css');

  await optimizeSVGs(ICONS_DIR);

  try {
    console.log('🎨 Генерируем шрифт из SVG...');

    const result = await webfont({
      files: `${ICONS_DIR}/*.svg`,
      fontName: 'icons',
      formats: ['woff2', 'woff'],
      template: 'css',
      normalize: true,
      fontHeight: 1000,
      descent: 200,
    });

    await fs.mkdir(OUTPUT_FONTS_DIR, { recursive: true });

    await fs.writeFile(path.join(OUTPUT_FONTS_DIR, 'icons.woff2'), result.woff2);
    await fs.writeFile(path.join(OUTPUT_FONTS_DIR, 'icons.woff'), result.woff);
    await fs.writeFile(OUTPUT_CSS_FILE, result.template);

    console.log('✅ Шрифт и CSS успешно созданы!');
  } catch (error) {
    console.error('❌ Ошибка генерации шрифта:', error);
  }
}

// 💾 Сохраняем CSS-переменные для иконок
async function saveIconFont() {
  const INPUT_FONTS_DIR = path.resolve(__dirname, 'dist/iconfonts');
  const OUTPUT_FONTS_DIR = path.resolve(__dirname, 'lib/iconfonts');
  const INPUT_CSS_FILE = path.join(INPUT_FONTS_DIR, 'icons.css');
  const OUTPUT_CSS_FILE = path.resolve(__dirname, 'lib/styles/icons.css');

  try {
    await fs.mkdir(OUTPUT_FONTS_DIR, { recursive: true });

    await Promise.all([
      fs.copyFile(path.join(INPUT_FONTS_DIR, 'icons.woff2'), path.join(OUTPUT_FONTS_DIR, 'icons.woff2')),
      fs.copyFile(path.join(INPUT_FONTS_DIR, 'icons.woff'), path.join(OUTPUT_FONTS_DIR, 'icons.woff')),
    ]);

    const cssContent = await fs.readFile(INPUT_CSS_FILE, 'utf-8');

    const regex = /\.icons-([\w-]+)::before\s*\{\s*content:\s*["'](\\[a-fA-F0-9]+)["'];?\s*\}/g;
    const iconVars = [];
    let match;

    while ((match = regex.exec(cssContent)) !== null) {
      iconVars.push(`  --icon-${match[1]}: "${match[2]}";`);
    }

    if (iconVars.length === 0) {
      console.warn('⚠️ Не найдено ни одной иконки. Проверь icons.css!');
    }

    const finalCSS = `:root {\n${iconVars.join('\n')}\n}\n`;
    await fs.mkdir(path.dirname(OUTPUT_CSS_FILE), { recursive: true });
    await fs.writeFile(OUTPUT_CSS_FILE, finalCSS, 'utf-8');
    console.log('✅ CSS-переменные иконок сохранены в:', OUTPUT_CSS_FILE);
  } catch (err) {
    console.error('❌ Ошибка при копировании шрифтов и CSS:', err);
  }
}

// 📦 Конфигурация Vite
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: 'RobonomicsUiVue',
      formats: ['cjs', 'es'],
      fileName: format => (format === 'cjs' ? '[name].js' : `[name].${format}.js`),
    },
    rollupOptions: {
      external: [
        'vue',
        'crypto-js',
        'vue-router',
        'vuex',
        'file-saver',
        '@polkadot/keyring',
        '@polkadot/ui-keyring',
        '@polkadot/util-crypto',
        '@polkadot/util',
        'mipd',
        'highcharts',
        'highcharts-vue'
      ],
      output: {
        globals: {
          vue: 'vue',
          'crypto-js': 'crypto-js',
          'vue-router': 'vue-router',
          vuex: 'vuex',
          'file-saver': 'file-saver',
          '@polkadot/keyring': '@polkadot/keyring',
          '@polkadot/ui-keyring': '@polkadot/ui-keyring',
          '@polkadot/util-crypto': '@polkadot/util-crypto',
          '@polkadot/util': '@polkadot/util',
          mipd: 'mipd',
        },
        dir: './dist',
        inlineDynamicImports: true,
      },
    },
  },
  plugins: [
    vue(),
    {
      name: 'generate-icon-font',
      buildStart: async () => {
        await generateIconFont();
      },
    },
    {
      name: 'extract-icon-content',
      closeBundle: async () => {
        await saveIconFont();
      },
    },
  ],
});
