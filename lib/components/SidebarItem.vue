<template>
    <div class="robo-sidebar-itemWrap">

      <component 
        :is="setComponentTag"
        :aria-current="current ? 'page' : null"
        :class="classList"
        :href="href"
        :rel="external() ? 'noopener' : null"
        :target="external() ? '_blank' : null"
      >
        <slot/>
        <font-awesome-icon v-if="external()" icon="arrow-up-right-from-square" class="external-icon" />
      </component>

      <router-link 
        v-if="router"
        :class="classList"
        :to="router ? router : null"
        >
        <slot/>
      </router-link>
      
    </div>
</template>


<style scoped>
    .robo-sidebar-itemWrap {
        margin-left: calc(var(--space) * (-1.3));
        margin-bottom: calc(var(--space) * 0.5);
    }

    .robo-sidebar-item {
        /* font-weight: 300; */
        text-decoration: none;
        color: var(--color-text);
        padding-left: var(--space);
        border-left: 4px solid transparent;
    }

    .robo-sidebar-item[aria-current] {
        color: var(--color-link);
        border-color: var(--color-link);
    }

    .robo-sidebar-item--disabled {
        pointer-events: none;
        filter: grayscale(1);
        opacity: 0.6;
    }

    .robo-sidebar-item:not(.robo-sidebar-item--disabled):not([aria-current]):hover {
        color: var(--color-link-hover);
        border-color: var(--color-link-hover);
    }

    .external-icon {
        margin-left: calc(var(--space) * 0.5);
    }
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboSidebarItem',

  props: {
    current: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: null
    },
    router: {
      type: Object,
      default: null
    }
  },

  computed: {
    classList() {
      return {
        [`robo-sidebar-item`]: true,
        [`robo-sidebar-item--disabled`]: (!this.href && !this.router) || this.disabled
      };
    },
    setComponentTag(){
      if(this.href) {
        return 'a'
      } else {
        if (!this.router) {
          return 'span'
        }
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
  }

})
</script>