<template>
  <div class="community">
    <div class="communityLeft">
      <div class="banner">
        <el-carousel height="300px">
          <el-carousel-item v-for="item in 4" :key="item" indicator-position="none">
            <img src="@/../public/coffee-6249312.jpg" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="heart">
        <div class="header">
          <div class="hot" :class="{ active: activeType === 2 }" @click="getCommunityListType(2)">
            热门
          </div>
          <div class="new" :class="{ active: activeType === 1 }" @click="getCommunityListType(1)">
            最新
          </div>
          <div class="follow" :class="{ active: activeType === 3 }" @click="getCommunityListType(3)">
            关注
          </div>
        </div>
        <div class="load" v-if="loading">
          <Loading />
        </div>
        <CommunityCard v-loading="true" v-for="item in communityList" :key="item.id" :communityList="item"
          @changeLikeNum="changeLikeNum">
        </CommunityCard>
      </div>
    </div>
    <div class="communityRight">
      <div class="announcement">
        <h1>社区公告</h1>
        <p>✅发布自己传作的诗词、赏析、日常</p>
        <p>✖️引战、互撕、人身攻击等一切不良网络行为</p>
      </div>
      <div class="Member">
        <h1>相关话题</h1>
        <div class="topic" v-for="i in 5">
          <p>#李白</p>
          <i>190
            <svg t="1699271729764" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4082" width="16" height="16">
              <path
                d="M775.779 418.172l-2.051 0c-15.159 0-27.6 4.355-39.583 11.771-10.486-30.584-37.159-52.615-71.513-52.615-15.16 0-29.638 4.354-41.62 11.77-10.487-30.583-37.172-52.615-71.527-52.615-13.399 0-25.85 3.357-36.873 9.255l0-78.691c0-42.861-32.418-77.606-75.59-77.606-43.173 0-78.17 34.745-78.17 77.606l0 301.282-47.49-47.295c-30.528-30.306-84.558-25.992-110.55 0s-43.038 78.308-5.818 115.528l218.306 216.875c4.504 4.471 9.455 8.2 14.663 11.353 39.803 32.47 85.412 51.692 181.857 51.692 220.324 0 240.728-118.865 240.728-265.492L850.548 495.777C850.547 452.917 818.952 418.172 775.779 418.172zM809.403 650.988c0 124.069-0.593 224.647-199.585 224.647-84.298 0-134.907-18.796-173.246-56.858L229.904 613.455c-18.285-18.285-13.687-41.664 1.282-56.633 14.968-14.968 42.441-15.486 56.902-1.131 0 0 36.259 36.045 67.498 67.1 23.641 23.502 44.408 44.145 44.408 44.145l0-391.72c0-20.302 16.578-36.76 37.028-36.76 20.449 0 34.448 16.459 34.448 36.76l0 249.154 0.415 0c-0.27 1.32-0.415 2.685-0.415 4.085 0 11.278 9.21 20.423 20.571 20.423 11.36 0 20.57-9.144 20.57-20.423 0-1.4-0.144-2.765-0.415-4.085l0.415 0L512.611 422.257c0-20.302 14.795-36.761 35.245-36.761 0 0 36.232-0.49 36.232 36.761l0 134.787 0.415 0c-0.27 1.321-0.415 2.686-0.415 4.085 0 11.279 9.21 20.423 20.57 20.423 11.361 0 20.571-9.143 20.571-20.423 0-1.399-0.144-2.764-0.415-4.085l0.415 0 0-93.942c0-20.303 14.559-36.762 35.01-36.762 0 0 36.983 2.303 36.983 36.762l0 118.449 0.415 0c-0.269 1.32-0.415 2.686-0.415 4.085 0 11.279 9.21 20.423 20.571 20.423s20.055-9.143 20.055-20.423c0-1.399-0.136-2.765-0.392-4.085l0.392 0 0-80.872c0-20.302 15.255-36.761 35.704-36.761 0 0 35.851-1.45 35.851 36.761C809.403 500.679 809.403 617.954 809.403 650.988zM328.307 382.755l0-68.631c-6.531-14.641-10.24-30.817-10.24-47.884 0-65.037 52.723-117.76 117.76-117.76s117.76 52.723 117.76 117.76c0 8.884-1.05 17.509-2.935 25.82 14.812 0.578 28.176 6.726 37.904 16.597 3.771-13.518 5.99-27.685 5.99-42.417 0-87.658-71.062-158.72-158.72-158.72s-158.72 71.062-158.72 158.72C277.107 312.36 296.898 353.755 328.307 382.755z"
                p-id="4083"></path>
            </svg></i>
        </div>
      </div>
      <el-button type="primary" @click="$router.push('/create')">创作 / 发布动态</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { reqGetCommunityList } from "@/api/module/community.js";
