import { encodeAddress } from "@polkadot/util-crypto"

const store = {
    state: {
        polkadot: {
            address: typeof localStorage.robonomicsUIPolkadotAddress !== 'undefined' ? localStorage.robonomicsUIPolkadotAddress : null,
            extension: typeof localStorage.robonomicsUIPolkadotExtension !== 'undefined' ? localStorage.robonomicsUIPolkadotExtension : null,
            chain: typeof localStorage.robonomicsUIPolkadotChain !== 'undefined' ? localStorage.robonomicsUIPolkadotChain : '32',
        }
      
    },
    getters: {
        polkadot: state => state.polkadot,
    },
    mutations: {
        setPolkadotAddress(state, value) {
            state.polkadot.address = encodeAddress(value, state.polkadot.chain)
            // state.polkadot.address = value
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
            
            let getExtension = window.injectedWeb3[state.polkadot.extension]
            await getExtension.enable('Robonomics dApp').then(
                async (value) => {
                    const accs = await value.accounts.get()
                    accounts = accs.map((item) => Object.keys(item).reduce((acc, key) => {
                        if(key === 'address') {
                            // acc[key] = 'test' + item[key]
                            acc[key] = encodeAddress(item[key], state.polkadot.chain)
                        }
                        return acc
                    }, {}))
            }).catch(
                (reason) => {
                console.log('[robonomics-ui-vue]:', reason)
            })

            return accounts
        }
    }
  }

export default store