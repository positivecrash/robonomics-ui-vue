<template>
    <font-awesome-icon v-if="icon" :icon="icon" class="icon" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboIcon',

  props: {
    icon: {
        type: String,
        default: null
    }
  }
})
</script>