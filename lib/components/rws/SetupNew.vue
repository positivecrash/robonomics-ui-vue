<template>
    <robo-section width="narrow">

        <robo-text title="1">Add a setup into dapp</robo-text>

        <robo-section offset="x2">
          <robo-text title="5" offset="x025">Add by owner</robo-text>
          <robo-text size="small" offset="x025">If you already have a subscription, you may add here with owner's address only, even if it is exipred.</robo-text>
          <robo-section offset="x0" card>
            <RoboRwsSetupAdd @onSetupGenerate="onSetupGenerate" @onRequestSubscription="onRequestSubscription" />
          </robo-section>
        </robo-section>


      <robo-section offset="x2">
          <robo-text title="5" offset="x025">Upload a file with setup</robo-text>
          <robo-polkadot-network-select clean size="large" icon />
          <robo-status v-if="uploadmsg" type="error" solid>{{uploadmsg}}</robo-status>
          <RoboFileUpload :onloadfunc="uploadSetup" title="Upload .json with setup" drop />
      </robo-section>

    </robo-section>
</template>

<script>
  export default { name: 'RoboRwsSetupNew' }
</script>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({

    onSetupGenerate: {
        type: Function
    },

    onRequestSubscription: {
        type: Function
    }
});


/* + UPLOAD SETUP */
const uploadmsg = ref(null);

const uploadSetup = async (uploaded) => {
    uploadmsg.value = null;

    try {
        const result = await store.dispatch('rws/uploadSetup', uploaded);
        
        if (result.success) {
            // Если импорт успешен, переходим на страницу сетапа
            router.push(store.state.robonomicsUIvue.rws.links.setup);
        } else {
            // Если произошла ошибка, сохраняем сообщение ошибки
            uploadmsg.value = result.error || 'Something went wrong while uploading';
        }
    } catch (error) {
        // Обрабатываем неожиданные ошибки
        uploadmsg.value = 'Unexpected error: ' + error.message;
        console.error(error);
    }
};
/* - UPLOAD SETUP */

</script>