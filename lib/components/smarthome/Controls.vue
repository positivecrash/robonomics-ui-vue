<template>
  <robo-grid type="flex" gap="x2" galign="stretch" valign="center">
    <robo-grid type="flex" gap="x1">
      <robo-section class="sections-control">
        <robo-details class="devices-dashboard-details" summarystyle="link">
          <template #summary>
            <robo-text size="small" weight="bold">
              <robo-grid type="flex" gap="x025">
                <robo-icon
                  :icon="store.state.robonomicsUIvue.polkadot.connection.network"
                  :class="!connected ? 'waiting' : null"
                />
                <div v-if="connected && store.state.robonomicsUIvue.polkadot.connection.type" class="networkname narrowhidden">
                  {{store.state.robonomicsUIvue.polkadot.connection.type}}
                  <robo-text v-if="store.state.robonomicsUIvue.polkadot.connection.status" inline>
                    ({{store.state.robonomicsUIvue.polkadot.connection.status}})
                  </robo-text>
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
      <robo-section class="sections-control">
        <robo-details 
          class="devices-dashboard-details" 
          summarystyle="link" 
          popup-min-width="350px"
          fitContent>
          <template #summary>
            <robo-text size="small" weight="bold" :class="(!activeGateway && loadingGateways) ? 'waiting' : null">
              <robo-grid type="flex" gap="x025">
                <robo-icon icon="ipfs"/>
                <div class="narrowhidden">IPFS</div>
                <robo-icon 
                  v-if="activeGateway && activeGateway !== ''" 
                  icon="check" 
                  color="var(--robo-color-green)" 
                  size="small" 
                />
              </robo-grid>
            </robo-text>
          </template>
          <robo-grid :columns="1" gap="x05">
            <robo-section width="wide">
              <robo-text v-if="!activeGateway && loadingGateways" size="small" offset="x05" weight="bold">
                <template v-if="loadingGateways">
                  <robo-loader />
                  Checking available gateways
                </template>
                <robo-status v-else type="warning">
                  No available gateways found. Try adding your custom gateway or wait.
                </robo-status>
              </robo-text>

              <robo-grid v-else type="flex" offset="x05" gap="x025">
                <robo-icon icon="star" />
                <robo-text size="tiny">Gateways are ranked by speed. If Datalog or Config file fails to load, pick any other gateway from the list.</robo-text>
              </robo-grid>

              <template v-for="(i, k) in visibleGateways" :key="k">

                <robo-grid type="flex" offset="x025" gap="x025" valign="center">

                  <robo-input-new
                    type="radio"
                    name="ipfsgateway"
                    :value="i"
                    v-model="pickedGatewayRadio"
                    :disabled="!isGatewayAvailable(i) && !isActiveGateway(i)"
                  />

                  <robo-text
                    :highlight="isActiveGateway(i) ? 'ok' : !isGatewayAvailable(i) ? 'disabled' : null"
                    :weight="isActiveGateway(i) ? 'bold' : 'normal'"
                    inline
                  >
                    {{ gatewayLabel(i) }}
                  </robo-text>

                  <robo-icon
                    v-if="isActiveGateway(i)"
                    icon="check"
                    color="var(--robo-color-green)"
                    size="small"
                  />

                  <robo-button
                    v-if="isUserGateway(i)"
                    clean
                    size="small"
                    title="Remove gateway"
                    @click.prevent="removeGateway(i)"
                  >
                    <robo-icon icon="trash" color="var(--robo-color-red)" size="small" />
                  </robo-button>
                </robo-grid>
              </template>

              <robo-grid type="flex" gap="x05" offset="x025" valign="center">
                <robo-input-new
                  type="radio"
                  name="ipfsgateway"
                  :value="customGateway"
                  :highlight="isActiveGateway(customGateway) ? 'ok' : null"
                  v-model="pickedGatewayRadio"
                />
                <robo-input-new
                  v-model="customGateway"
                  type="text"
                  width="fit"
                  view="line"
                  @focus="pickedGatewayRadio = customGateway"
                  @input="pickedGatewayRadio = customGateway"
                  placeholder="Add your gateway"
                />
              </robo-grid>

              <robo-section offset="x05">
                <robo-button 
                  v-if="pickedGatewayRadio !== activeGateway"
                  size="small" 
                  block 
                  @click.prevent="switchGateway(pickedGatewayRadio)"
                >
                  Switch gateway
                </robo-button>
              </robo-section>
            </robo-section>
          </robo-grid>
        </robo-details>
      </robo-section>
      <robo-section class="sections-control">
        <robo-details 
          class="devices-dashboard-details" 
          summarystyle="link" 
          popupMinWidth="350px">
          <template #summary>
            <robo-text size="small" weight="bold">
              <robo-grid type="flex" gap="x025" valign="center">
                <robo-icon icon="user"/>
                <div class="narrowhidden">Subscription</div>
                <robo-icon 
                  :icon="checksubscription ? 'check' : 'ban'" 
                  :color="checksubscription ? 'var(--robo-color-green)' : 'var(--robo-color-orange)'" 
                  size="small" 
                />
              </robo-grid>
            </robo-text>
          </template>
          <robo-grid :columns="1" gap="x025">
            <robo-grid type="flex" gap="x025" valign="center">
              <robo-text size="small">
                Subscription:
                <robo-text v-if="!expiration" highlight="error" inline>not found</robo-text>
                <robo-text v-if="expiration && dateGetRange(expiration) > -1" highlight="warning" inline>expired</robo-text>
                <robo-text v-if="expiration && dateGetRange(expiration) < 0" highlight="ok" inline>active</robo-text>
              </robo-text>
              <robo-button 
                v-if="!expiration || dateGetRange(expiration) > -1"
                :router="store.state.robonomicsUIvue.rws.links.activate"
                title="Renew"
                clean 
                size="small"
              >
                <robo-icon icon="arrow-rotate-left" />
              </robo-button>
            </robo-grid>
            <robo-grid v-if="controller" type="flex" gap="x025" valign="center">
              <robo-text size="small">Controller: {{shortenAddress(controller)}}</robo-text>
              <robo-icon 
                :icon="checkuser(controller) ? 'check' : 'ban'" 
                :color="checkuser(controller) ? 'var(--robo-color-green)' : 'var(--robo-color-orange)'" 
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
            <robo-text v-else size="small" highlight="error">Controller not found</robo-text>
            <robo-grid v-if="useraccount && userkey" type="flex" gap="x025" valign="center">
              <robo-text size="small">User: {{shortenAddress(useraccount)}}</robo-text>
              <robo-icon
                :icon="checkuser(useraccount) ? 'check' : 'ban'" 
                :color="checkuser(useraccount) ? 'var(--robo-color-green)' : 'var(--robo-color-orange)'" 
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
            <robo-text v-else size="small" highlight="error">
              <template v-if="!useraccount">User not found</template>
              <template v-if="!userkey">You need to login first</template>
            </robo-text>
          </robo-grid>
        </robo-details>
      </robo-section>
      <robo-section class="sections-control">
        <robo-details v-if="telemetryupd" class="devices-dashboard-details" summarystyle="link" popupMinWidth="350px">
          <template #summary>
            <robo-text size="small" weight="bold">
              <robo-grid type="flex" gap="x025" valign="center">
                <robo-icon 
                  icon="exchange"
                  :class="((!updateTime || !config || !datalog) && !updateTimeTimeout) ? 'waiting' : null"
                />
                <div class="narrowhidden" :class="(!updateTime || !config || !datalog) ? 'waiting' : null">
                  Datalog
                </div>
                <robo-icon v-if="updState === 'ok'" icon="check" color="var(--robo-color-green)" size="small" />
                <robo-icon v-if="updState === 'error'" icon="warning" color="var(--robo-color-orange)" size="small" />
              </robo-grid>
            </robo-text>
          </template>
          <robo-grid :columns="1" gap="x025">
            <robo-text size="small" weight="bold" offset="x05">
              <template v-if="updateTime && config && datalog">Updated {{ timeAgo }}</template>
              <template v-if="updateTime && (!config || !datalog) && updateTimeTimeout">Not updated</template>
              <template v-if="(!updateTime || !config || !datalog) && !updateTimeTimeout">
                <robo-loader />
                Trying to get data
              </template>
            </robo-text>
            <robo-text v-if="config" size="small">
              Config is ready
              <robo-button @click.prevent="downloadJson(config, formatFileName('Config ' + rwslist[active].name))" clean>
                <robo-icon icon="download" size="small" />
              </robo-button>
            </robo-text>
            <robo-text v-if="!config" highlight="warning">Config is missing</robo-text>
            <robo-text v-if="datalog" size="small">
              Datalog is ready
              <robo-button @click.prevent="downloadJson(datalog, formatFileName('Datalog ' + rwslist[active].name))" clean>
                <robo-icon icon="download" size="small" />
              </robo-button>
            </robo-text>
            <robo-text v-if="!datalog" highlight="warning">Datalog is missing</robo-text>
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
import {downloadJson, shortenAddress, dateGetRange, dateGetString, formatFileName} from '../../tools';
import * as ipfsGateway from 'ipfs-smart-gateway';

