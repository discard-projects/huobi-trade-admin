import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import share from './share'
import exElement from './ex-element'
import VueExt from 'vue-ext'
import Scope from './scope'

export default {
  install (Vue) {
    Vue.use(VueExt)
    Vue.use(element, {
      size: 'small' // set element-ui default size: medium, small
      // i18n: (key, value) => i18n.t(key, value)
    })
    Vue.use(share)
    Vue.use(exElement)
    Vue.use(Scope)
  }
}
