import { encodeAddress } from "@polkadot/util-crypto"
import CryptoJS from 'crypto-js'
import { isencrypted, generateName } from './tools';

export const store = {
    modules: {
        polkadot: {
            namespaced: true,

            state: () => ({
                accounts: localStorage.getItem('robonomicsUIPolkadotAccounts') ? JSON.parse(localStorage.getItem('robonomicsUIPolkadotAccounts')) : [],
                address: localStorage.getItem('robonomicsUIPolkadotAddress') ?? '',
                balanceXRT: null, /* detected on mount */
                chain: '32',
                // chain: localStorage.getItem('robonomicsUIPolkadotChain') ?? '32',
                extension: localStorage.getItem('robonomicsUIPolkadotExtension') ?? '',
                extensionObj: JSON.parse(localStorage.getItem('robonomicsUIPolkadotExtensionObj')) ? JSON.parse(localStorage.getItem('robonomicsUIPolkadotExtensionObj')) : {},
                wallet: localStorage.getItem('robonomicsUIPolkadotWallet') ?? '', /* Some wallets use common polkadot-js extension flag */
                network: null, /* detected on mount */
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
                setNetwork(state, value) {
                    state.network = value;
                    localStorage.setItem('rpc-parachain', 'wss://' + value + '.rpc.robonomics.network/');
                }
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

                async disconnect({state, commit}) {
                    commit('setAddress', '')
                    commit('setBalanceXRT', null)
                    commit('setAccounts', [])
                    commit('setExtension', '')
                    commit('setExtensionObj', {})

                    if(window.injectedWeb3[state.extension]) {
                        let getExtension = window.injectedWeb3[state.extension]
                        await getExtension.disable()
                    }
                },

                detectNetwork({commit}) {
                    const endpoint = localStorage.getItem("rpc-parachain");
                    if(endpoint) {
                        commit('setNetwork', URL.parse(endpoint).host.split(".")[0]);
                    } else {
                        commit('setNetwork', 'kusama'); /* default network */
                    }
                }
            }
        },

        ethereum: {
            namespaced: true,

            state: () => ({
                activeAccount: localStorage.getItem('robonomicsUIEthereumActiveAccount') ?? '',
                activeProviderRdns: localStorage.getItem('robonomicsUIEthereumActiveProviderRdns') ?? '',
                // activeChain: localStorage.getItem('robonomicsUIEthereumActiveChain') ?? '',
            }),

            mutations: {
                setActiveProvider(state, value) {
                    state.activeProviderRdns = value;
                    localStorage.setItem('robonomicsUIEthereumActiveProviderRdns', value);
                },

                setActiveAccount(state, value) {
                    state.activeAccount = value;
                    localStorage.setItem('robonomicsUIEthereumActiveAccount', value);
                },

                // setActiveChain(state, value) {
                //     state.activeChain = value;
                //     localStorage.setItem('robonomicsUIEthereumActiveChain', value);
                // },

                clearActiveAccount(state) {
                    state.activeProviderRdns = '';
                    localStorage.setItem('robonomicsUIEthereumActiveProviderRdns', '');
                    state.activeAccount = '';
                    localStorage.setItem('robonomicsUIEthereumActiveAccount', '');
                }
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
                    devices: null
                },
                devices: {
                    view: 'Devices'
                },
                key: null, /* old features support */
                telemetry: null,
                launch: null,
                user: {
                    account: localStorage.getItem('robonomicsUIrwsuser') ?? null,
                    key: null,
                    acctype: null
                }
            }),

            getters: {
                users (state) {
                    return state.users;
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
                    /* old features support */
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
                },
                setUser(state, value) {
                    state.user.account = value
                    localStorage.setItem('robonomicsUIrwsuser', value)
                },
                setUserKey(state, value) {
                    state.user.key = value
                },
                setUserAcctype(state, value) {
                    state.user.acctype = value
                },
            },

            actions: {
                
                setList({state, dispatch}, value) {
                    state.list = value
                    if(state.list?.length > 0) {
                        const list = JSON.stringify(state.list)
                        localStorage.setItem('robonomicsUIrwslist', list)
                    } else {
                        localStorage.setItem('robonomicsUIrwslist', [])
                    }
                },

                init( {state, dispatch} ) {

                    const data = localStorage.getItem('robonomicsUIrwslist')
                    
                    if(data) {

                        let list = null

                        /* + Support old encrypted data */
                        if(isencrypted(data, state.key)) {
                            list = CryptoJS.AES.decrypt(data, state.key).toString(CryptoJS.enc.Utf8)
                        } else {
                            list = data
                        }

                        dispatch('setList', JSON.parse(list))
                    } else {
                        dispatch('setList', [])
                    }

                    dispatch('getActive')
                },

                import({state, dispatch}, value) {

                    if(value.length > 0 && typeof value === 'string') {

                        let importdata = null

                        /* + Support old encrypted data */
                        if(isencrypted(value, state.key)) {
                            try{
                                const res = CryptoJS.AES.decrypt(value, state.key).toString(CryptoJS.enc.Utf8)
                                importdata = JSON.parse(res)
                            } catch(e) {
                                console.log(e)
                            }
                        } else {
                            try{
                                importdata = JSON.parse(value)
                            } catch(e) {
                                console.log(e)
                            }
                            
                        }
                        
                        /* support old import files (they had an array of objects, multiple rws in one) */
                        if(importdata) {
                            if(importdata?.length > 0) {
                                importdata.forEach((i) => {
                                    dispatch('add', i)
                                })
                            } else {
                                /* clean for old imports */
                                if(typeof importdata === 'object') {
                                    delete importdata.scontroller
                                    delete importdata.enddate
                                    delete importdata.user
                                }

                                dispatch('add', importdata)
                            }
                            return true
                        } else {
                            return false
                        }
                        
                        
                    } else {
                        return false
                    }
                    
                },

                // value - rws owner
                findrws({state}, value) {
                    return state.list.map(item => item.owner).indexOf(value)
                },

                // value - rws
                // rewrite - Array of fields to rewrite
                add({state, commit, dispatch}, value) {
     
                    dispatch('findrws', value.owner).then( index => {

                        if(index < 0) {
                            // add new

                            if(!value.name) {
                                const name = generateName();
                                value.name = name;
                            }

                            state.list.push(value)
                        } else {
                            
                            if(!value.name && !state.list[index].name) {
                                // if no name, generate random
                                const name = generateName();
                                state.list[index].name = name;
                            }

                            const upd = Object.assign({}, state.list[index], value);
                            state.list[index] = upd;
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

                create({dispatch}, rws) {
                    dispatch('add', rws)
                },

                editUserListLabel({state, dispatch}, userdata) {

                    return dispatch('findrws', state.active).then( i => {
                        if(i < 0) {
                            return false;
                        }

                        const data = {'address': userdata.address, 'label': userdata.label};
            
                        if(!state.list[i]?.users) {
                            state.list[i].users = [data];
                        } else {
                            const finduser = state.list[i].users.map(item => item.address).indexOf(userdata.address);
                            if(finduser > -1) {
                                state.list[i].users[finduser].label = userdata.label;
                            } else {
                                state.list[i].users.push(data);
                            }
                        }

                        dispatch('add', state.list[i]);
                        return true;
                    });

                },

                /* users - array of addresses */
                updateUserList({state, dispatch}, users) {

                    return dispatch('findrws', state.active).then( i => {

                        /* stop if no subscription */
                        if(i < 0) {
                            return false;
                        }

                        /* no users in subscription */
                        if(users?.length < 1) {
                            delete state.list[i]?.users;
                            return false;
                        }

                        let data = [];
                        let actuallist = new Set();

                        if(state.list[i]?.users?.length > 0) {

                            data = state.list[i]?.users;

                            /* delete old users (if we have) from dapp storage */
                            data = Array.from(data).filter(u => users.includes(u.address));

                            /* get list of addresses */
                            actuallist = new Set(data.map(u => u.address));
                        }

                        try {
                            users.forEach(u => {
                                if(!actuallist.has(u)) {
                                    data.push({'address': u, 'label': ''});
                                }
                            });
                        } catch(e) {
                            console.log(e);
                        }

                        /* update active subscription */
                        state.list[i].users = data;
                        dispatch('add', state.list[i]);
                        return true;
                    });

                },

                // create({dispatch}, {owner, controller, name}) {
                //     let newrws = {}
                //     Object.assign(newrws, 
                //         {owner: owner},
                //         {controller: controller},
                //         {name: name},
                //     )
                //     dispatch('add', newrws)
                // },
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
                status: null,
                libp2p: {
                    connected: null,
                },
                parachain: {
                    connected: null,
                },
                relay: {
                    connected: null,
                }
            }),

            actions: {
                setStatus({state}, {value, timeout}) {
                    state.status = value
                    
                    if(timeout) {
                        setTimeout( () => {
                            state.status = null
                        }, timeout)
                    }
                },

                setlibp2p({state}, value) {
                    if(value.connected) {
                        state.libp2p.connected = true
                        state.parachain.connected = false
                    } else {
                        state.libp2p.connected = false
                        state.parachain.connected = true
                    }
                },

                setrelay({state}, value) {
                    state.relay.connected = value.connected
                },
            }
        }
    }
}

export default store;