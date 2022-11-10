<template>
  <div class="permission-container">
    <div class="app-container">
      <el-card>

        <div style="text-align: right;margin-bottom: 20px;">
          <el-button type="primary" size="small" @click="showDialog({ type: 1,pid: '0'})">添加权限</el-button>
        </div>

        <el-table :data="list" border row-key="id" style="width: 100%">

          <el-table-column prop="name" label="名称" />
          <el-table-column prop="code" label="标识" />
          <el-table-column prop="description" label="描述" />

          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="text" @click="showDialog({ type: 2, pid: row.id })">添加</el-button>
              <el-button type="text" @click="showEditDialog(row.id)">编辑</el-button>
              <el-button type="text" @click="deletePermission(row.id)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>

      </el-card>
    </div>
    <PermissionDialog ref="permissionDialogRef" :dialog-visible="dialogVisible" :type="type" :pid="pid" @close-dialog="closeDialog" @fetch-permission-list="fetchPermissionList" />
  </div>
</template>

<script>
import { getPermissionList, deletePermission } from '@/api/permission'
import { transTree } from '@/utils/transTree'
import PermissionDialog from './components/permission-dialog.vue'
export default {
  components: {
    PermissionDialog
  },
  data() {
    return {
      list: [],
      dialogVisible: false,
      type: 0,
      pid: ''
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
    showDialog({ type, pid }) {
      this.type = type
      this.pid = pid
      this.dialogVisible = true
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogVisible = false
    },
    showEditDialog(id) {
      this.dialogVisible = true
      this.$refs.permissionDialogRef.fetchPermissionDetail(id)
    },
    // 删除
    deletePermission(id) {
      // 询问用户
      this.$confirm('此操作将永久删除该权限点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 发起删除请求
        await deletePermission(id)
        // 提示用户
        this.$message.success('删除成功')
        // 刷新列表
        this.fetchPermissionList()
      })
    }
  }
}
</script>
