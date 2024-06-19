<template>

    <robo-section v-if="!users || users.length < 1" width="narrow" gcenter>
        <robo-text weight="bold">Please, <robo-link :router="store.state.robonomicsUIvue.rws.links.setup">add users</robo-link> to the subscription first</robo-text>
    </robo-section>
    <template v-else>
        <robo-section v-if="needsignin === 'y'" width="narrow" gcenter>
            <robo-rws-user-signin />
        </robo-section>

        <template v-if="needsignin === 'n'">

            <robo-section v-if="!config" width="narrow" gcenter>
                <robo-text weight="bold"><robo-loader /> Waiting for configuration data</robo-text>
            </robo-section>

            <robo-section v-if="config && !config?.dashboard" width="narrow" gcenter>
                <robo-text weight="bold">You need first configure dashboard in Home Assistant</robo-text>
            </robo-section>

            <template v-if="config && config?.dashboard">
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
    </template>

    <RoboSignIn />
</template>

<script>
  export default { name: 'RoboTemplateDevices' }
</script>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import RoboSignIn from '../components/SignIn.vue'
import entitiyTypes from '../entities/types'
import {getEntityType} from '../entities/utils'

import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    config: {
        type: [Object, String]
    },
    launchStatus: {
        type: Array
    }
})

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users
})

const needsignin = computed( () => {
    return store.state.robonomicsUIvue.rws.user.needsignin;
})

</script>