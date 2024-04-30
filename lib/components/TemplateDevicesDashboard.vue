<template>
  <div v-if="narrowscreen"><robo-text size="tiny" weight="bold" inline>Last telemetry update <template v-if="telemetryupd">{{telemetryupd}}</template></robo-text> <robo-loader v-if="!telemetryupd" /></div>
  <robo-grid type="flex" offset="x0" gap="x1" class="robo-rws-devices-dashboard">
    <robo-grid type="flex" galign="start" gap="x1" offset="x0">
      <div>
        <robo-text size="tiny" v-if="!narrowscreen">Connection via 
          <robo-text v-if="connection === 'libp2p' && connectionrelay" size="tiny" highlight="ok" weight="bold" inline>Relay</robo-text>
        </robo-text>
        <robo-grid type="flex" galign="start" gap="x0" offset="x0">
          <robo-button :type="connection === 'parachain' ? 'ok' : 'primary'" @click.prevent="setconnection('parachain')" size="small">Parachain</robo-button>
          <robo-button :type="connection === 'libp2p' ? 'ok' : 'primary'" @click.prevent="setconnection('libp2p')" size="small">Libp2p</robo-button>
        </robo-grid>
        <robo-text v-if="narrowscreen && connection === 'libp2p' && connectionrelay" size="tiny" highlight="ok" weight="bold" align="right">Relay</robo-text>
      </div>

      <div>
        <robo-text size="tiny" v-if="!narrowscreen">Ipfs gateway</robo-text>
        <robo-template-gateway :type="narrowscreen ? 'popup' : 'tooltip'">
          <template #summary v-if="narrowscreen">IPFS</template>
        </robo-template-gateway>
      </div>
    </robo-grid>

    <div>
      <div v-if="!narrowscreen">
        <robo-text size="tiny">Last telemetry update</robo-text>
        <robo-text size="tiny" weight="bold" class="robo-devices-dashboard-updatedate">
          <template v-if="telemetryupd">{{telemetryupd}}</template>
          <robo-loader v-else />
        </robo-text>
      </div>

      <robo-details :type="narrowscreen ? 'popup' : 'tooltip'" summarystyle="link" class="robo-devices-dashboard-advanced">
        <template #summary>
          <robo-text v-if="!narrowscreen" size="small"><robo-icon icon="expand-all"/> Advanced</robo-text>
          <robo-button size="small" v-else><robo-icon icon="expand-all"/></robo-button>
        </template>
        <robo-text title="3" v-if="narrowscreen">Advanced info</robo-text>
        <!-- Add here v-if="config?.sending_timeout" -->
        <robo-section offset="x05">
          <robo-text size="small">Digital twin update</robo-text>
          <robo-text size="small" weight="bold" class="robo-devices-dashboard-updatedate">Every 600 sec</robo-text>
          <robo-text class="robo-devices-dashboard-updatedate-info" size="tiny">Every {{config?.sending_timeout}} seconds, your telemetry backup is sent to the Robonomics parachain. You can change it in Home Assistant</robo-text>
        </robo-section>
        <robo-grid v-if="config || datalog" offset="x05" gap="x025" columns="1" divider="dotted">
          <div><robo-button clean v-if="config" @click="downloaddata('config')">Download raw config</robo-button></div>
          <robo-button clean v-if="datalog" @click="downloaddata('datalog')">Download raw datalog</robo-button>
        </robo-grid>
      </robo-details>
    </div>
    
  </robo-grid>

</template>

<script>
  export default { name: 'RoboTemplateDevicesDashboard' }
</script>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import {downloadJson} from '../tools'

const props = defineProps({
    config: {
      type: [Object, String]
    },
    datalog: {
      type: [Object, String]
    },
    //timestamp
    updateTime: {
      type: Number,
      default: null
    },
    connectionrelay: {
      type: Boolean
    }
})

const telemetryupd = computed( () => {
  if(!props.updateTime) {
    return null
  }

  const d = new Date(props.updateTime)
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
  return new Intl.DateTimeFormat('en-US', options).format(d);
})

const downloaddata = type => {
  const filename = type + '-rws-' + store.state.robonomicsUIvue.rws.active
  if(type === 'datalog') { downloadJson(props.datalog, filename) }
  if(type === 'config') { downloadJson(props.config, filename) }
}

const connection = computed( () => {
  return store.state.robonomicsUIvue.rws.connection
})

const setError = () => {
  let msg = "Can't connect via Libp2p"
  if(!props.config) {
    msg += ": config not found"
  }

  if(!props.config?.peer_id) {
    msg += ": peer_id in config not found"
  }

  store.dispatch('app/setStatus', {value: msg, timeout: 10000})
}

const setconnection = type => {
  if(type === 'libp2p') {
    if(props.config && props.config?.peer_id) { 
      store.commit('rws/setConnection', type)
    } else {
      setError()
      return
    }
  }

  if(type === 'parachain') {
    store.commit('rws/setConnection', type)
  }
}

const screenw = ref(0)
const setw = () => {
  screenw.value = window.innerWidth
}
const narrowscreen = computed( () =>{
  return screenw.value < 701
})

onMounted( () => {
  setw()
  window.addEventListener('resize', setw)

  if(connection.value === 'libp2p') {
    if(!props.config || !props.config?.peer_id) {
      setError()
      store.commit('rws/setConnection', 'parachain')
    }
  }
})

onUnmounted( () => {
  window.removeEventListener('resize', setw)
})

</script>

<style scoped>
  /* .robo-rws-devices-dashboard {
    font-size: 1rem;
  } */

  .robo-devices-dashboard-updatedate, .robo-devices-dashboard-updatedate-info {
    font-family: var(--robo-font-family-sansserif);
  }

  .robo-devices-dashboard-updatedate {
    text-transform: uppercase;
  }

  .robo-devices-dashboard-updatedate-info {
    margin-top: calc(var(--robo-space) * .5);
  }

  /* @media screen and (min-width: 701px) {
    .screen-narrow { display: none }
  }

  @media screen and (max-width: 700px) {
    .screen-wide { display: none }
  } */
</style>

<style>
  .robo-devices-dashboard-advanced summary {
    font-weight: 600;
  }

  .robo-devices-dashboard-advanced {
    --robo-details-tooltip-minwidth: 320px
  }

  .robo-devices-dashboard-advanced .robo-button {
    justify-content: start
  }
</style>
