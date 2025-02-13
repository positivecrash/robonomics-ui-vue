<template>
    <robo-grid v-if="!expiration" type="flex" offset="x025" gap="x025" valign="center">
        <robo-status type="error" solid>No subscription found in <i class="networkname">{{network}}</i></robo-status>
    </robo-grid>

    <robo-text lines="dotted" size="small" class="setupinfo">

        <robo-grid v-if="show.includes('name') && expiration" type="flex" offset="x025" gap="x025" valign="center">
            <robo-icon icon="quote" />
            <span class="robo-longline">Name in dapp:</span>
            <b v-if="!ispagesetup">{{localname}}</b>
            <robo-input-new v-if="ispagesetup" v-model="localname" type="text" width="fit" view="line" edit @on-edit="editRwsName" placeholder="Type here a name" />
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
                v-if="isAdmin"
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
                @on-edit="editcontroller"  
            />

            <template v-if="!isAdmin">
                <b>{{controller ? shortenAddress(controller) : '-'}}</b>
                <robo-copy v-if="controller" :text="controller" />
            </template>

            <!-- <b>{{shortenAddress(rwslist[active].controller)}}</b>
            <robo-copy :text="rwslist[active].controller" /> -->
        </robo-grid>

        <robo-grid v-if="show.includes('controller') && ispagesetup && isAdmin" offset="x025">
            <robo-account-polkadot-generate
                @on-generate="setcontroller"
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

                        <robo-grid v-if="activeusers?.length > 0" type="flex" gap="x05" offset="x05" galign="start" valign="center">
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
    import { shortenAddress, dateGetString, dateGetRange, getConfigFileName, downloadJson, setStatusView } from '../../tools';
    import { isAccountsIdentical } from '../../polkadot/tools';

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

    const emit = defineEmits(['onControllerEdit', 'onControllerRequest']);

    const rwslist = computed( () => {
        return store.state.robonomicsUIvue.rws.list;
    });

    // const activerws = computed( () => {
    //     return rwslist.value.find(item => item.owner === store.state.robonomicsUIvue.rws.active);
    // });

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
        return store.state.robonomicsUIvue.polkadot.network;
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

    // const isUser = computed ( () => {
    //     return users.value?.find(user => isAccountsIdentical(user, connectedacc.value));
    // });

    const ispagesetup = computed ( () => {
        return window.location.hash === '#' + store.state.robonomicsUIvue.rws.links.setup;
    });

    /* + CURRENT SUBSCRIPTION INFO */
    const activecontrollerkey = computed( () => {
        return rwslist.value[active.value].controllerkey;
    });

    const activename = computed( () => {
        return rwslist.value[active.value].name;
    });

    const activeowner = computed( () => {
        return rwslist.value[active.value].owner;
    });

    const activecontroller = computed( () => {
        return rwslist.value[active.value].controller;
    });

    const activeusers = computed( () => {
        // return rwslist.value[active.value].users;
        /* Only for backup, filter not empty labels only */
        return rwslist.value[active.value]?.users?.filter(i => i?.label && i?.label !== '');
    });
    /* - CURRENT SUBSCRIPTION INFO */

    /* + NAME */
    const localname = ref(null); /* set up onMount */

    const editRwsName = (save) => {
        try {
            if(localname.value === '' || !localname.value) {
                save('error', 'please, enter some name');
                return;
            }

            rwslist.value[active.value].name = localname.value;
            store.dispatch('rws/rewrite', rwslist.value);
            save('ok');
        } catch(e) {
            save('error');
        }
    }
    /* - NAME */

    /* + CONTROLLER */
    const controller = ref(rwslist.value[active.value].controller);
    const gencontrollerstatus = ref(null);
    const gencontrollermsg = ref(null);

    const savecontroller = (newcontroller, newcontrollerkey, status, message, save) => {

        /* тут при загрузке получается контроллер из подписки,
        и если такой контроллер уже есть в dapp, то ничего делать не надо больше */
        if(!newcontroller) {
            gencontrollerstatus.value = 'init';
            return;
        }

        if(newcontroller === controller.value) {
            gencontrollerstatus.value = 'ok';
            return;
        }

        if(status === 'ok') {
            controller.value = newcontroller;
            rwslist.value[active.value].controller = controller.value;
        }

        if(newcontrollerkey) {
            rwslist.value[active.value].controllerkey = newcontrollerkey;
        } else {
            delete rwslist.value[active.value].controllerkey;
        }

        store.dispatch('rws/rewrite', rwslist.value);

        gencontrollerstatus.value = status;
        gencontrollermsg.value = message;

        if(!save) {
            // надо подумать все ли ок с переносом из этого условия
            // gencontrollerstatus.value = status;
            // gencontrollermsg.value = message;
            return;
        }

        save(status, message);
    
    }

    /* Clicking on input's button edit */
    const editcontroller = (save) => {
        emit('onControllerEdit', controller.value, (status, message) => savecontroller(controller.value, null, status, message, save));
    }

    /* Generated account */
    const setcontroller = (newcontroller, newcontrollerkey) => {
        emit('onControllerEdit', newcontroller, (status, message) => savecontroller(newcontroller, newcontrollerkey, status, message, null));
    }

    /* Requesting controller */
    const requestcontroller = () => {
        gencontrollerstatus.value = 'loading';
        emit('onControllerRequest', activerwsowner.value, (controller, status, message) => savecontroller(controller, null, status, message, null));
    }
    /* - CONTROLLER */

    /* + USERS */
    const users = computed( () => {
        return store.state.robonomicsUIvue?.rws?.users;
    });
    
    const userschanged = ref(false);
    const userschangedtimeout = 8000;
    var userschangedcount = 0;

    watch(() => users.value, (newValue, oldValue) => {

        store.dispatch('rws/updateUserList', newValue);

        if(userschangedcount > 1 && JSON.stringify(toRaw(newValue)) !== JSON.stringify(toRaw(oldValue))) {

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
        let bccontent = {};
        let filename = getConfigFileName(activename.value || 'subscription');

        if(bcname.value && activename.value) {
            bccontent.name = activename.value;
        }

        if(bcowner.value && activeowner.value) {
            bccontent.owner = activeowner.value;
        }

        if(bccontroller.value && activecontroller.value) {
            bccontent.controller = activecontroller.value;
        }

        if(bcusers.value && activeusers.value) {
            bccontent.users = activeusers.value;
        }

        if(bccontrollerkey.value && activecontrollerkey.value) {
            bccontent.controllerkey = activecontrollerkey.value;
        }

        if(bcmessaging.value && messaging.value) {
            bccontent.messaging = messaging.value;
        }

        if(bcipfs.value && ipfsgate.value) {
            bccontent.ipfsgate = ipfsgate.value;
        }
        
        if(bcpinata.value && pinatapublic.value) {
            bccontent.pinatapublic = pinatapublic.value;
        }

        if(bcpinata.value && pinataprivate.value) {
            bccontent.pinataprivate = pinataprivate.value;
        }

        downloadJson(bccontent, filename);
    }
    /* - BACKUP */

    const removesetup = () => {
        store.dispatch('rws/clear', activerwsowner.value);
    }

    onMounted( () => {
        /* !attention: we don't need this here only because I assume this component is always fired inside of RoboRwsSetupActive */
        // store.dispatch('rws/getActive');

        watch(() => active.value, () => {
            requestcontroller();
            localname.value = activename.value;
        }, { immediate: true });
    });
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
</style>