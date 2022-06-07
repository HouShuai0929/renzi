import Vue from 'vue'
import Router from 'vue-router'

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
  },
  // 工资管理页面
  {
    path: '/salarys',
    component: Layout,
    children: [{
      path: '', // 如果children path置空的话 当前这个路由会作为一级渲染的默认路由
      name: 'salarys',
      component: () => import('@/views/Salary'),
      meta: { title: '工资管理', icon: 'skill' }
    }]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// reset 路由方法
export function resetRouter() {
  // 得到一个全新的router实例对象
  const newRouter = createRouter()
  // 使用新的路由记录覆盖掉老的路由记录
  router.matcher = newRouter.matcher // reset router
}

export default router
