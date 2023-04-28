<template>

    <robo-details class="robo-rws-backup" type="popup">
            <template #summary>
                <robo-button block outline>
                    <template v-if="recover && save">Recover / Save</template>
                    <template v-if="recover && !save">Recover</template>
                    <template v-if="!recover && save">Save</template>
                </robo-button>
            </template>

            <template v-if="save && store.state.robonomicsUIvue.rws.list.length > 0">
                <robo-section width="inline" offset="x1">
                    <robo-button 
                        @click="exportSettings()"
                        block
                        size="small"
                    >
                        <robo-icon icon="file-arrow-down" />
                        <span v-if="!recover">Upload file</span>
                        <span v-else>Save setups</span>
                    </robo-button>
                </robo-section>
            </template>

            <template v-if="recover">
                <robo-section inline offset="x05">
                <form enctype="multipart/form-data">
                    <label for="uploadsettings" :class="classesLabel">
                        <template v-if="importProcessing">
                            <robo-loader />
                            Uploading
                        </template>

                        <template v-else>
                            <template v-if="importResult === null">
                                <robo-icon icon="file-arrow-up" />
                                <span v-if="!save">Upload file</span>
                                <span v-else>Recover setups</span>
                            </template>

                            <template v-else>
                                <template v-if="importResult">
                                    <robo-icon icon="check" />
                                    Recover uploaded
                                </template>

                                <template v-if="!importResult">
                                    <robo-icon icon="xmark" />
                                    Not uploaded
                                </template>
                            </template>   
                        </template>

                    </label>

                    <input @change="importSelected($event)" type="file"  accept=".json" name="uploadsettings" id="uploadsettings" />
                </form>
                </robo-section>
                <robo-text weight="normal-italic" size="tiny">Upload saved previously JSON file. By default it's name <robo-text nowrap weight="bold">dapp.robonomics.network-rws.json</robo-text></robo-text>
                <robo-text v-if="store.state.robonomicsUIvue.rws.list.length > 0" weight="normal-italic" size="tiny" highlight="attention">Recovering will rewrite all your current settings.</robo-text>
            </template>

    </robo-details>

</template>

<script>
  export default { name: 'RoboTemplateRwsSetupBackup' }
</script>

<script setup>
import { defineProps, computed, ref } from 'vue'

import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  recover: {
    type: Boolean,
    default: true
  },
  recoverRedirect: {
    type: Boolean,
    default: false
  },
  save: {
    type: Boolean,
    default: false
  }
})

const classesLabel = computed( () => {
    return {
      [`robo-label-buttonlike`]: true,
      [`robo-label-buttonlike--disabled`]: importProcessing.value || importResult.value !== null,
      [`robo-label-buttonlike--ok`]: importResult.value,
      [`robo-label-buttonlike--error`]: importResult.value === false,
    }
})

/* + Import */
import { useRouter } from 'vue-router'
const router = useRouter()
let importProcessing = ref(false)
let importResult = ref(null)

let importSelected = e => {
    let files = e.target.files
    let file = files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function() {
        importProcessing.value = true
        importResult.value = store.dispatch('rws/import', reader.result)
        
        setTimeout( () => {
            importProcessing.value = false
        }, 1000)

        setTimeout( () => {
            importResult.value = null
            // if(props.recoverRedirect) {
            //     router.push({ path: store.state.robonomicsUIvue.rws.links.list })
            // }
        }, 3000)

    }
}
/* - Import */


let exportSettings = () => {
    let text = localStorage.getItem('robonomicsUIrwslist');
	let filename = 'dapp.robonomics.network-rws.json';
	let element = document.createElement('a');
	element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();
	document.body.removeChild(element);
}

</script>

<style scoped>

    .robo-label-buttonlike {
        align-content: center;
        appearance: none;
        border-style: solid;
        border-width: 1.5px;
        cursor: pointer;
        display: inline-flex;
        font-family: var(--font-family);
        font-size: var(--robo-button-fontsize);
        font-weight: 500;
        gap: var(--robo-space);
        justify-content: center;
        line-height: 1.2;
        padding: calc(var(--robo-button-padding) * 0.4);
        position: relative;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;

        background-color: var(--robo-button-background);
        color: var(--robo-button-color);
        border-color: var(--robo-button-background);

        display: block;
        width: 100%;
    }

    .robo-label-buttonlike span:not(:first-child) {
        margin-left: var(--robo-space)
    }

    input[type="file"] {
        height: 0;
        overflow: hidden;
        position: absolute;
        width: 0;
    }

    .robo-label-buttonlike--disabled {
        cursor: default;
        pointer-events: none;
    }
    
    .robo-label-buttonlike--ok {
        background-color: var(--robo-button-ok-background);
        border-color: var(--robo-button-ok-background);
        color: var(--robo-button-ok-color);
    }

    .robo-label-buttonlike--error {
        background-color: var(--robo-button-error-background);
        border-color: var(--robo-button-error-background);
        color: var(--robo-button-error-color);
    }
</style>