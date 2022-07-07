<template>
    <nav aria-label="breadcrumbs" class="robo-breadcrumb">
        <ol>
            <li v-for="(item, index) in items" :key="index">
                <a :href="item.href" :aria-current="item.active ? 'page' : null">
                    {{ item.text }}
                </a>
            </li>
        </ol>
    </nav>

    <!-- SEO & Accessibility or Breadcrumbs-->
    <component :is="'script'" type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
            {
                <template v-for="(item, index) in items" :key="item.href">
                    "@type": "ListItem",
                    "position": {{index + 1}},
                    "item": {
                        "@id": "{{ item.href }}",
                        "name": "{{ item.text }}"
                    }
                </template>
            }
            ]
        }
    </component>
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoboBreadcrumbs',

  props: {
    items: {
      type: Object,
      required: true
    }
  },

})
</script>

<style scoped>
    /* .robo-breadcrumb {
        padding: 0 calc(var(--space) * 2);
    } */

    .robo-breadcrumb ol {
        list-style: none;
    }

    .robo-breadcrumb li {
        display: inline-block;
        vertical-align: middle;
        padding: 0 var(--gap-layout);
        position: relative;
    }

    .robo-breadcrumb li:after {
        content: "";
        height: 100%;
        width: 1px;
        background: var(--color-text);
        transform: rotate(153deg);
        display: block;

        position: absolute;
        top: 0;
        left: 0;
    }

    .robo-breadcrumb a {
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 300;
        font-size: calc(var(--font-size) * 1.5)
    }

    .robo-breadcrumb a[aria-current] {
        cursor: default;
        pointer-events: none;
        color: var(--color-text)
    }
</style>