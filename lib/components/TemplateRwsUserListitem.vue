<template>
    <robo-grid class="robo-rws-list-item" columns="1" offset="x0" gap="x05">
        <robo-grid :columns="columnsSize" offset="x0" gap="x05" valign="center">
            <robo-text title="3" offset="x0" break>
                <robo-icon icon="user" :color="roleColor" v-if="role" /> {{nameModel}}
            </robo-text>
            <robo-details type="popup">
                <template #summary>
                    <robo-button size="small"><robo-icon icon="pencil" /></robo-button>
                </template>

                <robo-template-rws-user-setup  
                    edit

                    :owner="owner"
                    v-model:address="addressModel"
                    v-model:name="nameModel"

                    @on-user-edit="props.onEdit"
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
  export default { name: 'RoboTemplateRwsUserListitem' }
</script>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const emit = defineEmits([
    'update:address', 'update:name',
    'onUserDelete'
])

const props = defineProps({
    owner: {
        type: String,
        default: null
    },
    address: {
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
    onEdit: {
        type: Function
    },
})

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

let userDelete = (statusFromApp, messageFromApp) => {
    if(statusFromApp) { status.value = statusFromApp }
    if(messageFromApp) { message.value = messageFromApp }

    if(status.value === 'ok' && requestedDelete.value === true) {
        let user = {}
        user.owner = props.owner
        user.address = addressModel.value
        store.dispatch('rws/deleteUser', { rws: user.owner, user: user.address })
    }
}

let deleteItem = () => {
    emit('onUserDelete', (status, message) => userDelete(status, message))
}

/* - DELETE */

/* + Role */
import { checkRole } from '../tools'

const role = computed( () => {
    return checkRole(addressModel.value, store.state.robonomicsUIvue.rws.active)
})

const roleColor = computed( () => {
    return ({
      'owner': 'var(--robo-color-orange)'
    }[role.value] ?? 'inherit')
})
/* - Role */
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