const props = defineProps({
  config: {
    type: [Object, String]
  },
  datalog: {
    type: [Object, String]
  },
  cid: {
    type: String
  },
  updateTime: {
    type: Number,
    default: null
  },
})

const rwslist = computed(() => store.state.robonomicsUIvue.rws.list)
const activerwsowner = computed(() => store.state.robonomicsUIvue.rws.active)
const active = computed(() => rwslist.value.map(item => item.owner).indexOf(activerwsowner.value))
const useraccount = computed(() => store.state.robonomicsUIvue.rws.user.account)
const userkey = computed(() => store.state.robonomicsUIvue.rws.user.key)
const controller = computed(() => rwslist.value[active.value].controller.address)
const expiration = computed(() => store.state.robonomicsUIvue.rws.expiredate)
const activeusers = computed(() => rwslist.value[active.value]?.users)

const updState = computed(() => {
  if (props.updateTime && props.config && props.datalog) {
    return 'ok'
  }
  setTimeout(() => {
    if (!props.config || !props.datalog) {
      return 'error'
    }
  }, 10000)
})

/* + Connection */
const connectionnetwork = ref(null)
const connectiontype = ref(null)
const connectionstatus = ref(null)
const connected = computed(() => store.state.robonomicsUIvue.polkadot.connection.connected)

