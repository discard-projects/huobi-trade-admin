export default {
  state: {
    visitedViews: []
  },
  actions: {
    'tagsView.addVisitedView' ({ state }, view) {
      if (state.visitedViews.some(v => v.path === view.path)) {
        return
      }
      if (!view.meta.noCache) {
        state.visitedViews.push(Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        }))
      }
    },
    'tagsView.removeVisitedView' ({state}, view) {
      state.visitedViews.splice(state.visitedViews.indexOf(view), 1)
    }
  },
  mutations: {
  }
}
