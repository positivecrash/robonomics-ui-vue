<template>

  <robo-image :src="getImage('boy-playing.png')" max="220px"/>
  <robo-text size="medium" offset="x05">Here will be your RWS setups</robo-text>
  <robo-button 
  v-if="store.state.robonomicsUIvue.rws.links.setup" 
  :router="store.state.robonomicsUIvue.rws.links.setup" 
  iconleft="rss">Setup RWS</robo-button>

</template>

<script>
  export default { name: 'RoboTemplateRwsSetupsEmpty' }
</script>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
import { getImage } from '../tools'
</script>