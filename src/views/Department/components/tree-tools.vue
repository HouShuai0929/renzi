<template>
  <el-row type="flex" justify="space-between" align="middle" style="width: 100%;height: 40px;">
    <el-col :span="20">
      <span>{{ data.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <el-col>{{ data.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="showDialog('add')">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isShowBtn" @click.native="showDialog('edit')">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isShowBtn" @click.native="delDepartment">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { delDepartment } from '@/api/department'
export default {
  props: {
    data: {
      type: Object,
      required: true,
      id: ''
    },
    isShowBtn: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async showDialog(type) {
      // console.log('点击了添加子部门');
      this.$emit('show-dialog', this.data, type)
    },
    // 删除部门
    delDepartment() {
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delDepartment(this.data.id)
        this.$message.success('删除成功')
        this.$emit('fetch-department')
      })
    }
  }
}
</script>

<style>

</style>
