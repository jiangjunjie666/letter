<template>
  <div>
    <div class="container"></div>
    <div class="box">
      <div class="left">
        <ul>
          <li>个人中心</li>
          <li :class="{ active: activeIndex == '/account/heart' }" @click="goRouter('/heart', '/account/heart')">
            <el-icon size="20" class="icon">
              <House />
            </el-icon>
            首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页
          </li>
          <li v-if="isShow" :class="{ active: activeIndex == '/account/avatar' }"
            @click="goRouter('/avatar', '/account/avatar')">
            <el-icon size="20" class="icon">
              <House />
            </el-icon>我的头像
          </li>
          <li :class="{ active: activeIndex == '/account/message' }" @click="goRouter('/message', '/account/message')">
            <el-icon size="20" class="icon">
              <House />
            </el-icon>个人资料
          </li>
          <li v-if="isShow" :class="{ active: activeIndex == '/account' }" @click="goRouter('/heart', 4)">
            <el-icon size="20" class="icon">
              <House />
            </el-icon>我的记录
          </li>
          <li v-if="isShow" :class="{ active: activeIndex == '/account/password' }"
            @click="goRouter('/password', '/account/password')">
            <el-icon size="20" class="icon">
              <House />
            </el-icon>修改密码
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
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useUserStore from '@/store/modules/user'
const userStore = useUserStore();
let $router = useRouter();
const $route = useRoute();
const userId = $route.query.userId;
let activeIndex = ref($route.path);
const goRouter = (path, index) => {
  activeIndex.value = index;
  $router.push({ path: "/account" + path, query: { userId: userId } });
};
const isShow = computed(() => {
  return userStore.userInfo.userId === $route.query.userId
});
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 200px;
  padding-top: 100px;
  background: url("@/assets/1.jpg");
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
        margin: 5px 0;

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
