<template>

    <robo-section>

        <form>

        <robo-grid offset="x0" gap="x1" columns="1">
            <robo-grid-item>
                <robo-address-polkadot 
                    v-model:address="ownerModel" 
                    chain="32" 
                    label="Owner account (ed25519)"
                    :disabled="props.edit ? true : false"
                    :error="ownerModelError"
                    @click="reset('ownerModelError')"
                    @change="emit('ownerChanged')"
                />

                <robo-text size="small" v-if="!props.edit">
                    Don't have owner account? <robo-link :router="rwsLink">Activate RWS subscription</robo-link>
                </robo-text>
            </robo-grid-item>

            <robo-grid-item>
                <robo-input 
                    label="Name of dashboard"
                    v-model="nameModel"
                    :error="nameModelError"
                    @click="reset('nameModelError')"
                />
            </robo-grid-item>

            <robo-grid-item>
                <robo-address-polkadot 
                    v-model:address="controllerModel" 
                    chain="32" 
                    label="Controller account (ed25519)"
                    :error="controllerModelError"
                    @click="reset('controllerModelError')"
                />
            </robo-grid-item>

            <robo-grid-item>
                <robo-input 
                    label="Controller seed to encrypt data"
                    v-model="scontrollerModel"
                    type="password"
                    :error="scontrollerModelError"
                    @click="reset('scontrollerModelError')"
                />
            </robo-grid-item>

            <robo-grid-item v-if="ownerModel && enddateModel">
                <robo-input 
                    disabled
                    label="Active till"
                    v-model="enddateModel"
                />
            </robo-grid-item>

            <robo-grid-item>

                <robo-button 
                @click.prevent="addRWS()"
                :disabled="processing"
                :loading="processing"
                :type="status ? status : 'primary'"
                block
                >
                {{buttontext}}
                </robo-button>
                
            </robo-grid-item>

            <!-- <robo-grid-item>

            <robo-text align="center" v-if="status === 'ok'">
                <robo-link router="/telemetry">View your devices -></robo-link>
            </robo-text>
                
            </robo-grid-item> -->

            <robo-grid-item v-if="message">
                <robo-text :highlight="status ? status : null">
                    {{message}}
                </robo-text>
            </robo-grid-item>

       

        </robo-grid>

        </form>
    </robo-section>
</template>

<script>
  export default { name: 'RoboTemplateRwsSetup' }
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
        type: String,
        default: null
    }
})

const emit = defineEmits([
    'update:owner', 'update:controller', 'update:scontroller', 'update:name', 'update:enddate',
    'beforeRwsSetup', 'onRwsSetup', 'afterRwsSetup',
    'beforeRwsEdit', 'onRwsEdit', 'afterRwsEdit',
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

let status = ref(null) // ok, error
let message = ref(null) // string

let rwsStatus = (statusFromApp, messageFromApp) => {
    if(statusFromApp) { status.value = statusFromApp }
    if(messageFromApp) { message.value = messageFromApp }

    if(status.value  === 'ok') {
        let rwsItem = {}
        rwsItem.owner = ownerModel.value
        rwsItem.controller = controllerModel.value
        rwsItem.scontroller = scontrollerModel.value
        rwsItem.name = nameModel.value
        rwsItem.enddate = enddateModel.value
        rwsItem.users = []

        if(props.edit) {
            store.dispatch('rws/edit', rwsItem)
        } else {
            store.dispatch('rws/add', rwsItem)
        }
    }
}

const buttontext = computed( () => {
    if(!props.edit) {
        return ({
        'ok': 'RWS added',
        'error': 'something went wrong'
        }[status.value] ?? '+ Add RWS')
    } else {
        return ({
        'ok': 'RWS saved',
        'error': 'something went wrong'
        }[status.value] ?? 'Save')
    }
})

let reset = (model) => {
   message.value = null
   status.value = null
   
   if(model === 'ownerModelError' ) { ownerModelError.value = false }
   if(model === 'nameModelError' ) { nameModelError.value = false }
   if(model === 'controllerModelError' ) { controllerModelError.value = false }
   if(model === 'scontrollerModelError' ) { scontrollerModelError.value = false }
}


let addRWS = () => {

    if(!ownerModel.value || !controllerModel.value || !scontrollerModel.value || !nameModel.value) {
        if(!ownerModel.value) { ownerModelError.value = true }
        if(!controllerModel.value) { controllerModelError.value = true }
        if(!scontrollerModel.value) { scontrollerModelError.value = true }
        if(!nameModel.value) { nameModelError.value = true }
        return
    }

    processing.value = true

    if(props.edit) {
        emit('beforeRwsEdit')
        emit('onRwsEdit')
        emit('afterRwsEdit', (status, message) => rwsStatus(status, message))
    } else {
        emit('beforeRwsSetup')
        emit('onRwsSetup')
        emit('afterRwsSetup', (status, message) => rwsStatus(status, message))
    }

    processing.value = false
}

</script>