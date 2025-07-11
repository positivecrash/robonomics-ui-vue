import './styles/index.css'
import store from './store'
// import router from './router'
import components from'./components.js'
import keyring from '@polkadot/ui-keyring'

function polkadotKeyringLoadAll (config) {
  if (typeof keyring.isReady === 'function') {
    // keyring ≥ 3.6
    if (!keyring.isReady()) keyring.loadAll(config);
  } else {
    try {
        // keyring 2.x
        keyring.loadAll(config);
    } catch (e) {
        if (!/Unable to initialise options/.test(e.message)) throw e;
    }
  }
}

const robonomicsUI = {
    install (Vue, options) {

        if (!options.store) {
            throw new Error('Please initialise plugin with a Vuex store.')
        }

        // if (!options.router) {
        //     throw new Error('Please pass to plugin router.')
        // }

        // if (!options.key) {
        //     throw new Error('Please initialise plugin with secret key.')
        // }

        options.store.registerModule('robonomicsUIvue', store)
        
        // Vue.provide('KEY', options.key)


        for (const prop in components) {
            if (components.hasOwnProperty(prop)) {
                const component = components[prop]
                Vue.component(component.name, component)
            }
        }

        polkadotKeyringLoadAll({ ss58Format: 32, type: 'ed25519' });

    }
}
export { robonomicsUI }