<template>

  <header :class="classes">

    <robo-grid type="flex" offset="0" gap="x05" valign="center" galign="stretch" class="robo-layout-header-grid">

      <robo-grid type="flex" offset="0" gap="x05" valign="center">
        <a v-if="logoIcon" href="/" class="robo-layout-header-logo"><img :src="logoIcon" /></a>
        <b v-if="title" class="robo-layout-header-title">{{title}}</b>
      </robo-grid>
  
      <robo-grid type="flex" offset="0" gap="x05" valign="center" class="robo-layout-header-toolbar">

        <robo-text size="small">
          <robo-account-polkadot
              short 
              extensionAllowShift
              extensionShowIcon
              selectable
          />
        </robo-text>

        <robo-text size="small">
            <robo-template-rws-active select />
        </robo-text>

        <robo-details v-if="navigation" type="tooltip" tooltipRatio="none" class="navigation">

          <template #summary>
            <robo-icon icon="bars"/>
          </template>

          <robo-grid :columns="navigation.length + 1" offset="x0" gap="x1">
            <nav>
              <h4>Smart home</h4>
              <div><router-link :to="store.state.robonomicsUIvue.rws.links.activate" exact>New subscription</router-link></div>
              <div><router-link :to="store.state.robonomicsUIvue.rws.links.setupnew" exact>New setup</router-link></div>
              <div><router-link :to="store.state.robonomicsUIvue.rws.links.setup" exact>Setups</router-link></div>
              <div><router-link :to="store.state.robonomicsUIvue.rws.links.devices" exact>Devices</router-link></div>
            </nav>

            <nav v-for="item in navigation" :key="item.id">
              <h4 v-if="item.title">{{item.title}}</h4>

              <div v-for="link in item.links" :key="link.id">
                <template v-if="link.type && link.type === 'router'">
                  <router-link :to="link?.link" exact>{{link?.title}}</router-link>
                </template>
                <template v-else>
                  <a :href="link?.link" :target="link.type === 'external' ? '_blank' : null">{{link?.title}}</a>
                </template>
              </div>
              
            </nav>
          </robo-grid>
        
        </robo-details>
      </robo-grid>

    </robo-grid>
    
  </header>

  <robo-app-status />

</template>

<script>
  export default { name: 'RoboLayoutHeader' }
</script>

<script setup>
  import { defineProps, computed } from 'vue'

  const props = defineProps({
    logoIcon: {
      type: String
    },

    navigation: {
      type: Array
    },

    sticky: {
      type: Boolean,
      default: true
    },
    
    title: {
      type: String
    }

  })

  const classes = computed( () => {
    return {
      [`robo-layout-header`]: true,
      [`robo-layout-header--sticky`]: props.sticky,
    }
  })

  import { useStore } from 'vuex'
  const store = useStore()
  import { checkRole } from '../tools'

  const role = computed( () => {
    return checkRole(store.state.robonomicsUIvue.polkadot.address, store.state.robonomicsUIvue.rws.active)
  })
</script>

<style>
  /* for outside rewriting */
  :root {
    --robo-header-background: var(--robo-color-dark);
    --robo-header-color: var(--robo-color-light);
    --robo-header-logo-width: 3rem;
  }

  .robo-layout-header .robo-account-polkadot {
    --robo-account-polkadot-label-background: var(--robo-color-dark-80);
    --robo-account-polkadot-label-color: var(--robo-color-light);
  }

  .robo-layout-header .robo-details-summary {
    --robo-details-summary-background: var(--robo-color-dark-80);
    --robo-details-summary-color: var(--robo-color-light);
    --robo-details-summary-padding: 0.5rem;
    font-weight: bold;
  }

  @media screen and (max-width: 900px) {
    .robo-layout-header .navigation .robo-grid-type--grid {
      --grid-columns: 1fr;
    }
  }

  .robo-layout-header-logo-version a.robo-link {
    display: block;
    color: currentColor;
    text-decoration: underline;
  }
</style>

<style scoped>

  @media screen and (min-width: 900px) {
    .robo-layout-header {
      --robo-details-tooltip-maxwidth: auto;
    }
  }

  /* + LAYOUT */
  .robo-layout-header {
    position: relative;
  }

  .robo-layout-header-logo {
    background-color: var(--robo-color-dark-80);
    padding: 0.8rem;
  }

  .robo-layout-header--sticky {
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .robo-layout-header-toolbar {
    margin-right: var(--robo-space);
  }

  @media screen and (max-width: 700px) {
    .robo-layout-header-grid { grid-template-columns: auto auto; }

    .robo-layout-header-title {
      position: absolute;
      bottom: -2rem;
      left: 0;
      background: var(--robo-header-background);
      right: 0;
      padding: 0 var(--robo-space);
    }
  }
  /* - LAYOUT */


  /* + STYLING */
  .robo-layout-header .robo-layout-header-grid {
    background-color: var(--robo-header-background);
    color: var(--robo-header-color);
  }

  nav {
    font-size: 90%;
    font-weight: bold;
    margin-bottom: calc(var(--space)*2);
  }

  nav h4 {
    margin-bottom: calc(var(--space)*0.5);
    text-transform: uppercase;
    white-space: nowrap;
  }

  nav > div {
    margin-bottom: calc(var(--space)*0.5);
  }

  nav:last-child, nav:last-child > div:last-child {
    margin-bottom: 0;
  }

  nav a {
    white-space: nowrap;
  }

  /* - STYLING */


  /* + LOGO */
  .robo-layout-header-logo {
    display: block;
  }

  .robo-layout-header-logo img {
    display: block;
    width: 100%;
    max-width: var(--robo-header-logo-width);
  }
  /* - LOGO */

  .router-link-active {
    color: var(--robo-color-dark)
  }

  .robo-layout-header-logo-version {
    display: flex;
    gap: var(--robo-space);
    font-size: 60%;
  }
</style>