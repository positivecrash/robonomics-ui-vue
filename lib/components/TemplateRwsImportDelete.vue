<template>
  <robo-button-delete-approval 
    :action="deleteFunc"
    :title="rws ? 'Remove this subscription from dapp' : 'Remove all subscriptions from dapp'"
  >
    <template v-if="rws">Remove this setup</template>
    <template v-else>Remove all setups</template>
  </robo-button-delete-approval>
</template>

<script>
  export default { name: 'RoboTemplateRwsImportDelete' }
</script>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  rws: {
    type: String,
    default: null
  }
})

let deleteFunc = () => {
  if(props.rws) {
    store.dispatch('rws/clear', props.rws)
  } else {
    store.dispatch('rws/clearall')
  }
}
</script>

<style>
/* .robo-button .robo-button-content {
  align-items: center;
} */
</style>