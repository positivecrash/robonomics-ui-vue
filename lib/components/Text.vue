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

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboText',

  props: {
    align: {
      type: String,
      default: null,
      validator(value) {
          return ['left', 'center', 'right', 'hyphen'].includes(value)
      }
    },

    break: {
        type: Boolean,
        default: false
    },
    copy: {
        type: Boolean,
        default: false
    },
    galign: {
      type: String,
      default: null,
      validator(value) {
          return ['left', 'center', 'right', 'hyphen'].includes(value)
      }
    },
    gap: { /* depricate */
        type: Boolean,
        default: false
    },
    color: {
      type: String,
      default: null,
      validator: function (value) {
        return ['ok', 'error', 'link', 'attention'].indexOf(value) !== -1;
      }
    },
    highlight: {
      type: String,
      default: null,
      validator: function (value) {
        return ['ok', 'error', 'link', 'attention'].indexOf(value) !== -1;
      }
    },
    highlightLabel: {
      type: String,
      default: null,
      validator: function (value) {
        return ['success', 'error', 'link'].indexOf(value) !== -1;
      }
    },
    highlightLabelClose: {
      type: Boolean,
      default: false
    },
    highlightLabelCloseReopen: {
      type: Boolean,
      default: false
    },
    hyphen: {
      type:Boolean,
      default: false
    },
    inline: {
        type: Boolean,
        default: false
    },
    lines: {
        type: String,
        default: null,
        validator(value) {
            return ['dotted', 'dashed', 'solid'].includes(value)
        }
    },
    nowrap: {
      type: Boolean,
      default: false
    },
    offset: {
        type: String,
        default: null,
        validator(value) {
            return ['x0', 'x025', 'x05', 'x1', 'x2', 'x4'].includes(value)
        }
    },
    paragraphs: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null,
      validator: function (value) {
        return ['tiny', 'small', 'medium', 'large'].indexOf(value) !== -1;
      }
    },
    title: {
      type: String,
      default: null,
      validator(value) {
          return ['1', '2', '3', '4', '5'].includes(value)
      }
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    weight: {
      type: String,
      default: null,
      validator: function (value) {
        return ['bold', 'normal', 'light', 'normal-italic', 'bold-italic'].indexOf(value) !== -1;
      }
    },
  },

  data() {
    return {
      clipboardCopied: false
    }
  },

  emits: ['onClose'],

  computed: {
    calcOffset() {
      if(this.title && !this.offset) {
        return 'x1'
      } else {
        if(this.offset) { 
          return this.offset;
        } else {
          return 'x0'
        }
      }
    },

    classList() {
      return {
        [`robo-text`]: true,
        [`robo-text--align-${this.align}`]: this.align,
        [`robo-text--galign-${this.galign}`]: this.galign,
        [`robo-text--${this.size}`]: this.size,
        [`robo-text--break`]: this.break,
        [`robo-text--style-${this.weight}`]: this.weight,
        [`robo-text--inline`]: this.inline,
        [`robo-text--gap`]: this.gap,
        [`robo-text--color-${this.color}`]: this.color,
        [`robo-text--highlight-${this.highlight}`]: this.highlight,
        [`robo-text--highlight-label-${this.highlightLabel}`]: this.highlightLabel,
        [`robo-text--highlight-label-closable`]: this.highlightLabelClose,
        [`robo-text--hyphen`]: this.hyphen,
        [`robo-text--offset-${this.calcOffset}`]: true,
        [`robo-text--nowrap`]: this.nowrap,
        [`open`]: this.highlightLabelCloseReopen,
        [`robo-text--uppercase`]: this.uppercase,
        [`robo-text--title-${this.title}`]: this.title,
        [`robo-text--paragraphs`]: this.paragraphs,
        [`robo-text--mark-${this.mark}`]: this.mark,
        [`robo-text--lines-${this.lines}`]: this.lines,
      };
    },
  },

  methods: {
    close() {
      this.$refs.text.classList.remove('open')
      this.$refs.text.classList.add('hide')
      this.$emit('onClose')
    },
    clipboard() {
        navigator.clipboard.writeText(this.$refs.text.innerText)
        this.clipboardCopied = true;
        const o = this
        setTimeout(function(){
            o.clipboardCopied = false;
        }, 1500);
    },
  }


})
</script>

<style>
  .robo-text--paragraphs p:not(:last-child) { margin-bottom: var(--robo-space); }

  .robo-text-copy { margin-left: var(--space); }

  .robo-text[class *= 'robo-text--lines-'] > *:not(:last-child) {
      border-bottom: 1px solid var(--robo-color-dark);
      margin-bottom: 4px;
      padding-bottom: 4px;
    }
    .robo-text.robo-text--lines-dashed > *:not(:last-child) { border-bottom-style: dashed; }
    .robo-text.robo-text--lines-dotted > *:not(:last-child) { border-bottom-style: dotted; }
