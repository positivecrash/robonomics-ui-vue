<template>
  <robo-section class="entity" offset="x05">

    <robo-grid v-if="card === 'glance' && (icon || name || status)" type="grid" offset="x0" gap="x0" galign="center" :title="name">
      <robo-icon v-if="icon" :icon="icon" />
      <robo-text v-if="status" size="tiny" weight="bold">{{status}}</robo-text>
    </robo-grid>

    <robo-grid v-else type="flex" offset="x0" gap="x0" valign="center" fluid>
      <robo-grid v-if="icon || name" type="flex" offset="x0" gap="x05" galign="start" valign="center">
        <robo-icon v-if="icon" :icon="icon" />
        <robo-text v-if="name" size="tiny">{{name}}</robo-text>
      </robo-grid>
      <robo-text v-if="status" size="tiny" weight="bold">{{status}}</robo-text>
    </robo-grid>

  </robo-section>
</template>

<script>
  export default { name: 'EntityInfo' }
</script>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
    card: {
        type: String
    },

    entity: {
        type: Object
    },
    
    icon: {
      type: String,
      default: null
    },

    name: {
      type: String,
      default: null
    },

    status: {
      type: String,
      default: null
    },
})
</script>

<style scoped>
    .entity {
      --offset: calc(var(--gap-layout) * .3)
    }
</style>