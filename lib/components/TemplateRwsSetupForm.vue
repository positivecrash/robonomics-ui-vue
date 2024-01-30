<template>
    <robo-section offset="x05">
        <robo-grid offset="x0" gap="x05" columns="1">
            <robo-input label="Owner" v-model="owner" :disabled="!create" @input="changecheck('owner', owner)" required />
            <robo-input label="Name of setup" v-model="name" @input="changecheck('name', name)" required />
            <robo-input label="Controller (technical account, no tokens required)" v-model="controller" @input="changecheck('controller', controller)" required />
            <robo-input label="Controller's seed phrase" v-model="controllerseed" @input="changecheck('controllerseed', controllerseed)" required type="password" />
        
            <robo-button 
                @click.prevent="submit" 
                :disabled="changed.length === 0 || error || process" 
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
  /* TODO:
  добавить кнопку генерации имени;
  добавить проверки на формат адресов Полкадот и сидов;
  проверку на дублирование подписки и вопрос перезаписать или нет?
  проверка на то добавлен ли юзер в подиску
   */
</script>

<script setup>
import { ref, computed, defineEmits, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
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

let changed = ref([])
let rwslist = ref('')
let owner = ref('')
let name = ref('')
let controller = ref('')
let controllerseed = ref('')

let getrws = () => {
    if(!props.create) {
        store.dispatch('rws/findrws', active.value).then( index => {
            if(index > -1) {
                rwslist.value = store.state.robonomicsUIvue.rws.list[index]
                owner.value = rwslist.value?.owner
                name.value = rwslist.value?.name
                controller.value = rwslist.value?.controller
                controllerseed.value = rwslist.value?.scontroller
            } else {
                owner.value = ''
                name.value = ''
                controller.value = ''
                controllerseed.value = ''
            }
        })
    }
}

let changecheck = (field, input) => {

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

let error = ref(null)
let process = ref(false)
let rwsbufer = ref({})
let statuscomp = ref('init')

/*  функция-связь, прокидываемая в основное приложение */
let save = (status, msg, type) => {

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

let processing = type => {
    
    process.value = true

    setTimeout(() => {
        
        rwsbufer.value = {}
        Object.assign(rwsbufer.value, 
            {owner: owner.value}, 
            {controller: controller.value}, 
            {scontroller: controllerseed.value}, 
            {name: name.value})

        emit('onUpdate', rwsbufer.value, (status, msg) => save(status, msg, type))
    }, 1000)
}

let submit = () => {
    if(props.create) {
        processing('create')
    } else {
        // if only name changed, do not send, only change the name
        if(changed.value.length === 1 && changed.value[0] === 'name') {

            store.dispatch('rws/findrws', owner.value).then( index => {
                process.value = true
                if(index >= 0) {
                    // если такая подпсика есть, то записываем имя
                    rws.value[index].name = name.value
                    store.dispatch('rws/add', rws.value[index])
                    process.value = false
                }

                // обнуляем счетчик измнений, submit становится disabled
                changed.value = []
            })
        } else {
            processing('update')
        }
    }
}

onMounted( () => {
    getrws()

    watch(() => active.value, () => {
      getrws()
      changed.value = []
    })

    watch(() => props.create, () => {
      getrws()
    })
})

</script>

<style>
    .robo-input.changed {
        --border: var(--robo-color-blue);
        --label: var(--robo-color-blue);
    }
</style>