</style>

<style scoped>
    .robo-text {
      margin-bottom: var(--offset);
    }

    .robo-text--offset-x0 { --offset: 0; }
    .robo-text--offset-x025 { --offset: calc(var(--gap-layout) * 0.25); }
    .robo-text--offset-x05 { --offset: calc(var(--gap-layout) * 0.5); }
    .robo-text--offset-x1 { --offset: var(--gap-layout); }
    .robo-text--offset-x2 { --offset: calc( var(--gap-layout) * 2); }
    .robo-text--offset-x4 { --offset: calc( var(--gap-layout) * 4); }

    .robo-text--inline {
        display: inline;
    }

    .robo-text--gap:not(:last-child) {
        margin-bottom: var(--space);
    }


    /* + align */
    .robo-text--align-left { text-align: left; }
    .robo-text--align-center { text-align: center; }
    .robo-text--align-right { text-align: right; }

    .robo-text--align-hyphen, .robo-text--hyphen 
    {
      text-align: justify !important;
      -webkit-hyphens: auto;
      -moz-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
    }
    /* - align */

    /* + galign */
    .robo-text[class *= 'robo-text--galign'] { display: flex; }
    .robo-text--galign-left { align-content: start; justify-content: start; }
    .robo-text--galign-center { align-content: center; justify-content: center; }
    .robo-text--galign-right { align-content: end; justify-content: end; }
    /* - galign */

    /* + SIZE */
    .robo-text--tiny {
        font-size: calc(var(--font-size) * 0.7);
    }

    .robo-text--small {
        font-size: calc(var(--font-size) * 0.8);
    }

    .robo-text--medium {
        font-size: calc(var(--font-size) * 1.2);
    }

    .robo-text--large {
        font-size: calc(var(--font-size) * 1.5);
    }
    /* - SIZE */

    /* + WEIGHT */
    .robo-text--style-bold {
        font-weight: bold;
    }

    .robo-text--style-light {
        font-weight: 300
    }

    .robo-text--style-normal {
        font-weight: normal
    }

    .robo-text--style-normal-italic {
        font-style: italic;
    }

    .robo-text--style-bold-italic {
        font-style: italic;
        font-weight: bold;
    }
    /* - WEIGHT */


    /* + HIGHLIGHT */
    .robo-text--highlight-attention {
      --input-text-color: var(--color-orange);
      --color-text: var(--color-orange);
      color: var(--color-orange)
    }

    .robo-text--highlight-ok {
      --input-text-color: var(--color-green);
      --color-text: var(--color-green);
      color: var(--color-green)
    }

    .robo-text--highlight-error {
      --input-text-color: var(--color-red);
      --color-text: var(--color-red);
      color: var(--color-red)
    }

    .robo-text--highlight-link {
      --input-text-color: var(--color-blue);
      --color-text: var(--color-blue);
      color: var(--color-blue)
    }
    /* - HIGHLIGHT */


    /* + HIGHLIGHT LABEL */
    div[class *= 'robo-text--highlight-label-' ]{
      --input-text-color: var(--color-light);
      --color-text: var(--color-light);
      border-radius: var(--border-radius);
      color: var(--color-light);
      padding: calc(var(--space) * 0.4);
      max-width: 100%;
    }

    .robo-text--highlight-label-success {
      background-color: var(--color-green)
    }

    .robo-text--highlight-label-error {
      background-color: var(--color-red)
    }

    .robo-text--highlight-label-link {
      background-color: var(--color-blue)
    }
    /* - HIGHLIGHT LABEL */


    /* + HIGHLIGHT LABEL REMOVE */
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
      padding-right: calc(var(--space) + 0.8rem) !important;
      position: relative;
    }

    .robo-text-close {
      position: absolute;
      top: 0.4rem;
      right: 0.4rem;
      cursor: pointer;
    }
    /* - HIGHLIGHT LABEL REMOVE */

    .robo-text--break { word-break: break-all; }
    .robo-text--uppercase { text-transform: uppercase; }
    .robo-text--nowrap { white-space: nowrap; }

    .robo-text[class *= 'robo-text--title-'] {
      font-weight: bold;
      text-transform: uppercase;
    }

    .robo-text--title-5 { font-size: calc(var(--robo-fontsize)); }
    .robo-text--title-4 { font-size: calc(var(--robo-fontsize) * 1.1); }
    .robo-text--title-3 { font-size: calc(var(--robo-fontsize) * 1.2); }
    .robo-text--title-2 { font-size: calc(var(--robo-fontsize) * 1.3); }
    .robo-text--title-1 { font-size: calc(var(--robo-fontsize) * 1.4); }
</style>
