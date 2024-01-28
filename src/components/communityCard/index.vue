<template>
  <div class="communityCard">
    <div class="top">
      <div class="avatar">
        <!-- 发布者头像 -->
        <img :src="communityList.image" alt="" />
      </div>
      <!-- 发布者id -->
      <div class="userId">{{ communityList.name }}</div>
    </div>
    <!-- 计算出发布时间 -->
    <div class="time">{{ getIntervalTime(communityList.createTime) }}</div>
    <div class="text">
      <div class="tag">
        <span class="tagspan" v-for="i in tagList" :key="i">#{{ i }}#</span>
        <span class="tagtext">{{ communityList.context }}</span>
      </div>
      <!-- 图片墙 -->
      <div class="imgList">
        <el-image style="width: 100px; height: 100px" :key="i" v-for="i in communityList.images" :src="i" :zoom-rate="1.2"
          :max-scale="7" :min-scale="0.2" :preview-src-list="communityList.images" :initial-index="4" fit="cover" />
      </div>
      <!-- 等人赞过 -->
      <div class="praise" @click="showLikeList">
        <div class="praiseAvatar">
          <!-- 图片列表 -->
          <img :src="i.image" v-for="i in likeList" :key="i.userId" />
        </div>
        <p class="praiseText">等人赞过</p>
      </div>
      <!-- 点赞详情页码 -->
      <el-dialog v-model="dialogVisibleLikeList" title="点赞详情" width="30%" :before-close="handleClose">
        <div v-for="i in likeList" :key="i.userId">
          <div class="likeListCard">
            <img :src="i.image" alt="" />
            <h1>{{ i.name }}</h1>
            <el-button type="primary" class="likebtn" v-if="i.userId != userStore.userInfo.userId">关注</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <el-divider style="margin: 24px 0 10px 0" />
    <div class="buttom">
      <ul>
        <!-- 点赞 -->
        <li :class="{ active: communityList.tisLike }" @click="likeComment">
          <text class="iconfont icon-dianzan"></text>
          {{ communityList.like }}
        </li>
        <li :class="{ active: reviewOpen == true }" @click="openReview">
          <el-icon>
            <Comment />
          </el-icon>
          <span>{{ communityList.remark }}</span>
        </li>
        <li>
          <el-icon>
            <Star />
          </el-icon>{{ communityList.collect }}
        </li>
      </ul>
    </div>
  </div>
  <!-- 评论 -->
  <div class="review" v-if="reviewOpen">
    <div class="reviewNum">评论</div>
    <div class="reviewText">
      <div class="avatar">
        <img :src="userStore.userInfo.image" alt="" />
      </div>
      <div class="text">
        <el-input v-model="reviewText" class="input" maxlength="500" placeholder="Please input" show-word-limit
          type="textarea" />
      </div>
    </div>
    <el-button type="primary" class="send" @click="sendPostComment" :disabled="reviewText == ''">发送</el-button>
    <!-- 展示所有的评论 -->
    <div class="allReview">
      <div class="sort">
        <h1 :class="{ active: sortReviewActive == 'hot' }" @click="sortReviewActive = 'hot'">
          最热
        </h1>
        <h1>|</h1>
        <h1 :class="{ active: sortReviewActive == 'new' }" @click="sortReviewActive = 'new'">
          最新
        </h1>
      </div>
      <!-- 具体的评论 -->
      <div class="concreteReview" v-for="i in commentList" :key="i.id">
        <div class="header">
          <img class="headerAvatar" :src="i.image" alt="" />
          <div class="name">
            <h1>{{ i.name }}</h1>
          </div>
        </div>
        <div class="content">{{ i.context }}</div>
        <div class="other">
          <div class="time">{{ getIntervalTime(i.createTime) }}</div>
          <!-- 评论回复的点赞 -->
          <!-- 点赞 -->
          <div class="good">
            <!-- <text class="iconfont icon-dianzan"></text> -->
          </div>
        </div>
      </div>
      <!-- 底部展开更多评论 -->
      <el-button v-if="commentList.length < totalReview" class="more" @click="moreReview">查看全部{{ totalReview -
        commentList.length }}条评论</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getIntervalTime } from "@/utils/computedTime.js";
