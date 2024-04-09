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
            <robo-text highlight="ok" v-if="generated"><slot name="successmsg">To start using your account, import it into a Polkadot extension using the downloaded JSON file and the password you provided</slot></robo-text>
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
            default: 'Generated account'
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

    // const passlocal = ref(null)

    const passwordmodel = computed({
        // get: () => {
        //     return props.password || passlocal.value
        // },
        // set: value => {
        //     if(props.password) {
        //         emit('update:password', value)
        //     } else {
        //         passlocal.value = value
        //     }
        // }
        get: () => {
            return props.password
        },
        set: value => {
            emit('update:password', value)
        }
    })

    const addressmodel = computed({
        get: () => {
            return props.address
        },
        set: value => {
            emit('update:address', value)
        }
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

            props.beforegenerating()

            /* Generate account */
            const { json } = generateAccount(pass, filename.value)
            addressmodel.value = json.address
            jsonmodel.value = json

            const name = json.address + '-' + Date.now()
            if(props.beforename) {
                filename.value = props.beforename + '-' + name
            } else {
                filename.value = name
            }

            downloadJson(json, filename.value)
            
            generated.value = true
            filename.value = null

            props.aftergenerating()
        } else {
            errorpassword.value = true
        }
    }

    const clear = () => {
        passwordmodel.value = null
        errorpassword.value = false
        generated.value = false
    }

</script>
