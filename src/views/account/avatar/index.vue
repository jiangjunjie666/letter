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
      <input style="display: none" type="file" @change="uploadChange" ref="fileUpLoad" enctype="muitipart/form-data" />
      <div class="file" @click="imgUpload">
        <el-icon size="50" style="color: #e6e0e0; cursor: pointer; width: 100%; height: 100%" @click="changeFileUp"><Plus /> </el-icon>
      </div>
      <el-button class="btn" type="primary" @click="upImg">上传头像</el-button>
    </div>
    <!-- <form action="http://172.16.40.33:8083/common/upload" method="post" enctype="multipart/form-data">
      <input type="file" />
      <input type="submit" value="提交" />
    </form> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useUserStore from '@/store/modules/user.js'
import { reqUpdateAvatar } from '@/api/module/user.js'
let userStore = useUserStore()
let fileUpLoad = ref(null)
const uploadChange = (e) => {
  upImg(e)
}
const changeFileUp = () => {
  //触发file
  fileUpLoad.value.click()
}
const upImg = async (e) => {
  const formData = new FormData()
  formData.append('avatar', e.target.files[0])
  let res = await reqUpdateAvatar(formData)
  console.log(res)
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
