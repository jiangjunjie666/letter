<template>
  <div>
    <div class="title">发布动态</div>
    <div class="form">
      <h1>1.标题</h1>
      <el-input v-model="title" placeholder="输入标题" />
      <h1>2.标签</h1>
      <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false" @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
      <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" style="width: 100px" />
      <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput"> + New Tag </el-button>
      <h1>3.正文</h1>
      <el-input v-model="textarea" autosize type="textarea" placeholder="输入正文" />
      <h1>4.配图</h1>
      <el-upload v-model:file-list="fileList" action="http://172.16.40.33:8083/common/upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
      <el-button type="primary" style="margin: 10px 0">一键发布</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { reqDeleteImg } from '@/api/module/until.js'
import { ElMessage } from 'element-plus'
let title = ref('')
let textarea = ref('')
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref(null)
const dynamicTags = ref(['动态'])
//照片墙
const fileList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
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
//删除照片
const handleRemove = async (uploadFile, uploadFiles) => {
  let res = await reqDeleteImg(uploadFile.response.data)
  if (res.code == 1) {
    return ElMessage({
      type: 'success',
      message: '删除成功'
    })
  } else {
    return ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
//上传图片
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
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
}
</style>
