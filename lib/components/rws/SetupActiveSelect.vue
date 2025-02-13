<template>
    <robo-select
        v-if="rwslist.length > 1"
        block
        size="small"
        :options="rwslistNames" 
        :values="rwslistOwners" 
        v-model="rwsactiveModel" 
        @change="setActive()"
        class="selectrws"
        offset="x05"
    />
</template>

<script>
  export default { name: 'RoboRwsSetupActiveSelect' }
</script>

<script setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const rwsactiveModel = ref(null);

    const rwslist = computed( () => {
        return store.state.robonomicsUIvue.rws.list;
    });

    const activerwsowner = computed( ()=> {
        return store.state.robonomicsUIvue.rws.active;
    });

    const rwslistNames = computed( () => {
        if(rwslist.value && rwslist.value.length > 0) {
            return rwslist.value.map(item => {
                return item.name;
            });
        } else {
            return null;
        }
    });

    const rwslistOwners = computed( () => {
        if(rwslist.value && rwslist.value.length > 0) {
            return rwslist.value.map(item => {
                return item.owner;
            })
        } else {
            return null;
        }
    });

    const setActive = () => {
        store.commit('rws/setActive', rwsactiveModel.value);

        /* force reload for all pages, in case of something sensible need to be updated only on reload */
        router.go();
        /* we need force reload of the devices page as it has subscription data loading onmount */
        // if('/' + router.currentRoute.value.name === store.state.robonomicsUIvue.rws.links.devices) {
        //     router.go();
        // }
    };

    onMounted( () => {
        store.dispatch('rws/getActive');
        rwsactiveModel.value = store.state.robonomicsUIvue.rws.active;
    });

    watch(rwslist, () => {
        rwsactiveModel.value = store.state.robonomicsUIvue.rws.active;
    });

    watch(activerwsowner, value => {
        rwsactiveModel.value = value;
    });
</script>