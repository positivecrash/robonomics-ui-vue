<template>
    <robo-text offset="x1">
        <p>If you already have an RWS subscription or have been added as a user to an RWS subscription, you can create a password here to access your local Home Assistant account. <robo-link href="https://wiki.robonomics.network/docs/global-administration#granting-access-to-user">More on Wiki</robo-link></p>
    </robo-text>

    <form>
        <robo-grid offset="x1" gap="x1" columns="1">

            <robo-grid-item>
                <robo-text title="3" offset="x0">User credits</robo-text>
            </robo-grid-item>

            <robo-grid-item>
                <robo-template-rws-activeselect size="small" block label="Choose RWS" />
            </robo-grid-item>

            <robo-grid-item>
                <robo-address-polkadot 
                    v-model:address="controllerModel" 
                    chain="32" 
                    label="User address"
                    :error="controllerModelError"
                    @click="reset('controllerModelError')"
                />
            </robo-grid-item>

            <robo-grid-item>
                <robo-input 
                    label="User seed (12 words)"
                    v-model="scontrollerModel"
                    type="password"
                    :error="scontrollerModelError"
                    @click="reset('scontrollerModelError')"
                    tip="The seed phrase provided here is essential for encrypting your data. We understand the sensitivity of this information and therefore, do not share it with any third parties or store it on our servers. As an extra layer of security, we recommend avoiding storing a large number of tokens in this account to reduce the risk of potential unauthorized access."
                />
            </robo-grid-item>

            <robo-grid-item>
                <robo-button 
                @click.prevent="addRWS()"
                :disabled="processing"
                :loading="processing"
                :type="buttonstatus"
                block
                >
                Check
                </robo-button>
            </robo-grid-item>
        </robo-grid>


        <robo-grid offset="x1" gap="x1" columns="1" disabled>

            <robo-grid-item>
                <robo-text title="3" offset="x0">Create / restore password</robo-text>
            </robo-grid-item>

            <robo-grid-item>
                <robo-input
                    label="New password"
                    v-model="scontrollerModel"
                    type="password"
                />
            </robo-grid-item>

            <robo-grid-item>
                <robo-input
                    label="Repeat password"
                    v-model="scontrollerModel"
                    type="password"
                />
            </robo-grid-item>

            <robo-grid-item>
                <robo-button 
                @click.prevent="addRWS()"
                :disabled="processing"
                :loading="processing"
                :type="buttonstatus"
                block
                >
                Submit
                </robo-button>
            </robo-grid-item>

            <robo-grid-item v-if="message">
                <robo-text :highlight="status ? status : null" v-html="message" />
            </robo-grid-item>

            <robo-grid-item v-if="status === 'error' && statustype">
                <robo-text highlight="error">
                    <template v-if="statustype === 'missdata'">Oops! Looks like you missed filling in some required fields. Please fill in all required fields and try again.</template>
                    <template v-if="statustype === 'duplicated'">The RWS you are trying to add is already in your <robo-link :router="store.state.robonomicsUIvue.rws.links.list">list</robo-link></template>
                </robo-text>
            </robo-grid-item>

        </robo-grid>
    </form>
</template>

<script>
  export default { name: 'RoboTemplateHaSetup' }
</script>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    owner: {
        type: String,
        default: null
    },
    controller: {
        type: String,
        default: null
    },
    scontroller: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    edit: {
        type: Boolean,
        default: false
    },
    enddate: {
        type: [Number, String],
        default: null
    }
})

const emit = defineEmits([
    'update:owner', 'update:controller', 'update:scontroller', 'update:name', 'update:enddate',
    'onRwsSetup', 'onRwsEdit',
    'ownerChanged'
])

const rwsLink = computed( () => {
    return store.state.robonomicsUIvue.rws.links.activate
})


let processing = ref(false)

const ownerModel = computed({
    get: () => {
      return props.owner
    },
    set: value => {
        emit('update:owner', value)
    }
})

