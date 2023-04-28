<template>
    <div :class="classList">
      <slot/>
      <robo-template-rws-setup-backup v-if="rwsrecover" recoverRedirect :save="rwssave" />
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboLayoutSection',

  props: {
    selfcenter: {
      type: Boolean,
      default: true
    },
    vcenter: {
      type: Boolean,
      default: false
    },
    gcenter: {
      type: Boolean,
      default: false
    },

    rwsrecover: {
      type: Boolean,
      default: false
    },

    rwssave: {
      type: Boolean,
      default: false
    },

    width: {
      type: String,
      default: 'wide',
      validator(value) {
        return ['wide', 'middle', 'narrow'].includes(value)
      }
    }
  },

  computed: {
    classList() {
      return {
        [`robo-layout-section`]: true,
        [`robo-layout-section--vcenter`]: this.vcenter,
        [`robo-layout-section--gcenter`]: this.gcenter,
        [`robo-layout-section--${this.width}`]: this.width,
        [`robo-layout-section--selfcenter`]: this.selfcenter,
      };
    },
  }

})
</script>

<style scoped>
    .robo-layout-section {
        --section-width: var(--layout-maxwidth);
        position: relative;
        max-width: var(--section-width);
        width: 100%;
        padding: calc(var(--robo-layout-padding) * 2) var(--robo-layout-padding) 0;
    }

    .robo-layout-section:last-child {
      padding-bottom: calc(var(--robo-layout-padding) * 2)
    }

    .robo-layout-section--vcenter {
      align-self: center;
    }

    .robo-layout-section--gcenter {
      justify-self: center;
      text-align: center;
    }
    
    .robo-layout-section--narrow {
      --section-width: 600px;
    }

    .robo-layout-section--middle {
      --section-width: 1000px;
    }

    .robo-layout-section--selfcenter {
      margin: 0 auto
    }
</style>

<style>
/* + backup */
    @media screen and (min-width: 1000px){
        .robo-layout-section > .robo-rws-backup {
            position: absolute;
            right: var(--robo-layout-padding);
            top: var(--robo-layout-padding);
            width: auto !important;
            z-index: 10;
        }
    }

    @media screen and (max-width: 1000px){
        .robo-layout-section > .robo-rws-backup {
            display: block;
            width: 100%;
            margin-top: calc(var(--robo-space) * 4);
        }
    }
    /* - backup */
  </style>