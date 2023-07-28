<template>
    <div class="robo-video">
        <video 
            v-if="props.sources"
            :autoplay="props.autoplay"
            :loop="props.loop" 
            :controls="props.controls"
            preload="none"
        >
            <template v-for="item in props.sources" :key="item.id">
                <source :src="item.src" :type="item.type">
            </template>

            <template v-if="props.supportMessage">{{props.supportMessage}}</template>
        </video>

        <robo-details v-if="props.script" class="robo-video-script">
            <template #summary>
                <robo-icon icon="text-message" size="medium" />
            </template>
            <robo-text size="small" paragraphs v-html="props.script" />
        </robo-details>
    </div>
    
</template>

<script>
  export default { name: 'RoboVideo' }
</script>

<script setup>
    import { defineProps } from 'vue'

    const props = defineProps({
        autoplay: {
            type: Boolean,
            default: false
        },
        controls: {
            type: Boolean,
            default: true
        },
        loop: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: Boolean,
            default: true
        },
        script: {
            type: String,
            default: null
        },
        sources: {
            type: Array,
            default: null
        },
        supportMessage: {
            type: String,
            default: 'Your browser does not support the video tag'
        }
    })
</script>

<style scoped>
    video {
        background-color: var(--robo-color-light-80);
        width: 100%;
    }

    .robo-video {
        position: relative;
        width: 100%;
    }

    .robo-video-script {
        position: absolute;
        top: var(--robo-space);
        right: var(--robo-space);
    }
</style>