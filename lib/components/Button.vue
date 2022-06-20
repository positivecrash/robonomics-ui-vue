<template>
    <component 
      :is="href ? 'a' : 'button'"
      :href="href"
      :disabled="disableCompute"
      :class="classList"
      :target="external() ? '_blank' : null"
      :rel="external() ? 'noopener' : null"
    >

      <span class="robo-btn--part">
        <robo-loader class="robo-btn--subpart" v-if="loading" />
        <robo-icon class="robo-btn--subpart" :icon="iconLeft" v-if="iconLeft && !loading"/>
        <span class="robo-btn--subpart" v-if="slotLength > 0" ref="text"><slot /></span>
        <robo-icon class="robo-btn--subpart" :icon="iconRight" v-if="iconRight && !loading" />
      </span>

      <span class="robo-btn--part" v-if="right">{{right}}</span>
  

    </component>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboButton',

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
      validator: function (value) {
        return ['disabled', 'ok', 'alarm'].indexOf(value) !== -1;
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
      default: 'normal',
      validator: function (value) {
        return ['small', 'normal', 'big'].indexOf(value) !== -1;
      }
    },
    type: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'ok', 'alarm', 'na'].indexOf(value) !== -1;
      }
    },

  },

  data() {
    return {
      slotLength: 1
    }
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
        [`robo-btn--fitLabeled`]: this.fitLabeled,
      };
    },
    disableCompute(){
      // if(this.disabled || this.loading) {
      if(this.disabled) {
        return true
      } else {
        return null
      }
    }
  },

  methods: {
    external() {
      
      if( this.href ) {
        let parser = document.createElement('a')
        parser.href = this.href
        if (  parser.host !== window.location.host ) {
          return true
        }
      }
    }
  },

  watch: {
    "$refs.text": function() {
      if(this.$refs.text.textContent) {
        this.slotLength = this.$refs.text.textContent.length
      } else {
        this.slotLength = 0
      }
    }
  },

  mounted() {
    if(this.$refs.text.textContent) {
      this.slotLength = this.$refs.text.textContent.length
    } else {
      this.slotLength = 0
    }
  }

})
</script>


