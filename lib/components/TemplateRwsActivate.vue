<template>

    <robo-section offset="x0" width="narrow">
        <robo-grid offset="x0" gap="x1" columns="1">

            <robo-grid offset="x0" gap="x05" columns="1">
                <robo-grid-item>
                    <robo-account-polkadot
                        extensionAllowShift
                        extensionShowIcon
                        selectable
                        selectstyle
                        selectblock
                        type="ed25519"
                    />
                </robo-grid-item>

                <robo-grid-item>
                    <robo-account-polkadot-generate
                        v-model:name="newaccountName"
                        v-model:password="newaccountPassword"
                        v-model:address="newaccountAddress"
                        v-model:json="newaccountJson"
                    />

                    <template v-if="newaccountAddress">
                        <robo-text size="small">You created account: {{newaccountAddress}}</robo-text>
                        <robo-text size="small" weight="bold">To use your account, please import it into one of the Polkadot extensions using the downloaded <a @click="downloadJson(newaccountJson, newaccountName)" href="javascript:;">JSON file</a> and the password you provided while creating</robo-text>
                    </template>
                </robo-grid-item>
            </robo-grid>

            <robo-grid offset="x0" gap="x05" columns="1">
                
                <robo-grid-item back>
                    <robo-text size="small">
                        Price from: <b>~ {{priceRound}} XRT </b> 

                        <robo-details linkstyle>
                            <template #summary>Where to buy XRT</template>
                            <robo-grid offset="x0" gap="x05">
                                <robo-link href="https://app.solarbeam.io/exchange/swap">Solarbeam</robo-link>
                                <robo-link href="https://trade.kraken.com/markets/kraken/xrt/usd">Kraken</robo-link>
                            </robo-grid>
                        </robo-details>
                    </robo-text>
                </robo-grid-item>

                <robo-grid-item back>
                    <robo-text size="small">Activation time <b>~ {{activationtime}} min</b></robo-text>
                </robo-grid-item>

                <robo-grid-item back>
                    <robo-text size="small">Available subscriptions: <b>{{available}}</b></robo-text>
                </robo-grid-item>
            </robo-grid>

            <robo-grid-item>

                <robo-button 
                    @click.prevent="activateRWS()"
                    :disabled="rwsStatus === 'processing'"
                    :loading="rwsStatus === 'processing'"
                    :type="buttonstatus"
                    block
                >
                    {{buttontext}}
                </robo-button>
                
                <robo-section offset="x05">
                    <robo-text v-if="rwsMessage" :highlight="messagestatus">
                        {{rwsMessage}}
                    </robo-text>
                </robo-section>
            </robo-grid-item>
        </robo-grid>
    </robo-section>

    <robo-section mark="info" marktitle="What is RWS" width="narrow">
        <p>Robonomics smart home intergration allows you to interact with smart devices and robots. Interaction is carried out by transactions within Robonomics parachain instead of centralized cloud services.</p>
        <p>The Robonomics RWS subscription guarantees the ability to send transactions stably every block. It is a good choice if you want to receive data from devices and manage them remotely.</p>
    </robo-section>

</template>

<script>
  export default { name: 'RoboTemplateRwsActivate' }
</script>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    price: {
        type: [Number, String]
    },
    activationtime: {
        type: [Number, String]
    },
    available: {
        type: [Number, String]
    },
    rwsStatus: {
        type: String,
        default: 'new'
    },
    rwsMessage: {
        type: String,
        default: null
    }
})

const priceRound = computed( () => {
    let n = parseFloat(props.price)

    if(n) {
        return n.toFixed(0)
    } else {
        return props.price
    }
})


/* + Processing */
let processing = ref(false)
let status = ref(null) // ok, error
let message = ref(null) // string

const emit = defineEmits(['onActivate'])

let activateRWS = () => {

    emit('onActivate')

    if(props.rwsStatus === 'ok') {
        const rwsAddress = store.state.robonomicsUIvue.polkadot.address
        store.commit('rws/setActive', rwsAddress)
    }
}

// let rwsStatus = (statusFromApp, messageFromApp) => {
//     if(statusFromApp) { 
//         status.value = statusFromApp 
//         processing.value = false
//     }
//     if(messageFromApp) { message.value = messageFromApp }

//     if(status.value  === 'ok') {
//         const rwsAddress = store.state.robonomicsUIvue.polkadot.address
//         store.commit('rws/setActive', rwsAddress)
//     }
// }

const buttontext = computed( () => {
    return ({
    'ok': 'RWS activated',
    'new': 'Activate RWS',
    'renew': 'Re-activate RWS',
    'error': 'Something went wrong'
    }[props.rwsStatus] ?? 'Activate RWS')
})

const buttonstatus = computed( () => {
    return ({
    'ok': 'ok',
    'error': 'error'
    }[props.rwsStatus] ?? 'primary')
})

const messagestatus = computed( () => {
    return ({
    'ok': 'ok',
    'error': 'error',
    'renew': 'attention',
    'new': 'attention'
    }[props.rwsStatus] ?? null)
})
/* - Processing */

/* + Generate new account */
import { downloadJson } from '../tools'
let newaccountName = ref(null)
let newaccountPassword = ref(null)
let newaccountAddress = ref(null)
let newaccountJson = ref(null)
/* - Generate new account */

// onMounted( () => {
//     watch( () => store.state.robonomicsUIvue.polkadot.address, () => {
//         status.value = null
//         message.value = null
//     })
// })

</script>