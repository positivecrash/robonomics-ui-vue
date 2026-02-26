/**
 * Пути к иконкам расширений (без импорта SVG).
 * В lib-режиме Vite всегда инлайнит ассеты → data URI попадает в Webpack-приложение
 * как id модуля → "Cannot find module 'data:image/svg+xml,...'".
 * SVG копируются в dist/assets/extensions/ при сборке (build.prod.js).
 */
// Корневой путь, чтобы не зависеть от базового пути чанка в Webpack
const EXTENSIONS_BASE = '/assets/extensions';

export const extensionIconUrls = {
  'SubWalletLogo.svg': `${EXTENSIONS_BASE}/SubWalletLogo.svg`,
  'TalismanLogo.svg': `${EXTENSIONS_BASE}/TalismanLogo.svg`,
  'PolkadotJSLogo.svg': `${EXTENSIONS_BASE}/PolkadotJSLogo.svg`,
  'NovaWalletLogo.svg': `${EXTENSIONS_BASE}/NovaWalletLogo.svg`,
};

export function getExtensionIconUrl(picture) {
  if (picture == null || picture === '') return '';
  return extensionIconUrls[picture] || '';
}
