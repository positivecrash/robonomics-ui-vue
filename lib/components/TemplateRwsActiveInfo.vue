<template>
  <robo-text :size="select ? 'tiny' : 'small'" lines="dotted">
    <robo-text nowrap v-if="rwsName && select">
      <robo-status v-if="rwsEndDate && rwsEndDate > -1" :type="rwsStatus">{{rwsName}}</robo-status>
      <span v-else>{{rwsName}}</span>
    </robo-text>

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

    <robo-grid type="flex" offset="x0" gap="x025" galign="start" valign="center">
      <span>Owner:</span>
      <span>{{shortenAddress(active)}}</span>
      <robo-copy :text="active" />
    </robo-grid>
    

    <robo-text v-if="rwsEndDate === -1">
      <robo-status type="error">No subscription with this owner found</robo-status>
    </robo-text>

    <robo-status v-if="changed && rwsEndDate > -1" type="warning">Don't forget to download setup recovery kit</robo-status>

  </robo-text>

  <robo-grid type="flex" offset="x1" gap="x05" galign="space-between" valign="center">
    <robo-button title="View devices" :router="store.state.robonomicsUIvue.rws.links.devices" size="small" outline><robo-icon icon="house-signal-solid" /></robo-button>
    <robo-button v-if="select" title="Edit subscription" :router="store.state.robonomicsUIvue.rws.links.setup" size="small" outline><robo-icon icon="pencil" /></robo-button>
    <robo-template-rws-import-download :status="changed" />
    <robo-template-rws-import-delete :rws="active" />
  </robo-grid>

</template>

<script>
  export default { name: 'RoboTemplateRwsActiveInfo' }
  /* TODO: добавить кнопку принудительного обновления для Expiration date */
</script>

<script setup>
import { dateGetRange, dateGetString, setStatusView } from '../tools'
import { shortenAddress } from '../polkadot/tools'
import { ref, computed, onMounted, watch } from 'vue'
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

let setActive = () => {
  store.commit('rws/setActive', rwsactiveModel.value)
}

const changed = computed( () => {
  if(rws.value && rws.value.length > 0) {
    return rws.value.find(item => item.owner === store.state.robonomicsUIvue.rws.active).changed
  } else {
    return null
  }
})

const isAdmin = computed (() => {
    const accs = store.state.robonomicsUIvue.polkadot.accounts
    const rws = store.state.robonomicsUIvue.rws.active

    if(rws && accs && accs.find(acc => acc.address === rws)) {
        return true
    } else {
      return false
    }
})

onMounted( () => {
    watch(rws, () => {
      rwsactiveModel.value = store.state.robonomicsUIvue.rws.active
    })

    watch(active, value => {
      rwsactiveModel.value = value
    })
})

</script>