const path = require("path")
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import resolve from '@rollup/plugin-node-resolve' // not worked
// import svgLoader from 'vite-svg-loader' // shifted to vue templates
import copy from 'rollup-plugin-copy' //for copying and transform icons into components
// import externals from 'rollup-plugin-node-externals' // not worked
// import commonjs from 'rollup-plugin-commonjs' // not worked
import peerDepsExternal from 'rollup-plugin-peer-deps-external' // for excluding external plugins

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

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: 'RobonomicsUiVue',
      formats: ['cjs'],
      // formats: ['cjs', 'umd', 'iife'],
      fileName: () => '[name].js',
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        globals: {
          vue: 'Vue',
        },
        dir: './dist',
        inlineDynamicImports: true,
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
          })
      ],
    }
  },

  plugins: [
    peerDepsExternal(),
    vue()
  ],
  
})
