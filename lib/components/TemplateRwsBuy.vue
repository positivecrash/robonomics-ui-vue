<template>
    <robo-section offset="x0" width="narrow">
        <robo-grid offset="x0" gap="x1" columns="1">

            <robo-account-polkadot
                extensionAllowShift
                extensionShowIcon
                selectable
                selectstyle
                selectblock
            />

            <template v-if="chainInfoUploaded">
                <robo-status v-if="expDate && checkaddress" :type="expStatus">Expiration date: {{expDate}}</robo-status>

                <robo-text size="small" weight="normal-italic">
                    <robo-grid offset="x0" gap="x05" columns="1">
                        <robo-grid-item borderbottom>
                            Price from: <b>~ {{priceRound}} XRT </b> 

                            <robo-details>
                                <template #summary><robo-icon icon="circle-question" /></template>
                                <robo-grid offset="x0" gap="x05">
                                    <robo-text size="tiny">To purchase or renew a subscription, you only need to have apprx. 1.5 - 2 XRT tokens in your account balance. Learn about XRT on Robonomics’ website - https://robonomics.network/xrt/</robo-text>
                                    <robo-text weight="bold" size="small">Where to buy XRT</robo-text>
                                    <robo-link href="https://app.basilisk.cloud/trade"><robo-text size="tiny">Basilisk</robo-text></robo-link>
                                    <robo-link href="https://app.solarbeam.io/exchange/swap"><robo-text size="tiny">Solarbeam</robo-text></robo-link>
                                    <robo-link href="https://trade.kraken.com/markets/kraken/xrt/usd"><robo-text size="tiny">Kraken</robo-text></robo-link>
                                </robo-grid>
                            </robo-details>
                        </robo-grid-item>

                        <robo-grid-item borderbottom>Activation time <b>~ {{activationtime}} min</b></robo-grid-item>

                        <robo-grid-item>Available subscriptions: <b>{{available}}</b></robo-grid-item>
                    </robo-grid>
                </robo-text>

                <robo-button 
                    @click.prevent="activateRWS()"
                    :disabled="(status === 'processing') || expPeriod < -1"
                    :loading="status === 'processing'"
                    :type="buttonstatus"
                    block
                >
                    {{buttontext}}
                </robo-button>

            </template>

            <template v-if="!chainInfoUploaded">
                <robo-text weight="normal-italic"><robo-loader size="1.5" /> Loading data from chain</robo-text>
            </template>

            <robo-status v-if="localerror" type="warning">
                {{localerror}}
            </robo-status>

            <robo-text v-if="message" :highlight="messagestatus">
                {{message}}
            </robo-text>

        </robo-grid>
    </robo-section>

</template>

<script>
  export default { name: 'RoboTemplateRwsBuy' }
</script>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, watch } from 'vue'
import { generateName, dateGetRange, dateGetString, setStatusView } from '../tools'

import { useStore } from 'vuex'
const store = useStore()

import { useRouter } from 'vue-router'
const router = useRouter()

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

    rwsExpiration: {
        type: Number
    },
    chainInfoUploaded: {
        type: Boolean
    }
})

/* округление цены подписки для красоты */
const priceRound = computed( () => {
    let n = parseFloat(props.price)

    if(n) {
        return n.toFixed(0)
    } else {
        return props.price
    }
})


/* + получение даты окончание подписки */

const expPeriod = computed( () => {
   if(props.rwsExpiration) {
        return dateGetRange(props.rwsExpiration)
    } else {
        return null
    }
})

const expDate = computed( () => {
    if(props.rwsExpiration) {
        return dateGetString(props.rwsExpiration)
    } else {
        return null
    }
})

const expStatus = computed( () => {
    if(props.rwsExpiration) {
        const exp = dateGetRange(props.rwsExpiration)
        return setStatusView(exp)
    } else {
        return null
    }
})

/* - получение даты окончание подписки */

const checkaddress = computed( () => {
    return store.state.robonomicsUIvue.polkadot.address !== ''
})


/* + работа с текстом кнопки */
const defaultbuttontext = computed( () => {
    if(checkaddress.value) {
        return props.rwsExpiration < -1 ? 'Your subscription is active' : 'Renew subscription'
    } else {
        return 'Buy subscription'
    }
    
})

const buttontext = computed( () => {
    return ({
    'ok': 'RWS activated',
    'error': 'Something went wrong'
    }[status.value] ?? defaultbuttontext.value)
})

/* - работа с текстом кнопки */

/* + Status handling, bying */
const status = ref(null) // ok, error
const message = ref(null) // string
const localerror = ref(null)
const emit = defineEmits(['onActivate'])

const buttonstatus = computed( () => {
    return ({
    'ok': 'ok',
    'error': 'error'
    }[status.value] ?? 'primary')
})

const messagestatus = computed( () => {
    return ({
    'ok': 'ok',
    'error': 'error',
    'new': 'attention'
    }[status.value] ?? null)
})

let activateRWS = () => {
    status.value = 'processing'
    
    if(store.state.robonomicsUIvue.polkadot.address !== '') {
        emit('onActivate', (st, msg) => response(st, msg))
    } else {
        localerror.value = 'Please, connect the account to proceed'
    }
}

let response = (st, msg) => {
    status.value = st
    message.value = msg
}

let reset = () => {
    status.value = null
    message.value = null
}

let setRwsAddressActive = () => {
    const accs = store.state.robonomicsUIvue.polkadot.accounts
    const rws = store.state.robonomicsUIvue.rws.active

    if(rws && accs && accs.find(acc => acc.address === rws)) {
        store.commit('polkadot/setAddress', rws)
    }
}
/* - Status handling, bying */



onMounted( () => {

    setRwsAddressActive()

    watch( () => store.state.robonomicsUIvue.polkadot.accounts, () => {
        setRwsAddressActive()
    })

    watch( () => store.state.robonomicsUIvue.rws.active, () => {
        setRwsAddressActive()
    })

    watch( () => status.value, status => {

        if(status === 'ok') {

            const owner = store.state.robonomicsUIvue.polkadot.address

            store.dispatch('rws/findrws', owner).then( index => {
                if(index < 0) {
                    // generate new settings
                    const name = generateName()
                    store.dispatch('rws/create', { owner, name })
                }
            })

            // обнуляем статус
            setTimeout( () => {
                reset()
            }, 2000)
        }
    })

    watch( store.state.robonomicsUIvue.rws.list , () => {
        router.push(store.state.robonomicsUIvue.rws.links.setup)
    })

})


</script>