import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
// 将 SvgIcon 注册为全局组建
Vue.component('svg-icon', SvgIcon)

// webpack 中批量导入模块的方式：
// require.context(directory, useSubdirectories, regExp)
// directory：需要批量导入文件的目录
// useSubdirectories：为是否读取子文件的内容，true 表示读取子文件中的文件
// regExp：匹配引入文件的正则表达式
const req = require.context('./svg', false, /\.svg$/)
// console.log(req);
// 1. req 用于读取文件模块的函数
// ƒ webpackContext(req) {
// 	var id = webpackContextResolve(req);
// 	return __webpack_require__(id);
// }
// 2. req.keys() 返回的是所有读取到的文件路径
// ['./404.svg', './bug.svg', './chart.svg', './clipboard.svg', './component.svg', './dashboard.svg', './documentation.svg', './drag.svg', './edit.svg', './education.svg', './email.svg', './example.svg', './excel.svg', './exit-fullscreen.svg', './eye-open.svg', './eye.svg', './form.svg', './fullscreen.svg', './guide.svg', './icon.svg', './international.svg', './language.svg', './link.svg', './list.svg', './lock.svg', './message.svg', './money.svg', './nested.svg', './password.svg', './pdf.svg', './people.svg', './peoples.svg', './qq.svg', './search.svg', './setting.svg', './shopping.svg', './size.svg', './skill.svg', './star.svg', './tab.svg', './table.svg', './theme.svg', './tree-table.svg', './tree.svg', './user.svg', './wechat.svg', './zip.svg']
// 3. req.keys().map(req) 读取所有文件模块
// [Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module]

const requireAll = requireContext => {
  // console.log(requireContext.keys());
  // console.log(requireContext.keys().map(requireContext));
  requireContext.keys().map(requireContext)
}

// 最终将所有的 svg 图标全部导入
requireAll(req)
