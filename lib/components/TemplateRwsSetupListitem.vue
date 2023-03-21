<template>
    <robo-grid class="robo-rws-list-item" columns="1" offset="x0" gap="x05">
        <robo-grid :columns="columnsSize" offset="x0" gap="x05" valign="center">
            <robo-grid type="flex" offset="x0" galign="start" gap="x05">
                <robo-text :highlight="isActiveColor" galign="center">
                    <robo-icon icon="circle-check" v-if="isActive > 5" />
                    <robo-icon icon="clock" v-else />
                </robo-text>
                <robo-text title="3" offset="x0" break>
                    {{nameModel}}
                </robo-text>
            </robo-grid>
            <robo-details type="popup">
                <template #summary>
                    <robo-button size="small"><robo-icon icon="pencil" /></robo-button>
                </template>

                <robo-template-rws-setup 
                    edit

                    v-model:owner="ownerModel"
                    v-model:controller="controllerModel"
                    v-model:scontroller="scontrollerModel"
                    v-model:name="nameModel"
                    v-model:enddate="props.enddate"

                    @on-rws-edit="props.onEdit"
                />
            </robo-details>

            <robo-button size="small" @blur="requestedDelete = false" @click.prevent="requestedDelete ? deleteItem() : requestedDelete = true" :type="requestedDelete ? 'error' : 'primary'">
                <robo-icon icon="xmark" />
                <span v-if="requestedDelete">Delete this?</span>
            </robo-button>
        </robo-grid>

        <robo-text v-if="status === 'error' && message" highlightLabel="error">{{message}}</robo-text>
    </robo-grid>

</template>

<script>
  export default { name: 'RoboTemplateRwsSetupListitem' }
</script>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const emit = defineEmits([
    'update:owner', 'update:controller', 'update:scontroller', 'update:name',
    'onRwsDelete'
])

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
    enddate: {
        type: String,
        default: null
    },
    edit: {
        type: Boolean,
        default: false
    },
    onEdit: {
        type: Function
    }
})

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


/* + Check and set status for date */
import { checkStatus, setStatusView } from '../tools'

const isActive = computed( () => {
    return checkStatus(props.enddate)
})

const isActiveColor = computed( () => {
    return setStatusView(isActive.value)
})
/* - Check and set status for date */


/* + DELETE */

let status = ref(null) // ok, error
let message = ref(null) // string
let requestedDelete = ref(false)

const columnsSize = computed( () => {
    if(!requestedDelete.value) {
        return 'auto 40px 40px'
    } else {
        return 'auto 40px auto'
    }
})

let rwsDelete = (statusFromApp, messageFromApp) => {
    if(statusFromApp) { status.value = statusFromApp }
    if(messageFromApp) { message.value = messageFromApp }

    if(status.value === 'ok' && requestedDelete.value === true) {
        let rwsItem = {}
        rwsItem.owner = ownerModel.value
        rwsItem.controller = controllerModel.value
        rwsItem.scontroller = scontrollerModel.value
        rwsItem.name = nameModel.value
        store.dispatch('rws/delete', rwsItem)
    }
}

let deleteItem = () => {
    emit('onRwsDelete', (status, message) => rwsDelete(status, message))
}

/* - DELETE */
</script>

<style scoped>
.robo-rws-list-item {
    background-color: var(--robo-color-light-100-4);
    padding: 10px !important;
}

@media (prefers-color-scheme: dark){
    .robo-rws-list-item {
        background-color: var(--robo-color-light-100-2);
    }
}
</style>