<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card>
        <!-- 表单 -->
        <el-form ref="userInfoRef" label-width="120px" :model="userInfoForm" :rules="userInfoRules" style="margin-left: 120px; margin-top:30px">
          <el-form-item label="姓名:" prop="username">
            <el-input v-model="userInfoForm.username" style="width:300px" />
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="userInfoForm.mobile" disabled style="width:300px" />
          </el-form-item>
          <el-form-item label="入职时间">
            <el-date-picker
              v-model="userInfoForm.timeOfEntry"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="员工头像">
            <UploadImg v-model="userInfoForm.staffPhoto" />
          </el-form-item>
          <!-- 保存个人信息 -->
          <el-row class="inline-info" type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" @click="submit">保存更新</el-button>
              <el-button @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailInfo } from '@/api/user'
import UploadImg from '@/components/UploadImg/index.vue'
import { updateEmployee } from '@/api/employee'
export default {
  components: {
    UploadImg
  },
  data() {
    return {
      userInfoForm: {
        username: '',
        mobile: '',
        timeOfEntry: '',
        staffPhoto: ''
      },
      userInfoRules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    // console.log(this.$route.query.id);
    const res = await getUserDetailInfo(this.$route.query.id)
    this.userInfoForm = res.data
  },
  methods: {
    submit() {
      // 表单兜底校验
      this.$refs.userInfoRef.validate(async valid => {
        if (!valid) return
        // 校验通过
        // 发起请求
        await updateEmployee(this.userInfoForm)
        // 提示用户
        this.$message.success('更新成功')
      })
    }
    // getUrl(url) {
    //   this.userInfoForm.staffPhoto = url
    // }
  }
}
</script>
