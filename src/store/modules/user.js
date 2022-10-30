import { setToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
      setToken(newToken)
    }
  },
  actions: {

  }
}
