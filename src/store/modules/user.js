import { getToken, removeToken, setToken } from '@/utils/auth'
import { getUserInfo, getUserDetailInfo } from '@/api/user'
import { resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    userInfo: {}
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
      setToken(newToken)
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    removeUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
      state.userInfo = {}
      resetRouter()
    }
  },
  actions: {
    async getUserInfo(ctx) {
      const res = await getUserInfo()
      const res2 = await getUserDetailInfo(res.data.userId)
      ctx.commit('updateUserInfo', { ...res.data, ...res2.data })
      return res.data.roles
    }
  }
}
