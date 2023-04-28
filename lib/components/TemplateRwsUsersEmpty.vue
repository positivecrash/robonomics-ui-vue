<template>

  <robo-section class="robo-users-empty">

    <template v-if="rws?.length < 1">
      <robo-section 
          imaged="notfound"
          imagedtitle="First you need RWS setup"
      >
        <robo-button 
        v-if="store.state.robonomicsUIvue.rws.links.setup" 
        :router="store.state.robonomicsUIvue.rws.links.setup" 
        iconleft="rss">
          Setup RWS
        </robo-button>
      </robo-section>
    </template>

    <template v-else-if="Object.keys(users).length < 1">
      <robo-section 
          imaged="users"
          imagedtitle="No users added so far for this RWS"
      >
      <robo-button 
      v-if="store.state.robonomicsUIvue.rws.links.useractivate" 
      :router="store.state.robonomicsUIvue.rws.links.useractivate" 
      iconleft="rss">
        + Add user
      </robo-button> 
      </robo-section>
    </template>
  </robo-section>

</template>

<script>
  export default { name: 'RoboTemplateRwsUsersEmpty' }
</script>

<script setup>
import { computed } from 'vue'

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