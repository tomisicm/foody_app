import Vue from 'vue'
import VeeValidate from 'vee-validate'

import App from './App.vue'
import router from './router/index'
import store from './utils/store'
import './registerServiceWorker'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'vue-slider-component/theme/default.css'

import BootstrapVue from 'bootstrap-vue'
import multiselect from 'vue-multiselect'
import vueslider from 'vue-slider-component'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTrash,
  faEdit,
  faSave,
  faReply,
  faArrowUp,
  faArrowDown,
  faExternalLinkSquareAlt,
  faLock,
  faLockOpen,
  faLongArrowAltLeft
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue)

library.add(
  faTrash,
  faEdit,
  faSave,
  faReply,
  faArrowUp,
  faArrowDown,
  faExternalLinkSquareAlt,
  faLock,
  faLockOpen,
  faLongArrowAltLeft
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('multiselect', multiselect)
Vue.component('vueslider', vueslider)
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