const reconnect = () => {
  store.commit("polkadot/setConnectionNetwork", connectionnetwork.value);
  store.commit("polkadot/setConnectionType", connectiontype.value);
  store.commit("polkadot/setConnectionConnected", false);
  store.commit("polkadot/setConnectionStatus", null);
  window.location.reload();
}

watch(() => store.state.robonomicsUIvue.polkadot.connection.type, v => {
  connectiontype.value = v
}, { immediate: true })
watch(() => store.state.robonomicsUIvue.polkadot.connection.status, v => {
  connectionstatus.value = v
}, { immediate: true })
watch(() => store.state.robonomicsUIvue.polkadot.connection.network, v => {
  connectionnetwork.value = v
}, { immediate: true })
/* - Connection */


/* + IPFS */
const defaultGateways = [
  "https://ipfs.url.today/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://gateway.pinata.cloud/ipfs/"
];

const availableGateways = ref([]);
const activeGateway = ref(null);
const pickedGatewayRadio = ref(activeGateway.value);
const userGateways = ref([]);
const customGateway = ref('');
const userGatewayAdded = ref(null);
const loadingGateways = ref(false);

const configureIpfsGateway = () => {
  ipfsGateway.configure({
    stopOnFirstSuccess: false,
    timeout: 30000
  });
  ipfsGateway.setDefaultGateways(defaultGateways);
}

const allGateways = computed(() => {
  const combined = [...new Set([...defaultGateways, ...userGateways.value])];
  return combined.filter(Boolean).map(safeNormalize);
});

const normalizedAvailableGateways = computed(() => {
  return availableGateways.value.filter(Boolean).map(safeNormalize);
})

const isGatewayAvailable = (url) => {
  return normalizedAvailableGateways.value.includes(safeNormalize(url));
}

const isActiveGateway = (url) => {
  return activeGateway.value
    ? safeNormalize(url) === safeNormalize(activeGateway.value)
    : false;
}

