<template>
    <robo-text v-if="store.state.robonomicsUIvue.app.status" size="tiny" class="robo-appstatus">{{store.state.robonomicsUIvue.app.status}}</robo-text>
</template>

<script>
    export default { name: 'RoboAppStatus' }
</script>

<script setup>
    import { useStore } from 'vuex'
    const store = useStore()
</script>

<style>
  /* for outside rewriting */
  :root {
    --robo-appstatus-background: var(--robo-color-dark);
    --robo-appstatus-color: var(--robo-color-light);
  }
</style>

<style scoped>
    .robo-appstatus {
        background-color: var(--robo-appstatus-background);
        bottom: 0;
        color: var(--robo-appstatus-color);
        left: 0;
        padding: 0 2px;
        position: fixed;
        right: 0;
        z-index: 1000;
    }
</style>