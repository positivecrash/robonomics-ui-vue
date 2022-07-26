import { encodeAddress } from "@polkadot/util-crypto"
import { web3Enable, web3FromSource } from '@polkadot/extension-dapp'

const store = {
    namespaced: true,
    state: () => ({
        polkadot: {
            accounts: localStorage.getItem('robonomicsUIPolkadotAccounts') ? JSON.parse(localStorage.getItem('robonomicsUIPolkadotAccounts')) : [],
            address: localStorage.getItem('robonomicsUIPolkadotAddress') ?? '',
            extension: localStorage.getItem('robonomicsUIPolkadotExtension') ?? '',
            extensionObj: JSON.parse(localStorage.getItem('robonomicsUIPolkadotExtensionObj')) ? JSON.parse(localStorage.getItem('robonomicsUIPolkadotExtensionObj')) : {},
            chain: localStorage.getItem('robonomicsUIPolkadotChain') ?? '32',
        }
    }),
    getters: {
        polkadot: state => state.polkadot
    },
    mutations: {
        setPolkadotAccounts(state, value) {
            state.polkadot.accounts = value
            localStorage.setItem('robonomicsUIPolkadotAccounts', JSON.stringify(state.polkadot.accounts))
        },
        setPolkadotAddress(state, value) {

            if(value) {
                state.polkadot.address = encodeAddress(value, state.polkadot.chain)
            }
            else {
                state.polkadot.address = value
            }
            localStorage.setItem('robonomicsUIPolkadotAddress', state.polkadot.address)
        },
        setPolkadotExtension(state, value) {
            state.polkadot.extension = value
            localStorage.setItem('robonomicsUIPolkadotExtension', state.polkadot.extension)
        },
        setPolkadotExtensionObj(state, value) {
            state.polkadot.extensionObj = value
            localStorage.setItem('robonomicsUIPolkadotExtensionObj', JSON.stringify(state.polkadot.extensionObj))
        },
        setPolkadotChain(state, value) {
            state.polkadot.chain = value
            localStorage.setItem('robonomicsUIPolkadotChain', state.polkadot.chain)
        },
    },
    actions: {
        async getPolkadotAccounts({state, commit}, chain = state.polkadot.chain) {
            let accounts = [], result = [];

            if(window.injectedWeb3[state.polkadot.extension]) {
                let getExtension = window.injectedWeb3[state.polkadot.extension]

                const wallet = await getExtension.enable('Robonomics DApp')
                
                try {
                    accounts = await wallet.accounts.get()

                    // convert address to chain format
                    result = accounts.map((item) => ({
                            ...item, 
                            address: encodeAddress(item.address, chain) 
                    }))

                    commit('setPolkadotAccounts', result)
                    commit('setPolkadotExtensionObj', wallet)
                } catch (err) {
                    console.log(err)
                }
            
                        
            } else {
                console.log('[robonomics-ui-vue]: getPolkadotAccounts, no extension found')
                commit('setPolkadotAccounts', '')
                commit('setPolkadotExtensionObj', '')
            }

            return result
        },

        waitWeb3Injected() {
            return new Promise(function(resolve, reject) {
                const timeout = setTimeout(() => {
                    clearTimeout(timeout);
                    clearInterval(interval);
                    return reject(new Error('[robonomics-ui-vue]: waitWeb3Injected(), no extension found'));
                  }, 3000);
                  const interval = setInterval(() => {
                    if (Object.keys(window.injectedWeb3).length > 0) {
                      clearTimeout(timeout);
                      clearInterval(interval);
                      return resolve();
                    }
                  }, 200);
            });
        }
    }
  }

export default store