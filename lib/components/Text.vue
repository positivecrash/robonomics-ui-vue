<template>
    <div :class="classList" ref="text">
        <slot/>

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
    break: {
        type: Boolean,
        default: false
    },
    copy: {
        type: Boolean,
        default: false
    },
    gap: {
        type: Boolean,
        default: false
    },
    highlight: {
      type: String,
      default: null,
      validator: function (value) {
        return ['success', 'error', 'link'].indexOf(value) !== -1;
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
    size: {
      type: String,
      default: null,
      validator: function (value) {
        return ['tiny', 'small', 'medium', 'large'].indexOf(value) !== -1;
      }
    },
    weight: {
      type: String,
      default: null,
      validator: function (value) {
        return ['bold', 'normal', 'light'].indexOf(value) !== -1;
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
    classList() {
      return {
        [`robo-text`]: true,
        [`robo-text--${this.size}`]: this.size,
        [`robo-text--break`]: this.break,
        [`robo-text--${this.weight}`]: this.weight,
        [`robo-text--inline`]: this.inline,
        [`robo-text--gap`]: this.gap,
        [`robo-text--highlight-${this.highlight}`]: this.highlight,
        [`robo-text--highlight-label-${this.highlightLabel}`]: this.highlightLabel,
        [`robo-text--highlight-label-closable`]: this.highlightLabelClose,
        [`robo-text--hyphen`]: this.hyphen,
        [`open`]: this.highlightLabelCloseReopen,
      };
    }
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

<style scoped>
    .robo-text--inline {
        display: inline-block;
    }

    .robo-text--gap:not(:last-child) {
        margin-bottom: var(--space);
    }

    .robo-text--hyphen {
      text-align: justify !important;
      -webkit-hyphens: auto;
      -moz-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
    }

    /* + SIZE */
    .robo-text--tiny {
        font-size: calc(var(--font-size) * 0.6);
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
    .robo-text--bold {
        font-weight: bold;
    }

    .robo-text--light {
        font-weight: 300
    }

    .robo-text--normal {
        font-weight: normal
    }
    /* - WEIGHT */


    /* + HIGHLIGHT */
    .robo-text--highlight-success {
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
        }
    }

    @keyframes open {
        to {
            opacity: 1;
            visibility: visible;
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
</style>

<style>
  .robo-text-copy {
    margin-left: var(--space);
  }
</style>