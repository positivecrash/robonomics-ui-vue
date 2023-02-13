<template>

    <div>
        <robo-section offset="x1">
            <robo-button 
                v-if="store.state.robonomicsUIvue.rws.list.length > 0" 
                @click="exportSettings()"
                block
                outline
            >
                <robo-icon icon="file-arrow-down" />
                <span>Save setups</span>
            </robo-button>
        </robo-section>

        <robo-section offset="x1">
            <robo-card backColor="opacitylight">
                <robo-text title="5" offset="x0">Recover setups</robo-text>
                <robo-text offset="x025" weight="normal-italic" size="small">likely, dapp.robonomics.network-rws.json</robo-text>
                <form enctype="multipart/form-data">
                    <robo-input @change="handleFileSelect($event)" type=file  accept=".json" name="settings" />
                </form>
            </robo-card>
        </robo-section>
    </div>

</template>

<script>
  export default { name: 'RoboTemplateRwsSetupBackup' }
</script>

<script setup>
import { useStore } from 'vuex'
const store = useStore()


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

let handleFileSelect = e => {
    let files = e.target.files
    let file = files[0]
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function() {
        store.dispatch('rws/import', reader.result)
    }
}

</script>