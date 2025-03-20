import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import replace from '@rollup/plugin-replace'; // for svg icons to code
import fs from "fs/promises";
import path from "path";
import webfont from "webfont";
import { optimize } from "svgo";

async function optimizeSVGs(inputDir) {
  console.log("🔍 Оптимизируем SVG перед генерацией шрифта...");

  const files = await fs.readdir(inputDir);
  const svgFiles = files.filter(file => file.endsWith(".svg"));

  for (const file of svgFiles) {
    const filePath = path.join(inputDir, file);
    const svgContent = await fs.readFile(filePath, "utf-8");

    const optimizedSVG = optimize(svgContent, {
      multipass: true,
      plugins: [
        "removeDoctype",
        "removeXMLProcInst",
        "removeComments",
        "removeMetadata",
        "removeTitle",
        "removeDesc",
        "removeEmptyAttrs",
        "removeHiddenElems",
        "removeEmptyText",
        "removeEmptyContainers",
        "convertPathData",
        "collapseGroups",
        "mergePaths",
        {
          name: "removeAttrs",
          params: {
            attrs: "(stroke|clip-path|mask|id|width|height)"
          }
        },
        {
          name: "convertShapeToPath", // Преобразует `rect`, `circle`, `line` в `<path>`
          params: { convertArcs: true }
        }
      ]
    });

    await fs.writeFile(filePath, optimizedSVG.data, "utf-8");
    // console.log(`✅ Оптимизирован: ${file}`);
  }
}


async function generateIconFont() {

  const ICONS_DIR = path.resolve(__dirname, "lib/icons-source"); // Где хранятся SVG
  const OUTPUT_FONTS_DIR = path.resolve(__dirname, "dist/iconfonts"); // Куда сохранять WOFF2/WOFF
  const OUTPUT_CSS_FILE = path.resolve(__dirname, "dist/iconfonts/icons.css"); // CSS с классами

  await optimizeSVGs(ICONS_DIR);

  try {
    console.log("🎨 Генерируем шрифт из SVG...");
    
    const result = await webfont({
      files: `${ICONS_DIR}/*.svg`,
      fontName: "icons",
      formats: ["woff2", "woff"],
      template: "css",
      normalize: true,
      fontHeight: 1000, // Подгоняем высоту
      descent: 200, // Чтобы символы не съезжали
    });

    await fs.mkdir(OUTPUT_FONTS_DIR, { recursive: true });

    await fs.writeFile(path.join(OUTPUT_FONTS_DIR, "icons.woff2"), result.woff2);
    console.log("📁 WOFF2 сохранён в:", path.join(OUTPUT_FONTS_DIR, "icons.woff2"));

    await fs.writeFile(path.join(OUTPUT_FONTS_DIR, "icons.woff"), result.woff);
    console.log("📁 WOFF сохранён в:", path.join(OUTPUT_FONTS_DIR, "icons.woff"));

    await fs.writeFile(OUTPUT_CSS_FILE, result.template);
    console.log("📁 CSS сохранён в:", OUTPUT_CSS_FILE);

    console.log("✅ Шрифт успешно создан!");
  } catch (error) {
    console.error("❌ Ошибка генерации шрифта:", error);
  }
}

async function saveIconFont() {
  const INPUT_FONTS_DIR = path.resolve(__dirname, "dist/iconfonts"); // Откуда копируем шрифты
  const OUTPUT_FONTS_DIR = path.resolve(__dirname, "lib/iconfonts"); // Куда копируем шрифты
  const INPUT_CSS_FILE = path.resolve(INPUT_FONTS_DIR, "icons.css"); // Где лежит сгенерированный CSS
  const OUTPUT_CSS_FILE = path.resolve(__dirname, "lib/styles/icons.css"); // Куда копируем CSS

  try {
    // console.log("📂 Копируем шрифты и стили в `lib/`...");

    // Создаём папку lib/iconfonts, если её нет
    await fs.mkdir(OUTPUT_FONTS_DIR, { recursive: true });

    // Копируем WOFF2 и WOFF
    await Promise.all([
      fs.copyFile(path.join(INPUT_FONTS_DIR, "icons.woff2"), path.join(OUTPUT_FONTS_DIR, "icons.woff2")),
      fs.copyFile(path.join(INPUT_FONTS_DIR, "icons.woff"), path.join(OUTPUT_FONTS_DIR, "icons.woff")),
    ]);

    // console.log("✅ Шрифты скопированы в:", OUTPUT_FONTS_DIR);

    // Читаем `icons.css`
    const cssContent = await fs.readFile(INPUT_CSS_FILE, "utf-8");
    // console.log("📜 Полное содержимое icons.css:\n", cssContent);

    // Регулярка для извлечения `content: "\ea01";`
    const regex = /\.icons-([\w-]+)::before\s*\{\s*content:\s*["'](\\[a-fA-F0-9]+)["'];?\s*\}/g;
    const iconVars = [];
    let match;

    while ((match = regex.exec(cssContent)) !== null) {
      const iconName = match[1]; // Например, "xmark"
      const iconCode = match[2]; // Например, "\ea44"
      // console.log(`🎯 Найдено: ${iconName} → ${iconCode}`);
      iconVars.push(`  --icon-${iconName}: "${iconCode}";`);
    }

    if (iconVars.length === 0) {
      console.warn("⚠️ Не найдено ни одной иконки. Проверь icons.css!");
    }

    // Генерируем CSS-переменные
    const finalCSS = `:root {\n${iconVars.join("\n")}\n}\n`;

    // Гарантированно создаём папку `lib/styles`
    await fs.mkdir(path.dirname(OUTPUT_CSS_FILE), { recursive: true });

    // Записываем в `lib/styles/icons.css`
    await fs.writeFile(OUTPUT_CSS_FILE, finalCSS, "utf-8");
    console.log("✅ CSS-переменные иконок сохранены в:", OUTPUT_CSS_FILE);

  } catch (err) {
    console.error("❌ Ошибка при копировании шрифтов и CSS:", err);
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false, // Оставляем файлы в dist, иначе fonts перезаписываются
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: 'RobonomicsUiVue',
      formats: ['cjs', 'es'],
      fileName: (format) => (format === 'cjs') ? `[name].js` : `[name].${format}.js`,
    },
    rollupOptions: {
      // external: ['vue', 'vue-router', 'vuex', 'crypto-js', 'file-saver'],
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
        'mipd'
      ],
      output: {
        globals: {
          'vue': 'vue',
          'crypto-js': 'crypto-js',
          'vue-router': 'vue-router',
          'vuex': 'vuex',
          'file-saver': 'file-saver',
          '@polkadot/keyring': '@polkadot/keyring',
          '@polkadot/ui-keyring':'@polkadot/ui-keyring',
          '@polkadot/util-crypto': '@polkadot/util-crypto',
          '@polkadot/util': '@polkadot/util',
          'mipd': 'mipd'
        },
        dir: './dist',
        inlineDynamicImports: true,
      },
      // manualChunks: id => path.parse(id).name,
      plugins: [
          replace({
            '__VUE_PROD_DEVTOOLS__': 'true'
          })
      ],
    }
  },

  plugins: [
    vue(),
    {
      name: "generate-icon-font",
      buildStart: async () => {
        await generateIconFont();
      },
    },
    {
      name: "extract-icon-content",
      closeBundle: async () => {
        await saveIconFont();
      },
    },

  ],
  
})
