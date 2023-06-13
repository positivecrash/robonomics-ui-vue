<template>
    <div class="robo-toggle">
        <input type="checkbox" :id="uniqueId" v-bind="$attrs" v-model.lazy="inputModel" />
        <label :for="uniqueId" aria-hidden="true">Toggle</label>
    </div>
</template>

<script>
    export default {
        name: 'RoboToggle',
        inheritAttrs: false
    }
</script>

<script setup>
    import { computed, defineProps, defineEmits } from 'vue'

    const uniqueId = computed( () => {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    })

    const props = defineProps({
        modelValue: {
            type: String,
            required: true
        }
    })

    const emit = defineEmits(['update:modelValue'])

    const inputModel = computed({
        get: () => {
            if(!props.modelValue) {
                console.warn('[robonomics-ui-vue3]: `robo-select` component is missing required v-model directive')
            } else {
                return props.modelValue
            }
        },
        set: value => {
            emit('update:modelValue', value)
        }
    })
</script>

<style scoped>

    .robo-toggle {
        --size: 36px;
        --koef: 0.6;
        --toggler: 8px;
        position: relative;
    }

    input[type=checkbox]{
        height: 0;
        position: absolute;
        visibility: hidden;
        width: 0;
    }


    label {
        background: var(--robo-color-dark);
        border-radius: calc(var(--size) * var(--koef));
        cursor: pointer;
        display: block;
        height: calc(var(--size) * var(--koef));
        position: relative;
        text-indent: -9999px;
        width: var(--size);
    }

    label:after {
        content: '';
        position: absolute;
        top: calc(var(--toggler) * 0.5);
        left: calc(var(--toggler) * 0.5);
        width: calc(var(--size) * var(--koef) - var(--toggler));
        height: calc(var(--size) * var(--koef) - var(--toggler));
        background: var(--robo-color-light);
        border-radius: calc(var(--size) * var(--koef) - var(--toggler));
        transition: 0.3s;
    }

    input:checked + label {
        background: var(--robo-color-green);
    }

    input:checked + label:after {
        left: calc(100% - 5px);
        transform: translateX(-100%);
    }

    label:active:after {
        width: calc(var(--size) * var(--koef));
    }

    input[type=checkbox][disabled] + label {
        opacity: 0.6;
        cursor: default;
    }
</style>