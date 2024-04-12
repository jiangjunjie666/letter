<template>
  <div class="search">
    <el-card>
      <div class="cate">
        <div class="cate-list" :class="{ active: query.type == 'poetry' }" @click="changeType('poetry')">
          诗词</div>
        <div class="cate-list" :class="{ active: query.type == 'writer' }" @click="changeType('writer')">
          作者</div>
        <div class="cate-list" :class="{ active: query.type == 'user' }" @click="changeType('user')">用户
        </div>
      </div>
    </el-card>
    <el-card class="content">
      <el-empty v-if="dataList.length == 0"></el-empty>
      <div v-if="query.type == 'poetry'">
        <ProtryDetailCard v-for="(item, index) in dataList" :AllText="item" @click="goDetail(item)" :key="index" />
      </div>

      <div v-if="query.type == 'writer'">
        <WriterDetailCard v-for="(i, index) in dataList" btnText="阅读相关诗词" :AllText="i" :key="i.id"
          @click="goWriterDetail(i)" />
      </div>
      <div class="user" v-if="query.type == 'user'">
        <div class="list" v-for="(i, index) in dataList" :key="i.userId">
          <img :src="i.image" alt="">
          <div class="name">{{ i.name }}</div>
          <el-button type="primary" @click="toUser(i)" class="btn">进入主页</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reqGetSearchRes } from '@/api/module/search.js'
import ProtryDetailCard from "@/components/poetryDetailCard/index.vue";
import WriterDetailCard from "@/components/writerDetailCard/index.vue";
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue'
const $route = useRoute();
const $router = useRouter();
const query = ref($route.query)
const dataList = ref([])
const page = ref(1)
const pageSize = ref(5)

//监听keyword的变化
watch($route, () => {
  getSearchRes()
})
//获取搜索结果
const getSearchRes = async () => {
  const data = {
    page: page.value,
    pageSize: pageSize.value,
    index: $route.query.keyword,
    type: query.value.type
  }
  const res = await reqGetSearchRes(data)
  if (res.code == 1) {
    dataList.value = res.data
  }
}
const changeType = (val) => {
  //改变类型
  query.value.type = val
  getSearchRes()
}
const goDetail = (item) => {
  console.log(item);
  //路由跳转携带参数
  $router.push({
    path: "/detail/poetry?id=",
    query: {
      id: item.id,
    },
  });
};

const goWriterDetail = (i) => {
  router.push({
    path: "/detail/writer",
    query: {
      id: i.id,
    },
  });
};

const toUser = (i) => {
  $router.push({
    path: "/account/heart", query: {
      userId: i.userId
    }
  });
}
onMounted(() => {
  getSearchRes()
})
</script>

<style lang="scss" scoped>
.search {
  width: 1000px;
  margin: 0 auto;
  padding-top: $topHeight + 10px;

  .cate {
    display: flex;

    .cate-list {
      margin: 0 5px;
      cursor: pointer;
      font-size: 20px;
      padding-bottom: 5px;

      &.active {
        color: #409eff;
        border-bottom: 1px solid #409eff;
      }
    }
  }

  .content {
    margin-top: 10px;
  }
}

.user {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .list {
    display: flex;
    align-items: center;
    width: 45%;

    img {
      width: 50px;
      height: 50px;
    }

    .name {
      margin-left: 10px;
    }

    .btn {
      margin-left: auto;
    }
  }
}
</style>