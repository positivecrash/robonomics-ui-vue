<template>

  <header :class="classes">

    <div class="robo-layout-header-grid">

      <a v-if="logoIcon" href="/" class="robo-layout-header-logo"><img :src="logoIcon" /></a>

      <div v-if="title" class="robo-layout-header-title">{{title}}</div>

      <robo-grid type="flex" offset="0" gap="x05" valign="center" class="robo-layout-header-toolbar">

        <robo-text size="small">
          <robo-account-polkadot
              short 
              extensionAllowShift
              extensionShowIcon
              selectable
          />
        </robo-text>

        <robo-details v-if="navigation" type="tooltip" tooltipRatio="none" class="navigation">

          <template #summary>
            <robo-icon icon="bars"/>
          </template>

          <robo-grid :columns="navigation.length + 1" offset="x0" gap="x1">
            <nav>
              <h4>Smart home</h4>
              <div><router-link :to="store.state.robonomicsUIvue.rws.links.activate">Activation</router-link></div>
              <div><router-link :to="store.state.robonomicsUIvue.rws.links.list">RWS Setups</router-link></div>
              <div v-if="role"><router-link :to="store.state.robonomicsUIvue.rws.links.hasetup">HA setup</router-link></div>
              <div v-if="role === 'owner'"><router-link :to="store.state.robonomicsUIvue.rws.links.users">Users</router-link></div>
              <div><router-link :to="store.state.robonomicsUIvue.rws.links.devices">Devices</router-link></div>
            </nav>

            <nav v-for="item in navigation" :key="item.id">
              <h4 v-if="item.title">{{item.title}}</h4>

              <div v-for="link in item.links" :key="link.id">
                <template v-if="link.type && link.type === 'router'">
                  <router-link :to="link?.link">{{link?.title}}</router-link>
                </template>
                <template v-else>
                  <a :href="link?.link" :target="link.type === 'external' ? '_blank' : null">{{link?.title}}</a>
                </template>
              </div>
              
            </nav>
          </robo-grid>
        
        </robo-details>
      </robo-grid>

    </div>

  </header>

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
    },

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
    --robo-header-section-offset-gorizontal: 2rem;
    --robo-header-section-offset-vertical: 0.5rem;
  }

  .robo-layout-header .robo-account-polkadot {
    --robo-account-polkadot-label-background: var(--robo-color-dark-80);
    --robo-account-polkadot-label-color: var(--robo-color-light);
  }

  .robo-layout-header .robo-details-summary {
    --robo-details-summary-background: var(--robo-color-dark-80);
    --robo-details-summary-color: var(--robo-color-light);
    --robo-details-summary-padding: 0.5rem;
  }

  @media screen and (max-width: 900px) {
    .robo-layout-header .navigation .robo-grid-type--grid {
      --grid-columns: 1fr;
    }
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

  .robo-layout-header-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: var(--robo-header-section-offset-gorizontal);
    padding-bottom: var(--robo-header-section-offset-vertical);
    padding-top: var(--robo-header-section-offset-vertical);
    padding-left: var(--robo-layout-padding);
    padding-right: var(--robo-layout-padding);
  }

  .robo-layout-header-logo {
    justify-self: start;
  }

  .robo-layout-header-toolbar {
    justify-self: end;
  }

  .robo-layout-header--sticky {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  /* - LAYOUT */


  /* + STYLING */
  .robo-layout-header {
    background-color: var(--robo-header-background);
    color: var(--robo-header-color);
  }

  .robo-layout-header-title {
    text-transform: uppercase;
    text-align: center;
  }

  @media screen and (max-width: 700px) {
    .robo-layout-header-grid { grid-template-columns: auto auto; }

    .robo-layout-header-title {
      position: absolute;
      bottom: -2rem;
      left: 0;
      background: var(--robo-header-background);
      right: 0;
    }
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
</style>