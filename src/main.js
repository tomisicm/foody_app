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

import Toasted from 'vue-toasted'
import BootstrapVue from 'bootstrap-vue'
import multiselect from 'vue-multiselect'
import vueslider from 'vue-slider-component'

// eslint-disable-next-line no-unused-vars
import * as icons from './icons'

import VModal from 'vue-js-modal'

import CommentCard from '@/components/CommentCard'

import { phoneOrEmailRule } from '@/utils/validationRules'

VeeValidate.Validator.extend('phoneOrEmail', phoneOrEmailRule)

Vue.use(BootstrapVue)

Vue.component('multiselect', multiselect)
Vue.component('vueslider', vueslider)
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'errorFields'
})
Vue.component('comment-card', CommentCard)

Vue.use(VModal)

Vue.use(Toasted, {
  duration: 33000,
  theme: 'outline'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
