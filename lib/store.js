import { encodeAddress } from "@polkadot/util-crypto"

const store = {
    namespaced: true,
    state: () => ({
        polkadot: {
            accounts: JSON.parse(localStorage.getItem('robonomicsUIPolkadotAccounts')) ?? [],
            address: localStorage.getItem('robonomicsUIPolkadotAddress') ?? '',
            extension: localStorage.getItem('robonomicsUIPolkadotExtension') ?? '',
            chain: localStorage.getItem('robonomicsUIPolkadotChain') ?? '32',
            injected: null
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
        setPolkadotChain(state, value) {
            state.polkadot.chain = value
            localStorage.setItem('robonomicsUIPolkadotChain', state.polkadot.chain)
        },
        setPolkadotInjected(state, value) {
            state.polkadot.injected = value
        },
    },
    actions: {
        async getPolkadotAccounts({state, commit}, chain = state.polkadot.chain) {
            let accounts = [], result = [];

            if(window.injectedWeb3[state.polkadot.extension]) {
                let getExtension = window.injectedWeb3[state.polkadot.extension]
                await getExtension.enable('Robonomics dApp').then(
                    async (value) => {
                        accounts = await value.accounts.get()

                        // convert address to chain format
                        result = accounts.map((item) => ({
                                ...item, 
                                address: encodeAddress(item.address, chain) 
                        }))

                        commit('setPolkadotAccounts', result)
                    })
                        
            } else {
                console.log('[robonomics-ui-vue]: getPolkadotAccounts, no extension found')
                commit('setPolkadotAccounts', '')
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
                  }, 100);
            });
        }
    }
  }

export default store