<template>
  <div class="search">
    <el-card>
      <div class="cate">
        <div class="cate-list active">综合</div>
        <div class="cate-list">诗词</div>
        <div class="cate-list">作者</div>
        <div class="cate-list">用户</div>
      </div>
    </el-card>
    <el-card class="content">

    </el-card>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.search {
  width: 1000px;
  margin: 0 auto;
  padding-top: $topHeight + 10px;

  .cate {
    display: flex;

    .cate-list {
      margin: 0 5px;
      cursor: pointer;
      font-size: 20px;
      padding-bottom: 5px;

      &.active {
        color: #409eff;
        border-bottom: 1px solid #409eff;
      }
    }
  }

  .content {
    margin-top: 10px;
  }
}
</style>