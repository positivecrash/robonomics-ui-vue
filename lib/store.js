// import { encodeAddress } from "@polkadot/util-crypto"

const store = {
    namespaced: true,
    state: () => ({
        polkadot: {
            address: localStorage.getItem('robonomicsUIPolkadotAddress') ?? '',
            extension: localStorage.getItem('robonomicsUIPolkadotExtension') ?? '',
            chain: localStorage.getItem('robonomicsUIPolkadotChain') ?? '32',
        }
    }),
    getters: {
        polkadot: state => state.polkadot
    },
    mutations: {
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
        }
    },
    actions: {
        async getPolkadotAccounts({state}) {
            let accounts = ''
            if(window.injectedWeb3[state.polkadot.extension]) {
                let getExtension = window.injectedWeb3[state.polkadot.extension]
                await getExtension.enable('Robonomics dApp').then(
                    async (value) => {
                        const accs = await value.accounts.get()
                        accounts = accs.map((item) => Object.keys(item).reduce((acc, key) => {
                            if(key === 'address') {
                                // acc[key] = item[key]
                                acc[key] = encodeAddress(item[key], state.polkadot.chain)
                            }
                            return acc
                        }, {}))}).catch(
                            (reason) => {
                            console.log('[robonomics-ui-vue]:', reason)
                        })
            } else {
                console.log('[robonomics-ui-vue]: no extension found')
            }

            return accounts
        }
    }
  }

export default store