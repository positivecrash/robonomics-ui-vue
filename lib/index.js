import './styles/index.css'
import store from './store'
import components from'./components.js'

const robonomicsUI = {
    install (Vue, options) {

        if (!options.store) {
            throw new Error('Please initialise plugin with a Vuex store.')
        }

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
    }
}
export { robonomicsUI }