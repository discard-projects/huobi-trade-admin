import LoadingBar from './LoadingBar.vue'

LoadingBar.install = function (Vue, options) {
  LoadingBar.new = (options = {}) => {
    if (!options['onEl']) {
      options['onEl'] = document.body
    }
    const instance = new Vue({
      data: options,
      render (h) {
        return h(LoadingBar, {
          props: options
        })
      }
    })
    const component = instance.$mount()
    options['onEl'].appendChild(component.$el)
    const loadingBar = instance.$children[0]

    return loadingBar
  }
  return LoadingBar
}
export default LoadingBar
