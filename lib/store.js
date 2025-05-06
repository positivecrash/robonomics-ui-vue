import { encodeAddress } from "@polkadot/util-crypto"
import { generateName } from './tools';

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
                connection: {
                    network: null, /* polkadot, kusama */
                    type: localStorage.getItem('robonomicsUIPolkadotConnectionType') || 'libp2p', /* parachain, libp2p */
                    connected: false,
                    status: null /* any string, e.g. 'via relay' */
                }
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
                setConnectionNetwork(state, v) {
                    state.connection.network = v;
                    // state.network = value;
                    localStorage.setItem('rpc-parachain', 'wss://' + v + '.rpc.robonomics.network/');
                },
                setConnectionType(state, v) {
                    state.connection.type = v;
                    localStorage.setItem('robonomicsUIPolkadotConnectionType', v);
                },
                setConnectionConnected(state, v) {
                    state.connection.connected = v;
                },
                setConnectionStatus(state, v) {
                    state.connection.status = v;
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
                        commit('setConnectionNetwork', URL.parse(endpoint).host.split(".")[0]);
                    } else {
                        commit('setConnectionNetwork', 'kusama'); /* default network */
                    }
                }
            }
        },

        // ethereum: {
        //     namespaced: true,

        //     state: () => ({
        //         activeAccount: localStorage.getItem('robonomicsUIEthereumActiveAccount') ?? '',
        //         activeProviderRdns: localStorage.getItem('robonomicsUIEthereumActiveProviderRdns') ?? '',
        //         // activeChain: localStorage.getItem('robonomicsUIEthereumActiveChain') ?? '',
        //     }),

        //     mutations: {
        //         setActiveProvider(state, value) {
        //             state.activeProviderRdns = value;
        //             localStorage.setItem('robonomicsUIEthereumActiveProviderRdns', value);
        //         },

        //         setActiveAccount(state, value) {
        //             state.activeAccount = value;
        //             localStorage.setItem('robonomicsUIEthereumActiveAccount', value);
        //         },

        //         // setActiveChain(state, value) {
        //         //     state.activeChain = value;
        //         //     localStorage.setItem('robonomicsUIEthereumActiveChain', value);
        //         // },

        //         clearActiveAccount(state) {
        //             state.activeProviderRdns = '';
        //             localStorage.setItem('robonomicsUIEthereumActiveProviderRdns', '');
        //             state.activeAccount = '';
        //             localStorage.setItem('robonomicsUIEthereumActiveAccount', '');
        //         }
        //     }
        // },

        rws: {
            namespaced: true,

            state: () => ({
                // list - массив объектов сетапов e.g. [{owner,name,network}]
                list: JSON.parse(localStorage.getItem('robonomicsUIrwslist') || "[]"),
                // active - адрес owner активного (в смысле выбранного из списка для работы) сетапа
                active: localStorage.getItem('robonomicsUIrwsactive') || null,
                expiredate: null, // Do not save to local storage; timestamp
                users: null, // Do not save to local storage
                links: {
                    activate: null,
                    setup: null,
                    setupnew: null,
                    devices: null
                },
                devices: {
                    view: 'category' // "category" или "area"
                },
                launch: null,
                user: {
                    account: localStorage.getItem('robonomicsUIrwsuser') || null,
                    key: null
                }
            }),

            mutations: {

                setLink(state, { link, value }) {
                    if (typeof link !== 'string' || !(link in state.links)) {
                        console.warn(`Invalid link: ${link}`);
                        return;
                    }
                    state.links = { ...state.links, [link]: value };
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

                // + User for Telemetry
                removeUser(state) {
                    state.user.account = null;
                    state.user.key = null;
                    localStorage.removeItem('robonomicsUIrwsuser');
                },
                setUser(state, value) {
                    state.user.account = value
                    localStorage.setItem('robonomicsUIrwsuser', value)
                },
                setUserKey(state, value) {
                    state.user.key = value
                },
                // - User for Telemetry

                setActiveSetup(state, v) {
                    state.active = v;
                },

                setSetupsList(state, v) {
                    state.list = v;
                },
                
            },

            actions: {

                // Проверяем есть ли setup с владельцем owner в выбранной сети
                checkSetupExists({ state, rootState }, owner) {
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                    return state.list.some(setup => setup.owner === owner && setup.network === currentNetwork);
                },
                
                // v - адрес owner активного сетапа
                // changeActiveSetup({ state, commit, dispatch, rootState }, v) {
                //     const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                    
                //     dispatch('checkSetupExists', v).then(exists => {
                //         if (!exists) {
                //             // Если нет сетапа в выбранной сети, устанавливаем первый попавшийся сетап для активной сети
                //             const firstSetup = state.list.find(setup => setup.network === currentNetwork);
                //             v = firstSetup ? firstSetup.owner : null;
                //         }
                        
                //         commit('setActiveSetup', v);
                //         localStorage.setItem('robonomicsUIrwsactive', v);
                //     });
                // },

                async changeActiveSetup({ state, commit, dispatch, rootState }, owner) {
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                
                    // Проверяем, существует ли сетап с таким owner в текущей сети
                    const exists = await dispatch('checkSetupExists', owner);
                
                    let activeOwner = owner;
                
                    if (!exists) {
                        // Если не найден — берем первый доступный сетап в текущей сети
                        const firstSetup = state.list.find(setup => setup.network === currentNetwork);
                        activeOwner = firstSetup ? firstSetup.owner : null;
                    }
                
                    // Устанавливаем активный setup
                    commit('setActiveSetup', activeOwner);
                    localStorage.setItem('robonomicsUIrwsactive', activeOwner);
                },

                addSetup({ state, commit, dispatch, rootState }, v) {
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                    
                    return dispatch('checkSetupExists', v.owner).then(exists => {
                        if (exists) {
                            return dispatch('editSetup', v).then(() => ({ success: true })); // Если уже есть, редактируем
                        } else {
                            // Добавляем новый setup
                            const newSetup = { ...v, network: currentNetwork };
                            state.list.push(newSetup);
                            commit('setSetupsList', state.list);
                            commit('setActiveSetup', newSetup.owner);
                            localStorage.setItem('robonomicsUIrwslist', JSON.stringify(state.list));
                            localStorage.setItem('robonomicsUIrwsactive', newSetup.owner);
                            return { success: true };
                        }
                    }).catch(error => ({ success: false, error: error.message || 'Error adding setup' }));
                },
                
                editSetup({ state, commit, rootState }, v) {
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                    
                    // делаем асинхронно для addSetup
                    return new Promise((resolve, reject) => {
                        const index = state.list.findIndex(setup => setup.owner === v.owner && setup.network === currentNetwork);
                        
                        if (index > -1) {
                            state.list[index] = { ...state.list[index], ...v };
                            commit('setSetupsList', state.list);
                            localStorage.setItem('robonomicsUIrwslist', JSON.stringify(state.list));
                            resolve({ success: true });
                        } else {
                            reject({ success: false, error: 'Setup not found' });
                        }
                    });
                },

                deleteSetup({ state, commit, rootState }, owner) {
                    // Получаем текущую сеть
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                    
                    // Фильтруем список, удаляя сетап с указанным owner и текущей сетью
                    const updatedList = state.list.filter(rws => !(rws.owner === owner && rws.network === currentNetwork));
                    
                    // Обновляем список сетапов в состоянии
                    commit('setSetupsList', updatedList);
                    localStorage.setItem('robonomicsUIrwslist', JSON.stringify(updatedList));
                    
                    // Проверяем, удалили ли активный сетап, если да — выбираем новый
                    if (state.active === owner) {
                        commit('setActiveSetup', updatedList.length > 0 ? updatedList[0].owner : null);
                    }
                },                

                // ищет содержимое сетапа по owner
                findSetup({ state, rootState }, owner) {
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                    return state.list.find(setup => setup.owner === owner && setup.network === currentNetwork) || null;
                },

                // ищет индекс сетапа по owner, если не найдено, возвращаем -1
                findSetupIndex({ state, rootState }, owner) {
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                    return state.list.findIndex(setup => setup.owner === owner && setup.network === currentNetwork);
                },

                updateSetupField({ state, dispatch, rootState }, { owner, updates }) {
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                    const currentSetup = state.list.find(setup => setup.owner === owner && setup.network === currentNetwork);
                
                    if (currentSetup) {
                        const updatedSetup = { ...currentSetup, ...updates };
                
                        // Если обновляем users, фильтруем только те, у кого есть label
                        if (updates.users) {
                            updatedSetup.users = updates.users.filter(user => user.label);
                        }
                
                        return dispatch('editSetup', updatedSetup)
                            .then(() => ({ success: true }))
                            .catch(error => ({ success: false, error: error.message || 'Failed to update setup' }));
                    } else {
                        return { success: false, error: `Setup not found for owner: ${owner} in network: ${currentNetwork}` };
                    }
                },

                uploadSetup({ dispatch, rootState }, value) {
                    if (value.length > 0 && typeof value === 'string') {
                        let importdata = null;
                
                        try {
                            importdata = JSON.parse(value);
                        } catch (e) {
                            return { success: false, error: 'Invalid JSON format' };
                        }
                
                        const currentNetwork = rootState.robonomicsUIvue.polkadot.connection.network;
                
                        // Функция для приведения setup к единому виду
                        const normalizeSetup = (setup) => {
                            // Если controller в старом формате — строка, переносим в объект
                            if (typeof setup.controller === 'string') {
                                setup.controller = {
                                    address: setup.controller,
                                    private: ''
                                };
                            }
                            // Если controller нет или он не объект, гарантируем объект
                            if (!setup.controller || typeof setup.controller !== 'object') {
                                setup.controller = {
                                    address: '',
                                    private: ''
                                };
                            }
                            // Если есть старый ключ controllerkey — сохраняем его в controller.private
                            if (setup.controllerkey) {
                                setup.controller.private = setup.controllerkey;
                                delete setup.controllerkey;
                            }
                            return setup;
                        };
                
                        const processSetup = (rawSetup) => {
                            const setup = normalizeSetup(rawSetup);
                
                            // Проверка сети
                            if (setup.network) {
                                if (setup.network !== currentNetwork) {
                                    return {
                                        success: false,
                                        error: `Network mismatch! Imported setup is for '${setup.network}', but the current network is '${currentNetwork}'. Please switch networks and try again.`
                                    };
                                }
                            } else {
                                setup.network = currentNetwork;
                            }
                
                            // Добавляем настроенный setup
                            dispatch('addSetup', setup);
                            return { success: true };
                        };
                
                        if (Array.isArray(importdata) && importdata.length > 0) {
                            const results = importdata.map(processSetup);
                            const error = results.find(r => !r.success);
                            return error || { success: true };
                        } else if (typeof importdata === 'object') {
                            return processSetup(importdata);
                        }
                    }
                
                    return { success: false, error: 'Invalid input data' };
                },

                getActiveSetup({ state, commit, rootState }) {
                    // Получаем текущую сеть из состояния polkadot
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                    
                    // Фильтруем список сетапов, оставляя только те, которые принадлежат текущей сети
                    const filteredList = state.list.filter(rws => rws.network === currentNetwork);
                
                    if (filteredList.length > 0) {
                        // Если активного сетапа нет или он не найден в отфильтрованном списке, выбираем первый доступный
                        if (!state.active || !filteredList.find(rws => rws.owner === state.active)) {
                            commit('setActiveSetup', filteredList[0].owner);
                        }
                    } else {
                        // Если в списке нет сетапов для текущей сети, сбрасываем активный сетап в null
                        commit('setActiveSetup', null);
                    }
                },

                editUserListLabel({ state, dispatch, rootState }, userdata) {
                    // Получаем текущую сеть
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                    
                    // Получаем owner активного сетапа
                    const activeOwner = state.active;
                    
                    if (!activeOwner) {
                        return { success: false, error: 'No active setup selected' };
                    }
                    
                    // Ищем активный сетап в текущей сети
                    const currentSetup = state.list.find(setup => setup.owner === activeOwner && setup.network === currentNetwork);
                    
                    if (!currentSetup) {
                        return { success: false, error: 'Active setup not found' };
                    }
                    
                    // Проверяем, существует ли массив users, если нет - создаем его
                    if (!currentSetup.users) {
                        currentSetup.users = [];
                    }
                    
                    // Ищем пользователя в списке
                    const userIndex = currentSetup.users.findIndex(user => user.address === userdata.address);
                    
                    if (userIndex > -1) {
                        // Если пользователь найден, обновляем его label
                        currentSetup.users[userIndex].label = userdata.label;
                    } else {
                        // Если пользователя нет, добавляем нового
                        currentSetup.users.push({ address: userdata.address, label: userdata.label });
                    }
                    
                    // Обновляем setup через editSetup
                    return dispatch('editSetup', currentSetup)
                        .then(() => ({ success: true }))
                        .catch(error => ({ success: false, error: error.message || 'Failed to update user label' }));
                },

                updateUserList({ state, dispatch, rootState }, users) {

                    // Получаем текущую сеть
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network || 'kusama';
                    
                    // Получаем owner активного сетапа
                    const activeOwner = state.active;
                    
                    if (!activeOwner) {
                        return { success: false, error: 'No active setup selected' };
                    }
                    
                    // Ищем активный сетап в текущей сети
                    const currentSetup = state.list.find(setup => setup.owner === activeOwner && setup.network === currentNetwork);
                    
                    if (!currentSetup) {
                        return { success: false, error: 'Active setup not found' };
                    }

                    // Если переданный список пользователей пуст, удаляем существующих пользователей из setup
                    if (!users || users.length < 1) {
                        delete currentSetup.users;
                        return dispatch('editSetup', currentSetup)
                            .then(() => ({ success: true }))
                            .catch(error => ({ success: false, error: error.message || 'Failed to update user list' }));
                    }
                    
                    let updatedUsers = [];
                    let actualList = new Set();
                    
                    // Если у сетапа уже есть пользователи, оставляем только тех, кто есть в новом списке
                    if (currentSetup.users?.length > 0) {
                        updatedUsers = currentSetup.users.filter(u => users.includes(u.address));
                        actualList = new Set(updatedUsers.map(u => u.address));
                    }
                    
                    try {
                        // Добавляем новых пользователей, если их еще нет в списке
                        users.forEach(u => {
                            if (!actualList.has(u)) {
                                updatedUsers.push({ address: u, label: '' });
                            }
                        });
                    } catch (e) {
                        console.log(e);
                    }

                    // Обновляем список пользователей у текущего сетапа
                    currentSetup.users = updatedUsers;
                    
                    // Отправляем обновленный сетап в хранилище
                    return dispatch('editSetup', currentSetup)
                        .then(() => ({ success: true }))
                        .catch(error => ({ success: false, error: error.message || 'Failed to update user list' }));
                },

                checkNetworkRws({ state, rootState, commit }) {
                    // Получаем текущую сеть из polkadot namespace
                    const currentNetwork = rootState.robonomicsUIvue?.polkadot?.connection?.network;
                    
                    // Проверяем, есть ли сетапы без поля network
                    const hasUpdates = state.list.some(rws => !rws.network);
                    
                    if (hasUpdates) {
                        // Создаем новый массив с обновленными значениями сети только для сетапов без network
                        const updatedList = state.list.map(rws => {
                            return !rws.network ? { ...rws, network: currentNetwork } : rws;
                        });
                        
                        // Обновляем список в состоянии
                        commit('setSetupsList', updatedList);
                        
                        // Сохраняем обновленный список в localStorage
                        localStorage.setItem('robonomicsUIrwslist', JSON.stringify(updatedList));
                    }
                },
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