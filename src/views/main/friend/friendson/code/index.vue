<template>
  <div class="code">
    <div class="left">
      <div class="search">
        <el-input placeholder="搜索联系人" v-model="input" :suffix-icon="Search"></el-input>
      </div>
      <div class="friend-list" v-for="i in 10" :key="i" :class="{ last: i == 9, active: i == 1 }">
        <img src="@/assets/1.jpg" alt="" />
        <div class="name">小智</div>
        <div class="cate">好友</div>
        <!-- <div class="cate">已关注</div>
        <div class="cate">粉丝</div> -->
        <div class="time">14:26</div>
      </div>
    </div>
    <div class="right">
      <el-empty description="暂未选择联系人" v-if="activeIndex == -1" class="empty"></el-empty>
    </div>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
const activeIndex = ref(-1);
</script>

<style lang="scss" scoped>
.code {
  display: flex;
  width: 100%;

  .left {
    width: 30%;
    height: 700px;
    border-right: 1px solid #d4d4d6;
    display: flex;
    flex-direction: column;

    .search {
      margin: 10px;
    }

    .friend-list {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #d4d4d6;

      &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
      }

      &.last {
        border: none;
      }

      &.active {
        background-color: #f5f5f5;
      }

      // 最后一个元素无下划线

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .name {
        font-size: 16px;
        margin: 0 5px;
      }

      .cate {
        border-radius: 5px;
        background-color: #e0dbdb;
        font-size: 14px;
        padding: 3px;
      }

      .time {
        margin-left: auto;
        color: #b4b2b2;
      }
    }
  }

  .right {
    width: 70%;
    height: 700px;

    .empty {
      margin-top: 200px;
    }
  }
}
</style>