import {
  reqLikeComment,
  reqPostComment,
  reqGetComment,
  reqGetLikeList,
} from "@/api/module/community.js";
import useUserStore from "@/store/modules/user.js";
import { ElMessage } from "element-plus";
const userStore = useUserStore();
//评论区的开关
let reviewOpen = ref(false);
//评论的内容
let reviewText = ref("");
//评论的排序方式
let sortReviewActive = ref("hot");
//评论的页码
let pageReview = ref(1);
let pageSizeReview = ref(5);
//点赞的页码
let pageLike = ref(1);
let pageSizeLike = ref(3);
let likeList = ref([]);
//评论列表
let commentList = ref([]);
//评论总条数
let totalReview = ref(0);
//控制点赞详情的开关
let dialogVisibleLikeList = ref(false);
//接收父组件的数据
const props = defineProps({
  communityList: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
//接收自定义事件
const $emit = defineEmits(["changeLikeNum"]);
//点赞
const likeComment = async () => {
  //先判断是否已经点赞
  let talksLikeDTO = {
    tid: props.communityList.tid,
    userId: userStore.userInfo.userId,
  };
  let res = await reqLikeComment(talksLikeDTO);
  if (res.code != 1) {
    return ElMessage({
      type: "warning",
      message: "已经点过赞了",
    });
  }
  ElMessage({
    type: "success",
    message: "点赞成功",
  });
  //自定义事件通知父组件修改点赞数
  $emit("changeLikeNum", props.communityList.id);
};

//打开评论
const openReview = () => {
  reviewOpen.value = !reviewOpen.value;
  getComment();
};
//发布评论
const sendPostComment = async () => {
  let res = await reqPostComment(
    reviewText.value,
    props.communityList.tid,
    userStore.userInfo.userId
  );
  if (res.code !== 1) {
    return ElMessage({
      type: "error",
      message: "发布评论失败",
    });
  }
  ElMessage({
    type: "success",
    message: "发布评论成功",
  });
  commentList.value.push({
    name: userStore.userInfo.name,
    image: userStore.userInfo.image,
    context: reviewText.value,
    createTime: new Date().getTime(),
  });
  reviewText.value = "";
};
//获取所有的评论
const getComment = async () => {
  let res = await reqGetComment(
    props.communityList.tid,
    pageReview.value,
    pageSizeReview.value
  );
  console.log(res);
  if (res.code !== 1) {
    return ElMessage({
      type: "error",
      message: "获取评论失败",
    });
  }
  if (pageReview.value == 1) {
    commentList.value = res.data.records;
  } else {
    for (let i = 0; i < res.data.records.length; i++) {
      commentList.value.push(res.data.records[i]);
    }
  }
  // commentList.value = res.data.records;
  totalReview.value = res.data.total;
};

//查看更多评论
const moreReview = () => {
  pageReview.value++;
  if (pageReview.value <= totalReview.value) {
    getComment();
  }
};
//获取点赞列表
const getLikeList = async () => {
  let res = await reqGetLikeList(
    props.communityList.tid,
    pageLike.value,
    pageSizeLike.value
  );
  if (res.code != 1) {
    return ElMessage({
      type: "error",
      message: "获取点赞列表失败",
    });
  }
  likeList.value = res.data;
};
//展示所有的点赞人数
const showLikeList = () => {
  dialogVisibleLikeList.value = true;
};
//计算出tag列表
const tagList = computed(() => {
  return props.communityList.label.split(",").filter(Boolean);
});

onMounted(() => {
  getLikeList();
});
</script>

<style lang="scss" scoped>
.communityCard {
  margin-top: 10px;
  width: 100%;
  // height: 100px;
  background-color: #fff;

  .top {
    display: flex;
    align-items: center;

    .avatar {
      margin: 10px 0 0 10px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .userId {
      margin-left: 10px;
    }
  }

  .time {
    margin-left: 60px;
    font-size: 14px;
    color: #999;
  }

  .text {
    margin: 10px 0 0 60px;

    .tag {
      .tagspan {
        color: #529dff;
        font-size: 14px;
        padding-right: 5px;
      }

      .tagtext {
        width: 600px;
        font-size: 15px;
        margin-top: 5px;
        line-height: 20px;
        padding-left: 5px;
      }
    }

    .imgList {
      width: 320px;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      img {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
      }
    }

    .praise {
      width: 150px;
      height: 30px;
      // background-color: pink;
      //靠右边
      margin-left: auto;
      display: flex;
      align-items: center;

      &:hover {
        cursor: pointer;
      }

      .praiseAvatar {
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin-left: -5px;
        }
      }

      .praiseText {
        float: left;
        font-size: 14px;
        color: #999;
        padding-left: 5px;
      }
    }

    .likeListCard {
      display: flex;
      align-items: center;
      margin: 5px 0;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 20px 0 10px;
      }

      h1 {
        font-size: 20px;
        // margin-right: 200px;
      }

      .likebtn {
        //靠右
        margin-left: auto;
      }
    }
  }

  .buttom {
    padding-bottom: 10px;

    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;

        &:hover {
          cursor: pointer;
          //修改颜色
          color: #4596ff;
        }

        &.active {
          color: #4596ff;
        }
      }
    }
  }
}

.review {
  width: 100%;
  background-color: #fff;

  .reviewNum {
    padding: 10px 0 0 10px;
    font-size: 18px;
  }

  .reviewText {
    display: flex;

    .avatar {
      width: 40px;
      height: 40px;
      margin: 20px 0 0 10px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .text {
      width: 90%;
      margin: 20px 0 0 16px;
      font-size: 14px;
    }
  }

  .send {
    //靠右
    display: flex;
    margin: 10px 20px 0 auto;
  }

  .allReview {
    .sort {
      display: flex;
      margin: 0 0 0 10px;

      h1 {
        font-size: 16px;
        color: #999999;
        padding: 0 5px;

        &:hover {
          color: #4596ff;
          cursor: pointer;
        }

        &.active {
          color: #4596ff;
        }
      }
    }

    .concreteReview {
      padding-bottom: 20px;

      .header {
        margin: 20px 0 0 10px;
        display: flex;
        align-items: center;

        .headerAvatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .name {
          h1 {
            margin-left: 10px;
          }
        }
      }

      .content {
        margin: 10px 0 0 50px;
      }

      .other {
        display: flex;
        align-items: center;
        margin: 10px 0 0 50px;

        .time {
          font-size: 12px;
          color: #999;
          margin-right: 10px;
        }

        .good {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

  .more {
    padding: 0 40%;
    background-color: #f2f3f5;
    //去除边框
    border: none;
    margin-bottom: 20px;
    margin-left: 25px;
  }
}
</style>
