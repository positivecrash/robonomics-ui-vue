<template>
    <robo-details class="account-polkadot-generate" block :type="detailstype" summarystyle="link" :afterCloseDetails="clear" :contentCloseOutOfFocus="false">
        <template #summary>
            <slot name="link" />
        </template>
        <robo-text title="5"><slot name="title" /></robo-text>
        <robo-grid gap="x05" columns="1">
            <robo-text size="small">
                <slot name="description" />
            </robo-text>

            <robo-input-new 
                width="wide" 
                :label="labelpassword" 
                type="password" 
                v-model="password" 
                :error="errorpassword" 
                @click="errorpassword = false" 
                placeholder="Create a password"
            />
            
            <robo-button @click="generate()" :type="buttontype" block :disabled="generated">{{buttontitle}}</robo-button>
            <robo-text highlight="error" v-if="errorpassword">Create password and store it savely</robo-text>
            <robo-section v-if="generated" offset="x1">
                <robo-text v-if="address" weight="bold" size="small">Account generated:</robo-text>
                <robo-text v-if="address" highlight="ok" weight="bold" class="robo-line-clipoverflow" offset="x05">{{address}}</robo-text>
                <robo-text v-if="seed" weight="bold" size="small">Remember to save the seed:</robo-text>
                <robo-text v-if="seed" highlight="ok" weight="bold" offset="x05">{{seed}}</robo-text>
                <robo-text size="small" weight="bold" offset="x05"><slot name="successmsg" /></robo-text>
            </robo-section>
        </robo-grid>
    </robo-details>

</template>

<script>
  export default { name: 'RoboAccountPolkadotGenerate' }
</script>

<script setup>
    import { computed, ref } from 'vue'
    import { generateAccount } from '../polkadot/tools'
    import { downloadJson } from '../tools'

    const props = defineProps({
        beforename: {
            type: String
        },
        aftergenerating: {
            type: Function
        },
        beforegenerating: {
            type: Function
        },
        detailstype: {
            type: String,
            default: 'popup',
            validator: function (value) {
                return ['tooltip', 'popup', 'inital'].indexOf(value) !== -1;
            }
        },
        labelpassword: {
            type: String,
            default: 'Password *'
        },
        labelbutton: {
            type: String,
            default: 'Create'
        },
    })

    const emit = defineEmits(['onGenerate']);

    const address = ref('');
    const password = ref('');
    const seed = ref('');

    const errorpassword = ref(null);
    const filename = ref(null);
    const generated = ref(null);

    const buttontype = computed( () => {
        if (generated.value) {
            return 'ok'
        } else {
            if(errorpassword.value) {
                return 'error'
            } else {
                return 'primary'
            }
        }
    })

    const buttontitle = computed( () => {
        if (generated.value) {
            return 'Created, check downloads'
        } else {
            if(errorpassword.value) {
                return 'Error, not generated'
            } else {
                return props.labelbutton
            }
        }
    })

    const generate = () => {

        if(password.value) {

            if(props.beforegenerating) {
                props.beforegenerating();
            }

            /* Generate account */
            const { mnemonic, json } = generateAccount(password.value);
            address.value = json.address;
            seed.value  = mnemonic;

            const name = json.address;
            if(props.beforename) {
                filename.value = props.beforename + '-' + name;
            } else {
                filename.value = name;
            }

            downloadJson(json, filename.value);
            emit('onGenerate', address.value, json);
            
            generated.value = true;
            filename.value = null;

            if(props.aftergenerating) {
                props.aftergenerating();
            }
        } else {
            errorpassword.value = true;
        }
    }

    const clear = () => {
        address.value = null
        password.value = null
        errorpassword.value = null
        generated.value = null
    }

</script>

<style scoped>
.robo-line-clipoverflow {
    display: block;
    max-width: 80vw;
}
</style>

<style>
.account-polkadot-generate .robo-details-summary > *:not(:last-child){
    margin-right: var(--robo-space);
}
</style>