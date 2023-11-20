<template>
  <!-- 诗词详情 -->
  <div class="detailPoe">
    <el-card class="left">
      <div class="title">静夜思</div>
      <div class="basic">
        <div class="dynasty">朝代：唐朝</div>
        <span>|</span>
        <div class="writer">作者：李白</div>
      </div>
      <div class="text">
        <p v-for="(item, index) in textArr" :key="index">{{ item }} {{ index % 2 == 0 ? '，' : '。' }}</p>
      </div>
      <!-- 背景 -->
      <div class="backdroP">
        <div class="backdropTitle">古诗背景</div>
        <el-divider />
        <div class="backdropText">
          《泊船瓜洲》是北宋诗人王安石创作的一首七言绝句。其中名句“春风又绿江南岸，明月何时照我还”千百年来一直为人所传颂。诗中“绿”字将无形的春风化为鲜明的形象，极其传神。
          从字面上看，该诗是流露着对故乡的怀念之情，大有急欲飞舟渡江回家和亲人团聚的愿望，其实在字里行间也寓着他重返政治舞台、推行新政的强烈欲望。
        </div>
      </div>
      <!-- 翻译 -->
      <div class="explain">
        <div class="explainTitle">译文</div>
        <el-divider />
        <div class="explainText">京口和瓜洲之间只隔着一条长江，我所居住的钟山隐没在几座山峦的后面。暖和的春风啊，吹绿了江南的田野，明月什么时候才能照着我回到钟山下的家里？</div>
      </div>
      <!-- 作者简介 -->
      <div class="author">
        <div class="authorTitle">作者简介</div>
        <el-divider />
        <div class="authorText">
          <img src="@/assets/pexels-shonejai-1227511 (1).jpg" alt="" />
          <p>
            王安石（1021年12月18日－1086年5月21日），字介甫，号半山，汉族，临川（今江西抚州市临川区）人，北宋著名的思想家、政治家、文学家、改革家。
            庆历二年（1042年），王安石进士及第，历任扬州签判、鄞县知县、舒州通判等职，政绩显著。熙宁二年（1069年），任参知政事，次年拜相，主持变法。因守旧派反对，熙宁七年（1074年）罢相。一年后，宋神宗再次起用，旋又罢相，退居江宁。元祐元年（1086年），保守派得势，新法皆废，郁然病逝于钟山（今江苏南京），谥号“文”，故世称王文公。
            王安石潜心研究经学，著书立说，被誉为“通儒”，创“荆公新学”，促进宋代疑经变古学风的形成。哲学上，用“五行说”阐述宇宙生成，丰富和发展了中国古朴素唯物主义思想；其哲学命题“新故相除”，把中国古代辩证法推到一个新的高度。
            王安石在文学中具有突出成就。其散文论点鲜明、逻辑严密，有很强的说服力，充分发挥了古文的实际功用；短文简洁峻切、短小精悍，名列“唐宋八大家”。其诗“学杜得其瘦硬”，擅长于说理与修辞，晚年诗风含蓄深沉、深婉不迫，以丰神远韵的风格在北宋诗坛自成一家，世称“王荆公体”。有《王临川集》、《临川集拾遗》等存世。
          </p>
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
import { ref, computed } from 'vue'

let text = ref('京口瓜洲一水间，钟山只隔数重山。 春风又绿江南岸，明月何时照我还。')

//利用计算属性计算出诗歌的断句
const textArr = computed(() => {
  let arr = text.value.split(/[，。！？；：]/) //根据标点符号切割
  arr = arr.filter((arr) => arr.trim() !== '')
  return arr
})
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
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    .basic {
      display: flex;
      margin: 10px 0 20px 0;
      font-size: 16px;
      color: #444343;
      .dynasty {
      }
      .writer {
      }
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
        overflow: hidden; /* 清除浮动 */
        img {
          width: 130px;
          height: 170px;
          float: left; /* 图片浮动到左侧 */
          margin-right: 10px; /* 可根据需要调整图片和文本之间的间距 */
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
