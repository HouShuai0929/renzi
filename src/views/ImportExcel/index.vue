<template>
  <div class="excel-container">
    <UploadExcel :before-upload="beforeUpload" />
  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel/index.vue'
export default {
  name: 'ImportExcel',
  components: {
    UploadExcel
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.excel-container{
  padding: 50px;
}
</style>
