<template>

<robo-grid v-if="viewSelected === 'Devices'" type="masonry" columns="3" offset="x05" gap="x05">
    <robo-card v-for="(item, i) in entitiesAsDevices" :key="i">
        <robo-text title="3">{{ item.name }}</robo-text>

        <template v-if="item.entities">
            <robo-template-entity 
                v-for="(entity, i) in item.entities" :key="i"
                :name="i"
                :entity="entity"
            />
        </template>
    </robo-card>
</robo-grid>

<robo-tabs v-if="viewSelected === 'Home Assistant'">
    <template v-for="( item, i ) in entitiesAsHass" :key="i">
        <robo-tab :label="item.title">
            <robo-grid type="masonry" columns="4" offset="x05" gap="x05">
                
                <robo-card class="entity-card" v-for="( card, i ) in item.cards" :key="i">

                    <robo-text v-if="card.title" title="3" offset="x05">{{card.title}}</robo-text>

                        <robo-grid :type="card.type==='glance' ? 'flex' : 'grid'" offset="x0" gap="x05" :columns="( card.entities && card.type==='glance' ) ? card.entities.length : null">
                            <template v-if="card.entities">
                                <robo-template-entity 
                                    v-for="(entity, key) in card.entities" :key="key"
                                    :name="entity.entity ? entity.entity : entity"
                                    :entity="entity"
                                    :card="card.type"
                                />
                            </template>
                            
                            <template v-else-if="card.entity">
                                <robo-template-entity 
                                    :name="card.entity"
                                    :entity="card"
                                    :card="card.type"
                                />
                            </template>
                        </robo-grid>

                </robo-card>

            </robo-grid>
        </robo-tab>
    </template>
</robo-tabs>

</template>

<script>
  export default { name: 'RoboTemplateDevices' }
</script>

<script setup>
import { defineProps, computed, ref, onMounted, inject } from 'vue'
import entitiyTypes from '../entities/types'
import {getEntityType} from '../entities/utils'

/* + get rws */
import { useStore } from 'vuex'
const store = useStore()

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})
/* - get rws */



const props = defineProps({
    config: {
        type: [Object, String]
    },
    telemetry: {
        type: [Object, String]
    },
    lastUpdate: {
        type: String
    }
})

/* + WORK WITH ENTITITES */
const parseProps = toParse => {
    if(!toParse) {
        return
    }

    if( typeof toParse === 'string') {
        return JSON.parse(toParse)
    } else {
        return toParse
    }
}

let entitiesAsDevices = ref(null)
let entitiesAsHass = ref(null)
let entitiesAsType = ref(null)


if(props.telemetry) {
    entitiesAsDevices.value = parseProps(props.telemetry?.devices)

    if(props.config) {
        /* Get entities from Home Assistant */
        const configHass = parseProps(props.config)

        if(configHass.hasOwnProperty('dashboard') && configHass.dashboard.hasOwnProperty('views') ) {
            entitiesAsHass = configHass.dashboard.views
        }

        let services = ref(parseProps(props.config?.services)) //test

        // проходим по устройствам из телеметрии: 
        // к устройствам добавляем нам нужное поле "тип" для форматированного вывода
        if(entitiesAsDevices && Object.keys(entitiesAsDevices).length > 0 && entitiyTypes) {
            Object.entries(entitiesAsDevices.value).forEach(([k,v]) => {
                if(v.entities) {
                    Object.entries(v.entities).forEach(([k2,v2]) => {
                        v2.type = getEntityType(k2, entitiyTypes)
                    })
                }
            })
        }


        // проходим по устройствам из hass конфига: 
        // добавляем к entity данные из телеметрии с устройства
        if(entitiesAsHass && Object.keys(entitiesAsHass).length > 0 && entitiesAsDevices && Object.keys(entitiesAsDevices).length > 0) {

            Object.values(entitiesAsHass).forEach(v => {

                Object.entries(v.cards).forEach(([k2, v2]) => {

                    Object.values(entitiesAsDevices.value).forEach( v3 => {

                        if(v3.hasOwnProperty('entities')) {

                            Object.entries(v3.entities).forEach(([k4,v4]) => {
                                
                                // если в карточке только однин entity
                                if(v2.hasOwnProperty('entity')) {
                                    if(k4 == v2.entity) {
                                        v2 = Object.assign(v2,v4)
                                    }
                                }

                                // если в карточке много entities, другая структура
                                if(v2.hasOwnProperty('entities')) {

                                    v2.entities.forEach( (e, i) => {
                                        // иногда почему-то тут же поступает просто массив строк,
                                        // превращаем строку в объект
                                        if( typeof e === 'string') {
                                            v2.entities[i]  = {entity: e}
                                        }

                                        // если из конфига hass поступает объект
                                        if(e.hasOwnProperty('entity')) {    
                                            if(k4 === e.entity) {
                                                v2.entities[i] = Object.assign(v2.entities[i], v4)
                                            }
                                        }

                                    })
                                }
                            })
        
                        }

                    })

                    v.cards[k2] = v2

                })
            })
        }
    }
}

/* - WORK WITH ENTITITES */


const viewSelected = computed( () => {
    return store.state.robonomicsUIvue.rws.devices.view
})

// import CryptoJS from 'crypto-js'

// onMounted( () => {
//     // const key = inject('keydata')
//     // console.log('key inject', key)
//     // const test = CryptoJS.AES.encrypt("be be be", key).toString()
//     // const test2 = CryptoJS.AES.decrypt(test, key).toString(CryptoJS.enc.Utf8)
//     // console.log('test', test, test2)
//     // store.dispatch('rws/saveData', { name: 'testdata', value: '[test: "test", test: "test"]', stringify: true })
// })

</script>

<style scoped>
    .robo-card {
        --card-padding: 10px;
    }

    .entity-card .robo-grid:not(:first-child) {
        padding-top: var(--gap);
        border-top: 1px dotted var(--color-text);
    }
</style>