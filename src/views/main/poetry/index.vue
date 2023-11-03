<template>
  <div class="container">
    <div class="left">
      <div class="detail">
        <div class="title">古诗词大全分类</div>
        <DetailItem :detailList="type" title="风格" @changePoetryDetail="changePoetryDetail"></DetailItem>
        <DetailItem :detailList="writer" title="诗人" @changePoetryDetail="changePoetryDetail"></DetailItem>
        <DetailItem :detailList="dynasty" title="朝代" @changePoetryDetail="changePoetryDetail"></DetailItem>
        <DetailItem :shamdT="false" title="类型" :detailList="form" @changePoetryDetail="changePoetryDetail"></DetailItem>
      </div>
      <el-empty description="暂时没有数据" v-if="portryList.length == 0" />
      <ProtryDetailCard v-for="(item, index) in portryList" :AllText="item"> </ProtryDetailCard>
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
import { ref, onMounted } from 'vue'
import { reqGetDetail, reqGetPoetryList } from '@/api/module/poetry.js'
import { ElMessage } from 'element-plus'
//定义分页器中的参数
let currentPage = ref(1) //当前页码
let pageSize = ref(10) //每页数据条数
let total = ref(50) //总数据条数
//定义分类的数据
let dynasty = ref([]) //朝代
let form = ref([]) //分类
let type = ref([]) //类型
let writer = ref([]) //作者
//定义关键字的索引
let dynastyIndex = ref(-1) //朝代
let formIndex = ref(-1) //分类
let typeIndex = ref(-1) //类型
let writerIndex = ref(-1) //作者
//诗词列表
let portryList = ref([])
//分页器触发事件
//pageSize发生变化触发
const handleSizeChange = (val) => {
  pageSize.value = val
  getPoetryList()
}
//currentPage发生变化触发
const handleCurrentChange = (val) => {
  currentPage.value = val
  getPoetryList()
}
//获取分类的数据
const getDetailList = async () => {
  let res = await reqGetDetail()
  if (res.code != 1) {
    ElMessage({
      type: 'error',
      message: res.msg
    })
    return false
  }
  dynasty.value = res.data.dynasty
  form.value = res.data.form
  type.value = res.data.type
  writer.value = res.data.writer
  return true
}
//获取下面的具体数据
const getPoetryList = async () => {
  let ip = '172.16.40.33'
  //先根据对应的索引拿到相应的关键字s
  let Dynasty = dynasty.value[dynastyIndex.value] || ''
  let Form = form.value[formIndex.value] || ''
  let Type = type.value[typeIndex.value] || ''
  let Writer = writer.value[writerIndex.value] || ''

  let res = await reqGetPoetryList(Dynasty, Form, ip, currentPage.value, pageSize.value, Type, Writer)
  if (res.code != 1) {
    return ElMessage({
      type: 'error',
      message: '获取数据失败'
    })
  }
  portryList.value = res.data.records
  total.value = res.data.total
}
//触发自定义事件，选择了分类的元素
const changePoetryDetail = (val) => {
  if (val.type == '风格') {
    typeIndex.value = val.Index
  } else if (val.type == '诗人') {
    writerIndex.value = val.Index
  } else if (val.type == '朝代') {
    dynastyIndex.value = val.Index
  } else {
    formIndex.value = val.Index
  }
  //重新获取数据
  getPoetryList()
}
//组件挂载获取数据
onMounted(() => {
  let data = getDetailList()
  data.then((res) => {
    if (res) {
      getPoetryList()
    }
  })
})
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
.pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
