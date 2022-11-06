// 封装注册全局通用性组件的插件

import PageTools from '@/components/PageTools/index.vue'

// 插件的写法
// 插件是一个对象，对象里面有一个 install 方法。
const componentPlugin = {
  // install 方法接收的第一个参数是 Vue
  install(Vue) {
    Vue.component('PageTools', PageTools)
    // Vue.prototype.$myname = 'abc'
  }
}

export default componentPlugin
