<template>
  <div :class="classList" ref="text" v-bind="$attrs">
    <slot />
    <robo-icon 
      v-if="highlightLabelClose && highlightLabel" 
      @click="close" 
      class="robo-text-close" 
      icon="xmark" 
    />
    <robo-button 
      v-if="copy"  
      @click="clipboard" 
      class="robo-text-copy" 
      clean 
      :iconLeft="clipboardCopied ? 'check' : 'copy'" 
    />
  </div>
</template>

<script setup>
defineOptions({
  name: 'RoboText'
});

import { ref, computed, onMounted, onUpdated, nextTick } from 'vue';

const props = defineProps({
  align: {
    type: String,
    default: null,
    validator: (v) => ['left', 'center', 'right', 'hyphen'].includes(v)
  },
  break: { type: Boolean, default: false },
  copy: { type: Boolean, default: false },
  galign: {
    type: String,
    default: null,
    validator: (v) => ['left', 'center', 'right', 'hyphen'].includes(v)
  },
  gap: { type: Boolean, default: false },
  color: {
    type: String,
    default: null,
    validator: (v) => ['ok', 'error', 'link', 'warning'].includes(v)
  },
  highlight: {
    type: String,
    default: null,
    validator: (v) => ['ok', 'error', 'link', 'warning', 'disabled'].includes(v)
  },
  highlightLabel: {
    type: String,
    default: null,
    validator: (v) => ['ok', 'error', 'link', 'warning'].includes(v)
  },
  highlightLabelClose: { type: Boolean, default: false },
  highlightLabelCloseReopen: { type: Boolean, default: false },
  hyphen: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  lines: {
    type: String,
    default: null,
    validator: (v) => ['dotted', 'dashed', 'solid'].includes(v)
  },
  linemiddle: { type: Boolean, default: false },
  nowrap: { type: [Boolean, Number], default: false },
  offset: {
    type: String,
    default: 'x0',
    validator: (v) => ['x0', 'x025', 'x05', 'x1', 'x2', 'x4'].includes(v)
  },
  paragraphs: { type: Boolean, default: false },
  size: {
    type: String,
    default: null,
    validator: (v) => ['tiny', 'small', 'medium', 'large'].includes(v)
  },
  title: {
    type: String,
    default: null,
    validator: (v) => ['1', '2', '3', '4', '5'].includes(v)
  },
  uppercase: { type: Boolean, default: false },
  weight: {
    type: String,
    default: null,
    validator: (v) =>
      ['bold', 'normal', 'light', 'normal-italic', 'bold-italic'].includes(v)
  },
  mark: { type: String, default: null }
});

const emit = defineEmits(['onClose']);

const clipboardCopied = ref(false);
const contentLength = ref(0);
const text = ref(null);

const calcOffset = computed(() => {
  if (props.title && !props.offset) {
    return 'x1';
  }
  return props.offset || 'x0';
});

// Если nowrap передан как число, сравниваем длину текста с этим числом,
// иначе, если передан Boolean true – применяем nowrap всегда.
const shouldNowrap = computed(() => {
  if (typeof props.nowrap === 'number') {
    return contentLength.value <= props.nowrap;
  }
  return props.nowrap === true;
});

const classList = computed(() => ({
  'robo-text': true,
  [`robo-text--align-${props.align}`]: props.align,
  [`robo-text--galign-${props.galign}`]: props.galign,
  [`robo-text--${props.size}`]: props.size,
  'robo-text--break': props.break,
  [`robo-text--style-${props.weight}`]: props.weight,
  'robo-text--inline': props.inline,
  'robo-text--gap': props.gap,
  [`robo-text--color-${props.color}`]: props.color,
  [`robo-text--highlight-${props.highlight}`]: props.highlight,
  [`robo-text--highlight-label-${props.highlightLabel}`]: props.highlightLabel,
  'robo-text--highlight-label-closable': props.highlightLabelClose,
  'robo-text--hyphen': props.hyphen,
  [`robo-text--offset-${calcOffset.value}`]: true,
  'robo-text--nowrap': shouldNowrap.value,
  open: props.highlightLabelCloseReopen,
  'robo-text--uppercase': props.uppercase,
  [`robo-text--title-${props.title}`]: props.title,
  'robo-text--paragraphs': props.paragraphs,
  [`robo-text--lines-${props.lines}`]: props.lines,
  'robo-text--linemiddle': props.linemiddle
}));

const close = () => {
  text.value.classList.remove('open');
  text.value.classList.add('hide');
  emit('onClose');
};

const clipboard = () => {
  navigator.clipboard.writeText(text.value.innerText);
  clipboardCopied.value = true;
  setTimeout(() => {
    clipboardCopied.value = false;
  }, 1500);
};

const measureContentLength = () => {
  if (text.value) {
    // Используем textContent, чтобы получить чистый текст
    contentLength.value = text.value.textContent.trim().length;
  }
};

onMounted(() => {
  nextTick(measureContentLength);
});
onUpdated(() => {
  nextTick(measureContentLength);
});
</script>

<style>
.robo-text--paragraphs p:not(:last-child) {
  margin-bottom: var(--robo-space);
}

.robo-text-copy {
  margin-left: var(--robo-space);
}

