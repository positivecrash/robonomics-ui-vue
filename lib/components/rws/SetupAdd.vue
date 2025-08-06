<template>
    
    <robo-tabs>
        <robo-tab label="Manually">
            <form @submit.prevent="addSetupTyped">
                <robo-grid gap="x05" columns="1">
                    <robo-polkadot-network-select clean size="large" icon />

                    <robo-grid gap="x05" columns="1">
                        <robo-input-new 
                            v-model="ownerTyped"
                            width="wide" 
                            :label="expiredTyped ? 'Owner (Subscription til ' + dateGetString(expiredTyped) + ')' : 'Owner (Subscription not found)'"
                        />
                    </robo-grid>

                    <div class="generativeline">
                        <robo-input-new
                            v-model="nameTyped"
                            width="wide" 
                            label="Name of setup (dapp only)" 
                        />
                        <robo-button clean class="generativeline-tog" @click.prevent="setSubscriptionName('typed')"><robo-icon icon="wand-magic"/></robo-button>
                    </div>
                    <robo-button block>Add setup</robo-button>

                    <robo-status v-if="message" :type="status !== 'error' ? 'ok' : 'warning'" solid>{{message}}</robo-status>
                </robo-grid>
            </form>
        </robo-tab>

        <robo-tab label="With Extention">
            <form @submit.prevent="addSetupConnected">
                <robo-grid gap="x05" columns="1">
                    <robo-section offset="x05" width="wide">
                        <robo-text size="small" offset="x025" weight="bold">
                            Owner & Network:
                            <robo-text 
                                v-if="ownerConnected"
                                :highlight="!expiredConnected ? 'error' : setStatusView(dateGetRange(expiredConnected))"
                                inline
                            >
                                <template v-if="!expiredConnected">No subscription</template>
                                <template v-if="expiredConnected">
                                    Subscription til {{ dateGetString(expiredConnected) }}
                                </template>
                            </robo-text>
                        </robo-text>
                        <robo-account-polkadot
                            short 
                            extensionAllowShift
                            extensionShowIcon
                            selectable
                            selectstyle
                            selectblock
                            selecttitle="Connect owner account"
                        />
                    </robo-section>
                    <div class="generativeline">
                        <robo-input-new
                            v-model="nameConnected"
                            width="wide" 
                            label="Name of setup (dapp only)" 
                        />
                        <robo-button clean class="generativeline-tog" @click.prevent="setSubscriptionName"><robo-icon icon="wand-magic"/></robo-button>
                    </div>
                    <robo-button block>Add setup</robo-button>
                </robo-grid>
            </form>
        </robo-tab>
        
    </robo-tabs>

</template>

<script>
export default { name: 'RoboRwsSetupAdd' }
</script>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { setStatusView, dateGetRange, dateGetString, generateName } from '../../tools';
import { isValidAddress } from '../polkadot/tools';
import { useStore } from 'vuex';
import { setupTemplate } from '../../backupTemplate';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['onRequestSubscription']);
const store = useStore();

const status = ref('init'); // Возможные значения: 'init', 'process', 'ok', 'error'
const message = ref(null);

const ownerTyped = ref('');
const nameTyped = ref(null);
const expiredTyped = ref(null);

const ownerConnected = computed(() => store.state.robonomicsUIvue.polkadot.address);
const nameConnected = ref(null);
const expiredConnected = ref(null);

const subscriptionExpires = ref(null);

/**
 * Обновляет информацию о подписке
 */
const getSubscriptionInfo = (exp) => {
    subscriptionExpires.value = exp || null;
};

/**
 * Текст на кнопке
 */
const buttontext = computed(() => ({
    'ok': 'Saved',
    'error': 'Something went wrong',
}[status.value] ?? 'Submit'));

/**
 * Тип кнопки
 */
const buttontype = computed(() => ({
    'ok': 'ok',
    'error': 'error',
}[status.value] ?? 'primary'));

const setSubscriptionName = (tab = 'connected') => {
    if(tab === 'typed') {
        nameTyped.value = generateName();
        return;
    }

    nameConnected.value = generateName();
}

const getExpired = (owner) => {

    console.log('getExpired', owner)
    status.value = 'init';
    message.value = null;

    if (owner && isValidAddress(owner)) {
        return new Promise((resolve, reject) => {
            emit('onRequestSubscription', owner, (subscription) => {
                resolve(subscription);
            });
        });
    } else {
        return Promise.resolve(null);
    }
}

const addSetupTyped = async () => {
    addSetup(ownerTyped.value, nameTyped.value, expiredTyped.value);
}

const addSetupConnected = async () => {
    addSetup(ownerConnected.value, nameConnected.value, expiredConnected.value);
}

const addSetup = async (owner, name, expiration) => {
    console.log('addSetup', owner)
    status.value = 'process';
    message.value = null;

    const setup = { ...setupTemplate };

    if (!owner || !isValidAddress(owner)) {
        status.value = 'error';
        message.value = "Please, add a correct owner's address";
        return;
    }

    if (!expiration) {
        status.value = 'error';
        message.value = "No subscription found for this account. Please check the owner's address or consider buying a subscription.";
        return;
    }

    if(!name) {
        name = generateName();
    }

    setup.name = name;
    setup.owner = owner;
    setup.network = store.state.robonomicsUIvue.polkadot.connection.network;

    const result = await store.dispatch('rws/addSetup', setup);

    if (result.success) {
        // Если импорт успешен, переходим на страницу сетапа
        router.push(store.state.robonomicsUIvue.rws.links.setup);
    } else {
        // Если произошла ошибка, сохраняем сообщение ошибки
        uploadmsg.value = result.error || 'Something went wrong while adding';
    }
}


onMounted(async () => {
    watch(() => ownerTyped.value, async (v) => {
        expiredTyped.value = await getExpired(v);
    }, { immediate: true });

    watch(() => ownerConnected.value, async (v) => {
        expiredConnected.value = await getExpired(v);
    }, { immediate: true });
});
</script>

<style scoped>
.generativeline {
    position: relative;
    width: 100%;
}

.generativeline .generativeline-tog {
    position: absolute;
    right: 10px;
    bottom: 15px;
}
</style>
