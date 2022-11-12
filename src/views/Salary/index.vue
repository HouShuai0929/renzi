<template>
  <div class="salary-container">
    <span class="salary-text">工资管理</span>
    <!-- <el-button v-if="$store.state.user.userInfo.roles.points.includes('CKGZ')">查看工资</el-button>
    <el-button v-if="$store.state.user.userInfo.roles.points.includes('KGZ')">扣工资</el-button> -->

    <el-button v-access="'CKGZ'">查看工资</el-button>
    <el-button v-access="'ZGZ'">涨工资</el-button>
  </div>
</template>
<script>
export default {
  name: 'Salary'
}
</script>

<style lang="scss" scoped>
.salary-container {
  padding: 30px;
}
</style>
