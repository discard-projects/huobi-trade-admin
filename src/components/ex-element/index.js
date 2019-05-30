export default {
  install (Vue) {
    Vue.component('ExTable', (resolve) => {
      resolve(require('./Table/ExTable.vue'))
    })
    Vue.component('ExStatusTag', (resolve) => {
      resolve(require('./ExStatusTag.vue'))
    })
    Vue.component('ExUpload', (resolve) => {
      resolve(require('./Form/ExUpload.vue'))
    })
    Vue.component('ExUploadQr', (resolve) => {
      resolve(require('./Form/ExUploadQr.vue'))
    })
    Vue.component('ExRemoteSelect', (resolve) => {
      resolve(require('./Form/ExRemoteSelect.vue'))
    })
    Vue.component('ExOptionsSelect', (resolve) => {
      resolve(require('./Form/ExOptionsSelect.vue'))
    })
    Vue.component('ExModelSelect', (resolve) => {
      resolve(require('./Form/ExModelSelect.vue'))
    })
    // Vue.component('ExDialogJson', (resolve) => {
    //   resolve(require('./Dialog/ExDialogJson.vue'))
    // })
    Vue.component('ExSwitch', (resolve) => {
      resolve(require('./Switch/ExSwitch.vue'))
    })
    Vue.component('ExErrLog', (resolve) => {
      resolve(require('./ExErrLog.vue'))
    })
  }
}
