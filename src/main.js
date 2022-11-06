import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'

import store from './store'

import router from './router'

import '@/icons' // icon

import './permission'

Vue.use(ElementUI)

Vue.config.productionTip = false

import componentPlugin from './components/index.js'
Vue.use(componentPlugin)
// vue实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

