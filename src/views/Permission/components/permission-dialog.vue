<template>
  <el-dialog :title="permissionForm.id ? '编辑权限点' : '添加权限点'" :visible="dialogVisible" width="50%" @close="closeDialog">

    <el-form ref="permissionRef" :model="permissionForm" :rules="permissionRules" label-width="80px">

      <el-form-item label="权限名称" prop="name">
        <el-input v-model="permissionForm.name" />
      </el-form-item>

      <el-form-item label="权限标识" prop="code">
        <el-input v-model="permissionForm.code" />
      </el-form-item>

      <el-form-item label="权限描述">
        <el-input v-model="permissionForm.description" />
      </el-form-item>

      <el-form-item label="权限启用">
        <el-switch
          v-model="permissionForm.enVisible"
          active-value="1"
          inactive-value="0"
          active-text="启用"
          inactive-text="不启用"
        />
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close-dialog')">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>

  </el-dialog>
</template>

<script>
import { addPermission, getPermissionDetail, updatePermission } from '@/api/permission'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    type: {
      type: Number,
      required: true
    },
    pid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      permissionForm: {
        name: '', // 权限名称
        code: '', // 权限标识
        description: '', // 权限描述
        enVisible: '0' // 权限启用标识
      },
      permissionRules: {
        name: [
          { required: true, message: '请填写权限名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写权限标识', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog')
      // 清空表单内容，并移除校验结果
      this.$refs.permissionRef.resetFields()
      // 手动清空数据
      this.permissionForm = {
        name: '', // 权限名称
        code: '', // 权限标识
        description: '', // 权限描述
        enVisible: '0' // 权限启用标识
      }
    },
    submit() {
      this.$refs.permissionRef.validate(
        async valid => {
          if (!valid) return
          if (this.permissionForm.id) {
            await updatePermission(this.permissionForm)
          } else {
            await addPermission({
              ...this.permissionForm,
              type: this.type,
              pid: this.pid
            })
          }

          const msg = this.permissionForm.id ? '编辑成功' : '添加成功'
          this.$message.success(msg)
          this.$emit('close-dialog')
          this.$emit('fetch-permission-list')
        }
      )
    },
    async fetchPermissionDetail(id) {
      const res = await getPermissionDetail(id)
      this.permissionForm = res.data
    }
  }
}
</script>

<style>

</style>
