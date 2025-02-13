<template>
    
        <robo-grid gap="x05" columns="1">
            <robo-section>
                <robo-text size="small" offset="x025">Owner & Network:</robo-text>
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

            <!-- <robo-status v-if="!currentaddress" type="warning">Please, connect owner's account first</robo-status> -->
            <robo-status v-if="currentaddress && !subscriptionExpires" type="warning">No subscription found for this account in <i class="networkname">{{store.state.robonomicsUIvue.polkadot.network}}</i></robo-status>

            <robo-section :disabled="!subscriptionExpires">
                <robo-text weight="bold" size="small">
                    You have a subscription with an expiration date
                    <robo-text :highlight="setStatusView(dateGetRange(subscriptionExpires))" inline>{{dateGetString(subscriptionExpires)}}</robo-text>
                </robo-text>

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

                <robo-button 
                    @click.prevent="onSubmit"
                    :disabled="(status !== 'init')"
                    :loading="status === 'processing'"
                    :type="status"
                    block>
                {{buttontext}}
                </robo-button>

                <robo-text v-if="message && status === 'error'" :highlight="status">{{message}}</robo-text>

                <robo-status v-if="config && status==='ok'" type="ok">
                    All set up! You may  
                    <robo-button v-if="config && status==='ok'" clean @click="downloadJson(config, filename)">download</robo-button> 
                    the setup file now and connect it to your Home Assistant. In the dapp it has been automatically saved.
                </robo-status>
            </robo-section>

        </robo-grid>

</template>

<script>
  export default { name: 'RoboRwsGenerateSetup' }
</script>

<script setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import { generateConfig, downloadJson, setStatusView, dateGetRange, dateGetString, getConfigFileName } from '../../tools';
    import { useStore } from 'vuex';

    const emit = defineEmits(['onSetupGenerate', 'onRequestSubscription']);
    const store = useStore();
    const password = ref(null);
    const status = ref('init');
    const message = ref(null);
    var config = null;
    var filename = 'subscription';

    const currentaddress = computed( () => {
        return store.state.robonomicsUIvue.polkadot.address;
    })
    
    const onSubmit = () => {
        status.value = 'process';

        if(!currentaddress.value) {
            status.value = 'error';
            message.value = 'Please, connect the owner account to proceed';
            return;
        }

        if(!subscriptionExpires.value) {
            status.value = 'error';
            message.value = 'No subscription found for this account';
            return;
        }

        if(!password.value) {
            status.value = 'error';
            message.value = 'Please, provide password';
            return;
        }

        config = generateConfig(currentaddress.value, password.value);

        if(!config) {
            status.value = 'error';
            message.value = 'Something went wrong while generating the config';
            return;
        }

        filename = getConfigFileName(config.name);
        emit('onSetupGenerate', config, (st, msg) => response(st, msg));
    }

    const response = (st, msg) => {

        status.value = st;
        message.value = msg;

        if(st === 'ok' && config) {
            store.dispatch('rws/add', config);
        }
    }

    const buttontext = computed( () => {
        return ({
        'ok': 'Setup saved',
        'error': 'Something went wrong'
        }[status.value] ?? 'Submit')
    });

    /* + set up info for connected address */
    const subscriptionExpires = ref(null);

    const getSubscriptionInfo = (exp) => {

        if(!exp) {
            subscriptionExpires.value = null;
            return;
        }

        subscriptionExpires.value = exp;
    };
    /* - set up info for connected address */

    onMounted( () => {
        watch(() => currentaddress.value, v => {
            status.value = 'init';
            message.value = null;
            password.value = null;

            if(v) {
                emit('onRequestSubscription', v, (subscription) => getSubscriptionInfo(subscription));
            } else {
                subscriptionExpires.value = null;
            }
        }, { immediate: true });

        watch(() => password.value, v => {
            status.value = 'init';
            message.value = null;
        });
    });
    
</script>