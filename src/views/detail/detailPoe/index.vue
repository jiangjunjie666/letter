<template>
  <!-- 诗词详情 -->
  <div class="detailPoe">
    <el-card class="left">
      <!-- 朗读的按钮 -->
      <div class="btnList">

        <el-tooltip class="box-item" effect="dark" content="朗读" placement="top-start">
          <img src="@/assets/语音朗读.svg" alt="" @click="speak">
        </el-tooltip>
      </div>
      <div class="title">
        <ruby class="char" v-for="i in head" :key="i.text">
          {{ i.text }}
          <rp>（</rp>
          <rt>{{ i.pinyin }}</rt>
          <rp>）</rp>
        </ruby>
      </div>
      <div class="basic">
        <div class="dynasty">{{ detailData.dynasty }}</div>
        <span>·</span>
        <div class="writer">{{ detailData.writer }}</div>
      </div>
      <div class="text">
        <p v-for="(i, index) in textArrWithPinyin" :key="index">
          <!-- <ruby class="char" v-for="j in i">
            {{ j.text }}
            <rp>（</rp>
            <rt v-if="j.pinyin !== '，'">{{ j.pinyin }}</rt>
            <rp>）</rp>
          </ruby> -->
        <div class="char" v-for="j in i" :key="j">
          <div class="pinyin" :class="{ no: j.pinyin == '，' }">{{ j.pinyin }}</div>
          <div class="text">{{ j.text }}</div>
        </div>
        </p>
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
          <li @click="goDetail(i)" v-for="i in recommendedList" :key="i.id">{{ i.head }}</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { reqGetWriterPoetry } from '@/api/module/writer'
import { useRoute, useRouter } from "vue-router";
import { reqGetPoetryDetail } from "@/api/module/poetry";
import { pinyin } from 'pinyin-pro';
const $route = useRoute();
const $router = useRouter();
const head = ref()
let detailData = ref({
  head: "",
  text: "",
  dynasty: "",
  writer: "",
  image: "",
  writerDetail: "",
  backdrop: "111",
});
//监听路由中的query参数变化
watch($route, () => {
  getPoetryDetail();
})
//推荐诗词
const recommendedList = ref([]);
//利用计算属性计算出诗歌的断句
const textArrWithPinyin = computed(() => {
  let arr = addPinyin2()
  console.log(arr);
  let newarr = []
  let temp = []
  arr.forEach((item) => {
    item.text.map((text, index) => {
      temp.push({
        text: text,
        pinyin: item.pinyin[index]
      })
    })
    newarr.push(temp)
    temp = []
  })
  console.log(newarr);
  return newarr
});

//整合拼音第二步
const addPinyin2 = () => {
  let arr = detailData.value.text.split(/[。！？；：]/);
  arr = arr.filter((item) => item.trim() !== "");
  return arr.map((text) => {
    return {
      text: text.split(''),
      pinyin: addPinyin(text)
    };
  });
}
const addPinyin = (text) => {
  const pinyinArray = pinyin(text, { segment: true, type: 'array' });
  // 假设每个句子只有一个词，这里简单地取每个数组的第一个元素
  return pinyinArray.map((sentence) => sentence);
};

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
  //将头部切割成数组
  detailData.value.headArr = detailData.value.head.split("");
  detailData.value.headPin = pinyin(detailData.value.head, { segment: true, type: 'array' });
  head.value = detailData.value.headArr.map((i, index) => {
    return {
      text: i,
      pinyin: detailData.value.headPin[index],
    }
  })
  getWriter()
};
//获取推荐诗词
const getWriter = async () => {
  const res = await reqGetWriterPoetry(detailData.value.writer)
  if (res.code == 1) {
    recommendedList.value = res.data
  }
}
const speak = () => {
  // 创建一个新的SpeechSynthesisUtterance对象
  const utterance = new SpeechSynthesisUtterance();
  // 设置语音合成的回调函数
  utterance.onend = function (event) {
    console.log('Finished speaking.');
  };
  //合成朗读的文本
  // let text =
  // 设置要朗读的文本
  utterance.text = `${detailData.value.head}，${detailData.value.dynasty},${detailData.value.writer},${detailData.value.text}`
  // 朗读文本
  speechSynthesis.speak(utterance);
}
const goDetail = (i) => {
  $router.push({ path: '/detail/poetry', query: { id: i.id } })
}
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
    position: relative;

    .btnList {
      position: absolute;
      top: 10px;
      right: 10px;

      img {
        cursor: pointer;
      }
    }
  }

  .titlePin {
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 5px;
  }

  .title {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    //文字之间的间隔
    letter-spacing: 5px;

    .char {
      position: relative;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-content: space-between;
      height: 3.5rem;
      font-size: 2.5rem;
      line-height: 1;

      rt {
        position: absolute;
        top: 0;
        font-family: ui-serif, Georgia, Cambria, Times New Roman, Times, serif;
        font-size: 1rem;
        font-weight: 300;
        line-height: .5rem;
        color: #747475;
        letter-spacing: 1px;
      }
    }
  }

  .basic {
    display: flex;
    margin: 10px 0 20px 0;
    font-size: 16px;
    color: #444343;
    justify-content: center;

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
      text-align: center;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .char {

        // position: relative;
        // display: flex;
        // flex-direction: column-reverse;
        // align-items: center;
        // justify-content: space-between;
        // height: 3.5rem;
        // font-size: 1.5rem;
        // line-height: 1;
        // //文字之间的间隔
        // letter-spacing: 14px;
        // text-align: center;
        // color: #504e4e;
        display: flex;
        flex-direction: column;
        margin: 0 3px;

        .text {
          font-size: 1.5rem;
          line-height: 1;
          text-align: center;
          color: #504e4e;
        }

        .pinyin {
          font-family: ui-serif, Georgia, Cambria, Times New Roman, Times, serif;
          font-size: 14px;
          font-weight: 300;
          line-height: 2rem;
          color: #747475;
          letter-spacing: 1px;
        }

        .no {
          //透明
          opacity: 0;
        }

        rt {
          position: absolute;
          top: 0;
          font-family: ui-serif, Georgia, Cambria, Times New Roman, Times, serif;
          font-size: 14px;
          font-weight: 300;
          line-height: 2rem;
          color: #747475;
          letter-spacing: 0px;
        }
      }
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
  height: 200px;
  // overflow-y: auto;

  //下拉样式
  // ::-webkit-scrollbar {
  //   width: 5px;
  //   height: 5px;
  //   background-color: #f5f5f5;
  // }

  // ::-webkit-scrollbar-thumb {
  //   border-radius: 10px;
  //   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  //   background-color: #555;
  // }

  .recommended {
    @extend .common-styles;
  }

  .related {
    padding-top: 20px;
    @extend .common-styles;
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
