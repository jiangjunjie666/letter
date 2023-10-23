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
            <li :class="{ active: $route.name == 'friend' }" @click="goLayout('/friend')">消息</li>
          </ul>
        </div>
        <div class="login" @click="goLogin">
          <h1 v-if="false">登录</h1>
          <img src="@/../public/coffee-6249312.jpg" alt="" />
          <div class="login-card login-card-show">
            <div class="name">我的名字</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

let $router = useRouter()
let $route = useRoute()

const goLayout = (path) => {
  //路由跳转
  $router.push(path)
}
//登录
const goLogin = () => {}
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
            padding: 10px 25px;
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
        h1 {
          font-size: 18px;
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          line-height: 97px;
          &:hover {
            cursor: pointer;
          }
        }
        img {
          width: 50px;
          height: 50px;
          margin: 20px auto;
          border-radius: 50%;
          transition: 0.5s all;
          z-index: 9;
          &:hover {
            cursor: pointer;
            margin: 30px 0 -82px 0;
            transform: scale(1.5);
            z-index: 9;
          }
        }
        .login-card {
          z-index: 1;
          width: 300px;
          height: 400px;
          background-color: #fff;
          position: absolute;
          top: 110%;
          right: 8%;
          display: none;
          transition: 0.3s all;
          .name {
            padding: 10px;
          }
        }
        .login-card-show {
          display: block;
        }
      }
    }
  }
}
</style>
