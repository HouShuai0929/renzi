<template>
  <div class="department-container">
    <div class="app-container">
      <el-card v-loading="loading">
        <!-- 头部 -->
        <tree-tools :data="company" :is-show-btn="false" @show-dialog="showDialog" />
        <!-- 树形结构 -->
        <!-- data：用于指定树形结构渲染的数据（树形数据） -->
        <!-- props：用于修改 el-tree 默认读取的字段 -->
        <el-tree :data="list" :props="defaultProps" :default-expand-all="true">
          <!-- 使用作用域插槽，渲染自定义结构 -->
          <!-- data：每一行的数据 -->
          <template #default="{ data }">
            <tree-tools :data="data" :is-show-btn="true" @show-dialog="showDialog" @fetch-department="getDepartmentList" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <el-dialog
      :title="departForm.id ? '编辑部门' : '添加子部门'"
      :visible="dialogVisible"
      width="40%"
      @close="dialogClose"
      @open="dialogOpen"
    >
      <!-- 表单内容 -->
      <el-form ref="departRef" :model="departForm" :rules="departRules" label-width="100px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="departForm.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="departForm.code" placeholder="请输入部门编码" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="departForm.manager" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in managerList"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="departForm.introduce" placeholder="请输入部门介绍" />
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartmentList,
  getManagerList,
  addDepartment,
  getDepartDetail,
  updateDepartment
} from '@/api/department'
import { recurTransTree } from '@/utils/transTree'
export default {
  components: {
    TreeTools
  },
  data() {
    // 部门名称的自定义校验规则函数
    const validateName = (rules, value, cb) => {
      // rules：当前的校验规则的一些信息。基本用不到
      // value：表单的值
      // cb：它是一个函数，有两种调用方式
      // 1. cb() 表示校验通过
      // 2. cb(new Error('提示给用户的错误信息')) 表示校验没通过
      // 1. 找到要添加的子部门的所有同级部门（也就是正在操作的部门的所有子部门）
      // this.currentdata 就是当前正常操作的部门数据
      // const broArr = this.originList.filter(item => item.pid === this.currentdata.id)
      let broArr = []
      if (this.departForm.id) {
        if (value === this.currentdata.name) {
          cb()
          return
        }
        broArr = this.originList.filter(item => item.pid === this.currentdata.pid)
      } else {
        broArr = this.originList.filter(item => item.pid === this.currentdata.id)
      }
      // console.log(broArr);
      // 2. 只要有一个同级部门名称和我要新添加的部门名称一样，就校验不通过
      const isSame = broArr.some(item => item.name === value)
      if (isSame) {
        // 校验不通过
        cb(new Error('同级部门名称不能一样'))
      } else {
        // 校验通过
        cb()
      }
    }

    // 部门编码的自定义校验规则函数
    const validateCode = (rules, value, cb) => {
      if (this.departForm.id && value === this.currentdata.code) {
        cb()
        return
      }
      // 在所有部门中，部门编码都不能重复
      const isSame = this.originList.some(item => item.code === value)
      if (isSame) {
        // 校验不通过
        cb(new Error('部门编码不能重复'))
      } else {
        // 校验通过
        cb()
      }
    }

    return {
      list: [],
      defaultProps: {
        label: 'name'
        // children: 'child'
      },
      company: {
        name: '传智教育',
        manager: '负责人',
        id: ''
      },
      // 控制弹窗显示与隐藏
      dialogVisible: false,
      myDialogVisible: false,
      // 表单的数据对象
      departForm: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      // 表单验证规则对象
      departRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: ['blur', 'change'] },
          // { validator: 自定义校验函数, trigger: 触发时机 }
          { validator: validateName, trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: validateCode, trigger: ['blur', 'change'] }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: ['blur', 'change'] }
        ]
      },
      // 后端返回的扁平化数据
      originList: [],
      // 当前操作的数据
      currentdata: {},
      // 部门负责人列表数据
      managerList: [],
      loading: false
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      this.loading = true
      try {
        const res = await getDepartmentList()
        this.list = recurTransTree(res.data.depts, '')
        this.originList = res.data.depts
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    handleHideDialog(value) {
      this.myDialogVisible = value
    },
    handleNodeClick(data) {
      console.log(data)
    },
    async showDialog(data, type) {
      this.dialogVisible = true
      this.currentdata = data
      if (type === 'edit') {
        const res = await getDepartDetail(this.currentdata.id)
        this.departForm = res.data
      }
    },
    // 点击 X 和蒙板时会触发的事件
    dialogClose() {
      this.dialogVisible = false
      this.$refs.departRef.resetFields()
      this.departForm = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    // 弹窗打开时，触发的事件
    async dialogOpen() {
      const res = await getManagerList()
      this.managerList = res.data
    },
    // 添加子部门
    submit() {
      // 兜底校验
      this.$refs.departRef.validate(async valid => {
        if (!valid) return
        // 校验通过
        // 发起请求
        if (this.departForm.id) {
          await updateDepartment(this.departForm)
        } else {
          await addDepartment({
            ...this.departForm,
            pid: this.currentdata.id
          })
        }
        // 1. 提示用户
        const msg = this.departForm.id ? '编辑部门成功' : '添加子部门成功'
        this.$message.success(msg)
        // 2. 关闭弹窗
        this.dialogVisible = false
        // 3. 刷新列表数据
        this.getDepartmentList()
      })
    }
  }
}
</script>
