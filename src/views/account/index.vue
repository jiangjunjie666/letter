<template>
  <div>
    <div class="container"></div>
    <div class="box">
      <div class="left">
        <ul>
          <li>个人中心</li>
          <li :class="{ active: activeIndex == 1 }" @click="goRouter('/heart', 1)">
            <el-icon size="20" class="icon"><House /></el-icon>
            首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页
          </li>
          <li :class="{ active: activeIndex == 2 }" @click="goRouter('/avatar', 2)">
            <el-icon size="20" class="icon"><House /></el-icon>我的头像
          </li>
          <li :class="{ active: activeIndex == 3 }" @click="goRouter('/message', 3)">
            <el-icon size="20" class="icon"><House /></el-icon>我的资料
          </li>
          <li :class="{ active: activeIndex == 4 }" @click="goRouter('/heart', 4)">
            <el-icon size="20" class="icon"><House /></el-icon>我的记录
          </li>
          <li :class="{ active: activeIndex == 5 }" @click="goRouter('/password', 5)">
            <el-icon size="20" class="icon"><House /></el-icon>修改密码
          </li>
        </ul>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
let $router = useRouter()
let activeIndex = ref(1)
const goRouter = (path, index) => {
  activeIndex.value = index
  $router.push('/account' + path)
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 200px;
  padding-top: 100px;
  background: url('@/assets/pexels-shonejai-1227511 (1).jpg');
}
.box {
  width: 1000px;
  height: 1000px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
  display: flex;
  .left {
    width: 150px;
    height: 100%;
    background-color: #fafafa;
    ul {
      li {
        padding: 20px;
        align-items: center;
        justify-content: center;
        display: flex;
        cursor: pointer;
        &.active {
          background-color: #00a1d7;
          color: #fff;
        }
        &:hover {
          background-color: #00a1d7;
          color: #fff;
        }
        .icon {
          margin-right: 10px;
        }
      }
    }
  }
  .right {
    width: 850px;
    height: 100%;
  }
}
</style>
