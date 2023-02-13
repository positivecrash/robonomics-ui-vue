<template>

<div class="robo-rws-devices-dashboard-mobile">
  <robo-grid type="flex" offset="x1" galign="start">
      <robo-button :router="store.state.robonomicsUIvue.rws.links.list" v-if="store.state.robonomicsUIvue.rws.links.list">
        <robo-icon icon="house" />
      </robo-button>

      <robo-button 
        block 
        @click.prevent="updateInfo()"
        :type="status ? status : 'primary'"
        :disabled="updating"
        :class="updating ? 'robo-button-uploading' : null"
      >
        <robo-icon icon="check" v-if="status === 'ok'" />
        <robo-icon icon="rotate" v-if="!status" />
      </robo-button>

      <robo-button v-if="Object.keys(users).length > 0 && store.state.robonomicsUIvue.rws.links.users" :router="store.state.robonomicsUIvue.rws.links.users">
        <robo-icon icon="user" />
        <template #badge>{{Object.keys(users).length}}</template>
      </robo-button>

      <robo-button @click.prevent="exportAll()">
        <robo-icon icon="file-arrow-down" />
      </robo-button>
  </robo-grid>

  <robo-grid offset="x1" gap="x05">
  
    <robo-card widget simplefont v-if="store.state.robonomicsUIvue.rws.links.list">
      <template #widgeticon>
        <robo-icon icon="house" />
      </template>
      <robo-template-rws-activeselect size="small" clean block />
    </robo-card>

    <robo-card widget simplefont>
      <template #widgeticon>
        <robo-icon icon="rotate" />
      </template>
      <robo-select 
        :options="ipfsGateways" 
        :values="ipfsGateways" 
        v-model="selectedGateway" 
        size="small" 
        clean
        @change="setGateway()"
      />
    </robo-card>

    <robo-card widget simplefont v-if="config">
      <template #widgeticon>
        <robo-icon icon="eye" />
      </template>
      <robo-select :options="viewas" :values="viewas" v-model="viewasSelected" size="small" clean block @change="setView" />
    </robo-card>

  </robo-grid>
  
</div>

<robo-grid type="flex" offset="x0" class="robo-rws-devices-dashboard">
  <robo-grid type="flex" galign="start" gap="x1" offset="x0">
    
    <robo-card widget simplefont>
      <template #widgeticon v-if="store.state.robonomicsUIvue.rws.links.list">
        <robo-button :router="store.state.robonomicsUIvue.rws.links.list">
          <robo-icon icon="house" />
        </robo-button>
      </template>
      <robo-template-rws-activeselect size="small" clean />
    </robo-card>

    <robo-card widget simplefont>
      <template #widgeticon>
        <robo-button 
          block 
          @click.prevent="updateInfo()"
          :type="status ? status : 'primary'"
          :disabled="updating"
          :class="updating ? 'robo-button-uploading' : null"
        >
          <robo-icon icon="check" v-if="status === 'ok'" />
          <robo-icon icon="rotate" v-if="!status" />
        </robo-button>
      </template>
      <robo-select 
        :options="ipfsGateways" 
        :values="ipfsGateways" 
        v-model="selectedGateway" 
        size="small" 
        clean
        @change="setGateway()"
      />
    </robo-card>
    
    <robo-button class="robo-devices-dashboardicon" v-if="Object.keys(users).length > 0 && store.state.robonomicsUIvue.rws.links.users" :router="store.state.robonomicsUIvue.rws.links.users">
      <robo-icon icon="user" />
      <template #badge>{{Object.keys(users).length}}</template>
    </robo-button>

    <robo-button @click.prevent="exportAll()">
      <robo-icon icon="file-arrow-down" />
      Save
    </robo-button> 

  </robo-grid>

  <robo-card widget simplefont v-if="config">
    <template #widgeticon>
      <robo-icon icon="eye" />
    </template>
    <robo-select :options="viewas" :values="viewas" v-model="viewasSelected" size="small" clean @change="setView" />
  </robo-card>
</robo-grid>

</template>

<script>
  export default { name: 'RoboTemplateDevicesDashboard' }
</script>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const emit = defineEmits([
    'beforeUpdate', 'onUpdate', 'afterUpdate'
])

const props = defineProps({
    config: {
        type: [Object, String]
    },
    datalog: {
        type: [Object, String]
    },
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

  emit('beforeUpdate')
  emit('onUpdate')
  emit('afterUpdate', (status, message) => updateStatus(status, message))

  updating.value = false
}
/* - Update */

/* + Datalog view */
let viewas = ref([])

if(props.config) {
    viewas = ['Home Assistant', 'Devices']
} else {
    viewas = [ 'Devices' ]
}

let viewasSelected = ref(viewas[0])
store.state.robonomicsUIvue.rws.devices.view = viewasSelected.value

let setView = () =>{
  store.state.robonomicsUIvue.rws.devices.view = viewasSelected.value
}

/* - Datalog view */


/* + Export */
import JSZip from 'jszip'
import FileSaver from 'file-saver'

let exportAll = () => {
  const zip = new JSZip()
  let rwsSetups = localStorage.getItem('robonomicsUIrwslist')
  zip.file('dapp.robonomics.network-rws.json', rwsSetups)
  zip.file('dapp.robonomics.network-devices.json', JSON.stringify(props.datalog))
  zip.file('dapp.robonomics.network-config.json', JSON.stringify(props.config))

  zip.generateAsync({ type: 'blob' }).then(function (content) {
      FileSaver.saveAs(content, 'dapp.robonomics.network.zip')
  })
}
/* - Export */

</script>

<style scoped>
  .robo-rws-devices-dashboard {
    font-size: 1rem;
  }

  .robo-devices-dashboardicon {
    min-width: 50px;
  }

  .robo-rws-devices-dashboard-mobile .robo-button {
    width: 40px;
    height: 40px;
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