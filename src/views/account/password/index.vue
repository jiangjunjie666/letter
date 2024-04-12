<template>
  <div class="box">
    <div class="head">
      <p class="one"></p>
      <p class="msg">修改密码</p>
    </div>
    <div class="form">
      <el-form ref="ruleFormRef" :model="userUpdatePasswordDTO" :rules="rules" label-position="right"
        label-width="100px" class="form">
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="userUpdatePasswordDTO.password" style="width: 300px" show-password
            label-width="100px">
          </el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="tele">
          <el-input type="text" v-model="userUpdatePasswordDTO.tele" style="width: 300px;margin-right: 10px;"
            label-width="100px"></el-input>
          <el-button type="primary" @click="getCode">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input type="text" v-model="userUpdatePasswordDTO.code" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm(ruleFormRef)">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { reqGetCode, reqUpdatePassword } from '@/api/module/user'
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const ruleFormRef = ref(null)
const userUpdatePasswordDTO = reactive({
  id: userStore.userInfo.userId,
  password: '',
  tele: '',
  code: ''
})
const rules = reactive({
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
  ],
  tele: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ]
})
const getCode = async () => {
  if (!userUpdatePasswordDTO.tele) {
    return ElMessage({
      message: '请输入电话号码',
      type: 'warning'
    })
  }
  const res = await reqGetCode(userUpdatePasswordDTO.tele)
  if (res.code == 1) {
    userUpdatePasswordDTO.code = res.data
    ElMessage({
      message: '验证码已获取',
      type: 'success'
    })
  } else {
    return ElMessage({
      message: res.msg,
      type: 'warning'
    })
  }
}
//修改密码
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await reqUpdatePassword(userUpdatePasswordDTO)
      if (res.code == 1) {
        ElMessage({
          message: '修改成功',
          type: 'success'
        })
      } else {
        return ElMessage({
          message: res.msg,
          type: 'warning'
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  margin: 0;
  display: block;

  .head {
    display: flex;
    padding: 10px 0 0 20px;
    width: 850px;
    height: 50px;
    border-bottom: 1px solid #ccc;

    .one {
      width: 4px;
      height: 20px;
      background-color: pink;
    }

    .msg {
      margin-left: 5px;
      line-height: 20px;
    }
  }

  .form {
    margin-top: 20px;
  }
}
</style>