.robo-text[class*='robo-text--lines-'] > *:not(:last-child) {
  --robo-text-lines-padding: 4px;
  border-bottom: 1px solid var(--robo-color-dark);
  margin-bottom: var(--robo-text-lines-padding);
  padding-bottom: var(--robo-text-lines-padding);
}

.robo-text.robo-text--lines-dashed > *:not(:last-child) {
  border-bottom-style: dashed;
}

.robo-text.robo-text--lines-dotted > *:not(:last-child) {
  border-bottom-style: dotted;
}

.robo-text--nowrap {
  white-space: nowrap;
}
</style>

<style scoped>
.robo-text {
  margin-bottom: var(--offset);
  color: var(--robo-color-text);
}

.robo-text--offset-x0 {
  --offset: 0;
}

.robo-text--offset-x025 {
  --offset: calc(var(--gap-layout) * 0.25);
}

.robo-text--offset-x05 {
  --offset: calc(var(--gap-layout) * 0.5);
}

.robo-text--offset-x1 {
  --offset: var(--gap-layout);
}

.robo-text--offset-x2 {
  --offset: calc(var(--gap-layout) * 2);
}

.robo-text--offset-x4 {
  --offset: calc(var(--gap-layout) * 4);
}

.robo-text--inline {
  display: inline;
}

.robo-text--gap:not(:last-child) {
  margin-bottom: var(--robo-space);
}

.robo-text--align-left {
  text-align: left;
}

.robo-text--align-center {
  text-align: center;
}

.robo-text--align-right {
  text-align: right;
}

.robo-text--align-hyphen,
.robo-text--hyphen {
  text-align: justify !important;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

.robo-text--galign-left {
  text-align: left;
}

.robo-text--galign-center {
  text-align: center;
}

.robo-text--galign-right {
  text-align: right;
}

.robo-text--tiny {
  font-size: calc(var(--robo-font-size) * 0.6);
  line-height: 1;
}

.robo-text--small {
  font-size: calc(var(--robo-font-size) * 0.8);
  line-height: 1;
}

.robo-text--medium {
  font-size: calc(var(--robo-font-size) * 1.2);
}

.robo-text--large {
  font-size: calc(var(--robo-font-size) * 1.5);
}

.robo-text--style-bold {
  font-weight: bold;
}

.robo-text--style-light {
  font-weight: 300;
}

.robo-text--style-normal {
  font-weight: normal;
}

.robo-text--style-normal-italic {
  font-style: italic;
}

.robo-text--style-bold-italic {
  font-style: italic;
  font-weight: bold;
}

.robo-text--highlight-warning {
  --robo-color-text: var(--robo-color-orange);
}

.robo-text--highlight-ok {
  --robo-color-text: var(--robo-color-green);
}

.robo-text--highlight-error {
  --robo-color-text: var(--robo-color-red);
}

.robo-text--highlight-link {
  --robo-color-text: var(--robo-color-blue);
}

.robo-text--highlight-disabled {
  opacity: 0.5;
}

div[class*='robo-text--highlight-label-'] {
  --robo-color-text: var(--robo-color-light);
  border-radius: var(--border-radius);
  color: var(--robo-color-light);
  padding: 0.2rem calc(var(--robo-space) * 0.4);
  max-width: 100%;
}

.robo-text--highlight-label-ok {
  background-color: var(--robo-color-green);
}

.robo-text--highlight-label-warning {
  background-color: var(--robo-color-orange);
}

.robo-text--highlight-label-error {
  background-color: var(--robo-color-red);
}

.robo-text--highlight-label-link {
  background-color: var(--robo-color-blue);
}

@keyframes hide {
  to {
    opacity: 0;
    visibility: hidden;
    height: 0;
    padding: 0;
  }
}

@keyframes open {
  to {
    opacity: 1;
    visibility: visible;
    height: auto;
  }
}

.robo-text.open {
  animation: open 0.4s linear 0.2s forwards;
}

.robo-text.hide {
  animation: hide 0.4s linear 0.2s forwards;
}

.robo-text--highlight-label-closable {
  padding-right: calc(var(--robo-space) + 0.8rem) !important;
  position: relative;
}

.robo-text-close {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  cursor: pointer;
}

.robo-text--break {
  word-break: break-all;
}

.robo-text--uppercase {
  text-transform: uppercase;
}

.robo-text[class*='robo-text--title-'] {
  font-weight: bold;
  text-transform: uppercase;
}

.robo-text--title-5 {
  font-size: calc(var(--robo-font-size));
}

.robo-text--title-4 {
  font-size: calc(var(--robo-font-size) * 1.1);
}

.robo-text--title-3 {
  font-size: calc(var(--robo-font-size) * 1.2);
}

.robo-text--title-2 {
  font-size: calc(var(--robo-font-size) * 1.3);
}

.robo-text--title-1 {
  font-size: calc(var(--robo-font-size) * 1.4);
}

.robo-text--linemiddle {
  --background: var(--robo-color-light);
  --color: var(--robo-color-dark);
  position: relative;
}

.robo-text--linemiddle:before {
  content: "";
  height: 1px;
  background: var(--color);
  top: calc(50% - 1px);
  left: 0;
  right: 0;
  position: absolute;
  z-index: 0;
}

.robo-text--linemiddle span {
  display: inline-block;
  background: var(--background);
  padding: 2px 5px;
  position: relative;
  z-index: 1;
}
</style>
