<template>
  <div>
    <div class="login-card" @mouseleave="LoginCardOver">
      <div class="name">{{ userStore.userInfo.name }}</div>
      <div class="flower">
        <p>鲜花:</p>
        <span> 100朵</span>
        <svg t="1698031419803" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6121" width="16" height="16">
          <path
            d="M400.4 314.7c14.7-45.2 45.2-82.8 80.5-113.3-37-25.4-74-42.1-101.3-52.3 9.8 24.7 15.7 58.1 2.7 96.1-2.7 7.8-6.4 16.4-10.3 25.4-12.5 28.8-28 64.6-28.1 112.8-0.1 34.5 10.6 62.6 31.6 83.6 13.6 13.5 30 22.8 46.5 29.2-5-6.2-10.1-13.4-14.8-21.7-16.8-30.5-31.8-82.9-6.8-159.8z"
            fill="#FDCDE1"
            p-id="6122"
          ></path>
          <path
            d="M646.7 473c20.1-21.6 28.9-50.8 26.2-86.8-3.4-46.2-15.2-66.9-27.7-88.9-6.5-11.4-13.1-23.2-18.5-38.1-14.3-40.3-7.3-78.6 3.3-106.7-61.1 27-166.5 85-195.2 173.5-39 120.1 33.3 165.1 36.4 166.9 0.4 0.2 0.7 0.4 1.1 0.7 16.7 11.5 43.6 18.3 71.9 18.3 42.2 0 79.6-14.2 102.5-38.9zM510.7 178c23.7-17 48.1-31.2 70.3-42.5l-37.3-33.1c-48.2 13.4-78.7 27.2-96.4 36.9 19.7 10.1 41.1 22.6 62.5 38 0.3 0.2 0.6 0.4 0.9 0.7z"
            fill="#FDCDE1"
            p-id="6123"
          ></path>
          <path
            d="M737.6 686.6c-2.9-5.2-8.2-8.7-14.2-9.2-17.5-1.6-34.3-2.4-49.8-2.4-64.2 0-111.6 13.6-141.4 40.5V547.9c4 0.2 8 0.4 12 0.4 52.2 0 99.3-18.4 129.1-50.5 26.8-28.9 39.2-68.4 35.8-114.2-4-54.4-19.1-80.8-32.3-104.1-6-10.5-11.6-20.4-15.8-32.4-21.3-59.9 22.1-117.7 22.5-118.3 4.9-6.3 5.1-15 0.5-21.5s-12.8-9.3-20.4-6.9c-2.5 0.8-20.9 6.8-47.1 18.2l-56.2-49.9c-4.6-4-10.8-5.5-16.7-4-83.7 22.1-122.3 46.2-135.9 56.4-4-1.7-40.8-14.9-49.2-17.3-16.4-4.7-20.3-5.9-27.1-2.3-5.1 2.6-8.6 7.4-9.6 13s0.7 11.3 4.6 15.5c0.4 0.4 41.3 45.3 21.4 103.5-2.2 6.5-5.5 14-9.3 22.7-13.1 30.2-31 71.4-31.1 127.2-0.1 44.6 14.1 81.4 42.3 109.4 45.8 45.6 112.7 53.1 146 53.8v113.1c-29.5-29.4-78.3-44.3-145.4-44.3-15.5 0-32.3 0.8-49.8 2.4-6 0.5-11.3 4-14.2 9.2-2.9 5.2-3.1 11.5-0.5 16.9 48.2 98.1 102.7 147.8 162 147.9 19.5 0 35.8-5.7 47.9-12v165c0 10 8.1 18.2 18.2 18.2 10 0 18.2-8.1 18.2-18.2V841.3c11.6 5.5 26.5 10 43.9 10 59.2 0 113.7-49.7 162-147.9 2.7-5.3 2.6-11.6-0.4-16.8z"
            fill="#E66978"
            p-id="6124"
          ></path>
          <path d="M489.6 741c-6.9 5.2-21.9 14.5-41.6 14.5-39.2 0-79.2-35.6-116.7-103.3 6.6-0.3 13-0.4 19.2-0.4 61.2 0 104.4 13.7 125.1 39.6 15 18.9 15 40 14 49.6z" fill="#FFD976" p-id="6125"></path>
          <path
            d="M543.7 102.3l37.3 33.1c-22.2 11.3-46.6 25.5-70.3 42.5-0.3-0.2-0.6-0.5-0.9-0.7-21.4-15.4-42.9-27.9-62.5-38 17.7-9.7 48.2-23.4 96.4-36.9zM375.6 467.1c-21.1-20.9-31.7-49.1-31.6-83.6 0.1-48.2 15.6-84 28.1-112.8 3.9-9.1 7.6-17.6 10.3-25.4 13-38 7.1-71.5-2.7-96.1 27.3 10.2 64.2 26.9 101.3 52.3-35.3 30.5-65.8 68.2-80.5 113.3-25 76.8-10 129.3 7 159.8 4.7 8.4 9.7 15.6 14.8 21.7-16.8-6.5-33.2-15.8-46.7-29.2z"
            fill="#FFAEBF"
            p-id="6126"
          ></path>
          <path
            d="M472.4 493.6c-0.4-0.3-0.7-0.4-1.1-0.7-3.1-1.9-75.4-46.9-36.4-166.9 28.8-88.5 134.2-146.5 195.2-173.5-10.6 28.1-17.7 66.3-3.3 106.7 5.3 15 12 26.7 18.5 38.1 12.5 21.9 24.2 42.7 27.7 88.9 2.7 36-6.1 65.2-26.2 86.8-23 24.7-60.3 38.9-102.5 38.9-28.3 0-55.2-6.9-71.9-18.3z"
            fill="#FFAEBF"
            p-id="6127"
          ></path>
          <path d="M576.1 815c-19.7 0-34.8-9.3-41.6-14.5-1-9.7-1-30.8 14.1-49.6 20.6-25.9 63.9-39.6 125.1-39.6 6.2 0 12.6 0.1 19.2 0.4C655.4 779.4 615.3 815 576.1 815z" fill="#FFD976" p-id="6128"></path>
        </svg>
      </div>
      <!-- 等级 -->
      <div class="level">
        <p class="start">Lv4</p>
        <el-progress class="progress" :percentage="10" color="gold" :show-text="false" :stroke-width="2" />
        <p class="end">Lv5</p>
      </div>
      <!-- 等级成长值 -->
      <div class="growth">当前成长5055，距离升级Lv.5 还需要5745</div>
      <!-- 关注，粉丝等 -->
      <div class="fans">
        <div class="guan">
          <h2>99</h2>
          <p>粉丝</p>
        </div>
        <div class="guan">
          <h2>99</h2>
          <p>关注</p>
        </div>
        <div class="guan">
          <h2>99</h2>
          <p>动态</p>
        </div>
      </div>
      <!-- 一些选项 -->
      <div class="setting">
        <div class="set" @click="$router.push('/account')">
          <el-icon><User /></el-icon>
          <p>个人中心</p>
          <el-icon size="13"><ArrowRight /></el-icon>
        </div>
        <div class="set">
          <el-icon><User /></el-icon>
          <p>个人空间</p>
          <el-icon size="13"><ArrowRight /></el-icon>
        </div>
        <div class="set" @click="loginOut">
          <el-icon><User /></el-icon>
          <p>退出登录</p>
          <el-icon size="13"><ArrowRight /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useUserStore from '@/store/modules/user.js'
