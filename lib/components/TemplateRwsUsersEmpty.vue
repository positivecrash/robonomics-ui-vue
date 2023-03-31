<template>

  <robo-section class="robo-users-empty">

    <template v-if="rws?.length < 1">
      <robo-image :src="getImage('boy-notfound.svg')" max="220px"/>
      <robo-text size="small" weight="bold" offset="x05">First you need RWS setup</robo-text>
      <robo-button 
      v-if="store.state.robonomicsUIvue.rws.links.setup" 
      :router="store.state.robonomicsUIvue.rws.links.setup" 
      iconleft="rss">Setup RWS</robo-button>
    </template>

    <template v-else-if="Object.keys(users).length < 1">
      <robo-image :src="getImage('boy-users.svg')" max="220px"/>
      <robo-text size="small" weight="bold" offset="x05">No users added so far for this RWS</robo-text>
      <robo-button 
      v-if="store.state.robonomicsUIvue.rws.links.useractivate" 
      :router="store.state.robonomicsUIvue.rws.links.useractivate" 
      iconleft="rss">+ Add user</robo-button> 
    </template>
  </robo-section>

</template>

<script>
  export default { name: 'RoboTemplateRwsUsersEmpty' }
</script>

<script setup>
import { computed } from 'vue'
import { getImage } from '../tools'

import { useStore } from 'vuex'
const store = useStore()

const users = computed( () => {
  return store.getters['rws/users']
})

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})
</script>

<style scoped>
.robo-users-empty {
  text-align: center;
}
</style>