<template>
    <form enctype="multipart/form-data" @submit.prevent :class="formclasses" :disabled="disabled">
        <robo-text v-if="drop && slots.label" class="drop-label" size="small" weight="bold"><slot name="label" /></robo-text>

        <div>
            <robo-text v-if="drop" size="small" weight="normal-italic">
                <div>Drop .json here or</div>
            </robo-text>

            <robo-button size="small" :outline="!drop" :disabled="disabled">  
                <robo-loader v-if="load" />
                <robo-icon v-else icon="save" />
                <robo-text v-if="slots.label && !drop"><slot name="label" /></robo-text>
                <robo-text v-if="drop">Select a file</robo-text>
                <input @change="upload($event)" type="file" v-bind="$attrs" :accept="accept" />
            </robo-button>
        </div>
    </form>
</template>

<script>
  export default { name: 'RoboFileUpload' }
</script>

<script setup>
import { ref, useSlots, computed, onMounted } from 'vue'

const slots = useSlots()

const props = defineProps({
    accept: {
        type: String,
        default: '.json'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    drop: {
        type: Boolean,
        default: false
    },
    onloadfunc: {
        type: Function
    }
})

const formclasses = computed( () => {
    return {
      [`robo-fileupload`]: true,
      [`robo-fileupload-drop`]: props.drop
    }
})

const load = ref(false)

const upload = e => {
    const files = e.target.files
    const file = files[0]
    const reader = new FileReader()

    try{
        reader.readAsText(file)
        load.value = true

        reader.onload = function() {
            props.onloadfunc(reader.result)
            setTimeout( () => {
                load.value = false
            }, 500)
        }
    } catch(e) {
        console.log(e)
    }
    
}

const droppable = () => {
    const div = document.createElement('div')
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window
}

const listen = (events, element, handle) => {
    events.split(' ').forEach(
        e => element.addEventListener(e, handle)
    )
}

onMounted( () => {
    if(props.drop && droppable()) {
        const form = document.querySelector('.robo-fileupload-drop')

        listen('drag dragstart dragend dragover dragenter dragleave drop', form, e => {
            e.preventDefault()
        })

        form.addEventListener('drop', e => {
            
            try{
                if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                    const item = e.dataTransfer.items[0]
                    if(item.kind === 'file' && item.type === 'application/json') {
                        const file = item.getAsFile()
                        const reader = new FileReader()
                        reader.readAsText(file)
                        reader.onload = function() {
                            props.onloadfunc(reader.result)
                        }
                    }  
                }
            } catch(e) {
                console.log(e)
            }
        })

        listen('dragover dragenter', form, () => {
            form.classList.add('is-dragover')
        })

        listen('dragleave dragend drop', form, () => {
            form.classList.remove('is-dragover')
        })
    }
})
</script>

<style>
    .robo-fileupload .robo-button {
        position: relative;
        z-index: 1;
    }
</style>

<style scoped>
    input[type="file"] {
        cursor: pointer;
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }

    .robo-fileupload-drop {
        position: relative;
        width: 100%;
        height: 200px;
        border: 2px dashed var(--robo-color-dark);
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        background-color: var(--robo-color-light);
    }

    .robo-fileupload-drop.is-dragover {
        border-color: var(--robo-color-blue)
    }

    .robo-fileupload-drop[disabled=true] {
        opacity: .5;
    }

    /* @media (prefers-color-scheme: dark){
        .robo-fileupload-drop {
            border-color: var(--robo-color-light);
            color: var(--robo-color-dark);
        }
    } */

    .drop-label {
        position: absolute;
        top: var(--robo-space);
        left: var(--robo-space);
    }
</style>
