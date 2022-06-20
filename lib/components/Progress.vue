<template>
    <div :class="classList">
        <span :style="'width: ' + this.progress + '%'"></span>
    </div>
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboProgress',

  props: {
    progress: {
      type: Number,
      default: null
    },
  },

  computed: {
    classList() {
      return {
        [`robo-progress`]: true,
        [`robo-progress-loading`]: !this.progress,
        [`robo-progress-number`]: this.progress,
      };
    }
  }

})
</script>

<style scoped>
    .robo-progress {
        position: relative;
        height: 3px;
        background-color: var(--color-blue-light);
        overflow: hidden;
    }

    .robo-progress span {
        background-color: var(--color-blue);
        height: 100%;

        position: absolute;
        top: 0;
    }

    .robo-progress-loading:not(.robo-progress-number) span {
        left: -20%;
        width: 20%;
        will-change: left, transform;
        animation: cardLoading 2s linear 0.4s infinite;
    }

    .robo-progress-number span {
      left: 0;
      width: 0;
      will-change: width;
      transition: 0.2s ease-out width;
    }

    @keyframes cardLoading {
        0% {
            transform: scaleX(1);
            left: -20%;
        }
        50% {
            transform: scaleX(1.2);
            left: 35%;
        }
        100% {
            transform: scaleX(1);
            left: 100%;
        }
    }
</style>