<template>
  <div>
    <div ref="radar" style="width: 400px; height: 450px;" />
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.radar)
    // 指定图表的配置项和数据
    this.option = {
      legend: {
        data: ['平均水平', '个人价值']
      },
      radar: {
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [80, 80, 80, 80, 80, 80],
              name: '平均水平'
            },
            {
              value: [90, 70, 85, 80, 95, 60],
              name: '个人价值'
            }
          ]
        }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option)
  },
  methods: {
    getList() {
      // this.option
    }
  }
}
</script>

<style>

</style>
