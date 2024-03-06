import { encodeAddress } from "@polkadot/util-crypto"
import CryptoJS from 'crypto-js'

const store = {
    modules: {
        polkadot: {
            namespaced: true,

            state: () => ({
                accounts: localStorage.getItem('robonomicsUIPolkadotAccounts') ? JSON.parse(localStorage.getItem('robonomicsUIPolkadotAccounts')) : [],
                address: localStorage.getItem('robonomicsUIPolkadotAddress') ?? '',
                balanceXRT: null,
                chain: '32',
                // chain: localStorage.getItem('robonomicsUIPolkadotChain') ?? '32',
                extension: localStorage.getItem('robonomicsUIPolkadotExtension') ?? '',
                extensionObj: JSON.parse(localStorage.getItem('robonomicsUIPolkadotExtensionObj')) ? JSON.parse(localStorage.getItem('robonomicsUIPolkadotExtensionObj')) : {},
                wallet: localStorage.getItem('robonomicsUIPolkadotWallet') ?? '', /* Some wallets use common polkadot-js extension flag */
            }),

            mutations: {
                setAccounts(state, value) {
                    state.accounts = value
                    localStorage.setItem('robonomicsUIPolkadotAccounts', JSON.stringify(state.accounts))
                },
                setAddress(state, value) {
                    if(value && value !== '') {
                        state.address = encodeAddress(value, state.chain)
                    }
                    else {
                        state.address = value
                    }
                    localStorage.setItem('robonomicsUIPolkadotAddress', state.address)
                },
                setBalanceXRT(state, value) {
                    state.balanceXRT = value
                },
                setExtension(state, value) {
                    state.extension = value
                    localStorage.setItem('robonomicsUIPolkadotExtension', state.extension)
        
                    /* also set a wallet */
                    if(window.walletExtension?.isNovaWallet) {
                        state.wallet = 'nova'
                    } else {
                        state.wallet = state.extension
                    }
                    localStorage.setItem('robonomicsUIPolkadotWallet', state.wallet)
                },
                setExtensionObj(state, value) {
                    state.extensionObj = value
                    localStorage.setItem('robonomicsUIPolkadotExtensionObj', JSON.stringify(state.extensionObj))
                },
                setChain(state, value) {
                    state.chain = value
                    localStorage.setItem('robonomicsUIPolkadotChain', state.chain)
                },
            },

            actions: {
                async getAccounts({state, commit}, chain = state.chain) {
                    let accounts = [], result = [];
        
                    if(window.injectedWeb3[state.extension]) {
                        let getExtension = window.injectedWeb3[state.extension]
        
                        const wallet = await getExtension.enable('Robonomics')
                        
                        try {
                            accounts = await wallet.accounts.get()
                            
                            // convert address to chain format
                            result = accounts.map((item) => ({
                                    ...item, 
                                    address: encodeAddress(item.address, chain) 
                            }))

                            commit('setAccounts', result)
                            commit('setExtensionObj', wallet)
                        } catch (err) {
                            console.log(err)
                        }
                    
                                
                    } else {
                        commit('setAccounts', '')
                        commit('setExtensionObj', '')
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
                            if (window?.injectedWeb3 && Object.keys(window.injectedWeb3).length > 0) {
                              clearTimeout(timeout);
                              clearInterval(interval);
                              return resolve();
                            }
                          }, 200);
                    });
                },

                // disconnect({commit}) {
                //     console.log('+ disconnect')
                //     commit('setBalanceXRT', '')
                //     commit('setExtension', '')
                //     commit('setExtensionObj', '')
                //     commit('setChain', '')
                //     commit('setAccounts', '')
                //     commit('setAddress', '')
                //     console.log('- disconnect')
                // }
            }
        },

        rws: {
            namespaced: true,

            state: () => ({
                list: localStorage.getItem('robonomicsUIrwslist') ?? [],
                active: localStorage.getItem('robonomicsUIrwsactive') ?? '',
                expiredate: null, // do not save to local storage; timestamp
                users: null, // do not save to local storage
                links: {
                    activate: null,
                    setup: null,
                    setupnew: null,
                    list: null,
                    devices: null,
                    users: null,
                    useractivate: null,
                    hasetup: null
                },
                devices: {
                    view: 'Devices'
                },
                key: null,
                telemetry: null,
                launch: null
            }),

            // getters: {
            //     users: state => {
            //         const i = state.list.map(item => item.owner).indexOf(state.active)
            //         return state.list[i].users
            //     }
            // },

            mutations: {
                setLinkActivate(state, value) {
                    state.links.activate = value
                },
                setLinkList(state, value) {
                    state.links.list = value
                },
                setLinkSetup(state, value) {
                    state.links.setup = value
                },
                setLinkSetupnew(state, value) {
                    state.links.setupnew = value
                },
                setLinkDevices(state, value) {
                    state.links.devices = value
                },
                setLinkUsers(state, value) {
                    state.links.users = value
                },
                setLinkUseractivate(state, value) {
                    state.links.useractivate = value
                },
                setLinkHaSetup(state, value) {
                    state.links.hasetup = value
                },
                setActive(state, value) {
                    state.active = value
                    localStorage.setItem('robonomicsUIrwsactive', state.active)
                },
                setKey(state, value) {
                    state.key = value
                },
                setTelemetry(state, value) {
                    state.telemetry = value
                },
                setLaunch(state, value) {
                    state.launch = value
                },
                setExpiredate(state, value) {
                    state.expiredate = value
                },
                setUsers(state, value) {
                    state.users = value
                }
            },

            actions: {
                encrypt({state}, value) {
                    return CryptoJS.AES.encrypt(value, state.key).toString()
                },

                decrypt({state}, value) {
                    return CryptoJS.AES.decrypt(value, state.key).toString(CryptoJS.enc.Utf8)
                },

                setList({state, dispatch}, value) {
                    state.list = value
                    if(state.list?.length > 0) {
                        dispatch('encrypt', JSON.stringify(state.list)).then( list => {
                            localStorage.setItem('robonomicsUIrwslist', list)
                        }) 
                    } else {
                        localStorage.setItem('robonomicsUIrwslist', [])
                    }
                },

                init( {state, dispatch} ) {
                    
                    if(localStorage.getItem('robonomicsUIrwslist')) {
                        const res = CryptoJS.AES.decrypt(localStorage.getItem('robonomicsUIrwslist'), state.key).toString(CryptoJS.enc.Utf8)
                        dispatch('setList', JSON.parse(res))
                    } else {
                        dispatch('setList', [])
                    }

                    dispatch('getActive')
                },

                import({state, commit, dispatch}, value) {

                    if(value.length > 0 && typeof value === 'string') {
                        const res = CryptoJS.AES.decrypt(value, state.key).toString(CryptoJS.enc.Utf8)
                        const importDecrypted = JSON.parse(res)
                        
                        /* support old import files (they had an array of objects, multiple rws in one) */
                        if(importDecrypted?.length > 0) {
                            importDecrypted.forEach((i) => {
                                dispatch('add', i)
                            })
                        } else {
                            dispatch('add', importDecrypted)
                        }
                        
                        return true
                    } else {
                        return false
                    }
                    
                },

                // value - rws owner
                findrws({state}, value) { 
                    return state.list.map(item => item.owner).indexOf(value)
                },

                // value - rws
                add({state, commit, dispatch}, value) {
     
                    dispatch('findrws', value.owner).then( index => {

                        if(index < 0) {
                            // add new
                            value.changed = true
                            state.list.push(value)
                        } else {
                            // edit
                            state.list[index] = value
                            state.list[index].changed = true
                        }
                        
                        commit('setActive', value.owner)
                        dispatch('rewrite', state.list)
                    })
                },

                // value - List of all rws
                rewrite({dispatch}, value) {
                    dispatch('setList', value)
                    dispatch('getActive')
                },

                getActive({state, commit}) {
                    if(state.list?.length > 0) {
                        if(!state.active || !state.list.find(rws => rws.owner === state.active)) {
                            commit('setActive', state.list.at(-1).owner)
                        }  
                    } else {
                        commit('setActive', '')
                    }
                },

                clearall({state, commit}) {

                    // clear rws list
                    localStorage.setItem('robonomicsUIrwslist', [])
                    state.list = []

                    // clear active account for rws
                    commit('setActive', '')
                },

                // value - rws owner
                clear({state, commit, dispatch}, value) {
                    dispatch('findrws', value).then( current => {
                        if(current > -1) {
                            state.list.splice(current, 1)
                            dispatch('rewrite', state.list)
    
                            if(state.list.length > 0) {
                                // set active account for rws
                                commit('setActive', state.list.at(-1).owner)
                            } else {
                                // clear active account for rws
                                commit('setActive', '')
                            }
                        }
                    })
                },

                create({commit, dispatch}, {owner, controller, scontroller, name}) {
                    let newrws = {}
                    Object.assign(newrws, 
                        {owner: owner}, 
                        {controller: controller}, 
                        {scontroller: scontroller}, 
                        {name: name},
                        {changed: true}
                    )
                    dispatch('add', newrws)
                },

                setChanged({state, dispatch}, {rwsowner, value}) {
                    dispatch('findrws', rwsowner).then( index => {
                        if(index > -1) {
                            state.list[index].changed = value
                            dispatch('rewrite', state.list)
                        }  
                    })
                },

                // usersupdate({state, dispatch}, value) {
                //     console.log('rwsowner, value', state.active, value)
                //     // dispatch('findrws', rwsowner).then( index => {
                //     //     if(index > -1) {
                //     //         state.list[index].users = value
                //     //         dispatch('rewrite', state.list)
                //     //     }  
                //     // })
                // }

            },
        },

        ipfs: {
            namespaced: true,

            state: () => ({
                gateways: [], /* IPFS gateways */
                activegateway: localStorage.getItem('robonomicsUIipfsActivegateway') ?? null, /* IPFS gateways */
            }),

            mutations: {
                setActiveGateway(state, value) {
                    state.activegateway = value
                    localStorage.setItem('robonomicsUIipfsActivegateway', state.activegateway)
                },
                setGateways(state, value) {
                    state.gateways = value
                    if(!state.activegateway) {
                        state.activegateway = state.gateways[0]
                        localStorage.setItem('robonomicsUIipfsActivegateway', state.gateways[0])
                    }
                },
            }
        },

        app: {
            namespaced: true,

            state: () => ({
                status: null
            }),

            actions: {
                setStatus({state}, {value, timeout}) {
                    state.status = value
                    
                    if(timeout) {
                        setTimeout( () => {
                            state.status = null
                        }, timeout)
                    }
                }
            }
        }
    }
}

export default store