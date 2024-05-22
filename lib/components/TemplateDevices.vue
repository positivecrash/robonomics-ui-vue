<template>
    <robo-section v-if="!config?.dashboard" width="narrow" gcenter>
        <robo-text weight="bold">You need first configure dashboard in Home Assistant</robo-text>
    </robo-section>

    <robo-section v-if="needsignin === 'y'" width="narrow" gcenter>
        <robo-rws-user-signin />
    </robo-section>

    <template v-if="config?.dashboard && needsignin === 'n'">
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
import { computed, ref, onMounted, watch } from 'vue'
import entitiyTypes from '../entities/types'
import {getEntityType} from '../entities/utils'
import {IDBgettable, decrypt} from '../idb'
import { useStore } from 'vuex'
const store = useStore()

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})

const props = defineProps({
    config: {
        type: [Object, String]
    },
    launchStatus: {
        type: Array
    }
})


/* + User */

const useraccount = computed( () => {
  return store.state.robonomicsUIvue.rws.user.account
})

const userkey = computed( () => {
  return store.state.robonomicsUIvue.rws.user.key
})

const users = computed( () => {
    return store.state.robonomicsUIvue.rws.users
})

const webcrypto = ref(window.crypto.subtle || window.crypto.webkitSubtle)
const savedusers = ref(null)
const needsignin = ref('w')

const getKeyFromdb = async () => {
    savedusers.value = await IDBgettable('dbrws', 1, 'dbrwsuser', {index: 'user', autoIncrement: false}, [{index: 'user', unique: true}])

    if(savedusers.value.length > 0) {
         const waitkeys = new Promise((resolve, reject) => {
            savedusers.value.forEach(async (e, i, a) => {
                if(e.user === useraccount.value){
                    const pair = await decrypt(e.iv, e.key, e.pair, true)
                    store.commit('rws/setUserKey', pair )
                    resolve()
                }
                if(i === a.length-1) {
                    reject()
                }
            })
        })

        waitkeys.then(() => {
            needsignin.value = 'n'
            // if(userkey.value !== '' && userkey.value !== '') {
            //     needsignin.value = 'n'
            // } else {
            //     needsignin.value = 'y'
            // }
        }).catch( () => {
            needsignin.value = 'y'
        })
    } else {
        needsignin.value = 'y'
    }
    
}

const inituser = async () => {
    needsignin.value = 'w'

    if(useraccount.value === '' && userkey.value === '') {
        needsignin.value = 'y'
        return
    }

    if(useraccount.value && userkey.value === '') {
        if(!webcrypto.value) {
            needsignin.value = 'y'
        } else{
            await getKeyFromdb()
        }
        return
    }

    if(useraccount.value && userkey.value) {
        /* проверка есть ли такой аккаунт в подписке */
        if(!users.value.find(i => i === useraccount.value)) {
            store.commit('rws/setUser', '' )
            store.commit('rws/setUserKey', '' )
            needsignin.value = 'y'
            return
        } else{
            needsignin.value = 'n'
        }
    }
}

/* - User */

onMounted(async () => {
    // console.log('props.config', props.config)
    // console.log('props.telemetry', props.telemetry)

    await inituser()

    watch(() => users.value, async () => {
        await inituser()
    })

    watch(() => useraccount.value, async() => {
        await inituser()
    })

    watch(() => userkey.value, async() => {
        await inituser()
    })
})

</script>