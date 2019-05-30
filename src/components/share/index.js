import Vuep from 'vuep'
import 'vuep/dist/vuep.css'
import axios from 'axios'
import VueZujian from 'vue-zujian'
export default {
  install (Vue) {
    Vue.use(Vuep /*, { codemirror options } */)
    Vue.use(VueZujian, {axios, apiHost: process.env.ZJ_HOST})
    Vue.component('Hamburger', (resolve) => {
      resolve(require('./single/Hamburger.vue'))
    })
    Vue.component('PostEditor', (resolve) => {
      resolve(require('./single/PostEditor.vue'))
    })
    Vue.component('SortableTree', (resolve) => {
      resolve(require('./single/SortableTree.vue'))
    })
    Vue.component('UiJson', (resolve) => {
      resolve(require('./single/Json/Json.vue'))
    })
  }
}
