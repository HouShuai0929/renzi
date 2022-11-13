<template>
  <el-calendar v-model="value">
    <!-- date：当前日期单元格的日期对象 -->
    <template #dateCell="{ date }">
      <div class="date-content">
        <span class="text">{{ date.getDate() }}</span>
        <span v-if="date.getDay() === 6 || date.getDay() === 0" class="rest">休</span>
      </div>
    </template>
  </el-calendar>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
.date-content {
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
</style>

