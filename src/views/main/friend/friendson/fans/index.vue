<template>
  <div class="fans" v-if="fansList.length > 0">
    <h1>共有{{ fansList.length }}个粉丝</h1>
    <div class="fanslist" v-for="i in fansList" :key="i">
      <img :src="i.image" alt="" />
      <p class="name">{{ i.name }}</p>
      <p class="guan">关注了你</p>
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
    userAId: userStore.userInfo.userId,
    userBId: i.userId,
  };
  const res = await reqFollow(data);
  if (res.code == 1) {
    ElMessage.success("关注成功");
  } else {
    ElMessage.error("关注失败");
  }
};
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
  }

  .fanslist {
    margin-top: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f2;
    padding-bottom: 10px;

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

    .btn {
      margin-left: auto;
    }
  }
}
</style>
