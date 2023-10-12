<template>

  <footer :class="classes">

    <robo-grid type="flex" offset="0" gap="x025" valign="center" galign="stretch">
      <robo-text weight="bold-italic" size="small">@2023 Robonomics open sourse dapp<template v-if="version">, <robo-link :href="'https://github.com/airalab/dapp.robonomics.network/releases/tag/' + version">relise {{version}}</robo-link></template></robo-text>
      <robo-text weight="bold-italic" size="small"><robo-link href="https://github.com/airalab/dapp.robonomics.network/issues">Make an issue for support</robo-link></robo-text>
    </robo-grid>
    
  </footer>

</template>

<script>
  export default { name: 'RoboLayoutFooter' }
</script>

<script setup>
  import { defineProps, computed } from 'vue'

  const props = defineProps({
    version: {
      type: String
    }

  })

  const classes = computed( () => {
    return {
      [`robo-layout-footer`]: true
    }
  })
</script>

<style scoped>

.robo-layout-footer {
  padding: var(--robo-space);
}

.robo-layout-footer > .robo-grid {
  border-top: 1px solid var(--robo-color-dark);
}

@media screen and (max-width: 600px) {
  .robo-layout-footer > .robo-grid-type--flex {
    flex-direction: column;
  }
}

</style>