import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import FlashMessage from '@smartweb/vue-flash-message';
import VTooltip from "v-tooltip";

library.add(faChevronLeft, faChevronRight)

createApp(App)
    .use(router)
    .use(VTooltip)
    .use(FlashMessage)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
