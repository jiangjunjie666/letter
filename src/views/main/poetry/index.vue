<template>
  <div class="container">
    <div class="left">
      <div class="detail">
        <div class="title">古诗词大全分类</div>
        <DetailItem></DetailItem>
        <DetailItem></DetailItem>
        <DetailItem :shamdT="false"></DetailItem>
      </div>
      <ProtryDetailCard v-for="i in 10"></ProtryDetailCard>
    </div>
    <div class="right">
      <div class="recomm">
        <NewCard></NewCard>
        <NewCard title="相关文章"></NewCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import DetailItem from '@/component/detailItem/index.vue'
import ProtryDetailCard from '@/component/poetryDetailCard/index.vue'
import NewCard from '@/component/newCard/index.vue'
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
  .detail {
    width: 900px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 1px 2px 3px 4px #e2e2e2;
    .title {
      font-size: 25px;
      padding: 20px 0 10px 0px;
      width: 95%;
      margin: 0 auto;
      border-bottom: 2px dashed var(--el-border-color);
    }
  }
  .recomm {
    margin-bottom: 20px;
  }
}
</style>
