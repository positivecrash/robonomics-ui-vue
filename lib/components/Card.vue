<template>
    <div
        :class="classList"
        ref="card"
    >
        <robo-progress v-if="loading || progress" :progress="progress" />

        <div class="robo-card-widgeticon">
          <slot name="widgeticon" />
        </div>

        <div class="robo-card-content">
          <slot/>
        </div>

        <robo-button 
          v-if="allowExpand" 
          @click="expand = !expand"

          class="robo-card-expand"
          clean
          type="na"
        >
          <robo-icon v-if="expand" icon="down-left-and-up-right-to-center" />
          <robo-icon v-else icon="up-right-and-down-left-from-center" />
        </robo-button>

    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboCard',

  props: {
    allowExpand: {
      type: Boolean,
      default: false
    },
    backColor: {
      type: String,
      default: 'light',
      validator: function (value) {
        return ['light', 'dark', 'lightblue', 'opacitylight'].indexOf(value) !== -1;
      }
    },
    fixedButton: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    pale: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: null
    },
    simplefont: {
      type: Boolean,
      default: false
    },
    widget: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      expand: false
    }
  },

  computed: {
    classList() {
      return {
        [`robo-card`]: true,
        [`robo-card--expandable`]: this.allowExpand,
        [`robo-card--solid`]: !this.outlined,
        [`robo-card--outline`]: this.outline,
        [`robo-card--disabled`]: this.disabled,
        [`robo-card--backimage`]: this.backImage,
        [`robo-card--backcolor-${this.backColor}`]: this.backColor,
        [`robo-card--fixedButton`]: this.fixedButton,
        [`robo-card--pale`]: this.pale,
        [`expand`]: this.expand,
        [`robo-card--widget`]: this.widget,
        [`robo-card--simplefont`]: this.simplefont,
      };
    }
  },

  mounted() {
    let e = this.$refs.card
    let labels = e.querySelectorAll('.robo-card-label')
    if(labels.length > 0) {
      e.classList.add('robo-card--labeled')
    }
  }

})
</script>

<style scoped>

    .robo-card {
      --background: transparent;
      --color: var(--color-card-background-dark);

        background-color: var(--background);
        color: var(--color);
        position: relative;
        border-radius: var(--border-radius);
    }

    .robo-card-content {
      padding: var(--card-padding);
    }

    .robo-card .robo-progress {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    .robo-card--backcolor-light:not(.robo-card--outline) {
      --background: var(--color-card-background-light);
    }

    .robo-card--backcolor-opacitylight {
      --background: var(--robo-color-light-100-4);
    }

    .robo-card--backcolor-dark:not(.robo-card--outline) {
      --background: var(--color-card-background-dark);
      --color: var(--color-card-background-light);
    }

    .robo-card--backcolor-lightblue:not(.robo-card--outline) {
      --background: var(--color-card-background-lightblue);
    }

    .robo-card--outline.robo-card {
        --color-card-background: var(--color-body);
        --card-border-color: var(--color-text);
        border: 1px solid var(--card-border-color);
    }

    .robo-card--pale {
      --color-card-background-light: var(--color-card-background-light-70);
      --color-card-background-dark: var(--color-card-background-dark-70);
    }

    @media (prefers-color-scheme: dark){
      .robo-card--pale {
        --color-card-background-light: var(--color-card-background-dark-70);
        --color-card-background-dark: var(--color-card-background-light-70);
      }
    }

    .robo-card--labeled {
      margin-top: 10px;
    }


    /* + Card expand */

    .robo-card--expandable.expand {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      overflow: auto;
      transition: 0.2s all linear;
    }

    /* - Card expand */

    .robo-card.robo-card--widget {
      --card-padding: 10px;
      --background: var(--robo-color-light-100-4);
      display: grid;
      grid-template-columns: 56px auto;
    }

    .robo-card-widgeticon {
      background-color: var(--robo-color-input);
    }
    .robo-card.robo-card--widget .robo-card-content {
      align-self: stretch;
      padding-bottom: 0;
      padding-top: 0;
    }

</style>

<style>
  .robo-card--disabled .robo-card-image, .robo-card--disabled .robo-card-section
    {
        pointer-events: none;
        filter: grayscale(1);
        opacity: 0.8;
    }

    .robo-card img {
      display: inline-block;
      max-width: 100%;
    }

    /* + Card expand */
    
    .robo-card--expandable .robo-card-expand {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }

    .robo-card--expandable.expand .robo-card-expand {
      top: 1rem;
      right: 1rem;
    }

    .robo-card.robo-card--expandable.expand .robo-card-label {
      top: 0;
      left: 0;
    }

    /* - Card expand */

    .robo-card--fixedButton > .robo-card-content {
      position: relative;
      padding-bottom: calc(var(--robo-space) * 4) !important;
    }
    
    .robo-card--fixedButton  > .robo-card-content > .robo-button {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
    }

    .robo-card-widgeticon > * {
      display: grid !important;
      align-content: center;
      justify-content: center;
      height: 100%;
    }

    .robo-card.robo-card--widget .robo-card-content > .robo-details,
    .robo-card.robo-card--widget .robo-card-content > .robo-select,
    .robo-card.robo-card--widget .robo-card-content > .robo-select select {
      height: 100%;
    }
</style>