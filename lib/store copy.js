// import { encodeAddress } from 'polkadotUtilCrypto'
import { encodeAddress } from "@polkadot/util-crypto"

const store = {
    namespaced: true,
    state: () => ({
        polkadot: {
            accounts: localStorage.getItem('robonomicsUIPolkadotAccounts') ? JSON.parse(localStorage.getItem('robonomicsUIPolkadotAccounts')) : [],
            address: localStorage.getItem('robonomicsUIPolkadotAddress') ?? '',
            balanceXRT: null,
            chain: localStorage.getItem('robonomicsUIPolkadotChain') ?? '32',
            extension: localStorage.getItem('robonomicsUIPolkadotExtension') ?? '',
            extensionObj: JSON.parse(localStorage.getItem('robonomicsUIPolkadotExtensionObj')) ? JSON.parse(localStorage.getItem('robonomicsUIPolkadotExtensionObj')) : {},
            wallet: localStorage.getItem('robonomicsUIPolkadotWallet') ?? '', /* Some wallets use common polkadot-js extension flag */
            rws: localStorage.getItem('robonomicsUIrws') ? JSON.parse(localStorage.getItem('robonomicsUIrws')) : [],
            rwsactive: localStorage.getItem('robonomicsUIrwsactive') ?? null,
            rwsactivateLink: null,
            linkRwssetupslist: null, /* list of setups */
            linkRwssetup: null, /* new setup */
            linkRwsdevices: null, /* telemetry */
            linkRwsusers: null, /* rws users */
            linkRwsusersetup: null, /* rws setup user */
        },
        rws: {
            list: localStorage.getItem('robonomicsUIrws') ? JSON.parse(localStorage.getItem('robonomicsUIrws')) : [],
            active: localStorage.getItem('robonomicsUIrwsactive') ?? null,
            links: {
                activate: null,
                setup: null,
                list: null,
                devices: null,
                users: null,
                useractivate: null
            }
        },
        ipfs: {
            gateways: [], /* IPFS gateways */
            activegateway: localStorage.getItem('robonomicsUIipfsActivegateway') ?? null, /* IPFS gateways */
        }
    }),
    getters: {
        polkadot: state => state.polkadot,
        rws: state => state.rws,
        ipfs: state => state.ipfs,
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
        setPolkadotBalanceXRT(state, value) {
            state.polkadot.balanceXRT = value
            // localStorage.setItem('robonomicsUIPolkadotBalanceXRT', JSON.stringify(state.polkadot.balanceXRT))
        },
        setPolkadotExtension(state, value) {
            state.polkadot.extension = value
            localStorage.setItem('robonomicsUIPolkadotExtension', state.polkadot.extension)

            /* also set a wallet */
            if(window.walletExtension?.isNovaWallet) {
                state.polkadot.wallet = 'nova'
            } else {
                state.polkadot.wallet = state.polkadot.extension
            }
            localStorage.setItem('robonomicsUIPolkadotWallet', state.polkadot.wallet)
        },
        setPolkadotExtensionObj(state, value) {
            state.polkadot.extensionObj = value
            localStorage.setItem('robonomicsUIPolkadotExtensionObj', JSON.stringify(state.polkadot.extensionObj))
        },
        setPolkadotChain(state, value) {
            state.polkadot.chain = value
            localStorage.setItem('robonomicsUIPolkadotChain', state.polkadot.chain)
        },
        setRwsactivateLink(state, value) {
            state.polkadot.rwsactivateLink = value
        },
        setLinkRwssetupslist(state, value) {
            state.polkadot.linkRwssetupslist = value
        },
        setLinkRwssetup(state, value) {
            state.polkadot.linkRwssetup = value
        },
        setLinkRwsdevices(state, value) {
            state.polkadot.linkRwsdevices = value
        },
        setLinkRwsusers(state, value) {
            state.polkadot.linkRwsusers = value
        },
        setLinkRwsusersetup(state, value) {
            state.polkadot.linkRwsusersetup = value
        },
        setRwsactive(state, value) {
            state.polkadot.rwsactive = value
            localStorage.setItem('robonomicsUIrwsactive', state.polkadot.rwsactive)
        },
        setIpfsActiveGateway(state, value) {
            state.ipfs.activegateway = value
            localStorage.setItem('robonomicsUIipfsActivegateway', state.ipfs.activegateway)
        },
        setIpfsGateways(state, value) {
            state.ipfs.gateways = value
            state.ipfs.activegateway = state.ipfs.gateways[0]
            localStorage.setItem('robonomicsUIipfsActivegateway', state.ipfs.gateways[0])
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
                // console.log('[robonomics-ui-vue]: getPolkadotAccounts, no extension found')
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
        },

        importRWS({state, commit}, value) {
            // value is a string
            if(value.length > 0 ) {
                state.polkadot.rws = JSON.parse(value)
                localStorage.setItem('robonomicsUIrws', JSON.stringify(state.polkadot.rws))
                commit('setRwsactive', state.polkadot.rws[0].owner)
            }
        },

        addRWS({state}, value) {
            state.polkadot.rws.push(value)
            localStorage.setItem('robonomicsUIrws', JSON.stringify(state.polkadot.rws))
        },

        editRWS({state}, value) {
            const itemindex = state.polkadot.rws.map(item => item.owner).indexOf(value.owner)

            if(itemindex > -1) {
                state.polkadot.rws[itemindex] = value
                localStorage.setItem('robonomicsUIrws', JSON.stringify(state.polkadot.rws))
            }
        },

        deleteRWS({state}, value) {
            const itemindex = state.polkadot.rws.map(item => item.owner).indexOf(value.owner)

            if(itemindex > -1) {
                state.polkadot.rws.splice(itemindex, 1)
                localStorage.setItem('robonomicsUIrws', JSON.stringify(state.polkadot.rws))
            }
        },

        addRWSuser({state, dispatch}, {rws, user}) {
            const addto = state.polkadot.rws.map(item => item.owner).indexOf(rws.value)

            if(addto > -1) {
                state.polkadot.rws[addto].users.push(user)
                dispatch('editRWS', state.polkadot.rws[addto])
            }

        },

        editRWSuser({state, dispatch}, {rws, user}) {
            const addto = state.polkadot.rws.map(item => item.owner).indexOf(rws.value)

            if(addto > -1) {
                const userindex = state.polkadot.rws[addto].users.map(item => item.address).indexOf(user.address)
                state.polkadot.rws[addto].users[userindex] = user
                dispatch('editRWS', state.polkadot.rws[addto])
            }

        },

        deleteRWSuser({state}, {rws, user}) {
            const findrws = state.polkadot.rws.map(item => item.owner).indexOf(rws)
            const userindex = state.polkadot.rws[findrws].users.map(item => item.address).indexOf(user)

            if(userindex > -1) {
                state.polkadot.rws[findrws].users.splice(userindex, 1)
                localStorage.setItem('robonomicsUIrws', JSON.stringify(state.polkadot.rws))
            }
        },

        getRwsactive({state, commit}) {
            if(state.polkadot.rws?.length > 0) {
                if(!state.polkadot.rwsactive || !state.polkadot.rws.find(rws => rws.owner === state.polkadot.rwsactive)) {
                    commit('setRwsactive', state.polkadot.rws[0].owner)
                }  
            }
        },

        getUsers({state}) {
            if(state.polkadot.rws.length > 0 && state.polkadot.rwsactive) {
                const i = state.polkadot.rws.map(item => item.owner).indexOf(state.polkadot.rwsactive)
                return state.polkadot.rws[i]?.users
            }
        }
    }
  }

export default store