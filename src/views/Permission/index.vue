<template>
  <div class="permission-container">
    <div class="app-container">
      <el-card>

        <div style="text-align: right;margin-bottom: 20px;">
          <el-button type="primary" size="small" @click="showDialog">添加权限</el-button>
        </div>

        <el-table :data="list" border row-key="id" style="width: 100%">

          <el-table-column prop="name" label="名称" />
          <el-table-column prop="code" label="标识" />
          <el-table-column prop="description" label="描述" />

          <el-table-column label="操作">
            <el-button type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </el-table-column>

        </el-table>

      </el-card>
    </div>
    <PermissionDialog :dialog-visible="dialogVisible" @close-dialog="closeDialog" />
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { transTree } from '@/utils/transTree'
import PermissionDialog from './components/permission-dialog.vue'
export default {
  components: {
    PermissionDialog
  },
  data() {
    return {
      list: [],
      dialogVisible: false
    }
  },
  created() {
    this.fetchPermissionList()
  },
  methods: {
    async fetchPermissionList() {
      const res = await getPermissionList()
      this.list = transTree(res.data)
    },
    // 打开弹窗
    showDialog() {
      this.dialogVisible = true
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>
