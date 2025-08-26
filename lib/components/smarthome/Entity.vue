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
    import { computed } from 'vue';
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


    const entityType = computed(() => {
        return props.entityID?.split('.')[0] || 'unknown';
    });

    const getEntityComponent = (type) => {
        switch(type) {
            case "light": 
                return 'RoboSmarthomeEntityLight';
            // case "switch":
            // case "outlet":
            // case "fan":
            // case "cover":
            //     return 'RoboSmarthomeEntitySwitcher';
            default: 
                return 'RoboSmarthomeEntityDefault';
        }
    }
</script>
