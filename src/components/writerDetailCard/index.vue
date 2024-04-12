<template>
  <div>
    <div class="detailCard" @mouseenter="openAll = true" @mouseleave="openAll = false">
      <div class="img">
        <!-- <img :src="AllText.image" alt="" /> -->
        <el-image :src="AllText.image">
          <template #error>
            <div class="image-slot">
              <span>加载失败</span>
              <el-icon size="50" class="icon"><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
        <div class="era">{{ AllText.dynasty }}</div>
      </div>
      <div class="text">
        <h1 class="title">{{ AllText.writer }}</h1>
        <p>{{ AllText.intro }}</p>
        <el-button type="primary" @click="goDetail" class="btn" v-if="openAll">{{ btnText }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ref } from 'vue'
let openAll = ref(false)
let goDetail = () => { }
let props = defineProps({
  btnText: {
    type: String,
    default: '展开全文'
  },
  AllText: {
    type: Array,
    default: []
  }
})
</script>

<style lang="scss" scoped>
.detailCard {
  width: 900px;
  height: 220px;
  background-color: #fff;
  border-radius: 20px;
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
  transition: 0.5s all;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .1);
  }

  .img {
    width: 200px;
    height: 100%;
    // background-color: pink;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .image-slot {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        color: #c9c7c7;
      }

      .icon {
        color: #c9c7c7;
      }
    }

    img {
      width: 200px;
      height: 90%;
    }

    .era {
      position: absolute;
      top: 20px;
      left: 20px;
      padding: 7px;
      border-radius: 5px;
      background-color: rgb(184, 10, 10);
      color: #fff;
      font-size: 12px;
    }
  }

  .text {
    width: 620px;
    height: 100%;
    position: relative;

    .title {
      font-size: 20px;
      font-weight: bold;
      padding: 10px 0;
    }

    p {
      padding: 5px;
      line-height: 25px;
      font-size: 15px;
      color: #797474;
      //溢出隐藏
      display: -webkit-box;
      -webkit-line-clamp: 4; //显示3行
      -webkit-box-orient: vertical;
      // white-space: nowrap; /* 保持文本在一行内 */
      overflow: hidden;
      /* 隐藏溢出的文本 */
      text-overflow: ellipsis;
      /* 使用省略号表示溢出的文本 */
      // width: 100%; /* 设置容器宽度，可以根据需要调整 */
    }

    .btn {
      position: absolute;
      top: 70%;
      right: -19px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>
