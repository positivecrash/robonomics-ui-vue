const path = require("path")
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import resolve from '@rollup/plugin-node-resolve'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: 'RobonomicsUiVue',
      format: 'cjs',
      fileName: () => '[name].js',
    },
    rollupOptions: {
      // external: ['vue', '@polkadot/util-crypto'],
      external: ['vue'],
      // preserveModules: true,
     
      output: {
        globals: {
          vue: 'Vue',
        },
        format: 'cjs',
        dir: './dist',
        // chunkFileNames: '[name].js',
        inlineDynamicImports: true
      },
      // manualChunks: id => path.parse(id).name,
      plugins: [
        resolve()
    ],
    }
  },

  plugins: [vue()],
  
})
