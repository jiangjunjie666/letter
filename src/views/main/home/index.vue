<template>
  <div class="container">
    <!-- 轮播图 -->
    <div class="banner">
      <div class="banner-cen">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in poetryList1" :key="item.id" @click="goDetail(item)">
            <img :src="item.image" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="commend">
      <div class="left">
        <!-- 今日推荐 -->
        <div class="today-recomme">
          <h1>今日推荐诗词</h1>
          <div class="card">
            <ProtryDetailCard v-for="(item, index) in poetryList1" :AllText="item" @click="goDetail(item)" :key="index">
            </ProtryDetailCard>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 热榜 -->
        <div class="win-commend">
          <h1>今日热榜诗词</h1>
          <div class="item" v-for="i in poetryList2" :key="i.id" @click="goDetail(i)">
            <el-icon color="red">
              <CaretTop />
            </el-icon>
            <span>{{ i.head }}</span>
          </div>
        </div>
        <!-- 推荐关注 -->
        <div class="atten-commend">
          <h1>推荐关注</h1>
          <div class="item" v-for="i in recommendList" :key="i.name">
            <img :src="i.image" alt="" />
            <div class="resource">
              <p>{{ i.name }}</p>
            </div>
            <el-button class="btn" @click="follow(i)" v-show="!i.careFor">关注</el-button>
            <el-button class="btn" v-show="i.careFor">已关注</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reqGetPoetryList } from "@/api/module/poetry";
import { reqGetRecommendAuthor } from "@/api/module/home";
import { reqFollow } from "@/api/module/user";
import { ref, onMounted } from "vue";
import ProtryDetailCard from "@/components/poetryDetailCard/index.vue";
import { useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";
import { ElMessage } from "element-plus";
const userStore = useUserStore();
const $router = useRouter();
const poetryList1 = ref([]);
const poetryList2 = ref([]);
const recommendList = ref([]);

//获取推荐作者
const getRecommendAuthor = async () => {
  //随机生成page和pageSize
  let page = Math.floor(Math.random() * 20);
  let pageSize = 5;
  let res = await reqGetRecommendAuthor(1, pageSize, userStore.userInfo.userId);
  if (res.code !== 1) {
    getRecommendAuthor();
  } else {
    recommendList.value = res.data;
  }
};
const getPoetryList = async () => {
  const ip = import.meta.env.VITE_IP;
  const pageSize = 5;
  const page = Math.floor(Math.random() * 20);
  let res = await reqGetPoetryList("", "", ip, page, pageSize, "", "");
  if (res.code !== 1) {
    getPoetryList();
  } else {
    return res.data.records;
  }
};

//关注
const follow = async (item) => {
  const data = {
    userIdA: userStore.userInfo.userId,
    userIdB: item.userId,
  };
  const res = await reqFollow(data);
  if (res.code == 1) {
    //将其修改为已经关注
    recommendList.value.forEach((i) => {
      if (i.userId == item.userId) {
        i.careFor = true;
      }
    });
    ElMessage({
      type: "success",
      message: "关注成功",
      duration: 1000,
    });
  } else {
    ElMessage({
      type: "error",
      message: res.msg,
    });
  }
};
//跳转至详情页
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
onMounted(() => {
  getPoetryList().then((res) => {
    poetryList1.value = res;
  });

  getPoetryList().then((res) => {
    poetryList2.value = res;
  });

  getRecommendAuthor();
});
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 340px;
  background-color: $bgcColor;

  .banner-cen {
    padding-top: 10px;
    width: 1400px;
    margin: 0 auto;
  }
}

.commend {
  display: flex;
  justify-content: space-between;

  .left {
    width: 920px;
    // height: 1050px;
    background-color: #fff;
    border-radius: 1em;
    margin-bottom: 20px;

    .today-recomme {
      h1 {
        font-size: 2em;
        color: #99a9bf;
        padding: 10px;
      }

      .card {
        margin-left: 10px;
      }

      .item {
        display: flex;
        padding: 5px;
        width: 98%;
        margin: 5px auto;
        transition: 0.3s all;

        &:hover {
          cursor: pointer;
          box-shadow: 1px 1px 10px #99a9bf;
          transform: scale(1.01);
        }

        img {
          width: 300px;
          height: 200px;
          margin: 10px 0 0 20px;
        }

        h2 {
          font-size: 25px;
          margin: 10px 0 0 20px;
        }

        h3 {
          font-size: 20px;
        }

        p {
          font-size: 18px;
          color: #333;
          line-height: 30px;
          margin: 20px 20px 0 30px;
        }

        .item-bottom {
          padding: 40px 0 0 20px;
          display: flex;

          .time {
            margin: 0 100px 0 10px;
          }

          .icon {
            margin: 0 10px 0 10px;
            display: flex;

            .icon-item {
              display: flex;
              margin: 0 10px;

              &:hover {
                color: #ff6767;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .today-post {
      display: flex;
      flex-wrap: wrap;

      .post-card {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 20px 0 0 20px;
        padding: 20px;
        max-width: 300px;
        overflow: hidden;
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.05);
          cursor: pointer;
        }

        .post-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .post-author-avatar {
            max-width: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }

          .post-author {
            color: #777;
          }
        }

        .post-title {
          font-size: 20px;
          color: #333;
          margin-bottom: 10px;
        }

        .post-summary {
          font-size: 16px;
          color: #555;
          margin-bottom: 10px;
        }

        .post-stats {
          display: flex;
          justify-content: space-between;

          p {
            font-size: 14px;
            color: #777;
            display: flex;
          }
        }
      }
    }
  }

  .right {
    background-color: #fff;
    width: 380px;
    height: 600px;
    border-radius: 1em;

    .win-commend {
      margin-bottom: 10px;

      // border: 1px solid #f7f4f4;
      h1 {
        font-size: 20px;
        padding: 5px 0 10px 5px;
        border: 1px solid #f7f4f4;
      }

      .item {
        padding: 8px;

        span {
          white-space: nowrap;
          /* 防止文本换行 */
          overflow: hidden;
          /* 隐藏超出部分的文本 */
          text-overflow: ellipsis;
          /* 显示省略号 */
          max-width: 100%;
          /* 可以根据需要设置最大宽度 */
          display: inline-block;
          margin-left: 10px;

          /* 使省略号在文本内行内显示 */
          &:hover {
            color: #1cb1d6;
            cursor: pointer;
            transform: scale(1.01);
          }
        }
      }
    }

    .atten-commend {
      margin-top: 20px;
      padding-bottom: 10px;

      // border: 1px solid #f7f4f4;
      h1 {
        font-size: 20px;
        padding: 5px 0 10px 5px;
      }

      .item {
        width: 90%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        transition: 0.3s all;

        &:hover {
          transform: scale(1.05);
          cursor: pointer;
          box-shadow: 1px 1px 1px 3px rgba(192, 187, 187, 0.2);
        }

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-top: 9px;
        }

        .resource {
          padding: 8px;

          p {
            padding: 4px;
          }
        }

        .btn {
          margin-left: auto;
          margin-right: 10px;
        }
      }
    }
  }
}

.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
