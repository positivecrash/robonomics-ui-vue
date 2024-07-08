<template>

  <robo-text :size="select ? 'tiny' : 'small'" lines="dotted">

    <robo-grid v-if="rwsEndDate" type="flex" offset="x0" gap="x025" galign="start" valign="center">
      <robo-status v-if="!select" :type="rwsStatus" />
      <span>Expiration date:</span>
      <span>{{dateGetString(rwsEndDate)}}</span>
      <robo-link v-if="expired && isAdmin" :router="store.state.robonomicsUIvue.rws.links.activate"><robo-icon icon="arrow-rotate-left" /></robo-link>
    </robo-grid>

    <robo-grid v-if="!rwsEndDate" type="flex" offset="x0" gap="x025" galign="start" valign="center">
      <robo-status type="error">No subscription found</robo-status>
      <robo-link v-if="expired" :router="store.state.robonomicsUIvue.rws.links.activate"><robo-icon icon="wallet" /></robo-link>
    </robo-grid>

    <robo-grid v-if="select" type="flex" offset="x0" gap="x025" galign="start" valign="center">
      <span>Owner:</span>
      <span>{{shortenAddress(active)}}</span>
      <robo-copy :text="active" />
    </robo-grid>
    

    <robo-text v-if="rwsEndDate === -1">
      <robo-status type="error">No subscription with this owner found</robo-status>
    </robo-text>

  </robo-text>

  <robo-grid type="flex" galign="start" valign="center" offset="x05" gap="x05">
    <robo-button :router="store.state.robonomicsUIvue.rws.links.devices" size="tiny" outline><robo-icon icon="house-signal-solid" /> Devices</robo-button>
    <robo-button v-if="!ispagesetup" title="Edit subscription" :router="store.state.robonomicsUIvue.rws.links.setup" size="tiny" outline><robo-icon icon="pencil" /> Settings</robo-button>
    <robo-template-rws-import-delete :rws="active" />
  </robo-grid>

</template>

<script>
  export default { name: 'RoboTemplateRwsActiveInfo' }
</script>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { dateGetRange, dateGetString, setStatusView } from '../tools'
import { shortenAddress, isOwnerConnected } from '../polkadot/tools'

import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  select: {
      type: Boolean,
      default: false
  }
})


/* + get rws */
const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})

const active = computed( ()=> {
  return store.state.robonomicsUIvue.rws.active
})

store.dispatch('rws/getActive')
let rwsactiveModel = ref(store.state.robonomicsUIvue.rws.active)
/* - get rws */

const rwsName = computed( () => {
  if(rws.value && rws.value.length > 0) {
    return rws.value.find(item => item.owner === store.state.robonomicsUIvue.rws.active).name
  } else {
    return null
  }
})

const rwsEndDate = computed( () => {
  return store.state.robonomicsUIvue.rws.expiredate
})

const expired = computed( () => {
  return dateGetRange(rwsEndDate.value) > -1
})

const rwsNames = computed( () => {
  if(rws.value && rws.value.length > 0) {
    return rws.value.map(item => {
      return item.name
    })
  } else {
    return null
  }
})

const rwsOwners = computed( () => {

  if(rws.value && rws.value.length > 0) {
    return rws.value.map(item => {
      return item.owner
    })
  } else {
    return null
  }

})

const rwsStatus = computed( () => {
  return setStatusView(dateGetRange(rwsEndDate.value))
})

const isAdmin = computed ( () => {
  return isOwnerConnected(store.state.robonomicsUIvue.polkadot.address, store.state.robonomicsUIvue.rws.active)
})

const ispagesetup = computed ( () => {
  return window.location.hash === '#' + store.state.robonomicsUIvue.rws.links.setup
})

const setActive = () => {
  store.commit('rws/setActive', rwsactiveModel.value)
}

onMounted( () => {
    watch(rws, () => {
      rwsactiveModel.value = store.state.robonomicsUIvue.rws.active
    })

    watch(active, value => {
      rwsactiveModel.value = value
    })
})

</script>