<template>
    <robo-text v-if="enData?.state && !enServices" size="tiny" weight="bold">
        {{enStateText ?? enData?.state}}
        <template v-if="enUnits">{{enUnits}}</template>
    </robo-text>

    <template v-if="enServices">
        <div class="entity-toggle">
            <robo-toggle 
                v-if="enServices.turn_off && enServices.turn_on && enData?.state" 
                v-model="toggleService" 
                @change="launchSwitch"
                :disabled="toggleDisabled"
            />

            <robo-details class="entity-toggle-status" v-if="toggleStatus !== 'none'">
                <template #summary>
                    <robo-icon v-if="toggleStatus === 'pending'" icon="clock" color="var(--robo-color-orange)" />
                    <robo-icon v-if="toggleStatus === 'approved'" icon="clock" color="var(--robo-color-green)" />
                    <robo-icon v-if="toggleStatus === 'success'" icon="circle-check" color="var(--robo-color-green)" />
                    <robo-icon v-if="toggleStatus === 'declined'" icon="circle-exclamation" color="var(--robo-color-red)" />
                    <robo-icon v-if="toggleStatus === 'error'" icon="circle-xmark" color="var(--robo-color-red)" />
                </template>
                <div>
                    <template v-if="toggleStatus === 'pending'">waiting for transaction approval from you</template>
                    <template v-if="toggleStatus === 'approved'">transaction approval received, waiting for transaction execution</template>
                    <template v-if="toggleStatus === 'success'">telemetry changed</template>
                    <template v-if="toggleStatus === 'declined'">transaction declined</template>
                    <template v-if="toggleStatus === 'error'">transaction was not executed</template>
                </div>
            </robo-details>

        </div>
    </template>

    <div v-if="enData" style="font-size:9px;display:none">TemplateEntityControls, enData<br/> {{enData}}</div>
    
</template>

<script>
  export default {
  components: { Details }, name: 'RoboTemplateEntityControls' }
</script>

<script setup>
import { defineProps, computed, ref, onMounted, watch } from 'vue'
import entityTypes from '../entities/types'
import {getEntityType} from '../entities/utils'

const props = defineProps({
    config: {
        type: Object,
        required: true
    },
    entity: {
        type: String
    },
    data: {
        type: Object,
        required: true
    },
    settings: {
        type: Object,
        required: true
    },
})

import { useStore } from 'vuex'
import Details from './Details.vue'
const store = useStore()
const telemetry = computed( () => {
  return store.state.robonomicsUIvue.rws.telemetry
})

const enData = computed(() => {
    if(props.data) {
        return props.data
    }
})

const enSettings = computed(() => {
    if(props.settings) {
        return props.settings
    }
})

const enType = computed(() => {
    if(props.entity) {
        return getEntityType(props.entity, entityTypes)
    }
})

const enServices = computed( () => {
  const service = Object.keys(props.config?.services).find(k => k === enType.value)

  if(service) {
    return props.config?.services[service]
  } else {
    return null
  }
})

const enStateText = computed(() => {

    if(enData.value?.state && enSettings.value) {
        if(enSettings.value?.state && enSettings.value?.state.hasOwnProperty(enData.value?.state)) {
            return enSettings.value?.state[enData.value?.state].text
        } else {
            return null
        }
    } else {
        return null
    }
    
})

const enUnits = computed( () => {
    if(enData.value?.units !== 'None' && enData.value?.units !== '-' && enData.value?.state !== 'unavailable' && enData.value?.state !== 'unknown') {
        return enData.value?.units
    } else {
        return null
    }
})

// for switches
const toggleService = ref(null)
const toggleDisabled = ref(null)
const toggleStatus = ref('none')

let launchSwitch = () => {
    let switchService = null

    if(enData.value?.state === 'off'){
        switchService = 'turn_on'
    }

    if(enData.value?.state === 'on') {
        switchService = 'turn_off'
    }

    const launch = `{"platform": "${enType.value}", "name": "${switchService}", "params": {"entity_id": "${props.entity}" }}`
    const tx = `{"tx_status": "pending"}`
    store.commit('rws/setLaunch', `{"launch": ${launch}, "tx": ${tx}}`)
    toggleDisabled.value = true
    toggleStatus.value = 'pending'
}

onMounted( ()=> {

    // for switches
    if(enServices.value?.turn_off && enServices.value?.turn_on) {

        // disabling toggles if no values came yet
        toggleDisabled.value = true

        // set toggleService from telemetry
        if(enData.value?.state === 'on') {
            toggleService.value = true
            toggleDisabled.value = false
        }

        if(enData.value?.state === 'off') {
            toggleService.value = false
            toggleDisabled.value = false
        }

        watch(() => enData.value, () => {
            console.log('TemplateEntityControls enData.value', enData.value)

            // set toggleService from telemetry
            if(enData.value?.state === 'on') {
                toggleService.value = true
                toggleDisabled.value = false
            }

            if(enData.value?.state === 'off') {
                toggleService.value = false
                toggleDisabled.value = false
            }
        })

        watch(() => store.state.robonomicsUIvue.rws.launch, value => {
            const o = JSON.parse(value)

            if(o['launch']?.params?.entity_id === props.entity && (o['launch']?.name === 'turn_on' || o['launch']?.name === 'turn_off')) {
                
                if(o['tx']?.tx_status === 'success') {
                    toggleDisabled.value = false
                }

                if(o['tx']?.tx_status === 'error' || o['tx']?.tx_status === 'declined') {
                    toggleDisabled.value = false

                    // change value to prevous as tx was not executed
                    if(enData.value?.state === 'on') {
                        toggleService.value = true
                    }

                    if(enData.value?.state === 'off') {
                        toggleService.value = false
                    }

                }

                toggleStatus.value = o['tx']?.tx_status
            }
        })

    }


})
</script>

<style scoped>
    .entity-toggle {
        position: relative;
    }

    .entity-toggle-status {
        background: var(--robo-color-light);
        border-radius: 15px;
        position: absolute;
        right: -10px;
        top: -10px;
    }
</style>