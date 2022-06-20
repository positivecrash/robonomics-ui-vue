<template>
    <div :class="classList">
        <slot/>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboText',

  props: {
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
        [`robo-text--highlight-label-${this.highlightLabel}`]: this.highlightLabel,
      };
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



    div[class *= 'robo-text--highlight-label-' ]{
      --input-text-color: var(--color-light);
      --color-text: var(--color-light);
      color: var(--color-light);
      padding: calc(var(--space) * 0.4)
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
    /* - HIGHLIGHT */
</style>