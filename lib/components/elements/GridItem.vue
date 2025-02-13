<template>
    <div :class="classList">
      <robo-button 
        @click="toggleCollapse" 
        class="robo-grid-item-toggler" 
        outlined v-if="collapseText" 
        size="small" 
        :icon-left="(mediaMobile === 'collapse-left') ? collapseIcon : null"
        :icon-right="(mediaMobile === 'collapse-right') ? collapseIcon : null"
      >
        <span v-if="collapseText">{{collapseText}}</span>
      </robo-button>
      
      <div class="robo-grid-item-content">

          <div class="robo-grid-item-close-wrap" v-if="collapse" aria-hidden="true">
            <span v-if="collapseIcon">
              <robo-icon :icon="collapseIcon" />
            </span>
            <span v-if="collapseText">{{collapseText}}</span>
            <robo-icon class="robo-grid-item-close" icon="circle-xmark" size="big" @click="toggleCollapse" />
          </div>

          <div class="robo-grid-item-content-inside">
            <slot/>
          </div>

      </div>

      <div 
        v-if="collapseClass === 'open'"
        class="robo-grid-item-overlay robo-overlay" 
        @click="toggleCollapse" 
        aria-hidden="true"
      ></div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboGridItem',

  props: {
    align: {
      type: String,
      default: null,
      validator(value) {
        return ['left', 'center', 'right', 'stretch'].includes(value)
      }
    },
    back: {
      type: Boolean,
      default: false
    },

    borderbottom: {
      type: Boolean,
      default: false
    },
    collapseIcon: {
      type: String,
      default: 'bars'
    },
    collapseText: {
      type: String
    },
    mediaMobile: {
      type: String,
      default: 'transfer',
      validator(value) {
        return ['transfer', 'collapse-right', 'collapse-left', 'hide'].includes(value)
      }
    },
    sticky: {
      type: String,
      default: 'none',
      validator(value) {
        return ['collapse', 'all', 'none'].includes(value)
      }
    },
    valign: {
      type: String,
      default: null,
      validator(value) {
        return ['top', 'center', 'bottom', 'stretch'].includes(value)
      }
    },
  },

  data() {
    return {
      collapseClass: 'none',
      collapse: this.mediaMobile === 'collapse-left' || this.mediaMobile === 'collapse-right'
    }
  },

  computed: {
    classList() {
      return {
        [`robo-grid-item`]: true,
        [`robo-grid-item--mobile-collapse`]: this.mediaMobile == 'collapse-left' || this.mediaMobile ==  'collapse-right',
        [`robo-grid-item--mobile-${this.mediaMobile}`]: this.mediaMobile,
        [`robo-grid-item--valign-${this.valign}`]: this.valign,
        [`robo-grid-item--align-${this.align}`]: this.align,
        [`robo-grid-item--${this.collapseClass}`]: this.collapseClass,
        [`robo-grid-item--sticky-${this.sticky}`]: this.sticky,
        [`robo-grid-item--borderbottom`]: this.borderbottom,
        [`robo-grid-item--back`]: this.back,
      };
    }
  },

  methods: {
    toggleCollapse() {
      if (this.collapseClass === 'close' || this.collapseClass === 'none') {
        return this.collapseClass = 'open'
      } else {
        return this.collapseClass = 'close'
      }
    }
  }

})
</script>

<style>
  .robo-grid-item--mobile-collapse .robo-grid-item-toggler {
      display: none;
    }

    @media screen and (max-width: 1000px) {
        .robo-grid-template-columns--left-center-right .robo-grid-item--mobile-collapse .robo-grid-item-toggler {
          display: inline-block;
        }

        .robo-grid-template-columns--left-center-right > .robo-grid-item--mobile-collapse-right > .robo-grid-item-content .robo-grid {
          /* justify-content: start; */
          text-align: left;
        }
    }

    @media screen and (max-width: 700px) {
        .robo-grid-item--mobile-collapse .robo-grid-item-toggler {
          display: inline-block;
        }

        .robo-grid-item--mobile-hide {
          display: none;
        }
    }
    
</style>

