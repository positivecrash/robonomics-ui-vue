var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _bridge, _cachegetInt32, _cachegetUint8, _createWasm, _heap, _heapNext, _wasm, _wasmError, _wasmPromise, _wbg, _type;
import { defineComponent, computed, watch, h, resolveComponent, openBlock, createBlock, normalizeClass, withCtx, createElementBlock, createCommentVNode, Fragment, createVNode, createTextVNode, createElementVNode, toDisplayString, renderSlot, resolveDynamicComponent, renderList, normalizeStyle, withDirectives, vModelDynamic, createStaticVNode, pushScopeId, popScopeId, vModelSelect } from "vue";
var index = /* @__PURE__ */ (() => '*{margin:0;padding:0;outline:0;background:transparent;vertical-align:baseline;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}img{border:0}html{font-size:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section,main{display:block}nav ul{list-style:none}table{border-collapse:collapse;border-spacing:0}input,select{vertical-align:middle}sup{vertical-align:super}sub{vertical-align:sub}:root{--font-size: 1.2rem;--font-family: "Roboto Mono", Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;--space: 1rem;--color-dark: #000000;--color-light: #ffffff;--color-blue: #3333CE;--color-blue-light: #9898fa;--color-bluegreen-light: #dcfffc;--color-green: #8CD517;--color-orange: #ffa600;--color-red: #CE3333;--color-gray: #AEADB4;--color-gray-light: #EBEAF0;--color-text: var(--color-dark);--color-link: var(--color-blue);--color-link-hover: var(--color-green);--color-card-background: var(--color-light);--color-body: var(--color-gray-light);--input-bg: var(--color-card-background);--input-text-color: var(--color-text);--input-border-color: var(--color-text);--input-border-width: 1px;--input-padding-g: var(--space);--input-padding-v: var(--space);--select-tog-size: 1rem;--card-padding: calc(var(--space) * 2);--animation-bump: cubic-bezier(.6, .04, .98, .335);--size-logo-title-gorizontal: 4rem;--card-label-height: calc( var(--space) * 1.5);--card-border-color: var(--color-card-background);--aside-size-left: 14rem;--aside-size-right: 16rem;--layout-maxwidth: 1920px;--gap-layout: calc( var(--space) * 2);--gap-text: calc( var(--space) * 2);--border-radius: 6px}html,body,#app{height:100%;position:relative}body{background-color:var(--color-body)}.robo-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:1;background:rgba(0,0,0,.4);backdrop-filter:blur(2px)}html{font-size:100%}body,#app{font-family:var(--font-family);font-size:var(--font-size);line-height:1.5}body *::selection{color:var(--color-light);background-color:var(--color-dark)}@media screen and (max-width: 1400px){html{font-size:90%}}@media screen and (max-width: 1000px){html{font-size:80%}}a{color:var(--color-link);text-decoration:none;transition:all .3s ease-in-out}a:hover{color:var(--color-link-hover)}.robo-container--full{width:100%}@keyframes svgStrokeDash{0%{stroke-dashoffset:1000}to{stroke-dashoffset:0}}@keyframes FadeIn{to{visibility:visible;opacity:1}}@keyframes TrasnalteYnone{to{transform:translateY(0)}}\n')();
/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), true).forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$1(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var noop = function noop2() {
};
var _WINDOW = {};
var _DOCUMENT = {};
var _MUTATION_OBSERVER = null;
var _PERFORMANCE = {
  mark: noop,
  measure: noop
};
try {
  if (typeof window !== "undefined")
    _WINDOW = window;
  if (typeof document !== "undefined")
    _DOCUMENT = document;
  if (typeof MutationObserver !== "undefined")
    _MUTATION_OBSERVER = MutationObserver;
  if (typeof performance !== "undefined")
    _PERFORMANCE = performance;
} catch (e) {
}
var _ref = _WINDOW.navigator || {}, _ref$userAgent = _ref.userAgent, userAgent = _ref$userAgent === void 0 ? "" : _ref$userAgent;
var WINDOW = _WINDOW;
var DOCUMENT = _DOCUMENT;
var MUTATION_OBSERVER = _MUTATION_OBSERVER;
var PERFORMANCE = _PERFORMANCE;
!!WINDOW.document;
var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === "function" && typeof DOCUMENT.createElement === "function";
var IS_IE = ~userAgent.indexOf("MSIE") || ~userAgent.indexOf("Trident/");
var NAMESPACE_IDENTIFIER = "___FONT_AWESOME___";
var UNITS_IN_GRID = 16;
var DEFAULT_FAMILY_PREFIX = "fa";
var DEFAULT_REPLACEMENT_CLASS = "svg-inline--fa";
var DATA_FA_I2SVG = "data-fa-i2svg";
var DATA_FA_PSEUDO_ELEMENT = "data-fa-pseudo-element";
var DATA_FA_PSEUDO_ELEMENT_PENDING = "data-fa-pseudo-element-pending";
var DATA_PREFIX = "data-prefix";
var DATA_ICON = "data-icon";
var HTML_CLASS_I2SVG_BASE_CLASS = "fontawesome-i2svg";
var MUTATION_APPROACH_ASYNC = "async";
var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ["HTML", "HEAD", "STYLE", "SCRIPT"];
var PRODUCTION$1 = function() {
  try {
    return true;
  } catch (e) {
    return false;
  }
}();
var PREFIX_TO_STYLE = {
  "fas": "solid",
  "fa-solid": "solid",
  "far": "regular",
  "fa-regular": "regular",
  "fal": "light",
  "fa-light": "light",
  "fat": "thin",
  "fa-thin": "thin",
  "fad": "duotone",
  "fa-duotone": "duotone",
  "fab": "brands",
  "fa-brands": "brands",
  "fak": "kit",
  "fa-kit": "kit",
  "fa": "solid"
};
var STYLE_TO_PREFIX = {
  "solid": "fas",
  "regular": "far",
  "light": "fal",
  "thin": "fat",
  "duotone": "fad",
  "brands": "fab",
  "kit": "fak"
};
var PREFIX_TO_LONG_STYLE = {
  "fab": "fa-brands",
  "fad": "fa-duotone",
  "fak": "fa-kit",
  "fal": "fa-light",
  "far": "fa-regular",
  "fas": "fa-solid",
  "fat": "fa-thin"
};
var LONG_STYLE_TO_PREFIX = {
  "fa-brands": "fab",
  "fa-duotone": "fad",
  "fa-kit": "fak",
  "fa-light": "fal",
  "fa-regular": "far",
  "fa-solid": "fas",
  "fa-thin": "fat"
};
var ICON_SELECTION_SYNTAX_PATTERN = /fa[srltdbk\-\ ]/;
var LAYERS_TEXT_CLASSNAME = "fa-layers-text";
var FONT_FAMILY_PATTERN = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Kit)?.*/i;
var FONT_WEIGHT_TO_PREFIX = {
  "900": "fas",
  "400": "far",
  "normal": "far",
  "300": "fal",
  "100": "fat"
};
var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
var ATTRIBUTES_WATCHED_FOR_MUTATION = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"];
var DUOTONE_CLASSES = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
};
var RESERVED_CLASSES = [].concat(_toConsumableArray$1(Object.keys(STYLE_TO_PREFIX)), ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function(n) {
  return "".concat(n, "x");
})).concat(oneToTwenty.map(function(n) {
  return "w-".concat(n);
}));
var initial = WINDOW.FontAwesomeConfig || {};
function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector("script[" + attr + "]");
  if (element) {
    return element.getAttribute(attr);
  }
}
function coerce(val) {
  if (val === "")
    return true;
  if (val === "false")
    return false;
  if (val === "true")
    return true;
  return val;
}
if (DOCUMENT && typeof DOCUMENT.querySelector === "function") {
  var attrs = [["data-family-prefix", "familyPrefix"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
  attrs.forEach(function(_ref2) {
    var _ref22 = _slicedToArray(_ref2, 2), attr = _ref22[0], key = _ref22[1];
    var val = coerce(getAttrConfig(attr));
    if (val !== void 0 && val !== null) {
      initial[key] = val;
    }
  });
}
var _default = {
  familyPrefix: DEFAULT_FAMILY_PREFIX,
  styleDefault: "solid",
  replacementClass: DEFAULT_REPLACEMENT_CLASS,
  autoReplaceSvg: true,
  autoAddCss: true,
  autoA11y: true,
  searchPseudoElements: false,
  observeMutations: true,
  mutateApproach: "async",
  keepOriginalSource: true,
  measurePerformance: false,
  showMissingIcons: true
};
var _config = _objectSpread2$1(_objectSpread2$1({}, _default), initial);
if (!_config.autoReplaceSvg)
  _config.observeMutations = false;
var config$1 = {};
Object.keys(_config).forEach(function(key) {
  Object.defineProperty(config$1, key, {
    enumerable: true,
    set: function set(val) {
      _config[key] = val;
      _onChangeCb.forEach(function(cb) {
        return cb(config$1);
      });
    },
    get: function get() {
      return _config[key];
    }
  });
});
WINDOW.FontAwesomeConfig = config$1;
var _onChangeCb = [];
function onChange(cb) {
  _onChangeCb.push(cb);
  return function() {
    _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
  };
}
var d = UNITS_IN_GRID;
var meaninglessTransform = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: false,
  flipY: false
};
function insertCss(css2) {
  if (!css2 || !IS_DOM) {
    return;
  }
  var style = DOCUMENT.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerHTML = css2;
  var headChildren = DOCUMENT.head.childNodes;
  var beforeChild = null;
  for (var i = headChildren.length - 1; i > -1; i--) {
    var child = headChildren[i];
    var tagName = (child.tagName || "").toUpperCase();
    if (["STYLE", "LINK"].indexOf(tagName) > -1) {
      beforeChild = child;
    }
  }
  DOCUMENT.head.insertBefore(style, beforeChild);
  return css2;
}
var idPool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function nextUniqueId() {
  var size = 12;
  var id = "";
  while (size-- > 0) {
    id += idPool[Math.random() * 62 | 0];
  }
  return id;
}
function toArray(obj) {
  var array = [];
  for (var i = (obj || []).length >>> 0; i--; ) {
    array[i] = obj[i];
  }
  return array;
}
function classArray(node) {
  if (node.classList) {
    return toArray(node.classList);
  } else {
    return (node.getAttribute("class") || "").split(" ").filter(function(i) {
      return i;
    });
  }
}
function htmlEscape(str) {
  return "".concat(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function joinAttributes(attributes) {
  return Object.keys(attributes || {}).reduce(function(acc, attributeName) {
    return acc + "".concat(attributeName, '="').concat(htmlEscape(attributes[attributeName]), '" ');
  }, "").trim();
}
function joinStyles(styles2) {
  return Object.keys(styles2 || {}).reduce(function(acc, styleName) {
    return acc + "".concat(styleName, ": ").concat(styles2[styleName].trim(), ";");
  }, "");
}
function transformIsMeaningful(transform) {
  return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
}
function transformForSvg(_ref2) {
  var transform = _ref2.transform, containerWidth = _ref2.containerWidth, iconWidth = _ref2.iconWidth;
  var outer = {
    transform: "translate(".concat(containerWidth / 2, " 256)")
  };
  var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
  var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
  var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
  var inner = {
    transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
  };
  var path = {
    transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
  };
  return {
    outer,
    inner,
    path
  };
}
function transformForCss(_ref2) {
  var transform = _ref2.transform, _ref2$width = _ref2.width, width = _ref2$width === void 0 ? UNITS_IN_GRID : _ref2$width, _ref2$height = _ref2.height, height = _ref2$height === void 0 ? UNITS_IN_GRID : _ref2$height, _ref2$startCentered = _ref2.startCentered, startCentered = _ref2$startCentered === void 0 ? false : _ref2$startCentered;
  var val = "";
  if (startCentered && IS_IE) {
    val += "translate(".concat(transform.x / d - width / 2, "em, ").concat(transform.y / d - height / 2, "em) ");
  } else if (startCentered) {
    val += "translate(calc(-50% + ".concat(transform.x / d, "em), calc(-50% + ").concat(transform.y / d, "em)) ");
  } else {
    val += "translate(".concat(transform.x / d, "em, ").concat(transform.y / d, "em) ");
  }
  val += "scale(".concat(transform.size / d * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d * (transform.flipY ? -1 : 1), ") ");
  val += "rotate(".concat(transform.rotate, "deg) ");
  return val;
}
var baseStyles = ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0);\n          animation-delay: var(--fa-animation-delay, 0);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    transition-delay: 0s;\n    transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, none));\n          transform: rotate(var(--fa-rotate-angle, none));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}';
function css() {
  var dfp = DEFAULT_FAMILY_PREFIX;
  var drc = DEFAULT_REPLACEMENT_CLASS;
  var fp = config$1.familyPrefix;
  var rc = config$1.replacementClass;
  var s = baseStyles;
  if (fp !== dfp || rc !== drc) {
    var dPatt = new RegExp("\\.".concat(dfp, "\\-"), "g");
    var customPropPatt = new RegExp("\\--".concat(dfp, "\\-"), "g");
    var rPatt = new RegExp("\\.".concat(drc), "g");
    s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
  }
  return s;
}
var _cssInserted = false;
function ensureCss() {
  if (config$1.autoAddCss && !_cssInserted) {
    insertCss(css());
    _cssInserted = true;
  }
}
var InjectCSS = {
  mixout: function mixout() {
    return {
      dom: {
        css,
        insertCss: ensureCss
      }
    };
  },
  hooks: function hooks() {
    return {
      beforeDOMElementCreation: function beforeDOMElementCreation() {
        ensureCss();
      },
      beforeI2svg: function beforeI2svg() {
        ensureCss();
      }
    };
  }
};
var w = WINDOW || {};
if (!w[NAMESPACE_IDENTIFIER])
  w[NAMESPACE_IDENTIFIER] = {};
if (!w[NAMESPACE_IDENTIFIER].styles)
  w[NAMESPACE_IDENTIFIER].styles = {};
if (!w[NAMESPACE_IDENTIFIER].hooks)
  w[NAMESPACE_IDENTIFIER].hooks = {};
if (!w[NAMESPACE_IDENTIFIER].shims)
  w[NAMESPACE_IDENTIFIER].shims = [];
var namespace = w[NAMESPACE_IDENTIFIER];
var functions = [];
var listener = function listener2() {
  DOCUMENT.removeEventListener("DOMContentLoaded", listener2);
  loaded = 1;
  functions.map(function(fn) {
    return fn();
  });
};
var loaded = false;
if (IS_DOM) {
  loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
  if (!loaded)
    DOCUMENT.addEventListener("DOMContentLoaded", listener);
}
function domready(fn) {
  if (!IS_DOM)
    return;
  loaded ? setTimeout(fn, 0) : functions.push(fn);
}
function toHtml(abstractNodes) {
  var tag = abstractNodes.tag, _abstractNodes$attrib = abstractNodes.attributes, attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib, _abstractNodes$childr = abstractNodes.children, children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;
  if (typeof abstractNodes === "string") {
    return htmlEscape(abstractNodes);
  } else {
    return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(""), "</").concat(tag, ">");
  }
}
function iconFromMapping(mapping, prefix, iconName) {
  if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
    return {
      prefix,
      iconName,
      icon: mapping[prefix][iconName]
    };
  }
}
var bindInternal4 = function bindInternal42(func, thisContext) {
  return function(a, b, c, d2) {
    return func.call(thisContext, a, b, c, d2);
  };
};
var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject), length = keys.length, iterator = thisContext !== void 0 ? bindInternal4(fn, thisContext) : fn, i, key, result;
  if (initialValue === void 0) {
    i = 1;
    result = subject[keys[0]];
  } else {
    i = 0;
    result = initialValue;
  }
  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }
  return result;
};
function ucs2decode(string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 55296 && value <= 56319 && counter < length) {
      var extra = string.charCodeAt(counter++);
      if ((extra & 64512) == 56320) {
        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
function toHex(unicode) {
  var decoded = ucs2decode(unicode);
  return decoded.length === 1 ? decoded[0].toString(16) : null;
}
function codePointAt(string, index2) {
  var size = string.length;
  var first = string.charCodeAt(index2);
  var second;
  if (first >= 55296 && first <= 56319 && size > index2 + 1) {
    second = string.charCodeAt(index2 + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function normalizeIcons(icons) {
  return Object.keys(icons).reduce(function(acc, iconName) {
    var icon3 = icons[iconName];
    var expanded = !!icon3.icon;
    if (expanded) {
      acc[icon3.iconName] = icon3.icon;
    } else {
      acc[iconName] = icon3;
    }
    return acc;
  }, {});
}
function defineIcons(prefix, icons) {
  var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var _params$skipHooks = params.skipHooks, skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
  var normalized = normalizeIcons(icons);
  if (typeof namespace.hooks.addPack === "function" && !skipHooks) {
    namespace.hooks.addPack(prefix, normalizeIcons(icons));
  } else {
    namespace.styles[prefix] = _objectSpread2$1(_objectSpread2$1({}, namespace.styles[prefix] || {}), normalized);
  }
  if (prefix === "fas") {
    defineIcons("fa", icons);
  }
}
var styles = namespace.styles, shims = namespace.shims;
var LONG_STYLE = Object.values(PREFIX_TO_LONG_STYLE);
var _defaultUsablePrefix = null;
var _byUnicode = {};
var _byLigature = {};
var _byOldName = {};
var _byOldUnicode = {};
var _byAlias = {};
var PREFIXES = Object.keys(PREFIX_TO_STYLE);
function isReserved(name) {
  return ~RESERVED_CLASSES.indexOf(name);
}
function getIconName(familyPrefix, cls) {
  var parts = cls.split("-");
  var prefix = parts[0];
  var iconName = parts.slice(1).join("-");
  if (prefix === familyPrefix && iconName !== "" && !isReserved(iconName)) {
    return iconName;
  } else {
    return null;
  }
}
var build = function build2() {
  var lookup = function lookup2(reducer) {
    return reduce(styles, function(o, style, prefix) {
      o[prefix] = reduce(style, reducer, {});
      return o;
    }, {});
  };
  _byUnicode = lookup(function(acc, icon3, iconName) {
    if (icon3[3]) {
      acc[icon3[3]] = iconName;
    }
    if (icon3[2]) {
      var aliases = icon3[2].filter(function(a) {
        return typeof a === "number";
      });
      aliases.forEach(function(alias) {
        acc[alias.toString(16)] = iconName;
      });
    }
    return acc;
  });
  _byLigature = lookup(function(acc, icon3, iconName) {
    acc[iconName] = iconName;
    if (icon3[2]) {
      var aliases = icon3[2].filter(function(a) {
        return typeof a === "string";
      });
      aliases.forEach(function(alias) {
        acc[alias] = iconName;
      });
    }
    return acc;
  });
  _byAlias = lookup(function(acc, icon3, iconName) {
    var aliases = icon3[2];
    acc[iconName] = iconName;
    aliases.forEach(function(alias) {
      acc[alias] = iconName;
    });
    return acc;
  });
  var hasRegular = "far" in styles || config$1.autoFetchSvg;
  var shimLookups = reduce(shims, function(acc, shim) {
    var maybeNameMaybeUnicode = shim[0];
    var prefix = shim[1];
    var iconName = shim[2];
    if (prefix === "far" && !hasRegular) {
      prefix = "fas";
    }
    if (typeof maybeNameMaybeUnicode === "string") {
      acc.names[maybeNameMaybeUnicode] = {
        prefix,
        iconName
      };
    }
    if (typeof maybeNameMaybeUnicode === "number") {
      acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
        prefix,
        iconName
      };
    }
    return acc;
  }, {
    names: {},
    unicodes: {}
  });
  _byOldName = shimLookups.names;
  _byOldUnicode = shimLookups.unicodes;
  _defaultUsablePrefix = getCanonicalPrefix(config$1.styleDefault);
};
onChange(function(c) {
  _defaultUsablePrefix = getCanonicalPrefix(c.styleDefault);
});
build();
function byUnicode(prefix, unicode) {
  return (_byUnicode[prefix] || {})[unicode];
}
function byLigature(prefix, ligature) {
  return (_byLigature[prefix] || {})[ligature];
}
function byAlias(prefix, alias) {
  return (_byAlias[prefix] || {})[alias];
}
function byOldName(name) {
  return _byOldName[name] || {
    prefix: null,
    iconName: null
  };
}
function byOldUnicode(unicode) {
  var oldUnicode = _byOldUnicode[unicode];
  var newUnicode = byUnicode("fas", unicode);
  return oldUnicode || (newUnicode ? {
    prefix: "fas",
    iconName: newUnicode
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function getDefaultUsablePrefix() {
  return _defaultUsablePrefix;
}
var emptyCanonicalIcon = function emptyCanonicalIcon2() {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};
function getCanonicalPrefix(styleOrPrefix) {
  var style = PREFIX_TO_STYLE[styleOrPrefix];
  var prefix = STYLE_TO_PREFIX[styleOrPrefix] || STYLE_TO_PREFIX[style];
  var defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
  return prefix || defined || null;
}
function getCanonicalIcon(values) {
  var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var _params$skipLookups = params.skipLookups, skipLookups = _params$skipLookups === void 0 ? false : _params$skipLookups;
  var givenPrefix = null;
  var canonical = values.reduce(function(acc, cls) {
    var iconName = getIconName(config$1.familyPrefix, cls);
    if (styles[cls]) {
      cls = LONG_STYLE.includes(cls) ? LONG_STYLE_TO_PREFIX[cls] : cls;
      givenPrefix = cls;
      acc.prefix = cls;
    } else if (PREFIXES.indexOf(cls) > -1) {
      givenPrefix = cls;
      acc.prefix = getCanonicalPrefix(cls);
    } else if (iconName) {
      acc.iconName = iconName;
    } else if (cls !== config$1.replacementClass) {
      acc.rest.push(cls);
    }
    if (!skipLookups && acc.prefix && acc.iconName) {
      var shim = givenPrefix === "fa" ? byOldName(acc.iconName) : {};
      var aliasIconName = byAlias(acc.prefix, acc.iconName);
      if (shim.prefix) {
        givenPrefix = null;
      }
      acc.iconName = shim.iconName || aliasIconName || acc.iconName;
      acc.prefix = shim.prefix || acc.prefix;
      if (acc.prefix === "far" && !styles["far"] && styles["fas"] && !config$1.autoFetchSvg) {
        acc.prefix = "fas";
      }
    }
    return acc;
  }, emptyCanonicalIcon());
  if (canonical.prefix === "fa" || givenPrefix === "fa") {
    canonical.prefix = getDefaultUsablePrefix() || "fas";
  }
  return canonical;
}
var Library = /* @__PURE__ */ function() {
  function Library2() {
    _classCallCheck(this, Library2);
    this.definitions = {};
  }
  _createClass(Library2, [{
    key: "add",
    value: function add2() {
      var _this = this;
      for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
        definitions[_key] = arguments[_key];
      }
      var additions = definitions.reduce(this._pullDefinitions, {});
      Object.keys(additions).forEach(function(key) {
        _this.definitions[key] = _objectSpread2$1(_objectSpread2$1({}, _this.definitions[key] || {}), additions[key]);
        defineIcons(key, additions[key]);
        var longPrefix = PREFIX_TO_LONG_STYLE[key];
        if (longPrefix)
          defineIcons(longPrefix, additions[key]);
        build();
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function _pullDefinitions(additions, definition) {
      var normalized = definition.prefix && definition.iconName && definition.icon ? {
        0: definition
      } : definition;
      Object.keys(normalized).map(function(key) {
        var _normalized$key = normalized[key], prefix = _normalized$key.prefix, iconName = _normalized$key.iconName, icon3 = _normalized$key.icon;
        var aliases = icon3[2];
        if (!additions[prefix])
          additions[prefix] = {};
        if (aliases.length > 0) {
          aliases.forEach(function(alias) {
            if (typeof alias === "string") {
              additions[prefix][alias] = icon3;
            }
          });
        }
        additions[prefix][iconName] = icon3;
      });
      return additions;
    }
  }]);
  return Library2;
}();
var _plugins = [];
var _hooks = {};
var providers = {};
var defaultProviderKeys = Object.keys(providers);
function registerPlugins(nextPlugins, _ref2) {
  var obj = _ref2.mixoutsTo;
  _plugins = nextPlugins;
  _hooks = {};
  Object.keys(providers).forEach(function(k) {
    if (defaultProviderKeys.indexOf(k) === -1) {
      delete providers[k];
    }
  });
  _plugins.forEach(function(plugin) {
    var mixout8 = plugin.mixout ? plugin.mixout() : {};
    Object.keys(mixout8).forEach(function(tk) {
      if (typeof mixout8[tk] === "function") {
        obj[tk] = mixout8[tk];
      }
      if (_typeof$1(mixout8[tk]) === "object") {
        Object.keys(mixout8[tk]).forEach(function(sk) {
          if (!obj[tk]) {
            obj[tk] = {};
          }
          obj[tk][sk] = mixout8[tk][sk];
        });
      }
    });
    if (plugin.hooks) {
      var hooks8 = plugin.hooks();
      Object.keys(hooks8).forEach(function(hook) {
        if (!_hooks[hook]) {
          _hooks[hook] = [];
        }
        _hooks[hook].push(hooks8[hook]);
      });
    }
    if (plugin.provides) {
      plugin.provides(providers);
    }
  });
  return obj;
}
function chainHooks(hook, accumulator) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var hookFns = _hooks[hook] || [];
  hookFns.forEach(function(hookFn) {
    accumulator = hookFn.apply(null, [accumulator].concat(args));
  });
  return accumulator;
}
function callHooks(hook) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  var hookFns = _hooks[hook] || [];
  hookFns.forEach(function(hookFn) {
    hookFn.apply(null, args);
  });
  return void 0;
}
function callProvided() {
  var hook = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1);
  return providers[hook] ? providers[hook].apply(null, args) : void 0;
}
function findIconDefinition(iconLookup) {
  if (iconLookup.prefix === "fa") {
    iconLookup.prefix = "fas";
  }
  var iconName = iconLookup.iconName;
  var prefix = iconLookup.prefix || getDefaultUsablePrefix();
  if (!iconName)
    return;
  iconName = byAlias(prefix, iconName) || iconName;
  return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}
var library = new Library();
var noAuto = function noAuto2() {
  config$1.autoReplaceSvg = false;
  config$1.observeMutations = false;
  callHooks("noAuto");
};
var dom = {
  i2svg: function i2svg() {
    var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (IS_DOM) {
      callHooks("beforeI2svg", params);
      callProvided("pseudoElements2svg", params);
      return callProvided("i2svg", params);
    } else {
      return Promise.reject("Operation requires a DOM of some kind.");
    }
  },
  watch: function watch2() {
    var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var autoReplaceSvgRoot = params.autoReplaceSvgRoot;
    if (config$1.autoReplaceSvg === false) {
      config$1.autoReplaceSvg = true;
    }
    config$1.observeMutations = true;
    domready(function() {
      autoReplace({
        autoReplaceSvgRoot
      });
      callHooks("watch", params);
    });
  }
};
var parse = {
  icon: function icon(_icon) {
    if (_icon === null) {
      return null;
    }
    if (_typeof$1(_icon) === "object" && _icon.prefix && _icon.iconName) {
      return {
        prefix: _icon.prefix,
        iconName: byAlias(_icon.prefix, _icon.iconName) || _icon.iconName
      };
    }
    if (Array.isArray(_icon) && _icon.length === 2) {
      var iconName = _icon[1].indexOf("fa-") === 0 ? _icon[1].slice(3) : _icon[1];
      var prefix = getCanonicalPrefix(_icon[0]);
      return {
        prefix,
        iconName: byAlias(prefix, iconName) || iconName
      };
    }
    if (typeof _icon === "string" && (_icon.indexOf("".concat(config$1.familyPrefix, "-")) > -1 || _icon.match(ICON_SELECTION_SYNTAX_PATTERN))) {
      var canonicalIcon = getCanonicalIcon(_icon.split(" "), {
        skipLookups: true
      });
      return {
        prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
        iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
      };
    }
    if (typeof _icon === "string") {
      var _prefix = getDefaultUsablePrefix();
      return {
        prefix: _prefix,
        iconName: byAlias(_prefix, _icon) || _icon
      };
    }
  }
};
var api = {
  noAuto,
  config: config$1,
  dom,
  parse,
  library,
  findIconDefinition,
  toHtml
};
var autoReplace = function autoReplace2() {
  var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _params$autoReplaceSv = params.autoReplaceSvgRoot, autoReplaceSvgRoot = _params$autoReplaceSv === void 0 ? DOCUMENT : _params$autoReplaceSv;
  if ((Object.keys(namespace.styles).length > 0 || config$1.autoFetchSvg) && IS_DOM && config$1.autoReplaceSvg)
    api.dom.i2svg({
      node: autoReplaceSvgRoot
    });
};
function domVariants(val, abstractCreator) {
  Object.defineProperty(val, "abstract", {
    get: abstractCreator
  });
  Object.defineProperty(val, "html", {
    get: function get() {
      return val.abstract.map(function(a) {
        return toHtml(a);
      });
    }
  });
  Object.defineProperty(val, "node", {
    get: function get() {
      if (!IS_DOM)
        return;
      var container = DOCUMENT.createElement("div");
      container.innerHTML = val.html;
      return container.children;
    }
  });
  return val;
}
function asIcon(_ref2) {
  var children = _ref2.children, main = _ref2.main, mask = _ref2.mask, attributes = _ref2.attributes, styles2 = _ref2.styles, transform = _ref2.transform;
  if (transformIsMeaningful(transform) && main.found && !mask.found) {
    var width = main.width, height = main.height;
    var offset = {
      x: width / height / 2,
      y: 0.5
    };
    attributes["style"] = joinStyles(_objectSpread2$1(_objectSpread2$1({}, styles2), {}, {
      "transform-origin": "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
    }));
  }
  return [{
    tag: "svg",
    attributes,
    children
  }];
}
function asSymbol(_ref2) {
  var prefix = _ref2.prefix, iconName = _ref2.iconName, children = _ref2.children, attributes = _ref2.attributes, symbol = _ref2.symbol;
  var id = symbol === true ? "".concat(prefix, "-").concat(config$1.familyPrefix, "-").concat(iconName) : symbol;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: _objectSpread2$1(_objectSpread2$1({}, attributes), {}, {
        id
      }),
      children
    }]
  }];
}
function makeInlineSvgAbstract(params) {
  var _params$icons = params.icons, main = _params$icons.main, mask = _params$icons.mask, prefix = params.prefix, iconName = params.iconName, transform = params.transform, symbol = params.symbol, title = params.title, maskId = params.maskId, titleId = params.titleId, extra = params.extra, _params$watchable = params.watchable, watchable = _params$watchable === void 0 ? false : _params$watchable;
  var _ref2 = mask.found ? mask : main, width = _ref2.width, height = _ref2.height;
  var isUploadedIcon = prefix === "fak";
  var attrClass = [config$1.replacementClass, iconName ? "".concat(config$1.familyPrefix, "-").concat(iconName) : ""].filter(function(c) {
    return extra.classes.indexOf(c) === -1;
  }).filter(function(c) {
    return c !== "" || !!c;
  }).concat(extra.classes).join(" ");
  var content = {
    children: [],
    attributes: _objectSpread2$1(_objectSpread2$1({}, extra.attributes), {}, {
      "data-prefix": prefix,
      "data-icon": iconName,
      "class": attrClass,
      "role": extra.attributes.role || "img",
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 ".concat(width, " ").concat(height)
    })
  };
  var uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf("fa-fw") ? {
    width: "".concat(width / height * 16 * 0.0625, "em")
  } : {};
  if (watchable) {
    content.attributes[DATA_FA_I2SVG] = "";
  }
  if (title) {
    content.children.push({
      tag: "title",
      attributes: {
        id: content.attributes["aria-labelledby"] || "title-".concat(titleId || nextUniqueId())
      },
      children: [title]
    });
    delete content.attributes.title;
  }
  var args = _objectSpread2$1(_objectSpread2$1({}, content), {}, {
    prefix,
    iconName,
    main,
    mask,
    maskId,
    transform,
    symbol,
    styles: _objectSpread2$1(_objectSpread2$1({}, uploadedIconWidthStyle), extra.styles)
  });
  var _ref22 = mask.found && main.found ? callProvided("generateAbstractMask", args) || {
    children: [],
    attributes: {}
  } : callProvided("generateAbstractIcon", args) || {
    children: [],
    attributes: {}
  }, children = _ref22.children, attributes = _ref22.attributes;
  args.children = children;
  args.attributes = attributes;
  if (symbol) {
    return asSymbol(args);
  } else {
    return asIcon(args);
  }
}
function makeLayersTextAbstract(params) {
  var content = params.content, width = params.width, height = params.height, transform = params.transform, title = params.title, extra = params.extra, _params$watchable2 = params.watchable, watchable = _params$watchable2 === void 0 ? false : _params$watchable2;
  var attributes = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, extra.attributes), title ? {
    "title": title
  } : {}), {}, {
    "class": extra.classes.join(" ")
  });
  if (watchable) {
    attributes[DATA_FA_I2SVG] = "";
  }
  var styles2 = _objectSpread2$1({}, extra.styles);
  if (transformIsMeaningful(transform)) {
    styles2["transform"] = transformForCss({
      transform,
      startCentered: true,
      width,
      height
    });
    styles2["-webkit-transform"] = styles2["transform"];
  }
  var styleString = joinStyles(styles2);
  if (styleString.length > 0) {
    attributes["style"] = styleString;
  }
  var val = [];
  val.push({
    tag: "span",
    attributes,
    children: [content]
  });
  if (title) {
    val.push({
      tag: "span",
      attributes: {
        class: "sr-only"
      },
      children: [title]
    });
  }
  return val;
}
function makeLayersCounterAbstract(params) {
  var content = params.content, title = params.title, extra = params.extra;
  var attributes = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, extra.attributes), title ? {
    "title": title
  } : {}), {}, {
    "class": extra.classes.join(" ")
  });
  var styleString = joinStyles(extra.styles);
  if (styleString.length > 0) {
    attributes["style"] = styleString;
  }
  var val = [];
  val.push({
    tag: "span",
    attributes,
    children: [content]
  });
  if (title) {
    val.push({
      tag: "span",
      attributes: {
        class: "sr-only"
      },
      children: [title]
    });
  }
  return val;
}
var styles$1 = namespace.styles;
function asFoundIcon(icon3) {
  var width = icon3[0];
  var height = icon3[1];
  var _icon$slice = icon3.slice(4), _icon$slice2 = _slicedToArray(_icon$slice, 1), vectorData = _icon$slice2[0];
  var element = null;
  if (Array.isArray(vectorData)) {
    element = {
      tag: "g",
      attributes: {
        class: "".concat(config$1.familyPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
      },
      children: [{
        tag: "path",
        attributes: {
          class: "".concat(config$1.familyPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
          fill: "currentColor",
          d: vectorData[0]
        }
      }, {
        tag: "path",
        attributes: {
          class: "".concat(config$1.familyPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
          fill: "currentColor",
          d: vectorData[1]
        }
      }]
    };
  } else {
    element = {
      tag: "path",
      attributes: {
        fill: "currentColor",
        d: vectorData
      }
    };
  }
  return {
    found: true,
    width,
    height,
    icon: element
  };
}
var missingIconResolutionMixin = {
  found: false,
  width: 512,
  height: 512
};
function maybeNotifyMissing(iconName, prefix) {
  if (!PRODUCTION$1 && !config$1.showMissingIcons && iconName) {
    console.error('Icon with name "'.concat(iconName, '" and prefix "').concat(prefix, '" is missing.'));
  }
}
function findIcon(iconName, prefix) {
  var givenPrefix = prefix;
  if (prefix === "fa" && config$1.styleDefault !== null) {
    prefix = getDefaultUsablePrefix();
  }
  return new Promise(function(resolve, reject) {
    ({
      found: false,
      width: 512,
      height: 512,
      icon: callProvided("missingIconAbstract") || {}
    });
    if (givenPrefix === "fa") {
      var shim = byOldName(iconName) || {};
      iconName = shim.iconName || iconName;
      prefix = shim.prefix || prefix;
    }
    if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
      var icon3 = styles$1[prefix][iconName];
      return resolve(asFoundIcon(icon3));
    }
    maybeNotifyMissing(iconName, prefix);
    resolve(_objectSpread2$1(_objectSpread2$1({}, missingIconResolutionMixin), {}, {
      icon: config$1.showMissingIcons && iconName ? callProvided("missingIconAbstract") || {} : {}
    }));
  });
}
var noop$1 = function noop3() {
};
var p = config$1.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
  mark: noop$1,
  measure: noop$1
};
var preamble = 'FA "6.1.1"';
var begin = function begin2(name) {
  p.mark("".concat(preamble, " ").concat(name, " begins"));
  return function() {
    return end(name);
  };
};
var end = function end2(name) {
  p.mark("".concat(preamble, " ").concat(name, " ends"));
  p.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
};
var perf = {
  begin,
  end
};
var noop$2 = function noop4() {
};
function isWatched(node) {
  var i2svg2 = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
  return typeof i2svg2 === "string";
}
function hasPrefixAndIcon(node) {
  var prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
  var icon3 = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
  return prefix && icon3;
}
function hasBeenReplaced(node) {
  return node && node.classList && node.classList.contains && node.classList.contains(config$1.replacementClass);
}
function getMutator() {
  if (config$1.autoReplaceSvg === true) {
    return mutators.replace;
  }
  var mutator = mutators[config$1.autoReplaceSvg];
  return mutator || mutators.replace;
}
function createElementNS(tag) {
  return DOCUMENT.createElementNS("http://www.w3.org/2000/svg", tag);
}
function createElement(tag) {
  return DOCUMENT.createElement(tag);
}
function convertSVG(abstractObj) {
  var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var _params$ceFn = params.ceFn, ceFn = _params$ceFn === void 0 ? abstractObj.tag === "svg" ? createElementNS : createElement : _params$ceFn;
  if (typeof abstractObj === "string") {
    return DOCUMENT.createTextNode(abstractObj);
  }
  var tag = ceFn(abstractObj.tag);
  Object.keys(abstractObj.attributes || []).forEach(function(key) {
    tag.setAttribute(key, abstractObj.attributes[key]);
  });
  var children = abstractObj.children || [];
  children.forEach(function(child) {
    tag.appendChild(convertSVG(child, {
      ceFn
    }));
  });
  return tag;
}
function nodeAsComment(node) {
  var comment = " ".concat(node.outerHTML, " ");
  comment = "".concat(comment, "Font Awesome fontawesome.com ");
  return comment;
}
var mutators = {
  replace: function replace(mutation) {
    var node = mutation[0];
    if (node.parentNode) {
      mutation[1].forEach(function(abstract) {
        node.parentNode.insertBefore(convertSVG(abstract), node);
      });
      if (node.getAttribute(DATA_FA_I2SVG) === null && config$1.keepOriginalSource) {
        var comment = DOCUMENT.createComment(nodeAsComment(node));
        node.parentNode.replaceChild(comment, node);
      } else {
        node.remove();
      }
    }
  },
  nest: function nest(mutation) {
    var node = mutation[0];
    var abstract = mutation[1];
    if (~classArray(node).indexOf(config$1.replacementClass)) {
      return mutators.replace(mutation);
    }
    var forSvg = new RegExp("".concat(config$1.familyPrefix, "-.*"));
    delete abstract[0].attributes.id;
    if (abstract[0].attributes.class) {
      var splitClasses = abstract[0].attributes.class.split(" ").reduce(function(acc, cls) {
        if (cls === config$1.replacementClass || cls.match(forSvg)) {
          acc.toSvg.push(cls);
        } else {
          acc.toNode.push(cls);
        }
        return acc;
      }, {
        toNode: [],
        toSvg: []
      });
      abstract[0].attributes.class = splitClasses.toSvg.join(" ");
      if (splitClasses.toNode.length === 0) {
        node.removeAttribute("class");
      } else {
        node.setAttribute("class", splitClasses.toNode.join(" "));
      }
    }
    var newInnerHTML = abstract.map(function(a) {
      return toHtml(a);
    }).join("\n");
    node.setAttribute(DATA_FA_I2SVG, "");
    node.innerHTML = newInnerHTML;
  }
};
function performOperationSync(op) {
  op();
}
function perform(mutations, callback) {
  var callbackFunction = typeof callback === "function" ? callback : noop$2;
  if (mutations.length === 0) {
    callbackFunction();
  } else {
    var frame = performOperationSync;
    if (config$1.mutateApproach === MUTATION_APPROACH_ASYNC) {
      frame = WINDOW.requestAnimationFrame || performOperationSync;
    }
    frame(function() {
      var mutator = getMutator();
      var mark = perf.begin("mutate");
      mutations.map(mutator);
      mark();
      callbackFunction();
    });
  }
}
var disabled = false;
function disableObservation() {
  disabled = true;
}
function enableObservation() {
  disabled = false;
}
var mo = null;
function observe(options) {
  if (!MUTATION_OBSERVER) {
    return;
  }
  if (!config$1.observeMutations) {
    return;
  }
  var _options$treeCallback = options.treeCallback, treeCallback = _options$treeCallback === void 0 ? noop$2 : _options$treeCallback, _options$nodeCallback = options.nodeCallback, nodeCallback = _options$nodeCallback === void 0 ? noop$2 : _options$nodeCallback, _options$pseudoElemen = options.pseudoElementsCallback, pseudoElementsCallback = _options$pseudoElemen === void 0 ? noop$2 : _options$pseudoElemen, _options$observeMutat = options.observeMutationsRoot, observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT : _options$observeMutat;
  mo = new MUTATION_OBSERVER(function(objects) {
    if (disabled)
      return;
    var defaultPrefix = getDefaultUsablePrefix();
    toArray(objects).forEach(function(mutationRecord) {
      if (mutationRecord.type === "childList" && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
        if (config$1.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target);
        }
        treeCallback(mutationRecord.target);
      }
      if (mutationRecord.type === "attributes" && mutationRecord.target.parentNode && config$1.searchPseudoElements) {
        pseudoElementsCallback(mutationRecord.target.parentNode);
      }
      if (mutationRecord.type === "attributes" && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
        if (mutationRecord.attributeName === "class" && hasPrefixAndIcon(mutationRecord.target)) {
          var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)), prefix = _getCanonicalIcon.prefix, iconName = _getCanonicalIcon.iconName;
          mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
          if (iconName)
            mutationRecord.target.setAttribute(DATA_ICON, iconName);
        } else if (hasBeenReplaced(mutationRecord.target)) {
          nodeCallback(mutationRecord.target);
        }
      }
    });
  });
  if (!IS_DOM)
    return;
  mo.observe(observeMutationsRoot, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
  });
}
function disconnect() {
  if (!mo)
    return;
  mo.disconnect();
}
function styleParser(node) {
  var style = node.getAttribute("style");
  var val = [];
  if (style) {
    val = style.split(";").reduce(function(acc, style2) {
      var styles2 = style2.split(":");
      var prop = styles2[0];
      var value = styles2.slice(1);
      if (prop && value.length > 0) {
        acc[prop] = value.join(":").trim();
      }
      return acc;
    }, {});
  }
  return val;
}
function classParser(node) {
  var existingPrefix = node.getAttribute("data-prefix");
  var existingIconName = node.getAttribute("data-icon");
  var innerText = node.innerText !== void 0 ? node.innerText.trim() : "";
  var val = getCanonicalIcon(classArray(node));
  if (!val.prefix) {
    val.prefix = getDefaultUsablePrefix();
  }
  if (existingPrefix && existingIconName) {
    val.prefix = existingPrefix;
    val.iconName = existingIconName;
  }
  if (val.iconName && val.prefix) {
    return val;
  }
  if (val.prefix && innerText.length > 0) {
    val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
  }
  return val;
}
function attributesParser(node) {
  var extraAttributes = toArray(node.attributes).reduce(function(acc, attr) {
    if (acc.name !== "class" && acc.name !== "style") {
      acc[attr.name] = attr.value;
    }
    return acc;
  }, {});
  var title = node.getAttribute("title");
  var titleId = node.getAttribute("data-fa-title-id");
  if (config$1.autoA11y) {
    if (title) {
      extraAttributes["aria-labelledby"] = "".concat(config$1.replacementClass, "-title-").concat(titleId || nextUniqueId());
    } else {
      extraAttributes["aria-hidden"] = "true";
      extraAttributes["focusable"] = "false";
    }
  }
  return extraAttributes;
}
function blankMeta() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: meaninglessTransform,
    symbol: false,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function parseMeta(node) {
  var parser = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: true
  };
  var _classParser = classParser(node), iconName = _classParser.iconName, prefix = _classParser.prefix, extraClasses = _classParser.rest;
  var extraAttributes = attributesParser(node);
  var pluginMeta = chainHooks("parseNodeAttributes", {}, node);
  var extraStyles = parser.styleParser ? styleParser(node) : [];
  return _objectSpread2$1({
    iconName,
    title: node.getAttribute("title"),
    titleId: node.getAttribute("data-fa-title-id"),
    prefix,
    transform: meaninglessTransform,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: false,
    extra: {
      classes: extraClasses,
      styles: extraStyles,
      attributes: extraAttributes
    }
  }, pluginMeta);
}
var styles$2 = namespace.styles;
function generateMutation(node) {
  var nodeMeta = config$1.autoReplaceSvg === "nest" ? parseMeta(node, {
    styleParser: false
  }) : parseMeta(node);
  if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
    return callProvided("generateLayersText", node, nodeMeta);
  } else {
    return callProvided("generateSvgReplacementMutation", node, nodeMeta);
  }
}
function onTree(root) {
  var callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!IS_DOM)
    return Promise.resolve();
  var htmlClassList = DOCUMENT.documentElement.classList;
  var hclAdd = function hclAdd2(suffix) {
    return htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  };
  var hclRemove = function hclRemove2(suffix) {
    return htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
  };
  var prefixes = config$1.autoFetchSvg ? Object.keys(PREFIX_TO_STYLE) : Object.keys(styles$2);
  var prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map(function(p2) {
    return ".".concat(p2, ":not([").concat(DATA_FA_I2SVG, "])");
  })).join(", ");
  if (prefixesDomQuery.length === 0) {
    return Promise.resolve();
  }
  var candidates = [];
  try {
    candidates = toArray(root.querySelectorAll(prefixesDomQuery));
  } catch (e) {
  }
  if (candidates.length > 0) {
    hclAdd("pending");
    hclRemove("complete");
  } else {
    return Promise.resolve();
  }
  var mark = perf.begin("onTree");
  var mutations = candidates.reduce(function(acc, node) {
    try {
      var mutation = generateMutation(node);
      if (mutation) {
        acc.push(mutation);
      }
    } catch (e) {
      if (!PRODUCTION$1) {
        if (e.name === "MissingIcon") {
          console.error(e);
        }
      }
    }
    return acc;
  }, []);
  return new Promise(function(resolve, reject) {
    Promise.all(mutations).then(function(resolvedMutations) {
      perform(resolvedMutations, function() {
        hclAdd("active");
        hclAdd("complete");
        hclRemove("pending");
        if (typeof callback === "function")
          callback();
        mark();
        resolve();
      });
    }).catch(function(e) {
      mark();
      reject(e);
    });
  });
}
function onNode(node) {
  var callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  generateMutation(node).then(function(mutation) {
    if (mutation) {
      perform([mutation], callback);
    }
  });
}
function resolveIcons(next) {
  return function(maybeIconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
    var mask = params.mask;
    if (mask) {
      mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
    }
    return next(iconDefinition, _objectSpread2$1(_objectSpread2$1({}, params), {}, {
      mask
    }));
  };
}
var render = function render2(iconDefinition) {
  var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var _params$transform = params.transform, transform = _params$transform === void 0 ? meaninglessTransform : _params$transform, _params$symbol = params.symbol, symbol = _params$symbol === void 0 ? false : _params$symbol, _params$mask = params.mask, mask = _params$mask === void 0 ? null : _params$mask, _params$maskId = params.maskId, maskId = _params$maskId === void 0 ? null : _params$maskId, _params$title = params.title, title = _params$title === void 0 ? null : _params$title, _params$titleId = params.titleId, titleId = _params$titleId === void 0 ? null : _params$titleId, _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes, _params$attributes = params.attributes, attributes = _params$attributes === void 0 ? {} : _params$attributes, _params$styles = params.styles, styles2 = _params$styles === void 0 ? {} : _params$styles;
  if (!iconDefinition)
    return;
  var prefix = iconDefinition.prefix, iconName = iconDefinition.iconName, icon3 = iconDefinition.icon;
  return domVariants(_objectSpread2$1({
    type: "icon"
  }, iconDefinition), function() {
    callHooks("beforeDOMElementCreation", {
      iconDefinition,
      params
    });
    if (config$1.autoA11y) {
      if (title) {
        attributes["aria-labelledby"] = "".concat(config$1.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        attributes["aria-hidden"] = "true";
        attributes["focusable"] = "false";
      }
    }
    return makeInlineSvgAbstract({
      icons: {
        main: asFoundIcon(icon3),
        mask: mask ? asFoundIcon(mask.icon) : {
          found: false,
          width: null,
          height: null,
          icon: {}
        }
      },
      prefix,
      iconName,
      transform: _objectSpread2$1(_objectSpread2$1({}, meaninglessTransform), transform),
      symbol,
      title,
      maskId,
      titleId,
      extra: {
        attributes,
        styles: styles2,
        classes
      }
    });
  });
};
var ReplaceElements = {
  mixout: function mixout2() {
    return {
      icon: resolveIcons(render)
    };
  },
  hooks: function hooks2() {
    return {
      mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
        accumulator.treeCallback = onTree;
        accumulator.nodeCallback = onNode;
        return accumulator;
      }
    };
  },
  provides: function provides(providers$$1) {
    providers$$1.i2svg = function(params) {
      var _params$node = params.node, node = _params$node === void 0 ? DOCUMENT : _params$node, _params$callback = params.callback, callback = _params$callback === void 0 ? function() {
      } : _params$callback;
      return onTree(node, callback);
    };
    providers$$1.generateSvgReplacementMutation = function(node, nodeMeta) {
      var iconName = nodeMeta.iconName, title = nodeMeta.title, titleId = nodeMeta.titleId, prefix = nodeMeta.prefix, transform = nodeMeta.transform, symbol = nodeMeta.symbol, mask = nodeMeta.mask, maskId = nodeMeta.maskId, extra = nodeMeta.extra;
      return new Promise(function(resolve, reject) {
        Promise.all([findIcon(iconName, prefix), mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
          found: false,
          width: 512,
          height: 512,
          icon: {}
        })]).then(function(_ref2) {
          var _ref22 = _slicedToArray(_ref2, 2), main = _ref22[0], mask2 = _ref22[1];
          resolve([node, makeInlineSvgAbstract({
            icons: {
              main,
              mask: mask2
            },
            prefix,
            iconName,
            transform,
            symbol,
            maskId,
            title,
            titleId,
            extra,
            watchable: true
          })]);
        }).catch(reject);
      });
    };
    providers$$1.generateAbstractIcon = function(_ref3) {
      var children = _ref3.children, attributes = _ref3.attributes, main = _ref3.main, transform = _ref3.transform, styles2 = _ref3.styles;
      var styleString = joinStyles(styles2);
      if (styleString.length > 0) {
        attributes["style"] = styleString;
      }
      var nextChild;
      if (transformIsMeaningful(transform)) {
        nextChild = callProvided("generateAbstractTransformGrouping", {
          main,
          transform,
          containerWidth: main.width,
          iconWidth: main.width
        });
      }
      children.push(nextChild || main.icon);
      return {
        children,
        attributes
      };
    };
  }
};
var Layers = {
  mixout: function mixout3() {
    return {
      layer: function layer(assembler) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes;
        return domVariants({
          type: "layer"
        }, function() {
          callHooks("beforeDOMElementCreation", {
            assembler,
            params
          });
          var children = [];
          assembler(function(args) {
            Array.isArray(args) ? args.map(function(a) {
              children = children.concat(a.abstract);
            }) : children = children.concat(args.abstract);
          });
          return [{
            tag: "span",
            attributes: {
              class: ["".concat(config$1.familyPrefix, "-layers")].concat(_toConsumableArray$1(classes)).join(" ")
            },
            children
          }];
        });
      }
    };
  }
};
var LayersCounter = {
  mixout: function mixout4() {
    return {
      counter: function counter(content) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var _params$title = params.title, title = _params$title === void 0 ? null : _params$title, _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes, _params$attributes = params.attributes, attributes = _params$attributes === void 0 ? {} : _params$attributes, _params$styles = params.styles, styles2 = _params$styles === void 0 ? {} : _params$styles;
        return domVariants({
          type: "counter",
          content
        }, function() {
          callHooks("beforeDOMElementCreation", {
            content,
            params
          });
          return makeLayersCounterAbstract({
            content: content.toString(),
            title,
            extra: {
              attributes,
              styles: styles2,
              classes: ["".concat(config$1.familyPrefix, "-layers-counter")].concat(_toConsumableArray$1(classes))
            }
          });
        });
      }
    };
  }
};
var LayersText = {
  mixout: function mixout5() {
    return {
      text: function text2(content) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var _params$transform = params.transform, transform = _params$transform === void 0 ? meaninglessTransform : _params$transform, _params$title = params.title, title = _params$title === void 0 ? null : _params$title, _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes, _params$attributes = params.attributes, attributes = _params$attributes === void 0 ? {} : _params$attributes, _params$styles = params.styles, styles2 = _params$styles === void 0 ? {} : _params$styles;
        return domVariants({
          type: "text",
          content
        }, function() {
          callHooks("beforeDOMElementCreation", {
            content,
            params
          });
          return makeLayersTextAbstract({
            content,
            transform: _objectSpread2$1(_objectSpread2$1({}, meaninglessTransform), transform),
            title,
            extra: {
              attributes,
              styles: styles2,
              classes: ["".concat(config$1.familyPrefix, "-layers-text")].concat(_toConsumableArray$1(classes))
            }
          });
        });
      }
    };
  },
  provides: function provides2(providers$$1) {
    providers$$1.generateLayersText = function(node, nodeMeta) {
      var title = nodeMeta.title, transform = nodeMeta.transform, extra = nodeMeta.extra;
      var width = null;
      var height = null;
      if (IS_IE) {
        var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
        var boundingClientRect = node.getBoundingClientRect();
        width = boundingClientRect.width / computedFontSize;
        height = boundingClientRect.height / computedFontSize;
      }
      if (config$1.autoA11y && !title) {
        extra.attributes["aria-hidden"] = "true";
      }
      return Promise.resolve([node, makeLayersTextAbstract({
        content: node.innerHTML,
        width,
        height,
        transform,
        title,
        extra,
        watchable: true
      })]);
    };
  }
};
var CLEAN_CONTENT_PATTERN = new RegExp('"', "ug");
var SECONDARY_UNICODE_RANGE = [1105920, 1112319];
function hexValueFromContent(content) {
  var cleaned = content.replace(CLEAN_CONTENT_PATTERN, "");
  var codePoint = codePointAt(cleaned, 0);
  var isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
  var isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
  return {
    value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
    isSecondary: isPrependTen || isDoubled
  };
}
function replaceForPosition(node, position) {
  var pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(":", "-"));
  return new Promise(function(resolve, reject) {
    if (node.getAttribute(pendingAttribute) !== null) {
      return resolve();
    }
    var children = toArray(node.children);
    var alreadyProcessedPseudoElement = children.filter(function(c) {
      return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position;
    })[0];
    var styles2 = WINDOW.getComputedStyle(node, position);
    var fontFamily = styles2.getPropertyValue("font-family").match(FONT_FAMILY_PATTERN);
    var fontWeight = styles2.getPropertyValue("font-weight");
    var content = styles2.getPropertyValue("content");
    if (alreadyProcessedPseudoElement && !fontFamily) {
      node.removeChild(alreadyProcessedPseudoElement);
      return resolve();
    } else if (fontFamily && content !== "none" && content !== "") {
      var _content = styles2.getPropertyValue("content");
      var prefix = ~["Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit"].indexOf(fontFamily[2]) ? STYLE_TO_PREFIX[fontFamily[2].toLowerCase()] : FONT_WEIGHT_TO_PREFIX[fontWeight];
      var _hexValueFromContent = hexValueFromContent(_content), hexValue = _hexValueFromContent.value, isSecondary = _hexValueFromContent.isSecondary;
      var isV4 = fontFamily[0].startsWith("FontAwesome");
      var iconName = byUnicode(prefix, hexValue);
      var iconIdentifier = iconName;
      if (isV4) {
        var iconName4 = byOldUnicode(hexValue);
        if (iconName4.iconName && iconName4.prefix) {
          iconName = iconName4.iconName;
          prefix = iconName4.prefix;
        }
      }
      if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
        node.setAttribute(pendingAttribute, iconIdentifier);
        if (alreadyProcessedPseudoElement) {
          node.removeChild(alreadyProcessedPseudoElement);
        }
        var meta = blankMeta();
        var extra = meta.extra;
        extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
        findIcon(iconName, prefix).then(function(main) {
          var abstract = makeInlineSvgAbstract(_objectSpread2$1(_objectSpread2$1({}, meta), {}, {
            icons: {
              main,
              mask: emptyCanonicalIcon()
            },
            prefix,
            iconName: iconIdentifier,
            extra,
            watchable: true
          }));
          var element = DOCUMENT.createElement("svg");
          if (position === "::before") {
            node.insertBefore(element, node.firstChild);
          } else {
            node.appendChild(element);
          }
          element.outerHTML = abstract.map(function(a) {
            return toHtml(a);
          }).join("\n");
          node.removeAttribute(pendingAttribute);
          resolve();
        }).catch(reject);
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
}
function replace2(node) {
  return Promise.all([replaceForPosition(node, "::before"), replaceForPosition(node, "::after")]);
}
function processable(node) {
  return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== "svg");
}
function searchPseudoElements(root) {
  if (!IS_DOM)
    return;
  return new Promise(function(resolve, reject) {
    var operations = toArray(root.querySelectorAll("*")).filter(processable).map(replace2);
    var end3 = perf.begin("searchPseudoElements");
    disableObservation();
    Promise.all(operations).then(function() {
      end3();
      enableObservation();
      resolve();
    }).catch(function() {
      end3();
      enableObservation();
      reject();
    });
  });
}
var PseudoElements = {
  hooks: function hooks3() {
    return {
      mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
        accumulator.pseudoElementsCallback = searchPseudoElements;
        return accumulator;
      }
    };
  },
  provides: function provides3(providers$$1) {
    providers$$1.pseudoElements2svg = function(params) {
      var _params$node = params.node, node = _params$node === void 0 ? DOCUMENT : _params$node;
      if (config$1.searchPseudoElements) {
        searchPseudoElements(node);
      }
    };
  }
};
var _unwatched = false;
var MutationObserver$1 = {
  mixout: function mixout6() {
    return {
      dom: {
        unwatch: function unwatch() {
          disableObservation();
          _unwatched = true;
        }
      }
    };
  },
  hooks: function hooks4() {
    return {
      bootstrap: function bootstrap() {
        observe(chainHooks("mutationObserverCallbacks", {}));
      },
      noAuto: function noAuto3() {
        disconnect();
      },
      watch: function watch3(params) {
        var observeMutationsRoot = params.observeMutationsRoot;
        if (_unwatched) {
          enableObservation();
        } else {
          observe(chainHooks("mutationObserverCallbacks", {
            observeMutationsRoot
          }));
        }
      }
    };
  }
};
var parseTransformString = function parseTransformString2(transformString) {
  var transform = {
    size: 16,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false,
    rotate: 0
  };
  return transformString.toLowerCase().split(" ").reduce(function(acc, n) {
    var parts = n.toLowerCase().split("-");
    var first = parts[0];
    var rest = parts.slice(1).join("-");
    if (first && rest === "h") {
      acc.flipX = true;
      return acc;
    }
    if (first && rest === "v") {
      acc.flipY = true;
      return acc;
    }
    rest = parseFloat(rest);
    if (isNaN(rest)) {
      return acc;
    }
    switch (first) {
      case "grow":
        acc.size = acc.size + rest;
        break;
      case "shrink":
        acc.size = acc.size - rest;
        break;
      case "left":
        acc.x = acc.x - rest;
        break;
      case "right":
        acc.x = acc.x + rest;
        break;
      case "up":
        acc.y = acc.y - rest;
        break;
      case "down":
        acc.y = acc.y + rest;
        break;
      case "rotate":
        acc.rotate = acc.rotate + rest;
        break;
    }
    return acc;
  }, transform);
};
var PowerTransforms = {
  mixout: function mixout7() {
    return {
      parse: {
        transform: function transform(transformString) {
          return parseTransformString(transformString);
        }
      }
    };
  },
  hooks: function hooks5() {
    return {
      parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
        var transformString = node.getAttribute("data-fa-transform");
        if (transformString) {
          accumulator.transform = parseTransformString(transformString);
        }
        return accumulator;
      }
    };
  },
  provides: function provides4(providers2) {
    providers2.generateAbstractTransformGrouping = function(_ref2) {
      var main = _ref2.main, transform = _ref2.transform, containerWidth = _ref2.containerWidth, iconWidth = _ref2.iconWidth;
      var outer = {
        transform: "translate(".concat(containerWidth / 2, " 256)")
      };
      var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
      var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
      var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
      var inner = {
        transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
      };
      var path = {
        transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
      };
      var operations = {
        outer,
        inner,
        path
      };
      return {
        tag: "g",
        attributes: _objectSpread2$1({}, operations.outer),
        children: [{
          tag: "g",
          attributes: _objectSpread2$1({}, operations.inner),
          children: [{
            tag: main.icon.tag,
            children: main.icon.children,
            attributes: _objectSpread2$1(_objectSpread2$1({}, main.icon.attributes), operations.path)
          }]
        }]
      };
    };
  }
};
var ALL_SPACE = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function fillBlack(abstract) {
  var force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (abstract.attributes && (abstract.attributes.fill || force)) {
    abstract.attributes.fill = "black";
  }
  return abstract;
}
function deGroup(abstract) {
  if (abstract.tag === "g") {
    return abstract.children;
  } else {
    return [abstract];
  }
}
var Masks = {
  hooks: function hooks6() {
    return {
      parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
        var maskData = node.getAttribute("data-fa-mask");
        var mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(" ").map(function(i) {
          return i.trim();
        }));
        if (!mask.prefix) {
          mask.prefix = getDefaultUsablePrefix();
        }
        accumulator.mask = mask;
        accumulator.maskId = node.getAttribute("data-fa-mask-id");
        return accumulator;
      }
    };
  },
  provides: function provides5(providers2) {
    providers2.generateAbstractMask = function(_ref2) {
      var children = _ref2.children, attributes = _ref2.attributes, main = _ref2.main, mask = _ref2.mask, explicitMaskId = _ref2.maskId, transform = _ref2.transform;
      var mainWidth = main.width, mainPath = main.icon;
      var maskWidth = mask.width, maskPath = mask.icon;
      var trans = transformForSvg({
        transform,
        containerWidth: maskWidth,
        iconWidth: mainWidth
      });
      var maskRect = {
        tag: "rect",
        attributes: _objectSpread2$1(_objectSpread2$1({}, ALL_SPACE), {}, {
          fill: "white"
        })
      };
      var maskInnerGroupChildrenMixin = mainPath.children ? {
        children: mainPath.children.map(fillBlack)
      } : {};
      var maskInnerGroup = {
        tag: "g",
        attributes: _objectSpread2$1({}, trans.inner),
        children: [fillBlack(_objectSpread2$1({
          tag: mainPath.tag,
          attributes: _objectSpread2$1(_objectSpread2$1({}, mainPath.attributes), trans.path)
        }, maskInnerGroupChildrenMixin))]
      };
      var maskOuterGroup = {
        tag: "g",
        attributes: _objectSpread2$1({}, trans.outer),
        children: [maskInnerGroup]
      };
      var maskId = "mask-".concat(explicitMaskId || nextUniqueId());
      var clipId = "clip-".concat(explicitMaskId || nextUniqueId());
      var maskTag = {
        tag: "mask",
        attributes: _objectSpread2$1(_objectSpread2$1({}, ALL_SPACE), {}, {
          id: maskId,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        }),
        children: [maskRect, maskOuterGroup]
      };
      var defs = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: clipId
          },
          children: deGroup(maskPath)
        }, maskTag]
      };
      children.push(defs, {
        tag: "rect",
        attributes: _objectSpread2$1({
          fill: "currentColor",
          "clip-path": "url(#".concat(clipId, ")"),
          mask: "url(#".concat(maskId, ")")
        }, ALL_SPACE)
      });
      return {
        children,
        attributes
      };
    };
  }
};
var MissingIconIndicator = {
  provides: function provides6(providers2) {
    var reduceMotion = false;
    if (WINDOW.matchMedia) {
      reduceMotion = WINDOW.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    providers2.missingIconAbstract = function() {
      var gChildren = [];
      var FILL = {
        fill: "currentColor"
      };
      var ANIMATION_BASE = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      gChildren.push({
        tag: "path",
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
      });
      var OPACITY_ANIMATE = _objectSpread2$1(_objectSpread2$1({}, ANIMATION_BASE), {}, {
        attributeName: "opacity"
      });
      var dot = {
        tag: "circle",
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          cx: "256",
          cy: "364",
          r: "28"
        }),
        children: []
      };
      if (!reduceMotion) {
        dot.children.push({
          tag: "animate",
          attributes: _objectSpread2$1(_objectSpread2$1({}, ANIMATION_BASE), {}, {
            attributeName: "r",
            values: "28;14;28;28;14;28;"
          })
        }, {
          tag: "animate",
          attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
            values: "1;0;1;1;0;1;"
          })
        });
      }
      gChildren.push(dot);
      gChildren.push({
        tag: "path",
        attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        }),
        children: reduceMotion ? [] : [{
          tag: "animate",
          attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
            values: "1;0;0;0;0;1;"
          })
        }]
      });
      if (!reduceMotion) {
        gChildren.push({
          tag: "path",
          attributes: _objectSpread2$1(_objectSpread2$1({}, FILL), {}, {
            opacity: "0",
            d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
          }),
          children: [{
            tag: "animate",
            attributes: _objectSpread2$1(_objectSpread2$1({}, OPACITY_ANIMATE), {}, {
              values: "0;0;1;1;0;0;"
            })
          }]
        });
      }
      return {
        tag: "g",
        attributes: {
          "class": "missing"
        },
        children: gChildren
      };
    };
  }
};
var SvgSymbols = {
  hooks: function hooks7() {
    return {
      parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
        var symbolData = node.getAttribute("data-fa-symbol");
        var symbol = symbolData === null ? false : symbolData === "" ? true : symbolData;
        accumulator["symbol"] = symbol;
        return accumulator;
      }
    };
  }
};
var plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];
registerPlugins(plugins, {
  mixoutsTo: api
});
api.noAuto;
var config$1$1 = api.config;
var library$1 = api.library;
api.dom;
var parse$1 = api.parse;
api.findIconDefinition;
api.toHtml;
var icon2 = api.icon;
api.layer;
var text = api.text;
api.counter;
/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */
var faArrowDown = {
  prefix: "fas",
  iconName: "arrow-down",
  icon: [384, 512, [8595], "f063", "M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"]
};
var faArrowRotateLeft = {
  prefix: "fas",
  iconName: "arrow-rotate-left",
  icon: [512, 512, [8634, "arrow-left-rotate", "arrow-rotate-back", "arrow-rotate-backward", "undo"], "f0e2", "M480 256c0 123.4-100.5 223.9-223.9 223.9c-48.86 0-95.19-15.58-134.2-44.86c-14.14-10.59-17-30.66-6.391-44.81c10.61-14.09 30.69-16.97 44.8-6.375c27.84 20.91 61 31.94 95.89 31.94C344.3 415.8 416 344.1 416 256s-71.67-159.8-159.8-159.8C205.9 96.22 158.6 120.3 128.6 160H192c17.67 0 32 14.31 32 32S209.7 224 192 224H48c-17.67 0-32-14.31-32-32V48c0-17.69 14.33-32 32-32s32 14.31 32 32v70.23C122.1 64.58 186.1 32.11 256.1 32.11C379.5 32.11 480 132.6 480 256z"]
};
var faArrowUpRightFromSquare = {
  prefix: "fas",
  iconName: "arrow-up-right-from-square",
  icon: [448, 512, ["external-link"], "f08e", "M256 64C256 46.33 270.3 32 288 32H415.1C415.1 32 415.1 32 415.1 32C420.3 32 424.5 32.86 428.2 34.43C431.1 35.98 435.5 38.27 438.6 41.3C438.6 41.35 438.6 41.4 438.7 41.44C444.9 47.66 447.1 55.78 448 63.9C448 63.94 448 63.97 448 64V192C448 209.7 433.7 224 416 224C398.3 224 384 209.7 384 192V141.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6C156.9 298.1 156.9 277.9 169.4 265.4L338.7 96H288C270.3 96 256 81.67 256 64V64zM0 128C0 92.65 28.65 64 64 64H160C177.7 64 192 78.33 192 96C192 113.7 177.7 128 160 128H64V416H352V320C352 302.3 366.3 288 384 288C401.7 288 416 302.3 416 320V416C416 451.3 387.3 480 352 480H64C28.65 480 0 451.3 0 416V128z"]
};
var faBars = {
  prefix: "fas",
  iconName: "bars",
  icon: [448, 512, ["navicon"], "f0c9", "M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"]
};
var faChartPie = {
  prefix: "fas",
  iconName: "chart-pie",
  icon: [576, 512, ["pie-chart"], "f200", "M304 16.58C304 7.555 310.1 0 320 0C443.7 0 544 100.3 544 224C544 233 536.4 240 527.4 240H304V16.58zM32 272C32 150.7 122.1 50.34 238.1 34.25C248.2 32.99 256 40.36 256 49.61V288L412.5 444.5C419.2 451.2 418.7 462.2 411 467.7C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zM558.4 288C567.6 288 575 295.8 573.8 305C566.1 360.9 539.1 410.6 499.9 447.3C493.9 452.1 484.5 452.5 478.7 446.7L320 288H558.4z"]
};
var faCheck = {
  prefix: "fas",
  iconName: "check",
  icon: [448, 512, [10004, 10003], "f00c", "M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"]
};
var faCircleCheck = {
  prefix: "fas",
  iconName: "circle-check",
  icon: [512, 512, [61533, "check-circle"], "f058", "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"]
};
var faCircleExclamation = {
  prefix: "fas",
  iconName: "circle-exclamation",
  icon: [512, 512, ["exclamation-circle"], "f06a", "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"]
};
var faCircleInfo = {
  prefix: "fas",
  iconName: "circle-info",
  icon: [512, 512, ["info-circle"], "f05a", "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"]
};
var faCircleXmark = {
  prefix: "fas",
  iconName: "circle-xmark",
  icon: [512, 512, [61532, "times-circle", "xmark-circle"], "f057", "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"]
};
var faCloud = {
  prefix: "fas",
  iconName: "cloud",
  icon: [640, 512, [9729], "f0c2", "M96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1z"]
};
var faComment = {
  prefix: "fas",
  iconName: "comment",
  icon: [512, 512, [61669, 128489], "f075", "M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z"]
};
var faCopy = {
  prefix: "fas",
  iconName: "copy",
  icon: [512, 512, [], "f0c5", "M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"]
};
var faEllipsis = {
  prefix: "fas",
  iconName: "ellipsis",
  icon: [448, 512, ["ellipsis-h"], "f141", "M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"]
};
var faEllipsisVertical = {
  prefix: "fas",
  iconName: "ellipsis-vertical",
  icon: [128, 512, ["ellipsis-v"], "f142", "M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"]
};
var faGear = {
  prefix: "fas",
  iconName: "gear",
  icon: [512, 512, [9881, "cog"], "f013", "M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"]
};
var faHouse = {
  prefix: "fas",
  iconName: "house",
  icon: [576, 512, [63498, 63500, 127968, "home", "home-alt", "home-lg-alt"], "f015", "M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"]
};
var faMinus = {
  prefix: "fas",
  iconName: "minus",
  icon: [448, 512, [8722, 10134, 8211, "subtract"], "f068", "M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"]
};
var faPencil = {
  prefix: "fas",
  iconName: "pencil",
  icon: [512, 512, [61504, 9999, "pencil-alt"], "f303", "M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"]
};
var faPlus = {
  prefix: "fas",
  iconName: "plus",
  icon: [448, 512, [10133, 61543, "add"], "2b", "M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"]
};
var faPowerOff = {
  prefix: "fas",
  iconName: "power-off",
  icon: [512, 512, [9211], "f011", "M288 256C288 273.7 273.7 288 256 288C238.3 288 224 273.7 224 256V32C224 14.33 238.3 0 256 0C273.7 0 288 14.33 288 32V256zM80 256C80 353.2 158.8 432 256 432C353.2 432 432 353.2 432 256C432 201.6 407.3 152.9 368.5 120.6C354.9 109.3 353 89.13 364.3 75.54C375.6 61.95 395.8 60.1 409.4 71.4C462.2 115.4 496 181.8 496 255.1C496 388.5 388.5 496 256 496C123.5 496 16 388.5 16 255.1C16 181.8 49.75 115.4 102.6 71.4C116.2 60.1 136.4 61.95 147.7 75.54C158.1 89.13 157.1 109.3 143.5 120.6C104.7 152.9 80 201.6 80 256z"]
};
var faRightLeft = {
  prefix: "fas",
  iconName: "right-left",
  icon: [512, 512, ["exchange-alt"], "f362", "M32 160h319.9l.0791 72c0 9.547 5.652 18.19 14.41 22c8.754 3.812 18.93 2.078 25.93-4.406l112-104c10.24-9.5 10.24-25.69 0-35.19l-112-104c-6.992-6.484-17.17-8.217-25.93-4.408c-8.758 3.816-14.41 12.46-14.41 22L351.9 96H32C14.31 96 0 110.3 0 127.1S14.31 160 32 160zM480 352H160.1L160 279.1c0-9.547-5.652-18.19-14.41-22C136.9 254.2 126.7 255.9 119.7 262.4l-112 104c-10.24 9.5-10.24 25.69 0 35.19l112 104c6.992 6.484 17.17 8.219 25.93 4.406C154.4 506.2 160 497.5 160 488L160.1 416H480c17.69 0 32-14.31 32-32S497.7 352 480 352z"]
};
var faRss = {
  prefix: "fas",
  iconName: "rss",
  icon: [448, 512, ["feed"], "f09e", "M25.57 176.1C12.41 175.4 .9117 185.2 .0523 198.4s9.173 24.65 22.39 25.5c120.1 7.875 225.7 112.7 233.6 233.6C256.9 470.3 267.4 480 279.1 480c.5313 0 1.062-.0313 1.594-.0625c13.22-.8438 23.25-12.28 22.39-25.5C294.6 310.3 169.7 185.4 25.57 176.1zM32 32C14.33 32 0 46.31 0 64s14.33 32 32 32c194.1 0 352 157.9 352 352c0 17.69 14.33 32 32 32s32-14.31 32-32C448 218.6 261.4 32 32 32zM63.1 351.9C28.63 351.9 0 380.6 0 416s28.63 64 63.1 64s64.08-28.62 64.08-64S99.37 351.9 63.1 351.9z"]
};
var faSignal = {
  prefix: "fas",
  iconName: "signal",
  icon: [576, 512, [128246, "signal-5", "signal-perfect"], "f012", "M544 0c-17.67 0-32 14.33-32 31.1V480C512 497.7 526.3 512 544 512s32-14.33 32-31.1V31.1C576 14.33 561.7 0 544 0zM160 288C142.3 288 128 302.3 128 319.1v160C128 497.7 142.3 512 160 512s32-14.33 32-31.1V319.1C192 302.3 177.7 288 160 288zM32 384C14.33 384 0 398.3 0 415.1v64C0 497.7 14.33 512 31.1 512S64 497.7 64 480V415.1C64 398.3 49.67 384 32 384zM416 96c-17.67 0-32 14.33-32 31.1V480C384 497.7 398.3 512 416 512s32-14.33 32-31.1V127.1C448 110.3 433.7 96 416 96zM288 192C270.3 192 256 206.3 256 223.1v256C256 497.7 270.3 512 288 512s32-14.33 32-31.1V223.1C320 206.3 305.7 192 288 192z"]
};
var faSortDown = {
  prefix: "fas",
  iconName: "sort-down",
  icon: [320, 512, ["sort-desc"], "f0dd", "M311.9 335.1l-132.4 136.8C174.1 477.3 167.1 480 160 480c-7.055 0-14.12-2.702-19.47-8.109l-132.4-136.8C-9.229 317.8 3.055 288 27.66 288h264.7C316.9 288 329.2 317.8 311.9 335.1z"]
};
var faUser = {
  prefix: "fas",
  iconName: "user",
  icon: [448, 512, [62144, 128100], "f007", "M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"]
};
var faWallet = {
  prefix: "fas",
  iconName: "wallet",
  icon: [512, 512, [], "f555", "M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z"]
};
var faXmark = {
  prefix: "fas",
  iconName: "xmark",
  icon: [320, 512, [128473, 10005, 10006, 10060, 215, "close", "multiply", "remove", "times"], "f00d", "M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"]
};
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var humps$1 = { exports: {} };
(function(module2) {
  (function(global2) {
    var _processKeys = function(convert2, obj, options) {
      if (!_isObject(obj) || _isDate(obj) || _isRegExp(obj) || _isBoolean(obj) || _isFunction(obj)) {
        return obj;
      }
      var output, i = 0, l = 0;
      if (_isArray(obj)) {
        output = [];
        for (l = obj.length; i < l; i++) {
          output.push(_processKeys(convert2, obj[i], options));
        }
      } else {
        output = {};
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            output[convert2(key, options)] = _processKeys(convert2, obj[key], options);
          }
        }
      }
      return output;
    };
    var separateWords = function(string, options) {
      options = options || {};
      var separator = options.separator || "_";
      var split = options.split || /(?=[A-Z])/;
      return string.split(split).join(separator);
    };
    var camelize = function(string) {
      if (_isNumerical(string)) {
        return string;
      }
      string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : "";
      });
      return string.substr(0, 1).toLowerCase() + string.substr(1);
    };
    var pascalize = function(string) {
      var camelized = camelize(string);
      return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
    };
    var decamelize = function(string, options) {
      return separateWords(string, options).toLowerCase();
    };
    var toString = Object.prototype.toString;
    var _isFunction = function(obj) {
      return typeof obj === "function";
    };
    var _isObject = function(obj) {
      return obj === Object(obj);
    };
    var _isArray = function(obj) {
      return toString.call(obj) == "[object Array]";
    };
    var _isDate = function(obj) {
      return toString.call(obj) == "[object Date]";
    };
    var _isRegExp = function(obj) {
      return toString.call(obj) == "[object RegExp]";
    };
    var _isBoolean = function(obj) {
      return toString.call(obj) == "[object Boolean]";
    };
    var _isNumerical = function(obj) {
      obj = obj - 0;
      return obj === obj;
    };
    var _processor = function(convert2, options) {
      var callback = options && "process" in options ? options.process : options;
      if (typeof callback !== "function") {
        return convert2;
      }
      return function(string, options2) {
        return callback(string, convert2, options2);
      };
    };
    var humps2 = {
      camelize,
      decamelize,
      pascalize,
      depascalize: decamelize,
      camelizeKeys: function(object, options) {
        return _processKeys(_processor(camelize, options), object);
      },
      decamelizeKeys: function(object, options) {
        return _processKeys(_processor(decamelize, options), object, options);
      },
      pascalizeKeys: function(object, options) {
        return _processKeys(_processor(pascalize, options), object);
      },
      depascalizeKeys: function() {
        return this.decamelizeKeys.apply(this, arguments);
      }
    };
    if (module2.exports) {
      module2.exports = humps2;
    } else {
      global2.humps = humps2;
    }
  })(commonjsGlobal);
})(humps$1);
var humps = humps$1.exports;
var _excluded = ["class", "style"];
function styleToObject(style) {
  return style.split(";").map(function(s) {
    return s.trim();
  }).filter(function(s) {
    return s;
  }).reduce(function(output, pair) {
    var idx = pair.indexOf(":");
    var prop = humps.camelize(pair.slice(0, idx));
    var value = pair.slice(idx + 1).trim();
    output[prop] = value;
    return output;
  }, {});
}
function classToObject(classes) {
  return classes.split(/\s+/).reduce(function(output, className) {
    output[className] = true;
    return output;
  }, {});
}
function convert(abstractElement) {
  var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var attrs = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof abstractElement === "string") {
    return abstractElement;
  }
  var children = (abstractElement.children || []).map(function(child) {
    return convert(child);
  });
  var mixins = Object.keys(abstractElement.attributes || {}).reduce(function(mixins2, key) {
    var value = abstractElement.attributes[key];
    switch (key) {
      case "class":
        mixins2.class = classToObject(value);
        break;
      case "style":
        mixins2.style = styleToObject(value);
        break;
      default:
        mixins2.attrs[key] = value;
    }
    return mixins2;
  }, {
    attrs: {},
    class: {},
    style: {}
  });
  attrs.class;
  var _attrs$style = attrs.style, aStyle = _attrs$style === void 0 ? {} : _attrs$style, otherAttrs = _objectWithoutProperties(attrs, _excluded);
  return h(abstractElement.tag, _objectSpread2(_objectSpread2(_objectSpread2({}, props), {}, {
    class: mixins.class,
    style: _objectSpread2(_objectSpread2({}, mixins.style), aStyle)
  }, mixins.attrs), otherAttrs), children);
}
var PRODUCTION = false;
try {
  PRODUCTION = true;
} catch (e) {
}
function log() {
  if (!PRODUCTION && console && typeof console.error === "function") {
    var _console;
    (_console = console).error.apply(_console, arguments);
  }
}
function objectWithKey(key, value) {
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? _defineProperty({}, key, value) : {};
}
function classList(props) {
  var _classes;
  var classes = (_classes = {
    "fa-spin": props.spin,
    "fa-pulse": props.pulse,
    "fa-fw": props.fixedWidth,
    "fa-border": props.border,
    "fa-li": props.listItem,
    "fa-inverse": props.inverse,
    "fa-flip": props.flip === true,
    "fa-flip-horizontal": props.flip === "horizontal" || props.flip === "both",
    "fa-flip-vertical": props.flip === "vertical" || props.flip === "both"
  }, _defineProperty(_classes, "fa-".concat(props.size), props.size !== null), _defineProperty(_classes, "fa-rotate-".concat(props.rotation), props.rotation !== null), _defineProperty(_classes, "fa-pull-".concat(props.pull), props.pull !== null), _defineProperty(_classes, "fa-swap-opacity", props.swapOpacity), _defineProperty(_classes, "fa-bounce", props.bounce), _defineProperty(_classes, "fa-shake", props.shake), _defineProperty(_classes, "fa-beat", props.beat), _defineProperty(_classes, "fa-fade", props.fade), _defineProperty(_classes, "fa-beat-fade", props.beatFade), _defineProperty(_classes, "fa-flash", props.flash), _defineProperty(_classes, "fa-spin-pulse", props.spinPulse), _defineProperty(_classes, "fa-spin-reverse", props.spinReverse), _classes);
  return Object.keys(classes).map(function(key) {
    return classes[key] ? key : null;
  }).filter(function(key) {
    return key;
  });
}
function normalizeIconArgs(icon3) {
  if (icon3 && _typeof(icon3) === "object" && icon3.prefix && icon3.iconName && icon3.icon) {
    return icon3;
  }
  if (parse$1.icon) {
    return parse$1.icon(icon3);
  }
  if (icon3 === null) {
    return null;
  }
  if (_typeof(icon3) === "object" && icon3.prefix && icon3.iconName) {
    return icon3;
  }
  if (Array.isArray(icon3) && icon3.length === 2) {
    return {
      prefix: icon3[0],
      iconName: icon3[1]
    };
  }
  if (typeof icon3 === "string") {
    return {
      prefix: "fas",
      iconName: icon3
    };
  }
}
var FontAwesomeIcon = defineComponent({
  name: "FontAwesomeIcon",
  props: {
    border: {
      type: Boolean,
      default: false
    },
    fixedWidth: {
      type: Boolean,
      default: false
    },
    flip: {
      type: [Boolean, String],
      default: false,
      validator: function validator(value) {
        return [true, false, "horizontal", "vertical", "both"].indexOf(value) > -1;
      }
    },
    icon: {
      type: [Object, Array, String],
      required: true
    },
    mask: {
      type: [Object, Array, String],
      default: null
    },
    listItem: {
      type: Boolean,
      default: false
    },
    pull: {
      type: String,
      default: null,
      validator: function validator2(value) {
        return ["right", "left"].indexOf(value) > -1;
      }
    },
    pulse: {
      type: Boolean,
      default: false
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: function validator3(value) {
        return [90, 180, 270].indexOf(Number.parseInt(value, 10)) > -1;
      }
    },
    swapOpacity: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null,
      validator: function validator4(value) {
        return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(value) > -1;
      }
    },
    spin: {
      type: Boolean,
      default: false
    },
    transform: {
      type: [String, Object],
      default: null
    },
    symbol: {
      type: [Boolean, String],
      default: false
    },
    title: {
      type: String,
      default: null
    },
    inverse: {
      type: Boolean,
      default: false
    },
    bounce: {
      type: Boolean,
      default: false
    },
    shake: {
      type: Boolean,
      default: false
    },
    beat: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    },
    beatFade: {
      type: Boolean,
      default: false
    },
    flash: {
      type: Boolean,
      default: false
    },
    spinPulse: {
      type: Boolean,
      default: false
    },
    spinReverse: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref2) {
    var attrs = _ref2.attrs;
    var icon$1 = computed(function() {
      return normalizeIconArgs(props.icon);
    });
    var classes = computed(function() {
      return objectWithKey("classes", classList(props));
    });
    var transform = computed(function() {
      return objectWithKey("transform", typeof props.transform === "string" ? parse$1.transform(props.transform) : props.transform);
    });
    var mask = computed(function() {
      return objectWithKey("mask", normalizeIconArgs(props.mask));
    });
    var renderedIcon = computed(function() {
      return icon2(icon$1.value, _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, classes.value), transform.value), mask.value), {}, {
        symbol: props.symbol,
        title: props.title
      }));
    });
    watch(renderedIcon, function(value) {
      if (!value) {
        return log("Could not find one or more icon(s)", icon$1.value, mask.value);
      }
    }, {
      immediate: true
    });
    var vnode = computed(function() {
      return renderedIcon.value ? convert(renderedIcon.value.abstract[0], {}, attrs) : null;
    });
    return function() {
      return vnode.value;
    };
  }
});
defineComponent({
  name: "FontAwesomeLayers",
  props: {
    fixedWidth: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup2(props, _ref2) {
    var slots = _ref2.slots;
    var familyPrefix = config$1$1.familyPrefix;
    var className = computed(function() {
      return ["".concat(familyPrefix, "-layers")].concat(_toConsumableArray(props.fixedWidth ? ["".concat(familyPrefix, "-fw")] : []));
    });
    return function() {
      return h("div", {
        class: className.value
      }, slots.default ? slots.default() : []);
    };
  }
});
defineComponent({
  name: "FontAwesomeLayersText",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    transform: {
      type: [String, Object],
      default: null
    },
    counter: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: null,
      validator: function validator5(value) {
        return ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(value) > -1;
      }
    }
  },
  setup: function setup3(props, _ref2) {
    var attrs = _ref2.attrs;
    var familyPrefix = config$1$1.familyPrefix;
    var classes = computed(function() {
      return objectWithKey("classes", [].concat(_toConsumableArray(props.counter ? ["".concat(familyPrefix, "-layers-counter")] : []), _toConsumableArray(props.position ? ["".concat(familyPrefix, "-layers-").concat(props.position)] : [])));
    });
    var transform = computed(function() {
      return objectWithKey("transform", typeof props.transform === "string" ? parse$1.transform(props.transform) : props.transform);
    });
    var abstractElement = computed(function() {
      var _text = text(props.value.toString(), _objectSpread2(_objectSpread2({}, transform.value), classes.value)), abstract = _text.abstract;
      if (props.counter) {
        abstract[0].attributes.class = abstract[0].attributes.class.replace("fa-layers-text", "");
      }
      return abstract[0];
    });
    var vnode = computed(function() {
      return convert(abstractElement.value, {}, attrs);
    });
    return function() {
      return vnode.value;
    };
  }
});
function evaluateThis(fn) {
  return fn("return this");
}
const xglobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : evaluateThis(Function);
function extractGlobal(name, fallback) {
  return typeof xglobal[name] === "undefined" ? fallback : xglobal[name];
}
class TextDecoder$2 {
  constructor(_) {
  }
  decode(value) {
    let result = "";
    for (let i = 0; i < value.length; i++) {
      result += String.fromCharCode(value[i]);
    }
    return result;
  }
}
const TextDecoder$1 = extractGlobal("TextDecoder", TextDecoder$2);
class TextEncoder$2 {
  encode(value) {
    const u8a = new Uint8Array(value.length);
    for (let i = 0; i < value.length; i++) {
      u8a[i] = value.charCodeAt(i);
    }
    return u8a;
  }
}
const TextEncoder$1 = extractGlobal("TextEncoder", TextEncoder$2);
function isFunction(value) {
  return typeof value === "function";
}
function assert(condition, message) {
  if (!condition) {
    throw new Error(isFunction(message) ? message() : message);
  }
}
const BigInt$1 = typeof xglobal.BigInt === "function" && typeof xglobal.BigInt.asIntN === "function" ? xglobal.BigInt : () => Number.NaN;
const U8_TO_HEX = new Array(256);
const U16_TO_HEX = new Array(256 * 256);
const HEX_TO_U8 = {};
const HEX_TO_U16 = {};
for (let n = 0; n < 256; n++) {
  const hex = n.toString(16).padStart(2, "0");
  U8_TO_HEX[n] = hex;
  HEX_TO_U8[hex] = n;
}
for (let i = 0; i < 256; i++) {
  for (let j = 0; j < 256; j++) {
    const hex = U8_TO_HEX[i] + U8_TO_HEX[j];
    const n = i << 8 | j;
    U16_TO_HEX[n] = hex;
    HEX_TO_U16[hex] = n;
  }
}
const REGEX_HEX_PREFIXED = /^0x[\da-fA-F]+$/;
const REGEX_HEX_NOPREFIX = /^[\da-fA-F]+$/;
function isHex(value, bitLength = -1, ignoreLength) {
  return typeof value === "string" && (value === "0x" || REGEX_HEX_PREFIXED.test(value)) && (bitLength === -1 ? ignoreLength || value.length % 2 === 0 : value.length === 2 + Math.ceil(bitLength / 4));
}
function hexStripPrefix(value) {
  if (!value || value === "0x") {
    return "";
  } else if (REGEX_HEX_PREFIXED.test(value)) {
    return value.substring(2);
  } else if (REGEX_HEX_NOPREFIX.test(value)) {
    return value;
  }
  throw new Error(`Expected hex value to convert, found '${value}'`);
}
function hexToU8a(_value, bitLength = -1) {
  if (!_value) {
    return new Uint8Array();
  }
  const value = hexStripPrefix(_value).toLowerCase();
  const valLength = value.length / 2;
  const endLength = Math.ceil(bitLength === -1 ? valLength : bitLength / 8);
  const result = new Uint8Array(endLength);
  const offset = endLength > valLength ? endLength - valLength : 0;
  const dv = new DataView(result.buffer, offset);
  const mod = (endLength - offset) % 2;
  const length = endLength - offset - mod;
  for (let i = 0; i < length; i += 2) {
    const idx = i * 2;
    dv.setUint16(i, HEX_TO_U16[value.substring(idx, idx + 4)]);
  }
  if (mod) {
    dv.setUint8(length, HEX_TO_U8[value.substring(value.length - 2)]);
  }
  return result;
}
const hasBigInt = typeof BigInt$1 === "function" && typeof BigInt$1.asIntN === "function";
const hasBuffer = typeof Buffer !== "undefined";
function isBuffer(value) {
  return hasBuffer && isFunction(value && value.readDoubleLE) && Buffer.isBuffer(value);
}
function isU8a(value) {
  return (value && value.constructor) === Uint8Array || value instanceof Uint8Array;
}
const encoder = new TextEncoder$1();
function stringToU8a(value) {
  return value ? encoder.encode(value.toString()) : new Uint8Array();
}
function u8aToU8a(value) {
  return isU8a(value) ? value : isHex(value) ? hexToU8a(value) : isBuffer(value) || Array.isArray(value) ? new Uint8Array(value) : stringToU8a(value);
}
function u8aConcat(...list) {
  const u8as = new Array(list.length);
  let length = 0;
  for (let i = 0; i < list.length; i++) {
    u8as[i] = u8aToU8a(list[i]);
    length += u8as[i].length;
  }
  return u8aConcatStrict(u8as, length);
}
function u8aConcatStrict(u8as, length = 0) {
  let offset = 0;
  if (!length) {
    for (let i = 0; i < u8as.length; i++) {
      length += u8as[i].length;
    }
  }
  const result = new Uint8Array(length);
  for (let i = 0; i < u8as.length; i++) {
    result.set(u8as[i], offset);
    offset += u8as[i].length;
  }
  return result;
}
const decoder = new TextDecoder$1("utf-8");
function u8aToString(value) {
  return value ? decoder.decode(value) : "";
}
function getRandomValues(arr) {
  return xglobal.crypto.getRandomValues(arr);
}
const DEFAULT_CRYPTO = {
  getRandomValues
};
const DEFAULT_SELF = {
  crypto: DEFAULT_CRYPTO
};
class Wbg {
  constructor(bridge2) {
    __privateAdd(this, _bridge, void 0);
    __publicField(this, "abort", () => {
      throw new Error("abort");
    });
    __publicField(this, "__wbindgen_is_undefined", (idx) => {
      return __privateGet(this, _bridge).getObject(idx) === void 0;
    });
    __publicField(this, "__wbindgen_throw", (ptr, len) => {
      throw new Error(__privateGet(this, _bridge).getString(ptr, len));
    });
    __publicField(this, "__wbg_self_1b7a39e3a92c949c", () => {
      return __privateGet(this, _bridge).addObject(DEFAULT_SELF);
    });
    __publicField(this, "__wbg_require_604837428532a733", (ptr, len) => {
      throw new Error(`Unable to require ${__privateGet(this, _bridge).getString(ptr, len)}`);
    });
    __publicField(this, "__wbg_crypto_968f1772287e2df0", (_idx) => {
      return __privateGet(this, _bridge).addObject(DEFAULT_CRYPTO);
    });
    __publicField(this, "__wbg_getRandomValues_a3d34b4fee3c2869", (_idx) => {
      return __privateGet(this, _bridge).addObject(DEFAULT_CRYPTO.getRandomValues);
    });
    __publicField(this, "__wbg_getRandomValues_f5e14ab7ac8e995d", (_arg0, ptr, len) => {
      DEFAULT_CRYPTO.getRandomValues(__privateGet(this, _bridge).getU8a(ptr, len));
    });
    __publicField(this, "__wbg_randomFillSync_d5bd2d655fdf256a", (_idx, _ptr, _len) => {
      throw new Error("randomFillsync is not available");
    });
    __publicField(this, "__wbindgen_object_drop_ref", (idx) => {
      __privateGet(this, _bridge).takeObject(idx);
    });
    __privateSet(this, _bridge, bridge2);
  }
}
_bridge = new WeakMap();
class Bridge {
  constructor(createWasm2) {
    __privateAdd(this, _cachegetInt32, void 0);
    __privateAdd(this, _cachegetUint8, void 0);
    __privateAdd(this, _createWasm, void 0);
    __privateAdd(this, _heap, void 0);
    __privateAdd(this, _heapNext, void 0);
    __privateAdd(this, _wasm, void 0);
    __privateAdd(this, _wasmError, void 0);
    __privateAdd(this, _wasmPromise, void 0);
    __privateAdd(this, _wbg, void 0);
    __privateAdd(this, _type, void 0);
    __privateSet(this, _createWasm, createWasm2);
    __privateSet(this, _cachegetInt32, null);
    __privateSet(this, _cachegetUint8, null);
    __privateSet(this, _heap, new Array(32).fill(void 0).concat(void 0, null, true, false));
    __privateSet(this, _heapNext, __privateGet(this, _heap).length);
    __privateSet(this, _type, "none");
    __privateSet(this, _wasm, null);
    __privateSet(this, _wasmError, null);
    __privateSet(this, _wasmPromise, null);
    __privateSet(this, _wbg, __spreadValues({}, new Wbg(this)));
  }
  get error() {
    return __privateGet(this, _wasmError);
  }
  get type() {
    return __privateGet(this, _type);
  }
  get wbg() {
    return __privateGet(this, _wbg);
  }
  get wasm() {
    return __privateGet(this, _wasm);
  }
  async init(createWasm2) {
    if (!__privateGet(this, _wasmPromise) || createWasm2) {
      __privateSet(this, _wasmPromise, (createWasm2 || __privateGet(this, _createWasm))(__privateGet(this, _wbg)));
    }
    const {
      error,
      type,
      wasm
    } = await __privateGet(this, _wasmPromise);
    __privateSet(this, _type, type);
    __privateSet(this, _wasm, wasm);
    __privateSet(this, _wasmError, error);
    return __privateGet(this, _wasm);
  }
  getObject(idx) {
    return __privateGet(this, _heap)[idx];
  }
  dropObject(idx) {
    if (idx < 36) {
      return;
    }
    __privateGet(this, _heap)[idx] = __privateGet(this, _heapNext);
    __privateSet(this, _heapNext, idx);
  }
  takeObject(idx) {
    const ret = this.getObject(idx);
    this.dropObject(idx);
    return ret;
  }
  addObject(obj) {
    if (__privateGet(this, _heapNext) === __privateGet(this, _heap).length) {
      __privateGet(this, _heap).push(__privateGet(this, _heap).length + 1);
    }
    const idx = __privateGet(this, _heapNext);
    __privateSet(this, _heapNext, __privateGet(this, _heap)[idx]);
    __privateGet(this, _heap)[idx] = obj;
    return idx;
  }
  getInt32() {
    if (__privateGet(this, _cachegetInt32) === null || __privateGet(this, _cachegetInt32).buffer !== __privateGet(this, _wasm).memory.buffer) {
      __privateSet(this, _cachegetInt32, new Int32Array(__privateGet(this, _wasm).memory.buffer));
    }
    return __privateGet(this, _cachegetInt32);
  }
  getUint8() {
    if (__privateGet(this, _cachegetUint8) === null || __privateGet(this, _cachegetUint8).buffer !== __privateGet(this, _wasm).memory.buffer) {
      __privateSet(this, _cachegetUint8, new Uint8Array(__privateGet(this, _wasm).memory.buffer));
    }
    return __privateGet(this, _cachegetUint8);
  }
  getU8a(ptr, len) {
    return this.getUint8().subarray(ptr / 1, ptr / 1 + len);
  }
  getString(ptr, len) {
    return u8aToString(this.getU8a(ptr, len));
  }
  allocU8a(arg) {
    const ptr = __privateGet(this, _wasm).__wbindgen_malloc(arg.length * 1);
    this.getUint8().set(arg, ptr / 1);
    return [ptr, arg.length];
  }
  allocString(arg) {
    return this.allocU8a(stringToU8a(arg));
  }
  resultU8a() {
    const r0 = this.getInt32()[8 / 4 + 0];
    const r1 = this.getInt32()[8 / 4 + 1];
    const ret = this.getU8a(r0, r1).slice();
    __privateGet(this, _wasm).__wbindgen_free(r0, r1 * 1);
    return ret;
  }
  resultString() {
    return u8aToString(this.resultU8a());
  }
}
_cachegetInt32 = new WeakMap();
_cachegetUint8 = new WeakMap();
_createWasm = new WeakMap();
_heap = new WeakMap();
_heapNext = new WeakMap();
_wasm = new WeakMap();
_wasmError = new WeakMap();
_wasmPromise = new WeakMap();
_wbg = new WeakMap();
_type = new WeakMap();
function createWasmFn(root, wasmBytes2, asmFn) {
  return async (wbg) => {
    const result = {
      error: null,
      type: "none",
      wasm: null
    };
    try {
      assert(typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function" && wasmBytes2 && wasmBytes2.length, "WebAssembly is not available in your environment");
      const source = await WebAssembly.instantiate(wasmBytes2, {
        wbg
      });
      result.wasm = source.instance.exports;
      result.type = "wasm";
    } catch (error) {
      if (asmFn) {
        result.wasm = asmFn(wbg);
        result.type = "asm";
      } else {
        result.error = `FATAL: Unable to initialize @polkadot/wasm-${root}:: ${error.message}`;
        console.error(result.error);
      }
    }
    return result;
  };
}
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function base64Decode(data) {
  const bytes2 = [];
  let byte = 0;
  let bits2 = 0;
  for (let i = 0; i < data.length && data[i] !== "="; i++) {
    byte = byte << 6 | chars.indexOf(data[i]);
    if ((bits2 += 6) >= 8) {
      bytes2.push(byte >>> (bits2 -= 8) & 255);
    }
  }
  return Uint8Array.from(bytes2);
}
const u8 = Uint8Array, u16 = Uint16Array, u32$1 = Uint32Array;
const clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
const fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  0,
  0,
  0
]);
const fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  0,
  0
]);
const freb = (eb, start) => {
  const b = new u16(31);
  for (let i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  const r = new u32$1(b[30]);
  for (let i = 1; i < 30; ++i) {
    for (let j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return [b, r];
};
const [fl, revfl] = freb(fleb, 2);
fl[28] = 258, revfl[258] = 28;
const [fd] = freb(fdeb, 0);
const rev = new u16(32768);
for (let i = 0; i < 32768; ++i) {
  let x = (i & 43690) >>> 1 | (i & 21845) << 1;
  x = (x & 52428) >>> 2 | (x & 13107) << 2;
  x = (x & 61680) >>> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
const hMap = (cd, mb, r) => {
  const s = cd.length;
  let i = 0;
  const l = new u16(mb);
  for (; i < s; ++i)
    ++l[cd[i] - 1];
  const le = new u16(mb);
  for (i = 0; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  let co;
  if (r) {
    co = new u16(1 << mb);
    const rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        const sv = i << 4 | cd[i];
        const r2 = mb - cd[i];
        let v = le[cd[i] - 1]++ << r2;
        for (const m = v | (1 << r2) - 1; v <= m; ++v) {
          co[rev[v] >>> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i)
      co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
  }
  return co;
};
const flt = new u8(288);
for (let i = 0; i < 144; ++i)
  flt[i] = 8;
for (let i = 144; i < 256; ++i)
  flt[i] = 9;
for (let i = 256; i < 280; ++i)
  flt[i] = 7;
for (let i = 280; i < 288; ++i)
  flt[i] = 8;
const fdt = new u8(32);
for (let i = 0; i < 32; ++i)
  fdt[i] = 5;
const flrm = hMap(flt, 9, 1);
const fdrm = hMap(fdt, 5, 1);
const bits = (d2, p2, m) => {
  const o = p2 >>> 3;
  return (d2[o] | d2[o + 1] << 8) >>> (p2 & 7) & m;
};
const bits16 = (d2, p2) => {
  const o = p2 >>> 3;
  return (d2[o] | d2[o + 1] << 8 | d2[o + 2] << 16) >>> (p2 & 7);
};
const shft = (p2) => (p2 >>> 3) + (p2 & 7 && 1);
const slc = (v, s, e) => {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  const n = new (v instanceof u16 ? u16 : v instanceof u32$1 ? u32$1 : u8)(e - s);
  n.set(v.subarray(s, e));
  return n;
};
const max = (a) => {
  let m = a[0];
  for (let i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
const inflt = (dat, buf, st) => {
  const noSt = !st || st.i;
  if (!st)
    st = {};
  const sl = dat.length;
  const noBuf = !buf || !noSt;
  if (!buf)
    buf = new u8(sl * 3);
  const cbuf = (l) => {
    let bl = buf.length;
    if (l > bl) {
      const nbuf = new u8(Math.max(bl << 1, l));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  let final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  if (final && !lm)
    return buf;
  const tbts = sl << 3;
  do {
    if (!lm) {
      st.f = final = bits(dat, pos, 1);
      const type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        const s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            throw "unexpected EOF";
          break;
        }
        if (noBuf)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t << 3;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        const hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        const tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        const ldt = new u8(tl);
        const clt = new u8(19);
        for (let i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        const clb = max(clt), clbmsk = (1 << clb) - 1;
        if (!noSt && pos + tl * (clb + 7) > tbts)
          break;
        const clm = hMap(clt, clb, 1);
        for (let i = 0; i < tl; ) {
          const r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          const s = r >>> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            let c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        const lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        throw "invalid block type";
      if (pos > tbts)
        throw "unexpected EOF";
    }
    if (noBuf)
      cbuf(bt + 131072);
    const lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    const mxa = lbt + dbt + 18;
    while (noSt || pos + mxa < tbts) {
      const c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
      pos += c & 15;
      if (pos > tbts)
        throw "unexpected EOF";
      if (!c)
        throw "invalid length/literal";
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lm = void 0;
        break;
      } else {
        let add2 = sym - 254;
        if (sym > 264) {
          const i = sym - 257, b = fleb[i];
          add2 = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        const d2 = dm[bits16(dat, pos) & dms], dsym = d2 >>> 4;
        if (!d2)
          throw "invalid distance";
        pos += d2 & 15;
        let dt = fd[dsym];
        if (dsym > 3) {
          const b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts)
          throw "unexpected EOF";
        if (noBuf)
          cbuf(bt + 131072);
        const end3 = bt + add2;
        for (; bt < end3; bt += 4) {
          buf[bt] = buf[bt - dt];
          buf[bt + 1] = buf[bt + 1 - dt];
          buf[bt + 2] = buf[bt + 2 - dt];
          buf[bt + 3] = buf[bt + 3 - dt];
        }
        bt = end3;
      }
    }
    st.l = lm, st.p = pos, st.b = bt;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt == buf.length ? buf : slc(buf, 0, bt);
};
const zlv = (d2) => {
  if ((d2[0] & 15) != 8 || d2[0] >>> 4 > 7 || (d2[0] << 8 | d2[1]) % 31)
    throw "invalid zlib data";
  if (d2[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function unzlibSync(data, out) {
  return inflt((zlv(data), data.subarray(2, -4)), out);
}
const sizeCompressed = 171464;
const sizeUncompressed = 340174;
const bytes = "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";
var bytes_1 = { bytes, sizeCompressed, sizeUncompressed };
const wasmBytes = unzlibSync(base64Decode(bytes_1.bytes), new Uint8Array(bytes_1.sizeUncompressed));
const createWasm = createWasmFn("crypto", wasmBytes, null);
const bridge = new Bridge(createWasm);
function withWasm(fn) {
  return (...params) => {
    assert(bridge.wasm, "The WASM interface has not been initialized. Ensure that you wait for the initialization Promise with waitReady() from @polkadot/wasm-crypto (or cryptoWaitReady() from @polkadot/util-crypto) before attempting to use WASM-only interfaces.");
    return fn(bridge.wasm, ...params);
  };
}
const blake2b$1 = withWasm((wasm, data, key, size) => {
  wasm.ext_blake2b(8, ...bridge.allocU8a(data), ...bridge.allocU8a(key), size);
  return bridge.resultU8a();
});
function isReady() {
  return !!bridge.wasm;
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
const isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
(() => {
  const nodeRequire = typeof module !== "undefined" && typeof module.require === "function" && module.require.bind(module);
  try {
    if (nodeRequire) {
      const { setImmediate } = nodeRequire("timers");
      return () => new Promise((resolve) => setImmediate(resolve));
    }
  } catch (e) {
  }
  return () => new Promise((resolve) => setTimeout(resolve, 0));
})();
function utf8ToBytes(str) {
  if (typeof str !== "string") {
    throw new TypeError(`utf8ToBytes expected string, got ${typeof str}`);
  }
  return new TextEncoder().encode(str);
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  if (!(data instanceof Uint8Array))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof data})`);
  return data;
}
function assertNumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
class Hash {
  clone() {
    return this._cloneInto();
  }
}
function wrapConstructorWithOpts(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}
const U32_MASK64 = BigInt(2 ** 32 - 1);
const _32n = BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
const rotrSH = (h2, l, s) => h2 >>> s | l << 32 - s;
const rotrSL = (h2, l, s) => h2 << 32 - s | l >>> s;
const rotrBH = (h2, l, s) => h2 << 64 - s | l >>> s - 32;
const rotrBL = (h2, l, s) => h2 >>> s - 32 | l << 64 - s;
const rotr32H = (h2, l) => l;
const rotr32L = (h2, l) => h2;
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var base = {};
(function(exports) {
  /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.bytes = exports.stringToBytes = exports.str = exports.bytesToString = exports.hex = exports.utf8 = exports.bech32m = exports.bech32 = exports.base58check = exports.base58xmr = exports.base58xrp = exports.base58flickr = exports.base58 = exports.base64url = exports.base64 = exports.base32crockford = exports.base32hex = exports.base32 = exports.base16 = exports.utils = exports.assertNumber = void 0;
  function assertNumber2(n) {
    if (!Number.isSafeInteger(n))
      throw new Error(`Wrong integer: ${n}`);
  }
  exports.assertNumber = assertNumber2;
  function chain(...args) {
    const wrap = (a, b) => (c) => a(b(c));
    const encode = Array.from(args).reverse().reduce((acc, i) => acc ? wrap(acc, i.encode) : i.encode, void 0);
    const decode = args.reduce((acc, i) => acc ? wrap(acc, i.decode) : i.decode, void 0);
    return { encode, decode };
  }
  function alphabet(alphabet2) {
    return {
      encode: (digits) => {
        if (!Array.isArray(digits) || digits.length && typeof digits[0] !== "number")
          throw new Error("alphabet.encode input should be an array of numbers");
        return digits.map((i) => {
          assertNumber2(i);
          if (i < 0 || i >= alphabet2.length)
            throw new Error(`Digit index outside alphabet: ${i} (alphabet: ${alphabet2.length})`);
          return alphabet2[i];
        });
      },
      decode: (input) => {
        if (!Array.isArray(input) || input.length && typeof input[0] !== "string")
          throw new Error("alphabet.decode input should be array of strings");
        return input.map((letter) => {
          if (typeof letter !== "string")
            throw new Error(`alphabet.decode: not string element=${letter}`);
          const index2 = alphabet2.indexOf(letter);
          if (index2 === -1)
            throw new Error(`Unknown letter: "${letter}". Allowed: ${alphabet2}`);
          return index2;
        });
      }
    };
  }
  function join(separator = "") {
    if (typeof separator !== "string")
      throw new Error("join separator should be string");
    return {
      encode: (from) => {
        if (!Array.isArray(from) || from.length && typeof from[0] !== "string")
          throw new Error("join.encode input should be array of strings");
        for (let i of from)
          if (typeof i !== "string")
            throw new Error(`join.encode: non-string input=${i}`);
        return from.join(separator);
      },
      decode: (to) => {
        if (typeof to !== "string")
          throw new Error("join.decode input should be string");
        return to.split(separator);
      }
    };
  }
  function padding(bits2, chr = "=") {
    assertNumber2(bits2);
    if (typeof chr !== "string")
      throw new Error("padding chr should be string");
    return {
      encode(data) {
        if (!Array.isArray(data) || data.length && typeof data[0] !== "string")
          throw new Error("padding.encode input should be array of strings");
        for (let i of data)
          if (typeof i !== "string")
            throw new Error(`padding.encode: non-string input=${i}`);
        while (data.length * bits2 % 8)
          data.push(chr);
        return data;
      },
      decode(input) {
        if (!Array.isArray(input) || input.length && typeof input[0] !== "string")
          throw new Error("padding.encode input should be array of strings");
        for (let i of input)
          if (typeof i !== "string")
            throw new Error(`padding.decode: non-string input=${i}`);
        let end3 = input.length;
        if (end3 * bits2 % 8)
          throw new Error("Invalid padding: string should have whole number of bytes");
        for (; end3 > 0 && input[end3 - 1] === chr; end3--) {
          if (!((end3 - 1) * bits2 % 8))
            throw new Error("Invalid padding: string has too much padding");
        }
        return input.slice(0, end3);
      }
    };
  }
  function normalize(fn) {
    if (typeof fn !== "function")
      throw new Error("normalize fn should be function");
    return { encode: (from) => from, decode: (to) => fn(to) };
  }
  function convertRadix(data, from, to) {
    if (from < 2)
      throw new Error(`convertRadix: wrong from=${from}, base cannot be less than 2`);
    if (to < 2)
      throw new Error(`convertRadix: wrong to=${to}, base cannot be less than 2`);
    if (!Array.isArray(data))
      throw new Error("convertRadix: data should be array");
    if (!data.length)
      return [];
    let pos = 0;
    const res = [];
    const digits = Array.from(data);
    digits.forEach((d2) => {
      assertNumber2(d2);
      if (d2 < 0 || d2 >= from)
        throw new Error(`Wrong integer: ${d2}`);
    });
    while (true) {
      let carry = 0;
      let done = true;
      for (let i = pos; i < digits.length; i++) {
        const digit = digits[i];
        const digitBase = from * carry + digit;
        if (!Number.isSafeInteger(digitBase) || from * carry / from !== carry || digitBase - digit !== from * carry) {
          throw new Error("convertRadix: carry overflow");
        }
        carry = digitBase % to;
        digits[i] = Math.floor(digitBase / to);
        if (!Number.isSafeInteger(digits[i]) || digits[i] * to + carry !== digitBase)
          throw new Error("convertRadix: carry overflow");
        if (!done)
          continue;
        else if (!digits[i])
          pos = i;
        else
          done = false;
      }
      res.push(carry);
      if (done)
        break;
    }
    for (let i = 0; i < data.length - 1 && data[i] === 0; i++)
      res.push(0);
    return res.reverse();
  }
  const gcd = (a, b) => !b ? a : gcd(b, a % b);
  const radix2carry = (from, to) => from + (to - gcd(from, to));
  function convertRadix2(data, from, to, padding2) {
    if (!Array.isArray(data))
      throw new Error("convertRadix2: data should be array");
    if (from <= 0 || from > 32)
      throw new Error(`convertRadix2: wrong from=${from}`);
    if (to <= 0 || to > 32)
      throw new Error(`convertRadix2: wrong to=${to}`);
    if (radix2carry(from, to) > 32) {
      throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry(from, to)}`);
    }
    let carry = 0;
    let pos = 0;
    const mask = 2 ** to - 1;
    const res = [];
    for (const n of data) {
      assertNumber2(n);
      if (n >= 2 ** from)
        throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
      carry = carry << from | n;
      if (pos + from > 32)
        throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
      pos += from;
      for (; pos >= to; pos -= to)
        res.push((carry >> pos - to & mask) >>> 0);
      carry &= 2 ** pos - 1;
    }
    carry = carry << to - pos & mask;
    if (!padding2 && pos >= from)
      throw new Error("Excess padding");
    if (!padding2 && carry)
      throw new Error(`Non-zero padding: ${carry}`);
    if (padding2 && pos > 0)
      res.push(carry >>> 0);
    return res;
  }
  function radix(num) {
    assertNumber2(num);
    return {
      encode: (bytes2) => {
        if (!(bytes2 instanceof Uint8Array))
          throw new Error("radix.encode input should be Uint8Array");
        return convertRadix(Array.from(bytes2), 2 ** 8, num);
      },
      decode: (digits) => {
        if (!Array.isArray(digits) || digits.length && typeof digits[0] !== "number")
          throw new Error("radix.decode input should be array of strings");
        return Uint8Array.from(convertRadix(digits, num, 2 ** 8));
      }
    };
  }
  function radix2(bits2, revPadding = false) {
    assertNumber2(bits2);
    if (bits2 <= 0 || bits2 > 32)
      throw new Error("radix2: bits should be in (0..32]");
    if (radix2carry(8, bits2) > 32 || radix2carry(bits2, 8) > 32)
      throw new Error("radix2: carry overflow");
    return {
      encode: (bytes2) => {
        if (!(bytes2 instanceof Uint8Array))
          throw new Error("radix2.encode input should be Uint8Array");
        return convertRadix2(Array.from(bytes2), 8, bits2, !revPadding);
      },
      decode: (digits) => {
        if (!Array.isArray(digits) || digits.length && typeof digits[0] !== "number")
          throw new Error("radix2.decode input should be array of strings");
        return Uint8Array.from(convertRadix2(digits, bits2, 8, revPadding));
      }
    };
  }
  function unsafeWrapper(fn) {
    if (typeof fn !== "function")
      throw new Error("unsafeWrapper fn should be function");
    return function(...args) {
      try {
        return fn.apply(null, args);
      } catch (e) {
      }
    };
  }
  function checksum(len, fn) {
    assertNumber2(len);
    if (typeof fn !== "function")
      throw new Error("checksum fn should be function");
    return {
      encode(data) {
        if (!(data instanceof Uint8Array))
          throw new Error("checksum.encode: input should be Uint8Array");
        const checksum2 = fn(data).slice(0, len);
        const res = new Uint8Array(data.length + len);
        res.set(data);
        res.set(checksum2, data.length);
        return res;
      },
      decode(data) {
        if (!(data instanceof Uint8Array))
          throw new Error("checksum.decode: input should be Uint8Array");
        const payload = data.slice(0, -len);
        const newChecksum = fn(payload).slice(0, len);
        const oldChecksum = data.slice(-len);
        for (let i = 0; i < len; i++)
          if (newChecksum[i] !== oldChecksum[i])
            throw new Error("Invalid checksum");
        return payload;
      }
    };
  }
  exports.utils = { alphabet, chain, checksum, radix, radix2, join, padding };
  exports.base16 = chain(radix2(4), alphabet("0123456789ABCDEF"), join(""));
  exports.base32 = chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), padding(5), join(""));
  exports.base32hex = chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), padding(5), join(""));
  exports.base32crockford = chain(radix2(5), alphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), join(""), normalize((s) => s.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
  exports.base64 = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), padding(6), join(""));
  exports.base64url = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), padding(6), join(""));
  const genBase58 = (abc) => chain(radix(58), alphabet(abc), join(""));
  exports.base58 = genBase58("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
  exports.base58flickr = genBase58("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
  exports.base58xrp = genBase58("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
  const XMR_BLOCK_LEN = [0, 2, 3, 5, 6, 7, 9, 10, 11];
  exports.base58xmr = {
    encode(data) {
      let res = "";
      for (let i = 0; i < data.length; i += 8) {
        const block = data.subarray(i, i + 8);
        res += exports.base58.encode(block).padStart(XMR_BLOCK_LEN[block.length], "1");
      }
      return res;
    },
    decode(str) {
      let res = [];
      for (let i = 0; i < str.length; i += 11) {
        const slice = str.slice(i, i + 11);
        const blockLen = XMR_BLOCK_LEN.indexOf(slice.length);
        const block = exports.base58.decode(slice);
        for (let j = 0; j < block.length - blockLen; j++) {
          if (block[j] !== 0)
            throw new Error("base58xmr: wrong padding");
        }
        res = res.concat(Array.from(block.slice(block.length - blockLen)));
      }
      return Uint8Array.from(res);
    }
  };
  const base58check = (sha256) => chain(checksum(4, (data) => sha256(sha256(data))), exports.base58);
  exports.base58check = base58check;
  const BECH_ALPHABET = chain(alphabet("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), join(""));
  const POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
  function bech32Polymod(pre) {
    const b = pre >> 25;
    let chk = (pre & 33554431) << 5;
    for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
      if ((b >> i & 1) === 1)
        chk ^= POLYMOD_GENERATORS[i];
    }
    return chk;
  }
  function bechChecksum(prefix, words, encodingConst = 1) {
    const len = prefix.length;
    let chk = 1;
    for (let i = 0; i < len; i++) {
      const c = prefix.charCodeAt(i);
      if (c < 33 || c > 126)
        throw new Error(`Invalid prefix (${prefix})`);
      chk = bech32Polymod(chk) ^ c >> 5;
    }
    chk = bech32Polymod(chk);
    for (let i = 0; i < len; i++)
      chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 31;
    for (let v of words)
      chk = bech32Polymod(chk) ^ v;
    for (let i = 0; i < 6; i++)
      chk = bech32Polymod(chk);
    chk ^= encodingConst;
    return BECH_ALPHABET.encode(convertRadix2([chk % 2 ** 30], 30, 5, false));
  }
  function genBech32(encoding) {
    const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
    const _words = radix2(5);
    const fromWords = _words.decode;
    const toWords = _words.encode;
    const fromWordsUnsafe = unsafeWrapper(fromWords);
    function encode(prefix, words, limit = 90) {
      if (typeof prefix !== "string")
        throw new Error(`bech32.encode prefix should be string, not ${typeof prefix}`);
      if (!Array.isArray(words) || words.length && typeof words[0] !== "number")
        throw new Error(`bech32.encode words should be array of numbers, not ${typeof words}`);
      const actualLength = prefix.length + 7 + words.length;
      if (limit !== false && actualLength > limit)
        throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
      prefix = prefix.toLowerCase();
      return `${prefix}1${BECH_ALPHABET.encode(words)}${bechChecksum(prefix, words, ENCODING_CONST)}`;
    }
    function decode(str, limit = 90) {
      if (typeof str !== "string")
        throw new Error(`bech32.decode input should be string, not ${typeof str}`);
      if (str.length < 8 || limit !== false && str.length > limit)
        throw new TypeError(`Wrong string length: ${str.length} (${str}). Expected (8..${limit})`);
      const lowered = str.toLowerCase();
      if (str !== lowered && str !== str.toUpperCase())
        throw new Error(`String must be lowercase or uppercase`);
      str = lowered;
      const sepIndex = str.lastIndexOf("1");
      if (sepIndex === 0 || sepIndex === -1)
        throw new Error(`Letter "1" must be present between prefix and data only`);
      const [prefix, _words2] = [str.slice(0, sepIndex), str.slice(sepIndex + 1)];
      if (_words2.length < 6)
        throw new Error("Data must be at least 6 characters long");
      const words = BECH_ALPHABET.decode(_words2).slice(0, -6);
      const sum = bechChecksum(prefix, words, ENCODING_CONST);
      if (!_words2.endsWith(sum))
        throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
      return { prefix, words };
    }
    const decodeUnsafe = unsafeWrapper(decode);
    function decodeToBytes(str) {
      const { prefix, words } = decode(str, false);
      return { prefix, words, bytes: fromWords(words) };
    }
    return { encode, decode, decodeToBytes, decodeUnsafe, fromWords, fromWordsUnsafe, toWords };
  }
  exports.bech32 = genBech32("bech32");
  exports.bech32m = genBech32("bech32m");
  exports.utf8 = {
    encode: (data) => new TextDecoder().decode(data),
    decode: (str) => new TextEncoder().encode(str)
  };
  exports.hex = chain(radix2(4), alphabet("0123456789abcdef"), join(""), normalize((s) => {
    if (typeof s !== "string" || s.length % 2)
      throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
    return s.toLowerCase();
  }));
  const CODERS = {
    utf8: exports.utf8,
    hex: exports.hex,
    base16: exports.base16,
    base32: exports.base32,
    base64: exports.base64,
    base64url: exports.base64url,
    base58: exports.base58,
    base58xmr: exports.base58xmr
  };
  const coderTypeError = `Invalid encoding type. Available types: ${Object.keys(CODERS).join(", ")}`;
  const bytesToString = (type, bytes2) => {
    if (typeof type !== "string" || !CODERS.hasOwnProperty(type))
      throw new TypeError(coderTypeError);
    if (!(bytes2 instanceof Uint8Array))
      throw new TypeError("bytesToString() expects Uint8Array");
    return CODERS[type].encode(bytes2);
  };
  exports.bytesToString = bytesToString;
  exports.str = exports.bytesToString;
  const stringToBytes = (type, str) => {
    if (!CODERS.hasOwnProperty(type))
      throw new TypeError(coderTypeError);
    if (typeof str !== "string")
      throw new TypeError("stringToBytes() expects string");
    return CODERS[type].decode(str);
  };
  exports.stringToBytes = stringToBytes;
  exports.bytes = exports.stringToBytes;
})(base);
function createDecode({
  coder,
  ipfs
}, validate) {
  return (value, ipfsCompat) => {
    validate(value, ipfsCompat);
    return coder.decode(ipfs && ipfsCompat ? value.substring(1) : value);
  };
}
function createEncode({
  coder,
  ipfs
}) {
  return (value, ipfsCompat) => {
    const out = coder.encode(u8aToU8a(value));
    return ipfs && ipfsCompat ? `${ipfs}${out}` : out;
  };
}
function createValidate({
  chars: chars2,
  ipfs,
  type
}) {
  return (value, ipfsCompat) => {
    assert(value && typeof value === "string", () => `Expected non-null, non-empty ${type} string input`);
    if (ipfs && ipfsCompat) {
      assert(value[0] === ipfs, () => `Expected ipfs-compatible ${type} to start with '${ipfs}'`);
    }
    for (let i = ipfsCompat ? 1 : 0; i < value.length; i++) {
      assert(chars2.includes(value[i]) || value[i] === "=" && (i === value.length - 1 || !chars2.includes(value[i + 1])), () => `Invalid ${type} character "${value[i]}" (0x${value.charCodeAt(i).toString(16)}) at index ${i}`);
    }
    return true;
  };
}
const config = {
  chars: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  coder: base.base58,
  ipfs: "z",
  type: "base58"
};
const base58Validate = createValidate(config);
const base58Decode = createDecode(config, base58Validate);
const base58Encode = createEncode(config);
const SIGMA = new Uint8Array([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9,
  12,
  5,
  1,
  15,
  14,
  13,
  4,
  10,
  0,
  7,
  6,
  3,
  9,
  2,
  8,
  11,
  13,
  11,
  7,
  14,
  12,
  1,
  3,
  9,
  5,
  0,
  15,
  4,
  8,
  6,
  2,
  10,
  6,
  15,
  14,
  9,
  11,
  3,
  0,
  8,
  12,
  2,
  13,
  7,
  1,
  4,
  10,
  5,
  10,
  2,
  8,
  4,
  7,
  6,
  1,
  5,
  15,
  11,
  9,
  14,
  3,
  12,
  13,
  0,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3
]);
class BLAKE2 extends Hash {
  constructor(blockLen, outputLen, opts = {}, keyLen, saltLen, persLen) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.length = 0;
    this.pos = 0;
    this.finished = false;
    this.destroyed = false;
    assertNumber(blockLen);
    assertNumber(outputLen);
    assertNumber(keyLen);
    if (outputLen < 0 || outputLen > keyLen)
      throw new Error("Blake2: outputLen bigger than keyLen");
    if (opts.key !== void 0 && (opts.key.length < 1 || opts.key.length > keyLen))
      throw new Error(`Key should be up 1..${keyLen} byte long or undefined`);
    if (opts.salt !== void 0 && opts.salt.length !== saltLen)
      throw new Error(`Salt should be ${saltLen} byte long or undefined`);
    if (opts.personalization !== void 0 && opts.personalization.length !== persLen)
      throw new Error(`Personalization should be ${persLen} byte long or undefined`);
    this.buffer32 = u32(this.buffer = new Uint8Array(blockLen));
  }
  update(data) {
    if (this.destroyed)
      throw new Error("instance is destroyed");
    const { finished, blockLen, buffer, buffer32 } = this;
    if (finished)
      throw new Error("digest() was already called");
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      if (this.pos === blockLen) {
        this.compress(buffer32, 0, false);
        this.pos = 0;
      }
      const take = Math.min(blockLen - this.pos, len - pos);
      const dataOffset = data.byteOffset + pos;
      if (take === blockLen && !(dataOffset % 4) && pos + take < len) {
        const data32 = new Uint32Array(data.buffer, dataOffset, Math.floor((len - pos) / 4));
        for (let pos32 = 0; pos + blockLen < len; pos32 += buffer32.length, pos += blockLen) {
          this.length += blockLen;
          this.compress(data32, pos32, false);
        }
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      this.length += take;
      pos += take;
    }
    return this;
  }
  digestInto(out) {
    if (this.destroyed)
      throw new Error("instance is destroyed");
    if (!(out instanceof Uint8Array) || out.length < this.outputLen)
      throw new Error("_Blake2: Invalid output buffer");
    const { finished, pos, buffer32 } = this;
    if (finished)
      throw new Error("digest() was already called");
    this.finished = true;
    this.buffer.subarray(pos).fill(0);
    this.compress(buffer32, 0, true);
    const out32 = u32(out);
    this.get().forEach((v, i) => out32[i] = v);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    const { buffer, length, finished, destroyed, outputLen, pos } = this;
    to || (to = new this.constructor({ dkLen: outputLen }));
    to.set(...this.get());
    to.length = length;
    to.finished = finished;
    to.destroyed = destroyed;
    to.outputLen = outputLen;
    to.buffer.set(buffer);
    to.pos = pos;
    return to;
  }
}
const IV = new Uint32Array([
  4089235720,
  1779033703,
  2227873595,
  3144134277,
  4271175723,
  1013904242,
  1595750129,
  2773480762,
  2917565137,
  1359893119,
  725511199,
  2600822924,
  4215389547,
  528734635,
  327033209,
  1541459225
]);
const BUF = new Uint32Array(32);
function G1(a, b, c, d2, msg, x) {
  const Xl = msg[x], Xh = msg[x + 1];
  let Al = BUF[2 * a], Ah = BUF[2 * a + 1];
  let Bl = BUF[2 * b], Bh = BUF[2 * b + 1];
  let Cl = BUF[2 * c], Ch = BUF[2 * c + 1];
  let Dl = BUF[2 * d2], Dh = BUF[2 * d2 + 1];
  let ll = add3L(Al, Bl, Xl);
  Ah = add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: rotr32H(Dh, Dl), Dl: rotr32L(Dh) });
  ({ h: Ch, l: Cl } = add(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: rotrSH(Bh, Bl, 24), Bl: rotrSL(Bh, Bl, 24) });
  BUF[2 * a] = Al, BUF[2 * a + 1] = Ah;
  BUF[2 * b] = Bl, BUF[2 * b + 1] = Bh;
  BUF[2 * c] = Cl, BUF[2 * c + 1] = Ch;
  BUF[2 * d2] = Dl, BUF[2 * d2 + 1] = Dh;
}
function G2(a, b, c, d2, msg, x) {
  const Xl = msg[x], Xh = msg[x + 1];
  let Al = BUF[2 * a], Ah = BUF[2 * a + 1];
  let Bl = BUF[2 * b], Bh = BUF[2 * b + 1];
  let Cl = BUF[2 * c], Ch = BUF[2 * c + 1];
  let Dl = BUF[2 * d2], Dh = BUF[2 * d2 + 1];
  let ll = add3L(Al, Bl, Xl);
  Ah = add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: rotrSH(Dh, Dl, 16), Dl: rotrSL(Dh, Dl, 16) });
  ({ h: Ch, l: Cl } = add(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: rotrBH(Bh, Bl, 63), Bl: rotrBL(Bh, Bl, 63) });
  BUF[2 * a] = Al, BUF[2 * a + 1] = Ah;
  BUF[2 * b] = Bl, BUF[2 * b + 1] = Bh;
  BUF[2 * c] = Cl, BUF[2 * c + 1] = Ch;
  BUF[2 * d2] = Dl, BUF[2 * d2 + 1] = Dh;
}
class BLAKE2b extends BLAKE2 {
  constructor(opts = {}) {
    super(128, opts.dkLen === void 0 ? 64 : opts.dkLen, opts, 64, 16, 16);
    this.v0l = IV[0] | 0;
    this.v0h = IV[1] | 0;
    this.v1l = IV[2] | 0;
    this.v1h = IV[3] | 0;
    this.v2l = IV[4] | 0;
    this.v2h = IV[5] | 0;
    this.v3l = IV[6] | 0;
    this.v3h = IV[7] | 0;
    this.v4l = IV[8] | 0;
    this.v4h = IV[9] | 0;
    this.v5l = IV[10] | 0;
    this.v5h = IV[11] | 0;
    this.v6l = IV[12] | 0;
    this.v6h = IV[13] | 0;
    this.v7l = IV[14] | 0;
    this.v7h = IV[15] | 0;
    const keyLength = opts.key ? opts.key.length : 0;
    this.v0l ^= this.outputLen | keyLength << 8 | 1 << 16 | 1 << 24;
    if (opts.salt) {
      const salt = u32(toBytes(opts.salt));
      this.v4l ^= salt[0];
      this.v4h ^= salt[1];
      this.v5l ^= salt[2];
      this.v5h ^= salt[3];
    }
    if (opts.personalization) {
      const pers = u32(toBytes(opts.personalization));
      this.v6l ^= pers[0];
      this.v6h ^= pers[1];
      this.v7l ^= pers[2];
      this.v7h ^= pers[3];
    }
    if (opts.key) {
      const tmp = new Uint8Array(this.blockLen);
      tmp.set(toBytes(opts.key));
      this.update(tmp);
    }
  }
  get() {
    let { v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h } = this;
    return [v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h];
  }
  set(v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h) {
    this.v0l = v0l | 0;
    this.v0h = v0h | 0;
    this.v1l = v1l | 0;
    this.v1h = v1h | 0;
    this.v2l = v2l | 0;
    this.v2h = v2h | 0;
    this.v3l = v3l | 0;
    this.v3h = v3h | 0;
    this.v4l = v4l | 0;
    this.v4h = v4h | 0;
    this.v5l = v5l | 0;
    this.v5h = v5h | 0;
    this.v6l = v6l | 0;
    this.v6h = v6h | 0;
    this.v7l = v7l | 0;
    this.v7h = v7h | 0;
  }
  compress(msg, offset, isLast) {
    this.get().forEach((v, i) => BUF[i] = v);
    BUF.set(IV, 16);
    let { h: h2, l } = fromBig(BigInt(this.length));
    BUF[24] = IV[8] ^ l;
    BUF[25] = IV[9] ^ h2;
    if (isLast) {
      BUF[28] = ~BUF[28];
      BUF[29] = ~BUF[29];
    }
    let j = 0;
    const s = SIGMA;
    for (let i = 0; i < 12; i++) {
      G1(0, 4, 8, 12, msg, offset + 2 * s[j++]);
      G2(0, 4, 8, 12, msg, offset + 2 * s[j++]);
      G1(1, 5, 9, 13, msg, offset + 2 * s[j++]);
      G2(1, 5, 9, 13, msg, offset + 2 * s[j++]);
      G1(2, 6, 10, 14, msg, offset + 2 * s[j++]);
      G2(2, 6, 10, 14, msg, offset + 2 * s[j++]);
      G1(3, 7, 11, 15, msg, offset + 2 * s[j++]);
      G2(3, 7, 11, 15, msg, offset + 2 * s[j++]);
      G1(0, 5, 10, 15, msg, offset + 2 * s[j++]);
      G2(0, 5, 10, 15, msg, offset + 2 * s[j++]);
      G1(1, 6, 11, 12, msg, offset + 2 * s[j++]);
      G2(1, 6, 11, 12, msg, offset + 2 * s[j++]);
      G1(2, 7, 8, 13, msg, offset + 2 * s[j++]);
      G2(2, 7, 8, 13, msg, offset + 2 * s[j++]);
      G1(3, 4, 9, 14, msg, offset + 2 * s[j++]);
      G2(3, 4, 9, 14, msg, offset + 2 * s[j++]);
    }
    this.v0l ^= BUF[0] ^ BUF[16];
    this.v0h ^= BUF[1] ^ BUF[17];
    this.v1l ^= BUF[2] ^ BUF[18];
    this.v1h ^= BUF[3] ^ BUF[19];
    this.v2l ^= BUF[4] ^ BUF[20];
    this.v2h ^= BUF[5] ^ BUF[21];
    this.v3l ^= BUF[6] ^ BUF[22];
    this.v3h ^= BUF[7] ^ BUF[23];
    this.v4l ^= BUF[8] ^ BUF[24];
    this.v4h ^= BUF[9] ^ BUF[25];
    this.v5l ^= BUF[10] ^ BUF[26];
    this.v5h ^= BUF[11] ^ BUF[27];
    this.v6l ^= BUF[12] ^ BUF[28];
    this.v6h ^= BUF[13] ^ BUF[29];
    this.v7l ^= BUF[14] ^ BUF[30];
    this.v7h ^= BUF[15] ^ BUF[31];
    BUF.fill(0);
  }
  destroy() {
    this.destroyed = true;
    this.buffer32.fill(0);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const blake2b = wrapConstructorWithOpts((opts) => new BLAKE2b(opts));
function blake2AsU8a(data, bitLength = 256, key, onlyJs) {
  const byteLength = Math.ceil(bitLength / 8);
  const u8a = u8aToU8a(data);
  return !hasBigInt || !onlyJs && isReady() ? blake2b$1(u8a, u8aToU8a(key), byteLength) : blake2b(u8a, {
    dkLen: byteLength,
    key: key || void 0
  });
}
const SS58_PREFIX = stringToU8a("SS58PRE");
function sshash(key) {
  return blake2AsU8a(u8aConcat(SS58_PREFIX, key), 512);
}
function checkAddressChecksum(decoded) {
  const ss58Length = decoded[0] & 64 ? 2 : 1;
  const ss58Decoded = ss58Length === 1 ? decoded[0] : (decoded[0] & 63) << 2 | decoded[1] >> 6 | (decoded[1] & 63) << 8;
  const isPublicKey = [34 + ss58Length, 35 + ss58Length].includes(decoded.length);
  const length = decoded.length - (isPublicKey ? 2 : 1);
  const hash = sshash(decoded.subarray(0, length));
  const isValid = (decoded[0] & 128) === 0 && ![46, 47].includes(decoded[0]) && (isPublicKey ? decoded[decoded.length - 2] === hash[0] && decoded[decoded.length - 1] === hash[1] : decoded[decoded.length - 1] === hash[0]);
  return [isValid, length, ss58Length, ss58Decoded];
}
var knownSubstrate = [
  {
    "prefix": 0,
    "network": "polkadot",
    "displayName": "Polkadot Relay Chain",
    "symbols": [
      "DOT"
    ],
    "decimals": [
      10
    ],
    "standardAccount": "*25519",
    "website": "https://polkadot.network"
  },
  {
    "prefix": 1,
    "network": "BareSr25519",
    "displayName": "Bare 32-bit Schnorr/Ristretto (S/R 25519) public key.",
    "symbols": [],
    "decimals": [],
    "standardAccount": "Sr25519",
    "website": null
  },
  {
    "prefix": 2,
    "network": "kusama",
    "displayName": "Kusama Relay Chain",
    "symbols": [
      "KSM"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://kusama.network"
  },
  {
    "prefix": 3,
    "network": "BareEd25519",
    "displayName": "Bare 32-bit Ed25519 public key.",
    "symbols": [],
    "decimals": [],
    "standardAccount": "Ed25519",
    "website": null
  },
  {
    "prefix": 4,
    "network": "katalchain",
    "displayName": "Katal Chain",
    "symbols": [],
    "decimals": [],
    "standardAccount": "*25519",
    "website": null
  },
  {
    "prefix": 5,
    "network": "astar",
    "displayName": "Astar Network",
    "symbols": [
      "ASTR"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://astar.network"
  },
  {
    "prefix": 6,
    "network": "bifrost",
    "displayName": "Bifrost",
    "symbols": [
      "BNC"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://bifrost.finance/"
  },
  {
    "prefix": 7,
    "network": "edgeware",
    "displayName": "Edgeware",
    "symbols": [
      "EDG"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://edgewa.re"
  },
  {
    "prefix": 8,
    "network": "karura",
    "displayName": "Karura",
    "symbols": [
      "KAR"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://karura.network/"
  },
  {
    "prefix": 9,
    "network": "reynolds",
    "displayName": "Laminar Reynolds Canary",
    "symbols": [
      "REY"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "http://laminar.network/"
  },
  {
    "prefix": 10,
    "network": "acala",
    "displayName": "Acala",
    "symbols": [
      "ACA"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://acala.network/"
  },
  {
    "prefix": 11,
    "network": "laminar",
    "displayName": "Laminar",
    "symbols": [
      "LAMI"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "http://laminar.network/"
  },
  {
    "prefix": 12,
    "network": "polymesh",
    "displayName": "Polymesh",
    "symbols": [
      "POLYX"
    ],
    "decimals": [
      6
    ],
    "standardAccount": "*25519",
    "website": "https://polymath.network/"
  },
  {
    "prefix": 13,
    "network": "integritee",
    "displayName": "Integritee",
    "symbols": [
      "TEER"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://integritee.network"
  },
  {
    "prefix": 14,
    "network": "totem",
    "displayName": "Totem",
    "symbols": [
      "TOTEM"
    ],
    "decimals": [
      0
    ],
    "standardAccount": "*25519",
    "website": "https://totemaccounting.com"
  },
  {
    "prefix": 15,
    "network": "synesthesia",
    "displayName": "Synesthesia",
    "symbols": [
      "SYN"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://synesthesia.network/"
  },
  {
    "prefix": 16,
    "network": "kulupu",
    "displayName": "Kulupu",
    "symbols": [
      "KLP"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://kulupu.network/"
  },
  {
    "prefix": 17,
    "network": "dark",
    "displayName": "Dark Mainnet",
    "symbols": [],
    "decimals": [],
    "standardAccount": "*25519",
    "website": null
  },
  {
    "prefix": 18,
    "network": "darwinia",
    "displayName": "Darwinia Network",
    "symbols": [
      "RING",
      "KTON"
    ],
    "decimals": [
      9,
      9
    ],
    "standardAccount": "*25519",
    "website": "https://darwinia.network/"
  },
  {
    "prefix": 20,
    "network": "stafi",
    "displayName": "Stafi",
    "symbols": [
      "FIS"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://stafi.io"
  },
  {
    "prefix": 22,
    "network": "dock-pos-mainnet",
    "displayName": "Dock Mainnet",
    "symbols": [
      "DCK"
    ],
    "decimals": [
      6
    ],
    "standardAccount": "*25519",
    "website": "https://dock.io"
  },
  {
    "prefix": 23,
    "network": "shift",
    "displayName": "ShiftNrg",
    "symbols": [],
    "decimals": [],
    "standardAccount": "*25519",
    "website": null
  },
  {
    "prefix": 24,
    "network": "zero",
    "displayName": "ZERO",
    "symbols": [
      "ZERO"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://zero.io"
  },
  {
    "prefix": 25,
    "network": "zero-alphaville",
    "displayName": "ZERO Alphaville",
    "symbols": [
      "ZERO"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://zero.io"
  },
  {
    "prefix": 26,
    "network": "jupiter",
    "displayName": "Jupiter",
    "symbols": [
      "jDOT"
    ],
    "decimals": [
      10
    ],
    "standardAccount": "*25519",
    "website": "https://jupiter.patract.io"
  },
  {
    "prefix": 27,
    "network": "kabocha",
    "displayName": "Kabocha",
    "symbols": [
      "KAB"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://kabocha.network"
  },
  {
    "prefix": 28,
    "network": "subsocial",
    "displayName": "Subsocial",
    "symbols": [],
    "decimals": [],
    "standardAccount": "*25519",
    "website": null
  },
  {
    "prefix": 29,
    "network": "cord",
    "displayName": "CORD Network",
    "symbols": [
      "DHI",
      "WAY"
    ],
    "decimals": [
      12,
      12
    ],
    "standardAccount": "*25519",
    "website": "https://cord.network/"
  },
  {
    "prefix": 30,
    "network": "phala",
    "displayName": "Phala Network",
    "symbols": [
      "PHA"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://phala.network"
  },
  {
    "prefix": 31,
    "network": "litentry",
    "displayName": "Litentry Network",
    "symbols": [
      "LIT"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://litentry.com/"
  },
  {
    "prefix": 32,
    "network": "robonomics",
    "displayName": "Robonomics",
    "symbols": [
      "XRT"
    ],
    "decimals": [
      9
    ],
    "standardAccount": "*25519",
    "website": "https://robonomics.network"
  },
  {
    "prefix": 33,
    "network": "datahighway",
    "displayName": "DataHighway",
    "symbols": [],
    "decimals": [],
    "standardAccount": "*25519",
    "website": null
  },
  {
    "prefix": 34,
    "network": "ares",
    "displayName": "Ares Protocol",
    "symbols": [
      "ARES"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://www.aresprotocol.com/"
  },
  {
    "prefix": 35,
    "network": "vln",
    "displayName": "Valiu Liquidity Network",
    "symbols": [
      "USDv"
    ],
    "decimals": [
      15
    ],
    "standardAccount": "*25519",
    "website": "https://valiu.com/"
  },
  {
    "prefix": 36,
    "network": "centrifuge",
    "displayName": "Centrifuge Chain",
    "symbols": [
      "CFG"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://centrifuge.io/"
  },
  {
    "prefix": 37,
    "network": "nodle",
    "displayName": "Nodle Chain",
    "symbols": [
      "NODL"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://nodle.io/"
  },
  {
    "prefix": 38,
    "network": "kilt",
    "displayName": "KILT Spiritnet",
    "symbols": [
      "KILT"
    ],
    "decimals": [
      15
    ],
    "standardAccount": "*25519",
    "website": "https://kilt.io/"
  },
  {
    "prefix": 39,
    "network": "mathchain",
    "displayName": "MathChain mainnet",
    "symbols": [
      "MATH"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://mathwallet.org"
  },
  {
    "prefix": 40,
    "network": "mathchain-testnet",
    "displayName": "MathChain testnet",
    "symbols": [
      "MATH"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://mathwallet.org"
  },
  {
    "prefix": 41,
    "network": "poli",
    "displayName": "Polimec Chain",
    "symbols": [],
    "decimals": [],
    "standardAccount": "*25519",
    "website": "https://polimec.io/"
  },
  {
    "prefix": 42,
    "network": "substrate",
    "displayName": "Substrate",
    "symbols": [],
    "decimals": [],
    "standardAccount": "*25519",
    "website": "https://substrate.io/"
  },
  {
    "prefix": 43,
    "network": "BareSecp256k1",
    "displayName": "Bare 32-bit ECDSA SECP-256k1 public key.",
    "symbols": [],
    "decimals": [],
    "standardAccount": "secp256k1",
    "website": null
  },
  {
    "prefix": 44,
    "network": "chainx",
    "displayName": "ChainX",
    "symbols": [
      "PCX"
    ],
    "decimals": [
      8
    ],
    "standardAccount": "*25519",
    "website": "https://chainx.org/"
  },
  {
    "prefix": 45,
    "network": "uniarts",
    "displayName": "UniArts Network",
    "symbols": [
      "UART",
      "UINK"
    ],
    "decimals": [
      12,
      12
    ],
    "standardAccount": "*25519",
    "website": "https://uniarts.me"
  },
  {
    "prefix": 46,
    "network": "reserved46",
    "displayName": "This prefix is reserved.",
    "symbols": [],
    "decimals": [],
    "standardAccount": null,
    "website": null
  },
  {
    "prefix": 47,
    "network": "reserved47",
    "displayName": "This prefix is reserved.",
    "symbols": [],
    "decimals": [],
    "standardAccount": null,
    "website": null
  },
  {
    "prefix": 48,
    "network": "neatcoin",
    "displayName": "Neatcoin Mainnet",
    "symbols": [
      "NEAT"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://neatcoin.org"
  },
  {
    "prefix": 49,
    "network": "picasso",
    "displayName": "Picasso",
    "symbols": [
      "PICA"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://picasso.composable.finance"
  },
  {
    "prefix": 50,
    "network": "composable",
    "displayName": "Composable",
    "symbols": [
      "LAYR"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://composable.finance"
  },
  {
    "prefix": 51,
    "network": "oak",
    "displayName": "OAK Network",
    "symbols": [
      "OAK"
    ],
    "decimals": [
      10
    ],
    "standardAccount": "*25519",
    "website": "https://oak.tech"
  },
  {
    "prefix": 52,
    "network": "KICO",
    "displayName": "KICO",
    "symbols": [
      "KICO"
    ],
    "decimals": [
      14
    ],
    "standardAccount": "*25519",
    "website": "https://dico.io"
  },
  {
    "prefix": 53,
    "network": "DICO",
    "displayName": "DICO",
    "symbols": [
      "DICO"
    ],
    "decimals": [
      14
    ],
    "standardAccount": "*25519",
    "website": "https://dico.io"
  },
  {
    "prefix": 54,
    "network": "cere",
    "displayName": "Cere Network",
    "symbols": [
      "CERE"
    ],
    "decimals": [
      10
    ],
    "standardAccount": "*25519",
    "website": "https://cere.network"
  },
  {
    "prefix": 55,
    "network": "xxnetwork",
    "displayName": "xx network",
    "symbols": [
      "XX"
    ],
    "decimals": [
      9
    ],
    "standardAccount": "*25519",
    "website": "https://xx.network"
  },
  {
    "prefix": 63,
    "network": "hydradx",
    "displayName": "HydraDX",
    "symbols": [
      "HDX"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://hydradx.io"
  },
  {
    "prefix": 65,
    "network": "aventus",
    "displayName": "AvN Mainnet",
    "symbols": [
      "AVT"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://aventus.io"
  },
  {
    "prefix": 66,
    "network": "crust",
    "displayName": "Crust Network",
    "symbols": [
      "CRU"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://crust.network"
  },
  {
    "prefix": 67,
    "network": "genshiro",
    "displayName": "Genshiro Network",
    "symbols": [
      "GENS",
      "EQD",
      "LPT0"
    ],
    "decimals": [
      9,
      9,
      9
    ],
    "standardAccount": "*25519",
    "website": "https://genshiro.equilibrium.io"
  },
  {
    "prefix": 68,
    "network": "equilibrium",
    "displayName": "Equilibrium Network",
    "symbols": [
      "EQ"
    ],
    "decimals": [
      9
    ],
    "standardAccount": "*25519",
    "website": "https://equilibrium.io"
  },
  {
    "prefix": 69,
    "network": "sora",
    "displayName": "SORA Network",
    "symbols": [
      "XOR"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://sora.org"
  },
  {
    "prefix": 73,
    "network": "zeitgeist",
    "displayName": "Zeitgeist",
    "symbols": [
      "ZTG"
    ],
    "decimals": [
      10
    ],
    "standardAccount": "*25519",
    "website": "https://zeitgeist.pm"
  },
  {
    "prefix": 77,
    "network": "manta",
    "displayName": "Manta network",
    "symbols": [
      "MANTA"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://manta.network"
  },
  {
    "prefix": 78,
    "network": "calamari",
    "displayName": "Calamari: Manta Canary Network",
    "symbols": [
      "KMA"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://manta.network"
  },
  {
    "prefix": 88,
    "network": "polkadex",
    "displayName": "Polkadex Mainnet",
    "symbols": [
      "PDEX"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://polkadex.trade"
  },
  {
    "prefix": 89,
    "network": "polkadexparachain",
    "displayName": "Polkadex Parachain",
    "symbols": [
      "PDEX"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://polkadex.trade"
  },
  {
    "prefix": 93,
    "network": "fragnova",
    "displayName": "Fragnova Network",
    "symbols": [
      "NOVA"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://fragnova.com"
  },
  {
    "prefix": 98,
    "network": "polkasmith",
    "displayName": "PolkaSmith Canary Network",
    "symbols": [
      "PKS"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://polkafoundry.com"
  },
  {
    "prefix": 99,
    "network": "polkafoundry",
    "displayName": "PolkaFoundry Network",
    "symbols": [
      "PKF"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://polkafoundry.com"
  },
  {
    "prefix": 101,
    "network": "origintrail-parachain",
    "displayName": "OriginTrail Parachain",
    "symbols": [
      "OTP"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://parachain.origintrail.io/"
  },
  {
    "prefix": 105,
    "network": "pontem-network",
    "displayName": "Pontem Network",
    "symbols": [
      "PONT"
    ],
    "decimals": [
      10
    ],
    "standardAccount": "*25519",
    "website": "https://pontem.network"
  },
  {
    "prefix": 110,
    "network": "heiko",
    "displayName": "Heiko",
    "symbols": [
      "HKO"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://parallel.fi/"
  },
  {
    "prefix": 113,
    "network": "integritee-incognito",
    "displayName": "Integritee Incognito",
    "symbols": [],
    "decimals": [],
    "standardAccount": "*25519",
    "website": "https://integritee.network"
  },
  {
    "prefix": 117,
    "network": "tinker",
    "displayName": "Tinker",
    "symbols": [
      "TNKR"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://invarch.network"
  },
  {
    "prefix": 128,
    "network": "clover",
    "displayName": "Clover Finance",
    "symbols": [
      "CLV"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://clover.finance"
  },
  {
    "prefix": 131,
    "network": "litmus",
    "displayName": "Litmus Network",
    "symbols": [
      "LIT"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://litentry.com/"
  },
  {
    "prefix": 136,
    "network": "altair",
    "displayName": "Altair",
    "symbols": [
      "AIR"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://centrifuge.io/"
  },
  {
    "prefix": 172,
    "network": "parallel",
    "displayName": "Parallel",
    "symbols": [
      "PARA"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://parallel.fi/"
  },
  {
    "prefix": 252,
    "network": "social-network",
    "displayName": "Social Network",
    "symbols": [
      "NET"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://social.network"
  },
  {
    "prefix": 255,
    "network": "quartz_mainnet",
    "displayName": "QUARTZ by UNIQUE",
    "symbols": [
      "QTZ"
    ],
    "decimals": [
      15
    ],
    "standardAccount": "*25519",
    "website": "https://unique.network"
  },
  {
    "prefix": 268,
    "network": "pioneer_network",
    "displayName": "Pioneer Network by Bit.Country",
    "symbols": [
      "NEER"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://bit.country"
  },
  {
    "prefix": 420,
    "network": "sora_kusama_para",
    "displayName": "SORA Kusama Parachain",
    "symbols": [
      "XOR"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://sora.org"
  },
  {
    "prefix": 789,
    "network": "geek",
    "displayName": "GEEK Network",
    "symbols": [
      "GEEK"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://geek.gl"
  },
  {
    "prefix": 1110,
    "network": "efinity",
    "displayName": "Efinity",
    "symbols": [
      "EFI"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "Sr25519",
    "website": "https://efinity.io/"
  },
  {
    "prefix": 1284,
    "network": "moonbeam",
    "displayName": "Moonbeam",
    "symbols": [
      "GLMR"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "secp256k1",
    "website": "https://moonbeam.network"
  },
  {
    "prefix": 1285,
    "network": "moonriver",
    "displayName": "Moonriver",
    "symbols": [
      "MOVR"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "secp256k1",
    "website": "https://moonbeam.network"
  },
  {
    "prefix": 1328,
    "network": "ajuna",
    "displayName": "Ajuna Network",
    "symbols": [
      "AJUN"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://ajuna.io"
  },
  {
    "prefix": 1337,
    "network": "bajun",
    "displayName": "Bajun Network",
    "symbols": [
      "BAJU"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://ajuna.io"
  },
  {
    "prefix": 2007,
    "network": "kapex",
    "displayName": "Kapex",
    "symbols": [
      "KAPEX"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://totemaccounting.com"
  },
  {
    "prefix": 2032,
    "network": "interlay",
    "displayName": "Interlay",
    "symbols": [
      "INTR"
    ],
    "decimals": [
      10
    ],
    "standardAccount": "*25519",
    "website": "https://interlay.io/"
  },
  {
    "prefix": 2092,
    "network": "kintsugi",
    "displayName": "Kintsugi",
    "symbols": [
      "KINT"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://interlay.io/"
  },
  {
    "prefix": 2254,
    "network": "subspace_testnet",
    "displayName": "Subspace testnet",
    "symbols": [
      "tSSC"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://subspace.network"
  },
  {
    "prefix": 6094,
    "network": "subspace",
    "displayName": "Subspace",
    "symbols": [
      "SSC"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://subspace.network"
  },
  {
    "prefix": 7007,
    "network": "tidefi",
    "displayName": "Tidefi",
    "symbols": [
      "TIFI"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://tidefi.com"
  },
  {
    "prefix": 7391,
    "network": "unique_mainnet",
    "displayName": "Unique Network",
    "symbols": [
      "UNQ"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://unique.network"
  },
  {
    "prefix": 9807,
    "network": "dentnet",
    "displayName": "DENTNet",
    "symbols": [
      "DENTX"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://www.dentnet.io"
  },
  {
    "prefix": 10041,
    "network": "basilisk",
    "displayName": "Basilisk",
    "symbols": [
      "BSX"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://bsx.fi"
  },
  {
    "prefix": 11330,
    "network": "cess-testnet",
    "displayName": "CESS Testnet",
    "symbols": [
      "TCESS"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://cess.cloud"
  },
  {
    "prefix": 11331,
    "network": "cess",
    "displayName": "CESS",
    "symbols": [
      "CESS"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://cess.cloud"
  },
  {
    "prefix": 11820,
    "network": "contextfree",
    "displayName": "Automata ContextFree",
    "symbols": [
      "CTX"
    ],
    "decimals": [
      18
    ],
    "standardAccount": "*25519",
    "website": "https://ata.network"
  },
  {
    "prefix": 12191,
    "network": "nftmart",
    "displayName": "NFTMart",
    "symbols": [
      "NMT"
    ],
    "decimals": [
      12
    ],
    "standardAccount": "*25519",
    "website": "https://nftmart.io"
  }
];
const knownGenesis = {
  acala: ["0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c"],
  astar: ["0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6"],
  basilisk: ["0xa85cfb9b9fd4d622a5b28289a02347af987d8f73fa3108450e2b4a11c1ce5755"],
  bifrost: ["0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed"],
  centrifuge: ["0x67dddf2673b69e5f875f6f25277495834398eafd67f492e09f3f3345e003d1b5"],
  "dock-mainnet": ["0x6bfe24dca2a3be10f22212678ac13a6446ec764103c0f3471c71609eac384aae", "0xf73467c6544aa68df2ee546b135f955c46b90fa627e9b5d7935f41061bb8a5a9"],
  edgeware: ["0x742a2ca70c2fda6cee4f8df98d64c4c670a052d9568058982dad9d5a7a135c5b"],
  equilibrium: ["0x6f1a800de3daff7f5e037ddf66ab22ce03ab91874debeddb1086f5f7dbd48925"],
  genshiro: ["0x9b8cefc0eb5c568b527998bdd76c184e2b76ae561be76e4667072230217ea243"],
  hydradx: [
    "0xd2a620c27ec5cbc5621ff9a522689895074f7cca0d08e7134a7804e1a3ba86fc",
    "0x10af6e84234477d84dc572bac0789813b254aa490767ed06fb9591191d1073f9",
    "0x3d75507dd46301767e601265791da1d9cb47b6ebc94e87347b635e5bf58bd047",
    "0x0ed32bfcab4a83517fac88f2aa7cbc2f88d3ab93be9a12b6188a036bf8a943c2"
  ],
  karura: ["0xbaf5aabe40646d11f0ee8abbdc64f4a4b7674925cba08e4a05ff9ebed6e2126b"],
  kulupu: ["0xf7a99d3cb92853d00d5275c971c132c074636256583fee53b3bbe60d7b8769ba"],
  kusama: [
    "0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe",
    "0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636",
    "0x3fd7b9eb6a00376e5be61f01abb429ffb0b104be05eaff4d458da48fcd425baf"
  ],
  "nodle-para": ["0x97da7ede98d7bad4e36b4d734b6055425a3be036da2a332ea5a7037656427a21"],
  parallel: ["0xe61a41c53f5dcd0beb09df93b34402aada44cb05117b71059cce40a2723a4e97"],
  picasso: ["0xe8e7f0f4c4f5a00720b4821dbfddefea7490bcf0b19009961cc46957984e2c1c"],
  polkadex: ["0x3920bcb4960a1eef5580cd5367ff3f430eef052774f78468852f7b9cb39f8a3c"],
  polkadot: ["0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"],
  polymesh: ["0x6fbd74e5e1d0a61d52ccfe9d4adaed16dd3a7caa37c6bc4d0c2fa12e8b2f4063"],
  rococo: ["0x6408de7737c59c238890533af25896a2c20608d8b380bb01029acb392781063e", "0xaaf2cd1b74b5f726895921259421b534124726263982522174147046b8827897", "0x037f5f3c8e67b314062025fc886fcd6238ea25a4a9b45dce8d246815c9ebe770", "0xc196f81260cf1686172b47a79cf002120735d7cb0eb1474e8adce56618456fff", "0xf6e9983c37baf68846fedafe21e56718790e39fb1c582abc408b81bc7b208f9a", "0x5fce687da39305dfe682b117f0820b319348e8bb37eb16cf34acbf6a202de9d9", "0xe7c3d5edde7db964317cd9b51a3a059d7cd99f81bdbce14990047354334c9779", "0x1611e1dbf0405379b861e2e27daa90f480b2e6d3682414a80835a52e8cb8a215", "0x343442f12fa715489a8714e79a7b264ea88c0d5b8c66b684a7788a516032f6b9", "0x78bcd530c6b3a068bc17473cf5d2aff9c287102bed9af3ae3c41c33b9d6c6147", "0x47381ee0697153d64404fc578392c8fd5cba9073391908f46c888498415647bd", "0x19c0e4fa8ab75f5ac7865e0b8f74ff91eb9a100d336f423cd013a8befba40299"],
  sora: ["0x7e4e32d0feafd4f9c9414b0be86373f9a1efa904809b683453a9af6856d38ad5"],
  stafi: ["0x290a4149f09ea0e402c74c1c7e96ae4239588577fe78932f94f5404c68243d80"],
  statemine: ["0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a"],
  statemint: ["0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f"],
  subsocial: ["0x0bd72c1c305172e1275278aaeb3f161e02eccb7a819e63f62d47bd53a28189f8"],
  westend: ["0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e"],
  xxnetwork: ["0x50dd5d206917bf10502c68fb4d18a59fc8aa31586f4e8856b493e43544aa82aa"]
};
const knownIcon = {
  centrifuge: "polkadot",
  kusama: "polkadot",
  polkadot: "polkadot",
  sora: "polkadot",
  statemine: "polkadot",
  statemint: "polkadot",
  westmint: "polkadot"
};
const knownLedger = {
  acala: 787,
  astar: 810,
  bifrost: 788,
  centrifuge: 747,
  "dock-mainnet": 594,
  edgeware: 523,
  equilibrium: 99999997,
  genshiro: 99999996,
  karura: 686,
  kusama: 434,
  "nodle-para": 1003,
  parallel: 354,
  polkadex: 799,
  polkadot: 354,
  polymesh: 595,
  sora: 617,
  statemine: 434,
  statemint: 354,
  xxnetwork: 1955
};
const knownTestnet = {
  "": true,
  "cess-testnet": true,
  "dock-testnet": true,
  jupiter: true,
  "mathchain-testnet": true,
  subspace_testnet: true,
  "zero-alphaville": true
};
const UNSORTED = [0, 2, 42];
const TESTNETS = ["testnet"];
function toExpanded(o) {
  const network = o.network || "";
  const nameParts = network.replace(/_/g, "-").split("-");
  const n = o;
  n.slip44 = knownLedger[network];
  n.hasLedgerSupport = !!n.slip44;
  n.genesisHash = knownGenesis[network] || [];
  n.icon = knownIcon[network] || "substrate";
  n.isTestnet = !!knownTestnet[network] || TESTNETS.includes(nameParts[nameParts.length - 1]);
  n.isIgnored = n.isTestnet || !(o.standardAccount && o.decimals && o.decimals.length && o.symbols && o.symbols.length) && o.prefix !== 42;
  return n;
}
function filterSelectable({
  genesisHash,
  prefix
}) {
  return !!genesisHash.length || prefix === 42;
}
function filterAvailable(n) {
  return !n.isIgnored && !!n.network;
}
function sortNetworks(a, b) {
  const isUnSortedA = UNSORTED.includes(a.prefix);
  const isUnSortedB = UNSORTED.includes(b.prefix);
  return isUnSortedA === isUnSortedB ? isUnSortedA ? 0 : a.displayName.localeCompare(b.displayName) : isUnSortedA ? -1 : 1;
}
const allNetworks = knownSubstrate.map(toExpanded);
const availableNetworks = allNetworks.filter(filterAvailable).sort(sortNetworks);
availableNetworks.filter(filterSelectable);
const defaults = {
  allowedDecodedLengths: [1, 2, 4, 8, 32, 33],
  allowedEncodedLengths: [3, 4, 6, 10, 35, 36, 37, 38],
  allowedPrefix: availableNetworks.map(({
    prefix
  }) => prefix),
  prefix: 42
};
function decodeAddress(encoded, ignoreChecksum, ss58Format = -1) {
  assert(encoded, "Invalid empty address passed");
  if (isU8a(encoded) || isHex(encoded)) {
    return u8aToU8a(encoded);
  }
  try {
    const decoded = base58Decode(encoded);
    assert(defaults.allowedEncodedLengths.includes(decoded.length), "Invalid decoded address length");
    const [isValid, endPos, ss58Length, ss58Decoded] = checkAddressChecksum(decoded);
    assert(ignoreChecksum || isValid, "Invalid decoded address checksum");
    assert([-1, ss58Decoded].includes(ss58Format), () => `Expected ss58Format ${ss58Format}, received ${ss58Decoded}`);
    return decoded.slice(ss58Length, endPos);
  } catch (error) {
    throw new Error(`Decoding ${encoded}: ${error.message}`);
  }
}
function encodeAddress(key, ss58Format = defaults.prefix) {
  const u8a = decodeAddress(key);
  assert(ss58Format >= 0 && ss58Format <= 16383 && ![46, 47].includes(ss58Format), "Out of range ss58Format specified");
  assert(defaults.allowedDecodedLengths.includes(u8a.length), () => `Expected a valid key to convert, with length ${defaults.allowedDecodedLengths.join(", ")}`);
  const input = u8aConcat(ss58Format < 64 ? [ss58Format] : [(ss58Format & 252) >> 2 | 64, ss58Format >> 8 | (ss58Format & 3) << 6], u8a);
  return base58Encode(u8aConcat(input, sshash(input).subarray(0, [32, 33].includes(u8a.length) ? 2 : 1)));
}
const store = {
  state: {
    polkadot: {
      address: typeof localStorage.robonomicsUIPolkadotAddress !== "undefined" ? localStorage.robonomicsUIPolkadotAddress : null,
      extension: typeof localStorage.robonomicsUIPolkadotExtension !== "undefined" ? localStorage.robonomicsUIPolkadotExtension : null,
      chain: typeof localStorage.robonomicsUIPolkadotChain !== "undefined" ? localStorage.robonomicsUIPolkadotChain : "32"
    }
  },
  getters: {
    polkadot: (state) => state.polkadot
  },
  mutations: {
    setPolkadotAddress(state, value) {
      state.polkadot.address = encodeAddress(value, state.polkadot.chain);
      localStorage.setItem("robonomicsUIPolkadotAddress", state.polkadot.address);
    },
    setPolkadotExtension(state, value) {
      state.polkadot.extension = value;
      localStorage.setItem("robonomicsUIPolkadotExtension", state.polkadot.extension);
    },
    setPolkadotChain(state, value) {
      state.polkadot.chain = value;
      localStorage.setItem("robonomicsUIPolkadotChain", state.polkadot.chain);
    }
  },
  actions: {
    async getPolkadotAccounts({ state }) {
      let accounts = "";
      let getExtension = window.injectedWeb3[state.polkadot.extension];
      await getExtension.enable("Robonomics dApp").then(async (value) => {
        const accs = await value.accounts.get();
        accounts = accs.map((item) => Object.keys(item).reduce((acc, key) => {
          if (key === "address") {
            acc[key] = encodeAddress(item[key], state.polkadot.chain);
          }
          return acc;
        }, {}));
      }).catch((reason) => {
        console.log("[robonomics-ui-vue]:", reason);
      });
      return accounts;
    }
  }
};
var AccountPolkadot_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-account--inline[data-v-82975e30]{display:inline-flex!important}\n")();
var AccountPolkadot_vue_vue_type_style_index_1_lang = /* @__PURE__ */ (() => ".robo-details--popup[open] .robo-details-content{font-size:calc(var(--font-size)*.8)!important}\n")();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$y = defineComponent({
  name: "RoboAccountPolkadot",
  props: {
    allowShiftExtensions: {
      type: Boolean,
      default: false
    },
    copy: {
      type: Boolean,
      default: true
    },
    inline: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    short: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      address: this.$store.getters.polkadot.address ? this.$store.getters.polkadot.address : null,
      extension: this.$store.getters.polkadot.extension ? this.$store.getters.polkadot.extension : null,
      accounts: null,
      clipboardCopied: false,
      accountsList: this.setAccountsList(this.accounts) || null,
      addressList: this.setAddressList(this.accounts) || null
    };
  },
  watch: {
    "$store.state.robonomicsUIvue.polkadot.address": function(value) {
      this.address = value;
    },
    "$store.getters.polkadot.extension": function(value) {
      this.extension = value;
    },
    "$store.getters.polkadot.chain": async function() {
      this.$store.commit("setPolkadotAddress", this.address);
      this.accounts = await this.$store.dispatch("getPolkadotAccounts");
    },
    "address": function(value) {
      this.$store.commit("setPolkadotAddress", value);
    },
    "accounts": function(value) {
      this.accountsList = this.setAccountsList(value);
      this.addressList = this.setAddressList(value);
      if (value.filter((account2) => account2.address === this.address).length == 0) {
        if (value.length > 0) {
          this.$store.commit("setPolkadotAddress", account[0].address);
        } else {
          this.$store.commit("setPolkadotAddress", null);
        }
      }
    },
    "extension": async function() {
      this.accounts = await this.$store.dispatch("getPolkadotAccounts");
    }
  },
  computed: {
    classes() {
      return {
        [`robo-account`]: true,
        [`robo-account--inline`]: this.inline
      };
    }
  },
  methods: {
    shortAddress(address) {
      const addressArray = address.split("");
      const result = addressArray.slice(0, 6) + "..." + addressArray.slice(-4);
      return result.replace(/,/g, "");
    },
    clipboard() {
      navigator.clipboard.writeText(this.address);
      this.clipboardCopied = true;
      const o = this;
      setTimeout(function() {
        o.clipboardCopied = false;
      }, 1500);
    },
    onLoad(interval) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (window.injectedWeb3) {
            resolve();
          }
        }, interval);
        setTimeout(() => reject(new Error("no extension")), 1e3);
      });
    },
    setAccountsList(accounts) {
      let result = [];
      if (accounts) {
        if (this.short) {
          Object.keys(accounts).map((key) => {
            result.push(this.shortAddress(accounts[key].address));
          });
        } else {
          Object.keys(accounts).map((key) => {
            result.push(accounts[key].address);
          });
        }
      }
      return result;
    },
    setAddressList(accounts) {
      let result = [];
      if (accounts) {
        Object.keys(accounts).map((key) => {
          result.push(accounts[key].address);
        });
      }
      return result;
    }
  },
  async mounted() {
    await this.onLoad(500);
    if (this.extension) {
      this.accounts = await this.$store.dispatch("getPolkadotAccounts");
    }
    if (this.address && this.accounts) {
      if (this.accounts.filter((account2) => account2.address === this.address).length == 0) {
        this.$store.commit("setPolkadotAddress", account[0].address);
      }
    }
    if (this.address && !this.accounts) {
      this.$store.commit("setPolkadotAddress", null);
    }
    if (!this.address && this.extension && this.accounts.length > 0) {
      this.$store.commit("setPolkadotAddress", this.accounts[0].address);
    }
    if (this.accounts) {
      this.accountsList = this.setAccountsList(this.accounts);
      this.addressList = this.setAddressList(this.accounts);
    }
  }
});
const _hoisted_1$i = ["innerHTML"];
const _hoisted_2$d = { key: 1 };
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_select = resolveComponent("robo-select");
  const _component_robo_account_polkadot_connect = resolveComponent("robo-account-polkadot-connect");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_robo_button = resolveComponent("robo-button");
  const _component_robo_grid = resolveComponent("robo-grid");
  return openBlock(), createBlock(_component_robo_grid, {
    flex: "",
    offset: "x0",
    gap: "x05",
    class: normalizeClass(_ctx.classes)
  }, {
    default: withCtx(() => [
      _ctx.address && !_ctx.selectable ? (openBlock(), createElementBlock("span", {
        key: 0,
        innerHTML: _ctx.short ? _ctx.shortAddress(_ctx.address) : _ctx.address
      }, null, 8, _hoisted_1$i)) : createCommentVNode("", true),
      _ctx.address && _ctx.selectable ? (openBlock(), createBlock(_component_robo_select, {
        key: 1,
        values: _ctx.addressList,
        options: _ctx.accountsList,
        modelValue: _ctx.address,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.address = $event),
        clean: ""
      }, null, 8, ["values", "options", "modelValue"])) : createCommentVNode("", true),
      !_ctx.address ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
        !_ctx.extension ? (openBlock(), createBlock(_component_robo_account_polkadot_connect, {
          key: 0,
          summary: {},
          popup: {}
        })) : createCommentVNode("", true),
        _ctx.extension ? (openBlock(), createElementBlock("span", _hoisted_2$d, "Turn on account in your extension")) : createCommentVNode("", true)
      ], 64)) : createCommentVNode("", true),
      _ctx.allowShiftExtensions && _ctx.extension ? (openBlock(), createBlock(_component_robo_account_polkadot_connect, {
        key: 3,
        summary: {
          icon: "right-left",
          text: " "
        },
        popup: {}
      })) : createCommentVNode("", true),
      _ctx.copy && _ctx.address ? (openBlock(), createBlock(_component_robo_button, {
        key: 4,
        onClick: _ctx.clipboard,
        clean: ""
      }, {
        default: withCtx(() => [
          !_ctx.clipboardCopied ? (openBlock(), createBlock(_component_font_awesome_icon, {
            key: 0,
            icon: "copy",
            class: "icon"
          })) : createCommentVNode("", true),
          _ctx.clipboardCopied ? (openBlock(), createBlock(_component_font_awesome_icon, {
            key: 1,
            icon: "check",
            class: "icon"
          })) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["onClick"])) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["class"]);
}
var RoboAccountPolkadot = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y], ["__scopeId", "data-v-82975e30"]]);
const _sfc_main$x = defineComponent({
  name: "RoboAccountPolkadotChain",
  data() {
    return {
      chains: {
        Robonomics: "32",
        Kusama: "2",
        Polkadot: "0"
      },
      chainSelected: this.$store.getters.polkadot.chain ? this.$store.getters.polkadot.chain : "32"
    };
  },
  computed: {
    chainsNames() {
      return Object.keys(this.chains);
    },
    chainPrefixes() {
      return Object.values(this.chains);
    }
  },
  watch: {
    "chainSelected": function(value) {
      this.$store.commit("setPolkadotChain", value);
    }
  }
});
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_select = resolveComponent("robo-select");
  return openBlock(), createBlock(_component_robo_select, {
    options: _ctx.chainsNames,
    values: _ctx.chainPrefixes,
    modelValue: _ctx.chainSelected,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.chainSelected = $event),
    clean: ""
  }, null, 8, ["options", "values", "modelValue"]);
}
var AccountPolkadotChain = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x]]);
const _sfc_main$w = defineComponent({
  name: "RoboAccountPolkadotConnect",
  props: {
    popup: {
      type: Object,
      default: null,
      validator: function(value) {
        let valid = true;
        if (value.title && typeof value.title !== "string") {
          console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "popup.title", required String type');
          valid = false;
        } else if (!value.title) {
          value.title = "Connect Polkadot account";
        }
        return valid;
      }
    },
    summary: {
      type: Object,
      default: null,
      validator: function(value) {
        let valid = true;
        if (value.button) {
          if (value.button.outlined && typeof value.button.outlined !== "boolean") {
            console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.button.outlined", required Boolean type');
            valid = false;
          }
          if (value.button.size && !["small", "normal", "big"].includes(value.button.size)) {
            console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.button.size". Current value:', value.button.size);
            valid = false;
          }
          if (value.button.type && !["primary", "ok", "alarm", "na"].includes(value.button.type)) {
            console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.button.type". Current value:', value.button.type);
            valid = false;
          }
        }
        if (value.icon && typeof value.icon !== "string") {
          console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.icon", required String type');
          valid = false;
        } else if (!value.icon) {
          value.icon = "plus";
        }
        if (value.loading && typeof value.loading !== "boolean") {
          console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.loading", required Boolean type');
          valid = false;
        } else if (!value.loading) {
          value.loading = false;
        }
        if (value.text && typeof value.text !== "string") {
          console.warn('[robonomics-ui-vue3]: "AccountPolkadotConnect" component has wrong prop "summary.text", required String type');
          valid = false;
        } else if (!value.text) {
          value.text = "connect account";
        }
        return valid;
      }
    }
  }
});
const _hoisted_1$h = /* @__PURE__ */ createTextVNode("Choose one of the prefferable extension:");
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_text = resolveComponent("robo-text");
  const _component_robo_account_polkadot_extensions = resolveComponent("robo-account-polkadot-extensions");
  const _component_robo_details = resolveComponent("robo-details");
  return openBlock(), createBlock(_component_robo_text, { weight: "bold" }, {
    default: withCtx(() => [
      createVNode(_component_robo_details, {
        content: {
          closeOutOfFocus: true,
          offset: true
        },
        summary: {
          icon: _ctx.summary.icon,
          text: _ctx.summary.text
        },
        popup: {
          title: _ctx.popup.title
        }
      }, {
        default: withCtx(() => [
          createVNode(_component_robo_text, { weight: "normal" }, {
            default: withCtx(() => [
              _hoisted_1$h
            ]),
            _: 1
          }),
          createVNode(_component_robo_account_polkadot_extensions, { extension: "polkadot-js" }),
          createVNode(_component_robo_account_polkadot_extensions, { extension: "talisman" }),
          createVNode(_component_robo_account_polkadot_extensions, { extension: "subwallet-js" })
        ]),
        _: 1
      }, 8, ["summary", "popup"])
    ]),
    _: 1
  });
}
var RoboAccountPolkadotConnect = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w]]);
var __glob_1_0 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjE1IDE1IDE0MCAxNDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE3MCAxNzA7em9vbTogMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LmJnMHtmaWxsOiNGRjhDMDB9IC5zdDB7ZmlsbDojRkZGRkZGfTwvc3R5bGU+PGc+PGNpcmNsZSBjbGFzcz0iYmcwIiBjeD0iODUiIGN5PSI4NSIgcj0iNzAiPjwvY2lyY2xlPjxnPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04NSwzNC43Yy0yMC44LDAtMzcuOCwxNi45LTM3LjgsMzcuOGMwLDQuMiwwLjcsOC4zLDIsMTIuM2MwLjksMi43LDMuOSw0LjIsNi43LDMuM2MyLjctMC45LDQuMi0zLjksMy4zLTYuNyBjLTEuMS0zLjEtMS42LTYuNC0xLjUtOS43QzU4LjEsNTcuNiw2OS41LDQ2LDgzLjYsNDUuM2MxNS43LTAuOCwyOC43LDExLjcsMjguNywyNy4yYzAsMTQuNS0xMS40LDI2LjQtMjUuNywyNy4yIGMwLDAtNS4zLDAuMy03LjksMC43Yy0xLjMsMC4yLTIuMywwLjQtMywwLjVjLTAuMywwLjEtMC42LTAuMi0wLjUtMC41bDAuOS00LjRMODEsNzMuNGMwLjYtMi44LTEuMi01LjYtNC02LjIgYy0yLjgtMC42LTUuNiwxLjItNi4yLDRjMCwwLTExLjgsNTUtMTEuOSw1NS42Yy0wLjYsMi44LDEuMiw1LjYsNCw2LjJjMi44LDAuNiw1LjYtMS4yLDYuMi00YzAuMS0wLjYsMS43LTcuOSwxLjctNy45IGMxLjItNS42LDUuOC05LjcsMTEuMi0xMC40YzEuMi0wLjIsNS45LTAuNSw1LjktMC41YzE5LjUtMS41LDM0LjktMTcuOCwzNC45LTM3LjdDMTIyLjgsNTEuNiwxMDUuOCwzNC43LDg1LDM0Ljd6IE04Ny43LDEyMS43IGMtMy40LTAuNy02LjgsMS40LTcuNSw0LjljLTAuNywzLjQsMS40LDYuOCw0LjksNy41YzMuNCwwLjcsNi44LTEuNCw3LjUtNC45QzkzLjMsMTI1LjcsOTEuMiwxMjIuNCw4Ny43LDEyMS43eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+Cg==";
var __glob_1_1 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ItCh0LvQvtC5XzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMzQgMTM0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMzQgMTM0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0M0QzRDNDtmaWx0ZXI6dXJsKCNBZG9iZV9PcGFjaXR5TWFza0ZpbHRlcik7fQoJLnN0MXttYXNrOnVybCgjbWFzazBfNjk5XzUxMDFfMDAwMDAwMjk3Mzk2MzU2NDI3OTYxNTQyMDAwMDAwMTE5NzU5NzE0MjU4NTcyNzY4MTlfKTt9Cgkuc3Qye2ZpbGw6dXJsKCNTVkdJRF8xXyk7fQoJLnN0M3tmaWxsOnVybCgjU1ZHSURfMDAwMDAxNTAwNzA5MDkyMDI5NDExNzQxNTAwMDAwMTQzNDY0MTQ4NzQyMTY0OTMyMTFfKTt9Cgkuc3Q0e2ZpbGw6dXJsKCNTVkdJRF8wMDAwMDAyMDM5NzUwMjkzNTU3MDMwNDIxMDAwMDAwNzY1OTMyNTg2NzQ0MTAwOTAzMV8pO30KCS5zdDV7ZmlsbDp1cmwoI1NWR0lEXzAwMDAwMTI3NzQyODgzNzM5MTgyMjU0MTAwMDAwMDA3MDk2ODU0MTczMjQ5NDExMjQ5Xyk7fQoJLnN0NntmaWxsOnVybCgjU1ZHSURfMDAwMDAxMTkwOTcwNzg5Mjc2ODE3ODMyMzAwMDAwMTA4NzU5NjY3NDk4OTY0ODU1NjFfKTt9Cgkuc3Q3e2ZpbGw6dXJsKCNTVkdJRF8wMDAwMDE1NTg2OTIzMjg3MjUwMjI5NDAyMDAwMDAxNjA3NzI1NjcxNzc5MzA2OTQ0M18pO30KCS5zdDh7ZmlsbDp1cmwoI1NWR0lEXzAwMDAwMDcwODEyMzkxMzM0ODkyOTQwMzYwMDAwMDEwODQwNTY5NzM2MDYwMTE2OTExXyk7fQoJLnN0OXtmaWxsOnVybCgjU1ZHSURfMDAwMDAwMDU5NzU4MzIxMTg5MzcyMDAzMTAwMDAwMTEyNzcyODIzNzE4NDk1NzE3NjBfKTt9Cjwvc3R5bGU+CjxkZWZzPgoJPGZpbHRlciBpZD0iQWRvYmVfT3BhY2l0eU1hc2tGaWx0ZXIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMjQuOCIgeT0iMCIgd2lkdGg9Ijg4LjUiIGhlaWdodD0iMTM0Ij4KCQk8ZmVDb2xvck1hdHJpeCAgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjEgMCAwIDAgMCAgMCAxIDAgMCAwICAwIDAgMSAwIDAgIDAgMCAwIDEgMCIvPgoJPC9maWx0ZXI+CjwvZGVmcz4KPG1hc2sgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMjQuOCIgeT0iMCIgd2lkdGg9Ijg4LjUiIGhlaWdodD0iMTM0IiBpZD0ibWFzazBfNjk5XzUxMDFfMDAwMDAwMjk3Mzk2MzU2NDI3OTYxNTQyMDAwMDAwMTE5NzU5NzE0MjU4NTcyNzY4MTlfIj4KCTxyZWN0IHg9Ii01LjciIHk9Ii05IiBjbGFzcz0ic3QwIiB3aWR0aD0iMTUwLjgiIGhlaWdodD0iMTUwLjgiLz4KPC9tYXNrPgo8ZyBjbGFzcz0ic3QxIj4KCQoJCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iNy43MTEiIHkxPSI4NS44NjEyIiB4Mj0iMTI4LjYyNyIgeTI9Ijg1Ljg2MTIiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMCAxMzMuODkpIj4KCQk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZENEIyIi8+CgkJPHN0b3AgIG9mZnNldD0iMC4zNiIgc3R5bGU9InN0b3AtY29sb3I6IzlBQ0VCNyIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNjciIHN0eWxlPSJzdG9wLWNvbG9yOiM0N0M4QkIiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjg5IiBzdHlsZT0ic3RvcC1jb2xvcjojMTRDNUJFIi8+CgkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzAwQzRCRiIvPgoJPC9saW5lYXJHcmFkaWVudD4KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik05My4zLDYzLjRsMC0xOC42TDI0LjgsOS4zdjU0LjFsNDMuOCwyMy40bDE2LTcuMUwzNi40LDU0LjFsMC0yMC41TDkzLjMsNjMuNHoiLz4KCQoJCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMDAwMDAxMDgyNzk2MTYxMjQ1MDYwMjEwNzAwMDAwMTQ1OTk5MDM5NDQ2NTgwOTI5NjlfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjQzLjkxMjMiIHkxPSI3Mi4xNDkiIHgyPSI0My45MTIzIiB5Mj0iMTE4Ljk5MzMiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMCAxMzMuODkpIj4KCQk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBGRUNGIi8+CgkJPHN0b3AgIG9mZnNldD0iOC4wMDAwMDBlLTAyIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBFNUQwIi8+CgkJPHN0b3AgIG9mZnNldD0iMC4yNCIgc3R5bGU9InN0b3AtY29sb3I6IzAwQTVEMSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNDgiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDQwRDQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjU0IiBzdHlsZT0ic3RvcC1jb2xvcjojMDAyNUQ1Ii8+CgkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzAwMDAwMCIvPgoJPC9saW5lYXJHcmFkaWVudD4KCTxwYXRoIHN0eWxlPSJmaWxsOnVybCgjU1ZHSURfMDAwMDAxMDgyNzk2MTYxMjQ1MDYwMjEwNzAwMDAwMTQ1OTk5MDM5NDQ2NTgwOTI5NjlfKTsiIGQ9Ik01MS40LDQxLjV2Ni40bC0xNSw2LjRsMC4xLTIwLjkKCQlMNTEuNCw0MS41eiIvPgoJCgkJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8wMDAwMDEyNjMxNjA4NzQ3NDUwNjI4MTc0MDAwMDAxNTE5MjAxOTIyMzQ3NjY5MjQwOF8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMzYuNDQ3IiB5MT0iNTYuMzkwNSIgeDI9IjE1OS41ODg1IiB5Mj0iNTYuMzkwNSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDEzMy44OSkiPgoJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGREVDOUYiLz4KCQk8c3RvcCAgb2Zmc2V0PSI4LjAwMDAwMGUtMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNFNEQ4QTQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjI0IiBzdHlsZT0ic3RvcC1jb2xvcjojQTRBNkIyIi8+CgkJPHN0b3AgIG9mZnNldD0iMC40NyIgc3R5bGU9InN0b3AtY29sb3I6IzNGNTdDOCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNjEiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDI1RDUiLz4KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwIi8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPHBhdGggc3R5bGU9ImZpbGw6dXJsKCNTVkdJRF8wMDAwMDEyNjMxNjA4NzQ3NDUwNjI4MTc0MDAwMDAxNTE5MjAxOTIyMzQ3NjY5MjQwOF8pOyIgZD0iTTUxLjUsOTQuM2wzMy4yLTE0LjZMMzYuNCw1NC4zbDE0LjktNi40CgkJbDYyLDMyLjRsLTYxLjcsMjYuOUw1MS41LDk0LjN6Ii8+CgkKCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzAwMDAwMTE2MjI0NDQ1MTM0MjM0NjkzMDMwMDAwMDAzNzAwNjI1MzUzMDEzNTkxNjg0XyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIxMS4yNjUyIiB5MT0iMjYuNzc2NCIgeDI9IjE2OC43MjMyIiB5Mj0iMjYuNzc2NCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDEzMy44OSkiPgoJCTxzdG9wICBvZmZzZXQ9IjUuMDAwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6IzYyQTVGRiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNDUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxMDMyRDEiLz4KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwIi8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPHBhdGggc3R5bGU9ImZpbGw6dXJsKCNTVkdJRF8wMDAwMDExNjIyNDQ0NTEzNDIzNDY5MzAzMDAwMDAwMzcwMDYyNTM1MzAxMzU5MTY4NF8pOyIgZD0iTTM2LjUsOTBsMTQuOC02LjRsMC4zLDIzLjVsNjEuNy0yNi45CgkJdjIwLjFMMzYuNCwxMzRMMzYuNSw5MHoiLz4KCQoJCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMDAwMDAxMjE5NzUzNjA2NDExMzk5NzM5ODAwMDAwMDk3Mzg1NjM4MDk4MTg4MTk1MDdfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9Ijc0Ny4zNzE4IiB5MT0iMTUuNjY3NyIgeDI9IjkzNy41NTk2IiB5Mj0iMTMuMjAzNSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDEzMy44OSkiPgoJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkQ0QjIiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjM2IiBzdHlsZT0ic3RvcC1jb2xvcjojOUFDRUI3Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC42NyIgc3R5bGU9InN0b3AtY29sb3I6IzQ3QzhCQiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuODkiIHN0eWxlPSJzdG9wLWNvbG9yOiMxNEM1QkUiLz4KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBDNEJGIi8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPHBhdGggc3R5bGU9ImZpbGw6dXJsKCNTVkdJRF8wMDAwMDEyMTk3NTM2MDY0MTEzOTk3Mzk4MDAwMDAwOTczODU2MzgwOTgxODgxOTUwN18pOyIgZD0iTTI0LjgsODMuOUwzNi40LDkwbC0wLjEsNDMuOWwtMTEuNS01LjgKCQlWODMuOXoiLz4KCQoJCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMDAwMDAwNzMwMDAyODUxMzY1OTcxNzIzMDAwMDAwMDU3ODQyMzEyNjI3NDI2MjkyNzNfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIxLjk5NzciIHkxPSI1MC4xODA0IiB4Mj0iNzUuOTg1MiIgeTI9IjUwLjE4MDQiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMCAxMzMuODkpIj4KCQk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBGRUNGIi8+CgkJPHN0b3AgIG9mZnNldD0iOC4wMDAwMDBlLTAyIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBFNUQwIi8+CgkJPHN0b3AgIG9mZnNldD0iMC4yNSIgc3R5bGU9InN0b3AtY29sb3I6IzAwQTVEMSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNDkiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDQwRDQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjU2IiBzdHlsZT0ic3RvcC1jb2xvcjojMDAyNUQ1Ii8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPHBhdGggc3R5bGU9ImZpbGw6dXJsKCNTVkdJRF8wMDAwMDA3MzAwMDI4NTEzNjU5NzE3MjMwMDAwMDAwNTc4NDIzMTI2Mjc0MjYyOTI3M18pOyIgZD0iTTM5LjUsNzcuNGwxMS44LDYuMkwzNi40LDkwbC0xMS42LTYuMQoJCUwzOS41LDc3LjR6Ii8+CgkKCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzAwMDAwMTE4Mzg0MjUzNzA3NTE1NDQwNDgwMDAwMDA2MzI4NjE0NjE1NDk3OTA2NjE4XyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI3NC4xNTU2IiB5MT0iODMuNjkxNyIgeDI9IjIwNy4wNDI5IiB5Mj0iODYuMDk2NyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDEzMy44OSkiPgoJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMEZFQ0YiLz4KCQk8c3RvcCAgb2Zmc2V0PSI1LjAwMDAwMGUtMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMEU1RDAiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjE1IiBzdHlsZT0ic3RvcC1jb2xvcjojMDBBNUQxIi8+CgkJPHN0b3AgIG9mZnNldD0iMC4yOSIgc3R5bGU9InN0b3AtY29sb3I6IzAwNDBENCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzMiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDI1RDUiLz4KCTwvbGluZWFyR3JhZGllbnQ+Cgk8cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzAwMDAwMTE4Mzg0MjUzNzA3NTE1NDQwNDgwMDAwMDA2MzI4NjE0NjE1NDk3OTA2NjE4Xyk7IiBkPSJNMTEzLjMsNTQuN2wtMC4xLTE4LjhsLTE5LjksOC44djE4LjcKCQlMMTEzLjMsNTQuN3oiLz4KCQoJCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMDAwMDAwNDkxOTIxOTYzODk5OTk1MDE3NDAwMDAwMTgwMjMyMTQ0MTM1OTE0MTc3NjRfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjI0LjgzMzQiIHkxPSIxMTEuNTE3OCIgeDI9IjE4OS42ODYxIiB5Mj0iMTExLjUxNzgiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMCAxMzMuODkpIj4KCQk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZENEFGIi8+CgkJPHN0b3AgIG9mZnNldD0iMC4xIiBzdHlsZT0ic3RvcC1jb2xvcjojRTZENUJBIi8+CgkJPHN0b3AgIG9mZnNldD0iMC4zMSIgc3R5bGU9InN0b3AtY29sb3I6I0E3RDZENSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNjEiIHN0eWxlPSJzdG9wLWNvbG9yOiM0M0Q5RkYiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjYzIiBzdHlsZT0ic3RvcC1jb2xvcjojMzdCMUQwIi8+CgkJPHN0b3AgIG9mZnNldD0iMC42NSIgc3R5bGU9InN0b3AtY29sb3I6IzJCOENBNSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNjciIHN0eWxlPSJzdG9wLWNvbG9yOiMyMTZCN0QiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjciIHN0eWxlPSJzdG9wLWNvbG9yOiMxODRFNUIiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjcyIiBzdHlsZT0ic3RvcC1jb2xvcjojMTAzNTNGIi8+CgkJPHN0b3AgIG9mZnNldD0iMC43NSIgc3R5bGU9InN0b3AtY29sb3I6IzBBMjIyOCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNzgiIHN0eWxlPSJzdG9wLWNvbG9yOiMwNjEzMTYiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjgyIiBzdHlsZT0ic3RvcC1jb2xvcjojMDIwODA5Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC44OCIgc3R5bGU9InN0b3AtY29sb3I6IzAxMDIwMiIvPgoJCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDAiLz4KCTwvbGluZWFyR3JhZGllbnQ+Cgk8cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzAwMDAwMDQ5MTkyMTk2Mzg5OTk5NTAxNzQwMDAwMDE4MDIzMjE0NDEzNTkxNDE3NzY0Xyk7IiBkPSJNMjQuOCw5LjNMNDUsMGw2OC4zLDM1LjlsLTIwLDguOAoJCUwyNC44LDkuM3oiLz4KPC9nPgo8L3N2Zz4K";
var __glob_1_2 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ItCh0LvQvtC5XzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNDAgMTQwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNDAgMTQwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0Q1RkY1Qzt9Cgkuc3Qxe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0ZENDg0ODt9Cgkuc3Qye2ZpbGw6bm9uZTtzdHJva2U6I0ZENDg0ODtzdHJva2Utd2lkdGg6MC4yNjU4O30KCS5zdDN7ZmlsbDojMTYyQkVCO3N0cm9rZTojRkQ0ODQ4O3N0cm9rZS13aWR0aDowLjI2NTg7fQoJLnN0NHtmaWxsOiNGRDQ4NDg7fQoJLnN0NXtmaWxsOiNGRkZGRkY7ZmlsdGVyOnVybCgjQWRvYmVfT3BhY2l0eU1hc2tGaWx0ZXIpO30KCQoJCS5zdDZ7bWFzazp1cmwoI3BhdGgtMTAtaW5zaWRlLTFfNDY4NF8xNzAzNF8wMDAwMDAxMzE4NDU5NDYxNzI4MDQwNDIxMDAwMDAxMzQ2MTE3MzE0NjQ0Mjc4OTMwMV8pO2ZpbGw6bm9uZTtzdHJva2U6I0Q1RkY1QztzdHJva2Utd2lkdGg6MC41MzE3O30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTIzLjMsMGg5My4zQzEyOS42LDAsMTQwLDEwLjQsMTQwLDIzLjN2OTMuM2MwLDEyLjktMTAuNCwyMy4zLTIzLjMsMjMuM0gyMy4zQzEwLjQsMTQwLDAsMTI5LjYsMCwxMTYuN1YyMy4zCglDMCwxMC40LDEwLjQsMCwyMy4zLDB6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05Ni41LDc1LjNjMC45LDEuOSwzLjUsMi42LDUsMS4xbDIuOC0yLjhjMi44LTIuOCw3LjUtMi44LDEwLjMsMGMyLjgsMi44LDIuOCw3LjUsMCwxMC4zbC0yMi4zLDIyLjMKCWMtNS40LDYuMy0xMy40LDEwLjQtMjIuMywxMC40Yy05LjMsMC0xNy43LTQuNC0yMy0xMS4yTDI1LjUsODRjLTIuOC0yLjgtMi44LTcuNSwwLTEwLjNjMi44LTIuOCw3LjUtMi44LDEwLjMsMGwyLjcsMi43CgljMS41LDEuNSw0LDAuOCw0LjktMS4xbDAsMGMwLjItMC40LDAuMy0wLjgsMC4zLTEuMmwwLTMzLjNjMC00LDMuMy03LjMsNy4zLTcuM2M0LDAsNy4zLDMuMyw3LjMsNy4zdjE2LjhjMCwxLjUsMS41LDIuNCwyLjksMmwwLDAKCWMwLjktMC4zLDEuNS0xLjEsMS41LTJWMzAuNmMwLTQsMy4zLTcuMyw3LjMtNy4zYzQsMCw3LjMsMy4zLDcuMyw3LjN2MjcuMWMwLDAuOSwwLjYsMS43LDEuNSwybDAsMGMxLjQsMC40LDIuOS0wLjUsMi45LTJWNDAuOAoJYzAtNCwzLjMtNy4zLDcuMy03LjNjNCwwLDcuMywzLjMsNy4zLDcuM3YzMy4zQzk2LjIsNzQuNiw5Ni4zLDc1LDk2LjUsNzUuM0w5Ni41LDc1LjN6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05My4zLDkwLjRjMCwwLTEwLjUsMTQuNi0yMy4zLDE0LjZDNTcsMTA1LDQ2LjYsOTAuNCw0Ni42LDkwLjRTNTcsNzUuOCw2OS45LDc1LjgKCUM4Mi44LDc1LjgsOTMuMyw5MC40LDkzLjMsOTAuNHoiLz4KPHBhdGggY2xhc3M9InN0MiIgZD0iTTgwLjgsOTAuNGMwLDYtNC45LDEwLjktMTAuOSwxMC45Yy02LDAtMTAuOS00LjktMTAuOS0xMC45czQuOS0xMC45LDEwLjktMTAuOUM3NS45LDc5LjUsODAuOCw4NC40LDgwLjgsOTAuNHoKCSIvPgo8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNzYuNCw5MC40YzAsMy42LTIuOSw2LjUtNi41LDYuNWMtMy42LDAtNi41LTIuOS02LjUtNi41YzAtMy42LDIuOS02LjUsNi41LTYuNUM3My41LDgzLjksNzYuNCw4Ni44LDc2LjQsOTAuNAoJeiIvPgo8cGF0aCBjbGFzcz0ic3QyIiBkPSJNODUuMiw5MC40YzAsOC40LTYuOCwxNS4zLTE1LjMsMTUuM3MtMTUuMy02LjgtMTUuMy0xNS4zczYuOC0xNS4zLDE1LjMtMTUuM1M4NS4yLDgyLDg1LjIsOTAuNHoiLz4KPHBhdGggY2xhc3M9InN0MiIgZD0iTTg5LjYsOTAuNGMwLDEwLjgtOC44LDE5LjYtMTkuNywxOS42Yy0xMC45LDAtMTkuNy04LjgtMTkuNy0xOS42czguOC0xOS42LDE5LjctMTkuNgoJQzgwLjgsNzAuOCw4OS42LDc5LjYsODkuNiw5MC40eiIvPgo8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNzIuMSw5MC40YzAsMS4yLTEsMi4xLTIuMSwyLjFjLTEuMiwwLTIuMS0xLTIuMS0yLjFjMC0xLjIsMS0yLjEsMi4xLTIuMUM3MS4xLDg4LjMsNzIuMSw4OS4yLDcyLjEsOTAuNHoiLz4KPGVsbGlwc2UgY2xhc3M9InN0NCIgY3g9IjY5LjkiIGN5PSI5MC40IiByeD0iMi45IiByeT0iMi45Ii8+CjxkZWZzPgoJPGZpbHRlciBpZD0iQWRvYmVfT3BhY2l0eU1hc2tGaWx0ZXIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iNDYuMyIgeT0iNzUuNiIgd2lkdGg9IjQ3LjMiIGhlaWdodD0iMjkuNyI+CgkJPGZlQ29sb3JNYXRyaXggIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIxIDAgMCAwIDAgIDAgMSAwIDAgMCAgMCAwIDEgMCAwICAwIDAgMCAxIDAiLz4KCTwvZmlsdGVyPgo8L2RlZnM+CjxtYXNrIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjQ2LjMiIHk9Ijc1LjYiIHdpZHRoPSI0Ny4zIiBoZWlnaHQ9IjI5LjciIGlkPSJwYXRoLTEwLWluc2lkZS0xXzQ2ODRfMTcwMzRfMDAwMDAwMTMxODQ1OTQ2MTcyODA0MDQyMTAwMDAwMTM0NjExNzMxNDY0NDI3ODkzMDFfIj4KCTxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik05My4zLDkwLjRjMCwwLTEwLjUsMTQuNi0yMy4zLDE0LjZDNTcsMTA1LDQ2LjYsOTAuNCw0Ni42LDkwLjRTNTcsNzUuOCw2OS45LDc1LjgKCQlDODIuOCw3NS44LDkzLjMsOTAuNCw5My4zLDkwLjR6Ii8+CjwvbWFzaz4KPHBhdGggY2xhc3M9InN0NiIgZD0iTTkzLjMsOTAuNGMwLDAtMTAuNSwxNC42LTIzLjMsMTQuNkM1NywxMDUsNDYuNiw5MC40LDQ2LjYsOTAuNFM1Nyw3NS44LDY5LjksNzUuOAoJQzgyLjgsNzUuOCw5My4zLDkwLjQsOTMuMyw5MC40eiIvPgo8L3N2Zz4K";
var AccountPolkadotExtensions_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-popup-extensionLogo[data-v-1e9936b8]{max-width:50px}\n")();
const _sfc_main$v = defineComponent({
  name: "RoboAccountPolkadotExtensions",
  props: {
    extension: {
      type: String,
      default: null,
      validator: function(value) {
        return ["polkadot-js", "talisman", "subwallet-js"].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      getExtension: null,
      extensionsData: [
        {
          extesion: "polkadot-js",
          name: "Polkadot{.js}",
          picture: "PolkadotJSLogo.svg",
          install: "https://polkadot.js.org/extension/"
        },
        {
          extesion: "talisman",
          name: "Talisman",
          picture: "TalismanLogo.svg",
          install: "https://app.talisman.xyz/spiritkeys"
        },
        {
          extesion: "subwallet-js",
          name: "SubWallet",
          picture: "SubWalletLogo.svg",
          install: "https://subwallet.app/download.html"
        }
      ],
      addresses: null
    };
  },
  computed: {
    extensionData() {
      return this.extensionsData.find((ext) => ext.extesion === this.extension);
    },
    extPic() {
      return new URL({ "../images/PolkadotJSLogo.svg": __glob_1_0, "../images/SubWalletLogo.svg": __glob_1_1, "../images/TalismanLogo.svg": __glob_1_2 }[`../images/${this.extensionData.picture}`], self.location);
    }
  },
  methods: {
    onLoad(interval) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (window.injectedWeb3) {
            resolve();
          }
        }, interval);
        setTimeout(() => reject(new Error("no extension")), 1e3);
      });
    },
    async enable() {
      await this.getExtension.enable().then(async (value) => {
        this.$store.commit("setPolkadotExtension", this.extension);
        this.accounts = await value.accounts.get();
        if (this.accounts.length > 0) {
          this.$store.commit("setPolkadotAddress", this.accounts[0].address);
        }
        document.body.querySelectorAll('.robo-details--closeOutOfFocus[tabindex="0"]').forEach((e) => {
          e.open = false;
        });
      }).catch((reason) => {
        console.log("[robonomics-ui-vue]:", reason);
      });
    }
  },
  async mounted() {
    await this.onLoad(500);
    this.getExtension = window.injectedWeb3[this.extension];
  }
});
const _hoisted_1$g = ["src"];
const _hoisted_2$c = /* @__PURE__ */ createTextVNode("Install");
const _hoisted_3$8 = /* @__PURE__ */ createTextVNode("Connect");
const _hoisted_4$6 = /* @__PURE__ */ createTextVNode("Connected");
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_grid = resolveComponent("robo-grid");
  const _component_robo_grid_item = resolveComponent("robo-grid-item");
  const _component_robo_button = resolveComponent("robo-button");
  return _ctx.extensionData ? (openBlock(), createBlock(_component_robo_grid, {
    key: 0,
    columns: "200px auto",
    gap: "x1",
    offset: "x05",
    valign: "center"
  }, {
    default: withCtx(() => [
      createVNode(_component_robo_grid_item, null, {
        default: withCtx(() => [
          createVNode(_component_robo_grid, {
            columns: "50px auto",
            gap: "x1",
            offset: "x0",
            valign: "center"
          }, {
            default: withCtx(() => [
              createElementVNode("img", {
                src: _ctx.extPic,
                class: "robo-popup-extensionLogo"
              }, null, 8, _hoisted_1$g),
              createElementVNode("span", null, toDisplayString(_ctx.extensionData.name), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_robo_grid_item, { align: "right" }, {
        default: withCtx(() => [
          !_ctx.getExtension ? (openBlock(), createBlock(_component_robo_button, {
            key: 0,
            href: _ctx.extensionData.install,
            clean: ""
          }, {
            default: withCtx(() => [
              _hoisted_2$c
            ]),
            _: 1
          }, 8, ["href"])) : _ctx.$store.state.robonomicsUIvue.polkadot.extension !== _ctx.extension ? (openBlock(), createBlock(_component_robo_button, {
            key: 1,
            clean: "",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.enable())
          }, {
            default: withCtx(() => [
              _hoisted_3$8
            ]),
            _: 1
          })) : (openBlock(), createBlock(_component_robo_button, {
            key: 2,
            clean: "",
            disabled: "ok",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.enable())
          }, {
            default: withCtx(() => [
              _hoisted_4$6
            ]),
            _: 1
          }))
        ]),
        _: 1
      })
    ]),
    _: 1
  })) : createCommentVNode("", true);
}
var RoboAccountPolkadotExtensions = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v], ["__scopeId", "data-v-1e9936b8"]]);
var Alert_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-alert[data-v-5f1838e4]{position:fixed;padding:calc(var(--space) * .5);color:var(--color-card-background)}.robo-alert[data-v-5f1838e4]:not(.robo-alert--wide){top:var(--gap-layout);right:var(--gap-layout);max-width:400px}.robo-alert--success[data-v-5f1838e4]{background-color:var(--color-green)}.robo-alert--info[data-v-5f1838e4]{background-color:var(--color-blue-light)}\n")();
const _sfc_main$u = defineComponent({
  name: "RoboAlert",
  props: {
    type: {
      type: String,
      default: null,
      required: true,
      validator: function(value) {
        return ["success", "info", "warning", "error"].indexOf(value) !== -1;
      }
    },
    wide: {
      type: Boolean,
      default: false
    },
    dismissible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return {
        [`robo-alert`]: true,
        [`robo-alert--${this.type}`]: this.type,
        [`robo-alert--wide`]: this.wide,
        [`robo-alert--dismissible`]: this.dismissible
      };
    }
  }
});
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
var RoboAlert = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u], ["__scopeId", "data-v-5f1838e4"]]);
var Balance_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-balance-currency[data-v-30869f02]{margin-left:calc(var(--space) * .5);text-transform:uppercase}.robo-balance-account[data-v-30869f02]{text-transform:capitalize}summary[data-v-30869f02]::-webkit-details-marker{display:none}summary[data-v-30869f02]{cursor:pointer;display:block;user-select:none;transition:margin .6s cubic-bezier(.23,1,.32,1)}summary .icon[data-v-30869f02]{color:var(--color-link);margin-left:var(--space)}summary .icon[data-v-30869f02]:hover{color:var(--color-link-hover)}details[open] summary[data-v-30869f02]{margin-bottom:var(--gap-text)}details[open] summary .icon[data-v-30869f02]{transform:rotate(90deg)}\n")();
const _sfc_main$t = defineComponent({
  name: "RoboBalance",
  props: {
    balance: {
      type: Object,
      default: null,
      required: true
    },
    currency: {
      type: String,
      default: null
    },
    decimals: {
      type: Number,
      default: 3
    }
  },
  computed: {
    classList() {
      return {
        [`robo-balance`]: true
      };
    },
    overall() {
      return this.balance.map((item) => item.quantity).reduce((prev, curr) => prev + curr, 0);
    }
  },
  methods: {
    formatBalance(qty) {
      if (Number.isInteger(qty)) {
        return qty;
      } else {
        return parseFloat(qty.toFixed(this.decimals));
      }
    }
  }
});
const _hoisted_1$f = { class: "robo-balance-quantity" };
const _hoisted_2$b = {
  key: 0,
  class: "robo-balance-currency"
};
const _hoisted_3$7 = {
  key: 0,
  class: "robo-balance-details"
};
const _hoisted_4$5 = { class: "robo-balance-quantity" };
const _hoisted_5$5 = {
  key: 0,
  class: "robo-balance-currency"
};
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_text = resolveComponent("robo-text");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.balance.length > 1 ? "details" : "div"), {
    class: normalizeClass(_ctx.classList)
  }, {
    default: withCtx(() => [
      (openBlock(), createBlock(resolveDynamicComponent(_ctx.balance.length > 1 ? "summary" : "div"), { class: "robo-balance-summary" }, {
        default: withCtx(() => [
          createVNode(_component_robo_text, {
            weight: "bold",
            inline: ""
          }, {
            default: withCtx(() => [
              createElementVNode("span", _hoisted_1$f, toDisplayString(_ctx.formatBalance(_ctx.overall)), 1),
              _ctx.currency ? (openBlock(), createElementBlock("span", _hoisted_2$b, toDisplayString(_ctx.currency), 1)) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          _ctx.balance.length > 1 ? (openBlock(), createBlock(_component_font_awesome_icon, {
            key: 0,
            icon: "ellipsis-vertical",
            class: "icon"
          })) : createCommentVNode("", true)
        ]),
        _: 1
      })),
      _ctx.balance.length > 1 ? (openBlock(), createElementBlock("div", _hoisted_3$7, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.balance, (option, index2) => {
          return openBlock(), createBlock(_component_robo_text, {
            key: index2,
            gap: ""
          }, {
            default: withCtx(() => [
              option.account ? (openBlock(), createBlock(_component_robo_text, {
                key: 0,
                size: "tiny",
                class: "robo-balance-account"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(option.account) + ":", 1)
                ]),
                _: 2
              }, 1024)) : createCommentVNode("", true),
              createVNode(_component_robo_text, {
                size: "small",
                weight: "bold"
              }, {
                default: withCtx(() => [
                  createElementVNode("span", _hoisted_4$5, toDisplayString(_ctx.formatBalance(option.quantity)), 1),
                  _ctx.currency ? (openBlock(), createElementBlock("span", _hoisted_5$5, toDisplayString(_ctx.currency), 1)) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1024);
        }), 128))
      ])) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["class"]);
}
var RoboBalance = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t], ["__scopeId", "data-v-30869f02"]]);
var Breadcrumbs_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => '.robo-breadcrumb ol[data-v-44bce96e]{list-style:none}.robo-breadcrumb li[data-v-44bce96e]{display:inline-block;vertical-align:middle;padding:0 var(--gap-layout);position:relative}.robo-breadcrumb li[data-v-44bce96e]:after{content:"";height:100%;width:1px;background:var(--color-text);transform:rotate(153deg);display:block;position:absolute;top:0;left:0}.robo-breadcrumb a[data-v-44bce96e]{text-decoration:none;text-transform:uppercase;letter-spacing:1px;font-weight:300;font-size:calc(var(--font-size) * 1.5)}.robo-breadcrumb a[aria-current][data-v-44bce96e]{cursor:default;pointer-events:none;color:var(--color-text)}\n')();
const _sfc_main$s = defineComponent({
  name: "RoboBreadcrumbs",
  props: {
    items: {
      type: Object,
      required: true
    }
  }
});
const _hoisted_1$e = {
  "aria-label": "Breadcrumb",
  class: "robo-breadcrumb"
};
const _hoisted_2$a = ["href", "aria-current"];
const _hoisted_3$6 = /* @__PURE__ */ createTextVNode(' { "@context": "http://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { ');
const _hoisted_4$4 = /* @__PURE__ */ createTextVNode(" } ] } ");
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createElementVNode("nav", _hoisted_1$e, [
      createElementVNode("ol", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item, index2) => {
          return openBlock(), createElementBlock("li", { key: index2 }, [
            createElementVNode("a", {
              href: item.href,
              "aria-current": item.active ? "page" : null
            }, toDisplayString(item.text), 9, _hoisted_2$a)
          ]);
        }), 128))
      ])
    ]),
    (openBlock(), createBlock(resolveDynamicComponent("script"), { type: "application/ld+json" }, {
      default: withCtx(() => [
        _hoisted_3$6,
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item, index2) => {
          return openBlock(), createElementBlock(Fragment, {
            key: item.href
          }, [
            createTextVNode(' "@type": "ListItem", "position": ' + toDisplayString(index2 + 1) + ', "item": { "@id": "' + toDisplayString(item.href) + '", "name": "' + toDisplayString(item.text) + '" } ', 1)
          ], 64);
        }), 128)),
        _hoisted_4$4
      ]),
      _: 1
    }))
  ], 64);
}
var RoboBreadcrumbs = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s], ["__scopeId", "data-v-44bce96e"]]);
var Button_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-btn[data-v-5fef4909]{--border: var(--color-blue);--background: var(--color-blue);--color: #fff;--border-hover: #000;--background-hover: #000;--color-hover: #fff;--border-2: var(--color-blue);--background-2: transparent;--color-2: var(--color-blue);--border-2-hover: #000;--background-2-hover: transparent;--color-2-hover: #000;--padding-v: var(--space);--padding-g: var(--space);--text-size: var(--font-size);appearance:none;text-decoration:none;cursor:pointer;border:0;font-family:var(--font-family);font-size:var(--text-size);font-weight:700;line-height:1.2;text-transform:uppercase;letter-spacing:1px;display:inline-block}.robo-container--full .robo-btn--part[data-v-5fef4909]{display:block}.robo-btn--part[data-v-5fef4909]{display:inline-flex;align-items:center;text-align:center}.robo-btn .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){border:1px solid var(--border);background-color:var(--background);color:var(--color)}.robo-btn:hover .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){background-color:var(--background-hover);border-color:var(--border-hover);color:var(--color-hover)}.robo-btn .robo-btn--part[data-v-5fef4909]:nth-child(2n){border:1px solid var(--border-2);background-color:var(--background-2);color:var(--color-2)}.robo-btn:hover .robo-btn--part[data-v-5fef4909]:nth-child(2n){background-color:var(--background-2-hover);border-color:var(--border-2-hover);color:var(--color-2-hover)}.robo-btn.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-blue);--background: transparent;--color: var(--color-blue);--border-hover: #000;--background-hover: transparent;--color-hover: #000}.robo-btn.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-blue);--background-2: var(--color-blue);--color-2: #fff;--border-2-hover: #000;--background-2-hover: #000;--color-2-hover: #fff}.robo-btn.robo-btn--ok .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-green);--background: var(--color-green)}.robo-btn.robo-btn--ok .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-green);--color-2: var(--color-green)}.robo-btn.robo-btn--ok.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-green);--background: transparent;--color: var(--color-green)}.robo-btn.robo-btn--ok.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-green);--background-2: var(--color-green);--color-2: #fff}.robo-btn.robo-btn--alarm .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-red);--background: var(--color-red)}.robo-btn.robo-btn--alarm .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-red);--color-2: var(--color-red)}.robo-btn.robo-btn--alarm.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-red);--background: transparent;--color: var(--color-red)}.robo-btn.robo-btn--alarm.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-red);--background-2: var(--color-red);--color-2: #fff}.robo-btn.robo-btn--na .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-gray);--background: var(--color-gray)}.robo-btn.robo-btn--na .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-gray);--color-2: var(--color-gray)}.robo-btn.robo-btn--na.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-gray);--background: transparent;--color: var(--color-gray)}.robo-btn.robo-btn--na.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-gray);--background-2: var(--color-gray);--color-2: #fff}.robo-btn[disabled][data-v-5fef4909]{cursor:not-allowed}.robo-btn[disabled] .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-gray);--background: var(--color-gray);--color: #fff;--border-hover: var(--color-gray);--background-hover: var(--color-gray);--color-hover: #fff}.robo-btn[disabled] .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-gray);--background-2: transparent;--color-2: var(--color-gray);--border-2-hover: var(--color-gray);--background-2-hover: transparent;--color-2-hover: var(--color-gray)}.robo-btn[disabled].robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-gray);--background: transparent;--color: var(--color-gray);--border-hover: var(--color-gray);--background-hover: transparent;--color-hover: var(--color-gray)}.robo-btn[disabled].robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-gray);--background-2: var(--color-gray);--color-2: #fff;--border-2-hover: var(--color-gray);--background-2-hover: var(--color-gray);--color-2-hover: #fff}.robo-btn.robo-btn--disabled-ok .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-green);--background: var(--color-green);--color: #fff;--border-hover: var(--color-green);--background-hover: var(--color-green);--color-hover: #fff}.robo-btn.robo-btn--disabled-ok .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-green);--background-2: transparent;--color-2: var(--color-green);--border-2-hover: var(--color-green);--background-2-hover: transparent;--color-2-hover: var(--color-green)}.robo-btn.robo-btn--disabled-ok.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-green);--background: transparent;--color: var(--color-green);--border-hover: var(--color-green);--background-hover: transparent;--color-hover: var(--color-green)}.robo-btn.robo-btn--disabled-ok.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-green);--background-2: var(--color-green);--color-2: #fff;--border-2-hover: var(--color-green);--background-2-hover: var(--color-green);--color-2-hover: #fff}.robo-btn.robo-btn--disabled-alarm .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-red);--background: var(--color-red);--color: #fff;--border-hover: var(--color-red);--background-hover: var(--color-red);--color-hover: #fff}.robo-btn.robo-btn--disabled-alarm .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-red);--background-2: transparent;--color-2: var(--color-red);--border-2-hover: var(--color-red);--background-2-hover: transparent;--color-2-hover: var(--color-red)}.robo-btn.robo-btn--disabled-alarm.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n+1){--border: var(--color-red);--background: transparent;--color: var(--color-red);--border-hover: var(--color-red);--background-hover: transparent;--color-hover: var(--color-red)}.robo-btn.robo-btn--disabled-alarm.robo-btn--outlined .robo-btn--part[data-v-5fef4909]:nth-child(2n){--border-2: var(--color-red);--background-2: var(--color-red);--color-2: #fff;--border-2-hover: var(--color-red);--background-2-hover: var(--color-red);--color-2-hover: #fff}.robo-btn.robo-btn--size-small[data-v-5fef4909]{--padding-v: calc(var(--space) * .5);--padding-g: calc(var(--space) * .5);--text-size: calc(var(--font-size) * .7)}.robo-btn.robo-btn--size-big[data-v-5fef4909]{--padding-v: calc(var(--space) * 2);--padding-g: calc(var(--space) * 4);--text-size: calc(var(--font-size) * 1.3)}.robo-btn--fitLabeled[data-v-5fef4909]{--padding-v: calc(var(--space) + var(--space)/2) }.robo-btn.robo-btn--size-small.robo-btn--fitLabeled[data-v-5fef4909]{--padding-v: calc(var(--space) * .5 + var(--space)/2) }.robo-btn.robo-btn--size-big.robo-btn--fitLabeled[data-v-5fef4909]{--padding-v: calc(var(--space) * 2 + var(--space)/2) }.robo-btn .robo-btn--subpart[data-v-5fef4909]:not(:last-child){margin-right:var(--space)}.robo-btn .robo-loader[data-v-5fef4909]{--loader-color: var(--color) }\n")();
var Button_vue_vue_type_style_index_1_lang = /* @__PURE__ */ (() => ".robo-btn--clean .robo-btn--part{background:transparent!important;border:none!important;padding:0;color:var(--background)!important;text-transform:none}.robo-btn--part{display:inline-block;padding:var(--padding-v) var(--padding-g);transition:.3s cubic-bezier(.175,.885,.32,1.275) all}.robo-btn--loading{pointer-events:none;cursor:not-allowed;opacity:.7}\n")();
const _sfc_main$r = defineComponent({
  name: "RoboButton",
  props: {
    block: {
      type: Boolean,
      default: false
    },
    clean: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: String,
      default: null,
      validator: function(value) {
        return ["disabled", "ok", "alarm"].indexOf(value) !== -1;
      }
    },
    fitLabeled: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: null
    },
    iconLeft: {
      type: String,
      default: null
    },
    iconRight: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    right: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "normal",
      validator: function(value) {
        return ["small", "normal", "big"].indexOf(value) !== -1;
      }
    },
    type: {
      type: String,
      default: "primary",
      validator: function(value) {
        return ["primary", "ok", "alarm", "na"].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      slotLength: 1
    };
  },
  computed: {
    classList() {
      return {
        [`robo-btn`]: true,
        [`robo-btn--${this.type}`]: true,
        [`robo-btn--outlined`]: this.outlined,
        [`robo-btn--disabled-${this.disabled}`]: this.disabled,
        [`robo-btn--loading`]: this.loading,
        [`robo-container--full`]: this.block,
        [`robo-btn--size-${this.size}`]: this.size,
        [`robo-btn--clean`]: this.clean,
        [`robo-btn--parted`]: this.right,
        [`robo-btn--fitLabeled`]: this.fitLabeled
      };
    },
    disableCompute() {
      if (this.disabled) {
        return true;
      } else {
        return null;
      }
    }
  },
  methods: {
    external() {
      if (this.href) {
        let parser = document.createElement("a");
        parser.href = this.href;
        if (parser.host !== window.location.host) {
          return true;
        }
      }
    }
  },
  watch: {
    "$refs.text": function() {
      if (this.$refs.text.textContent) {
        this.slotLength = this.$refs.text.textContent.length;
      } else {
        this.slotLength = 0;
      }
    }
  },
  mounted() {
    if (this.$refs.text.textContent) {
      this.slotLength = this.$refs.text.textContent.length;
    } else {
      this.slotLength = 0;
    }
  }
});
const _hoisted_1$d = { class: "robo-btn--part" };
const _hoisted_2$9 = {
  key: 2,
  class: "robo-btn--subpart",
  ref: "text"
};
const _hoisted_3$5 = {
  key: 0,
  class: "robo-btn--part"
};
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_loader = resolveComponent("robo-loader");
  const _component_robo_icon = resolveComponent("robo-icon");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.href ? "a" : "button"), {
    href: _ctx.href,
    disabled: _ctx.disableCompute,
    class: normalizeClass(_ctx.classList),
    target: _ctx.external() ? "_blank" : null,
    rel: _ctx.external() ? "noopener" : null
  }, {
    default: withCtx(() => [
      createElementVNode("span", _hoisted_1$d, [
        _ctx.loading ? (openBlock(), createBlock(_component_robo_loader, {
          key: 0,
          class: "robo-btn--subpart"
        })) : createCommentVNode("", true),
        _ctx.iconLeft && !_ctx.loading ? (openBlock(), createBlock(_component_robo_icon, {
          key: 1,
          class: "robo-btn--subpart",
          icon: _ctx.iconLeft
        }, null, 8, ["icon"])) : createCommentVNode("", true),
        _ctx.slotLength > 0 ? (openBlock(), createElementBlock("span", _hoisted_2$9, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 512)) : createCommentVNode("", true),
        _ctx.iconRight && !_ctx.loading ? (openBlock(), createBlock(_component_robo_icon, {
          key: 3,
          class: "robo-btn--subpart",
          icon: _ctx.iconRight
        }, null, 8, ["icon"])) : createCommentVNode("", true)
      ]),
      _ctx.right ? (openBlock(), createElementBlock("span", _hoisted_3$5, toDisplayString(_ctx.right), 1)) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["href", "disabled", "class", "target", "rel"]);
}
var RoboButton = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r], ["__scopeId", "data-v-5fef4909"]]);
var Card_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-card[data-v-508daf94]{--background: transparent;--color: var(--color-dark);background-color:var(--background);color:var(--color);position:relative;padding:var(--card-padding);border-radius:var(--border-radius)}.robo-card .robo-progress[data-v-508daf94]{position:absolute;top:0;left:0;width:100%}.robo-card--backcolor-light[data-v-508daf94]:not(.robo-card--outlined){--background: var(--color-light)}.robo-card--backcolor-dark[data-v-508daf94]:not(.robo-card--outlined){--background: var(--color-dark);--color: var(--color-light)}.robo-card--backcolor-lightblue[data-v-508daf94]:not(.robo-card--outlined){--background: var(--color-bluegreen-light)}.robo-card--outlined.robo-card[data-v-508daf94]{--color-card-background: var(--color-body);--card-border-color: var(--color-text);--card-padding: var(--space);border:1px solid var(--card-border-color)}.robo-card--labeled[data-v-508daf94]{margin-top:10px}\n")();
var Card_vue_vue_type_style_index_1_lang = /* @__PURE__ */ (() => ".robo-card--disabled .robo-card-image,.robo-card--disabled .robo-card-section{pointer-events:none;filter:grayscale(1);opacity:.8}\n")();
const _sfc_main$q = defineComponent({
  name: "RoboCard",
  props: {
    backColor: {
      type: String,
      default: "light",
      validator: function(value) {
        return ["light", "dark", "lightblue"].indexOf(value) !== -1;
      }
    },
    backImage: {
      type: String,
      default: null
    },
    backPosition: {
      type: String,
      default: "100% 100%"
    },
    backRepeat: {
      type: String,
      default: "no-repeat",
      validator: function(value) {
        return ["no-repeat", "repeat-x", "repeat-y", "repeat", "space"].indexOf(value) !== -1;
      }
    },
    backSize: {
      type: String,
      default: "auto",
      validator: function(value) {
        return ["contain", "cover", "auto"].indexOf(value) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: null
    }
  },
  computed: {
    classList() {
      return {
        [`robo-card`]: true,
        [`robo-card--solid`]: !this.outlined,
        [`robo-card--outlined`]: this.outlined,
        [`robo-card--disabled`]: this.disabled,
        [`robo-card--backimage`]: this.backImage,
        [`robo-card--backcolor-${this.backColor}`]: this.backColor
      };
    },
    styles() {
      var s = "";
      if (this.backImage) {
        s += "background-image: url(" + this.backImage + ");";
      }
      if (this.backImage && this.backPosition) {
        s += " background-position:" + this.backPosition + ";";
      }
      if (this.backImage && this.backRepeat) {
        s += " background-repeat:" + this.backRepeat + ";";
      }
      if (this.backImage && this.backSize) {
        s += " background-size:" + this.backSize + ";";
      }
      return s;
    }
  },
  mounted() {
    let e = this.$refs.card;
    let labels = e.querySelectorAll(".robo-card-label");
    if (labels.length > 0) {
      e.classList.add("robo-card--labeled");
    }
  }
});
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_progress = resolveComponent("robo-progress");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList),
    style: normalizeStyle(_ctx.styles),
    ref: "card"
  }, [
    _ctx.loading || _ctx.progress ? (openBlock(), createBlock(_component_robo_progress, {
      key: 0,
      progress: _ctx.progress
    }, null, 8, ["progress"])) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 6);
}
var RoboCard = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q], ["__scopeId", "data-v-508daf94"]]);
var CardLabel_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-card .robo-card-label[data-v-ac76ab46]{position:absolute;left:calc(var(--space) * (-1));top:calc(var(--card-label-height) * .5 * (-1));height:var(--card-label-height);font-size:calc(var(--font-size) * .7);font-weight:700;display:flex;justify-content:flex-start;align-items:stretch}.robo-card:not(.robo-card--outlined) .robo-card-label[data-v-ac76ab46]{background-color:var(--color-dark);color:var(--color-light)}.robo-card--outlined .robo-card-label[data-v-ac76ab46]{border:1px solid var(--card-border-color);background-color:var(--color-card-background)}\n")();
const _sfc_main$p = defineComponent({
  name: "RoboCardLabel",
  computed: {
    classList() {
      return {
        [`robo-card-label`]: true
      };
    }
  }
});
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
var RoboCardLabel = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p], ["__scopeId", "data-v-ac76ab46"]]);
var CardLabelSection_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-card-label-section[data-v-485c1976]{--padding: calc(var(--space) * .6);padding-left:var(--padding);padding-right:var(--padding);height:100%;line-height:var(--card-label-height);position:relative}.robo-card-label-section[data-v-485c1976]:not(:first-child){border-left:1px solid var(--card-border-color)}.robo-card-label-section--status[data-v-485c1976]{text-transform:uppercase;letter-spacing:1px;color:var(--color-card-background)}.robo-card-label-section--ok[data-v-485c1976]{background-color:var(--color-green)}.robo-card-label-section--error[data-v-485c1976]{background-color:var(--color-red)}.robo-card-label-section--na[data-v-485c1976]{background-color:var(--color-gray)}select[data-v-485c1976]{padding-left:var(--padding);padding-right:var(--padding);cursor:pointer;max-height:100%}select[data-v-485c1976]{background-color:var(--color-link);color:var(--color-card-background)}.robo-card-label-section--info[data-v-485c1976],.robo-card-label-section--select[data-v-485c1976]{padding-left:0;padding-right:0}.robo-details[data-v-485c1976]{height:100%}.robo-details[data-v-485c1976]:not([open]){overflow:hidden}\n")();
var CardLabelSection_vue_vue_type_style_index_1_lang = /* @__PURE__ */ (() => ".robo-card-label-section .robo-select,.robo-card-label-section .robo-select select{color:var(--color-card-background)!important;display:block!important;height:100%!important}.robo-card-label-section .robo-select{background-color:var(--color-link)!important;border-width:0!important}.robo-card-label-section .robo-select select{font-size:calc(var(--font-size)*.7)!important;padding-top:0!important;padding-bottom:0!important;padding-left:var(--padding)!important;padding-right:calc(var(--select-tog-size) + var(--padding))!important}\n")();
const _sfc_main$o = defineComponent({
  name: "RoboCardLabelSection",
  props: {
    info: {
      type: Boolean,
      default: false
    },
    selectModel: {
      type: String,
      default: null
    },
    selectName: {
      type: String,
      default: null
    },
    selectOptions: {
      type: Array,
      default: null
    },
    status: {
      type: String,
      default: null,
      validator(value) {
        return ["ok", "error", "na"].includes(value);
      }
    }
  },
  computed: {
    classList() {
      return {
        [`robo-card-label-section`]: true,
        [`robo-card-label-section--status`]: this.status,
        [`robo-card-label-section--${this.status}`]: this.status,
        [`robo-card-label-section--info`]: this.info,
        [`robo-card-label-section--select`]: this.selectOptions
      };
    }
  }
});
const _hoisted_1$c = {
  key: 0,
  class: "robo-card-label-section-content"
};
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_details = resolveComponent("robo-details");
  const _component_robo_select = resolveComponent("robo-select");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList),
    tabindex: "0"
  }, [
    !_ctx.selectOptions && !_ctx.info ? (openBlock(), createElementBlock("div", _hoisted_1$c, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ])) : createCommentVNode("", true),
    _ctx.info ? (openBlock(), createBlock(_component_robo_details, {
      key: 1,
      summary: {
        text: "i",
        button: {
          size: "small"
        }
      },
      tooltip: {}
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      _: 3
    })) : createCommentVNode("", true),
    _ctx.selectOptions && _ctx.selectName ? (openBlock(), createBlock(_component_robo_select, {
      key: 2,
      options: _ctx.selectOptions,
      name: _ctx.selectName,
      modelValue: _ctx.selectModel,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selectModel = $event)
    }, null, 8, ["options", "name", "modelValue"])) : createCommentVNode("", true)
  ], 2);
}
var RoboCardLabelSection = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o], ["__scopeId", "data-v-485c1976"]]);
var CardSection_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-card-section[data-v-2850e2e9]{position:relative}.robo-card-section[data-v-2850e2e9]:not(:last-child){padding-bottom:var(--card-padding)}.robo-card-label+.robo-card-section[data-v-2850e2e9]{padding-top:calc(var(--card-padding) * .8)}.robo-card--outlined .robo-card-section[data-v-2850e2e9]:not(:last-child){border-bottom:1px solid var(--card-border-color);margin-bottom:var(--card-padding)}\n")();
const _sfc_main$n = defineComponent({
  name: "RoboCardSection",
  props: {
    maxWidth: {
      type: String,
      default: null
    }
  },
  computed: {
    classList() {
      return {
        [`robo-card-section`]: true
      };
    },
    styles() {
      var s = "";
      if (this.maxWidth) {
        s += "max-width: " + this.maxWidth + ";";
      }
      return s;
    }
  }
});
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList),
    style: normalizeStyle(_ctx.styles != "" ? _ctx.styles : null)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 6);
}
var RoboCardSection = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n], ["__scopeId", "data-v-2850e2e9"]]);
var CardTitle_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-card-title[data-v-25a142f1]{font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:var(--gap-text)}.robo-card-title--1[data-v-25a142f1]{font-size:calc(var(--font-size) * 1.5)}.robo-card-title--2[data-v-25a142f1]{font-size:calc(var(--font-size) * 1.2)}\n")();
const _sfc_main$m = defineComponent({
  name: "RoboCardTitle",
  props: {
    size: {
      type: String,
      default: "1",
      validator(value) {
        return ["1", "2", "3"].includes(value);
      }
    }
  },
  computed: {
    classList() {
      return {
        [`robo-card-title`]: true,
        [`robo-card-title--${this.size}`]: true
      };
    }
  }
});
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
var RoboCardTitle = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m], ["__scopeId", "data-v-25a142f1"]]);
var Details_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".robo-card-label summary .robo-btn .robo-btn--part{--padding-v: calc(var(--space) * .18);--padding-g: calc(var(--space) * .5)}.robo-details[open] .robo-btn .robo-btn--part:nth-child(2n+1){background-color:var(--background-hover);border-color:var(--border-hover);color:var(--color-hover)}.robo-details[open] .robo-btn .robo-btn--part:nth-child(2n+1) .robo-loader{--loader-color: var(--color-hover) }.robo-details[open] .robo-btn .robo-btn--part:nth-child(2n){background-color:var(--background-2-hover);border-color:var(--border-2-hover);color:var(--color-2-hover)}.robo-details[open] .robo-btn .robo-btn--part:nth-child(2n) .robo-loader{--loader-color: var(--color-2-hover) }\n")();
var Details_vue_vue_type_style_index_1_scoped_true_lang = /* @__PURE__ */ (() => '.robo-details[data-v-1eb615c5]{--tipGap: 0;display:inline-block;position:relative}.robo-details--offset[data-v-1eb615c5]{--tipGap: calc(var(--gap-text) * .4)}details summary[data-v-1eb615c5]::-webkit-details-marker,details summary[data-v-1eb615c5]::marker{display:none;content:""}summary[data-v-1eb615c5]{--color-text: var(--color-link);--color-text-hover: var(--color-dark);--color-text-active: var(--color-green);cursor:pointer;transition:.2s linear all;user-select:none;display:flex;align-items:center;align-content:center}summary[data-v-1eb615c5]:hover{color:var(--color-text-hover)}summary>*[data-v-1eb615c5]:not(:last-child){margin-right:calc(var(--space) * .5)}details[open] summary[data-v-1eb615c5]{color:var(--color-text-active)}.robo-details-summary-text[data-v-1eb615c5]{font-weight:700}.robo-btn[data-v-1eb615c5]{letter-spacing:0;pointer-events:none;text-transform:none}.robo-details--loading summary[data-v-1eb615c5]{pointer-events:none;cursor:not-allowed}.robo-details--inline summary[data-v-1eb615c5]{transition:margin .6s cubic-bezier(.23,1,.32,1)}.robo-details--popup summary[data-v-1eb615c5]{color:var(--color-text)}.robo-details--inline[open] summary[data-v-1eb615c5]{margin-bottom:var(--tipGap)}.robo-details--inline[data-v-1eb615c5]:not(:last-child){margin-bottom:var(--space)}.robo-details-summary-switchicon[data-v-1eb615c5]{transition:.2s linear transform;transform:rotate(90deg);color:var(--color-link)}.robo-details--inline[open] .robo-details-summary-switchicon[data-v-1eb615c5]{transform:rotate(0)}.robo-details--tooltip[data-v-1eb615c5]{position:relative}.robo-details--tooltip .robo-details-content[data-v-1eb615c5]{--tip-content-padding: calc(var(--space) * .5);font-size:inherit;max-width:450px;max-height:450px;overflow:auto;position:absolute;padding:var(--tip-content-padding);z-index:1000}.robo-details--tooltip--bottom-start .robo-details-content[data-v-1eb615c5]{top:calc(100% + var(--tipGap));left:0}.robo-details--tooltip--bottom-end .robo-details-content[data-v-1eb615c5]{top:calc(100% + var(--tipGap));right:0}.robo-details--tooltip--top-start .robo-details-content[data-v-1eb615c5]{bottom:calc(100% + var(--tipGap));left:0}.robo-details--tooltip--top-end .robo-details-content[data-v-1eb615c5]{bottom:calc(100% + var(--tipGap));right:0}.robo-details--tooltip--start-top .robo-details-content[data-v-1eb615c5]{bottom:0;right:calc(100% + var(--tipGap))}.robo-details--tooltip--start-bottom .robo-details-content[data-v-1eb615c5]{top:0;right:calc(100% + var(--tipGap))}.robo-details--tooltip--end-top .robo-details-content[data-v-1eb615c5]{bottom:0;left:calc(100% + var(--tipGap))}.robo-details--tooltip--end-bottom .robo-details-content[data-v-1eb615c5]{top:0;left:calc(100% + var(--tipGap))}.robo-details--tooltip--bottom-start .robo-details-content[data-v-1eb615c5],.robo-details--tooltip--bottom-end .robo-details-content[data-v-1eb615c5]{transform:translateY(5%);opacity:0}.robo-details--tooltip--bottom-start[open] .robo-details-content[data-v-1eb615c5],.robo-details--tooltip--bottom-end[open] .robo-details-content[data-v-1eb615c5]{animation:TooltipBottom-1eb615c5 .6s cubic-bezier(.23,1,.32,1) .1s forwards}@keyframes TooltipBottom-1eb615c5{to{opacity:1;transform:translateY(0)}}.robo-details--tooltip--top-start .robo-details-content[data-v-1eb615c5],.robo-details--tooltip--top-end .robo-details-content[data-v-1eb615c5]{transform:translateY(-5%);opacity:0}.robo-details--tooltip--top-start[open] .robo-details-content[data-v-1eb615c5],.robo-details--tooltip--top-end[open] .robo-details-content[data-v-1eb615c5]{animation:TooltipTop-1eb615c5 .6s cubic-bezier(.23,1,.32,1) .1s forwards}@keyframes TooltipTop-1eb615c5{to{opacity:1;transform:translateY(0)}}.robo-details--tooltip--start-top .robo-details-content[data-v-1eb615c5],.robo-details--tooltip--start-bottom .robo-details-content[data-v-1eb615c5]{transform:translate(5%);opacity:0}.robo-details--tooltip--start-top[open] .robo-details-content[data-v-1eb615c5],.robo-details--tooltip--start-bottom[open] .robo-details-content[data-v-1eb615c5]{animation:TooltipStartEnd-1eb615c5 .6s cubic-bezier(.23,1,.32,1) .1s forwards}.robo-details--tooltip--end-top .robo-details-content[data-v-1eb615c5],.robo-details--tooltip--end-bottom .robo-details-content[data-v-1eb615c5]{transform:translate(-5%);opacity:0}.robo-details--tooltip--end-top[open] .robo-details-content[data-v-1eb615c5],.robo-details--tooltip--end-bottom[open] .robo-details-content[data-v-1eb615c5]{animation:TooltipStartEnd-1eb615c5 .6s cubic-bezier(.23,1,.32,1) .1s forwards}@keyframes TooltipStartEnd-1eb615c5{to{opacity:1;transform:translate(0)}}.robo-details--tooltip-theme--dark.robo-details--tooltip[open] summary[data-v-1eb615c5]{--color-background-active: var(--color-dark);--color-border-active: var(--color-dark)}.robo-details--tooltip-theme--dark.robo-details--tooltip .robo-details-content[data-v-1eb615c5]{background-color:var(--color-dark);color:var(--color-light)}.robo-details--tooltip-theme--light.robo-details--tooltip[open] summary[data-v-1eb615c5]{--color-text-active: var(--color-dark);--color-background-active: var(--color-light);--color-border-active: var(--color-light)}.robo-details--tooltip-theme--light.robo-details--tooltip .robo-details-content[data-v-1eb615c5]{background-color:var(--color-light);color:var(--color-dark)}.robo-details--tooltip-closable .robo-details-content[data-v-1eb615c5]{padding-right:calc(var(--tip-content-padding)*2 + .8rem)}.robo-details--tooltip-closable .robo-details-content-close[data-v-1eb615c5]{right:var(--tip-content-padding);top:var(--tip-content-padding)}.robo-details-content-close[data-v-1eb615c5]{cursor:pointer;position:absolute}.robo-details--content-align--justify .robo-details-content[data-v-1eb615c5]{text-align:justify!important;-webkit-hyphens:auto;-moz-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.robo-details--content-align--left .robo-details-content[data-v-1eb615c5]{text-align:left}.robo-details--content-align--right .robo-details-content[data-v-1eb615c5]{text-align:right}.robo-details--content-align--center .robo-details-content[data-v-1eb615c5]{text-align:center}.robo-details--popup .robo-details-content[data-v-1eb615c5]{--popup-content-padding: var(--space);--popup-content-width: 450px;background-color:var(--color-light);border-radius:var(--border-radius);color:var(--color-dark);left:calc(50% - var(--popup-content-width)/2);opacity:0;overflow:auto;padding:var(--popup-content-padding);padding-right:calc(var(--popup-content-padding)*2 + .8rem);position:fixed;top:calc(var(--space) * 3);transform:translateY(-50%);width:var(--popup-content-width);z-index:1001}.robo-details--popup[open] .robo-details-content[data-v-1eb615c5]{animation:popup-1eb615c5 .3s linear .1s forwards}@keyframes popup-1eb615c5{to{opacity:1;transform:translateY(0)}}.robo-details--popup .robo-details-content-close[data-v-1eb615c5]{right:var(--popup-content-padding);top:var(--popup-content-padding)}@media screen and (max-width: 470px){.robo-details--popup .robo-details-content[data-v-1eb615c5]{left:var(--space);right:var(--space);width:auto}}.robo-details--popup h3[data-v-1eb615c5]{margin-bottom:var(--gap-text)}\n')();
var Details_vue_vue_type_style_index_2_lang = /* @__PURE__ */ (() => ".robo-details--tooltip-theme--dark.robo-details--tooltip .robo-details-content a{color:var(--color-green);text-decoration:underline}\n")();
const _sfc_main$l = defineComponent({
  name: "RoboDetails",
  props: {
    content: {
      type: Object,
      default: {},
      validator: function(value) {
        let valid = true;
        if (value.closeOutOfFocus && typeof value.closeOutOfFocus !== "boolean") {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "content.closeOutOfFocus", required Boolean type');
          valid = false;
        }
        if (value.offset && typeof value.offset !== "boolean") {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "content.offset", required Boolean type');
          valid = false;
        }
        if (value.textalign && !["justify", "left", "right", "center"].includes(value.textalign)) {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "content.textalign". Current value:', value.textalign);
          valid = false;
        } else if (!value.textalign) {
          value.textalign = "justify";
        }
        return valid;
      }
    },
    open: {
      type: Boolean,
      default: false
    },
    popup: {
      type: Object,
      default: null,
      validator: function(value) {
        let valid = true;
        if (typeof value.overlay !== "undefined" && typeof value.overlay !== "boolean") {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "popup.overlay", required Boolean type');
          valid = false;
        } else if (typeof value.overlay === "undefined") {
          value.overlay = true;
        }
        if (value.title && typeof value.title !== "string") {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "popup.title", required String type');
          valid = false;
        }
        return valid;
      }
    },
    summary: {
      type: Object,
      default: null,
      validator: function(value) {
        let valid = true;
        if (value.button) {
          if (value.button.outlined && typeof value.button.outlined !== "boolean") {
            console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.button.outlined", required Boolean type');
            valid = false;
          }
          if (value.button.size && !["small", "normal", "big"].includes(value.button.size)) {
            console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.button.size". Current value:', value.button.size);
            valid = false;
          }
          if (value.button.type && !["primary", "ok", "alarm", "na"].includes(value.button.type)) {
            console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.button.type". Current value:', value.button.type);
            valid = false;
          }
        }
        if (value.icon && typeof value.icon !== "string") {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.icon", required String type');
          valid = false;
        }
        if (value.loading && typeof value.loading !== "boolean") {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.loading", required Boolean type');
          valid = false;
        } else if (!value.loading) {
          value.loading = false;
        }
        if (value.text && typeof value.text !== "string") {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "summary.text", required String type');
          valid = false;
        }
        return valid;
      }
    },
    tooltip: {
      type: Object,
      default: null,
      validator: function(value) {
        let valid = true;
        if (value.closeButton && typeof value.closeButton !== "boolean") {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "tooltip.closeButton", required Boolean type');
          valid = false;
        } else if (!value.closeButton) {
          value.closeButton = true;
        }
        if (value.placement && ![
          "bottom-start",
          "bottom-end",
          "top-start",
          "top-end",
          "start-top",
          "start-bottom",
          "end-top",
          "end-bottom"
        ].includes(value.placement)) {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "tooltip.placement". Current value:', value.placement);
          valid = false;
        } else if (!value.placement) {
          value.placement = "bottom-start";
        }
        if (value.ratio && !["auto", "none"].includes(value.ratio)) {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "tooltip.ratio". Current value:', value.ratio);
          valid = false;
        } else if (!value.ratio) {
          value.ratio = "auto";
        }
        if (value.theme && ![
          "dark",
          "light"
        ].includes(value.theme)) {
          console.warn('[robonomics-ui-vue3]: "Details" component has wrong prop "tooltip.theme". Current value:', value.theme);
          valid = false;
        } else if (!value.theme) {
          value.theme = "dark";
        }
        return valid;
      }
    }
  },
  computed: {
    type() {
      if (this.tooltip) {
        return "tooltip";
      }
      if (this.popup) {
        return "popup";
      } else {
        return "inline";
      }
    },
    classes() {
      let classes = {
        [`robo-details`]: true,
        [`robo-details--${this.type}`]: this.type,
        [`robo-details--closeOutOfFocus`]: this.content.closeOutOfFocus || this.tooltip
      };
      if (this.content) {
        Object.assign(classes, {
          [`robo-details--offset`]: this.content.offset,
          [`robo-details--content-align--${this.content.textalign}`]: this.content.textalign
        });
      }
      if (this.summary) {
        Object.assign(classes, {
          [`robo-details--loading`]: this.summary.loading
        });
      }
      if (this.tooltip) {
        Object.assign(classes, {
          [`robo-details--tooltip`]: this.tooltip,
          [`robo-details--tooltip-closable`]: this.tooltip.closeButton,
          [`robo-details--tooltip--${this.tooltip.placement}`]: this.tooltip.placement,
          [`robo-details--tooltip-theme--${this.tooltip.theme}`]: this.tooltip.theme
        });
      }
      if (this.popup) {
        Object.assign(classes, {
          [`robo-details--popup`]: this.popup
        });
      }
      return classes;
    }
  },
  methods: {
    isOutOfViewport(elem) {
      var bounding = elem.getBoundingClientRect();
      var out = {};
      out.top = bounding.top < 0;
      out.left = bounding.left < 0;
      out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
      out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
      out.any = out.top || out.left || out.bottom || out.right;
      out.all = out.top && out.left && out.bottom && out.right;
      return out;
    },
    doFixRatio() {
      if (this.tooltip) {
        if (this.tooltip.ratio === "auto" && this.type === "tooltip") {
          let o = this;
          setTimeout(function() {
            if (o.$refs.details.open) {
              let tipContent = o.$refs.content;
              let tipContentWidth = tipContent.offsetWidth || tipContent.clientWidth;
              let tipContentHeight = tipContent.offsetHeight;
              let ratio = tipContentHeight / tipContentWidth;
              if (ratio > 1.3 && ratio < 3) {
                tipContent.style.width = tipContentHeight + "px";
                tipContent.style.maxHeight = tipContentWidth + 10 + "px";
                let out = o.isOutOfViewport(tipContent);
                if (out.left || out.right) {
                  let bound = tipContent.getBoundingClientRect();
                  tipContent.style.width = window.innerWidth - bound.left - 40 + "px";
                }
              }
              if (ratio > 3) {
                tipContent.style.width = tipContentWidth * 3 + "px";
                tipContent.style.maxHeight = tipContentHeight / 3 + "px";
                let out = o.isOutOfViewport(tipContent);
                if (out.left || out.right) {
                  let bound = tipContent.getBoundingClientRect();
                  tipContent.style.width = window.innerWidth - bound.left - 40 + "px";
                }
              }
            }
          }, 5);
        }
      }
    },
    closeDetails() {
      this.$refs.details.open = false;
    }
  },
  mounted() {
    document.body.onclick = (e) => {
      const current = e.target.closest('.robo-details--closeOutOfFocus[tabindex="0"]');
      document.body.querySelectorAll('.robo-details--closeOutOfFocus[tabindex="0"]').forEach((e2) => {
        if (e2 !== current) {
          e2.open = false;
        }
      });
    };
  }
});
const _hoisted_1$b = ["open"];
const _hoisted_2$8 = { key: 0 };
const _hoisted_3$4 = { key: 1 };
const _hoisted_4$3 = {
  class: "robo-details-content",
  ref: "content"
};
const _hoisted_5$4 = { key: 0 };
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_button = resolveComponent("robo-button");
  const _component_robo_icon = resolveComponent("robo-icon");
  const _component_robo_loader = resolveComponent("robo-loader");
  return _ctx.$slots.default && _ctx.summary ? (openBlock(), createElementBlock("details", {
    key: 0,
    class: normalizeClass(_ctx.classes),
    tabindex: "0",
    ref: "details",
    open: _ctx.open ? true : null
  }, [
    createElementVNode("summary", {
      class: "robo-details-summary",
      "aria-expanded": "true/false",
      tabindex: "0",
      role: "button",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.doFixRatio && _ctx.doFixRatio(...args))
    }, [
      _ctx.summary.button ? (openBlock(), createBlock(_component_robo_button, {
        key: 0,
        iconLeft: _ctx.summary.icon ? _ctx.summary.icon : null,
        outlined: _ctx.summary.button.outlined ? true : false,
        loading: _ctx.summary.loading,
        size: _ctx.summary.button.size,
        type: _ctx.summary.button.type
      }, {
        default: withCtx(() => [
          _ctx.summary.text ? (openBlock(), createElementBlock("span", _hoisted_2$8, toDisplayString(_ctx.summary.text), 1)) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["iconLeft", "outlined", "loading", "size", "type"])) : createCommentVNode("", true),
      !_ctx.summary.button && _ctx.summary.text ? (openBlock(), createElementBlock("div", _hoisted_3$4, [
        _ctx.summary.icon && !_ctx.summary.loading ? (openBlock(), createBlock(_component_robo_icon, {
          key: 0,
          icon: _ctx.summary.icon
        }, null, 8, ["icon"])) : createCommentVNode("", true),
        _ctx.summary.loading ? (openBlock(), createBlock(_component_robo_loader, { key: 1 })) : createCommentVNode("", true),
        createTextVNode(" " + toDisplayString(_ctx.summary.text) + " ", 1),
        _ctx.type === "inline" ? (openBlock(), createBlock(_component_robo_icon, {
          key: 2,
          icon: "ellipsis",
          class: "robo-details-summary-switchicon"
        })) : createCommentVNode("", true)
      ])) : createCommentVNode("", true)
    ]),
    createElementVNode("div", _hoisted_4$3, [
      _ctx.popup ? (openBlock(), createElementBlock("h3", _hoisted_5$4, [
        _ctx.popup.title ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createTextVNode(toDisplayString(_ctx.popup.title), 1)
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createTextVNode(toDisplayString(_ctx.summary.text), 1)
        ], 64))
      ])) : createCommentVNode("", true),
      renderSlot(_ctx.$slots, "default", {}, void 0, true),
      _ctx.tooltip && _ctx.tooltip.closeButton || _ctx.popup ? (openBlock(), createBlock(_component_robo_icon, {
        key: 1,
        onClick: _ctx.closeDetails,
        class: "robo-details-content-close",
        icon: "xmark"
      }, null, 8, ["onClick"])) : createCommentVNode("", true)
    ], 512),
    _ctx.popup && _ctx.popup.overlay ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "robo-overlay",
      "aria-hidden": "true",
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.closeDetails && _ctx.closeDetails(...args))
    })) : createCommentVNode("", true)
  ], 10, _hoisted_1$b)) : createCommentVNode("", true);
}
var RoboDetails = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l], ["__scopeId", "data-v-1eb615c5"]]);
var Grid_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-grid[data-v-484a12ed]{--gap: var(--gap-layout);--offset: var(--gap-layout);display:grid;padding-top:var(--offset);padding-bottom:var(--offset);gap:var(--gap)}.robo-grid[data-v-484a12ed]:last-child{padding-bottom:0}.robo-grid--embed[data-v-484a12ed]{padding-top:0;padding-bottom:0}.robo-layout-section--dark .robo-grid[data-v-484a12ed]{padding-top:calc(var(--gap) * .25);padding-bottom:calc(var(--gap) * .25)}.robo-grid-columns-1[data-v-484a12ed]{grid-template-columns:repeat(1,1fr)}.robo-grid-columns-2[data-v-484a12ed]{grid-template-columns:repeat(2,1fr)}.robo-grid-columns-3[data-v-484a12ed]{grid-template-columns:repeat(3,1fr)}.robo-grid-columns-4[data-v-484a12ed]{grid-template-columns:repeat(4,1fr)}.robo-grid-columns-5[data-v-484a12ed]{grid-template-columns:repeat(5,1fr)}.robo-grid-columns-6[data-v-484a12ed]{grid-template-columns:repeat(6,1fr)}.robo-grid-columns-7[data-v-484a12ed]{grid-template-columns:repeat(7,1fr)}.robo-grid-columns-8[data-v-484a12ed]{grid-template-columns:repeat(8,1fr)}.robo-grid-columns-9[data-v-484a12ed]{grid-template-columns:repeat(9,1fr)}.robo-grid-columns-10[data-v-484a12ed]{grid-template-columns:repeat(10,1fr)}.robo-grid-columns-11[data-v-484a12ed]{grid-template-columns:repeat(11,1fr)}.robo-grid-columns-12[data-v-484a12ed]{grid-template-columns:repeat(12,1fr)}.robo-grid-gap-x0[data-v-484a12ed]{--gap: 0}.robo-grid-gap-x05[data-v-484a12ed]{--gap: calc(var(--gap-layout) * .5)}.robo-grid-gap-x1[data-v-484a12ed]{--gap: var(--gap-layout)}.robo-grid-gap-x2[data-v-484a12ed]{--gap: calc( var(--gap-layout) * 2)}.robo-grid-gap-x4[data-v-484a12ed]{--gap: calc( var(--gap-layout) * 4)}.robo-grid-offset-x0[data-v-484a12ed]{--offset: 0}.robo-grid-offset-x05[data-v-484a12ed]{--offset: calc(var(--gap-layout) * .5)}.robo-grid-offset-x1[data-v-484a12ed]{--offset: var(--gap-layout)}.robo-grid-offset-x2[data-v-484a12ed]{--offset: calc( var(--gap-layout) * 2)}.robo-grid-offset-x4[data-v-484a12ed]{--offset: calc( var(--gap-layout) * 4)}.robo-grid-template-columns--left-center[data-v-484a12ed]{grid-template-columns:var(--aside-size-left) auto}.robo-grid-template-columns--left-center-right[data-v-484a12ed]{grid-template-columns:var(--aside-size-left) auto var(--aside-size-right)}.robo-grid-screen[data-v-484a12ed]{min-height:100vh}@media screen and (max-width: 1200px){.robo-grid-columns-2[data-v-484a12ed]:not(.robo-grid--mobile-none),.robo-grid-columns-3[data-v-484a12ed]:not(.robo-grid--mobile-none),.robo-grid-columns-4[data-v-484a12ed]:not(.robo-grid--mobile-none),.robo-grid-columns-5[data-v-484a12ed]:not(.robo-grid--mobile-none),.robo-grid-columns-6[data-v-484a12ed]:not(.robo-grid--mobile-none),.robo-grid-columns-7[data-v-484a12ed]:not(.robo-grid--mobile-none),.robo-grid-columns-8[data-v-484a12ed]:not(.robo-grid--mobile-none),.robo-grid-columns-9[data-v-484a12ed]:not(.robo-grid--mobile-none),.robo-grid-columns-10[data-v-484a12ed]:not(.robo-grid--mobile-none),.robo-grid-columns-11[data-v-484a12ed]:not(.robo-grid--mobile-none),.robo-grid-columns-12[data-v-484a12ed]:not(.robo-grid--mobile-none){grid-template-columns:repeat(1,1fr)!important}}@media screen and (max-width: 1000px){.robo-grid--mobile-transfer[data-v-484a12ed]{grid-template-columns:1fr!important}.robo-grid-template-columns--left-center-right.robo-grid--mobile-transfer[data-v-484a12ed]{grid-template-columns:auto}.robo-grid-template-columns--left-center-right.robo-grid--mobile-none[data-v-484a12ed]{grid-template-columns:min-content auto min-content}}@media screen and (max-width: 700px){.robo-grid[data-v-484a12ed]{--gap: calc(var(--gap-layout) * .5)}.robo-grid-gap-x0[data-v-484a12ed]{--gap: 0}.robo-grid-gap-x05[data-v-484a12ed]{--gap: calc(var(--gap-layout) * .25)}.robo-grid-gap-x1[data-v-484a12ed]{--gap: calc(var(--gap-layout) * .5)}.robo-grid-gap-x2[data-v-484a12ed]{--gap: var(--gap-layout)}.robo-grid-gap-x4[data-v-484a12ed]{--gap: calc( var(--gap-layout) * 2)}.robo-grid-offset-x0[data-v-484a12ed]{--offset: 0}.robo-grid-offset-x05[data-v-484a12ed]{--offset: calc(var(--gap-layout) * .25)}.robo-grid-offset-x1[data-v-484a12ed]{--offset: calc(var(--gap-layout) * .5)}.robo-grid-offset-x2[data-v-484a12ed]{--offset: var(--gap-layout)}.robo-grid-offset-x4[data-v-484a12ed]{--offset: calc( var(--gap-layout) * 2)}.robo-grid-template-columns--left-center.robo-grid--mobile-transfer[data-v-484a12ed]{grid-template-columns:auto}.robo-grid-template-columns--left-center.robo-grid--mobile-no-cols[data-v-484a12ed]{grid-template-columns:max-content auto}.robo-grid-template-columns--left-center-right.robo-grid--mobile-no-cols[data-v-484a12ed]{grid-template-columns:max-content auto max-content}}.robo-grid--valign-top[data-v-484a12ed]{align-items:start}.robo-grid--valign-center[data-v-484a12ed]{align-items:center}.robo-grid--valign-bottom[data-v-484a12ed]{align-items:end}.robo-grid--valign-stretch[data-v-484a12ed]{align-items:stretch}.robo-grid--align-left[data-v-484a12ed]{justify-content:start}.robo-grid--align-center[data-v-484a12ed]{justify-content:center}.robo-grid--align-right[data-v-484a12ed]{justify-content:end}.robo-grid--align-stretch[data-v-484a12ed]{justify-content:stretch}.robo-grid--align-space-between[data-v-484a12ed]{justify-content:space-between}.robo-grid--align-fit-content.robo-grid-columns-1[data-v-484a12ed]{grid-template-columns:repeat(1,max-content)}.robo-grid--align-fit-content.robo-grid-columns-2[data-v-484a12ed]{grid-template-columns:repeat(2,max-content)}.robo-grid--align-fit-content.robo-grid-columns-3[data-v-484a12ed]{grid-template-columns:repeat(3,max-content)}.robo-grid--align-fit-content.robo-grid-columns-4[data-v-484a12ed]{grid-template-columns:repeat(4,max-content)}.robo-grid--align-fit-content.robo-grid-columns-5[data-v-484a12ed]{grid-template-columns:repeat(5,max-content)}.robo-grid--align-fit-content.robo-grid-columns-6[data-v-484a12ed]{grid-template-columns:repeat(6,max-content)}.robo-grid--align-fit-content.robo-grid-columns-7[data-v-484a12ed]{grid-template-columns:repeat(7,max-content)}.robo-grid--align-fit-content.robo-grid-columns-8[data-v-484a12ed]{grid-template-columns:repeat(8,max-content)}.robo-grid--align-fit-content.robo-grid-columns-9[data-v-484a12ed]{grid-template-columns:repeat(9,max-content)}.robo-grid--align-fit-content.robo-grid-columns-10[data-v-484a12ed]{grid-template-columns:repeat(10,max-content)}.robo-grid--align-fit-content.robo-grid-columns-11[data-v-484a12ed]{grid-template-columns:repeat(11,max-content)}.robo-grid--align-fit-content.robo-grid-columns-12[data-v-484a12ed]{grid-template-columns:repeat(12,max-content)}.robo-grid--flex[data-v-484a12ed]{display:flex}\n")();
const _sfc_main$k = defineComponent({
  name: "RoboGrid",
  props: {
    align: {
      type: String,
      default: "stretch",
      validator(value) {
        return ["left", "center", "right", "stretch", "fit-content", "space-between"].includes(value);
      }
    },
    columns: {
      type: String,
      default: null
    },
    columnsRepeat: {
      type: [Number, String],
      default: null,
      validator(value) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(value) || ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(value);
      }
    },
    columnsTemplate: {
      type: String,
      default: null,
      validator(value) {
        return ["left-center", "left-center-right"].includes(value);
      }
    },
    embed: {
      type: Boolean,
      default: false
    },
    flex: {
      type: Boolean,
      default: false
    },
    gap: {
      type: String,
      default: "x2",
      validator(value) {
        return ["x0", "x05", "x1", "x2", "x4"].includes(value);
      }
    },
    offset: {
      type: String,
      default: "x2",
      validator(value) {
        return ["x0", "x05", "x1", "x2", "x4"].includes(value);
      }
    },
    mediaMobile: {
      type: String,
      default: "transfer",
      validator(value) {
        return ["transfer", "no-cols", "none"].includes(value);
      }
    },
    rows: {
      type: String,
      default: null
    },
    screen: {
      type: Boolean,
      default: false
    },
    valign: {
      type: String,
      default: "stretch",
      validator(value) {
        return ["top", "center", "bottom", "stretch"].includes(value);
      }
    }
  },
  computed: {
    classList() {
      return {
        [`robo-grid`]: true,
        [`robo-grid-columns-${this.columnsRepeat}`]: this.columnsRepeat,
        [`robo-grid-gap-${this.gap}`]: this.gap,
        [`robo-grid-offset-${this.offset}`]: this.offset,
        [`robo-grid-template-columns--${this.columnsTemplate}`]: this.columnsTemplate,
        [`robo-grid--mobile-${this.mediaMobile}`]: this.mediaMobile,
        [`robo-grid-screen`]: this.screen,
        [`robo-grid--valign-${this.valign}`]: this.valign,
        [`robo-grid--align-${this.align}`]: this.align,
        [`robo-grid--embed`]: this.embed,
        [`robo-grid--flex`]: this.flex
      };
    },
    style() {
      let string = "";
      if (this.columns) {
        string += "grid-template-columns:" + this.columns + ";";
      }
      if (this.rows) {
        string += "grid-template-rows:" + this.rows + ";";
      }
      return string;
    }
  }
});
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList),
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 6);
}
var RoboGrid = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k], ["__scopeId", "data-v-484a12ed"]]);
var GridItem_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-grid-item--valign-top[data-v-0524b72e]{align-self:start}.robo-grid-item--valign-center[data-v-0524b72e]{align-self:center}.robo-grid-item--valign-bottom[data-v-0524b72e]{align-self:end}.robo-grid-item--valign-stretch[data-v-0524b72e]{align-self:stretch}.robo-grid-item--align-left[data-v-0524b72e]{justify-self:start}.robo-grid-item--align-center[data-v-0524b72e]{justify-self:center}.robo-grid-item--align-right[data-v-0524b72e]{justify-self:end}.robo-grid-item--align-stretch[data-v-0524b72e]{justify-self:stretch}.robo-grid-item--mobile-collapse .robo-grid-item-toggler[data-v-0524b72e]{display:none}@media screen and (max-width: 1000px){.robo-grid-template-columns--left-center-right .robo-grid-item--mobile-collapse .robo-grid-item-toggler[data-v-0524b72e]{display:inline-block}}@media screen and (max-width: 700px){.robo-grid-item--mobile-collapse .robo-grid-item-toggler[data-v-0524b72e]{display:inline-block}.robo-grid-item--mobile-hide[data-v-0524b72e]{display:none}}.robo-grid-item--mobile-collapse[data-v-0524b72e]{position:relative}.robo-grid-item-close[data-v-0524b72e]{height:2rem;cursor:pointer;color:var(--color-link);float:right;display:none}.robo-grid-item-close-wrap[data-v-0524b72e]{margin-bottom:var(--gap-layout);text-align:left;text-transform:uppercase;letter-spacing:1px;font-weight:700;display:none}.robo-grid-item-close-wrap span[data-v-0524b72e]{margin-right:var(--space)}@keyframes slideLeft-0524b72e{0%{transform:translate(-100%)}to{transform:translate(0)}}@keyframes slideLeftReverse-0524b72e{0%{transform:translate(0)}to{transform:translate(-100%)}}@keyframes slideRight-0524b72e{0%{transform:translate(200%)}to{transform:translate(0)}}@keyframes slideRightReverse-0524b72e{0%{transform:translate(0)}to{transform:translate(200%)}}.robo-grid-item--sticky-all[data-v-0524b72e]{position:sticky;top:calc(var(--gap-layout) * .3);z-index:90}@media screen and (max-width: 1000px){.robo-grid-item-close-wrap[data-v-0524b72e]{display:block}.robo-grid-item--sticky-collapse[data-v-0524b72e]{position:sticky;top:calc(var(--gap-layout) * .3);z-index:90}.robo-grid-item-close[data-v-0524b72e]{display:block}.robo-grid-item--mobile-collapse .robo-grid-item-content[data-v-0524b72e]{background:#fff;position:fixed;z-index:1000;top:0;bottom:0;padding:calc(var(--gap-layout) * 1.5)}.robo-grid-item--mobile-collapse-left .robo-grid-item-content[data-v-0524b72e]{transform:translate(-100%);transform-origin:0 50%;left:0;right:50%}.robo-grid-item--mobile-collapse-right .robo-grid-item-content[data-v-0524b72e]{transform:translate(200%);transform-origin:100% 50%;left:50%;right:0}.robo-grid-item--mobile-collapse-left.robo-grid-item--open .robo-grid-item-content[data-v-0524b72e]{animation:slideLeft-0524b72e .2s ease-in-out forwards}.robo-grid-item--mobile-collapse-right.robo-grid-item--open .robo-grid-item-content[data-v-0524b72e]{animation:slideRight-0524b72e .2s ease-in-out forwards}.robo-grid-item--mobile-collapse-left.robo-grid-item--close .robo-grid-item-content[data-v-0524b72e]{animation:slideLeftReverse-0524b72e .2s ease-in-out forwards}.robo-grid-item--mobile-collapse-right.robo-grid-item--close .robo-grid-item-content[data-v-0524b72e]{animation:slideRightReverse-0524b72e .2s ease-in-out forwards}.robo-grid-template-columns--left-center-right>.robo-grid-item--mobile-collapse-left[data-v-0524b72e]{grid-row:1;grid-column:1 / 3}.robo-grid-template-columns--left-center-right>.robo-grid-item--mobile-collapse-right[data-v-0524b72e]{grid-row:1;grid-column:3 / 6;text-align:right}.robo-grid-template-columns--left-center-right>.robo-grid-item--mobile-transfer[data-v-0524b72e]{grid-column:1 / 6}}@media screen and (max-width: 500px){.robo-grid-item--mobile-collapse-left.robo-grid-item--open .robo-grid-item-content[data-v-0524b72e]{right:20%}.robo-grid-item--mobile-collapse-right.robo-grid-item--open .robo-grid-item-content[data-v-0524b72e]{left:20%}}\n")();
const _sfc_main$j = defineComponent({
  name: "RoboGridItem",
  props: {
    align: {
      type: String,
      default: null,
      validator(value) {
        return ["left", "center", "right", "stretch"].includes(value);
      }
    },
    collapseIcon: {
      type: String,
      default: "bars"
    },
    collapseText: {
      type: String
    },
    mediaMobile: {
      type: String,
      default: "transfer",
      validator(value) {
        return ["transfer", "collapse-right", "collapse-left", "hide"].includes(value);
      }
    },
    sticky: {
      type: String,
      default: "none",
      validator(value) {
        return ["collapse", "all", "none"].includes(value);
      }
    },
    valign: {
      type: String,
      default: null,
      validator(value) {
        return ["top", "center", "bottom", "stretch"].includes(value);
      }
    }
  },
  data() {
    return {
      collapseClass: "none",
      collapse: this.mediaMobile === "collapse-left" || this.mediaMobile === "collapse-right"
    };
  },
  computed: {
    classList() {
      return {
        [`robo-grid-item`]: true,
        [`robo-grid-item--mobile-collapse`]: this.mediaMobile == "collapse-left" || this.mediaMobile == "collapse-right",
        [`robo-grid-item--mobile-${this.mediaMobile}`]: this.mediaMobile,
        [`robo-grid-item--valign-${this.valign}`]: this.valign,
        [`robo-grid-item--align-${this.align}`]: this.align,
        [`robo-grid-item--${this.collapseClass}`]: this.collapseClass,
        [`robo-grid-item--sticky-${this.sticky}`]: this.sticky
      };
    }
  },
  methods: {
    toggleCollapse() {
      if (this.collapseClass === "close" || this.collapseClass === "none") {
        return this.collapseClass = "open";
      } else {
        return this.collapseClass = "close";
      }
    }
  }
});
const _hoisted_1$a = { key: 0 };
const _hoisted_2$7 = { class: "robo-grid-item-content" };
const _hoisted_3$3 = {
  key: 0,
  class: "robo-grid-item-close-wrap",
  "aria-hidden": "true"
};
const _hoisted_4$2 = { key: 0 };
const _hoisted_5$3 = { key: 1 };
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_button = resolveComponent("robo-button");
  const _component_robo_icon = resolveComponent("robo-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList),
    tabindex: "-1"
  }, [
    _ctx.collapse ? (openBlock(), createBlock(_component_robo_button, {
      key: 0,
      onClick: _ctx.toggleCollapse,
      class: "robo-grid-item-toggler",
      outlined: "",
      size: "small",
      "icon-left": _ctx.collapseIcon
    }, {
      default: withCtx(() => [
        _ctx.collapseText ? (openBlock(), createElementBlock("span", _hoisted_1$a, toDisplayString(_ctx.collapseText), 1)) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["onClick", "icon-left"])) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_2$7, [
      _ctx.collapse ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
        _ctx.collapseIcon ? (openBlock(), createElementBlock("span", _hoisted_4$2, [
          createVNode(_component_robo_icon, { icon: _ctx.collapseIcon }, null, 8, ["icon"])
        ])) : createCommentVNode("", true),
        _ctx.collapseText ? (openBlock(), createElementBlock("span", _hoisted_5$3, toDisplayString(_ctx.collapseText), 1)) : createCommentVNode("", true),
        createVNode(_component_robo_icon, {
          class: "robo-grid-item-close",
          icon: "circle-xmark",
          onClick: _ctx.toggleCollapse
        }, null, 8, ["onClick"])
      ])) : createCommentVNode("", true),
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]),
    _ctx.collapseClass === "open" ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: "robo-grid-item-overlay robo-overlay",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleCollapse && _ctx.toggleCollapse(...args)),
      "aria-hidden": "true"
    })) : createCommentVNode("", true)
  ], 2);
}
var RoboGridItem = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__scopeId", "data-v-0524b72e"]]);
const _sfc_main$i = defineComponent({
  name: "RoboIcon",
  props: {
    icon: {
      type: String,
      default: null
    }
  }
});
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  return _ctx.icon ? (openBlock(), createBlock(_component_font_awesome_icon, {
    key: 0,
    icon: _ctx.icon,
    class: "icon"
  }, null, 8, ["icon"])) : createCommentVNode("", true);
}
var RoboIcon = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
var Input_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-input[data-v-ab709078]{--background: var(--color-light);--border: var(--color-dark);--border-active: var(--color-blue);--color: var(--color-dark);--label: var(--color-dark);--label-active: var(--color-blue);position:relative}.robo-input input[data-v-ab709078]{background-color:var(--background);border:1px solid var(--border);color:var(--color);font-family:inherit;font-size:inherit;font-weight:700;padding:var(--space);transition:.2s all ease;width:100%}.robo-input-label[data-v-ab709078]{color:var(--label);left:var(--space);position:absolute;top:calc(var(--space) * .5);transition:.2s all ease}.robo-input--labeled input[data-v-ab709078]{padding-top:calc(var(--space) * 2)}.robo-input--focused input[data-v-ab709078]{border-color:var(--border-active)}.robo-input--focused .robo-input-label[data-v-ab709078]{color:var(--label-active)}.robo-input .robo-details[data-v-ab709078]{position:absolute;top:calc(var(--space) * (-.5));right:calc(var(--space) * (-.5))}.robo-input--disabled .robo-input-label[data-v-ab709078]{color:var(--color-gray)}.robo-input--disabled input[data-v-ab709078]{border-color:var(--color-gray)}\n")();
const _sfc_main$h = defineComponent({
  name: "RoboInput",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    inputType: {
      type: String,
      default: "text"
    },
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: null
    },
    tip: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      focusedStatus: false
    };
  },
  emits: ["update:modelValue"],
  computed: {
    classes() {
      return {
        [`robo-input`]: true,
        [`robo-input--labeled`]: this.label,
        [`robo-input--focused`]: this.focusedStatus,
        [`robo-input--disabled`]: this.disabled
      };
    },
    inputModel: {
      get() {
        if (!this.modelValue) {
          console.warn("[robonomics-ui-vue3 warn]: `robo-input` component is missing required v-model directive");
        } else {
          return this.modelValue;
        }
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    },
    labelSize() {
      return this.focusedStatus ? "small" : "tiny";
    }
  },
  methods: {
    focused() {
      this.focusedStatus = true;
    },
    blurred() {
      this.focusedStatus = false;
    }
  }
});
const _hoisted_1$9 = ["type", "placeholder", "disabled"];
const _hoisted_2$6 = ["innerHTML"];
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_text = resolveComponent("robo-text");
  const _component_robo_details = resolveComponent("robo-details");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    _ctx.label ? (openBlock(), createBlock(_component_robo_text, {
      key: 0,
      class: "robo-input-label",
      innerHTML: _ctx.label,
      size: _ctx.labelSize,
      weight: "bold"
    }, null, 8, ["innerHTML", "size"])) : createCommentVNode("", true),
    withDirectives(createElementVNode("input", {
      type: _ctx.inputType,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.inputModel = $event),
      placeholder: _ctx.placeholder ? _ctx.placeholder : null,
      onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.focused && _ctx.focused(...args)),
      onBlur: _cache[2] || (_cache[2] = (...args) => _ctx.blurred && _ctx.blurred(...args)),
      disabled: _ctx.disabled
    }, null, 40, _hoisted_1$9), [
      [vModelDynamic, _ctx.inputModel]
    ]),
    _ctx.tip ? (openBlock(), createBlock(_component_robo_details, {
      key: 1,
      summary: {
        text: "i",
        button: {
          size: "small"
        }
      },
      tooltip: {
        placement: "bottom-end"
      }
    }, {
      default: withCtx(() => [
        createElementVNode("div", { innerHTML: _ctx.tip }, null, 8, _hoisted_2$6)
      ]),
      _: 1
    })) : createCommentVNode("", true)
  ], 2);
}
var RoboInput = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__scopeId", "data-v-ab709078"]]);
var Layout_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-layout[data-v-d408a476]{position:relative}.robo-layout-screen[data-v-d408a476]{min-height:100vh}.robo-layout-footer[data-v-d408a476]{padding-bottom:calc(var(--space) * 6)}\n")();
const _sfc_main$g = defineComponent({
  name: "RoboLayout",
  props: {
    screen: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return {
        [`robo-layout`]: true,
        [`robo-layout-screen`]: this.screen,
        [`robo-layout-footer`]: this.footer
      };
    }
  }
});
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
var RoboLayout = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-d408a476"]]);
var LayoutFooter_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-layout-footer[data-v-bdd403de]{padding-top:var(--space);padding-bottom:var(--space);border-top:1px solid var(--color-text);position:absolute;left:0;bottom:0;width:100%}\n")();
const _sfc_main$f = defineComponent({
  name: "RoboLayoutFooter"
});
const _hoisted_1$8 = { class: "robo-layout-footer" };
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("footer", _hoisted_1$8, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var RoboLayoutFooter = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-bdd403de"]]);
var LayoutSection_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-layout-section[data-v-d89c54ee]{position:relative;max-width:var(--layout-maxwidth);padding-left:var(--gap-layout);padding-right:var(--gap-layout)}.robo-layout-section--dark[data-v-d89c54ee]{background-color:var(--color-dark);--color-text: var(--color-light);--color-link: var(--color-green);--color-link-hover: var(--color-light)}\n")();
const _sfc_main$e = defineComponent({
  name: "RoboLayoutSection",
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return {
        [`robo-layout-section`]: true,
        [`robo-layout-section--dark`]: this.dark
      };
    }
  }
});
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
var RoboLayoutSection = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-d89c54ee"]]);
var Link_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-link--disabled[data-v-3a5a1f0e]{pointer-events:none;filter:grayscale(1) opacity(.5)}\n")();
const _sfc_main$d = defineComponent({
  name: "RoboLink",
  props: {
    to: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return {
        [`robo-link`]: true,
        [`robo-link--disabled`]: this.disabled || !this.to
      };
    }
  },
  methods: {
    external() {
      if (this.to) {
        let parser = document.createElement("a");
        parser.to = this.to;
        if (parser.host !== window.location.host) {
          return true;
        }
      }
    }
  }
});
const _hoisted_1$7 = ["href", "target", "rel"];
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("a", {
    href: _ctx.to ? _ctx.to : "#",
    class: normalizeClass(_ctx.classList),
    target: _ctx.external() ? "_blank" : null,
    rel: _ctx.external() ? "noopener" : null
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 10, _hoisted_1$7);
}
var RoboLink = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-3a5a1f0e"]]);
var List_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-list[data-v-723ba8f1]{list-style:none}\n")();
const _sfc_main$c = defineComponent({
  name: "RoboList",
  props: {
    fullLine: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: "line-vertical",
      validator: function(value) {
        return ["line-vertical", "line-gorizontal"].indexOf(value) !== -1;
      }
    },
    type: {
      type: String,
      default: "unordered",
      validator: function(value) {
        return ["unordered", "ordered"].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    classList() {
      return {
        [`robo-list`]: true,
        [`robo-list-fullline`]: this.fullLine,
        [`robo-list--theme-${this.theme}`]: this.theme
      };
    },
    element() {
      if (this.type === "unordered") {
        return "ul";
      } else if (this.type === "ordered") {
        return "ol";
      }
    }
  }
});
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.element), {
    class: normalizeClass(_ctx.classList)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]),
    _: 3
  }, 8, ["class"]);
}
var RoboList = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-723ba8f1"]]);
var ListItem_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => 'li[data-v-066ee382]{margin-bottom:var(--gap-text);position:relative;padding-left:var(--gap-text)}li[data-v-066ee382]:before{content:"";min-width:.4rem;height:1.4rem;border-left:.4rem solid var(--color-text);position:absolute;top:.4rem;left:0}ol[data-v-066ee382]{counter-reset:counter}ol li[data-v-066ee382]{counter-increment:counter;padding-left:calc(var(--gap-text)*1.5)}ol li[data-v-066ee382]:before{content:counter(counter);font-weight:700;padding:0 .4rem;display:flex;align-items:center}.robo-list-fullline li[data-v-066ee382]:before{height:100%}.robo-list--theme-line-gorizontal li[data-v-066ee382]:first-child{border-top:.1rem solid var(--color-text)}.robo-list--theme-line-gorizontal li[data-v-066ee382]{border-bottom:.1rem solid var(--color-text);padding:calc(var(--gap-text) * .4) 0;margin:0}.robo-list--theme-line-gorizontal li[data-v-066ee382]:before{display:none}\n')();
const _sfc_main$b = defineComponent({
  name: "RoboListItem",
  computed: {
    classList() {
      return {
        [`robo-list-item`]: true
      };
    }
  }
});
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(_ctx.classList)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
var RoboListItem = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-066ee382"]]);
var Loader_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-loader[data-v-1fc89cbb]{--loader-color: var(--color-text);display:inline-block;vertical-align:middle;width:calc(var(--space) * 1.5)}.robo-loader--stroke[data-v-1fc89cbb]{stroke:var(--loader-color);fill:none}.robo-loader--fill[data-v-1fc89cbb]{fill:var(--loader-color);stroke:none}\n")();
const _sfc_main$a = defineComponent({
  name: "RoboLoader",
  props: {
    type: {
      type: String,
      default: "default",
      validator: function(value) {
        return ["default"].indexOf(value) !== -1;
      }
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    css() {
      if (this.color) {
        return {
          "--loader-color": this.color
        };
      }
    }
  }
});
const _hoisted_1$6 = {
  key: 0,
  class: "robo-loader-1",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  viewBox: "0 0 100 100",
  "enable-background": "new 0 0 100 100",
  "xml:space": "preserve"
};
const _hoisted_2$5 = /* @__PURE__ */ createStaticVNode('<path class="robo-loader--fill" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z" data-v-1fc89cbb><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="2s" from="0 50 50" to="360 50 50" repeatCount="indefinite" data-v-1fc89cbb></animateTransform></path><path class="robo-loader--fill" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z" data-v-1fc89cbb><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="-360 50 50" repeatCount="indefinite" data-v-1fc89cbb></animateTransform></path><path class="robo-loader--fill" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5L82,35.7z" data-v-1fc89cbb><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="2s" from="0 50 50" to="360 50 50" repeatCount="indefinite" data-v-1fc89cbb></animateTransform></path>', 3);
const _hoisted_5$2 = [
  _hoisted_2$5
];
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "robo-loader",
    style: normalizeStyle(_ctx.css)
  }, [
    _ctx.type === "default" ? (openBlock(), createElementBlock("svg", _hoisted_1$6, _hoisted_5$2)) : createCommentVNode("", true)
  ], 4);
}
var RoboLoader = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-1fc89cbb"]]);
var Logo_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-logo[data-v-9050c3ac]{display:inline-block;vertical-align:middle}.robo-logo-sign[data-v-9050c3ac]{width:100%;height:100%;max-width:3.5rem}.robo-logo-sign .stroke[data-v-9050c3ac]{fill:none;stroke:var(--color-text);stroke-width:.3;stroke-miterlimit:10}.robo-logo-text span[data-v-9050c3ac],.robo-logo-text b[data-v-9050c3ac]{display:block}.robo-logo-text b[data-v-9050c3ac]{font-size:calc(var(--font-size) * .8)}.robo-logo-text span[data-v-9050c3ac]{font-weight:300;font-size:calc(var(--font-size) * .5)}.robo-logo--link[data-v-9050c3ac]{text-decoration:none;transition:all .3s ease-out}.robo-logo--link[data-v-9050c3ac]:hover{color:var(--color-link)}.robo-logo--link:hover .robo-logo-sign .stroke[data-v-9050c3ac]{stroke:var(--color-link)}.robo-logo--link:hover .robo-logo-sign .fill[data-v-9050c3ac]{fill:var(--color-link)}.robo-logo--title[data-v-9050c3ac]{display:grid;grid-template-columns:var(--size-logo-title-gorizontal) 1fr;gap:var(--space);text-align:left;color:var(--color-text)}.robo-logo--title.robo-logo--vertical[data-v-9050c3ac]{grid-template-columns:none;grid-template-rows:6rem 1fr;justify-content:center;justify-items:center;align-content:center;align-items:center;text-align:center}.robo-logo--animate .robo-logo-sign .stroke[data-v-9050c3ac]{stroke-dasharray:100;stroke-dashoffset:1000;animation:svgStrokeDash 10s linear .3s infinite}.robo-logo--animate.robo-logo--title .robo-logo-title span[data-v-9050c3ac],.robo-logo--animate.robo-logo--title .robo-logo-title b[data-v-9050c3ac]{transform:translateY(1rem);visibility:hidden;opacity:0}.robo-logo--animate.robo-logo--title .robo-logo-title b[data-v-9050c3ac]{animation:FadeIn .4s linear .2s forwards,TrasnalteYnone .4s linear .2s forwards}.robo-logo--animate.robo-logo--title .robo-logo-title span[data-v-9050c3ac]{animation:FadeIn .3s var(--animation-bump) .5s forwards,TrasnalteYnone .3s var(--animation-bump) .5s forwards}.robo-logo--light .robo-logo-sign .stroke[data-v-9050c3ac]{stroke:var(--color-card-background)}.robo-logo--light .robo-logo-sign .fill[data-v-9050c3ac]{fill:var(--color-card-background)}.robo-logo--light.robo-logo--title[data-v-9050c3ac],.robo-logo--light.robo-logo--link[data-v-9050c3ac]:hover{color:var(--color-card-background)}.robo-logo--light.robo-logo--link:hover .robo-logo-sign .stroke[data-v-9050c3ac]{stroke:var(--color-card-background)}.robo-logo--light.robo-logo--link:hover .robo-logo-sign .fill[data-v-9050c3ac]{fill:var(--color-card-background)}@media screen and (max-width: 700px){.robo-logo--media-collapse .robo-logo-text[data-v-9050c3ac]{display:none}.robo-logo--title[data-v-9050c3ac]{display:block}}\n")();
const _sfc_main$9 = defineComponent({
  name: "RoboLogo",
  props: {
    href: {
      type: String,
      default: null
    },
    vertical: {
      type: Boolean,
      default: false
    },
    title: {
      type: Boolean,
      default: false
    },
    animate: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    mediaMobile: {
      type: String,
      default: "none",
      validator: function(value) {
        return ["none", "collapse", "transfer"].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    classList() {
      return {
        [`robo-logo`]: true,
        [`robo-logo--link`]: this.href,
        [`robo-logo--vertical`]: this.vertical,
        [`robo-logo--title`]: this.title,
        [`robo-logo--animate`]: this.animate,
        [`robo-logo--light`]: this.light,
        [`robo-logo--media-${this.mediaMobile}`]: this.mediaMobile
      };
    }
  },
  methods: {
    external() {
      if (this.href) {
        let parser = document.createElement("a");
        parser.href = this.href;
        if (parser.host !== window.location.host) {
          return true;
        }
      }
    }
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-9050c3ac"), n = n(), popScopeId(), n);
const _hoisted_1$5 = {
  class: "robo-logo-sign",
  "aria-hidden": "true",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  viewBox: "0 0 45.5 40",
  style: { "enable-background": "new 0 0 45.5 40" },
  "xml:space": "preserve"
};
const _hoisted_2$4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", {
  class: "stroke",
  d: "M23,1.4L1.5,38.7h43.1L23,1.4z"
}, null, -1));
const _hoisted_3$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", {
  class: "fill",
  d: "M43.3,37.1c0.8-0.4,1.7,0,2,0.7c0.4,0.8,0,1.7-0.7,2s-1.7,0-2-0.7c0,0,0,0,0,0C42.2,38.4,42.5,37.5,43.3,37.1C43.3,37.1,43.3,37.1,43.3,37.1"
}, null, -1));
const _hoisted_4$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", {
  class: "fill",
  d: "M23.1,0c0.8,0,1.5,0.7,1.5,1.5S23.9,3,23.1,3c-0.8,0-1.5-0.7-1.5-1.5c0,0,0,0,0,0C21.5,0.7,22.2,0,23.1,0"
}, null, -1));
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", {
  class: "fill",
  d: "M1.5,37C2.4,37,3,37.6,3,38.5S2.4,40,1.5,40S0,39.3,0,38.5c0,0,0,0,0,0C0,37.6,0.7,37,1.5,37C1.5,37,1.5,37,1.5,37"
}, null, -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", {
  class: "fill",
  d: "M13.8,32.1h18.8l-9.4-5L13.8,32.1z"
}, null, -1));
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", {
  class: "fill",
  d: "M22.9,15l-9.6,16.6l9.6-5L22.9,15z"
}, null, -1));
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", {
  class: "fill",
  d: "M33.1,31.5L23.6,15l0.1,11.4L33.1,31.5z"
}, null, -1));
const _hoisted_9 = [
  _hoisted_2$4,
  _hoisted_3$2,
  _hoisted_4$1,
  _hoisted_5$1,
  _hoisted_6,
  _hoisted_7,
  _hoisted_8
];
const _hoisted_10 = {
  key: 0,
  class: "robo-logo-text"
};
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("b", null, "Robonomics Dapp", -1));
const _hoisted_12 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, "Manage your IoT with Robonomics Services", -1));
const _hoisted_13 = [
  _hoisted_11,
  _hoisted_12
];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.href ? "a" : "div"), {
    href: _ctx.href,
    class: normalizeClass(_ctx.classList),
    target: _ctx.external() ? "_blank" : null,
    rel: _ctx.external() ? "noopener" : null
  }, {
    default: withCtx(() => [
      (openBlock(), createElementBlock("svg", _hoisted_1$5, _hoisted_9)),
      _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_10, _hoisted_13)) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["href", "class", "target", "rel"]);
}
var RoboLogo = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-9050c3ac"]]);
var Progress_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-progress[data-v-553b758b]{position:relative;height:3px;background-color:var(--color-blue-light);overflow:hidden}.robo-progress span[data-v-553b758b]{background-color:var(--color-blue);height:100%;position:absolute;top:0}.robo-progress-loading:not(.robo-progress-number) span[data-v-553b758b]{left:-20%;width:20%;will-change:left,transform;animation:cardLoading-553b758b 2s linear .4s infinite}.robo-progress-number span[data-v-553b758b]{left:0;width:0;will-change:width;transition:.2s ease-out width}@keyframes cardLoading-553b758b{0%{transform:scaleX(1);left:-20%}50%{transform:scaleX(1.2);left:35%}to{transform:scaleX(1);left:100%}}\n")();
const _sfc_main$8 = defineComponent({
  name: "RoboProgress",
  props: {
    progress: {
      type: Number,
      default: null
    }
  },
  computed: {
    classList() {
      return {
        [`robo-progress`]: true,
        [`robo-progress-loading`]: !this.progress,
        [`robo-progress-number`]: this.progress
      };
    }
  }
});
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList)
  }, [
    createElementVNode("span", {
      style: normalizeStyle("width: " + this.progress + "%")
    }, null, 4)
  ], 2);
}
var RoboProgress = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-553b758b"]]);
var RowMain_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-row-main--valign-top[data-v-8fd2b52c]{align-self:start}.robo-row-main--valign-center[data-v-8fd2b52c]{align-self:center}.robo-row-main--valign-bottom[data-v-8fd2b52c]{align-self:end}.robo-row-main--align-left[data-v-8fd2b52c]{justify-self:start}.robo-row-main--align-center[data-v-8fd2b52c]{justify-self:center}.robo-row-main--align-right[data-v-8fd2b52c]{justify-self:end}\n")();
const _sfc_main$7 = defineComponent({
  name: "RoboRowMain",
  props: {
    valign: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "center", "bottom"].includes(value);
      }
    },
    align: {
      type: String,
      default: "left",
      validator(value) {
        return ["left", "center", "right"].includes(value);
      }
    }
  },
  computed: {
    classList() {
      return {
        [`robo-row-main`]: true,
        [`robo-row-main--valign-${this.valign}`]: true,
        [`robo-row-main--align-${this.align}`]: true
      };
    }
  }
});
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
var RoboRowMain = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-8fd2b52c"]]);
var Section_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-section[data-v-7083a870]{--offset: var(--gap-layout) }.robo-section[data-v-7083a870]:not(:last-child){margin-bottom:var(--offset)}.robo-section-offset-x0[data-v-7083a870]{--offset: 0}.robo-section-offset-x05[data-v-7083a870]{--offset: calc(var(--gap-layout) * .5)}.robo-section-offset-x1[data-v-7083a870]{--offset: var(--gap-layout)}.robo-section-offset-x2[data-v-7083a870]{--offset: calc( var(--gap-layout) * 2)}.robo-section-offset-x4[data-v-7083a870]{--offset: calc( var(--gap-layout) * 4)}\n")();
const _sfc_main$6 = defineComponent({
  name: "RoboSection",
  props: {
    offset: {
      type: String,
      default: "x2",
      validator(value) {
        return ["x0", "x05", "x1", "x2", "x4"].includes(value);
      }
    }
  },
  computed: {
    classes() {
      return {
        [`robo-section`]: true,
        [`robo-section-offset-${this.offset}`]: this.offset
      };
    }
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", {
    class: normalizeClass(_ctx.classes)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
var RoboSection = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-7083a870"]]);
var Select_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-select[data-v-6de30c37],select[data-v-6de30c37]{display:inline-block;vertical-align:middle;cursor:pointer}.robo-select[data-v-6de30c37]{position:relative}.robo-select--block[data-v-6de30c37]{display:block}select[data-v-6de30c37]{font-family:inherit;font-size:inherit;font-weight:700;--webkit-appearance: none;appearance:none;border:0;box-sizing:content-box;display:block;width:100%;padding-right:calc(var(--input-padding-g) * .5 + var(--select-tog-size))}.robo-select[data-v-6de30c37]:not(.robo-select--clean){background-color:var(--input-bg);color:var(--input-text-color);border:var(--input-border-width) solid var(--input-border-color)}.robo-select:not(.robo-select--clean) select[data-v-6de30c37]{padding-left:var(--input-padding-g);padding-top:var(--input-padding-v);padding-bottom:var(--input-padding-v)}.robo-select.robo-select--clean[data-v-6de30c37],.robo-select.robo-select--clean select[data-v-6de30c37]{color:var(--input-text-color)}.icon[data-v-6de30c37]{position:absolute;right:calc(var(--input-padding-g) * .5);top:calc(50% - var(--select-tog-size) * .5 - .125em);pointer-events:none}.robo-select--disabled[data-v-6de30c37],.robo-select--disabled select[data-v-6de30c37]{cursor:not-allowed}\n")();
const _sfc_main$5 = defineComponent({
  name: "RoboSelect",
  props: {
    block: {
      type: Boolean,
      default: false
    },
    clean: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    options: {
      type: Object,
      default: null,
      required: true
    },
    values: {
      type: Array,
      default: null
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ["update:modelValue"],
  computed: {
    classList() {
      return {
        [`robo-select`]: true,
        [`robo-select--clean`]: this.clean,
        [`robo-select--block`]: this.block,
        [`robo-select--disabled`]: this.disabled || this.options.length < 2
      };
    },
    selected: {
      get() {
        if (!this.modelValue) {
          console.warn("[robonomics-ui-vue3 warn]: `robo-select` component is missing required v-model directive");
        } else {
          return this.modelValue;
        }
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    }
  },
  methods: {
    setWidth() {
    }
  },
  mounted() {
    this.setWidth();
  }
});
const _hoisted_1$4 = ["name", "disabled"];
const _hoisted_2$3 = ["value"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_icon = resolveComponent("robo-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList)
  }, [
    withDirectives(createElementVNode("select", {
      name: _ctx.name,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.selected = $event),
      ref: "select",
      onChange: _cache[1] || (_cache[1] = (...args) => _ctx.setWidth && _ctx.setWidth(...args)),
      disabled: _ctx.disabled || _ctx.options.length < 2 ? true : null
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option, index2) => {
        return openBlock(), createElementBlock("option", {
          key: index2,
          value: _ctx.values ? _ctx.values[index2] : option
        }, toDisplayString(option), 9, _hoisted_2$3);
      }), 128))
    ], 40, _hoisted_1$4), [
      [vModelSelect, _ctx.selected]
    ]),
    _ctx.options.length > 1 ? (openBlock(), createBlock(_component_robo_icon, {
      key: 0,
      icon: "sort-down"
    })) : createCommentVNode("", true)
  ], 2);
}
var RoboSelect = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-6de30c37"]]);
var Sidebar_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-sidebar[data-v-b609e0c8]{font-size:calc(var(--font-size) * .85);text-transform:uppercase}.robo-sidebar[data-v-b609e0c8]:not(:last-child){margin-bottom:calc(var(--space) * 3)}.robo-sidebar-title[data-v-b609e0c8]{font-weight:700;margin-bottom:calc(var(--space) * .5)}.robo-sidebar-title>*[data-v-b609e0c8]{display:inline-block;vertical-align:middle}.robo-sidebar-title .icon[data-v-b609e0c8]{margin-right:var(--space)}.robo-sidebar-content[data-v-b609e0c8]{padding-left:calc(var(--space) * 2.2)}\n")();
const _sfc_main$4 = defineComponent({
  name: "RoboSidebar",
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    }
  }
});
const _hoisted_1$3 = {
  "aria-label": "Main App Navigation",
  role: "navigation",
  class: "robo-sidebar"
};
const _hoisted_2$2 = {
  key: 0,
  class: "robo-sidebar-title"
};
const _hoisted_3$1 = { class: "robo-sidebar-content" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  return openBlock(), createElementBlock("nav", _hoisted_1$3, [
    _ctx.title ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
      _ctx.icon ? (openBlock(), createBlock(_component_font_awesome_icon, {
        key: 0,
        icon: _ctx.icon,
        class: "icon"
      }, null, 8, ["icon"])) : createCommentVNode("", true),
      createElementVNode("span", null, toDisplayString(_ctx.title), 1)
    ])) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_3$1, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ])
  ]);
}
var RoboSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-b609e0c8"]]);
var SidebarItem_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-sidebar-itemWrap[data-v-8b9c8af0]{margin-left:calc(var(--space) * (-1.3));margin-bottom:calc(var(--space) * .5)}.robo-sidebar-item[data-v-8b9c8af0]{text-decoration:none;color:var(--color-text);padding-left:var(--space);border-left:4px solid transparent}.robo-sidebar-item[aria-current][data-v-8b9c8af0]{color:var(--color-link);border-color:var(--color-link)}.robo-sidebar-item--disabled[data-v-8b9c8af0]{pointer-events:none;filter:grayscale(1);opacity:.6}.robo-sidebar-item[data-v-8b9c8af0]:not(.robo-sidebar-item--disabled):not([aria-current]):hover{color:var(--color-link-hover);border-color:var(--color-link-hover)}.external-icon[data-v-8b9c8af0]{margin-left:calc(var(--space) * .5)}\n")();
const _sfc_main$3 = defineComponent({
  name: "RoboSidebarItem",
  props: {
    href: {
      type: String,
      default: null
    },
    current: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return {
        [`robo-sidebar-item`]: true,
        [`robo-sidebar-item--disabled`]: !this.href || this.disabled
      };
    }
  },
  methods: {
    external() {
      if (this.href) {
        let parser = document.createElement("a");
        parser.href = this.href;
        if (parser.host !== window.location.host) {
          return true;
        }
      }
    }
  }
});
const _hoisted_1$2 = { class: "robo-sidebar-itemWrap" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.href ? "a" : "span"), {
      href: _ctx.href,
      class: normalizeClass(_ctx.classList),
      target: _ctx.external() ? "_blank" : null,
      rel: _ctx.external() ? "noopener" : null,
      "aria-current": _ctx.current ? "page" : null
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        _ctx.external() ? (openBlock(), createBlock(_component_font_awesome_icon, {
          key: 0,
          icon: "arrow-up-right-from-square",
          class: "external-icon"
        })) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["href", "class", "target", "rel", "aria-current"]))
  ]);
}
var RoboSidebarItem = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-8b9c8af0"]]);
var Status_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-status[data-v-6bdedc81]{--status-color: var(--color-dark);--status-gap: calc(var(--gap-layout) * .5);align-items:center;display:inline-flex;gap:var(--status-gap);line-height:1.2}.robo-status .icon[data-v-6bdedc81]{color:var(--status-color)}.robo-status--success[data-v-6bdedc81]{--status-color: var(--color-green)}.robo-status--info[data-v-6bdedc81]{--status-color: var(--color-blue)}.robo-status--warning[data-v-6bdedc81]{--status-color: var(--color-orange)}.robo-status--error[data-v-6bdedc81]{--status-color: var(--color-red)}.robo-status--gap-top[data-v-6bdedc81]{margin-top:var(--status-gap)}.robo-status--gap-right[data-v-6bdedc81]{margin-right:var(--status-gap)}.robo-status--gap-bottom[data-v-6bdedc81]{margin-bottom:var(--status-gap)}.robo-status--gap-left[data-v-6bdedc81]{margin-left:var(--status-gap)}.robo-status--gap-all[data-v-6bdedc81]{margin:var(--status-gap)}\n")();
const _sfc_main$2 = defineComponent({
  name: "RoboStatus",
  props: {
    type: {
      type: String,
      default: null,
      required: true,
      validator: function(value) {
        return ["success", "info", "warning", "error"].indexOf(value) !== -1;
      }
    },
    gap: {
      type: String,
      default: null,
      validator: function(value) {
        return ["top", "right", "bottom", "left", "all"].indexOf(value) !== -1;
      }
    },
    textRight: {
      type: String,
      default: null
    },
    textLeft: {
      type: String,
      default: null
    }
  },
  computed: {
    classList() {
      return {
        [`robo-status`]: true,
        [`robo-status--${this.type}`]: this.type,
        [`robo-status--gap-${this.gap}`]: this.gap
      };
    },
    icon() {
      switch (this.type) {
        case "success":
          return "circle-check";
        case "info":
          return "circle-info";
        case "warning":
          return "circle-exclamation";
        case "error":
          return "circle-xmark";
      }
    }
  }
});
const _hoisted_1$1 = ["innerHTML"];
const _hoisted_2$1 = ["innerHTML"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_icon = resolveComponent("robo-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList)
  }, [
    _ctx.textLeft ? (openBlock(), createElementBlock("span", {
      key: 0,
      innerHTML: _ctx.textLeft
    }, null, 8, _hoisted_1$1)) : createCommentVNode("", true),
    createVNode(_component_robo_icon, { icon: _ctx.icon }, null, 8, ["icon"]),
    _ctx.textRight ? (openBlock(), createElementBlock("span", {
      key: 1,
      innerHTML: _ctx.textRight
    }, null, 8, _hoisted_2$1)) : createCommentVNode("", true)
  ], 2);
}
var RoboStatus = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-6bdedc81"]]);
var TemplateSubsriptionItem_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-template-subsribe-item--new .robo-input[data-v-d8c62a14]{--color: var(--color-blue);--border: var(--border-active);--label: var(--label-active)}.robo-template-subsribe-item--loading[data-v-d8c62a14]{pointer-events:none;opacity:.7}.robo-template-subsribe-item--deleted .robo-input[data-v-d8c62a14]{pointer-events:none;opacity:.3}.robo-template-subsribe-item[data-v-d8c62a14]{position:relative}.robo-template-subsribe-item-message[data-v-d8c62a14]{position:absolute;top:var(--space);left:0}@keyframes hide-d8c62a14{to{opacity:0;visibility:hidden}}@keyframes blink-d8c62a14{35%{opacity:.4}}.robo-template-subsribe-item.removeDelay[data-v-d8c62a14]{animation:blink-d8c62a14 1s linear infinite}.robo-template-subsribe-item.remove[data-v-d8c62a14]{animation:hide-d8c62a14 .4s linear .2s forwards}@media screen and (max-width: 1200px){.robo-grid--mobile-transfer[data-v-d8c62a14]{grid-template-columns:1fr!important}}\n")();
const _sfc_main$1 = defineComponent({
  name: "RoboTemplateSubsriptionItem",
  props: {
    address: {
      type: String,
      default: " "
    },
    name: {
      type: String,
      default: " "
    },
    deleteDelayTime: {
      type: Number,
      default: 10
    },
    deviceInfoLink: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: "new",
      validator(value) {
        return ["new", "loading", "added", "deleted"].includes(value);
      }
    },
    type: {
      type: String,
      default: "subsription",
      validator(value) {
        return ["subsription", "device"].includes(value);
      }
    }
  },
  data() {
    return {
      statusBufer: this.status,
      itemOffset: "x05",
      screenWidth: 0
    };
  },
  emits: ["update:address", "update:name", "onAdd", "onDelete", "onCancel"],
  computed: {
    classes() {
      return {
        [`robo-template-subsribe-item`]: true,
        [`robo-template-subsribe-item--${this.status}`]: this.status
      };
    },
    addressModel: {
      get() {
        return this.address;
      },
      set(value) {
        this.$emit("update:address", value);
      }
    },
    nameModel: {
      get() {
        return this.name;
      },
      set(value) {
        this.$emit("update:name", value);
      }
    },
    columnsWidth() {
      if (this.type === "subsription") {
        return "auto auto 100px";
      } else {
        return "100px auto auto 100px";
      }
    }
  },
  methods: {
    deleteDelay() {
      if (this.statusBufer === "added") {
        this.statusBufer = "deleted";
        this.$refs.item.classList.add("removeDelay");
        if (this.statusBufer === "added") {
          return;
        }
        setTimeout(() => {
          if (this.statusBufer === "deleted") {
            this.$emit("onDelete");
            this.$refs.item.classList.remove("removeDelay");
            this.$refs.item.classList.add("remove");
            setTimeout(() => {
              this.$refs.item.remove();
            }, 1e3);
          }
        }, 1e3 * this.deleteDelayTime);
      }
    },
    deleteCancel() {
      if (this.statusBufer === "deleted") {
        this.statusBufer = "added";
        this.$refs.item.classList.remove("removeDelay", "remove");
        this.$emit("onCancel");
      }
    },
    itemOffsetCalc() {
      if (window.innerWidth > 1200) {
        return "x05";
      } else if (window.innerWidth > 700) {
        return "x2";
      } else {
        return "x4";
      }
    }
  },
  mounted() {
    const self2 = this;
    this.itemOffset = this.itemOffsetCalc();
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", function() {
      self2.screenWidth = window.innerWidth;
      self2.itemOffset = self2.itemOffsetCalc();
    });
  }
});
const _hoisted_1 = /* @__PURE__ */ createTextVNode(" Add ");
const _hoisted_2 = /* @__PURE__ */ createTextVNode(" Wait ");
const _hoisted_3 = /* @__PURE__ */ createTextVNode(" Remove ");
const _hoisted_4 = /* @__PURE__ */ createTextVNode("Restore");
const _hoisted_5 = /* @__PURE__ */ createTextVNode(" Edit ");
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_robo_button = resolveComponent("robo-button");
  const _component_robo_grid_item = resolveComponent("robo-grid-item");
  const _component_robo_input = resolveComponent("robo-input");
  const _component_robo_grid = resolveComponent("robo-grid");
  const _component_robo_text = resolveComponent("robo-text");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes),
    ref: "item"
  }, [
    createVNode(_component_robo_grid, {
      columns: _ctx.columnsWidth,
      valign: "center",
      offset: _ctx.itemOffset,
      gap: "x1"
    }, {
      default: withCtx(() => [
        _ctx.type === "device" ? (openBlock(), createBlock(_component_robo_grid_item, {
          key: 0,
          mediaMobile: "transfer"
        }, {
          default: withCtx(() => [
            _ctx.statusBufer !== "new" && _ctx.screenWidth > 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 0,
              block: "",
              fitLabeled: "",
              "icon-left": "power-off",
              type: "ok"
            })) : createCommentVNode("", true),
            _ctx.statusBufer !== "new" && _ctx.screenWidth < 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 1,
              block: "",
              fitLabeled: "",
              "icon-left": "power-off",
              type: "ok"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.nameModel), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        })) : createCommentVNode("", true),
        createVNode(_component_robo_grid_item, { mediaMobile: "transfer" }, {
          default: withCtx(() => [
            createVNode(_component_robo_input, {
              label: "Address",
              placeholder: "Robonomics parachain address",
              modelValue: _ctx.addressModel,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.addressModel = $event),
              disabled: _ctx.statusBufer !== "new" ? true : false
            }, null, 8, ["modelValue", "disabled"])
          ]),
          _: 1
        }),
        createVNode(_component_robo_grid_item, null, {
          default: withCtx(() => [
            createVNode(_component_robo_input, {
              label: "Name",
              modelValue: _ctx.nameModel,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.nameModel = $event),
              tip: "You may take custom name for the account by <a href='https://wiki.polkadot.network/docs/learn-identity' target='_blank'>setting an identity</a>"
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        createVNode(_component_robo_grid_item, null, {
          default: withCtx(() => [
            _ctx.statusBufer === "new" && _ctx.screenWidth > 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 0,
              "icon-left": "plus",
              outlined: "",
              fitLabeled: "",
              block: "",
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("onAdd"))
            })) : createCommentVNode("", true),
            _ctx.statusBufer === "new" && _ctx.screenWidth < 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 1,
              "icon-left": "plus",
              outlined: "",
              fitLabeled: "",
              block: "",
              onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("onAdd"))
            }, {
              default: withCtx(() => [
                _hoisted_1
              ]),
              _: 1
            })) : createCommentVNode("", true),
            _ctx.statusBufer === "loading" && _ctx.screenWidth > 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 2,
              outlined: "",
              fitLabeled: "",
              block: "",
              disabled: "disabled",
              loading: ""
            })) : createCommentVNode("", true),
            _ctx.statusBufer === "loading" && _ctx.screenWidth < 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 3,
              outlined: "",
              fitLabeled: "",
              block: "",
              disabled: "disabled",
              loading: ""
            }, {
              default: withCtx(() => [
                _hoisted_2
              ]),
              _: 1
            })) : createCommentVNode("", true),
            _ctx.statusBufer === "added" && _ctx.type === "subsription" && _ctx.screenWidth > 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 4,
              block: "",
              fitLabeled: "",
              "icon-left": "minus",
              outlined: "",
              type: "alarm",
              onClick: _ctx.deleteDelay
            }, null, 8, ["onClick"])) : createCommentVNode("", true),
            _ctx.statusBufer === "added" && _ctx.type === "subsription" && _ctx.screenWidth < 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 5,
              block: "",
              fitLabeled: "",
              "icon-left": "minus",
              outlined: "",
              type: "alarm",
              onClick: _ctx.deleteDelay
            }, {
              default: withCtx(() => [
                _hoisted_3
              ]),
              _: 1
            }, 8, ["onClick"])) : createCommentVNode("", true),
            _ctx.statusBufer === "deleted" && _ctx.type === "subsription" && _ctx.screenWidth > 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 6,
              block: "",
              fitLabeled: "",
              "icon-left": "arrow-rotate-left",
              outlined: "",
              type: "alarm",
              onClick: _ctx.deleteCancel
            }, null, 8, ["onClick"])) : createCommentVNode("", true),
            _ctx.statusBufer === "deleted" && _ctx.type === "subsription" && _ctx.screenWidth < 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 7,
              block: "",
              fitLabeled: "",
              "icon-left": "arrow-rotate-left",
              outlined: "",
              type: "alarm",
              onClick: _ctx.deleteCancel
            }, {
              default: withCtx(() => [
                _hoisted_4
              ]),
              _: 1
            }, 8, ["onClick"])) : createCommentVNode("", true),
            _ctx.statusBufer === "added" && _ctx.type === "device" && _ctx.deviceInfoLink && _ctx.screenWidth > 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 8,
              block: "",
              fitLabeled: "",
              href: _ctx.deviceInfoLink,
              "icon-left": "pencil",
              outlined: ""
            }, null, 8, ["href"])) : createCommentVNode("", true),
            _ctx.statusBufer === "added" && _ctx.type === "device" && _ctx.deviceInfoLink && _ctx.screenWidth < 1200 ? (openBlock(), createBlock(_component_robo_button, {
              key: 9,
              block: "",
              fitLabeled: "",
              href: _ctx.deviceInfoLink,
              "icon-left": "pencil",
              outlined: ""
            }, {
              default: withCtx(() => [
                _hoisted_5
              ]),
              _: 1
            }, 8, ["href"])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["columns", "offset"]),
    _ctx.statusBufer === "deleted" ? (openBlock(), createBlock(_component_robo_text, {
      key: 0,
      class: "robo-template-subsribe-item-message",
      highlightLabel: "error",
      weight: "bold"
    }, {
      default: withCtx(() => [
        createTextVNode(" Will be deleted on " + toDisplayString(_ctx.deleteDelayTime) + "s ... ", 1)
      ]),
      _: 1
    })) : createCommentVNode("", true)
  ], 2);
}
var RoboTemplateSubsriptionItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-d8c62a14"]]);
var Text_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".robo-text--inline[data-v-7a0ae128]{display:inline-block}.robo-text--gap[data-v-7a0ae128]:not(:last-child){margin-bottom:var(--space)}.robo-text--tiny[data-v-7a0ae128]{font-size:calc(var(--font-size) * .6)}.robo-text--small[data-v-7a0ae128]{font-size:calc(var(--font-size) * .8)}.robo-text--medium[data-v-7a0ae128]{font-size:calc(var(--font-size) * 1.2)}.robo-text--large[data-v-7a0ae128]{font-size:calc(var(--font-size) * 1.5)}.robo-text--bold[data-v-7a0ae128]{font-weight:700}.robo-text--light[data-v-7a0ae128]{font-weight:300}.robo-text--normal[data-v-7a0ae128]{font-weight:400}.robo-text--highlight-success[data-v-7a0ae128]{--input-text-color: var(--color-green);--color-text: var(--color-green);color:var(--color-green)}.robo-text--highlight-error[data-v-7a0ae128]{--input-text-color: var(--color-red);--color-text: var(--color-red);color:var(--color-red)}.robo-text--highlight-link[data-v-7a0ae128]{--input-text-color: var(--color-blue);--color-text: var(--color-blue);color:var(--color-blue)}div[class*=robo-text--highlight-label-][data-v-7a0ae128]{--input-text-color: var(--color-light);--color-text: var(--color-light);color:var(--color-light);padding:calc(var(--space) * .4)}.robo-text--highlight-label-success[data-v-7a0ae128]{background-color:var(--color-green)}.robo-text--highlight-label-error[data-v-7a0ae128]{background-color:var(--color-red)}.robo-text--highlight-label-link[data-v-7a0ae128]{background-color:var(--color-blue)}\n")();
const _sfc_main = defineComponent({
  name: "RoboText",
  props: {
    highlight: {
      type: String,
      default: null,
      validator: function(value) {
        return ["success", "error", "link"].indexOf(value) !== -1;
      }
    },
    highlightLabel: {
      type: String,
      default: null,
      validator: function(value) {
        return ["success", "error", "link"].indexOf(value) !== -1;
      }
    },
    size: {
      type: String,
      default: null,
      validator: function(value) {
        return ["tiny", "small", "medium", "large"].indexOf(value) !== -1;
      }
    },
    weight: {
      type: String,
      default: null,
      validator: function(value) {
        return ["bold", "normal", "light"].indexOf(value) !== -1;
      }
    },
    inline: {
      type: Boolean,
      default: false
    },
    gap: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return {
        [`robo-text`]: true,
        [`robo-text--${this.size}`]: this.size,
        [`robo-text--${this.weight}`]: this.weight,
        [`robo-text--inline`]: this.inline,
        [`robo-text--gap`]: this.gap,
        [`robo-text--highlight-${this.highlight}`]: this.highlight,
        [`robo-text--highlight-label-${this.highlightLabel}`]: this.highlightLabel
      };
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classList)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
var RoboText = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7a0ae128"]]);
var components = {
  RoboAccountPolkadot,
  AccountPolkadotChain,
  RoboAccountPolkadotConnect,
  RoboAccountPolkadotExtensions,
  RoboAlert,
  RoboBalance,
  RoboBreadcrumbs,
  RoboButton,
  RoboCard,
  RoboCardLabel,
  RoboCardLabelSection,
  RoboCardSection,
  RoboCardTitle,
  RoboDetails,
  RoboGrid,
  RoboGridItem,
  RoboIcon,
  RoboInput,
  RoboLayout,
  RoboLayoutFooter,
  RoboLayoutSection,
  RoboLink,
  RoboList,
  RoboListItem,
  RoboLoader,
  RoboLogo,
  RoboProgress,
  RoboRowMain,
  RoboSection,
  RoboSelect,
  RoboSidebar,
  RoboSidebarItem,
  RoboStatus,
  RoboTemplateSubsriptionItem,
  RoboText
};
const faIcons = [
  faArrowDown,
  faArrowRotateLeft,
  faArrowUpRightFromSquare,
  faBars,
  faChartPie,
  faCheck,
  faCloud,
  faComment,
  faCopy,
  faCircleCheck,
  faCircleInfo,
  faCircleExclamation,
  faCircleXmark,
  faEllipsis,
  faEllipsisVertical,
  faGear,
  faHouse,
  faMinus,
  faPencil,
  faPowerOff,
  faPlus,
  faRightLeft,
  faRss,
  faSortDown,
  faSignal,
  faUser,
  faWallet,
  faXmark
];
library$1.add(faIcons);
const robonomicsUI = {
  install(Vue, options) {
    if (!options || !options.store) {
      throw new Error("Please initialise plugin with a Vuex store.");
    }
    options.store.registerModule("robonomicsUIvue", store);
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop];
        Vue.component(component.name, component);
      }
    }
    Vue.component("font-awesome-icon", FontAwesomeIcon);
  }
};
export { robonomicsUI };
