<template>
  <!-- 诗词详情 -->
  <div class="detailPoe">
    <el-card class="left">
      <div class="title">{{ detailData.head }}</div>
      <div class="basic">
        <div class="dynasty">朝代：{{ detailData.dynasty }}</div>
        <span>|</span>
        <div class="writer">作者：{{ detailData.writer }}</div>
      </div>
      <div class="text">
        <p v-for="(item, index) in textArr" :key="index">{{ item }} {{ "。" }}</p>
      </div>
      <!-- 背景 -->
      <div class="backdroP">
        <div class="backdropTitle">古诗背景</div>
        <el-divider />
        <div class="backdropText" v-if="detailData.backdrop">
          {{ detailData.backdrop }}
        </div>
        <el-empty description="暂无此诗背景资料" v-if="!detailData.backdrop" />
      </div>
      <!-- 翻译 -->
      <div class="explain">
        <div class="explainTitle">译文</div>
        <el-divider />
        <div class="explainText" v-if="detailData.explain">
          {{ detailData.explain }}
        </div>
        <el-empty description="暂无此诗译文" v-if="!detailData.explain" />
      </div>
      <!-- 作者简介 -->
      <div class="author">
        <div class="authorTitle">作者简介</div>
        <el-divider />
        <div class="authorText">
          <img :src="detailData.image" alt="" v-if="detailData.writerDetail" />
          <p>
            {{ detailData.writerDetail }}
          </p>
          <el-empty description="暂无此作者简介资料" v-if="!detailData.writerDetail" />
        </div>
      </div>
    </el-card>
    <el-card class="right">
      <div class="recommended">
        <h1>推荐诗词</h1>
        <el-divider style="margin: 10px 0" />
        <ul>
          <li v-for="i in 5">静夜思</li>
        </ul>
      </div>
      <div class="related">
        <h1>相关诗词</h1>
        <el-divider style="margin: 10px 0" />
        <ul>
          <li v-for="i in 5">静夜思</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { reqGetPoetryDetail } from "@/api/module/poetry";
const $route = useRoute();
console.log($route);
let detailData = ref({
  head: "",
  text: "",
  dynasty: "",
  writer: "",
  image: "",
  writerDetail: "",
  backdrop: "111",
});

//利用计算属性计算出诗歌的断句
const textArr = computed(() => {
  let arr = detailData.value.text.split(/[。！？；：]/); //根据标点符号切割
  arr = arr.filter((arr) => arr.trim() !== "");
  return arr;
});

//获取详情页的数据
const getPoetryDetail = async () => {
  const res = await reqGetPoetryDetail($route.query.id);
  if (res.code !== 1) {
    getPoetryDetail();
  } else {
    detailData.value = {
      ...res.data,
    };
  }
};
onMounted(() => {
  getPoetryDetail();
});
</script>

<style lang="scss" scoped>
.detailPoe {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;

  .left {
    width: 70%;

    .title {
      font-size: 30px;
      font-weight: bold;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }

    .basic {
      display: flex;
      margin: 10px 0 20px 0;
      font-size: 16px;
      color: #444343;

      .dynasty {}

      .writer {}

      span {
        padding: 0 10px;
      }
    }

    .text {
      p {
        //让其二个p之后再换行
        margin: 18px 0;
        font-size: 20px;
        font-family: sans-serif;
        font-weight: 550;
      }
    }

    .backdroP {
      margin-top: 40px;

      .backdropTitle {
        font-size: 20px;
        color: red;
      }

      .backdropText {
        line-height: 30px;
        //首行缩进
        text-indent: 2em;
      }
    }

    .explain {
      padding-top: 20px;

      .explainTitle {
        font-size: 20px;
        color: red;
      }

      .explainText {
        line-height: 30px;
        //首行缩进
        text-indent: 2em;
      }
    }

    .author {
      padding-top: 20px;

      .authorTitle {
        font-size: 20px;
        color: red;
      }

      .authorText {
        overflow: hidden;

        /* 清除浮动 */
        img {
          width: 130px;
          height: 170px;
          float: left;
          /* 图片浮动到左侧 */
          margin-right: 10px;
          /* 可根据需要调整图片和文本之间的间距 */
        }

        p {
          text-indent: 2em;
          line-height: 25px;
          // padding-right: 20px;
        }
      }
    }
  }

  .right {
    width: 26%;
    height: 400px;

    .recommended {
      @extend .common-styles;
    }

    .related {
      padding-top: 20px;
      @extend .common-styles;
    }
  }
}

.common-styles {
  h1 {
    font-size: 20px;
  }

  ul {
    li {
      padding: 5px 10px;
    }

    li:hover {
      cursor: pointer;
      background-color: #dad5d5;
    }
  }
}
</style>
