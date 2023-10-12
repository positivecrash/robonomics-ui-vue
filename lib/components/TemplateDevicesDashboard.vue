<template>

<div class="robo-rws-devices-dashboard-mobile">
  <robo-grid type="flex" gap="x1" offset="x0" galign="start">

    <robo-details>
      <template #summary>
        <robo-button><robo-icon icon="gear" /></robo-button>
      </template>

      <robo-template-gateway expanded/>

    </robo-details>

    <robo-button class="robo-devices-dashboardicon" v-if="users && Object.keys(users).length > 0 && store.state.robonomicsUIvue.rws.links.users" :router="store.state.robonomicsUIvue.rws.links.users">
      <robo-icon icon="user" />
      <template #badge>{{Object.keys(users).length}}</template>
    </robo-button>

    <robo-template-rws-setup-backup save />
  </robo-grid>
</div>

<robo-grid type="flex" offset="x0" gap="x1" class="robo-rws-devices-dashboard">
  <robo-grid type="flex" galign="start" gap="x1" offset="x0">

    <robo-template-gateway />
    
    <robo-button class="robo-devices-dashboardicon" v-if="users && Object.keys(users).length > 0 && store.state.robonomicsUIvue.rws.links.users" :router="store.state.robonomicsUIvue.rws.links.users">
      <robo-icon icon="user" />
      <template #badge>{{Object.keys(users).length}}</template>
    </robo-button>
  </robo-grid>

  <robo-template-rws-setup-backup save />
  
</robo-grid>

<robo-text size="tiny" v-if="date">Last updated: {{date}}</robo-text>
<robo-text size="tiny" v-if="config?.sending_timeout">Telemetry backup timeout: {{config?.sending_timeout}} seconds
  <robo-details>
    <template #summary>
      <robo-icon icon="circle-question" />
    </template>

    <robo-text size="tiny">Every {{config?.sending_timeout}} seconds, your telemetry backup is sent to the Robonomics parachain. You can change it in Home Assistant</robo-text>
  </robo-details>
</robo-text>

</template>

<script>
  export default { name: 'RoboTemplateDevicesDashboard' }
</script>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    config: {
      type: [Object, String]
    },
    //timestamp
    updateTime: {
      type: Number,
      default: null
    }
})

/* + store */

import { useStore } from 'vuex'
const store = useStore()

const users = computed( () => {
  return store.getters['rws/users']
})

/* - store */

/* + Update */
const date = computed( () => {
  if(props.updateTime) {
    const d = new Date(props.updateTime)
    return d.toGMTString()
  } else {
    return null
  }
})

/* - Update */

</script>

<style scoped>
  .robo-rws-devices-dashboard {
    font-size: 1rem;
  }

  .robo-devices-dashboardicon {
    min-width: 50px;
  }

  .robo-button-uploading {
    width: 5rem
  }

  @media screen and (min-width: 850px) {
    .robo-rws-devices-dashboard-mobile {
      display: none;
    }
  }

  @media screen and (max-width: 850px) {
    .robo-rws-devices-dashboard {
      display: none;
    }
  }
</style>