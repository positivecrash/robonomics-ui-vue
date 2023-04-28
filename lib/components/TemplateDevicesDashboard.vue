<template>

<div class="robo-rws-devices-dashboard-mobile">
  <robo-grid type="flex" gap="x1" offset="x0" galign="start">
    <robo-button 
        block 
        @click.prevent="updateInfo()"
        :type="status ? status : 'primary'"
        :disabled="updating"
        class="robo-button-uploading"
      >
        <robo-icon icon="check" v-if="status === 'ok'" />
        <robo-icon icon="rotate" v-if="!status" />
    </robo-button>

    <robo-details>
      <template #summary>
        <robo-button><robo-icon icon="gear" /></robo-button>
      </template>

      <robo-grid gap="x05" offset="x0">
        <robo-template-rws-activeselect size="small" />

        <robo-select 
          :options="ipfsGateways" 
          :values="ipfsGateways" 
          v-model="selectedGateway" 
          size="small" 
          @change="setGateway()"
          label="Gateway"
        />

      </robo-grid>

    </robo-details>

    <robo-button class="robo-devices-dashboardicon" v-if="Object.keys(users).length > 0 && store.state.robonomicsUIvue.rws.links.users" :router="store.state.robonomicsUIvue.rws.links.users">
      <robo-icon icon="user" />
      <template #badge>{{Object.keys(users).length}}</template>
    </robo-button>

    <robo-template-rws-setup-backup save />
  </robo-grid>
</div>

<robo-grid type="flex" offset="x0" gap="x1" class="robo-rws-devices-dashboard">
  <robo-grid type="flex" galign="start" gap="x1" offset="x0">
    <robo-button 
        block 
        @click.prevent="updateInfo()"
        :type="status ? status : 'primary'"
        :disabled="updating"
        class="robo-button-uploading"
      >
        <robo-icon icon="check" v-if="status === 'ok'" />
        <robo-icon icon="rotate" v-if="!status" />
    </robo-button>

    <robo-template-rws-activeselect size="small" />

    <robo-select 
      :options="ipfsGateways" 
      :values="ipfsGateways" 
      v-model="selectedGateway" 
      size="small" 
      @change="setGateway()"
      label="Gateway"
    />

    <robo-button class="robo-devices-dashboardicon" v-if="Object.keys(users).length > 0 && store.state.robonomicsUIvue.rws.links.users" :router="store.state.robonomicsUIvue.rws.links.users">
      <robo-icon icon="user" />
      <template #badge>{{Object.keys(users).length}}</template>
    </robo-button>
  </robo-grid>

  <robo-template-rws-setup-backup save />
  
</robo-grid>

</template>

<script>
  export default { name: 'RoboTemplateDevicesDashboard' }
</script>

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['onUpdate'])

const props = defineProps({
    config: {
        type: [Object, String]
    }
})

/* + store */

import { useStore } from 'vuex'
const store = useStore()

const ipfsGateways = computed( () => {
    return store.state.robonomicsUIvue.ipfs.gateways
})

let selectedGateway = ref(store.state.robonomicsUIvue.ipfs.activegateway)

let setGateway = value => {
  store.commit('ipfs/setActiveGateway', selectedGateway.value)
}

const users = computed( () => {
  return store.getters['rws/users']
})

/* - store */

/* + Update */
let status = ref(null) // ok, error
let message = ref(null) // string
let updating = ref(false)

let updateStatus = (statusFromApp, messageFromApp) => {
  if(statusFromApp) { status.value = statusFromApp }
  if(messageFromApp) { message.value = messageFromApp }

  setTimeout(() => {
   status.value = null
   message.value = null
  }, 2500)
}

let updateInfo = () => {
  updating.value = true
  emit('onUpdate', (status, message) => updateStatus(status, message))
  updating.value = false
}
/* - Update */
/* - Export */

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