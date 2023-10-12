<template>
  <robo-button 
    @click.prevent="deleteSettings()"
    title="Clear all RWS Settings"
    size="small" 
    type="error"
    outline
  >
    <robo-icon icon="trash-solid" />
  </robo-button>
</template>

<script>
  export default { name: 'RoboTemplateRwsImportDeleteall' }
</script>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

let deleteSettings = () => {
  store.dispatch('rws/clearall')
}
</script>