<template>
  <div class="fans" v-if="fansList.length > 0">
    <h1>共有{{ fansList.length }}个粉丝</h1>
    <div class="fanslist" v-for="i in fansList" :key="i">
      <img :src="i.image" alt="" @click="toUser(i)" />
      <p class="name">{{ i.name }}</p>
      <p class="guan">关注了你</p>
      <p class="time">{{ i.careForTime }}</p>
      <el-button type="primary" class="btn" v-if="!i.careFor" @click="follow(i)">回关</el-button>
      <el-button type="primary" class="btn" v-if="i.careFor">已关注</el-button>
    </div>
  </div>
  <el-empty v-else></el-empty>
</template>

<script setup>
import { reqFansList, reqFollow } from "@/api/module/user.js";
import { ref, onMounted } from "vue";
import useUserStore from "@/store/modules/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const $router = useRouter();
const userStore = useUserStore();
//获取粉丝列表
const fansList = ref([]);
const getFansList = async () => {
  const res = await reqFansList(userStore.userInfo.userId);
  if (res.code == 1) {
    fansList.value = res.data;
  }
};
//回关
const follow = async (i) => {
  const data = {
    userIdA: userStore.userInfo.userId,
    userIdB: i.userId,
  };
  const res = await reqFollow(data);
  if (res.code == 1) {
    //将其改成已关注
    getFansList()
    ElMessage.success("关注成功");
  } else {
    ElMessage({
      message: res.msg,
      type: "error",
    });
  }
};
const toUser = (i) => {
  $router.push({
    path: "/account/heart", query: {
      userId: i.userId
    }
  });
}
onMounted(() => {
  getFansList();
});
</script>

<style lang="scss" scoped>
.fans {
  margin-top: 10px;

  h1 {
    font-size: 16px;
    color: #666;
    margin-left: 10px;
  }

  .fanslist {
    margin-top: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f2;
    padding: 0 10px 10px 10px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .name {
      font-size: 18px;
      margin: 0 5px 0 15px;
    }

    .guan {
      font-size: 14px;
      color: #666;
    }

    .time {
      font-size: 14px;
      color: #666;
      margin-left: 10px;
    }

    .btn {
      margin-left: auto;
    }
  }
}
</style>