// https://gw.xyz/ipfs/  ->  gw.xyz
const gatewayLabel = (url) => safeNormalize(url).replace(/^https?:\/\//, '');

const safeNormalize = (u) => u ? ipfsGateway.normalizeGatewayUrl(u) : '';

const visibleGateways = computed(() => {
  // 1) проверенные, уже в нужном порядке
  const fast = normalizedAvailableGateways.value;

  // 2) всё остальное, чего нет в fast
  const tail = allGateways.value
    .filter(g => !fast.includes(g));

  return [...fast, ...tail];
});

const loadGateways = () => {
  ipfsGateway.loadPickedGatewayFromCache();
  ipfsGateway.loadUserGatewaysFromCache();

  activeGateway.value = ipfsGateway.getPickedGateway();
  userGateways.value = ipfsGateway.getUserGateways();

  pickedGatewayRadio.value = activeGateway.value;

  store.commit('ipfs/setGateways', availableGateways.value);
  store.commit('ipfs/setActiveGateway', activeGateway.value);
}

const addGateway = async () => {
  userGatewayAdded.value = null;
  if (!customGateway.value) return;
  const ms = await ipfsGateway.measureGateway(customGateway.value, props.cid);
  if (ms !== null) {
    ipfsGateway.setUserGateways([...userGateways.value, customGateway.value]);
    ipfsGateway.setPickedGateway(customGateway.value);
    loadGateways();
    customGateway.value = '';
    userGatewayAdded.value = 'ok';
    setTimeout(() => {
      userGatewayAdded.value = null;
    }, 5000);
  } else {
    userGatewayAdded.value = 'error';
  }
}

const switchGateway = async (url) => {
  if (!url) return;

  /* добавить, если ещё нет */
  if (!userGateways.value.includes(url)) {
    const updated = [...userGateways.value, url];
    ipfsGateway.setUserGateways(updated);
    userGateways.value = updated;
  }

  ipfsGateway.setPickedGateway(url);
  loadGateways();

  customGateway.value = '';
  await refreshGateways(props.cid);
}

/* ── utils ────────────────────────────────────────────────────── */
const setPickedGateway = (url) => {
  ipfsGateway.setPickedGateway(url);
  activeGateway.value = url;
  pickedGatewayRadio.value = url;
  store.commit('ipfs/setActiveGateway', url);
};

/* ── refresh ──────────────────────────────────────────────────── */
const refreshGateways = async (cid) => {

  const hasCid  = typeof cid === 'string' && cid.trim().length;
  if (!hasCid) return;

  /* 1. быстрая проверка выбранного шлюза */
  const currentAlive = activeGateway.value
    ? (await ipfsGateway.measureGateway(activeGateway.value, cid)) !== null
    : false;

  /* 2. если шлюз жив, обновляем список «тихо» — без лоадера */
  if (currentAlive) {
    console.log('[currentAlive]', cid)
    const list = await ipfsGateway.checkGateways({
      cid,
      gateways: allGateways.value,
      retry: 3
    }).then(r => r.map(g => g.url));

    availableGateways.value = list;
    store.commit('ipfs/setGateways', list);

    // setPickedGateway(activeGateway.value);
    return;
  }

  /* 3. если выбранный упал — стандартный сценарий с лоадером */
  loadingGateways.value = true;
  activeGateway.value = null;
  pickedGatewayRadio.value = null;
  store.commit('ipfs/setActiveGateway', null);

  const list = await ipfsGateway.checkGateways({
    cid,
    gateways: allGateways.value,
    retry: 3
  }).then(r => r.map(g => g.url));

  availableGateways.value = list;
  store.commit('ipfs/setGateways', list);
  loadingGateways.value = false;

  loadGateways(); // fastest → state

  /* вернуть пользовательский, если теперь доступен */
  if (activeGateway.value &&
      list.map(safeNormalize).includes(safeNormalize(activeGateway.value))) {
    setPickedGateway(activeGateway.value);
  } else {
    pickedGatewayRadio.value = activeGateway.value; // fastest
  }
};


const isUserGateway = (url) => {
  return userGateways.value
    .map(safeNormalize)
    .includes(safeNormalize(url));
};

const removeGateway = (url) => {
  ipfsGateway.removeUserGateways([url]);
  loadGateways();
  refreshGateways(props.cid);
};

watch(
  () => [customGateway.value, activeGateway.value],
  ([custom, active]) => {
    pickedGatewayRadio.value = custom || active;
  },
  { immediate: true }
);

configureIpfsGateway();
loadGateways();

watch(() => props.cid, async (v) => {
  refreshGateways(v);
}, { immediate: true });

/* - IPFS */


/* + Checks */
const checkuser = user => {
  if (activeusers.value) {
    return activeusers.value.find(u => u.address === user);
  }
  return false;
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
  setTimeout(() => {
    updateTimeTimeout.value = true;
  }, 5 * 60 * 1000);
}

const telemetryupd = computed(() => {
  if (!props.updateTime) {
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
  if (!v) {
    setUpdateTimeTimeout();
  }
}, { immediate: true });
/* - UPDATE TIME */

/* + PICK OF TYPE SORTING DEVICES */
const sortVariant = ref(store.state.robonomicsUIvue.rws.devices.view);
watch(() => sortVariant.value, newv => {
  store.state.robonomicsUIvue.rws.devices.view = newv;
  localStorage.setItem('devicesView', newv);
});
/* - PICK OF TYPE SORTING DEVICES */

</script>

<style>
  .devices-dashboard-details {
    --robo-details-content-padding: 10px !important;
    --robo-details-summary-background: var(--robo-color-light);
    --robo-details-summary-padding: 10px;
    box-shadow: var(--robo-box-shadow);
  }
</style>

<style scoped>
  form { width: 100%; }
  .sections-control {
    width: fit-content !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .waiting { animation: Blink 1.2s linear infinite; }
  @media screen and (width < 740px) {
    .narrowhidden { display: none; }
  }
  .gateways-list { width: 100%; }
</style>
