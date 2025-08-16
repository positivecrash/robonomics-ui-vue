<template>
    <robo-grid v-if="!expiration" type="flex" offset="x025" gap="x025" valign="center">
        <robo-status type="error" solid>No subscription found in <i class="networkname">{{network}}</i></robo-status>
    </robo-grid>

    <robo-text lines="dotted" size="small" class="setupinfo" :class="blinkContent && 'setupinfonew'">

        <robo-grid type="flex" offset="x025" gap="x025" valign="center">
            <robo-icon :icon="store.state.robonomicsUIvue.polkadot.connection.network" />
            <span class="robo-longline">Setup's network:</span>
            <robo-text weight="bold" class="networkname">{{store.state.robonomicsUIvue.polkadot.connection.network}}</robo-text>
        </robo-grid>
        
        <robo-grid v-if="show.includes('name') && expiration" type="flex" offset="x025" gap="x025" valign="center">
            <robo-icon icon="quote" />
            <span class="robo-longline">Name in dapp:</span>
            <b v-if="!ispagesetup">{{localname}}</b>
            <robo-input-new v-if="ispagesetup" v-model="localname" type="text" width="fit" view="line" edit @on-edit="savename" placeholder="Type here a name" />
        </robo-grid>

        <robo-grid v-if="show.includes('date') && expiration" type="flex" offset="x025" gap="x025" valign="center">
            <robo-icon icon="calendar" />
            <span class="robo-longline">Active until:</span>
            <robo-text :highlight="setStatusView(expiresin)" weight="bold">{{dateGetString(expiration)}}</robo-text>
            <robo-link v-if="expiresin > -1 && isAdmin" :router="store.state.robonomicsUIvue.rws.links.activate"><robo-icon icon="arrow-rotate-left" /></robo-link>
        </robo-grid>
        
        <robo-grid v-if="show.includes('owner')" type="flex" offset="x025" gap="x025" valign="center">
            <robo-icon icon="star" />
            <span class="robo-longline">Owner:</span>
            <b>{{shortenAddress(activerwsowner)}}</b>
            <robo-copy :text="activerwsowner" />
        </robo-grid>

        <robo-grid v-if="show.includes('controller') && ispagesetup" type="flex" offset="x025" gap="x025" valign="center">
            <robo-icon icon="settings" />
            <span class="robo-longline">Controller:</span>

            <robo-input-new
                v-model="controller" 
                :statuscode="gencontrollerstatus"
                :statusmsg="gencontrollermsg"
                :modellabel="controller ? shortenAddress(controller) : null"
                :placeholder="network.charAt(0).toUpperCase() + network.slice(1) + ' account'"
                type="text"
                width="fit" 
                view="line" 
                edit 
                style="max-width: 42ch;"
                @on-edit="handleControllerEdit"  
            />

        </robo-grid>

        <robo-grid v-if="show.includes('controller') && ispagesetup && isAdmin" offset="x025">

            <robo-status v-if="expiresin > 0" type="warning">
                To generate new controller you need active subscription. Renew <robo-link :router="store.state.robonomicsUIvue.rws.links.activate">here</robo-link>
            </robo-status>

            <robo-account-polkadot-generate
                v-else
                @on-generate="handleControllerGenerate"
                beforename="Controller" 
                detailstype="initial"
                labelpassword="A password for new Controller account *">

                <template #link>
                    <robo-grid type="flex" gap="x025" valign="center">
                        <robo-icon icon="wand-magic"/> 
                        <robo-text weight="bold">Generate new account for the Controller</robo-text>
                    </robo-grid>
                </template>
                <template #description>Beware: by generating this account you will overwrite existing Controller address in subscription.</template>
            </robo-account-polkadot-generate>
        </robo-grid>
        
        <template v-if="show.includes('users') && users">
            <robo-details v-if="users.length > 0" summarystyle="link" type="initial" :contentCloseOutOfFocus="false" block>
                <template #summary>
                    <robo-grid type="flex" offset="x025" gap="x025" valign="center">
                        <robo-icon icon="user" /> 
                        <span>Users:</span>
                        <b>{{users.length}} accounts added</b>
                    </robo-grid>
                </template>

                <robo-section offset="x05">
                    <robo-status v-if="userschanged" type="warning" offset="x05" solid :timeout="userschangedtimeout">User list has been updated</robo-status>

                    <robo-rws-user
                        v-for="(user , index) in users" :key="index" 
                        :useraddress="user"
                        @on-user-delete="onUserDelete"
                        :isAdmin="isAdmin"
                    />

                    <robo-rws-user-add v-if="isAdmin" @on-user-add="onUserAdd" />
                </robo-section>
            </robo-details>

        </template>

        <robo-grid v-if="show.includes('userstext') && users" type="flex" offset="x025" gap="x025" valign="center">
            <robo-icon icon="user" /> 
            <span>Users:</span>
            <b>{{users.length}} accounts added</b>
        </robo-grid>

        <template v-if="show.includes('backup') && users">
            <robo-details summarystyle="link" type="initial" :contentCloseOutOfFocus="false" block>
                <template #summary>
                    <robo-grid type="flex" offset="x025" gap="x025" valign="center">
                        <robo-icon icon="download" />
                        <b>Subscription backup</b>
                    </robo-grid>
                </template>

                <robo-section class="setupbackup" offset="x05">
                    <form @submit.prevent="downloadbackup">
                        <robo-grid v-if="activename" type="flex" gap="x05" offset="x05" galign="start" valign="center">
                            <robo-input v-model="bcname" type="checkbox" id="backup-name" name="backupname" /> 
                            <label for="backup-name">Name</label>
                        </robo-grid>
                        <robo-grid v-if="activeowner" type="flex" gap="x05" offset="x05" galign="start" valign="center">
                            <robo-input v-model="bcowner" type="checkbox" id="backup-owner" name="backupowner" /> 
                            <label for="backup-owner">Owner address</label>
                        </robo-grid>
                        <robo-grid v-if="activecontroller" type="flex" gap="x05" offset="x05" galign="start" valign="center">
                            <robo-input v-model="bccontroller" type="checkbox" id="backup-controller" name="backupcontroller" /> 
                            <label for="backup-controller">Controller address</label>
                        </robo-grid>

                        <robo-grid v-if="activeuserslabeled?.length > 0" type="flex" gap="x05" offset="x05" galign="start" valign="center">
                            <robo-input v-model="bcusers" type="checkbox" id="backup-users" name="backupusers" /> 
                            <label for="backup-users">Users' names</label>
                        </robo-grid>

                        <robo-section offset="x1">
                            <robo-text weight="bold" offset="x025">Server only settings:</robo-text>

                            <robo-grid v-if="activecontrollerkey" type="flex" gap="x05" offset="x05" galign="start" valign="center">
                                <robo-input v-model="bccontrollerkey" type="checkbox" id="backup-controllerkey" name="backupcontrollerkey" /> 
                                <label for="backup-controllerkey">Controller key</label>
                            </robo-grid>
                            
                            <robo-grid type="flex" gap="x05" offset="x05" galign="start" valign="center">
                                <robo-input v-model="bcmessaging" type="checkbox" id="backup-messaging" name="backupmessaging" /> 
                                <label for="backup-messaging">Messaging interval (in minutes):</label>
                                <robo-input-new
                                    v-model="messaging"
                                    :disabled="!bcmessaging"
                                    :required="bcmessaging"
                                    placeholder="10"
                                    type="text" 
                                    width="fit" 
                                    view="line"  
                                />
                            </robo-grid>
                            <robo-grid type="flex" gap="x05" offset="x05" galign="start" valign="center">
                                <robo-input v-model="bcipfs" type="checkbox" id="backup-ipfs" name="backupipfs" /> 
                                <label for="backup-ipfs">IPFS Gateway:</label>
                                <robo-input-new
                                    v-model="ipfsgate"
                                    :disabled="!bcipfs"
                                    :required="bcipfs"
                                    placeholder="http://url:port"
                                    type="text" 
                                    width="fit" 
                                    view="line"
                                />
                            </robo-grid>
                            <robo-grid gap="x05" offset="x05" galign="start" valign="center" columns="1">
                                <robo-grid type="flex" gap="x05" galign="start" valign="center">
                                    <robo-input v-model="bcpinata" type="checkbox" id="backup-pinata" name="backuppinata" /> 
                                    <label>Pinata keys:</label>
                                </robo-grid>
                                <robo-grid gap="x05" galign="start" valign="center" columns="1">
                                    <robo-textarea v-model="pinatapublic" :disabled="!bcpinata" :required="bcpinata" placeholder="Pinata public key"></robo-textarea>
                                    <robo-textarea v-model="pinataprivate" :disabled="!bcpinata" :required="bcpinata" placeholder="Pinata private key"></robo-textarea>
                                </robo-grid>
                            </robo-grid>
                        </robo-section>
                        <robo-button block>Download backup</robo-button>
                    </form>
                </robo-section>
            </robo-details>
        </template>

        <robo-section offset="x05" v-if="show.includes('link') && !ispagesetup">
            <robo-button title="Edit subscription" :router="store.state.robonomicsUIvue.rws.links.setup" size="small" clean><robo-icon icon="pencil" /> <span>Go to setup</span></robo-button>
        </robo-section>

        <robo-section offset="x05" v-if="show.includes('remove')">
            <robo-button-approve
                    @click-approve="removesetup" 
                    :approvetext="`Remove «${activename}» subscription setup from the dapp?`" 
                    approvebuttontext="Remove"
                    clean 
                    type="error" 
                    size="small"
                >
                Remove setup from the dapp
            </robo-button-approve>
        </robo-section>
    </robo-text>
