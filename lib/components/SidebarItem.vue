<template>
    <div class="robo-sidebar-itemWrap">
        <component 
            :is="href ? 'a' : 'span'"
            :href="href"
            :class="classList"
            :target="external() ? '_blank' : null"
            :rel="external() ? 'noopener' : null"
            :aria-current="current ? 'page' : null"
        >
            <slot/>
            <font-awesome-icon v-if="external()" icon="arrow-up-right-from-square" class="external-icon" />
        </component>
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
    },
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