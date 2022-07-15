import store from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    // 路由发生变化时
    $route(route) {
      // 如果是：移动端 && 侧边栏展开的状态下，需要隐藏侧边栏
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  // 组件 dom 创建之前，监听页面尺寸变化的事件
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  // 组件销毁之前，移除监听页面尺寸变化的事件
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    // 是否为移动端
    const isMobile = this.$_isMobile()
    // 是移动端
    if (isMobile) {
      // 将 $store.state.app.device 设置为 'mobile'
      store.dispatch('app/toggleDevice', 'mobile')
      // 隐藏侧边栏
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    // 判断是否是移动端
    $_isMobile() {
      // 获取 body 的宽度
      const rect = body.getBoundingClientRect()
      // 只要 body 宽度小于 992，就认为是移动端
      // WIDTH 在上面写死了 992
      return rect.width - 1 < WIDTH
    },
    // 页面尺寸变化时，触发的回调函数
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        // 切换设备类型
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
        // 是移动端，隐藏侧边栏
        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
