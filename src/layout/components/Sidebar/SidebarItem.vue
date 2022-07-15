<template>
  <!-- 该条路由规则中的 hidden，如果是 true 的话就不将改条路由规则渲染成一个导航菜单 -->
  <div v-if="!item.hidden">
    <!-- 仅有一个可显示的孩子 && (这个孩子不能有孩子 || 这个孩子没有可显示的孩子) && 该条路由总是需要显示的属性为 false  -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <!-- 路由规则里有 meta 信息，才渲染成菜单，否则不渲染 -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <!-- 渲染没有子路由的菜单 -->
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- 把 meta 信息中的 icon 和 title 传递给 item，组件 -->
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
    <!-- 渲染有子路由的菜单 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <!-- 左侧菜单中 用来显示图标的是路由对象中meta字段里的icon 文案显示用的meta中的title -->
        <!-- icon的渲染 使用名称去匹配 icons/svg/下的图标的名称-->
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- 递归组件，如果子路由里面还有孩子，继续渲染它的子路由对应的菜单 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    // 路由规则对象
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    // 基地址，也就是所有层的 父+子 的地址
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      // 筛选出该条路由下，所有 hidden 为 false 的子路由。也就是所有需要展示在导航菜单的子路由
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          // 拿到这个唯一的孩子
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      // 该条路由下，仅有一个需要显示的的子路由，返回 true，说明需要使用 el-menu-item 渲染成没有子菜单的菜单
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      // 没有要显示的孩子，就显示该路由自己
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      // 如果子路由的地址是外链，直接返回这个外链
      if (isExternal(routePath)) {
        return routePath
      }
      // 如果父路由的地址是外链，直接返回这个外链
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      // 父子路由都不是外链，返回父路由地址 + 子路由地址
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
