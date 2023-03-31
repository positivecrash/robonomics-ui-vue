<template>
  <div class="robo-layout">
      <slot/>
  </div>
</template>

<script>
  export default { name: 'RoboLayout' }
</script>

<style scoped>
    .robo-layout {
      display: grid;
      grid-template-rows: auto 1fr;
      min-height: 100svh;
      position: relative;
    }
</style>