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
                chain: localStorage.getItem('robonomicsUIPolkadotChain') ?? '32',
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
                    if(value) {
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
            }
        },

        rws: {
            namespaced: true,

            state: () => ({
                list: localStorage.getItem('robonomicsUIrwslist') ? localStorage.getItem('robonomicsUIrwslist') : [],
                active: localStorage.getItem('robonomicsUIrwsactive') ?? null,
                links: {
                    activate: null,
                    setup: null,
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

            getters: {
                users: state => {
                    const i = state.list.map(item => item.owner).indexOf(state.active)
                    return state.list[i].users
                }
            },

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
                }
            },

            actions: {
                import({state, commit, dispatch}, value) {

                    if(value.length > 0 && typeof value === 'string') {
                        const res = CryptoJS.AES.decrypt(value, state.key).toString(CryptoJS.enc.Utf8)
                        const importDecrypted = JSON.parse(res)
                        dispatch('save', importDecrypted)
                        commit('setActive', importDecrypted.owner)
                        return true
                    } else {
                        return false
                    }
                    
                },

                // Instead of rewrite, add, edit
                save({state, dispatch}, value) {
                    dispatch('rwsexistance', value).then( result => {
                        if(result < 0) {
                            // add new
                            state.list.push(value)
                        } else {
                            // edit
                            const itemindex = state.list.map(item => item.owner).indexOf(value.owner)
                            state.list[itemindex] = value
                        }

                        dispatch('saveData', { name: 'robonomicsUIrwslist', value: state.list, stringify: true })
                    })
                },

                clearall({state, commit}) {

                    // clear rws list
                    localStorage.setItem('robonomicsUIrwslist', [])
                    state.list = []

                    // clear active account for rws
                    commit('setActive', null)
                },

                rewrite({dispatch}, value) {

                    if(value?.length > 0) {
                        dispatch('saveData', { name: 'robonomicsUIrwslist', value: value, stringify: true })
                        dispatch('getActive')
                    }
                },
        
                add({state, dispatch}, value) {

                    state.list.push(value)
                    dispatch('saveData', { name: 'robonomicsUIrwslist', value: state.list, stringify: true })
                    
                },
        
                edit({state, dispatch}, value) {
                    const itemindex = state.list.map(item => item.owner).indexOf(value.owner)
        
                    if(itemindex > -1) {
                        state.list[itemindex] = value
                        dispatch('saveData', { name: 'robonomicsUIrwslist', value: state.list, stringify: true })
                    }
                },
        
                delete({state, dispatch}, value) {
                    const itemindex = state.list.map(item => item.owner).indexOf(value.owner)
        
                    if(itemindex > -1) {
                        state.list.splice(itemindex, 1)
                        // localStorage.setItem('robonomicsUIrws', JSON.stringify(state.list))
                        dispatch('saveData', { name: 'robonomicsUIrwslist', value: state.list, stringify: true })
                    }
                },

                rwsexistance({state}, value) {
                    console.log('test', state.list, typeof state.list, state.list.length)
                    return state.list.map(item => item.owner).indexOf(value.owner)
                },
        
                addUser({state, dispatch}, {rws, user}) {
                    const addto = state.list.map(item => item.owner).indexOf(rws)

                    if(addto > -1) {
                        state.list[addto].users.push(user)
                        dispatch('edit', state.list[addto])
                    }
                },
        
                editUser({state, dispatch}, {rws, user}) {
                    const addto = state.list.map(item => item.owner).indexOf(rws)
        
                    if(addto > -1) {
                        const userindex = state.list[addto].users.map(item => item.address).indexOf(user.address)
                        state.list[addto].users[userindex] = user
                        dispatch('edit', state.list[addto])
                    }
        
                },
        
                deleteUser({state, dispatch}, {rws, user}) {
                    const findrws = state.list.map(item => item.owner).indexOf(rws)
                    const userindex = state.list[findrws].users.map(item => item.address).indexOf(user)
                    if(userindex > -1) {
                        state.list[findrws].users.splice(userindex, 1)
                        dispatch('edit', state.list[findrws])
                        // localStorage.setItem('robonomicsUIrws', JSON.stringify(state.list))
                    }
                },

                userexistance({state}, {rws, user}) {
                    const addto = state.list.map(item => item.owner).indexOf(rws)

                    if(addto > -1) {
                        return state.list[addto].users.map(item => item.address).indexOf(user.address)
                    }
                },

                userslist({state}, rws) {
                    const index = state.list.map(item => item.owner).indexOf(rws)
                    
                    if(index > -1) {
                        return state.list[index].users
                    } else {
                        return []
                    }
                },
        
                getActive({state, commit}) {
                    if(state.list?.length > 0) {
                        if(!state.active || !state.list.find(rws => rws.owner === state.active)) {
                            commit('setActive', state.list[0].owner)
                        }  
                    }
                },

                saveData({state, dispatch}, {name, value, stringify}) {

                    let result = value

                    if(stringify) {
                        result = JSON.stringify(value)
                    }

                    state.list = value

                    const encrypted = CryptoJS.AES.encrypt(result, state.key).toString()
                    localStorage.setItem(name, encrypted)
                    
                },
                

                encrypt({state}, value) {
                    return CryptoJS.AES.encrypt(value, state.key).toString()
                },

                decrypt({state}, value) {
                    return CryptoJS.AES.decrypt(value, state.key).toString(CryptoJS.enc.Utf8)
                },

                init( {state, dispatch} ) {
                    if(localStorage.getItem('robonomicsUIrwslist')) {
                        const res = CryptoJS.AES.decrypt(localStorage.getItem('robonomicsUIrwslist'), state.key).toString(CryptoJS.enc.Utf8)
                        state.list = JSON.parse(res)
                    } else {
                        state.list = []
                    }

                    dispatch('getActive')
                }
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