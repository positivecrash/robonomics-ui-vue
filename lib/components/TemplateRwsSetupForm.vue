<template>
    <robo-section offset="x05">
        <robo-grid offset="x0" gap="x05" columns="1">
            
            <div class="generativeline">
                <robo-input label="Name of setup" v-model="name" @input="changecheck('name', name)" required />
                <robo-button clean class="generativeline-tog" @click.prevent="createname"><robo-icon icon="wand-magic"/></robo-button>
            </div>

            <robo-address-polkadot label="Owner (payable account with tokens)" v-model="owner" :disabled="!create" @input="changecheck('owner', owner)" required placeholder="Polkadot address" />

            <div class="generativeline">
                <robo-address-polkadot label="Controller (technical account, no tokens required)" v-model="controller" required placeholder="Polkadot address of ed25519 account" />
                <robo-account-polkadot-generate v-if="!create" beforename="Controller" class="generativeline-tog" @on-generate="setcontroller">
                    <template #link><robo-icon icon="wand-magic"/></template>
                    <template #title>Create tech account for the controller</template>
                    <template #successmsg>Controller address has been set up. Remember to save your password and JSON file for future use. If everything is saved, close this popup to proceed.</template>
                </robo-account-polkadot-generate>
            </div>

            <robo-button 
                @click.prevent="submit" 
                :disabled="!prechecks || error || process" 
                block 
                :loading="process"
                :type="statuscomp === 'ok' ? 'ok' : 'primary'"
            >
               <template v-if="statuscomp !== 'ok'">
                    <temlate v-if="!create">Save</temlate>
                    <temlate v-else>Add</temlate>
               </template>

                <temlate v-if="statuscomp === 'ok'">Saved</temlate>
            </robo-button>
            <robo-status v-if="error" :type="statuscomp" offset="x1">{{error}}</robo-status>
        </robo-grid>
    </robo-section>
</template>

<script>
  export default { name: 'RoboTemplateRwsSetupForm' }
</script>

<script setup>
import { ref, computed, defineEmits, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { isValidAddress } from '../polkadot/tools'
import { generateName } from '../tools'
const store = useStore()
const router = useRouter()

const props = defineProps({
    // component settings
    create: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits([
    'onUpdate'
])

const active = computed( () => {
  return store.state.robonomicsUIvue.rws.active
})

const rws = computed( () => {
  return store.state.robonomicsUIvue.rws.list
})

const changed = ref([])
const rwslist = ref('')
const owner = ref('')
const name = ref('')
const controller = ref('')

const getrws = () => {
    if(!props.create) {
        store.dispatch('rws/findrws', active.value).then( index => {
            if(index > -1) {
                rwslist.value = store.state.robonomicsUIvue.rws.list[index]
                owner.value = rwslist.value?.owner
                name.value = rwslist.value?.name
                controller.value = rwslist.value?.controller
            } else {
                owner.value = ''
                name.value = ''
                controller.value = ''
            }
        })
    }
}

const changecheck = (field, input) => {

    // обновляем статусы ошибок
    error.value = null

    if( (rwslist.value === '' && input !== '') || (rwslist.value !== '' && rwslist.value[field] !== input)) {
        if(changed.value.indexOf(`${field}`) === -1) {
            changed.value.push(`${field}`)
        }
    } else {
        if(changed.value.indexOf(`${field}`) !== -1) {
            const i = changed.value.indexOf(`${field}`)
            changed.value.splice(i)
        }
    }
}

const error = ref(null)
const process = ref(false)
const rwsbufer = ref({})
const statuscomp = ref('init')

/*  функция-связь, прокидываемая в основное приложение */
const save = (status, msg, type) => {
    process.value = false
    
    if(status === 'ok') {
        // обнуляем счетчик измнений, submit становится disabled
        changed.value = []
        // обнуляем ошибки
        error.value = null

        if(type === 'create') {
            store.dispatch('rws/create', rwsbufer.value)
        }
        if(type === 'update') {
            store.dispatch('rws/add', rwsbufer.value)
        }

        statuscomp.value = 'ok'

        setTimeout( () => {
            statuscomp.value = 'init'

            if(type === 'create') {
                if(router) {
                    router.push({path: store.state.robonomicsUIvue.rws.links.setup})
                }
            }
        }, 1000 )
    }

    if(status === 'error') {
        error.value = msg
        statuscomp.value = 'error'
    }

    if(status === 'cancel') {
        if(msg) {
            error.value = msg
        } else {
            error.value = 'The saving process has been canceled'
        }
        statuscomp.value = 'warning'

        setTimeout( () => {
            statuscomp.value = 'init'
            error.value = null
        }, 3000 )
    }
}

const processing = type => {

    process.value = true

    setTimeout(() => {
        
        rwsbufer.value = {}
        Object.assign(rwsbufer.value, 
            {owner: owner.value}, 
            {controller: controller.value},
            {name: name.value})

        emit('onUpdate', rwsbufer.value, (status, msg) => save(status, msg, type))
    }, 1000)
}

const submit = () => {
    if(props.create) {
        processing('create')
    } else {
        processing('update')
    }
}

const prechecks = computed( () => {
    return (changed.value.length > 0 && isValidAddress(owner.value) && isValidAddress(controller.value) && name.value.length > 0)
})

const createname = () => {
    name.value = generateName()
    changecheck('name', name.value)
}

const setcontroller = (address) => {
    controller.value = address;
}

onMounted( () => {
    getrws()

    watch(() => active.value, () => {
      getrws()
      changed.value = []
    })

    watch(() => props.create, value => {
      getrws()

      if(value) {
        owner.value = ''
        controller.value = ''
        name.value = ''
      }
    })

    watch( () => controller.value, value => {
        changecheck('controller', value)
    })

})

</script>

<style>
    .robo-input.changed {
        --border: var(--robo-color-blue);
        --label: var(--robo-color-blue);
    }

    .generativeline .robo-input input {
        padding-right: calc(var(--space) * 3);
    }
</style>

<style scoped>
.generativeline {
    position: relative;
}

.generativeline .generativeline-tog {
    position: absolute;
    right: 10px;
    bottom: 15px;
}
</style>