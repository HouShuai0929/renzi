<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 遮罩层：如果是移动设备 && 侧边栏打开时显示 -->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 侧边栏组件 -->
    <!-- 侧边栏 sidebar-container 的样式状态 -->
    <!-- 1. 移动端时：显示侧边栏 width: 210px!important，隐藏侧边栏 transform: translate3d(-210px, 0, 0) -->
    <!-- 2. pc端时：展开侧边栏 width: 210px!important，收起侧边栏 width: 54px!important -->
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <!-- 头部组件 -->
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <!-- 主体区域组件 -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    // 侧边栏：{ 是否打开，是否有过度动画 }
    sidebar() {
      return this.$store.state.app.sidebar
    },
    // 设备
    device() {
      return this.$store.state.app.device
    },
    // 是否固定定位 header
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    // 页面整体布局的最外层 div 的 class
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened, // 是否有隐藏侧边栏的类名
        openSidebar: this.sidebar.opened, // 是否由打开侧边栏的类名
        withoutAnimation: this.sidebar.withoutAnimation, // 是否有过度动画的类名
        mobile: this.device === 'mobile' // 是否有是移动端的类名
      }
    }
  },
  methods: {
    // 点击遮罩层
    handleClickOutside() {
      // 隐藏侧边栏
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 2.8s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
