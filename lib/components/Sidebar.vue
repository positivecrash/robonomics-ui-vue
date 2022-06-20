<template>
    <nav aria-label="Main App Navigation" role="navigation" class="robo-sidebar">
        <div class="robo-sidebar-title" v-if="title">
            <font-awesome-icon v-if="icon"  :icon="icon" class="icon" />
            <span>{{title}}</span>
        </div>
        <div class="robo-sidebar-content">
            <slot />
        </div>
    </nav>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboSidebar',

  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    }
  },

})
</script>

<style scoped>
    .robo-sidebar {
        font-size: calc(var(--font-size) * 0.85);
        text-transform: uppercase;
    }

    .robo-sidebar:not(:last-child) {
        margin-bottom: calc( var(--space) * 3 );
    }

    .robo-sidebar-title {
        font-weight: bold;
        margin-bottom: calc(var(--space) * 0.5);
    }

    .robo-sidebar-title > * {
        display: inline-block;
        vertical-align: middle;
    }

    .robo-sidebar-title .icon {
        margin-right: var(--space);
    }

    .robo-sidebar-content {
        padding-left: calc(var(--space) * 2.2)
    }
</style>