<style scoped>

  .robo-grid-item {
    width: 100%;
  }

    .robo-grid-item--valign-top { align-self: start; }
    .robo-grid-item--valign-center { align-self: center; }
    .robo-grid-item--valign-bottom { align-self: end; }
    .robo-grid-item--valign-stretch { align-self: stretch; }

    .robo-grid-item--align-left { justify-self: start; }
    .robo-grid-item--align-center { justify-self: center; }
    .robo-grid-item--align-right { justify-self: end; }
    .robo-grid-item--align-stretch { justify-self: stretch; }


    /* Expand */

    .robo-grid-item--mobile-collapse {
      position: relative;
    }

    .robo-grid-item-close {
      height: 2rem;
      cursor: pointer;
      color: var(--robo-color-link);
      float: right;
      display: none;
    }

    .robo-grid-item-close-wrap {
      margin-bottom: var(--gap-layout);
      text-align: left;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: bold;

      display: none;
    }

    .robo-grid-item-close-wrap span:not(:last-child) {
      margin-right: var(--robo-space);
    }

    .robo-grid-item--sticky-all {
      position: sticky;
      top: calc(var(--gap-layout) * 0.3);
      z-index: 90;
    }

    @media screen and (max-width: 1000px) {

      .robo-grid-item-close-wrap {
        display: block;
      }

      .robo-grid-item--sticky-collapse {
        position: sticky;
        top: calc(var(--gap-layout) * 0.3);
        z-index: 90;
      }

      .robo-grid-item-close {
        display: block;
      }

      /* For sidebars layout */
      .robo-grid-template-columns--left-center-right > .robo-grid-item--mobile-collapse-left {
          grid-row: 1;
          grid-column: 1 / 3;
      }

      .robo-grid-template-columns--left-center-right > .robo-grid-item--mobile-collapse-right {
          grid-row: 1;
          grid-column: 3 / 6;
          text-align: right;
      }

      .robo-grid-template-columns--left-center-right > .robo-grid-item--mobile-transfer {
        grid-column: 1 / 6;
      }
    }
    

    /* + Slide actions */

      @media screen and (max-width: 1000px) {
        .robo-grid-item--mobile-collapse > .robo-grid-item-content {
          background: #fff;
          position: fixed;
          z-index: 1000;
          top: 0;
          bottom: 0;
          padding: calc(var(--gap-layout) * 1.5);
          height: 100vh; /* fallback */
          height: 100svh; /* smallest */
          overflow: hidden;
        }

        .robo-grid-item--mobile-collapse .robo-grid-item-content-inside {
            overflow-y: scroll;
            height: 90%;
            padding-left: 1rem;
        }

        /* .robo-grid-item--mobile-collapse.robo-grid-item--open > .robo-grid-item-content .robo-grid-item-closeToggle {
          display: block;
        } */

        .robo-grid-item--mobile-collapse-left > .robo-grid-item-content {
          transform: translateX(-100%);
          transform-origin: 0 50%;
          left: 0;
          right: 50%;
        }

      .robo-grid-item--mobile-collapse-right > .robo-grid-item-content {
        transform: translateX(200%);
        transform-origin: 100% 50%;
        left: 50%;
        right: 0;
      }

      .robo-grid-item--mobile-collapse-left.robo-grid-item--open > .robo-grid-item-content {
        animation: slideLeft 0.2s ease-in-out forwards;
        transform-origin: 0 50%;
        /* animation: slide 0.2s ease-in-out forwards; */
      }

      .robo-grid-item--mobile-collapse-right.robo-grid-item--open > .robo-grid-item-content {
        animation: slideRight 0.2s ease-in-out forwards;
        transform-origin: 100% 50%;
        /* animation: slide 0.2s ease-in-out forwards; */
      }

      .robo-grid-item--mobile-collapse-left.robo-grid-item--close > .robo-grid-item-content {
        animation: slideLeftReverse 0.2s ease-in-out forwards;
        /* animation: slideReverse 0.2s ease-in-out forwards; */
      }

      .robo-grid-item--mobile-collapse-right.robo-grid-item--close > .robo-grid-item-content {
        animation: slideRightReverse 0.2s ease-in-out forwards;
        /* animation: slideReverse 0.2s ease-in-out forwards; */
      }


        .robo-grid-item--mobile-collapse-left.robo-grid-item--open > .robo-grid-item-content {
          right: 0;
        }

        .robo-grid-item--mobile-collapse-right.robo-grid-item--open > .robo-grid-item-content {
          left: 0;
        }
      }



    /* @keyframes slide {
      to {
        width: 100%;
      }
    }
    @keyframes slideReverse {
      to {
        width: 0;
      }
    } */


    @keyframes slideLeft {
      /* from {
        transform: translateX(-100%);
      } */
      to {
        transform: translateX(0);
      }
    }

    @keyframes slideLeftReverse {
      /* from {
        transform: translateX(0);
      } */
      to {
        transform: translateX(-100%);
      }
    }

    @keyframes slideRight {
      /* from {
        transform: translateX(200%);
      } */
      to {
        transform: translateX(0);
      }
    }

    @keyframes slideRightReverse {
      /* from {
        transform: translateX(0);
      } */
      to {
        transform: translateX(200%);
      }
    }

    /* - Slide actions */

    .robo-grid-item--borderbottom {
      border-bottom: 1px dotted var(--robo-color-dark-80);
      padding-bottom: 5px;
    }

    .robo-grid-item--back {
      background-color: var(--robo-color-light-100-4);
      padding: 10px;
    }

    /* @media (prefers-color-scheme: dark){
        .robo-grid-item--back {
            background-color: var(--robo-color-light-100-2);
        }
    } */

</style>