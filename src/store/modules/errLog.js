export default {
  state: {
    logs: []
  },
  actions: {
    'errLog.addErrorLog' ({ state, commit }, log) {
      state.logs.push(log)
    }
  }
}
