const path = require("path")
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy' //for copying and transform icons into components
import replace from '@rollup/plugin-replace' // for svg icons to code


/* + SVG ICONS TO CODE */
const { optimize } = require('svgo')

const detachNodeFromParent = (node, parentNode) => {
  parentNode.children = parentNode.children.filter((child) => child !== node)
}

const collectUsefulNodes = (node, usefulNodes) => {
  for (const child of node.children) {
    if (child.type === 'element') {
      if (child.name === 'path') {
        usefulNodes.push(child);
      } else {
        collectUsefulNodes(child, usefulNodes);
      }
    }
  }
}

const svgTrasnform = (svgString) => {

  const result = optimize(svgString, {
    plugins: [
      'cleanupAttrs',
      'removeDoctype',
      'removeXMLProcInst',
      'removeMetadata',
      'removeTitle',
      'removeDesc',
      'removeUselessDefs',
      'removeEmptyAttrs',
      'removeHiddenElems',
      'removeEmptyText',
      'removeEmptyContainers',
      'removeUnknownsAndDefaults',
      'removeRasterImages',
      'collapseGroups',
      'removeDimensions',
      {
        name: "removeAttrs",
        params: {
          attrs: "(fill|stroke)"
        }
      },
      'removeOffCanvasPaths',
      'removeStyleElement',
      'removeScriptElement',
      // 'removeXMLNS',

      {
          name: 'removeAll',
          type: 'full', // full, perItem or perItemReverse
          description: 'This removes all trash in imported svgs (for icons)',
          fn: () => {
            return {
              element: {
                enter: (node, parentNode) => {
                  if (parentNode.type === 'root') {
                    return
                  }

                  // delete all 1-level elements except path and comments
                  if(node.children.length === 0 && node.name !== 'path' && node.type !== 'comment') {
                    detachNodeFromParent(node, parentNode)
                  } else if(node.name !== 'path' && node.type !== 'comment'){
                    const usefulNodes = []
                    collectUsefulNodes(node, usefulNodes)

                    if (usefulNodes.length === 0) {
                      detachNodeFromParent(node, parentNode)
                    }

                    for (const usefulNode of usefulNodes) {
                      Object.defineProperty(usefulNode, 'parentNode', {
                        writable: true,
                        value: node,
                      })
                    }
                    node.children = usefulNodes
                  }
                },
              },
            }
          }
      },
    ]
  })
  return result.data
}

/* - SVG ICONS TO CODE */

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: 'RobonomicsUiVue',
      formats: ['cjs', 'es'],
      fileName: (format) => (format === 'cjs') ? `[name].js` : `[name].${format}.js`,
    },
    rollupOptions: {
      // external: ['vue', 'vue-router', 'vuex', 'crypto-js', 'file-saver'],
      external: ['vue', 'vue-router', 'vuex', 'crypto-js', 'file-saver', '@polkadot/util-crypto', '@polkadot/ui-keyring'],
      output: {
        globals: {
          vue: 'vue',
          'crypto-js': 'crypto-js',
          'vue-router': 'vue-router',
          vuex: 'vuex',
          'file-saver': 'file-saver',
          '@polkadot/ui-keyring':'@polkadot/ui-keyring',
          '@polkadot/util-crypto': '@polkadot/util-crypto'
        },
        dir: './dist',
        inlineDynamicImports: true
      },
      // manualChunks: id => path.parse(id).name,
      plugins: [
          copy({
            targets: [{
              src: 'lib/icons-source/*',
              dest: 'lib/icons',
              transform: (contents, filename) => `<template>${svgTrasnform(contents.toString())}</template>`,
              rename: (name, extension, fullPath) => `${name}.vue`
            }]
          }),
          replace({
            '__VUE_PROD_DEVTOOLS__': 'true'
          })
      ],
    }
  },

  plugins: [
    vue()
  ],
  
})
