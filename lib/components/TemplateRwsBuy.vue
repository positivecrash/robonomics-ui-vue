<template>

    <robo-section offset="x0" width="narrow">
        <robo-grid offset="x0" gap="x1" columns="1">

                <robo-account-polkadot
                    extensionAllowShift
                    extensionShowIcon
                    selectable
                    selectstyle
                    selectblock
                    type="ed25519"
                />

                <robo-status v-if="expDate" :type="expStatus">Expiration date: {{expDate}}</robo-status>

                <robo-account-polkadot-generate
                    v-model:name="newaccountName"
                    v-model:password="newaccountPassword"
                    v-model:address="newaccountAddress"
                    v-model:json="newaccountJson"
                />

                <robo-section offset="x05" v-if="newaccountAddress">
                    <robo-text size="small">You just created account: {{newaccountAddress}}</robo-text>
                    <robo-text size="small" weight="bold">To use your account, please import it into one of the Polkadot extensions using the downloaded <a @click="downloadJson(newaccountJson, newaccountName)" href="javascript:;">JSON file</a> and the password you provided while creating</robo-text>
                </robo-section>

            <robo-text size="small" weight="normal-italic">
                <robo-grid offset="x0" gap="x05" columns="1">
                
                    <robo-grid-item>To purchase or renew a subscription, you only need to have apprx. 1.5 - 2 XRT tokens in your account balance. Learn about XRT on Robonomics’ website - https://robonomics.network/xrt/</robo-grid-item>

                    <robo-grid-item borderbottom>
                        Price from: <b>~ {{priceRound}} XRT </b> 

                        <robo-details>
                            <template #summary><robo-icon icon="circle-question" /></template>
                            <robo-grid offset="x0" gap="x05">
                                <robo-text weight="bold">Where to buy XRT</robo-text>
                                <robo-link href="https://app.solarbeam.io/exchange/swap">Solarbeam</robo-link>
                                <robo-link href="https://trade.kraken.com/markets/kraken/xrt/usd">Kraken</robo-link>
                            </robo-grid>
                        </robo-details>
                    </robo-grid-item>

                    <robo-grid-item borderbottom>Activation time <b>~ {{activationtime}} min</b></robo-grid-item>

                    <robo-grid-item>Available subscriptions: <b>{{available}}</b></robo-grid-item>
                </robo-grid>
            </robo-text>

            <robo-grid-item>
                <robo-button 
                    @click.prevent="activateRWS()"
                    :disabled="(status === 'processing') || expPeriod < -1"
                    :loading="status === 'processing'"
                    :type="buttonstatus"
                    block
                >
                    {{buttontext}}
                </robo-button>
                
                <robo-section offset="x05">
                    <robo-status v-if="localerror" type="warning">
                        {{localerror}}
                    </robo-status>

                    <robo-text v-if="message" :highlight="messagestatus">
                        {{message}}
                    </robo-text>
                </robo-section>
            </robo-grid-item>
        </robo-grid>
    </robo-section>

</template>

<script>
  export default { name: 'RoboTemplateRwsBuy' }
</script>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, watch } from 'vue'
import { generateAddress } from '../polkadot/tools'
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
const status = ref(null) // ok, error
const message = ref(null) // string
const localerror = ref(null)

const emit = defineEmits(['onActivate'])

let newacc = () => {
    const { mnemonic, json } = generateAddress()
    return [json.address, mnemonic]
}

// const rwsExpiration = computed( () => {
//   return store.state.robonomicsUIvue.rws.expiredate
// })

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

const defaultButtonText = computed( () => {
    if(props.rwsExpiration) {
        if( expPeriod.value < -1 ) {
            return 'Your subscription is active'
        } else {
            return 'Renew subscription'
        }
    } else {
        return 'Buy subscription'
    }
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

            if(props.rwsExpiration) {
                // если подписка существует ??
            }
            else {
                /* Generates user, controller and name; */
                const owner = store.state.robonomicsUIvue.polkadot.address
                const controller = newacc()
                const controlleraddr = controller[0]
                const controllerseed = controller[1]
                const name = generateName()

                store.dispatch('rws/create', { owner, controller: controlleraddr, controllerseed, name })
            }

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

const buttontext = computed( () => {
    return ({
    'ok': 'RWS activated',
    'error': 'Something went wrong'
    }[status.value] ?? defaultButtonText.value)
})

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
/* - Processing */

/* + Generate new account */
import { downloadJson } from '../tools'
let newaccountName = ref(null)
let newaccountPassword = ref(null)
let newaccountAddress = ref(null)
let newaccountJson = ref(null)
/* - Generate new account */
</script>