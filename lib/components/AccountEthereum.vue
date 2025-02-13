<template>
    <robo-details fitContent popupMinWidth="300px">
        <template #summary>
            <robo-grid type="flex" gap="x05" galign="start" class="robo-ethereum-summary">
                <template v-if="provider?.info?.icon">
                    <img :src="provider?.info?.icon" :alt="provider?.info?.name + 'connected'"/>
                </template>
                <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" viewBox="0 0 115 182" class="h-[35px] w-[22px] opacity-85 hover:opacity-100"><path fill="#F0CDC2" stroke="#1616B4" stroke-linejoin="round" d="M57.505 181v-45.16L1.641 103.171z"></path><path fill="#C9B3F5" stroke="#1616B4" stroke-linejoin="round" d="M57.69 181v-45.16l55.865-32.669z"></path><path fill="#88AAF1" stroke="#1616B4" stroke-linejoin="round" d="M57.506 124.615V66.979L1 92.28z"></path><path fill="#C9B3F5" stroke="#1616B4" stroke-linejoin="round" d="M57.69 124.615V66.979l56.506 25.302z"></path><path fill="#F0CDC2" stroke="#1616B4" stroke-linejoin="round" d="M1 92.281 57.505 1v65.979z"></path><path fill="#B8FAF6" stroke="#1616B4" stroke-linejoin="round" d="M114.196 92.281 57.691 1v65.979z"></path></svg>
                </template>
                
                <robo-text v-if="account">{{shortenAddress(account)}}</robo-text>
            </robo-grid>
        </template> 

        <section>
            <robo-text v-if="msgerror" size="small" highlight="error" offset="x1">{{msgerror}}</robo-text>

            <template v-if="providers?.length > 0">

                <!-- <robo-section v-if="accounts?.length > 1" offset="x1">
                    <robo-select  
                        :options="accounts.map(i => shortenAddress(i))" 
                        :values="accounts" 
                        block
                    />
                </robo-section> -->

                <robo-text lines="dotted" size="small" v-if="account">
                    <robo-grid v-if="provider" type="flex" gap="x025" galign="start" valign="center">
                        {{provider?.info?.name}}
                    </robo-grid>
                    <robo-grid v-if="account" type="flex" gap="x025" galign="start" valign="center">
                        <span v-html="shortenAddress(account)"/>
                        <robo-copy :text="account" />
                    </robo-grid>
                    <robo-grid v-if="chain" type="flex" gap="x025" galign="start" valign="center">
                        {{chain}}
                    </robo-grid>
                </robo-text>

                <robo-grid class="robo-ethereum-extensions" type="grid" offset="x05" gap="x1" :columns="4">
                    <robo-button v-for="item in providers" :key="item.rdns" @click.prevent="connect(item.rdns)" clean>
                        <img :src="item.icon" :alt="item.name" />
                        <!-- <span class="robo-ethereum-extensions-status">
                            <robo-icon v-if="(item.unlocked || item.unlocked === 'na') && item.connected" icon="check" size="tiny" color="var(--robo-color-green)" />
                            <robo-icon v-else icon="lock-na" size="tiny" color="var(--robo-color-dark)" />
                        </span> -->
                    </robo-button>
                </robo-grid>
            </template>
            <template v-else>
                <robo-text size="small" weight="bold">Install or switch on Ethereum wallet in your browser</robo-text>
            </template>
        </section>

    </robo-details>
</template>

<script>
  export default { name: 'RoboAccountEthereum' }
</script>

<script setup>
/* https://docs.metamask.io/wallet/reference/provider-api/ */

import { ref, onMounted, watch, isProxy, toRaw, computed, reactive, watchEffect } from 'vue';
import {shortenAddress} from '../tools'
import chains from '../eth/chains';

import { useStore } from 'vuex';
const store = useStore();

import { createStore } from 'mipd';
const mipdstore = createStore();

// const accounts = ref(null);
// const providers = ref(null);
const msgerror = ref(null);
// const balance = ref(null);
const chain = ref(null);



const state = reactive({ 
    providers: mipdstore.getProviders()
});

mipdstore.subscribe(providers => {
    console.log('Providers updated:', providers);
    state.providers = providers;
});

const account = computed(() =>{
    return store.state.robonomicsUIvue.ethereum.activeAccount;
});

