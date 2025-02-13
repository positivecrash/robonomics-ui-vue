<template>
    <template v-if="type === 'popup'">
        <robo-details v-if="rwslist.length > 0">
            <template #summary>
                <robo-grid type="flex" gap="x05">
                    <robo-icon icon="house-signal-solid" />
                    <span class="robo-line-clipoverflow">{{activerws.name}}</span>
                </robo-grid>
            </template>

            <robo-section>
                <robo-select
                    v-if="rwslist.length > 1 && selectable"
                    block
                    size="small"
                    :options="rwslistNames" 
                    :values="rwslistOwners" 
                    v-model="rwsactiveModel" 
                    @change="setActive()"
                    class="selectrws"
                    offset="x05"
                />

                <robo-text v-else title="5" offset="x025" nowrap>{{activerws.name}}</robo-text>

                <robo-text size="small">
                    <robo-rws-setup-active-info 
                        :show="show"
                        @on-controller-edit="onControllerEdit"
                        @on-controller-request="onControllerRequest"
                        :onUserDelete="onUserDelete" 
                        :onUserAdd="onUserAdd"
                />
                </robo-text>

            </robo-section>

        </robo-details>
    </template>

    <template v-if="type === 'full'">
        <robo-status v-if="!activerws" type="error">The Setup was not found</robo-status>
        <robo-status v-if="rwslist.length < 1" type="error">No setups were found</robo-status>

        <template v-if="rwslist.length > 0">
            <robo-select
                v-if="rwslist.length > 1 && selectable"
                block
                size="small"
                :options="rwslistNames" 
                :values="rwslistOwners" 
                v-model="rwsactiveModel" 
                @change="setActive()"
                class="selectrws"
                offset="x05"
            />

            <robo-text size="small">
                <robo-rws-setup-active-info 
                    :show="show" 
                    @test="testEmit"
                    @on-controller-edit="onControllerEdit"
                    @on-controller-request="onControllerRequest"
                    :onUserDelete="onUserDelete" 
                    :onUserAdd="onUserAdd"
                />
            </robo-text>
        </template>
    </template>

</template>

<script>
  export default { name: 'RoboRwsSetupActive' }
  /* Wrap for the active setup's information */
</script>

<script setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const props = defineProps({
        selectable: {
            type: Boolean,
            default: false
        },

        type: {
            type: String,
            default: 'full',
            validator: function (value) {
                return ['full', 'popup'].indexOf(value) !== -1;
            }
        },
        show: {
            type: Array
        },
        onControllerEdit: {
            type: Function
        },
        onControllerRequest: {
            type: Function
        },
        onUserAdd: {
            type: Function
        },
        onUserDelete: {
            type: Function
        }
    });

    const rwsactiveModel = ref(null);

    const rwslist = computed( () => {
        return store.state.robonomicsUIvue.rws.list;
    });

    const activerws = computed( () => {
        return rwslist.value.find(item => item.owner === store.state.robonomicsUIvue.rws.active);
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