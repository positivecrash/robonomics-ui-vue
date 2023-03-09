<template>
    <component 
        :is="whatCard"
        :class="classes"
        :icon="icon"
        :name="name"
        :status="status"

        :card="card"
        :entity="entity"
    />
</template>

<script>
  export default { name: 'RoboTemplateEntity' }
</script>

<script setup>
import { defineProps, computed, ref, onMounted  } from 'vue'
import entityStatuses from '../entities/statuses'
import entitiyTypes from '../entities/types'
import {getEntityType} from '../entities/utils'

const props = defineProps({
    card: {
        type: String
    },
    entity: {
        type: Object
    },
    name: {
        type: String,
        required: true
    }
})

let entity = ref(props.entity).value

const classes = computed( () => {
    return {
      [`robo-entity--disabled`]: !entity.state || entity.state === 'unavailable'
    }
})

/* + NAME */
const getEntityName = () => {
    if(typeof props.name != 'string'){
        console.warn('[robonomics-ui-vue]: wrong prop type for "name" in robo-template-entity, expected string, got: ', typeof props.name)
        return
    }

    return props.name.split('.')[1]
}

let name = ref(getEntityName())
/* - NAME */

/* + SETTINGS (type, icon, text etc from external file) */
const getSettings = () => {

    // try to get type, if we have not in income object
    if(!entity.hasOwnProperty('type')) {
        entity.type = getEntityType(props.name , entitiyTypes)
    }
    if(entity.hasOwnProperty('type') && Array.isArray(entity.type)) {
        for (const status of entityStatuses) {
            if(status.type.every(v => entity.type.some(entityValue => entityValue == v))){
                return status
            }
        }
    } else {
        return null
    }
}

let settings = ref(getSettings())

/* - SETTINGS (type, icon, text etc from external file) */

/* + ICON */
const getIcon = (settings) => {

    if(entity.state) {
        if(settings?.state && settings.state.hasOwnProperty(entity.state)) {
            return settings.state[entity.state].icon
        } else {
            if (settings?.icon){
                return settings.icon
            } else {
                return null
            }
        }
    } else {
        if (settings?.state && settings.state.hasOwnProperty('unavailable')) {
            return settings.state['unavailable'].icon
        } else {
            return null
        }
    }
}

const icon =  getIcon(settings.value)
/* - ICON */

/* + STATUS */
const getStatus = (settings) => {

    if(entity.state && settings?.state && settings.state.hasOwnProperty(entity.state) && settings.state[entity.state].text) {
        return settings.state[entity.state].text
    } else if (settings?.text){
        return settings.text
    } else if (entity?.state) {
        if(entity.state === 'unavailable') {
            //rewrite text for unavailable
            return 'n/a'
        } else{
            return entity.state
        }
    } else if (settings?.state && settings.state.hasOwnProperty('unavailable')?.text) {
        return settings.state['unavailable'].text
    } else {
        return 'n/a'
    }
}

const status =  getStatus(settings.value)
/* - STATUS */

// const checkType = (type) => {
//     if(Array.isArray(entity.type)) {
//         return entity.type.every((element) => type.includes(element))
//     }

//     if(typeof entity.type === 'string') {
//         return type.every((element) => entity.type === element)
//     }
// }

/* + determine card component */
import {EntityInfo, EntityLight} from '../entities/cards'

const whatCard = computed(() => {
    return ({
      'light': EntityLight
    }[entity.type] ?? EntityInfo)
})
/* - determine card component */

onMounted(() => {
    // console.log('props.card', props.card)
    // console.log('settings', settings)
    // console.log('entity', entity)
    // console.log('entityStatuses', entityStatuses)
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