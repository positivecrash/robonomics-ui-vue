<template>
    <robo-grid gap="x05" columns="1">
        <robo-section>
            <robo-text size="small" offset="x025">
                Owner & Network:
                <robo-text 
                    v-if="currentaddress"
                    :highlight="!subscriptionExpires ? 'error' : setStatusView(dateGetRange(subscriptionExpires))"
                    inline
                >
                    <template v-if="!subscriptionExpires">No subscription</template>
                    <template v-if="subscriptionExpires">
                        Subscription til {{ dateGetString(subscriptionExpires) }}
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

        <robo-section :disabled="!subscriptionExpires">
            <robo-section offset="x025">
                <robo-text size="small" offset="x025">New password:</robo-text>
                <robo-input-new 
                    width="wide" 
                    type="password" 
                    v-model="password" 
                    :error="errorpassword" 
                    @click="errorpassword = false"
                />
            </robo-section>
        </robo-section>

        <robo-section :disabled="!subscriptionExpires">
            <robo-button 
                block 
                :disabled="!currentaddress || !subscriptionExpires || !password || status !== 'init'"
                :type="buttontype"
                @click="onSubmit"
            >
                <template v-if="status === 'process'">
                    <robo-loader /> Processing
                </template>
                <template v-else>{{ buttontext }}</template>
            </robo-button>
            <robo-status v-if="message" :type="status" offset="x1">{{ message }}</robo-status>
        </robo-section>
    </robo-grid>
</template>

<script>
export default { name: 'RoboRwsGenerateSetup' }
</script>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { generateConfig, formatFileName, setStatusView, dateGetRange, dateGetString } from '../../tools';
import { useStore } from 'vuex';

const emit = defineEmits(['onSetupGenerate', 'onRequestSubscription']);
const store = useStore();
const password = ref(null);
const status = ref('init'); // Возможные значения: 'init', 'process', 'ok', 'error'
const message = ref(null);
const config = ref(null);
const filename = ref('subscription');

const currentaddress = computed(() => store.state.robonomicsUIvue.polkadot.address);
const subscriptionExpires = ref(null);

const onSubmit = async () => {
    status.value = 'process';
    message.value = null;

    if (!currentaddress.value) {
        status.value = 'error';
        message.value = 'Please, connect the owner account to proceed';
        return;
    }

    if (!subscriptionExpires.value) {
        status.value = 'error';
        message.value = 'No subscription found for this account';
        return;
    }

    if (!password.value) {
        status.value = 'error';
        message.value = 'Please, provide a password';
        return;
    }

    config.value = generateConfig(currentaddress.value, password.value);

    if (!config.value) {
        status.value = 'error';
        message.value = 'Something went wrong while generating the config';
        return;
    }

    filename.value = formatFileName(config.value.name);
    emit('onSetupGenerate', config.value, async (st, msg) => await response(st, msg));
};

/**
 * В onSetupGenerate адрес контроллера должен добавиться в список юзеров
 */
const response = async (st, msg) => {
    status.value = st;
    message.value = msg ?? "Setup saved and added to the dapp. Don't forget to save backup in 'Your setups'.";

    if (st === 'ok' && config.value) {
        try {
            const result = await store.dispatch('rws/addSetup', config.value);
            if (!result.success) {
                status.value = 'error';
                message.value = result.error || 'Failed to save setup';
            }
        } catch (error) {
            status.value = 'error';
            message.value = error.message || 'An unknown error occurred';
        }
    }
};

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

onMounted(() => {
    watch(() => currentaddress.value, (v) => {
        status.value = 'init';
        message.value = null;
        password.value = null;

        if (v) {
            emit('onRequestSubscription', v, (subscription) => getSubscriptionInfo(subscription));
        } else {
            subscriptionExpires.value = null;
        }
    }, { immediate: true });

    watch(() => password.value, () => {
        status.value = 'init';
        message.value = null;
    });
});
</script>
