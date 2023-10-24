<template>
  <div>
    <div class="detailCard" @mouseenter="openAll = true" @mouseleave="openAll = false">
      <div class="img">
        <img src="@/../public/coffee-6249312.jpg" alt="" />
        <div class="era">唐朝</div>
      </div>
      <div class="text">
        <h1 class="title">《氓》诗经原文注释翻译赏析</h1>
        <p>作品简介《国风·卫风·氓》是中国古代第一部诗歌总集《诗经》中的一首诗。这是一首弃妇自诉婚姻悲剧的长诗。诗中的女主人公以无比沉痛的口气，回忆了恋爱生活的甜蜜，以及婚后被丈夫虐待和遗弃的痛苦。全诗六章，每...</p>
        <div class="time">2019年3月28日</div>
        <el-button type="primary" @click="goDetail" class="btn" v-if="openAll">展开全文</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
let openAll = ref(false)
let goDetail = () => {}
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
    box-shadow: 1px 2px 3px 4px #d1cdcd;
  }
  .img {
    width: 200px;
    height: 100%;
    // background-color: pink;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
    }
    .time {
      margin: 50px;
      font-size: 15px;
      color: #797474;
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
