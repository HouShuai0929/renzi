<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <i class="el-icon-info" />
          <span>本月: 社保在缴 公积金在缴</span>
        </template>
        <template #right>
          <el-button type="primary" size="small" @click="$router.push('/import')">导入excel</el-button>
          <el-button type="primary" size="small" @click="exportExcel">导出excel</el-button>
          <el-button type="primary" size="small" @click="showDialog">新增员工</el-button>
        </template>
      </page-tools>
      <el-card style="margin-top: 10px;">
        <el-table :data="list" border>
          <el-table-column label="序号" type="index" width="60" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="工号" prop="workNumber" />

          <el-table-column label="聘用形式">
            <template #default="{ row }">
              {{ hireEnum[row.formOfEmployment] }}
            </template>
          </el-table-column>

          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" width="200">
            <template #default="{ row }">
              {{ formatDate(row.timeOfEntry) }}
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="200">
            <template #default="{ row }">
              <el-button type="text" size="small" @click="toDetail(row.id)">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            :current-page="params.page"
            :page-size="params.size"
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
    <AddDialog :dialog-visible="dialogVisible" @close-dialog="closeDialog" @get-employee-list="getEmployeeList" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employee'
import dayjs from 'dayjs'
import AddDialog from './components/add-dialog.vue'
export default {
  components: {
    AddDialog
  },
  data() {
    return {
      // 列表数据
      list: [],
      // 分页参数
      params: {
        page: 1,
        size: 10
      },
      hireEnum: {
        1: '正式',
        2: '非正式'
      },
      total: 0,
      dialogVisible: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    handleCurrentChange(newPage) {
      this.params.page = newPage
      this.getEmployeeList()
    },
    async getEmployeeList() {
      const res = await getEmployeeList(this.params)
      this.list = res.data.rows
      this.total = res.data.total
    },
    formatDate(time) {
      return dayjs(time).format('YYYY-MM-DD')
    },
    showDialog() {
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
    },
    // 员工数据的批量导出
    exportExcel() {
      // 表头
      const headerArr = ['姓名', '手机号', '入职日期', '工号', '聘用形式', '部门']
      // 中英对照关系
      const headerRelation = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '工号': 'workNumber',
        '聘用形式': 'formOfEmployment',
        '部门': 'departmentName'
      }
      const twoArr = this.transData(this.list, headerArr, headerRelation)
      // 动态引入 @/vendor/Export2Excel 包
      import('@/vendor/Export2Excel').then(excel => {
        // excel：是 @/vendor/Export2Excel 包中的 excel 导出模块
        // export_json_to_excel：将 json 数据转换为 excel
        excel.export_json_to_excel({
          // 表头 header 必填，是一个数组
          // header: ['姓名', '年龄'],
          header: headerArr,
          // 表格 body 具体数据，是一个二维数组
          data: twoArr,
          filename: 'excel-list', // 文件名称
          autoWidth: true, // 宽度是否自适应
          bookType: 'xlsx' // 生成的文件类型
        })
      })
    },
    // 封装将后端返回的表格数组数据转换为二维数组的方法
    transData(list, headerArr, relation) {
      // list：后端返回的表格数组数据
      // headerArr：表头数据
      const twoArr = []
      list.forEach(item => {
        const arr = []
        // 遍历表头数据
        headerArr.forEach(key => {
          // key：中文key，如：'姓名'
          // enkey：引文key，如 'username'
          const enkey = relation[key]
          if (enkey === 'formOfEmployment') {
            arr.push(this.hireEnum[item[enkey]])
          } else {
            arr.push(item[enkey])
          }
        })
        twoArr.push(arr)
      })
      // 返回值：转换后的二维数组
      return twoArr
    },
    // 跳转员工详情页
    toDetail(id) {
      this.$router.push({
        path: '/employeeDetail',
        query: { id }
      })
    },
    delEmployee(id) {
      // 1. 询问用户
      this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 2. 调用接口
        await delEmployee(id)
        // 3. 提示用户
        this.$message.success('删除员工成功')
        // 删除最后一页最后一条数据时，页数减 1
        if (this.list.length === 1 && this.params.page > 1) {
          this.params.page--
        }
        // 4. 刷新列表
        this.getEmployeeList()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

