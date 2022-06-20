// 静态路由表 作为菜单的初始化数据
import { constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    // 先以静态路由表作为菜单数据的初始值
    menuList: [...constantRoutes]
  }),
  mutations: {
    // 修改路由表的 mutation 方法
    setMenuList(state, filterRoutes) {
      // filterAsyncRoutes 过滤之后的动态路由表
      // 将动态路由和静态路由组合起来
      state.menuList = [...constantRoutes, ...filterRoutes]
    }
  }
}
