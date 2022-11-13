<template>
  <!-- 放置一个图标 -->
  <div class="screenWrapper">
    <svg-icon
      :icon-class="isFull ? 'exit-fullscreen' : 'fullscreen'"
      class="fullscreen"
      @click="toggleScreen"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'ScreenFull',
  data() {
    return {
      // 表示当前浏览器的全屏状态
      // isFull 为 true 表示当前是全屏状态
      // isFull 为 false 表示当前不是全屏状态
      isFull: false
    }
  },
  created() {
    screenfull.on('change', () => {
      this.isFull = screenfull.isFullscreen
    })
  },
  // mounted() {
  //   document.addEventListener('fullscreenchange', () => {
  //     this.isFull = !!document.fullscreenElement
  //   })
  // },

  methods: {
    toggleScreen() {
      if (this.isFull) {
        screenfull.exit()
        // 表示当前是全屏状态
        // 退出全屏
        // document.exitFullscreen()
      } else {
        screenfull.request()
        // 表示当前不是全屏状态
        // 开启全屏
        // document.documentElement.requestFullscreen()
      }
      this.isFull = !this.isFull
    }
  }
}
</script>

<style lang="scss" scoped>
.screenWrapper {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.fullscreen {
  width: 20px;
  height: 20px;
  color: #fff;
  cursor: pointer;
}
</style>
