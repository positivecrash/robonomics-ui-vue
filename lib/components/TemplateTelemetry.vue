<template>
{{data}}
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboTemplateTelemetry',

  props: {
      data: {
          type: String,
          required: true
      }
  }
})
</script>

<style scoped>
</style>