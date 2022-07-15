<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      // 如果是外链，就使用 a 标签
      if (this.isExternal) {
        return 'a'
      }
      // 如果不是外链就使用 router-link
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      // 给 a 标签添加相应的属性
      if (this.isExternal) {
        return {
          href: to, // a 标签跳转的地址
          target: '_blank', // 打开新窗口
          rel: 'noopener' // 安全性配置，window.opener 为 null
        }
      }
      // 给 router-link 添加 to 属性
      return {
        to: to
      }
    }
  }
}
</script>
