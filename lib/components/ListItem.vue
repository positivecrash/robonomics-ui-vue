<template>
    <li :class="classList"><slot/></li>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboListItem',

  computed: {
    classList() {
      return {
        [`robo-list-item`]: true,
      };
    }
  },

})
</script>

<style scoped>
    li {
        margin-bottom: var(--gap-text);
        position: relative;
        padding-left: var(--gap-text);
    }

    li:before {
        content: "";
        min-width: 0.4rem;
        height: 1.4rem;
        border-left: 0.4rem solid var(--color-text);
        /* background-color: var(--color-text); */

        position: absolute;
        top: 0.4rem;
        left: 0;
    }

    ol {
      counter-reset: counter;
    }

    ol li {
      counter-increment: counter;
      padding-left: calc(var(--gap-text)*1.5);
    }

    ol li:before {
      content: counter(counter);
      font-weight: bold;
      padding: 0 .4rem;
      display: flex;
      align-items: center;
    }

    .robo-list-fullline li:before {
      height: 100%;
    }

    .robo-list--theme-line-gorizontal li:first-child{
      border-top: 0.1rem solid var(--color-text);
    }

    .robo-list--theme-line-gorizontal li {
      border-bottom: 0.1rem solid var(--color-text);
      padding: calc(var(--gap-text) * 0.4) 0;
      margin: 0;
    }

    .robo-list--theme-line-gorizontal li:before {
      display: none;
    }
</style>