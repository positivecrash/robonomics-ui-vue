<template>
  <div class="cards-grid">
    <div
      v-for="sw in gangSwitches"
      :key="sw.entityID"
      class="device-card"
      :class="{ disabled: sw.disabled }"
    >
      
      <div class="card-header">
        <div class="icon-wrapper" v-html="getIcon(sw)"></div>
        <label class="switch">
          <input
            type="checkbox"
            :checked="sw.isOn"
            :disabled="sw.disabled"
            @change="toggleSwitch(sw)"
          />
          <span class="slider"></span>
        </label>
      </div>

      
      <div class="device-name">{{ sw.friendlyName }}</div>
      <div class="device-extra">{{ sw.extraInfo }}</div>

      
      <div v-if="sw.history?.length" class="history-wrapper">
        <button class="history-btn" @click="sw.showHistory = !sw.showHistory">
          {{ sw.showHistory ? 'Hide History' : 'Show History' }}
        </button>

        <robo-history-chart v-if="sw.showHistory"  :history="sw.history" title="History"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch} from 'vue';
import { useStore } from 'vuex';
import { serviceAvailable } from '../tools';

defineOptions({ name: 'RoboSmarthomeEntitySwitcher' });

const store = useStore();

const props = defineProps({
  entityData: { type: Object },
  entityID: { type: String },
  services: { type: Object },
});

const gangSwitches = ref([]);

watch(
  () => props.entityData,
  () => {
    const entities = props.entityData?.entities || [props.entityID];
    gangSwitches.value = entities.map((eID) => {
      const entity = props.entityData[eID] || props.entityData;
      const isCover = eID.startsWith('cover');
      return {
        entityID: eID,
        friendlyName: entity?.attributes?.friendly_name || eID,
        isOn: entity?.state === 'on',
        disabled: ['unavailable', 'unknown'].includes(entity?.state),
        isCover,
        coverPosition: entity?.attributes?.current_position || 0,
        history: entity?.history || [],
        extraInfo: isCover ? `Position: ${entity?.attributes?.current_position || 0}%` : entity?.state === 'on' || entity?.state === 'off' ? '' : entity?.state,
        showHistory: false,
      };
    });
  },
  { immediate: true }
);

const toggleSwitch = (sw) => {
  if (!props.services) return;
  const service = sw.isOn ? 'turn_off' : 'turn_on';
  if (!serviceAvailable(props.services, service)) return;

  sendRequest({ platform: 'switch', name: service, params: { entity_id: sw.entityID } });
  sw.isOn = !sw.isOn;
};

const sendRequest = (req) => {
  store.commit('rws/setLaunch', JSON.stringify({ launch: req, tx: { tx_status: 'pending' } }));
};

const gangSwitchIcon = (sw) => {
  const name = sw.friendlyName || '';
  const match = name.match(/\d+/);
  const isOn = sw.isOn;

  const baseStroke = 'var(--robo-color-dark-70)';
  const activeColor = 'var(--robo-color-blue)';
  const strokeColor = baseStroke;

  if (match) {
    const num = match[0];
    return `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${isOn ? activeColor : strokeColor}" stroke-width="1">
        <rect x="3" y="5" width="18" height="14" rx="2"/>
        <text x="12" y="12" text-anchor="middle" dominant-baseline="middle" fill="${isOn ? activeColor : strokeColor}" font-size="10" font-family="Monospace" font-weight="bold">
          ${num}
        </text>
      </svg>
    `;
  } else {
    return `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="${isOn ? activeColor : strokeColor}" stroke="${isOn ? activeColor : strokeColor}" stroke-width="1">
        <circle cx="12" cy="12" r="8"/>
      </svg>
    `;
  }
}

const getIcon = (sw) => {
  const activeColor = '#ffa600';
  if (sw.entityID.includes('light')) return `<svg width="28" height="28" fill="${sw.isOn ? activeColor : '#aaa'}" viewBox="0 0 24 24"><path d="M9 21h6v-1H9v1zm3-20C8.14 1 5 4.14 5 8c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-3.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>`;
  if (sw.entityID.includes('switch')) {
    return gangSwitchIcon(sw);
  }
  if (sw.isCover) return `<svg width="28" height="28" fill="${sw.isOn ? activeColor : '#aaa'}" viewBox="0 0 24 24"><path d="M3 4h18v2H3V4zm0 4h18v2H3V8zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/></svg>`;
  return `<svg width="28" height="28" fill="${sw.isOn ? 'green' : '#777'}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`;
};
</script>

<style scoped>
.cards-grid {
  display: grid;
  grid-template-columns: auto-fill, minmax(180px, 1fr);
  gap: 16px;
  width: 100%;
}

.device-card {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.device-card.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-wrapper svg {
  width: 28px;
  height: 28px;
}

.device-name {
  font-weight: 600;
  margin-top: 8px;
}

.device-extra {
  font-size: 0.85rem;
  color: #666;
  margin-top: 4px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
}
.switch input { display: none; }

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 22px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 16px; width: 16px;
  left: 3px; bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: var(--robo-color-blue);
}
input:checked + .slider:before {
  transform: translateX(18px);
}

.history-wrapper {
  margin-top: 8px;
}
.history-btn {
  background: none;
  border: none;
  color: var(--robo-color-blue-80);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0;
}
.history-table {
  max-height: 120px;
  overflow-y: auto;
  margin-top: 6px;
}
.history-table table {
  width: 100%;
  font-size: 0.75rem;
  border-collapse: collapse;
}
.history-table th, .history-table td {
  border-bottom: 1px solid #eee;
  padding: 2px 4px;
  text-align: left;
}
</style>
