import Vue from 'vue'
import Router from 'vue-router'
import { asyncRoutes } from './asyncRoutes'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  // 登录页面
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  // 404 页面
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

// reset 路由方法
export function resetRouter() {
  // 得到一个全新的 router 实例对象
  const newRouter = createRouter()
  // 使用新的路由记录覆盖掉老的路由记录
  router.matcher = newRouter.matcher // reset router
}

export default router
