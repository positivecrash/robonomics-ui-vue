/**
 * Иконки расширений как data URI (как на старом сайте).
 * SVG инлайнятся в бандл — не нужны отдельные запросы и public/assets в приложении.
 */
import SubWalletLogoSvg from './SubWalletLogo.svg?raw';
import TalismanLogoSvg from './TalismanLogo.svg?raw';
import PolkadotJSLogoSvg from './PolkadotJSLogo.svg?raw';
import NovaWalletLogoSvg from './NovaWalletLogo.svg?raw';

function toDataUri(svgString) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

export const extensionIconUrls = {
  'SubWalletLogo.svg': toDataUri(SubWalletLogoSvg),
  'TalismanLogo.svg': toDataUri(TalismanLogoSvg),
  'PolkadotJSLogo.svg': toDataUri(PolkadotJSLogoSvg),
  'NovaWalletLogo.svg': toDataUri(NovaWalletLogoSvg),
};

export function getExtensionIconUrl(picture) {
  if (picture == null || picture === '') return '';
  return extensionIconUrls[picture] || '';
}
