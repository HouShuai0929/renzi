import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import menu from './modules/menu'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 注册模块
  modules: {
    app,
    settings,
    menu,
    user
  },
  state: {

  },
  mutations: {

  },
  getters
})

export default store
