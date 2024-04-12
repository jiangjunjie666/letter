<template>
  <div class="fans" v-if="fansList.length > 0">
    <h1>共有{{ total }}条数据</h1>
    <div class="fanslist" v-for="i in fansList" :key="i">
      <img :src="i.likeUserImage" alt="" />
      <p class="name">{{ i.likeUserName }}</p>
      <p class="guan">赞了你的动态</p>
      <p class="time">{{ i.likeTime }}</p>
    </div>
  </div>
  <el-empty v-else></el-empty>
</template>

<script setup>
import { reqLikeList } from "@/api/module/user.js";
import { ref, onMounted } from "vue";
import useUserStore from "@/store/modules/user";
const pageNum = ref(1);
const pageSize = ref(5);
const total = ref(0);
const userStore = useUserStore();
//获取粉丝列表
const fansList = ref([]);
const getFansList = async () => {
  const res = await reqLikeList(pageNum.value, pageSize.value, userStore.userInfo.userId);
  if (res.code == 1) {
    fansList.value = res.data;
    total.value = res.total
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
    margin-left: 10px;
  }

  .fanslist {
    margin-top: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f2;
    // padding-bottom: 10px;
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

    .btn {
      margin-left: auto;
    }

    .time {
      margin-left: auto;
      color: #666;
    }
  }
}
</style>
