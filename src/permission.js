// 权限控制
import router from '@/router'
import store from '@/store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入所有的动态路由表
import { asyncRoutes } from '@/router/asyncRoutes'

const WHITE_LIST = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      if (!store.state.user.userInfo.username) {
        // store.dispatch('user/getUserInfo')

        const roles = await store.dispatch('user/getUserInfo')
        const filterRoutes = asyncRoutes.filter(item => {
          return roles.menus.includes(item.children[0].name)
        })
        store.commit('menu/setMenuList', filterRoutes)
        // console.log(filterRoutes);
        // router.addRoutes() 方法：可以将路由，动态的添加到路由表中（路由系统）
        router.addRoutes(filterRoutes)
        next({
          ...to,
          replace: true // 不保留本次进入页面的路由记录
        })
        return
      }
      next()
    }
  } else {
    if (WHITE_LIST.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
