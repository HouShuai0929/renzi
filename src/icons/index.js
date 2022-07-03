import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
// 将 SvgIcon 注册为全局组建
Vue.component('svg-icon', SvgIcon)

// webpack 中批量导入模块的方式：
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
  requireContext.keys().map(requireContext)
}

// 最终将所有的 svg 图标全部导入
requireAll(req)
