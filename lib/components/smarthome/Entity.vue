<template>
    <component
        :is="getEntityComponent(entityType)"
        :key="entityType"
        :entityData="entityData"
        :entityID="entityID"
        :services="services"
    />
</template>

<script>
  export default { name: 'RoboSmarthomeEntity' }
</script>

<script setup>
    import { useStore } from 'vuex';
    const store = useStore();

    const props = defineProps({
        entityID: {
            type: String
        },
        entityData: {
            type: Object
        },
        services: {
            type: Object
        }
    });

    const getEntityComponent = (type) => {
        return 'RoboSmarthomeEntityDefault';
    }
</script>