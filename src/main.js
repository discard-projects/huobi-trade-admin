// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './utils/api'
import utils from './utils'
import './assets/stylesheets/application.scss'
import common from './components/common'
Vue.use(common)
Vue.use(api)
Vue.use(utils)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.config.errorHandler = function (err, vm, info, a) {
  // Don't ask me why I use Vue.nextTick, it just a hack.
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
  Vue.nextTick(() => {
    store.dispatch('errLog.addErrorLog', { err, vm, info, url: window.location.href })
    console.error(err, info)
  })
}
