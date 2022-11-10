<template>
  <div class="setting-container">
    <div class="app-container">
      <!-- 新增角色按钮 -->
      <el-row style="height:60px">
        <el-button icon="el-icon-plus" size="small" type="primary" @click="dialogVisible = true">新增角色</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :data="roleList" border stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="100" align="center" />
        <el-table-column prop="name" label="角色" width="200" align="center" />
        <el-table-column prop="description" label="描述" align="center" />

        <el-table-column prop="address" label="操作" align="center">
          <template #default="{ row }">
            <el-button type="success" size="small" @click="showAssignDialog(row.id)">分配权限</el-button>
            <el-button type="primary" size="small" @click="showDialog(row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteRole(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" align="middle" style="height: 60px;">
        <el-pagination
          :current-page="params.page"
          :page-size="params.pagesize"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </div>
    <el-dialog
      :title="roleForm.id ? '编辑角色' : '新增角色'"
      :visible="dialogVisible"
      width="50%"
      @close="dialogClose"
    >
      <span>这是一段信息</span>
      <el-form ref="roleRef" :model="roleForm" :rules="roleRules" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <AssignDialog
      :assign-dialog-visible="assignDialogVisible"
      :role-id="roleId"
      @close-dialog="closeAssignDialog"
    />

  </div>
</template>
<script>
import { getRoleList, addRole, getRoleDetail, updateRole, deleteRole } from '@/api/setting'
import AssignDialog from './components/assign-dialog.vue'
export default {
  components: {
    AssignDialog
  },
  data() {
    return {
      roleList: [],
      params: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      dialogVisible: false,
      roleForm: {
        name: '',
        description: ''
      },
      // 表单验证规则对象
      roleRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      // 控制分配权限弹窗的显示与隐藏
      assignDialogVisible: false,
      roleId: ''
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 当前页发生变化触发的事件处理函数
    handleCurrentChange(page) {
      // console.log(page);
      this.params.page = page
      this.getRoleList()
    },
    // 获取角色列表数据的方法
    async getRoleList() {
      const res = await getRoleList(this.params)
      this.roleList = res.data.rows
      this.total = res.data.total
    },
    dialogClose() {
      this.dialogVisible = false
      this.$refs.roleRef.resetFields()
      this.roleForm = {
        name: '',
        description: ''
      }
    },
    submit() {
      this.$refs.roleRef.validate(async valid => {
        if (!valid) return

        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        const msg = this.roleForm.id ? '编辑角色' : '新增角色'
        this.$message.success(msg)
        this.dialogVisible = false
        this.getRoleList()
      })
    },
    async showDialog(id) {
      // console.log(id);
      // 打开弹窗
      this.dialogVisible = true
      // 获取角色详情
      const res = await getRoleDetail(id)
      this.roleForm = res.data
    },
    // 删除角色
    deleteRole(id) {
      // 询问用户
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 发起请求
        await deleteRole(id)
        // 提示用户
        this.$message.success('删除角色成功')
        // 当某一页只剩一条数据，并且页码大于 1 时，需要让页数减一
        if (this.roleList.length === 1 && this.params.page > 1) {
          this.params.page--
        }
        // this.params.page = 1
        // 刷新列表
        this.getRoleList()
      })
    },
    // 显示分配权限的弹窗
    showAssignDialog(id) {
      this.roleId = id
      this.assignDialogVisible = true
    },
    // 关闭弹窗
    closeAssignDialog() {
      this.assignDialogVisible = false
    }
  }
}
</script>
