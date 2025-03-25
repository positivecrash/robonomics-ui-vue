<template>

  <header :class="classes">
    <robo-grid type="flex" gap="x05" valign="center" galign="stretch" class="robo-layout-header-grid">

      <robo-grid type="flex" gap="x05" valign="center">
        <a v-if="logoIcon" :href="mainhost" class="robo-layout-header-logo"><img :src="logoIcon" /></a>
      </robo-grid>
  
      <robo-text size="small" class="robo-header-subselect">
        <robo-grid type="flex" gap="x05" galign="end" valign="center" class="robo-layout-header-toolbar">
        
          <robo-rws-setup-active type="popup" selectable :show="['date', 'owner', 'link']" />
          
          <robo-account-polkadot 
              extensionAllowShift
              extensionShowIcon
              selectable
              showAccountsAs="connected"
          />

          <RoboRwsUserKeys />

        <!-- <robo-text size="small" class="robo-header-subselect">
          <robo-account-ethereum />
        </robo-text> -->

        <!-- 

        <robo-text size="small" class="robo-header-subselect">
            <robo-button size="small" router="/hardware/season-pass">Season pass</robo-button>
        </robo-text> -->

        
        <robo-details type="tooltip" tooltipRatio="none" class="navigation" fitContent>

          <template #summary>
            <robo-icon icon="bars"/>
          </template>

          <slot name="nav" />

          <!-- <robo-grid :columns="navigation.length + 1" offset="x0" gap="x1">
            <nav>
              <h4>Smart home</h4>
              <div><router-link :to="store.state.robonomicsUIvue.rws.links.activate" exact>Your subscription</router-link></div>
              <div><router-link :to="store.state.robonomicsUIvue.rws.links.setupnew" exact>New configuration</router-link></div>
              <div v-if="store.state.robonomicsUIvue.rws.list.length > 0"><router-link :to="store.state.robonomicsUIvue.rws.links.setup" exact>Your configuration<template v-if="store.state.robonomicsUIvue.rws.list.length > 1">s</template></router-link></div>
              <div v-if="store.state.robonomicsUIvue.rws.list.length > 0"><router-link :to="store.state.robonomicsUIvue.rws.links.devices" exact>Devices & Control</router-link></div>
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
          </robo-grid> -->
        
        </robo-details>

      </robo-grid>
      </robo-text>

    </robo-grid>
    
  </header>

  <robo-app-status />

</template>

<script setup>
  defineOptions({
    name: 'RoboLayoutHeader'
  });

  import { computed, onMounted, watch } from 'vue';
  import { useStore } from 'vuex';
  const store = useStore();

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
  })

  const classes = computed( () => {
    return {
      [`robo-layout-header`]: true,
      [`robo-layout-header--sticky`]: props.sticky,
    }
  });

  const mainhost = computed( () => {
    return window.location.origin || '/';
  });

  // const libp2p = computed( () => {
  //   return store.state.robonomicsUIvue.app.libp2p.connected;
  // });

  // const parachain = computed( () => {
  //   return store.state.robonomicsUIvue.app.parachain.connected;
  // });

  // const relay = computed( () => {
  //   return store.state.robonomicsUIvue.app.relay.connected;
  // });

  // const network = computed( () => {
  //   return store.state.robonomicsUIvue.polkadot.connection.network;
  // });

  watch(()=> store.state.robonomicsUIvue.rws.list, v => {
    store.dispatch('polkadot/detectNetwork');

    if(v?.length > 0) {
      store.dispatch('rws/checkNetworkRws');
      store.dispatch('rws/getActiveSetup');
    }
  }, {immediate: true});

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
    text-transform: uppercase;
  }

  @media screen and (max-width: 900px) {
    .robo-layout-header .navigation .robo-grid-type--grid {
      --grid-columns: 1fr;
    }
  }

  @media screen and (max-width: 600px) {
    .robo-header-subselect .robo-details-summary .robo-line-clipoverflow {
      max-width: 120px;
    }
  }

  .robo-layout-header-toolbar {
    padding-right: var(--robo-space);
  }
</style>

<style scoped>

  header {
    --robo-details-tooltip-content-offset: .8rem;
  }

  .connection {
    position: relative;
    margin-left: 10px;
    text-transform: capitalize;
  }

  .connection:before {
    content: "";
    background-color: var(--robo-color-light-80);
    border-radius: 10px;
    display: block;
    height: 5px;
    width: 5px;
    position: absolute;
    top: 6px;
    left: -10px;
  }

  .connection.connected:before {
    background-color: var(--robo-color-green);
  }

  .connection.waiting:before {
    animation: Blink 0.8s linear infinite;
  }

  /* .robo-layout-header-title {
    text-transform: uppercase;
    font-weight: 800;
  } */

  @media screen and (min-width: 900px) {
    .robo-layout-header {
      --robo-details-tooltip-maxwidth: auto;
    }
  }

  /* + LAYOUT */
  .robo-layout-header {
    position: relative;
    font-family: var(--robo-font-family);
  }

  .robo-layout-header-logo {
    background-color: var(--robo-color-dark-80);
    padding: 0.8rem;
  }

  .robo-layout-header--sticky {
    position: sticky;
    top: 0;
    z-index: 99;
  }

  @media screen and (max-width: 700px) {
    .robo-layout-header-grid { grid-template-columns: auto auto; }

    /* .robo-layout-header-title {
      position: absolute;
      bottom: -2rem;
      left: 0;
      right: 0;
      background: var(--robo-header-background);
      padding: 0 var(--robo-layout-padding);
      text-align: center;
    } */
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
  }

  /* nav h4 {
    margin-bottom: calc(var(--robo-space)*0.7);
    text-transform: uppercase;
    white-space: nowrap;
  }

  nav > div {
    margin-bottom: calc(var(--robo-space)*0.7);
  } */

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

  .selectrws, .robo-line-clipoverflow { max-width: 250px; }
  
  details {
    --robo-details-tooltip-minwidth: 300px;
  }
</style>