import CommunityCard from "@/components/communityCard/index.vue";
import Loading from "@/components/loadingCard/index.vue";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user.js";
const userStore = useUserStore();
//记录当前选择的排列方式
let activeType = ref(2);
let $router = useRouter();
let page = ref(1);
let pageSize = ref(20);
//社区数据
let communityList = ref([]);
//加载框
let loading = ref(true);
//获取社区数据
const getCommunityList = async () => {
  const res = await reqGetCommunityList(
    page.value,
    pageSize.value,
    activeType.value,
    userStore.userInfo.userId
  );
  if (res.code !== 1) {
    return ElMessage({
      message: res.msg,
      type: "error",
      duration: 2000,
    });
  } else {
    communityList.value = res.data.records;
    loading.value = false;
  }
};
//分类数据
const getCommunityListType = (type) => {
  activeType.value = type;
  getCommunityList();
};
//接受自定义事件
const changeLikeNum = (id) => {
  //根据id遍历社区数据
  communityList.value.forEach((item) => {
    if (item.id === id) {
      item.like += 1;
      //还要将其是否点赞改为点赞
      item.tisLike = true;
    }
  });
};
onMounted(() => {
  getCommunityList();
});
</script>

<style lang="scss" scoped>
.community {
  width: 1200px;
  // background-color: pink;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  .communityLeft {
    width: 70%;

    .banner {
      width: 100%;
      height: 300px;

      img {
        width: 100%;
      }
    }

    .heart {
      margin-top: 20px;
      width: 100%;

      .header {
        display: flex;
        padding: 10px;
        background-color: #fff;
      }

      .hot {
        margin-right: 20px;
        cursor: pointer;
        padding-bottom: 10px;

        &.active {
          color: #529dff;
          border-bottom: 2px solid #529dff;
        }

        &:hover {
          color: #529dff;
        }
      }

      .new {
        margin-right: 20px;
        cursor: pointer;
        padding-bottom: 10px;

        &.active {
          color: #529dff;
          border-bottom: 2px solid #529dff;
        }

        &:hover {
          color: #529dff;
        }
      }

      .follow {
        cursor: pointer;
        padding-bottom: 10px;

        &.active {
          color: #529dff;
          border-bottom: 2px solid #529dff;
        }

        &:hover {
          color: #529dff;
        }
      }

      .load {
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .communityRight {
    width: 25%;

    .announcement {
      background-color: #fff;
      padding-bottom: 20px;

      h1 {
        padding: 20px;
        border-bottom: 1px solid #ccc;
      }

      p {
        font-size: 13px;
        padding: 10px 0 0 10px;
      }
    }

    .Member {
      margin: 20px 0;
      background-color: #fff;
      padding-bottom: 10px;

      h1 {
        padding: 20px;
        border-bottom: 1px solid #ccc;
      }

      .topic {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          padding: 5px 0 5px 10px;
          font-size: 13px;
          color: #8a8787;
        }

        i {
          font-size: 13px;
          color: #8a8787;
          padding: 5px 30px 5px 0px;

          .icon {
            //垂直居中
            vertical-align: middle;
          }
        }

        &:hover {
          cursor: pointer;
          background-color: #f5f5f5;
        }
      }
    }
  }
}
</style>
