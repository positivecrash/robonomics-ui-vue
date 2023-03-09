<template>

    <robo-grid offset="x1" gap="x05" columns="1">

        <robo-grid-item>
            <robo-account-polkadot
                extensionAllowShift
                extensionShowIcon
                selectable
                selectstyle
                selectblock
                type="ed25519"
            />
            <robo-text size="small">
                <robo-link href="https://wiki.robonomics.network/docs/sub-activate/#create-owner-and-controller-accounts">How to create ed25519 account</robo-link>
            </robo-text>
        </robo-grid-item>

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

    <robo-section info>
        <robo-text size="small" paragraphs weight="normal-italic">
            <p>Robonomics smart home intergration allows you to interact with smart devices and robots. Interaction is carried out by transactions within Robonomics parachain instead of centralized cloud services.</p>
            <p>The Robonomics RWS subscription guarantees the ability to send transactions stably every block. It is a good choice if you want to receive data from devices and manage them remotely.</p>
        </robo-text>
    </robo-section>

    <robo-button 
        @click.prevent="activateRWS()"
        :disabled="processing"
        :loading="processing"
        :type="status ? status : 'primary'"
        block
    >
        {{buttontext}}
    </robo-button>

    <robo-text v-if="message" :highlight="status ? status : null">
        {{message}}
    </robo-text>

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

const emit = defineEmits(['onRwsActivate'])

let activateRWS = () => {
    processing.value = true

    emit('onRwsActivate', (status, message) => rwsStatus(status, message))
}

let rwsStatus = (statusFromApp, messageFromApp) => {
    if(statusFromApp) { 
        status.value = statusFromApp 
        processing.value = false
    }
    if(messageFromApp) { message.value = messageFromApp }

    if(status.value  === 'ok') {
        const rwsAddress = store.state.robonomicsUIvue.polkadot.address
        store.commit('rws/setActive', rwsAddress)
    }
}

const buttontext = computed( () => {
    return ({
    'ok': 'RWS activated',
    'error': 'something went wrong'
    }[status.value] ?? 'Activate RWS')
})
/* - Processing */

onMounted( () => {
    watch( () => store.state.robonomicsUIvue.polkadot.address, () => {
        status.value = null
        message.value = null
    })
})

</script>