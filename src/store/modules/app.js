export default {
  state: {
    sidebar: {
      opened: true
    }
  },
  actions: {
    'app.toggleSideBar' ({ state }, opened) {
      state.sidebar.opened = opened
    }
  }
}
