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
              <el-dropdown-item v-if="isShowBtn">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
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
    }
  }
}
</script>

<style>

</style>
