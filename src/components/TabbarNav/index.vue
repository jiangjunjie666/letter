<template>
  <div class="container">
    <div class="top">
      <div class="top-cen">
        <div class="logo">眷诗词</div>
        <div class="ipt">
          <input type="text" placeholder="搜索" />
          <el-icon size="16" class="icon-search"><Search /></el-icon>
        </div>
        <div class="menu">
          <ul>
            <li :class="{ active: $route.name == 'home' }" @click="goLayout('/home')">首页</li>
            <li :class="{ active: $route.name == 'poetry' }" @click="goLayout('/poetry')">诗词</li>
            <li :class="{ active: $route.name == 'masterwork' }" @click="goLayout('/masterwork')">名著</li>
            <li :class="{ active: $route.name == 'writar' }" @click="goLayout('/writar')">名家</li>
            <li :class="{ active: $route.name == 'community' }" @click="goLayout('/community')">社区</li>
            <li :class="{ active: $route.name == 'community' }" @click="goLayout('/community')">足迹</li>
            <li :class="{ active: $route.name == 'friend' }" @click="goLayout('/friend')">消息</li>
          </ul>
        </div>
        <div class="login" @click="goLogin" :class="{ none: Object.keys(userStore.userInfo).length != 0 }">
          <el-tooltip class="box-item" effect="dark" content="登录享受所有功能" placement="right-end">
            <h1 v-if="Object.keys(userStore.userInfo).length == 0" @click="dialogVisible = true">登录</h1>
          </el-tooltip>
          <el-dialog v-model="dialogVisible" width="768px" :before-close="handleClose">
            <GetLoginCard @loginChange="loginChange"></GetLoginCard>
          </el-dialog>
          <img v-if="Object.keys(userStore.userInfo).length != 0" ref="avatar" :src="userStore.userInfo.image" alt="头像" :class="{ avatarShow: loginCardShow }" @mouseenter="CardHandler" />
          <LoginCard v-if="loginCardShow" @moverLoginCard="moverLoginCard"></LoginCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import LoginCard from '@/components/LoginCard/index.vue'
import GetLoginCard from '@/components/GetLoginCard/index.vue'
import useUserStore from '@/store/modules/user.js'
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
let loginCardShow = ref(false)
let dialogVisible = ref(false)
const goLayout = (path) => {
  //路由跳转
  $router.push(path)
}
//登录
const goLogin = () => {}
//鼠标移入头像显示卡片
const CardHandler = () => {
  loginCardShow.value = true
}
//接收子组件的信息，鼠标移出则隐藏卡片
const moverLoginCard = () => {
  loginCardShow.value = false
}
//接收登录组件的通知，关闭登陆组件
const loginChange = () => {
  console.log(1)
  dialogVisible.value = false
}
onMounted(() => {})
</script>

<style scoped lang="scss">
.container {
  position: relative;
  .top {
    width: 100vw;
    height: $topHeight;
    background-color: #fff;
    position: absolute;
    //阴影
    box-shadow: 0 0 10px #ccc;
    .top-cen {
      width: $layoutWidth;
      height: 100%;
      margin: 0 auto;
      .logo {
        font-size: $logoFontSize;
        line-height: $topHeight;
        font-family: $logoFontStyle;
        float: left;
      }
      .ipt {
        width: 320px;
        height: 30px;
        float: left;
        //渐变背景
        background: linear-gradient(to right, #e5e5e5, #fefefe);
        margin: 30px 50px 0 80px;
        border-radius: 20px;
        input {
          //清除input的所有样式
          outline: none;
          border: none;
          padding-left: 20px;
          width: 80%;
          height: 100%;
          background: transparent;
          color: #333;
        }
        .icon-search:hover {
          cursor: pointer;
        }
      }
      .menu {
        float: left;
        width: 600px;
        height: 100%;
        margin: 30px 20px 0 0;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          li {
            height: 36px;
            padding: 10px 20px;
            font-size: 18px;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            text-align: center;
            border-radius: 20px;
            &:hover {
              cursor: pointer;
            }
          }

          .active {
            background-color: #cccccc;
          }
        }
      }
      .login {
        // background-color: blue;
        width: 40px;
        height: 40px;
        float: right;
        margin: 30px 120px 0 0;
        background-color: rgb(101, 185, 224);
        border-radius: 50%;
        text-align: center;
        &.none {
          background-color: #fff;
          margin: 10px 120px 0 0;
        }
        h1 {
          font-size: 18px;
          color: #fff;
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          line-height: 40px;
          &:hover {
            cursor: pointer;
            // color: rgb(241, 37, 37);
          }
        }
        img {
          width: 50px;
          height: 50px;
          margin: 20px auto;
          border-radius: 50%;
          transition: 0.3s all;
          z-index: 9;
          &:hover {
            cursor: pointer;
          }
        }
        .avatarShow {
          margin: 30px 0 -82px 0;
          transform: scale(1.5);
          z-index: 9;
        }
      }
    }
  }
}
</style>
