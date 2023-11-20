<template>
  <div>
    <div class="title">传作诗词</div>
    <div class="form">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="输入标题" />
        </el-form-item>
        <el-form-item label="背景" prop="backdrop">
          <el-input v-model="ruleForm.backdrop" autosize type="textarea" placeholder="传作背景" />
        </el-form-item>
        <el-form-item label="正文" prop="textarea">
          <el-input v-model="ruleForm.textarea" autosize type="textarea" placeholder="输入正文" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="ruleForm.type" class="ml-4">
            <el-radio label="1" size="large">诗</el-radio>
            <el-radio label="2" size="large">词</el-radio>
          </el-radio-group>
        </el-form-item>
        <h1>配图</h1>
        <el-form-item>
          <!-- http://172.16.40.33:8083/common/upload -->
          <el-upload class="avatar-uploader" action="http://172.16.40.29:8083/common/upload " :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)" style="margin: 10px 10px 0 0"> 一键发布 </el-button>
          <el-button @click="resetForm(ruleFormRef)" style="margin: 10px 0 0 0">清空数据</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { reqCreatePoetry } from '@/api/module/create.js'
import useUserStore from '@/store/modules/user.js'
let userStore = useUserStore()
let imageUrl = ref('') //图片路径
const formSize = ref('default')
const ruleFormRef = ref(null)
//表单对象
const ruleForm = reactive({
  title: '', // 传作标题
  backdrop: '', // 传作背景
  textarea: '', //正文
  type: '' //类型
})
//表单验证规则
const rules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在 1 到 10 个文字', trigger: 'blur' }
  ],
  backdrop: [{ required: true, message: '请输入创作背景', trigger: 'blur' }],
  textarea: [{ required: true, message: '请输入正文', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'blur' }]
})
//处理函数
//图片上传之前的钩子
const beforeAvatarUpload = (file) => {}
//图片上传成功的钩子
const handleAvatarSuccess = (response, uploadFile) => {
  console.log(response)
  // console.log(uploadFile)
  imageUrl.value = response.data
}
//点击上传的按钮
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //所有数据验证成功发送请求
      submitPoetry()
    } else {
      console.log('error submit!', fields)
    }
  })
}

//发送创作诗歌的请求
const submitPoetry = async () => {
  let imgArr = []
  imgArr.push(imageUrl.value)
  console.log(imgArr)
  let artDTO = {
    head: ruleForm.title,
    background: ruleForm.backdrop,
    context: ruleForm.textarea,
    type: ruleForm.type,
    images: imgArr,
    id: userStore.id
  }
  let res = await reqCreatePoetry(artDTO)
  if (res.code != 1) {
    return ElMessage({
      type: 'error',
      message: res.msg
    })
  } else {
    ElMessage({
      type: 'success',
      message: '发布成功'
    })
  }
}
//清空数据的按钮

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}

.form {
  width: 700px;
  margin: 10px auto;
  h1 {
    font-size: 18px;
    margin: 10px 0;
    color: #999;
  }
  .mx-1 {
    margin-right: 5px;
  }
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader {
    border: 1px dashed #999;
    width: 178px;
    height: 178px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font: optional;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
