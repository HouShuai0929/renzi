<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 头部 -->
        <tree-tools :data="company" :is-root="true" />
        <!-- 树形结构 -->
        <!-- data：用于指定树形结构渲染的数据（树形数据） -->
        <!-- props：用于修改 el-tree 默认读取的字段 -->
        <el-tree :data="list" :props="defaultProps">
          <!-- 使用作用域插槽，渲染自定义结构 -->
          <!-- data：每一行的数据 -->
          <template #default="{ data }">
            <tree-tools :data="data" :is-root="false" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartmentList } from '@/api/department'
export default {
  components: { TreeTools },
  data() {
    return {
      list: [],
      defaultProps: {
        label: 'name'
      },
      company: {
        name: '传智教育',
        manager: '负责人'
      }
    }
  },
  async created() {
    const res = await getDepartmentList()
    this.list = res.data.depts
    this.transTree(this.list)
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    transTree(list) {
      const treeList = []
      const map = {}
      list.forEach(item => {
        map[item.id] = item
      })
      list.forEach(item => {
        if (map[item.pid]) {
          if (!map[item.pid].children) map[item.pid].children = []
          map[item.pid].children.push(item)
        } else {
          treeList.push(item)
        }
      })
    }
  }
}
</script>
