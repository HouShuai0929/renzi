<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
      <el-progress v-if="isShow" type="circle" :percentage="percentage" class="progress" />
    </el-upload>
  </div>
</template>

<script>
const COS = require('cos-js-sdk-v5')
// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
const cos = new COS({
  SecretId: 'AKIDjM8i4FDxUovoUw9HBqGRN4WkkYAZ5Uhg',
  SecretKey: 'mJcibMvHQL4gdP0OgpodHiwyoUxCD0aw'
})
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 图片地址
      imageUrl: this.value,
      // 控制进度条显示与隐藏
      isShow: false,
      // 进度条的进度
      percentage: 0
    }
  },
  watch: {
    value(newValue) {
      this.imageUrl = newValue
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPNG && isLt2M
    },
    // 上传图片到腾讯云
    upload(obj) {
      // obj：上传的一些信息
      // obj.file：用户选择的文件
      // console.log(obj.file)
      // 上传之前开启进度条
      this.isShow = true
      cos.putObject({
        Bucket: 'hou-1301192557', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: obj.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: obj.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: (progressData) => {
          // 上传的进度
          // console.log(JSON.stringify(progressData))
          this.percentage = progressData.percent * 100
        }
      }, (err, data) => {
        this.isShow = false
        // 上传后的回调函数
        console.log(err || data)
        if (data.statusCode === 200) {
          // data.Location 腾讯云返回的图片地址
          // 上传图片成功
          this.imageUrl = `https:${data.Location}`
          this.$emit('input', this.imageUrl)
        }
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.progress {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
}
</style>
