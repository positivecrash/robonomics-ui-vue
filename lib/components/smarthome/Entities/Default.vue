<template>
  <robo-grid type="flex" gap="x1" offset="x025" galign="stretch">
    <div class="robo-entity-default-part">
      <robo-text size="small" weight="bold">
        {{ entityData?.attributes?.friendly_name || 'Unnamed Entity' }}<span v-if="!hasServices">:</span>
      </robo-text>
      <!-- Тут выводим текущее состояние, если есть сервис (оставляя сбоку место под сервис) -->
      <robo-text v-if="hasServices && entityData.state" size="small">
        State: {{ entityData.state }}
        <template v-if="entityUnits"> {{ entityUnits }} </template>
      </robo-text>
    </div>

    <div class="robo-entity-default-part robo-entity-default-part--value">
        <!-- Выводим текущее состояние здесь сбоку, если нет сервиса -->
      <robo-text v-if="!hasServices" size="small" :nowrap="12">
        {{ entityData.state }}
        <template v-if="entityUnits"> {{ entityUnits }} </template>
      </robo-text>
      <template v-else>
        <robo-toggle
          v-if="getTplService() === 'toggle'"
          v-model="toggleValue"
          :status="status"
          :statusComment="message"
          :disabled="serviceDisabled"
          @change="createApiRequest"
        />
        <robo-select
          v-else-if="getTplService() === 'select' && selectOptions"
          :options="selectOptions"
          :values="selectOptions"
          v-model="selectValue"
          :disabled="serviceDisabled"
          size="small"
          @change="createApiRequest"
        />
        <!-- <robo-button
            v-else-if="getTplService() === 'button'"
            :disabled="serviceDisabled"
            size="small"
        >
        {{services}}
        </robo-button> -->
        <div v-else>
            {{ getTplService() }}
            <robo-text size="tiny">Unsupported service</robo-text>
          <!-- , {{entityID}}, {{services}} -->
        </div>
      </template>
    </div>
  </robo-grid>
</template>

<script setup>
defineOptions({
  name: 'RoboSmarthomeEntityDefault'
});

import { ref, computed, onMounted, watch } from 'vue';
import { serviceAvailable } from '../tools';
import { useStore } from 'vuex';
const store = useStore();

const props = defineProps({
  entityData: { type: Object },
  entityID: { type: String },
  services: { type: Object }
});

const emit = defineEmits(['onClose']);

const status = ref('init');
const message = ref(null);

const toggleValue = ref(null);
const selectValue = ref(null);

const hasServices = computed(() => {
  return props.services && Object.keys(props.services).length > 0;
});

const entityUnits = computed(() => {
  if (
    props.entityData.units &&
    props.entityData.units !== 'None' &&
    props.entityData.state &&
    props.entityData.state !== 'unavailable' &&
    props.entityData.state !== 'unknown'
  ) {
    return props.entityData.units;
  }
  return null;
});

const serviceDisabled = computed(() => {
    return props.entityData?.state === 'unknown' || props.entityData?.state === 'unavailable';
});

// const serviceAvailable = (service) => {
//     if (!props.services) return null;
//     const svcKeys = Object.keys(props.services);
//     return svcKeys.includes(service);
// }

// Функция, возвращающая сервис для шаблона:
// Для сущностей из домена select возвращает "select",
// для устройств с toggle-парами – "toggle",
// иначе – первый доступный сервис.
const getTplService = () => {
    if (!props.entityData || !props.services) return null;

    if (
        props.entityID &&
        props.entityID.startsWith("select.")
    ) {
        return "select";
    }
    if (serviceAvailable(props.services, "turn_on") && serviceAvailable(props.services, "turn_off")) return "toggle";
    if (serviceAvailable(props.services, "lock") && serviceAvailable(props.services, "unlock")) return "toggle";
    if (serviceAvailable(props.services, "enable") && serviceAvailable(props.services, "disable")) return "toggle";
    if (serviceAvailable(props.services, "open_cover") && serviceAvailable(props.services, "close_cover")) return "toggle";
    if (serviceAvailable(props.services, "activate") && serviceAvailable(props.services, "deactivate")) return "toggle";

    return props.entityID ? props.entityID.split('.')[0] : null;
}

const getActionService = () => {
    if (!props.entityData || !props.services) return null;

    let service = getTplService();

    if(service === 'select') {
        return 'select_option';
    }

    if(service === 'toggle') {
        if(toggleValue.value) {
            if (serviceAvailable(props.services, "turn_on")) {
                return "turn_on";
            } else if (serviceAvailable(props.services, "lock")) {
                return "lock";
            } else if (serviceAvailable(props.services, "enable")) {
                return "enable";
            } else if (serviceAvailable(props.services, "open_cover")) {
                return "open_cover";
            } else if (serviceAvailable(props.services, "activate")) {
                return "activate";
            }
        } else {
            if (serviceAvailable(props.services, "turn_off")) {
                return "turn_off";
            } else if (serviceAvailable(props.services, "unlock")) {
                return "unlock";
            } else if (serviceAvailable(props.services, "disable")) {
                return "disable";
            } else if (serviceAvailable(props.services, "close_cover")) {
                return "close_cover";
            } else if (serviceAvailable(props.services, "deactivate")) {
                return "deactivate";
            }
        }
    }

    return service;
}

// Вычисляем опции для select, приводя строку к массиву, если нужно
const selectOptions = computed(() => {

    let options = props.entityData?.attributes?.options;

    if(!options) return null;

    if(Array.isArray(options)) return options;

    if(typeof options === 'string') {
        return options
            .replace(/[\[\]']/g, '')
            .split(',')
            .map(i => i.trim());
    }

    return null;
});
/* - SELECT */

const createApiRequest = () => {
    if (!props.entityData || !props.services) return null;

    let service = getActionService();
    let addParams = null;
    
    if(service === 'select_option') {
        addParams = {"option": selectValue.value};
    }

    const platform = props.entityID.split(".")[0];

    if(platform && service && props.entityID) {
        const request = {
            platform: platform,
            name: service,
            params: { entity_id: props.entityID }
        };

        if(addParams) {
            request.params = { ...request.params, ...addParams };
        }

        sendRequest(request);
    } else {
        console.error("Can't create API request. Not enough data.")
    }
}

const sendRequest = request => {
    status.value = 'waiting';
    message.value = 'Waiting for request complete';

    store.commit('rws/setLaunch', 
        JSON.stringify({
            launch: request,
            tx: {tx_status: "pending"}
        }));
}

const handleRequest = (responce) => {
    const resp = JSON.parse(responce);

    if(resp?.launch?.params?.entity_id === props.entityID) {

        if(serviceAvailable(props.services, resp?.launch?.name)) {
            if(resp?.tx?.tx_status === 'success') {
                status.value = 'ok';
                message.value = 'All done!';
            }

            if(resp?.tx?.tx_status === 'declined') {
                status.value = 'warning';
                message.value = 'Request was declined';
            }

            if(resp?.tx?.tx_status === 'error') {
                status.value = 'error';
                message.value = 'Request was not complete';
            }
        }
    }
    
}

watch(() => store.state.robonomicsUIvue.rws.launch, v => {
    handleRequest(v);
});

watch( () => props.entityData, () => {
    toggleValue.value = ["on", "locked", "enabled", "closed", "activated", "heat"].includes(props.entityData?.state.toLowerCase());
    selectValue.value = props.entityData?.state;
    status.value = 'init';
    message.value = null;
}, {immediate: true});

</script>

<style scoped>
.robo-entity-default-part {
  max-width: 300px;
}

.robo-entity-default-part--value > .robo-text:first-of-type  {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>