<template>
    
    <robo-section class="entity" clean>

        <template v-if="card?.entities || card?.entity">
            <template v-if="card?.type === 'glance' && enIcon">
                <robo-grid type="grid" offset="x0" gap="x0" galign="center" :title="entity ?? null">
                    <robo-icon v-if="enIcon" :icon="enIcon" :key="iconChange" :color="enData?.attributes?.rgb_color ? `rgb${enData.attributes.rgb_color}` : null" />
                    <robo-template-entity-controls 
                        :config="config" 
                        :entity="entity" 
                        :data="enData"
                        :settings="enSettings"
                    />
                </robo-grid>
            </template>

            <template v-else>
                <robo-grid type="flex" offset="x0" gap="x0" valign="center" fluid>
                    <robo-grid v-if="enIcon || entity" type="flex" offset="x0" gap="x05" galign="start" valign="center">
                        <robo-icon v-if="enIcon" :icon="enIcon" :key="iconChange" :color="enIconColor" />
                        <robo-text v-if="entity" size="tiny">{{enData?.attributes?.friendly_name || entity}}</robo-text>
                    </robo-grid>

                    <robo-template-entity-controls 
                        :config="config" 
                        :entity="entity" 
                        :data="enData"
                        :settings="enSettings"
                    />
                </robo-grid>
            </template>

            <div style="font-size:9px;display:none">TemplateEntity, enData<br/> {{enData}}</div>
        </template>
        <template v-if="card?.type === 'picture-elements'">
            <robo-image v-if="card?.image" :src="`https://ipfs.io/ipfs/${card.image}`" />
        </template>

    </robo-section>
    
    <!-- <div v-if="entity" style="font-size:9px;display:none">entity<br/> {{entity}}</div> -->
</template>

<script>
  export default { name: 'RoboTemplateEntity' }
</script>

<script setup>
import { defineProps, computed, ref } from 'vue'
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
    return telemetry.value?.entities[props.entity] ?? null

    // if(props.entity && telemetry.value && telemetry.value?.entities && telemetry.value?.entities[props.entity]){
    //     return telemetry.value.entities[props.entity]
    // } else {
    //     return null
    // }
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

</script>

<style scoped>
    .robo-entity--disabled {
        cursor: default;
        filter: grayscale(1);
        opacity: 0.5;
        pointer-events: none;
    }
</style>