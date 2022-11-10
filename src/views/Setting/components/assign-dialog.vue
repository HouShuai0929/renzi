<template>
  <el-dialog
    title="分配权限"
    :visible="assignDialogVisible"
    width="50%"
    @close="closeDialog"
    @open="openDialog"
  >

    <el-tree
      ref="treeRef"
      :data="list"
      :props="defaultProps"
      default-expand-all
      show-checkbox
      check-strictly
      node-key="id"
    />

    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close-dialog')">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { assignPermission, getRoleDetail } from '@/api/setting'
import { transTree } from '@/utils/transTree'

export default {
  props: {
    assignDialogVisible: {
      type: Boolean,
      required: true
    },
    roleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      defaultProps: {
        label: 'name'
      }
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('close-dialog')
    },
    async openDialog() {
      const res = await getPermissionList()
      this.list = transTree(res.data)
      const roleDetail = await getRoleDetail(this.roleId)
      this.$refs.treeRef.setCheckedKeys(roleDetail.data.permIds)
    },
    // 给角色分配权限
    async submit() {
      // getCheckedKeys 方法的作用：获取到选中的节点的 key 值所组成的数组
      await assignPermission({
        id: this.roleId,
        permIds: this.$refs.treeRef.getCheckedKeys()
      })
      // 提示用户
      this.$message.success('分配权限成功')
      // 关闭弹窗
      this.$emit('close-dialog')
    }
  }
}
</script>

<style>

</style>
