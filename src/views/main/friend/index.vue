<template>
  <div>
    <el-card class="friend-card">
      <div class="top">
        <h1>消息中心</h1>
        <div class="router">
          <div class="router-item" @click="$router.push('/friend/fans')"
            :class="{ active: $route.path === '/friend/fans' }">
            新增粉丝
          </div>
          <div class="router-item" @click="$router.push('/friend/like')"
            :class="{ active: $route.path === '/friend/like' }">
            点赞
          </div>
          <div class="router-item" @click="$router.push('/friend/code')"
            :class="{ active: $route.path === '/friend/code' }">
            私信
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="friend-card2">
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
const $router = useRouter();
const $route = useRoute();
</script>

<style lang="scss" scoped>
.friend-card {
  width: 1000px;
  margin: 0 auto;

  .top {
    h1 {
      font-size: 25px;
    }

    .router {
      margin-top: 20px;
      display: flex;

      .router-item {
        margin-right: 20px;
        font-size: 18px;
        padding-bottom: 10px;

        &.active {
          color: rgb(101, 185, 224);
          border-bottom: 2px solid rgb(101, 185, 224);
        }

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}

.friend-card2 {
  width: 1000px;
  margin: 10px auto;

  :deep(.el-card__body) {
    padding: 0px 0px;
  }
}
</style>
