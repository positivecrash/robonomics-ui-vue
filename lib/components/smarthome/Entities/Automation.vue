<template>
  <div class="automation-card">
    <robo-text
      class="device-title"
      title="5"
      :class="'automation-title-state-' + entityData.state"
    >
      {{ entityData?.attributes?.friendly_name || 'Unnamed Automation' }}
    </robo-text>

    <!-- YAML EDITOR SECTION -->
    <template v-if="editing">
      <textarea
        v-model="yamlText"
        class="yaml-editor"
        @input="error = null, status = 'init'"
      ></textarea>
      <div class="editor-actions">
        <robo-button size="small" @click="cancelEdit" :disabled="status !== 'init'">Cancel</robo-button>
        <robo-button
          size="small"
          :disabled="saving || status !== 'init'"
          @click="saveYaml"
        >
          {{ saving ? 'Saving…' : 'Save' }}
        </robo-button>
      </div>
    </template>

    <template v-else>
      <!-- Click on YAML to edit -->
      <pre class="yaml-preview">{{ entityYaml }}</pre>
    </template>

    <div class="error">{{ error }}</div>

    <div v-if="status !== 'init'">
      <robo-status :type="status === 'waiting' ? 'info' : status" solid>
        {{ message }}
      </robo-status>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import yaml from 'js-yaml'
import { useStore } from 'vuex'

defineOptions({
  name: 'RoboSmarthomeEntityAutomation'
})

const props = defineProps({
  entityData: { type: Object, required: true },
  entityID: { type: String, required: true },
  services: { type: Array, default: () => [] }
})

/* Store */
const store = useStore()

/* State */
const editing = ref(false)
const saving = ref(false)
const error = ref(null)
const success = ref(false)
const yamlText = ref('')
const entityYaml = ref('')
const status = ref('init')
const message = ref('')      


watch(
  () => props.entityData,
  (val) => {
    if (val) entityYaml.value = yaml.dump(val)
  },
  { immediate: true }
)


const startEdit = () => {
  editing.value = true
  yamlText.value = entityYaml.value
  error.value = null
  success.value = false
}

const cancelEdit = () => {
  editing.value = false
  error.value = null
  success.value = false
}

const saveYaml = async () => {
  error.value = null
  success.value = false
  saving.value = true
  status.value = 'waiting'
  message.value = 'Sending automation update...'

  try {
    const parsed = yaml.load(yamlText.value)

    if (!parsed || typeof parsed !== 'object') throw new Error('Invalid YAML structure')
  

    sendAutomationUpdate(parsed)

  } catch (e) {
    error.value = 'YAML error: ' + e.message
    status.value = 'error'
    message.value = 'Invalid YAML, could not send update.'
  } finally {
    saving.value = false
  }
}

const sendAutomationUpdate = (configJson) => {
  const updateRequest = {
    platform: 'config',
    name: 'update_automation',
    params: {
      entity_id: props.entityID,
      config: configJson
    }
  }

  store.commit(
    'rws/setLaunch',
    JSON.stringify({
      launch: updateRequest,
      tx: { tx_status: 'pending' }
    })
  )
}


const handleRequest = (response) => {
  let resp
  try { 
    resp = JSON.parse(response) 
  } catch { 
    return 
  }

  if (resp?.launch?.params?.entity_id === props.entityID &&
      resp?.launch?.name === 'update_automation') {

    if (resp?.tx?.tx_status === 'success') {
      status.value = 'ok'
      message.value = 'Automation updated successfully!'
      entityYaml.value = yamlText.value
      editing.value = false
      success.value = true
      setTimeout(() => (success.value = false), 4000)
    }

    if (resp?.tx?.tx_status === 'declined') {
      status.value = 'warning'
      message.value = 'Update request was declined.'
    }

    if (resp?.tx?.tx_status === 'error') {
      status.value = 'error'
      message.value = 'Automation update failed.'
    }
  }
}

watch(
  () => store.state.robonomicsUIvue.rws.launch,
  (v) => {
    if (v) handleRequest(v)
  }
)
</script>

<style scoped>
.automation-card {
  padding: var(--gap);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.device-title[class*='automation-title-state-'] {
  position: relative;
}
.device-title[class*='automation-title-state-']:after {
  content: '';
  position: absolute;
  top: 4px;
  right: 4px;
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 7px;
}
.automation-title-state-on:after {
  background-color: var(--robo-color-green);
}
.automation-title-state-off:after {
  background-color: var(--robo-color-red);
}

.yaml-editor {
  margin-bottom: 0.5rem;
  width: 100%;
  height: 300px;
  font-family: monospace;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
}
.yaml-preview {
  margin-bottom: 0.5rem;
  max-height: 200px;
  overflow: auto;
  background: #f9f9f9;
  font-family: monospace;
  font-size: 12px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.yaml-preview:hover {
  background: #f1f1f1;
}
.editor-actions {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}
</style>
