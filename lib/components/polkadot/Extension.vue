<template>
    <robo-button 
    v-if="(novaDetected && wallet === 'nova') || (!novaDetected)"
    @click="(walletInstalled && !walletConnected) ? enable() : null" 
    :href="(!walletInstalled && !walletConnected) ? extensionData.install : null" 
    :disabled="walletConnected ? 'ok' : null" 
    :title="extensionData.name"
    :class="classes"
    clean>
        <img :src="getImageUrl(extensionData.picture)" />

        <span class="robo-dotlabel" :class="walletInstalled ? 'green' : null">
            <robo-icon :icon="walletInstalled ? 'check' : 'arrow-down'" size="supertiny" />
        </span>

    </robo-button>
</template>

<script>
  export default { name: 'RoboAccountPolkadotExtension' }
</script>

<script setup>
    import {computed, ref, onMounted, watch } from 'vue'
    import extensions from './extensions'

    import { useStore } from 'vuex'
    const store = useStore()

    const props = defineProps({
        wallet: {
        type: String,
        default: null,
        validator: function (value) {
            return ['polkadot-js', 'talisman', 'subwallet-js', 'nova'].indexOf(value) !== -1;
        }
        }
    })

    const getExtension = ref(null);
    const walletConnected = ref(false);

    const extensionData = computed( () => { return extensions.find(ext => ext.wallet === props.wallet) });
    const getImageUrl = image => { return new URL(`../polkadot/extensions/${image}`, import.meta.url) }

    const enable = async () => {
        await getExtension.value.enable().then(
        async value => {
            /* set chosen extension */
            /* wallet set inside of setPolkadotExtension */
            store.commit('polkadot/setExtension', extensionData.value.extension)

            /* set active account (first by default) */
            const accounts = await value.accounts.get()
            if(accounts.length > 0) {
                store.commit('polkadot/setAddress', accounts[0].address)
            }
        }).catch(
        (reason) => {
            console.warn('[robonomics-ui-vue]:', reason)
        })
    }

    const novaDetected = computed( () => {
        return window?.walletExtension?.isNovaWallet
    })

    const walletInSettings = computed( () => {
        return store.state.robonomicsUIvue.polkadot.wallet === props.wallet
    })

    const classes = computed( () => {
        return {
            [`robo-account-polkadot-extension`]: true,
            [`robo-account-polkadot-extension--connected`]: walletConnected.value
        }
    })

    const walletInstalled = computed( () => {
        if(props.wallet === 'nova') {
            if(getExtension.value && novaDetected.value) {
                return true;
            } 
        } else if(getExtension.value) {
           return true;
        } else {
            return false;
        }
    });

    onMounted(async () => {
        try {
            await store.dispatch("polkadot/waitWeb3Injected");
            getExtension.value = window?.injectedWeb3[extensionData.value.extension];
        } catch (e) {
            console.warn('[robonomics-ui-vue]: no extension found in robo-account-polkadot-extension');
        }

        if(walletInSettings.value && walletInstalled.value) {
            walletConnected.value = true;
        }

        watch(() => store.state.robonomicsUIvue.polkadot.wallet, () => {
            if(walletInSettings.value && walletInstalled.value) {
                walletConnected.value = true;
            } else {
                walletConnected.value = false;
            }
        })
    })
</script>

<style>
    /* for outside rewriting */
    :root {
        --robo-account-polkadot-extension-img-size: 40px;
        --robo-account-polkadot-extension-label-size: 15px;
    }

    .robo-account-polkadot-extension--connected {
        opacity: 0.7;
    }

    .robo-account-polkadot-extension {
        position: relative;
    }
</style>

<style scoped>
img {
    display: block;
    width: var(--robo-account-polkadot-extension-img-size);
}
</style>
