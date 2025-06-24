<template>
    <robo-section width="narrow" centered>
        <robo-grid gap="x1" columns="1">

            <robo-account-polkadot
                extensionAllowShift
                extensionShowIcon
                selectable
                selectstyle
                selectblock
                selecttitle="Connect an account"
            />

            <template v-if="!chainInfoUploaded">
                <robo-text weight="normal-italic">
                    <robo-loader size="1.5" /> Loading data from chain
                </robo-text>
            </template>

            <template v-else>
                <robo-grid gap="x05" columns="1">
                    <robo-grid-item borderbottom>
                        <robo-text size="small">Chosen network:</robo-text>
                        <robo-text inline weight="bold">
                            <robo-polkadot-network-select clean size="medium" />
                        </robo-text>
                    </robo-grid-item>

                    <robo-grid-item borderbottom v-if="rwsExpiration">
                        <robo-text size="small">Your current subscription:</robo-text>
                        <robo-text inline weight="bold">{{ expiration }}</robo-text>
                        <robo-details style="margin-left:var(--robo-space);">
                            <template #summary>
                                <robo-text inline weight="bold" :highlight="setStatusView(expiresin)">
                                    <robo-icon :icon="(setStatusView(expiresin) === 'ok') ? 'circle-check' : 'circle-exclamation'" />
                                </robo-text>
                            </template>
                            <template v-if="setStatusView(expiresin) === 'error'">
                                Your subscription has expired. Please, renew it to continue using the service.
                            </template>
                            <template v-if="setStatusView(expiresin) === 'warning'">
                                Your subscription is almost expired.
                            </template>
                            <template v-if="setStatusView(expiresin) === 'ok'">
                                Your subscription is active.
                            </template>
                        </robo-details>
                    </robo-grid-item>

                    <robo-grid-item borderbottom v-if="store.state.robonomicsUIvue.polkadot.balanceXRT">
                        <robo-text size="small">Your balance:</robo-text>
                        <robo-text inline weight="bold">
                            {{ store.state.robonomicsUIvue.polkadot.balanceXRT }} XRT
                        </robo-text>
                        <robo-details style="margin-left:var(--robo-space);">
                            <template #summary>
                                <robo-text inline weight="bold" :highlight="((Number(roundprice(price)) + Number(roundprice(1))) < store.state.robonomicsUIvue.polkadot.balanceXRT) ? 'ok' : 'error'">
                                    <robo-icon :icon="((Number(roundprice(price)) + Number(roundprice(1))) < store.state.robonomicsUIvue.polkadot.balanceXRT) ? 'circle-check' : 'circle-exclamation'" />
                                </robo-text>
                            </template>
                            <robo-grid gap="x05">
                                <robo-text size="small">To purchase or renew a subscription, you only need to have apprx. {{Number(roundprice(price)) + Number(roundprice(1))}} XRT tokens in your account balance. Learn about XRT on Robonomics’ website - https://robonomics.network/xrt/</robo-text>
                                <robo-text weight="bold" size="small">Where to buy XRT</robo-text>
                                <robo-link href="https://app.basilisk.cloud/trade"><robo-text size="small">Basilisk</robo-text></robo-link>
                                <robo-link href="https://app.solarbeam.io/exchange/swap"><robo-text size="small">Solarbeam</robo-text></robo-link>
                                <robo-link href="https://trade.kraken.com/markets/kraken/xrt/usd"><robo-text size="small">Kraken</robo-text></robo-link>
                            </robo-grid>
                        </robo-details>
                    </robo-grid-item>

                    <robo-grid-item borderbottom v-if="price">
                        <robo-text size="small">Subscription price:</robo-text>
                        <robo-text inline weight="bold">{{ roundprice(price) }} XRT</robo-text>
                    </robo-grid-item>

                    <robo-grid-item borderbottom v-if="activationtime">
                        <robo-text size="small">Activation time:</robo-text>
                        <robo-text inline weight="bold">~ {{ activationtime }} min</robo-text>
                    </robo-grid-item>

                    <robo-grid-item v-if="available">
                        <robo-text size="small">Available subscriptions:</robo-text>
                        <robo-text inline weight="bold">{{ available }}</robo-text>
                    </robo-grid-item>
                </robo-grid>

                <robo-button 
                    @click.prevent="activate"
                    :disabled="status !== 'init' || expiresin < -1"
                    :loading="status === 'processing'"
                    :type="buttonstatus"
                    block
                >
                    {{ buttontext }}
                </robo-button>
            </template>

            <robo-status v-if="message" :type="messagestatus" solid>{{ message }}</robo-status>

        </robo-grid>
    </robo-section>
