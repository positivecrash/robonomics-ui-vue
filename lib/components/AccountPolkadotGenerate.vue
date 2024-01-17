<template>

    <robo-details class="account-polkadot-generate" block type="popup" summarystyle="link">
        <template #summary>
            <robo-text>Generate new account</robo-text>
        </template>
        <robo-text title="3"><slot name="summary">Generate new account</slot></robo-text>
        <robo-grid offset="x0" gap="x05" columns="1">
            <robo-text size="small">
                <slot name="description">
                    You can create here Polkadot ecosystem account ed25519 type in one click. Don't forget to save your password!
                </slot>
            </robo-text>
            <robo-input label="Name" v-model="namemodel" @change="changedName()"/>
            <robo-input label="Password *" type="password" v-model="passwordmodel" :error="errorpassword" @click="errorpassword = false" />
            <robo-button @click="generate()" :type="buttontype">{{buttontitle}}</robo-button>
            <robo-text highlight="error" v-if="errorpassword">Create password and store it savely</robo-text>
            <robo-text highlight="ok" v-if="generated">To use your account, please import it into one of the Polkadot extensions using the downloaded JSON file and the password you provided here</robo-text>
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
        name: {
            type: String,
            default: null
        },
        password: {
            type: String,
            default: null
        },
        seed: {
            type: String,
            default: null
        }
    })

    const emit = defineEmits([
        'update:address', 'update:json', 'update:name', 'update:password', 'update:seed'
    ])

    let errorpassword = ref(false)
    let filename = ref(false)
    let generated = ref(false)

    const namemodel = computed({
        get: () => {
            return props.name
        },
        set: value => {
            emit('update:name', value)
        }
    })

    const passwordmodel = computed({
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

    const seedmodel = computed({
        get: () => {
            return props.seed
        },
        set: value => {
            emit('update:seed', value)
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
            return 'Generated, check json in downloads'
        } else {
            if(errorpassword.value) {
                return 'Error, not generated'
            } else {
                return 'Generate'
            }
        }
    })

    let generate = () => {
        if(passwordmodel.value) {
            if(!namemodel.value) {
                const id = Date.now()
                namemodel.value = 'Generated account ' + id
                filename.value = 'generated_account_' + id
            } else {
                filename.value = namemodel.value
            }

            /* Generate account */
            const { mnemonic, json } = generateAccount(passwordmodel.value, namemodel.value)
            addressmodel.value = json.address
            seedmodel.value = mnemonic
            jsonmodel.value = json
            downloadJson(json, filename.value)
            
            generated.value = true
            // remove password after generation
            // passwordmodel.value = null
            filename.value = null
        } else {
            errorpassword.value = true
        }
    }

    let changedName = () => {
        if(!passwordmodel.value) {
            generated.value = false
            addressmodel.value = null
            seedmodel.value = null
            jsonmodel.value = null
            errorpassword.value = false
        }
    }
</script>
