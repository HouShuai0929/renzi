<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    // 菜单展示的图标
    icon: {
      type: String,
      default: ''
    },
    // 菜单展示的文字
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
    if (icon) {
      // 判断图标类型
      if (icon.includes('el-icon')) {
        // 如果图标包含 el-icon，就渲染 element 图标
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        // 否则渲染 svg 图标
        vnodes.push(<svg-icon icon-class={icon} />)
      }
    }
    // 判断有没有 title
    if (title) {
      // 有的话，就渲染图标
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
