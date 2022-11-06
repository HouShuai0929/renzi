<template>
  <el-dialog title="新增员工" :visible="dialogVisible" width="50%" @close="closeDialog" @open="openDialog">
    <!-- 表单 -->
    <el-form ref="addRef" :model="addForm" :rules="addRules" label-width="100px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="addForm.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile" style="width:80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="addForm.timeOfEntry" style="width:80%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="addForm.formOfEmployment" style="width:80%" placeholder="请选择">
          <el-option label="正式" :value="1" />
          <el-option label="非正式" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="addForm.workNumber" style="width:80%" placeholder="请输入工号" clearable />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-cascader v-model="addForm.departmentName" style="width:80%" :options="options" :props="{ checkStrictly: true, label: 'name', value: 'name' }" :show-all-levels="false" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="addForm.correctionTime" style="width:80%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDepartmentList } from '@/api/department'
import { recurTransTree } from '@/utils/transTree'
import { addEmployee } from '@/api/employee'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      addForm: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      addRules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      },
      options: []
    }
  },
  methods: {
    // 点击 x 和蒙板会触发的回调函数
    closeDialog() {
      // 触发自定义事件，通知父组件去修改 dialogVisible 的值
      this.$emit('close-dialog')
      this.$refs.addRef.resetFields()
      this.addForm.departmentName = ''
    },
    // 弹窗打开时，触发的回调函数
    async openDialog() {
      const res = await getDepartmentList()
      this.options = recurTransTree(res.data.depts, '')
    },
    submit() {
      this.$refs.addRef.validate(async valid => {
        if (!valid) return
        // 发起请求
        await addEmployee({
          ...this.addForm,
          departmentName: this.addForm.departmentName[this.addForm.departmentName.length - 1]
        })
        // 提示用户
        this.$message.success('新增员工成功')
        // 关闭弹窗
        this.$emit('close-dialog')
        // 刷新列表
        this.$emit('get-employee-list')
      })
    }
  }
}

</script>
