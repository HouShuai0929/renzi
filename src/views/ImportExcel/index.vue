<template>
  <div class="excel-container">
    <UploadExcel :before-upload="beforeUpload" :on-success="onSuccess" />
  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { batchEmployee } from '@/api/employee'
export default {
  name: 'ImportExcel',
  components: {
    UploadExcel
  },
  created() {
    // 转换前的数据
    const arr = [
      {
        '姓名': 'zhangsan',
        '年龄': 18
      },
      {
        '姓名': 'lisi',
        '年龄': 19
      }
    ]
    // 中英文对照关系
    const relation = {
      '姓名': 'name',
      '年龄': 'age'
    }

    // 转换后的数据
    const arr2 = [
      {
        'name': 'zhangsan',
        'age': 18
      },
      {
        'name': 'lisi',
        'age': 19
      }
    ]

    // console.log(this.transData(arr, relation))
    console.log(this.transDataMap(arr, arr2, relation))
  },
  methods: {
    // 封装将中文 key 转换为英文 key 的方法
    transData(list, relation) {
      // list：转换前的数组数据
      // relation：中英文对照关系
      const transList = []
      list.forEach(item => {
        // item = {
        //   '姓名': 'zhangsan',
        //   '年龄': 18
        // }
        const obj = {}
        // 遍历 item
        for (const key in item) {
          // key 是中文key，如：'姓名'
          // relation = {
          //   '姓名': 'name',
          //   '年龄': 'age'
          // }
          // enkey 是英文key，如：'name'
          const enkey = relation[key]
          obj[enkey] = item[key]
          // obj['name'] = 'zhangsan'
          // obj['age'] = 18
        }
        transList.push(obj)
      })
      // 返回转换后的数组数据
      return transList
    },
    transDataMap(list, relation) {
      // list：转换前的数组数据
      // relation：中英文对照关系
      return list.map(item => {
        // item = {
        //   '姓名': 'zhangsan',
        //   '年龄': 18
        // }
        const obj = {}
        // 遍历 item
        for (const key in item) {
          // key 是中文key，如：'姓名'
          // relation = {
          //   '姓名': 'name',
          //   '年龄': 'age'
          // }
          // enkey 是英文key，如：'name'
          const enkey = relation[key]
          obj[enkey] = item[key]
          // obj['name'] = 'zhangsan'
          // obj['age'] = 18
        }
        return obj
      })
    },
    // 文件上传之前的校验函数
    beforeUpload(file) {
      // console.log('上传前：', file);
      // file 就是用户选择的文件
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) this.$message.warning('文件体积不能超过1M')
      return isLt1M
      // if (isLt1M) {
      //   // 校验通过，返回 true
      //   return true
      // }
      // // 提示用户
      // this.$message.warning('文件提交不能超过1M')
      // // 校验不通过，返回 false
      // return false
    },
    async onSuccess({ header, results }) {
      // header 是表头数据
      // results 是表体数据
      // console.log(header);
      // console.log(results);

      // 中英文对照关系
      const headerRelation = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '工号': 'workNumber',
        '聘用形式': 'formOfEmployment',
        '部门': 'departmentName'
      }

      const data = this.transData(results, headerRelation)
      // console.log(data);
      // 批量上传
      await batchEmployee(data)
      // 提示用户
      this.$message.success('批量上传成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.excel-container{
  padding: 50px;
}
</style>
