<template>
    <robo-section width="narrow">
        <robo-grid gap="x1" columns="1">

            <robo-account-polkadot
                extensionAllowShift
                extensionShowIcon
                selectable
                selectstyle
                selectblock
                selecttitle="Connect an account"
            />

            <template v-if="!chainInfoUploaded">
                <robo-text weight="normal-italic"><robo-loader size="1.5" /> Loading data from chain</robo-text>
            </template>

            <template v-if="chainInfoUploaded">

                <robo-section v-if="rwsExpiration" card>
                    <robo-text weight="bold" size="small">
                        You have a subscription with an expiration date
                        <robo-text :highlight="setStatusView(expiresin)" inline>{{expiration}}</robo-text>
                    </robo-text>
                </robo-section>

                <robo-section v-if="store.state.robonomicsUIvue.polkadot.balanceXRT < price" card>
                    <robo-text weight="bold" size="small">
                        Your balance is lower than a price for the subscription: 
                        <robo-text highlight="error" inline nowrap>{{store.state.robonomicsUIvue.polkadot.balanceXRT}} XRT</robo-text>.  
                        Please, top up your account first in <i class="networkname">{{store.state.robonomicsUIvue.polkadot.network}}</i>.
                    </robo-text>
                </robo-section>

                <robo-section v-if="!expiresin || expiresin > 0">
                    <robo-grid gap="x05" columns="1">
                        <robo-grid-item borderbottom>
                            Price from: <b>~ {{roundprice(price)}} XRT </b> 

                            <robo-details>
                                <template #summary><robo-icon icon="circle-question" /></template>
                                <robo-grid gap="x05">
                                    <robo-text size="small">To purchase or renew a subscription, you only need to have apprx. 1.5 - 2 XRT tokens in your account balance. Learn about XRT on Robonomics’ website - https://robonomics.network/xrt/</robo-text>
                                    <robo-text weight="bold" size="small">Where to buy XRT</robo-text>
                                    <robo-link href="https://app.basilisk.cloud/trade"><robo-text size="small">Basilisk</robo-text></robo-link>
                                    <robo-link href="https://app.solarbeam.io/exchange/swap"><robo-text size="small">Solarbeam</robo-text></robo-link>
                                    <robo-link href="https://trade.kraken.com/markets/kraken/xrt/usd"><robo-text size="small">Kraken</robo-text></robo-link>
                                </robo-grid>
                            </robo-details>
                        </robo-grid-item>

                        <robo-grid-item borderbottom>Activation time <b>~ {{activationtime}} min</b></robo-grid-item>

                        <robo-grid-item>Available subscriptions: <b>{{available}}</b></robo-grid-item>
                    </robo-grid>
                </robo-section>

                <robo-button 
                    @click.prevent="activate"
                    :disabled="status !== 'init' || expiresin < 0"
                    :loading="status === 'processing'"
                    :type="buttonstatus"
                    block
                >
                    {{buttontext}}
                </robo-button>

            </template>

            <robo-status v-if="message" :type="messagestatus" solid>{{message}}</robo-status>

        </robo-grid>
    </robo-section>

</template>

<script>
  export default { name: 'RoboTemplateRwsBuy' }
</script>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { dateGetRange, dateGetString, setStatusView, generateName } from '../../tools';

import { useStore } from 'vuex';
const store = useStore();

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
    },
});

const emit = defineEmits(['onActivate']);
const status = ref('init'); // init, ok, error (incoming) + 'processing'
const message = ref(null);

const expiration = computed( () => {
    return dateGetString(props.rwsExpiration);
});

const expiresin = computed( () => {
    if(props.rwsExpiration) {
        return dateGetRange(props.rwsExpiration);
    } else {
        return null;
    }
});

const buttontext = computed( () => {
    if(status.value === 'init') {
        if(expiresin?.value > 0) {
            return 'Renew subscription';
        } else {
            return 'Buy subscription';
        }
    } else {
        return ({
            'ok': 'Subscription activated',
            'error': 'Something went wrong'
        }[status.value] ?? 'Processing');
    }
});

const buttonstatus = computed( () => {
    return ({
    'ok': 'ok',
    'error': 'error'
    }[status.value] ?? 'primary');
});

const messagestatus = computed( () => {
    return ({
        'ok': 'ok',
        'error': 'error',
    }[status.value] ?? 'warning');
});

const roundprice = (price) => {
    try {
        return parseFloat(price).toFixed(0);
    } catch (e) {
        return price;
    }
};

const activate = () => {

    status.value = 'processing';
    message.value = 'Please, wait here for the activation process';

    if(!store.state.robonomicsUIvue.polkadot.address) {
        status.value = 'error';
        message.value = 'Please, connect the account to proceed';
        return;
    }

    emit('onActivate', (st, msg) => {

        if(st === 'cancel') {
            status.value = 'init';
            message.value = 'The activation process has been canceled';
            return;
        }

        if(st === 'error') { 
            status.value = 'error';
            message.value = msg ?? 'Something went wrong during the activation process';
            return;
        }

        if(st === 'ok') {
            store.dispatch('rws/add', {owner: store.state.robonomicsUIvue.polkadot.address, name: generateName()});
            status.value = 'ok';
            message.value = 'Subscription has been activated. Please, check the list of your setups.';
        }
        
    });
};

watch( () => store.state.robonomicsUIvue.polkadot.address, () => {
    status.value = 'init';
    message.value = null;
}, { immediate: true });




// let setRwsAddressActive = () => {
//     const accs = store.state.robonomicsUIvue.polkadot.accounts
//     const rws = store.state.robonomicsUIvue.rws.active

//     if(rws && accs && accs.find(acc => acc.address === rws)) {
//         store.commit('polkadot/setAddress', rws)
//     }
// }

// onMounted( () => {

//     setRwsAddressActive()

//     watch( () => store.state.robonomicsUIvue.polkadot.accounts, () => {
//         setRwsAddressActive()
//     })

//     watch( () => store.state.robonomicsUIvue.rws.active, () => {
//         setRwsAddressActive()
//     })

// })


</script>