import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'vue-slider-component/theme/default.css'

import BootstrapVue from 'bootstrap-vue'
import multiselect from 'vue-multiselect'
import vueslider from 'vue-slider-component'

Vue.use(BootstrapVue)

Vue.component('multiselect', multiselect)
Vue.component('vueslider', vueslider)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
