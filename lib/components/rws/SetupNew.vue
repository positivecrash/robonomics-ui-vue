<template>
    <robo-section width="narrow">

        <robo-text title="1">Add a setup into dapp</robo-text>

       <!-- <robo-section v-if="store.state.robonomicsUIvue.polkadot.address && hasSubscription && noSetupForActive"> -->
        <robo-section offset="x2">
          <robo-text title="5" offset="x025">Generate new setup</robo-text>
          <robo-text size="small" offset="x025">Requires owner's sign in the extension</robo-text>
          <robo-section offset="x0" card>
            <RoboRwsGenerateSetup @onSetupGenerate="onSetupGenerate" @onRequestSubscription="onRequestSubscription" />
          </robo-section>
        </robo-section>


      <robo-section offset="x2">
          <robo-text title="5" offset="x025">Upload a setup</robo-text>
          <robo-status v-if="uploadmsg" type="error" solid>{{uploadmsg}}</robo-status>
          <RoboFileUpload :onloadfunc="uploadSetup" title="Upload .json with setup" drop />
      </robo-section>

      <robo-section offset="x2">
          <robo-text title="5" offset="x025">Add setup mannually</robo-text>
          <RoboTemplateRwsSetupForm />
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

const uploadSetup = uploaded => {

  uploadmsg.value = null;

  store.dispatch('rws/import', uploaded).then( e => {
    if(e) {
      router.push(store.state.robonomicsUIvue.rws.links.setup);
    } else {
      uploadmsg.value = 'Something went wrong while uploading';
    }
  })
};
/* - UPLOAD SETUP */

</script>