</template>

<script setup>
defineOptions({ name: 'RoboTemplateRwsBuy' });

import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { dateGetRange, dateGetString, setStatusView, generateName } from '../../tools';

const store = useStore();
const emit = defineEmits(['onActivate']);

const props = defineProps({
    price: { type: [Number, String] },
    activationtime: { type: [Number, String] },
    available: { type: [Number, String] },
    rwsExpiration: { type: Number },
    chainInfoUploaded: { type: Boolean },
});

const status = ref('init'); // init, ok, error, processing
const message = ref(null);
const expiration = computed(() => dateGetString(props.rwsExpiration));
const expiresin = computed(() => props.rwsExpiration ? dateGetRange(props.rwsExpiration) : null);

/**
 * Возвращает текст кнопки в зависимости от статуса.
 */
const buttontext = computed(() => {
    if (status.value === 'init') {
        return expiresin.value ? 'Renew subscription' : 'Buy subscription';
    }
    return {
        'ok': 'Subscription activated',
        'error': 'Something went wrong',
    }[status.value] ?? 'Processing';
});

/**
 * Возвращает статус кнопки в зависимости от состояния.
 */
const buttonstatus = computed(() => ({
    'ok': 'ok',
    'error': 'error',
}[status.value] ?? 'primary'));

/**
 * Определяет статус сообщения.
 */
const messagestatus = computed(() => ({
    'ok': 'ok',
    'error': 'error',
}[status.value] ?? 'warning'));

/**
 * Округляет цену подписки.
 */
const roundprice = (price) => {
    try {
        return parseFloat(price).toFixed(0);
    } catch {
        return price;
    }
};

/**
 * Добавляет новый сетап в список
 */
const addRws = async (rwsname) => {
    const setup = {
        owner: store.state.robonomicsUIvue.polkadot.address,
        name: rwsname,
        network: store.state.robonomicsUIvue.polkadot.connection.network
    };

    const result = await store.dispatch('rws/addSetup', setup);
    
    if (result.success) {
        status.value = 'ok';
        message.value = 'Subscription has been activated. Please, check the list of your setups.';
    } else {
        status.value = 'error';
        message.value = result.error || 'Failed to activate subscription';
    }
};

/**
 * Активирует подписку.
 */
const activate = async () => {
    status.value = 'processing';
    message.value = 'Please, sign and wait here for the activation process';

    if (!store.state.robonomicsUIvue.polkadot.address) {
        status.value = 'error';
        message.value = 'Please, connect the account to proceed';
        return;
    }

    emit('onActivate', async (st, msg) => {
        if (st === 'cancel') {
            status.value = 'init';
            message.value = 'The activation process has been canceled';
            return;
        }

        if (st === 'error') { 
            status.value = 'error';
            message.value = msg ?? 'Something went wrong during the activation process';
            return;
        }

        if (st === 'ok') {
            const existingSetup = await store.dispatch('rws/findSetup', store.state.robonomicsUIvue.polkadot.address);
            const rwsname = existingSetup?.name || generateName();
            await addRws(rwsname);
        }
    });
};

// Обновляем статус при изменении подключенного аккаунта
watch(() => store.state.robonomicsUIvue.polkadot.address, () => {
    status.value = 'init';
    message.value = null;
}, { immediate: true });

</script>
