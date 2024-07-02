<template>
    <robo-grid type="flex" galign="stretch" offset="x05" gap="x05" valign="center">
        <robo-text title="3" offset="x0">
            <template v-if="create">Manual configuration for existing subscription</template>
            <template v-else>Subscription settings</template>
        </robo-text>

        <robo-details popupMaxHeight="fit-content">
            <template #summary><robo-button outline size="tiny">Download backup</robo-button></template>

            <robo-grid offset="x0" gap="x05" columns="1">
                <robo-text offset="x025" weight="normal-italic" size="small">Share easy setup settings for the application with users in your subscription or setup new settings for uploading on your home server.</robo-text>
                <robo-button @click.prevent="exportSettingsUser()" title="Share Subscription Settings with a user" size="small" block><robo-icon icon="arrow-down" /> For users</robo-button>
                <robo-account-polkadot-generate 
                class="generativeline-tog" 
                beforename="Controller" 
                labelpassword="A password for new Controller account *" 
                labelbutton="Download new settings" 
                @on-generate="exportSettingsServer">
                    <template #link><robo-button title="Import settings into the server (for admins only). Requires resetting of Controller!" type="error" size="small" block><robo-icon icon="arrow-down" /> For the server</robo-button></template>
                    <template #title>New settings for the server</template>
                    <template #description>
                        <robo-text offset="x05" weight="normal-italic">Mind please, by clicking the "Download new settings" button <b>you will reset a Controller</b> for your subscription here and you will need to upload this settings file with new Controller to your home server.</robo-text>
                    </template>
                    <template #successmsg>Controller address has been set up. Remember to save your password and JSON file. If everything is saved, close this popup to proceed.</template>
                </robo-account-polkadot-generate>
            </robo-grid>
        </robo-details>
    </robo-grid>

    <robo-section offset="x05">
        <robo-grid offset="x0" gap="x05" columns="1">
            
            <div class="generativeline">
                <robo-input 
                    label="Name of setup" 
                    v-model="name" 
                    @input="changesave('name', name)" 
                    :tipchanged="namechanged" 
                    required 
                />
                <robo-button clean class="generativeline-tog" @click.prevent="createname"><robo-icon icon="wand-magic"/></robo-button>
            </div>

            <robo-address-polkadot 
                label="Owner (payable account with tokens)" 
                v-model="owner" 
                :disabled="!create" 
                @input="changesave('owner', owner)"  
                :tipchanged="ownerchanged" 
                placeholder="Polkadot address"
                required
            />

            <div class="generativeline">
                <robo-address-polkadot 
                    label="Controller (technical account, no tokens required)" 
                    v-model="controller" 
                    @input="changesave('controller', controller)" 
                    :tipchanged="controllerchanged"
                    placeholder="Polkadot address of ed25519 account" 
                    required
                />
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
import { generateName, downloadJson } from '../tools'
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


/* + CHANGE */
const changesave = (field, input) => {

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

const changecheck = (field, input) => {
    if(changed.value.indexOf(`${field}`) !== -1) {
        return true;
    }
    return false;
}

const namechanged = computed(() => {
    return changecheck('name', name.value);
});

const ownerchanged = computed(() => {
    return changecheck('owner', owner.value);
});

const controllerchanged = computed(() => {
    return changecheck('controller', controller.value);
});

/* - CHANGE */

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
    changesave('name', name.value)
}


/* + IMPORTS */

const exportSettingsUser = () => {
  let rwsobj = {}
  Object.assign(rwsobj, store.state.robonomicsUIvue.rws.list.find(item => item.owner === store.state.robonomicsUIvue.rws.active))
  const filename = 'robonomics.app-settings-' + rwsobj.name.replace(/ /g, '-') + '-user'
  downloadJson(rwsobj, filename);
}

const setcontroller = (address) => {
    controller.value = address;
    // changesave('controller', controller.value);
}

const exportSettingsServer = (address, json) => {
    setcontroller(address);

    const rwsname = store.state.robonomicsUIvue.rws.list.find(item => item.owner === store.state.robonomicsUIvue.rws.active).name;
    const rwsowner = store.state.robonomicsUIvue.rws.list.find(item => item.owner === store.state.robonomicsUIvue.rws.active).owner;
    const rwscontroller = address;
    const rwscontrollerkey = JSON.stringify(json);

    const rwsobj = {'name': rwsname, 'owner': rwsowner, 'controller': rwscontroller, 'controllerkey': rwscontrollerkey};
    const filename = 'robonomics.app-settings-' + rwsobj.name.replace(/ /g, '-') + '-server';
    downloadJson(rwsobj, filename);
}

/* - IMPORTS */

onMounted( () => {
    getrws()

    console.log('changed.value', changed.value)
    watch(() => changed.value, () => {
      console.log('changed.value', changed.value)
    })

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
        changesave('controller', value)
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