const provider = computed(() =>{
    return state.providers.find(i => i.info.rdns === store.state.robonomicsUIvue.ethereum.activeProviderRdns)
});



let getProviders = (providers) => {
    try {
        let list = [];

        for (const provider of toRaw(providers)) {

            const bufer = Object.assign({}, {
                rdns: provider.info.rdns,
                icon: provider.info.icon,
                name: provider.info.name,
                // accounts: provider.provider?._state?.accounts || 'na',
                connected: provider.provider?._state?.isConnected || provider.provider?.isConnected() || null,
                unlocked: provider.provider?._state?.isUnlocked || 'na'
            });

            list.push(bufer);
        }

        return list;
    } catch (error) { console.error(error); }
}

// const getBalance = async (provider, account) => {
//     try {
//         console.log('getBalance start', provider?.info?.rdns, account);
//         const wallet = state.providers.find(i => i.info.rdns === provider?.info?.rdns);
//         wallet.provider.request({method: 'eth_getBalance', params: [account, "latest"]})
//             .then((r) => {
//                 console.log('getBalance', r);
//                 return r;
//             })
//             .catch((e) => {console.error(e)});

//     } catch (e) { console.error(e); }
// }

const getAccounts = (provider) => {
    try {
        msgerror.value = '';
        provider.provider.request({method: 'wallet_getPermissions', params: [{ eth_accounts: {} }]})
            .then( async (p) => {
                
                if(p.some(i => i.parentCapability === 'eth_accounts')) {
                    
                    provider.provider.request({ method: 'eth_requestAccounts' })
                        .then( async (accounts) => {
                            if(accounts?.length < 1) {
                                setAccount('');
                                msgerror.value = 'No connected account found';
                            } else {
                                setAccount(accounts[0]);
                            }
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                } else {
                    msgerror.value = 'Please, check permissions in your extension';
                }
            })
            .catch((e) => {
                console.error(e);
                
                if(e.code === -32002) {
                    msgerror.value = 'Permissions already requested, please check ' + wallet?.info?.name + ' extension';
                }
            });
    } catch (e) {
        console.error(e);
    }
}

let getChainName = async (provider) => {
    try {
        provider.provider.request({method: 'eth_chainId', params: [{ eth_accounts: {} }]})
        .then( (r) => {
            // store.commit('ethereum/setActiveChain', parseInt(r));
            chain.value = chains[parseInt(r)].name;
        })
        .catch( e => {
            // store.commit('ethereum/setActiveChain', '');
            console.error(e);
        });
    } catch (error) { console.error(error); }
}


let connect = async (rdns) => {
    
    try {
        msgerror.value = null;
        let wallet = state.providers.find(i => i.info.rdns === rdns);
        setProvider(rdns);

        wallet.provider.on('connect', async () => {
            providers.value = getProviders(state.providers);
        });

        wallet.provider.on('accountsChanged', () => {
            providers.value = getProviders(state.providers);
        });

        wallet.provider.on('disconnect', () => {
            providers.value = getProviders(state.providers);
        });

    } catch (e) { console.error(e); }
}

let setAccount = (account) => {
    store.commit('ethereum/setActiveAccount', account);
}

let setProvider = (rdns) => {
    store.commit('ethereum/setActiveProvider', rdns);
}

const providers = computed(() => {
    return getProviders(state.providers);
})

// watch(state.providers, (v) => {

//     /* wait for provider's states and save info to ref */
//     if(v) {
//         setTimeout(() => {
//             providers.value = getProviders(v);
//         }, 500);
//     }
    
// }, { deep: true, immediate: true });

watch(provider, async (v) => {
    if(v) {
        getAccounts(provider.value);
        await getChainName(provider.value);
    }
});

// watch(providers, (value) => {
//     console.log('providers upd', value)
// });

// watch([account, provider], async () => {
//     // balance.value = getBalance(provider.value, account.value);
// });

</script>

<style scoped>
.robo-ethereum-summary img {
    display: block;
    width: 1.4rem;
}

.robo-ethereum-extensions img {
    width: 2.5rem;
}

.robo-ethereum-extensions-status {
    display: inline-block;
}
.robo-ethereum-extensions-status .robo-icon {
    margin-left: 0.2rem;
    display: block;
}
</style>