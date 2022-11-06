<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <i class="el-icon-info" />
          <span>本月: 社保在缴 公积金在缴</span>
        </template>
        <template #right>
          <el-button type="primary" size="small">导入excel</el-button>
          <el-button type="primary" size="small">导出excel</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
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
          <el-table-column label="入职时间" prop="timeOfEntry" width="200" />
          <el-table-column label="操作" fixed="right" width="200">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employee'
export default {
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
      total: 0
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
    }
  }
}
</script>
