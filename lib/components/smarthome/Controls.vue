<template>
    <robo-grid type="flex" gap="x2" galign="stretch" valign="center">
      <robo-grid type="flex" gap="x2">
        <robo-section>
          <robo-details class="devices-dashboard-details" summarystyle="link">
            <template #summary>
              <!-- <robo-text size="small" class="dotted">Settings</robo-text> -->
              <robo-text size="small" class="dotted" weight="bold">
                <robo-grid type="flex" gap="x025">

                  <robo-icon 
                    :icon="store.state.robonomicsUIvue.polkadot.connection.network" 
                    :class="!connected ? 'waiting' : null"
                  />
                  
                  <div v-if="connected && store.state.robonomicsUIvue.polkadot.connection.type" class="networkname narrowhidden">
                    {{store.state.robonomicsUIvue.polkadot.connection.type}}
                    <robo-text v-if="store.state.robonomicsUIvue.polkadot.connection.status" inline>({{store.state.robonomicsUIvue.polkadot.connection.status}})</robo-text>
                  </div>
                  <div v-else class="waiting narrowhidden">Connecting</div>

                  <robo-icon v-if="connected" icon="check" color="var(--robo-color-green)" size="small" />
                </robo-grid>
              </robo-text>
            </template>

            <robo-grid :columns="1" gap="x025" offset="x025">
              <robo-select 
                v-model="connectionnetwork" 
                :options="['Polkadot', 'Kusama']" 
                :values="['polkadot', 'kusama']" 
                size="small" 
                label="Network"
                block
              />

              <robo-select 
                v-model="connectiontype"
                :options="['Libp2p', 'Parachain']" 
                :values="['libp2p', 'parachain']" 
                size="small" 
                label="Connection type"
                block
              />

              <robo-button size="small" block @click.prevent="reconnect">Reconnect</robo-button>
            </robo-grid>
          </robo-details>
        </robo-section>

        <robo-section>
          <robo-details class="devices-dashboard-details" summarystyle="link" popupMinWidth="350px">
            <template #summary>
              <robo-text size="small" class="dotted" weight="bold">
                <robo-grid type="flex" gap="x025" valign="center">
                  <robo-icon icon="user"/>
                  <div class="narrowhidden">Subscription checks</div>
                  <robo-icon 
                    :icon="checksubscription ? 'check' : 'ban'" 
                    :color="checksubscription ? 'var(--robo-color-green)' : 'var(--robo-color-red)'" 
                    size="small" 
                  />

                </robo-grid>
              </robo-text>
            </template>

            <robo-grid :columns="1" gap="x025">
              <robo-text size="small">
                Subscription:
                <robo-text v-if="!expiration" highlight="error" inline>not found</robo-text>
                <robo-text v-if="expiration && dateGetRange(expiration) > -1" highlight="warning" inline>expired</robo-text>
                <robo-text v-if="expiration && dateGetRange(expiration) < 0" highlight="ok" inline>active</robo-text>
              </robo-text>
            
              <robo-grid v-if="controller" type="flex" gap="x025" valign="center">
                <robo-text size="small">Controller: {{shortenAddress(controller)}}</robo-text>

                <robo-icon 
                  :icon="checkuser(controller) ? 'check' : 'ban'" 
                  :color="checkuser(controller) ? 'var(--robo-color-green)' : 'var(--robo-color-red)'" 
                  size="small" 
                />

                <robo-button 
                  :router="store.state.robonomicsUIvue.rws.links.setup"
                  title="Go to setups"
                  clean 
                  size="small"
                >
                  <robo-icon icon="settings" />
                </robo-button>

              </robo-grid>

              <robo-grid v-if="useraccount && userkey" type="flex" gap="x025" valign="center">
                <robo-text size="small">User: {{shortenAddress(useraccount)}}</robo-text>
                
                <robo-icon
                 :icon="checkuser(useraccount) ? 'check' : 'ban'" 
                 :color="checkuser(useraccount) ? 'var(--robo-color-green)' : 'var(--robo-color-red)'" 
                 size="small" 
                />

                <robo-button 
                  @click.prevent="logout"
                  title="Change user"
                  clean 
                  size="small"
                >
                  <robo-icon icon="arrow-up-right-from-square" />
                </robo-button>
              </robo-grid>
            </robo-grid>
          </robo-details>

        </robo-section>

        <robo-section>
          <robo-details v-if="telemetryupd" class="devices-dashboard-details" summarystyle="link" popupMinWidth="350px">
            <template #summary>
              <robo-text size="small" class="dotted" weight="bold">
                <robo-grid type="flex" gap="x025" valign="center">

                  <robo-icon 
                    icon="exchange"
                    :class="((!updateTime || !config || !datalog) && !updateTimeTimeout) ? 'waiting' : null"
                  />

                  <div class="narrowhidden">
                    <template v-if="updateTime && config && datalog">Updated {{ timeAgo }}</template>
                    <template v-if="updateTime && (!config || !datalog) && updateTimeTimeout">Not updated</template>
                    <span v-if="(!updateTime || !config || !datalog) && !updateTimeTimeout" class="waiting">Trying to get data</span>
                  </div>

                  <!-- <robo-loader v-if="updState !== 'ok' && updState !== 'error'" /> -->
                  <robo-icon v-if="updState === 'ok'" icon="check" color="var(--robo-color-green)" size="small" />
                  <robo-icon v-if="updState === 'error'" icon="warning" color="var(--robo-color-orange)" size="small" />
                </robo-grid>
              </robo-text>
            </template>

            <robo-grid :columns="1" gap="x025">
              <robo-text size="small">Updated: <robo-text inline>{{telemetryupd}}</robo-text></robo-text>
              <robo-text v-if="config" size="small">Config is ready <robo-button @click.prevent="downloadJson(config, formatFileName('Config ' + rwslist[active].name))" clean><robo-icon icon="download" size="small" /></robo-button></robo-text>
              <robo-text v-if="!config" highlight="warning">Config is missing</robo-text>
              <robo-text v-if="datalog" size="small">Datalog is ready <robo-button @click.prevent="downloadJson(datalog, formatFileName('Datalog ' + rwslist[active].name))" clean><robo-icon icon="download" size="small" /></robo-button></robo-text>
              <robo-text v-if="!datalog" highlight="warning">Datalog is missing</robo-text>

              <!-- обсудить с Сашей работу с ipfs gateway -->
              <!-- <form v-if="!telemetryupd">
                <robo-button size="small">Reconnect</robo-button>
              </form> -->
            </robo-grid>

          </robo-details>
        </robo-section>
      </robo-grid>

      <robo-section v-if="datalog">
        <robo-select
          v-model="sortVariant"
          :options="['Category', 'Area']"
          :values="['category', 'area']"
          size="small"
          label="Sort by"
        />
      </robo-section>

    </robo-grid>
