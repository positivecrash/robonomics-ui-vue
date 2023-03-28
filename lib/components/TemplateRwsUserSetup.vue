<template>

    <robo-layout-section width="narrow" vcenter gcenter v-if="rws?.length < 1">
            <robo-template-rws-users-empty :checkusers="false" />
    </robo-layout-section>

    <template v-else>
        <form>

            <robo-grid offset="x0" gap="x1" columns="1">
                <robo-grid-item>
                    <robo-select 
                        :options="rws.map(item => item.name)" 
                        :values="rws.map(item => item.owner)" 
                        v-model="rwsactiveModel"
                        :label="edit ? 'RWS' : 'Add user to this RWS'"
                        block
                        :disabled="edit"
                    />
                </robo-grid-item>

                <robo-grid-item>
                    <robo-address-polkadot 
                        v-model:address="addressModel" 
                        chain="32" 
                        label="User address (ed25519)"
                        :error="addressModelError"
                        @click="reset('addressModelError')"
                        :disabled="edit"
                    />

                    <robo-text size="small" v-if="!edit">
                        <robo-link href="https://wiki.robonomics.network/docs/sub-activate/#create-owner-and-controller-accounts">How to create account</robo-link>
                    </robo-text>
                </robo-grid-item>

                <robo-grid-item>
                    <robo-input 
                        label="Name of user"
                        v-model="nameModel"
                        :error="nameModelError"
                        @click="reset('nameModelError')"
                    />
                </robo-grid-item>

                <robo-grid-item>

                    <robo-button 
                    @click.prevent="adduser()"
                    :disabled="processing"
                    :loading="processing"
                    :type="status ? status : 'primary'"
                    block
                    >
                    {{buttontext}}
                    </robo-button>
                    
                </robo-grid-item>

                <robo-grid-item v-if="message">
                    <robo-text :highlight="status ? status : null" v-html="message" />
                </robo-grid-item>

                <robo-grid-item v-if="status === 'error' && statustype">
                    <robo-text highlight="error">
                        <template v-if="statustype === 'missdata'">Oops! Looks like you missed filling in some required fields. Please fill in all required fields and try again.</template>
                        <template v-if="statustype === 'duplicated'">The user you are trying to add is already in your <robo-link :router="store.state.robonomicsUIvue.rws.links.users">RWS</robo-link></template>
                    </robo-text>
                </robo-grid-item>


            </robo-grid>

        </form>
    </template>

</template>

<script>
  export default { name: 'RoboTemplateRwsUserSetup' }
</script>

<script setup>
import { ref, computed, defineProps, defineEmits, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    owner: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    edit: {
        type: Boolean,
        default: false
    }
})


const emit = defineEmits([
    'update:address', 'update:name',
    'onUserSetup', 'onUserEdit'
])


/* + get rws */
const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})
/* - get rws */


/* + models */
let rwsactiveModel = ref(null)
if(props.edit && props.owner) {
    rwsactiveModel.value = props.owner
} else {
    store.dispatch('rws/getActive')
    rwsactiveModel.value = store.state.robonomicsUIvue.rws.active
    onMounted( () => {
        watch(rwsactiveModel, value => {
            store.commit('rws/setActive', value)
        })
    })
}

const addressModel = computed({
    get: () => {
      return props.address
    },
    set: value => {
        emit('update:address', value)
    }
})

const nameModel = computed({
    get: () => {
      return props.name
    },
    set: value => {
        emit('update:name', value)
    }
})

let addressModelError = ref(false)
let nameModelError = ref(false)
/* - models */

/* + process */
let processing = ref(false)
let status = ref(null) // ok, error
let statustype = ref(null) // duplicated, missdata
let message = ref(null) // string

const pending = computed(() => {
    let summary = {}
    summary.address = addressModel.value
    summary.name = nameModel.value
    return summary
})

let userStatus = (statusFromApp, messageFromApp) => {
    if(statusFromApp) { 
        status.value = statusFromApp
        processing = false
    }
    if(messageFromApp) { message.value = messageFromApp }

    if(status.value  === 'ok') {

        if(props.edit) {
            store.dispatch('rws/editUser', { rws: rwsactiveModel, user: pending.value })
        } else {
            store.dispatch('rws/addUser', { rws: rwsactiveModel, user: pending.value })
        }
    }
}

const buttontext = computed( () => {
    if(!props.edit) {
        return ({
        'ok': 'User added',
        'error': 'something went wrong'
        }[status.value] ?? '+ Add user')
    } else {
        return ({
        'ok': 'User saved',
        'error': 'something went wrong'
        }[status.value] ?? 'Save')
    }
})

let reset = (model) => {
   message.value = null
   statustype.value = null
   status.value = null
   
   if(model === 'addressModelError' ) { addressModelError.value = false }
   if(model === 'nameModelError' ) { nameModelError.value = false }
}


let adduser = () => {

    if(!addressModel.value || !nameModel.value) {
        status.value='error'
        statustype.value = 'missdata'
        if(!addressModel.value) { addressModelError.value = true }
        if(!nameModel.value) { nameModelError.value = true }
        return
    }

    /* If user in this rws exists, don't do anything except showing error */
    store.dispatch('rws/userexistance', { rws: rwsactiveModel, user: pending.value }).then( result => {
        if(result < 0) {
            processing = true

            if(props.edit) {
                emit('onUserEdit', (status, message) => userStatus(status, message))
            } else {
                emit('onUserSetup', (status, message) => userStatus(status, message))
            }

        } else {
            status.value = 'error'
            statustype.value = 'duplicated'
        }
    })
}

/* - process */

</script>