<style scoped>
  .robo-btn {

    --border: var(--color-blue);
    --background: var(--color-blue);
    --color: #fff;

    --border-hover: #000;
    --background-hover: #000;
    --color-hover: #fff;

    --border-2: var(--color-blue);
    --background-2: transparent;
    --color-2: var(--color-blue);

    --border-2-hover: #000;
    --background-2-hover: transparent;
    --color-2-hover: #000;

    --padding-v: var(--space);
    --padding-g: var(--space);
    --text-size: var(--font-size);

    appearance: none;
    text-decoration: none;
    cursor: pointer;
    border: 0;

    font-family: var(--font-family);
    font-size: var(--text-size);
    font-weight: bold;
    line-height: 1.2;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: inline-block;
  }

  .robo-container--full .robo-btn--part {
    display: block;
  }

  .robo-btn--part {
    display: inline-flex;
    align-items: center;
    text-align: center;
  }

  /* Colors code */
  .robo-btn .robo-btn--part:nth-child(2n+1) {
    border: 1px solid var(--border);
    background-color: var(--background);
    color: var(--color);
  }

  .robo-btn:hover .robo-btn--part:nth-child(2n+1) {
    background-color: var(--background-hover);
    border-color: var(--border-hover);
    color: var(--color-hover);
  }

  .robo-btn .robo-btn--part:nth-child(2n) {
    border: 1px solid var(--border-2);
    background-color: var(--background-2);
    color: var(--color-2);
  }

  .robo-btn:hover .robo-btn--part:nth-child(2n) {
    background-color: var(--background-2-hover);
    border-color: var(--border-2-hover);
    color: var(--color-2-hover);
  }
  /* end of Colors code */

  /* Outlined */
  .robo-btn.robo-btn--outlined .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-blue);
    --background: transparent;
    --color: var(--color-blue);

    --border-hover: #000;
    --background-hover: transparent;
    --color-hover: #000;
  }

  .robo-btn.robo-btn--outlined .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-blue);
    --background-2: var(--color-blue);
    --color-2: #fff;

    --border-2-hover: #000;
    --background-2-hover: #000;
    --color-2-hover: #fff;
  }
  /* end of Outlined */


  /* Ok */
  .robo-btn.robo-btn--ok .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-green);
    --background: var(--color-green);
  }

  .robo-btn.robo-btn--ok .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-green);
    --color-2: var(--color-green);
  }

  .robo-btn.robo-btn--ok.robo-btn--outlined .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-green);
    --background: transparent;
    --color: var(--color-green);
  }

  .robo-btn.robo-btn--ok.robo-btn--outlined .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-green);
    --background-2: var(--color-green);
    --color-2: #fff;
  }
  /* end of Ok */

  /* Alarm */
  .robo-btn.robo-btn--alarm .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-red);
    --background: var(--color-red);
  }

  .robo-btn.robo-btn--alarm .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-red);
    --color-2: var(--color-red);
  }

  .robo-btn.robo-btn--alarm.robo-btn--outlined .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-red);
    --background: transparent;
    --color: var(--color-red);
  }

  .robo-btn.robo-btn--alarm.robo-btn--outlined .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-red);
    --background-2: var(--color-red);
    --color-2: #fff;
  }
  /* end of Alarm */

  /* Na */
  .robo-btn.robo-btn--na .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-gray);
    --background: var(--color-gray);
  }

  .robo-btn.robo-btn--na .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-gray);
    --color-2: var(--color-gray);
  }

  .robo-btn.robo-btn--na.robo-btn--outlined .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-gray);
    --background: transparent;
    --color: var(--color-gray);
  }

  .robo-btn.robo-btn--na.robo-btn--outlined .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-gray);
    --background-2: var(--color-gray);
    --color-2: #fff;
  }
  /* end of Na */


  /* Disabled */
  .robo-btn[disabled] {
    cursor: not-allowed;
  }

  .robo-btn[disabled] .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-gray);
    --background: var(--color-gray);
    --color: #fff;
    --border-hover: var(--color-gray);
    --background-hover: var(--color-gray);
    --color-hover: #fff;
  }

  .robo-btn[disabled] .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-gray);
    --background-2: transparent;
    --color-2: var(--color-gray);
    --border-2-hover: var(--color-gray);
    --background-2-hover: transparent;
    --color-2-hover: var(--color-gray);
  }

  .robo-btn[disabled].robo-btn--outlined .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-gray);
    --background: transparent;
    --color: var(--color-gray);
    --border-hover: var(--color-gray);
    --background-hover: transparent;
    --color-hover: var(--color-gray);
  }

  .robo-btn[disabled].robo-btn--outlined .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-gray);
    --background-2: var(--color-gray);
    --color-2: #fff;
    --border-2-hover: var(--color-gray);
    --background-2-hover: var(--color-gray);
    --color-2-hover: #fff;
  }

  .robo-btn.robo-btn--disabled-ok .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-green);
    --background: var(--color-green);
    --color: #fff;
    --border-hover: var(--color-green);
    --background-hover: var(--color-green);
    --color-hover: #fff;
  }

  .robo-btn.robo-btn--disabled-ok .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-green);
    --background-2: transparent;
    --color-2: var(--color-green);
    --border-2-hover: var(--color-green);
    --background-2-hover: transparent;
    --color-2-hover: var(--color-green);
  }

  .robo-btn.robo-btn--disabled-ok.robo-btn--outlined .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-green);
    --background: transparent;
    --color: var(--color-green);
    --border-hover: var(--color-green);
    --background-hover: transparent;
    --color-hover: var(--color-green);
  }

  .robo-btn.robo-btn--disabled-ok.robo-btn--outlined .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-green);
    --background-2: var(--color-green);
    --color-2: #fff;
    --border-2-hover: var(--color-green);
    --background-2-hover: var(--color-green);
    --color-2-hover: #fff;
  }

  .robo-btn.robo-btn--disabled-alarm .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-red);
    --background: var(--color-red);
    --color: #fff;
    --border-hover: var(--color-red);
    --background-hover: var(--color-red);
    --color-hover: #fff;
  }

  .robo-btn.robo-btn--disabled-alarm .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-red);
    --background-2: transparent;
    --color-2: var(--color-red);
    --border-2-hover: var(--color-red);
    --background-2-hover: transparent;
    --color-2-hover: var(--color-red);
  }

  .robo-btn.robo-btn--disabled-alarm.robo-btn--outlined .robo-btn--part:nth-child(2n+1) {
    --border: var(--color-red);
    --background: transparent;
    --color: var(--color-red);
    --border-hover: var(--color-red);
    --background-hover: transparent;
    --color-hover: var(--color-red);
  }

  .robo-btn.robo-btn--disabled-alarm.robo-btn--outlined .robo-btn--part:nth-child(2n) {
    --border-2: var(--color-red);
    --background-2: var(--color-red);
    --color-2: #fff;
    --border-2-hover: var(--color-red);
    --background-2-hover: var(--color-red);
    --color-2-hover: #fff;
  }
  /* end of Disabled */

  /* Sizes */
  .robo-btn.robo-btn--size-small {
    --padding-v: calc(var(--space) * 0.5);
    --padding-g: calc(var(--space) * 0.5);
    --text-size: calc(var(--font-size) * 0.7);
  }
  .robo-btn.robo-btn--size-big {
    --padding-v: calc(var(--space) * 2);
    --padding-g: calc(var(--space) * 4);
    --text-size: calc(var(--font-size) * 1.3);
  }

  .robo-btn--fitLabeled {
    --padding-v: calc(var(--space) + var(--space)/2)
  }

  .robo-btn.robo-btn--size-small.robo-btn--fitLabeled {
    --padding-v: calc(var(--space) * 0.5 + var(--space)/2)
  }

  .robo-btn.robo-btn--size-big.robo-btn--fitLabeled {
    --padding-v: calc(var(--space) * 2 + var(--space)/2)
  }
  /* end of Sizes */

  .robo-btn .robo-btn--subpart:not(:last-child) {
    margin-right: var(--space);
  }

  .robo-btn .robo-loader {
    --loader-color: var(--color)
  }
</style>

<style>

  .robo-btn--clean .robo-btn--part {
    background: transparent !important;
    border: none !important;
    padding: 0;
    color: var(--background) !important;
    text-transform: none;
  }

  /* .robo-btn--clean:hover .robo-btn--part {
    color: var(--color-link-hover) !important;
  } */

  .robo-btn--part {
    display: inline-block;
    padding: var(--padding-v) var(--padding-g);
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) all;
  }

  .robo-btn--loading {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.7;
  }
</style>