import Cookies from 'js-cookie'

const state = {
  // 侧边栏信息
  sidebar: {
    // 展开状态
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // 过度动画
    withoutAnimation: false
  },
  // 设备类型
  device: 'desktop'
}

const mutations = {
  // 切换侧边栏的展开和收起
  TOGGLE_SIDEBAR: state => {
    // 将侧边栏的展开状态取反
    state.sidebar.opened = !state.sidebar.opened
    // 启用侧边栏的过度动画
    state.sidebar.withoutAnimation = false
    // 判断侧边栏的展开状态
    if (state.sidebar.opened) {
      // 展开时，将本地存储的 sidebarStatus 设置为 1
      Cookies.set('sidebarStatus', 1)
    } else {
      // 收起时，将本地存储的 sidebarStatus 设置为 0
      Cookies.set('sidebarStatus', 0)
    }
  },
  // 隐藏侧边栏
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    // 将本地存储的 sidebarStatus 设置为 0
    Cookies.set('sidebarStatus', 0)
    // 侧边栏展开状态设置为 false
    state.sidebar.opened = false
    // 是否开启过度动画
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 切换设备类型
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  // 切换侧边栏展开和收起
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  // 隐藏侧边栏
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 切换设备类型
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