const controllerModel = computed({
    get: () => {
      return props.controller
    },
    set: value => {
        emit('update:controller', value)
    }
})

const scontrollerModel = computed({
    get: () => {
      return props.scontroller
    },
    set: value => {
        emit('update:scontroller', value)
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

const enddateModel = computed({
    get: () => {
      return props.enddate
    },
    set: value => {
        emit('update:enddate', value)
    }
})


let ownerModelError = ref(false)
let controllerModelError = ref(false)
let scontrollerModelError = ref(false)
let nameModelError = ref(false)

let status = ref(null) // ok, error, cancel
let statustype = ref(null) // duplicated, missdata
let message = ref(null) // string

const pending = computed(() => {
    let summary = {}
    summary.owner = ownerModel.value
    summary.controller = controllerModel.value
    summary.scontroller = scontrollerModel.value
    summary.name = nameModel.value
    summary.enddate = enddateModel.value
    summary.users = []

    return summary
})

let rwsStatus = (statusFromApp, messageFromApp) => {
    if(statusFromApp) { 
        status.value = statusFromApp
        processing = false
    }
    if(messageFromApp) { message.value = messageFromApp }

    if(status.value  === 'ok') {
        if(props.edit) {
            store.dispatch('rws/edit', pending.value)
        } else {
            store.dispatch('rws/add', pending.value)
        }
    }
}

const buttontext = computed( () => {
    if(!props.edit) {
        return ({
        'ok': 'RWS added',
        'error': 'Something went wrong'
        }[status.value] ?? '+ Add RWS')
    } else {
        return ({
        'ok': 'RWS saved',
        'error': 'something went wrong'
        }[status.value] ?? 'Save')
    }
})

const buttonstatus = computed( () => {
    return ({
    'ok': 'ok',
    'error': 'error',
    }[status.value] ?? 'primary')
})

let reset = (model) => {
   message.value = null
   statustype.value = null
   status.value = null
   
   if(model === 'ownerModelError' ) { ownerModelError.value = false }
   if(model === 'nameModelError' ) { nameModelError.value = false }
   if(model === 'controllerModelError' ) { controllerModelError.value = false }
   if(model === 'scontrollerModelError' ) { scontrollerModelError.value = false }
}

let addRWS = () => {

    /* If some inputs are not filled, do not do anything */
    if(!ownerModel.value || !controllerModel.value || !scontrollerModel.value || !nameModel.value) {
        status.value='error'
        statustype.value = 'missdata'
        if(!ownerModel.value) { ownerModelError.value = true }
        if(!controllerModel.value) { controllerModelError.value = true }
        if(!scontrollerModel.value) { scontrollerModelError.value = true }
        if(!nameModel.value) { nameModelError.value = true }
        return
    }

    /* If rws exists, don't do anything except showing error */
    store.dispatch('rws/rwsexistance', pending.value).then( result => {
        if(result < 0) {
            processing = true

            if(props.edit) {
                emit('onRwsEdit', (status, message) => rwsStatus(status, message))
            } else {
                emit('onRwsSetup', (status, message) => rwsStatus(status, message))
            }

        } else {
            status.value = 'error'
            statustype.value = 'duplicated'
        }
    })

}

const getDate = computed( () => {
    if(enddateModel.value) {
        const date = new Date(enddateModel.value)
        const month = date.getMonth() + 1
        return date.getDate() + '/' + month + '/' + date.getFullYear()
    }
})

/* + Check and set status for date */
import { checkStatus, setStatusView } from '../tools'

const isActive = computed( () => {
    return checkStatus(props.enddate)
})

const isActiveColor = computed( () => {
    return setStatusView(isActive.value)
})
/* - Check and set status for date */

/* Based on the user's role, we require the display of different labels for the seed. 
This ensures that each user only sees the relevant information necessary for their specific role.  */
const controllerLabel = computed( () => {
    if(store.state.robonomicsUIvue.polkadot.address === ownerModel.value) {
        return 'Controller'
    } else {
        return 'Your'
    }
})

</script>