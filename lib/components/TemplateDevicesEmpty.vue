<template>
    <robo-image :src="getImage('boy-smarthome.png')" max="280px"/>
    <robo-text size="medium" offset="x05">Here will be your smart devices dashboard</robo-text>
    <robo-button 
    v-if="rwsobj.links.setup" 
    :router="rwsobj.links.setup" 
    iconleft="rss">Setup RWS</robo-button>
</template>

<script>
  export default { name: 'RoboTemplateDevicesEmpty' }
</script>

<script setup>
import { getImage } from '../tools'
import { computed } from 'vue'

import { useStore } from 'vuex'
const store = useStore()

const rwsobj = computed( () => {
    return store.state.robonomicsUIvue.rws
})

</script>