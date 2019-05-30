export default {
  install (Vue) {
    Vue.component('AreaCascader', (resolve) => {
      resolve(require('./cascaders/AreaCascader'))
    })
    Vue.component('Footprint', (resolve) => {
      resolve(require('./Footprint'))
    })
  }
}
