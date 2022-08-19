import './styles/index.css'

const faIcons = [
    faArrowDown,
    faArrowRotateLeft,
    faArrowUpRightFromSquare,
    faBars,
    faBatteryThreeQuarters,
    faBellConcierge,
    faChartPie,
    faCheck,
    faClock,
    faCloud,
    faCloudSun,
    faComment,
    faCopy,
    faCircleCheck,
    faCircleQuestion,
    faCircleInfo,
    faCircleExclamation,
    faCircleXmark,
    faCircleUser,
    faDownLeftAndUpRightToCenter,
    faDroplet,
    faEllipsis,
    faEllipsisVertical,
    faEye,
    faEyeSlash,
    faFloppyDisk,
    faGear,
    faHouse,
    faLightbulb,
    faMicrochip,
    faMinus,
    faPencil,
    faPowerOff,
    faPlus,
    faRightLeft,
    faRss,
    faScrewdriverWrench,
    faSortDown,
    faSignal,
    faTemperatureHalf,
    faUpRightAndDownLeftFromCenter,
    faUser,
    faWallet,
    faXmark,
]

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faArrowDown,
    faArrowRotateLeft,
    faArrowUpRightFromSquare,
    faBars,
    faBatteryThreeQuarters,
    faBellConcierge,
    faChartPie,
    faCheck,
    faClock,
    faCloud,
    faCloudSun,
    faComment,
    faCopy,
    faCircleCheck,
    faCircleQuestion,
    faCircleInfo,
    faCircleExclamation,
    faCircleXmark,
    faCircleUser,
    faDownLeftAndUpRightToCenter,
    faDroplet,
    faEllipsis,
    faEllipsisVertical,
    faEye,
    faEyeSlash,
    faFloppyDisk,
    faGear,
    faHouse,
    faLightbulb,
    faMicrochip,
    faMinus,
    faPencil,
    faPowerOff,
    faPlus,
    faRightLeft,
    faRss,
    faScrewdriverWrench,
    faSortDown,
    faSignal,
    faTemperatureHalf,
    faUpRightAndDownLeftFromCenter,
    faUser,
    faWallet,
    faXmark,
 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faIcons)

import store from './store'
import components from'./components.js'
const robonomicsUI = {
    install (Vue, options) {
        if (!options || !options.store) {
            throw new Error('Please initialise plugin with a Vuex store.')
        }

        options.store.registerModule('robonomicsUIvue', store)

        for (const prop in components) {
            if (components.hasOwnProperty(prop)) {
                const component = components[prop]
                Vue.component(component.name, component)
            }
        }

        Vue.component('font-awesome-icon', FontAwesomeIcon)
    }
}
export { robonomicsUI }