import { useRouter } from 'vue-router'
let $router = useRouter()
let userStore = useUserStore()
//自定义事件
const emit = defineEmits(['moverLoginCard'])

const LoginCardOver = () => {
  //触发自定义事件
  emit('moverLoginCard')
}
//退出登录
const loginOut = () => {
  //清除本地userinfo
  userStore.loginOut()
  //刷新页面
  $router.push('/')
}
</script>

<style lang="scss" scoped>
.login-card {
  z-index: 1;
  width: 300px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 110%;
  right: 9%;
  transition: 0.3s all;
  border-radius: 10px;
  .name {
    text-align: center;
    padding-top: 10px;
    font-size: 20px;
  }
  .flower {
    display: flex;
    margin-top: 10px;
    justify-content: center;
    font-size: 14px;
    p {
      color: #a09c9c;
    }
  }
  .level {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .start {
      background-color: gold;
      color: #fff;
      margin-left: 20px;
      font-size: 14px;
    }
    .end {
      background-color: #b3aeae;
      color: #fff;
      margin-right: 20px;
      font-size: 14px;
    }
    .progress {
      width: 200px;
    }
  }
  .growth {
    font-size: 12px;
    color: #b3aeae;
    text-align: center;
    line-height: 20px;
  }
  .fans {
    display: flex;
    justify-content: space-around;
    margin-top: 1em;
    .guan {
      &:hover {
        color: rgb(119, 191, 240);
        cursor: pointer;
      }
      h2 {
        text-align: center;
        padding: 2px;
        font-size: 18px;
      }
      p {
        text-align: center;
        color: #a09c9c;
        font-size: 14px;
      }
    }
  }
  .setting {
    margin-top: 20px;
    .set {
      display: flex;
      margin-bottom: 10px;
      justify-content: space-around;
      align-items: center;
      padding: 8px;
      &:hover {
        cursor: pointer;
        background-color: #d6d6d6;
      }
      p {
        color: #a09c9c;
      }
    }
  }
}
.login-card-show {
  display: block;
}
</style>
