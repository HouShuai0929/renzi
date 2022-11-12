// 放置全局自定义指令
import Vue from 'vue'
import store from '@/store'

Vue.directive('access', {
  // 组件初始化时，会执行一次
  bind(el, binding) {},
  // 每次跟自定义指令绑定的数据发生变化时，会执行
  update(el, binding) {},
  // 绑定了该自定义指令的 DOM 元素，被挂载到它的父亲元素上之后，会执行一次。
  inserted(el, binding) {
    // 这里面能够拿到绑定了该自定义指令的 DOM 元素的亲节点的 DOM
    console.log('el', el)
    console.log('binding', binding)
    // 拿到用户的按钮权限数据
    const points = store.state.user.userInfo.roles.points
    // 如果该用户没用对应的按钮权限，就隐藏该按钮
    if (!points.includes(binding.value)) {
      // el.style.display = 'none'
      el.parentNode.removeChild(el)
    }
    // if (points.includes(binding.value)) {
    //   // 用户拥有该按钮权限，按钮显示
    // } else {
    //   // 用户没有有该按钮权限，按钮隐藏
    //   el.style.display = 'none'
    // }
  }
})