</template>

<script>
  export default { name: 'RoboSmarthomeControls' }
</script>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import {downloadJson, shortenAddress, dateGetRange, dateGetString, formatFileName} from '../../tools'

const props = defineProps({
    config: {
      type: [Object, String]
    },
    datalog: {
      type: [Object, String]
    },
    updateTime: {
      type: Number,
      default: null
    },
})

const rwslist = computed( () => {
    return store.state.robonomicsUIvue.rws.list;
});

const activerwsowner = computed( ()=> {
      return store.state.robonomicsUIvue.rws.active;
  });

const active = computed( () => {
    return rwslist.value.map(item => item.owner).indexOf(activerwsowner.value);
});

const useraccount = computed( () => {
  return store.state.robonomicsUIvue.rws.user.account;
});

const userkey = computed( () => {
  return store.state.robonomicsUIvue.rws.user.key;
});

const controller = computed( () => {
  return rwslist.value[active.value].controller;
});

const expiration = computed( () => {
  return store.state.robonomicsUIvue.rws.expiredate;
});

const activeusers = computed( () => {
    return rwslist.value[active.value]?.users;
});

const updState = computed( () => {
  if(props.updateTime && props.config && props.datalog) {
    return 'ok';
  }

  setTimeout(() => {
    if(!props.config || !props.datalog) {
      return 'error';
    }
  }, 10000);
});

/* + Connection */
const connectionnetwork = ref(null);
const connectiontype = ref(null);
const connectionstatus = ref(null);

const connected = computed( () => {
  return store.state.robonomicsUIvue.polkadot.connection.connected;
});

const reconnect = () => {
  store.commit("polkadot/setConnectionNetwork", connectionnetwork.value);
  store.commit("polkadot/setConnectionType", connectiontype.value);
  store.commit("polkadot/setConnectionConnected", false);
  store.commit("polkadot/setConnectionStatus", null);
  window.location.reload(); /* for updating network in app */
}

watch( () => store.state.robonomicsUIvue.polkadot.connection.type, v => {
  connectiontype.value = v;
}, {immediate: true});

watch( () => store.state.robonomicsUIvue.polkadot.connection.status, v => {
  connectionstatus.value = v;
}, {immediate: true});

watch( () => store.state.robonomicsUIvue.polkadot.connection.network, v => {
  connectionnetwork.value = v;
}, {immediate: true});
/* - Connection */


/* + Checks */
const checkuser = user => {
  return activeusers?.value.find(u => u.address === user);
}

const logout = () => {
  store.commit('rws/removeUser');
}

const checksubscription = computed(() => {
  return dateGetRange(expiration.value) < 0 && checkuser(controller.value) && checkuser(useraccount.value);
})
/* - Checks */

/* + UPDATE TIME */
const updateTimeTimeout = ref(false);

const setUpdateTimeTimeout = () => {
  updateTimeTimeout.value = false;
  setTimeout( () => {
    updateTimeTimeout.value = true;
  }, 5 * 60 * 1000); // 5 min
}

const telemetryupd = computed( () => {
  if(!props.updateTime) {
    return null;
  }

  let d = new Date(props.updateTime);
  return d.toLocaleString('en-US', { hour12: false });
});

const timer = ref(Date.now());
setInterval(() => {
  timer.value = Date.now();
}, 60000);

const timeAgo = computed(() => {
  if (!props.updateTime) return '';
  const diff = timer.value - props.updateTime;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? '1 day ago' : `${days} days ago`;
});

watch(() => props.datalog, v => {
  if(!v) {
    setUpdateTimeTimeout();
  }
}, {immediate: true});

/* - UPDATE TIME */

/* + PICK OF TYPE SORTING DEVICES */
const sortVariant = ref(store.state.robonomicsUIvue.rws.devices.view);
watch(() => sortVariant.value, newv => {
  store.state.robonomicsUIvue.rws.devices.view = newv;
});
/* - PICK OF TYPE SORTING DEVICES */

</script>

<style>
  .devices-dashboard-details {
    --robo-details-content-padding: 10px !important;
  }
</style>

<style scoped>
  .robo-section {
    width: fit-content !important;
    margin: 0 !important;
  }

  .dotted {
    border-bottom: 1px dotted var(--robo-color-link);
    padding-bottom: 2px;
  }

  /* .network-default-icon {
    display: block;
    height: 1.2rem;
  }

  .network-default-icon path { fill: inherit; } */

  .waiting {
    animation: Blink 1.2s linear infinite;
  }

  @media screen and (width < 740px) {
    /* .robo-grid-type--flex {
      flex-direction: column;
    } */
     .narrowhidden {
        display: none;
     }
  }
</style>
