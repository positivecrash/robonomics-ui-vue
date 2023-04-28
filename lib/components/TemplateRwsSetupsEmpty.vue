<template>

  <robo-section 
    imaged="playing"
    imagedtitle="Here will be your RWS setups"
  >
    <robo-button 
    v-if="store.state.robonomicsUIvue.rws.links.setup" 
    :router="store.state.robonomicsUIvue.rws.links.setup" 
    iconleft="rss">Setup RWS</robo-button>
  </robo-section>

</template>

<script>
  export default { name: 'RoboTemplateRwsSetupsEmpty' }
</script>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
</script>