</template>

<script>
  export default { name: 'RoboRwsSetupActiveInfo' }
  /* Shows active setup's information, setup forms, backup link and other interactive elements for the setup */
</script>

<script setup>
    import { ref, computed, watch, toRaw, onMounted } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    import { shortenAddress, dateGetString, dateGetRange, formatFileName, downloadJson, setStatusView } from '../../tools';
    import { isAccountsIdentical, isValidAddress } from '../polkadot/tools';
    import { setupTemplate } from '../../backupTemplate';

    const props = defineProps({
        onUserDelete: {
            type: Function
        },
        onUserAdd: {
            type: Function
        },
        show: {
            type: Array,
            default: ['name', 'date', 'owner', 'controller', 'users', 'backup', 'link', 'remove']
        }
    });

    const emit = defineEmits(['onControllerEdit']);

    const rwslist = computed( () => {
        const currentNetwork = store.state.robonomicsUIvue.polkadot.connection.network;
        return store.state.robonomicsUIvue.rws.list.filter(item => item.network === currentNetwork);
    });

    const activerwsowner = computed( ()=> {
        return store.state.robonomicsUIvue.rws.active;
    });

    const active = computed( () => {
        return rwslist.value.map(item => item.owner).indexOf(activerwsowner.value);
    });

    const connectedacc = computed( () => {
        return store.state.robonomicsUIvue.polkadot.address;
    });

    const network = computed( () => {
        return store.state.robonomicsUIvue.polkadot.connection.network;
    });

    /* if !expiration -> no subscription */
    const expiration = computed( () => {
        return store.state.robonomicsUIvue.rws.expiredate;
    });

    const expiresin = computed( () => {
        return dateGetRange(expiration.value);
    });

    const isAdmin = computed ( () => {
        return isAccountsIdentical(connectedacc.value, activerwsowner.value);
    });

    const ispagesetup = computed ( () => {
        return window.location.hash === '#' + store.state.robonomicsUIvue.rws.links.setup;
    });

    /* + CURRENT SUBSCRIPTION INFO */
    const activecontrollerkey = computed( () => {
        return rwslist.value[active.value]?.controller?.private || null;
    });

    const activename = computed( () => {
        return rwslist.value[active.value]?.name || null;
    });

    const activeowner = computed( () => {
        return rwslist.value[active.value]?.owner || null;
    });

    const activecontroller = computed( () => {
        return rwslist.value[active.value]?.controller?.address || null;
    });

    /* юзеры подписки с локальными лейблами */
    const activeusers = computed( () => {
        return rwslist.value[active.value]?.users;
    });

    const activeuserslabeled = computed( () => {
        // return rwslist.value[active.value].users;
        /* Only for backup, filter not empty labels only */
        if(activeusers.value) {
            return activeusers.value.filter(i => i?.label && i?.label !== '');
        } else {
            return null;
        }
        
    });
    /* - CURRENT SUBSCRIPTION INFO */

    /* + NAME */
    const localname = ref(null); /* set up onMount */

    const savename = async (save) => {
        try {
            if (!localname.value || localname.value.trim() === '') {
                save('error', 'Please, enter some name');
                return;
            }

            const trimmedName = localname.value.trim();

            const result = await store.dispatch('rws/updateSetupField', {
                owner: activeowner.value,
                updates: {
                    name: trimmedName
                }
            });

            if (result.success) {
                save('ok');
            } else {
                save('error', result.error || 'Failed to save name');
            }
        } catch (e) {
            console.error('Error saving name:', e);
            save('error', e.message || 'An unknown error occurred');
        }
    };
    /* - NAME */

    const isInUserList = (user) => {
         return Array.isArray(users?.value) && users.value.length > 0 && users.value.includes(user);
    }

    /* + CONTROLLER */
    const controller = ref(rwslist.value[active.value]?.controller?.address || null);
    const gencontrollerstatus = ref(null);
    const gencontrollermsg = ref(null);

    const savecontroller = async (newcontroller, newcontrollerkey, status, message, save) => {
        if (status === 'error') {
            gencontrollerstatus.value = 'error';
            gencontrollermsg.value = message;
        }

        else if (status === 'cancel') {
            gencontrollerstatus.value = 'error';
            gencontrollermsg.value = 'Saving controller account to User list was cancelled';
        }

        else if (status === 'ok') {
            gencontrollerstatus.value = status;
            gencontrollermsg.value = 'Controller setup locally in dapp and saved in chain. Make sure this account is used as a controller in Home Assistant integration.';
            controller.value = newcontroller;

            const result = await store.dispatch('rws/updateSetupField', {
                owner: activeowner.value,
                updates: {
                    controller: {
                        address: newcontroller,
                        private: newcontrollerkey || ""
                    }
                }
            });

            if (!result.success) {
                gencontrollerstatus.value = 'error';
                gencontrollermsg.value = result.error || 'Failed to save controller';
            }
        }

        else {
            gencontrollerstatus.value = status;
            gencontrollermsg.value = message;
        }

        if (save) {
            save(status, message);
        }
    };

    const handleController = (newcontroller, newcontrollerkey, saveCallback) => {

        // общий метод для сохранения через инпут и генерации нового контроллера

        if(!isValidAddress(newcontroller)) {
            gencontrollerstatus.value = 'error';
            gencontrollermsg.value = 'Please, enter valid address for an account in ' + network.value + ' network';
        } else {
            
            // если подключен владелец подписки, то нам нужно добавить контроллер не только в настройки даппа, но и в список юзеров
            if(isAdmin.value) {
                console.log('если подключен владелец подписки')
                if(!expiresin.value) {
                    gencontrollerstatus.value = 'error';
                    gencontrollermsg.value = 'Please, buy a subscription first';
                }
                else if(expiresin.value > 0) {
                    gencontrollerstatus.value = 'error';
                    gencontrollermsg.value = 'Please, renew subscription first';
                }
                else {
                    // если с подпиской все в порядке, пробуем сохранить адрес контроллера в список юзеров
                    emit('onControllerEdit', 
                        newcontroller, 
                        (status, message) => savecontroller(newcontroller, newcontrollerkey, status, message, saveCallback)
                    );
                }
            }

            // сохраняем контроллер локально в даппе
            // если он уже в списке юзеров или подключен не админ (например юзер просто вручную меняет адрес)

            // Если подключен не админ (владалец подписки) - например если надо просто вручную добавить адрес контроллера
            if(!isAdmin.value) {
                if(isInUserList(newcontroller)) {
                    // Если контроллер добавлен как юзер в подписку
                    savecontroller(
                        newcontroller, 
                        newcontrollerkey, 
                        'ok', 
                        'Controller setup saved locally in dapp. Make sure this account has been added as a user in the subscription and is used as a controller in Home Assistant integration.', 
                        saveCallback
                    );
                } else {
                    savecontroller(
                        newcontroller, 
                        null, 
                        'error', 
                        'The address of controller has not been added in the subscription yet.', 
                        saveCallback
                    );
                }
            }
            
        }

        if(saveCallback) {
            saveCallback(gencontrollerstatus.value, gencontrollermsg.value);
        }
    }

    const handleControllerEdit = (saveCallback) => {

        gencontrollerstatus.value = 'loading';
        gencontrollermsg.value = '';

        handleController(controller.value, activecontrollerkey.value || null, saveCallback);
    };

    const handleControllerGenerate = (newcontroller, newcontrollerkey) => {

        // controller.value = newcontroller;
        gencontrollerstatus.value = 'loading';
        gencontrollermsg.value = '';

        handleController(newcontroller, newcontrollerkey);
    };

    const checkcontroller = () => {
        if(isValidAddress(controller.value) && isInUserList(controller.value)) {
            gencontrollerstatus.value = 'ok';
            gencontrollermsg.value = '';
        } else if (!isValidAddress(controller.value)) {
            gencontrollerstatus.value = 'error';
            gencontrollermsg.value = 'Account is not valid';
        } else if (!isInUserList(controller.value)) {
            gencontrollerstatus.value = 'error';
            gencontrollermsg.value = 'Account should be added in User list';
        }
    }

    /* - CONTROLLER */

    /* + USERS */
    // юзеры, полученный из чейна
    const users = computed( () => {
        return store.state.robonomicsUIvue?.rws?.users;
    });
    
    const userschanged = ref(false);
    const userschangedtimeout = 8000;
    var userschangedcount = 0;

    watch(() => users.value, (newValue, oldValue) => {

        store.dispatch('rws/updateUserList', newValue);

        if(userschangedcount > 1 && JSON.stringify(toRaw(newValue)) !== JSON.stringify(toRaw(oldValue))) {

            checkcontroller();
            userschanged.value = true;

            setTimeout(() => {
                userschanged.value = false;
            }, userschangedtimeout + 1);

        }

        userschangedcount++;
        
    });
    /* - USERS */

    /* + BACKUP */
    const bcname = ref(true);
    const bcowner = ref(true);
    const bccontroller = ref(true);
    const bcusers = ref(true);
    const bccontrollerkey = ref(false);
    const bcmessaging = ref(false);
    const bcipfs = ref(false);
    const bcpinata = ref(false);

    const messaging = ref(null);
    const ipfsgate = ref(null);
    const pinatapublic = ref(null);
    const pinataprivate = ref(null);

    const downloadbackup = () => {
        // Создаем копию шаблона
        const backupData = { ...setupTemplate };

        // Заполняем поля из наших значений. Если значение отсутствует, оставляем пустую строку.
        backupData.owner = activeowner.value ? String(activeowner.value).trim() : "";
        backupData.name = activename.value ? String(activename.value).trim() : "";
        backupData.network = network.value ? String(network.value).trim() : "";

        backupData.controller.address = activecontroller.value
            ? String(activecontroller.value).trim()
            : "";
        // Преобразуем объект ключа контроллера в строку JSON, если он задан
        backupData.controller.private = activecontrollerkey.value
            ? JSON.stringify(activecontrollerkey.value).trim()
            : "";

        backupData.datalog.interval = messaging.value
            ? String(messaging.value).trim()
            : "";

        // Обработка IPFS-шлюза: пробуем разобрать URL и порт, если задан
        // if (ipfsgate.value) {
        //     try {
        //     const urlObj = new URL(String(ipfsgate.value).trim());
        //     backupData.ipfs.url = urlObj.hostname || "";
        //     backupData.ipfs.port = urlObj.port || "";
        //     } catch (e) {
        //     backupData.ipfs.url = String(ipfsgate.value).trim();
        //     backupData.ipfs.port = "";
        //     }
        // }
        // Обработка IPFS-шлюза: пробуем разобрать URL и порт, если задан
        if (ipfsgate.value) {

            // 1) приводим к строке, убираем пробелы и убираем слэш(и) на конце
            const raw = String(ipfsgate.value).trim().replace(/\/+$/, '');
            let hostname = '';
            let port = '';

            try {
                // 2) если протокол не указан, подставляем http:// чтобы URL-API его принял
                const withProto = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(raw)
                ? raw
                : `http://${raw}`;

                // 3) парсим через URL
                const urlObj = new URL(withProto);
                hostname = urlObj.hostname; // без порта и путей
                port = urlObj.port;         // если он есть, иначе пустая строка

            } catch (e) {
                    // 4) в случае, если URL всё же не получилось распарсить (неверный формат),
                    //    пробуем вручную: разбиваем по последнему двоеточию
                    const idx = raw.lastIndexOf(':');
                    if (idx > 0 && raw.indexOf(':') === idx) {
                    hostname = raw.slice(0, idx);
                    port = raw.slice(idx + 1);
                } else {
                    // просто домен/хост
                    hostname = raw;
                    port = '';
                }
            }

            backupData.ipfs.url = hostname;
            backupData.ipfs.port = port;
        }


        backupData.pinata.public = pinatapublic.value
            ? String(pinatapublic.value).trim()
            : "";
        backupData.pinata.private = pinataprivate.value
            ? String(pinataprivate.value).trim()
            : "";

        // Формируем массив пользователей с полями address и label.
        if (Array.isArray(activeuserslabeled.value)) {
            backupData.users = activeuserslabeled.value.map(user => ({
                address: user.address ? String(user.address).trim() : "",
                label: user.label ? String(user.label).trim() : ""
            }));
        } else {
            backupData.users = [];
        }

        // Вызываем функцию для скачивания JSON-файла, используя форматированное имя файла.
        downloadJson(backupData, formatFileName(activename.value || "subscription"));
    };


    /* - BACKUP */

    const removesetup = async () => {
        await store.dispatch('rws/deleteSetup', activerwsowner.value);
        controller.value = activecontroller.value;
    }

    const blinkContent = ref(true);

    onMounted( () => {
        watch(
            [() => active.value, () => controller.value, () => users.value],
            ([newActive, newController, newUsers], [oldActive, oldController, oldUsers]) => {
                if (newActive !== oldActive) {
                    localname.value = activename.value;
                }
                checkcontroller();
            },
            { immediate: true }
        );
    });
    

    // onMounted( () => {
        /* !attention: we don't need this here only because I assume this component is always fired inside of RoboRwsSetupActive */
        // store.dispatch('rws/getActive');
    // });
</script>

<style>
    .setupbackup .robo-input input[type="checkbox"]:checked ~ label {
        font-weight: bold;
    }
</style>

<style scoped>
    .setupinfo.robo-text[class*="robo-text--lines-"] > :not(:last-child) {
        --robo-text-lines-padding: 10px;
    }

    /* .setupinfonew {
        animation: Blink 0.8s linear 2 forwards;
    } */
</style>