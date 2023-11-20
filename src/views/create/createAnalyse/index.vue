<template>
  <div class="title">诗词赏析</div>
  <div class="form">
    <h1>1.赏析诗词标题</h1>
    <el-input v-model="title" placeholder="输入赏析诗词标题" />
    <h1>2.标签</h1>
    <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false" @close="handleClose(tag)">
      {{ tag }}
    </el-tag>
    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" style="width: 100px" />
    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput"> + New Tag </el-button>
    <h1>3.赏析诗词原文</h1>
    <el-input v-model="textarea" autosize type="textarea" placeholder="输入赏析诗词原文" />
    <h1>4.赏析诗词</h1>
    <el-input v-model="analyse" autosize type="textarea" placeholder="输入赏析" />
    <h1>5.配图</h1>
    <!-- http://172.16.40.33:8083/common/upload -->
    <el-upload class="avatar-uploader" action="http://172.16.40.33:8083/common/upload " :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-button type="primary" style="margin: 10px 10px 0 0">一键发布</el-button>
    <el-button style="margin: 10px 0 0 0">一键清空</el-button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

//数据
let title = ref('') //标题
let textarea = ref('') //原文
let analyse = ref('') //赏析文
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref(null)
const dynamicTags = ref(['诗词赏析'])

//处理函数
//取消某个tag
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
//添加tag
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    //光标获取
    InputRef.value.focus()
  })
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

//图片上传之前的钩子
const beforeAvatarUpload = (file) => {}
//图片上传成功的钩子
const handleAvatarSuccess = (response, uploadFile) => {
  console.log(response)
  console.log(uploadFile)
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
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
