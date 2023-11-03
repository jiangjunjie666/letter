<template>
  <div class="masterwork">
    <div class="left">
      <div class="detail">
        <div class="title">古代名著大全</div>
        <DetailItem></DetailItem>
        <DetailItem></DetailItem>
        <DetailItem :shamdT="false"></DetailItem>
      </div>
      <ProtryDetailCard v-for="i in 10" btnText="阅读文章"></ProtryDetailCard>
      <el-pagination
        class="pagination"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="  sizes, prev, pager, next, jumper,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <div class="right">
      <NewCard title="相关文章"></NewCard>
    </div>
  </div>
</template>

<script setup>
import DetailItem from '@/component/detailItem/index.vue'
import NewCard from '@/component/newCard/index.vue'
import ProtryDetailCard from '@/component/poetryDetailCard/index.vue'
import { ref } from 'vue'
//定义分页器中的参数
let currentPage = ref(1) //当前页码
let pageSize = ref(10) //每页数据条数
let total = ref(50) //总数据条数
//分页器触发事件
//pageSize发生变化触发
const handleSizeChange = (val) => {
  console.log(val)
}
//currentPage发生变化触发
const handleCurrentChange = (val) => {
  console.log(val)
}
</script>

<style lang="scss" scoped>
.masterwork {
  display: flex;
  justify-content: space-around;
  .left {
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
  }
  .right {
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
