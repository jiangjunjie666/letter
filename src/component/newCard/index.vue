<template>
  <div>
    <div class="new">
      <div class="title">
        <el-icon class="icon"><Calendar /></el-icon>
        <h1>{{ title }}</h1>
      </div>
      <div class="newList">
        <li v-for="i in 10">
          <a href="#"></a>
          <p>《杞人忧天》列子文言文原文注释翻译解析</p>
          <div class="time">12/29</div>
        </li>
      </div>
    </div>
  </div>
</template>

<script setup>
let props = defineProps({
  title: {
    type: String,
    default: '最新文章'
  }
})
</script>

<style lang="scss" scoped>
.new {
  width: 340px;
  // height: 400px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 1px 2px 3px 4px #e2e2e2;
  margin-bottom: 20px;
  .title {
    display: flex;
    align-items: center;
    background-color: #f8f8f8;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    .icon {
      font-size: 25px;
      margin: 10px 10px 10px 10px;
    }
    h1 {
      text-align: center;
      margin: 10px 0 10px 0;
    }
  }
  .newList {
    width: 100%;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 0;
      &:hover {
        cursor: pointer;
        color: red;
      }
      a {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #797474;
      }
      p {
        width: 80%;
        //超出隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .time {
        font-size: 14px;
        color: #797474;
        margin-left: 10px;
      }
    }
  }
}
</style>
