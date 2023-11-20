<template>
  <div class="avatar">
    <div class="avatar-title">
      <p class="one"></p>
      <p class="msg">我的头像</p>
    </div>
    <div class="avatar-time">
      <div class="out">
        <img :src="userStore.userInfo.image" alt="" />
      </div>
    </div>
    <div class="fileUp">
      <!-- <input style="display: none" type="file" @change="uploadChange" ref="fileUpLoad" enctype="muitipart/form-data" />
      <div class="file" @click="imgUpload">
        <el-icon size="50" style="color: #e6e0e0; cursor: pointer; width: 100%; height: 100%" @click="changeFileUp"><Plus /> </el-icon>
      </div> -->
      <el-upload class="avatar-uploader" :action="actionUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="Avatar" />
        <el-icon v-else class="avatar-uploader-icon">选择头像<Plus /></el-icon>
      </el-upload>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user.js'
import { reqUpdateAvatar } from '@/api/module/user.js'
let userStore = useUserStore()
let actionUrl = 'http://172.16.40.33:8083/common/upload?id=' + userStore.userInfo.id
const imageUrl = ref('')

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像格式错误')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小超过2MB')
    return false
  }
  return true
}

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = response.data
  updateAvatar(response.data)
    .then((res) => {
      //修改本地的用户数据
      userStore.updateAvatar(response.data)
      imageUrl.value = ''
      return ElMessage({
        type: 'success',
        message: '头像修改成功'
      })
    })
    .catch((err) => {
      imageUrl.value = ''
      ElMessage({
        type: 'error',
        message: '头像修改失败'
      })
    })
}

const updateAvatar = async (imgUrl) => {
  const data = {}
  data.id = userStore.userInfo.id
  data.image = imgUrl
  let res = await reqUpdateAvatar(data)
  if (res.code === 1) {
    return true
  } else {
    return false
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  .avatar-title {
    display: flex;
    margin: 10px 0 0 0px;
    align-items: center;
    border-bottom: 1px solid #bbb8b8;
    padding: 10px;
    .one {
      width: 5px;
      height: 20px;
      background-color: pink;
      margin-right: 5px;
    }
  }
  .avatar-time {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #bbb8b8;
    .out {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 1px solid #bbb8b8;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
  }
  .fileUp {
    display: flex;
    align-items: center;
    padding-top: 20px;
    .file {
      width: 200px;
      height: 200px;
      // background-color: pink;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px dashed #bbb8b8;
    }
    .btn {
      margin-left: 20px;
    }
  }
}
</style>

<style>
.avatar-uploader .Avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader {
  margin: 0 auto;
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
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
