<template>
    <robo-details class="account-polkadot-generate" type="popup" summarystyle="link" :afterCloseDetails="clear">
        <template #summary>
            <slot name="link" />
        </template>
        <robo-text title="3"><slot name="title">Generate new account</slot></robo-text>
        <robo-grid offset="x0" gap="x05" columns="1">
            <robo-text size="small">
                <slot name="description">
                    You can create here Polkadot ecosystem account ed25519 type in one click. Don't forget to save your password!
                </slot>
            </robo-text>
            <robo-input label="Password *" type="password" v-model="passwordmodel" :error="errorpassword" @click="errorpassword = false" />
            <robo-button @click="generate()" :type="buttontype">{{buttontitle}}</robo-button>
            <robo-text highlight="error" v-if="errorpassword">Create password and store it savely</robo-text>
            <robo-section v-if="generated" offset="x1">
                <robo-text highlight="ok" weight="bold" class="robo-line-clipoverflow" offset="x05">{{addressmodel}}</robo-text>
                <robo-text size="small" weight="bold" offset="x05">Remember to save your password and JSON file securely. If everything is saved, close this popup to proceed.</robo-text>
                <robo-text size="small" weight="bold" offset="x05"><slot name="successmsg" /></robo-text>
            </robo-section>
        </robo-grid>
    </robo-details>

</template>

<script>
  export default { name: 'RoboAccountPolkadotGenerate' }
</script>

<script setup>
    import { defineProps, defineEmits, computed, ref } from 'vue'
    import { generateAccount } from '../polkadot/tools'
    import { downloadJson } from '../tools'

    const props = defineProps({
        address: {
            type: String,
            default: null
        },
        json: {
            type: String,
            default: null
        },
        beforename: {
            type: String,
            default: false
        },
        password: {
            type: String,
            default: null
        },
        aftergenerating: {
            type: Function
        },
        beforegenerating: {
            type: Function
        }
    })

    const emit = defineEmits([
        'update:address', 'update:json', 'update:password'
    ])

    const errorpassword = ref(false)
    const filename = ref(false)
    const generated = ref(false)

    const passlocal = ref(null)
    const addresslocal = ref(null)

    const passwordmodel = computed({
        get: () => {
            return props.password || passlocal.value
        },
        set: value => {
            if(props.password) {
                emit('update:password', value)
            } else {
                passlocal.value = value
            }
        }
        // get: () => {
        //     return props.password
        // },
        // set: value => {
        //     emit('update:password', value)
        // }
    })

    const addressmodel = computed({
        get: () => {
            return props.address || addresslocal.value
        },
        set: value => {
            if(props.address) {
                emit('update:address', value)
            } else {
                addresslocal.value = value
            }
        }

        // get: () => {
        //     return props.address
        // },
        // set: value => {
        //     emit('update:address', value)
        // }
    })

    const jsonmodel = computed({
        get: () => {
            return props.json
        },
        set: value => {
            emit('update:json', value)
        }
    })

    const buttontype = computed( () => {
        if (generated.value) {
            return 'ok'
        } else {
            if(errorpassword.value) {
                return 'error'
            } else {
                return 'primary'
            }
        }
    })

    const buttontitle = computed( () => {
        if (generated.value) {
            return 'Created, check json in downloads'
        } else {
            if(errorpassword.value) {
                return 'Error, not generated'
            } else {
                return 'Create'
            }
        }
    })

    const generate = () => {
        const pass = passwordmodel.value

        if(pass) {

            if(props.beforegenerating) {
                props.beforegenerating()
            }

            /* Generate account */
            const { json } = generateAccount(pass)
            addressmodel.value = json.address
            jsonmodel.value = json

            // const name = json.address + '-' + Date.now()
            const name = json.address
            if(props.beforename) {
                filename.value = props.beforename + '-' + name
            } else {
                filename.value = name
            }

            downloadJson(json, filename.value)
            
            generated.value = true
            filename.value = null

            if(props.aftergenerating) {
                props.aftergenerating()
            }
        } else {
            errorpassword.value = true
        }
    }

    const clear = () => {
        addressmodel.value = null
        passwordmodel.value = null
        errorpassword.value = false
        generated.value = false
    }

</script>

<style scoped>
.robo-line-clipoverflow {
    display: block;
    max-width: 100%;
}
</style>

<style>
.account-polkadot-generate .robo-details-summary > *:not(:last-child){
    margin-right: var(--robo-space);
}
</style>