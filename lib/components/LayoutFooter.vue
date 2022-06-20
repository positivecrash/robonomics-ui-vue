<template>
    <footer class="robo-layout-footer">
        <slot/>
    </footer>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboLayoutFooter'
})
</script>

<style scoped>
    .robo-layout-footer {
        padding-top: var(--space);
        padding-bottom: var(--space);
        border-top: 1px solid var(--color-text);
        
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
    }
</style>