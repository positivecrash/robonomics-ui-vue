<template>
  <robo-section class="entity" offset="x05">
     <robo-icon v-if="icon" :icon="icon" :color="getColor" size="big" />
     {{props.entity?.attributes?.friendly_name}} <br/>
     <!-- {{props.entity?.attributes?.rgb_color}} <br />
     {{getColor}} -->
  </robo-section>
</template>

<script>
  export default { name: 'EntityLight' }
</script>

<script setup>
import { computed, defineProps, onMounted } from 'vue'

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

const getColor = computed( () => {
  if(props.entity?.attributes?.rgb_color && props.entity?.state === 'on') {
    return `rgb(${props.entity.attributes.rgb_color})`
  } else {

    if(props.entity.state === 'on') {
      return '#EFD300'
    }

  }
})

onMounted( () => {
  console.log('entity', props.entity)
})
</script>