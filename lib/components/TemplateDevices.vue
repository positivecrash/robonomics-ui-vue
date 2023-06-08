<template>
    <robo-section 
        v-if="!config?.dashboard"
        imaged="notfound"
        imagedtitle="You need first configure dashboard in Home Assistant"
        width="narrow" 
        gcenter
    />

    <template v-else>
        <robo-tabs>
            <template v-for="( item, i ) in config.dashboard?.views" :key="i">
                <robo-tab :label="item.title">
                    <robo-grid type="masonry" columns="3" offset="x05" gap="x05">
                    
                        <robo-card class="entity-card" v-for="( card, i ) in item.cards" :key="i" :allowExpand="card?.type === 'picture-elements'">

                            <robo-text v-if="card.title" title="3" offset="x05">{{card.title}}</robo-text>

                            <robo-grid 
                                :type="card?.type === 'glance' ? 'flex' : 'grid'" 
                                offset="x0" 
                                gap="x05" 
                                :columns="( card?.entities && card?.type === 'glance' ) ? card?.entities.length : null"
                            >

                                <template v-if="card?.entities">
                                    <robo-template-entity 
                                        v-for="(entity, key) in card.entities" :key="key"
                                        :entity="entity.entity ? entity.entity : entity"
                                        :config="config"
                                        :card="card"
                                        :launchStatus="launchStatus"
                                    />
                                </template>
                                <template v-else-if="card?.entity">
                                    <robo-template-entity 
                                        :entity="card.entity"
                                        :config="config"
                                        :card="card"
                                        :launchStatus="launchStatus"
                                    />
                                </template>
                                <template v-else>
                                    <robo-template-entity
                                        :config="config"
                                        :card="card"
                                        :launchStatus="launchStatus"
                                    />
                                </template>
                            </robo-grid>

                        </robo-card>

                    </robo-grid>
                </robo-tab>
            </template>
        </robo-tabs>
    </template>
</template>

<script>
  export default { name: 'RoboTemplateDevices' }
</script>

<script setup>
import { defineProps, defineEmits, computed, ref, onMounted } from 'vue'
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
    launchStatus: {
        type: Array
    }
})


// onMounted(() => {
//     console.log('props.config', props.config)
//     console.log('props.telemetry', props.telemetry)
// }) 

</script>