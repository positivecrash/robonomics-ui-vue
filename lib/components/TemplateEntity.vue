<template>
    
    <robo-section class="entity" clean>

        <!-- {{card}} -->

        <template v-if="card?.entities || card?.entity">
            <template v-if="card?.type === 'glance' && enIcon">
                <robo-grid type="grid" offset="x0" gap="x0" galign="center" :title="entity ?? null">
                    <robo-icon v-if="enIcon" :icon="enIcon" :key="iconChange" :color="enData?.attributes?.rgb_color ? `rgb${enData.attributes.rgb_color}` : null" />
                    <robo-text v-if="enData.state && !enServices" size="tiny" weight="bold">
                        {{enStateText ?? enData.state}}
                        <template v-if="enUnits">{{enUnits}}</template>
                    </robo-text>
                    <robo-toggle v-if="enServices?.toggle" v-model="toggleService" />
                </robo-grid>
            </template>

            <template v-else>
                <robo-grid type="flex" offset="x0" gap="x0" valign="center" fluid>
                    <robo-grid v-if="enIcon || entity" type="flex" offset="x0" gap="x05" galign="start" valign="center">
                        <robo-icon v-if="enIcon" :icon="enIcon" :key="iconChange" :color="enIconColor" />
                        <robo-text v-if="entity" size="tiny">{{enData?.attributes?.friendly_name || entity}}</robo-text>
                    </robo-grid>
                    
                    <robo-toggle v-if="enServices?.toggle" v-model="toggleService" />
                    <template v-else>
                        <robo-text v-if="enData?.state" size="tiny" weight="bold">
                            {{enStateText ?? enData.state}}
                            <template v-if="enUnits">{{enUnits}}</template>
                        </robo-text>
                    </template>
                </robo-grid>
            </template>
        </template>
        <template v-if="card?.type === 'picture-elements'">
            <robo-image v-if="card?.image" :src="`https://ipfs.io/ipfs/${card.image}`" />
        </template>

    </robo-section>
    
    <div v-if="entity" style="font-size:9px;display:none">entity<br/> {{entity}}</div>
    <div v-if="enType" style="font-size:9px;display:none">enType<br/> {{enType}}</div>
    <div v-if="enTypeFull" style="font-size:9px;display:none">enTypeFull<br/> {{enTypeFull}}</div>
    <div v-if="enIcon" style="font-size:9px;display:none">enIcon<br/> {{enIcon}}</div>
    <div v-if="enData" style="font-size:9px;display:none">enData<br/> {{enData}}</div>
    <div v-if="enSettings" style="font-size:9px;display:none">enSettings<br/> {{enSettings}}</div>
    <div v-if="iconChange" style="font-size:9px;display:none">iconChange<br/> {{iconChange}}</div>
    <div v-if="enServices" style="font-size:9px;display:none">enServices<br/> {{enServices}}</div>
</template>

<script>
  export default { name: 'RoboTemplateEntity' }
</script>

<script setup>
import { defineProps, computed, ref, onMounted, watch } from 'vue'
import entityStatuses from '../entities/statuses'
import entityTypes from '../entities/types'
import {getEntityFullType, getEntityType} from '../entities/utils'

const props = defineProps({
    card: {
        type: String,
        required: true
    },
    config: {
        type: Object,
        required: true
    },
    entity: {
        type: String
    }
})

import { useStore } from 'vuex'
const store = useStore()
const telemetry = computed( () => {
  return store.state.robonomicsUIvue.rws.telemetry
})

const enTypeFull = computed(() => {
    if(props.entity) {
        return getEntityFullType(props.entity, entityTypes)
    }
})

const enType = computed(() => {
    if(props.entity) {
        return getEntityType(props.entity, entityTypes)
    }
})

const enSettings = computed(() => {
   if(enTypeFull.value && Array.isArray(enTypeFull.value)) {
        for (const status of entityStatuses) {
            if(status?.type.every(v => enTypeFull.value.some(entityValue => entityValue == v))){
                return status
            }
        }
    } else {
        return null
    }
})

const enData = computed(() => {

    console.log('telemetry.value', telemetry.value)

    if(props.entity && telemetry.value?.entities && telemetry.value?.entities[props.entity]){
        return telemetry.value.entities[props.entity]
    } else {
        return null
    }
})

const enIcon = computed(() => {

    if(enData.value?.state && enSettings.value) {
        if(enSettings.value?.state && enSettings.value?.state.hasOwnProperty(enData.value?.state)) {
            return enSettings.value?.state[enData.value?.state].icon
        } else {
            return enSettings.value?.icon
        }
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
    console.log('enData.value?.state', enData.value?.state)
    if(enData.value?.units !== 'None' && enData.value?.units !== '-' && enData.value?.state !== 'unavailable' && enData.value?.state !== 'unknown') {
        return enData.value?.units
    } else {
        return null
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

let toggleService = ref(null)
if(enServices?.value?.toggle) {
    if(enData?.value.state === 'on') {
        toggleService.value = true
    }
    if(enData?.value.state === 'off') {
        toggleService.value = false
    }
}

let iconChange = ref(0)

const enIconColor = computed( () => {
    if(enData.value?.attributes?.rgb_color) {
        return `rgb${enData.value?.attributes?.rgb_color}`
    } else {
        if(enType.value === 'light' && enData.value?.state === 'on') {
            return enSettings.value?.state?.on?.color
        }
    }

    return null

})

onMounted( () => {
    watch(toggleService, value => {
        
        if(props.entity) {
            let bufer = store.state.robonomicsUIvue.rws.telemetry

            if(bufer?.entities) {
                let state = null
                if(value) {
                    state = 'on'
                } else {
                    state = 'off'
                }

                bufer.entities[props.entity].state = state

                let launch = `{"platform": ${enType.value}, "service": toggle, "parameters": {"entity_id": ${props.entity}, "state": ${state} }}`

                store.commit('rws/setTelemetry', bufer)
                store.commit('rws/setLaunch', launch)
            }
        }
    })

    watch(enData.value, value => {
        if(enServices?.value?.toggle) {
            if(value.state === 'on') {
                toggleService.value = true
            }
            if(value.state === 'off') {
                toggleService.value = false
            }
            iconChange.value += 1
        }
        
    })

    // if(props.entity){
    //     console.log('entity', props.entity)
    //     console.log('enData', enData)
    // }

})

</script>

<style scoped>
    .robo-entity--disabled {
        cursor: default;
        filter: grayscale(1);
        opacity: 0.5;
        pointer-events: none;
    }
</style>