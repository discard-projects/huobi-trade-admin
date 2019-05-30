// 导入vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入modules
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import errLog from './modules/errLog'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  actions: {
  },
  mutations: {
  },
  modules: {
    app,
    user,
    tagsView,
    errLog
  }
})
