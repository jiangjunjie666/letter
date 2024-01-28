<template>
  <div class="masterwork">
    <div class="left">
      <div class="detail">
        <div class="title">著名作家大全</div>
        <DetailItem :shamdT="false" title="朝代" :detailList="dynastyList" @changePoetryDetail="changePoetryDetail">
        </DetailItem>
      </div>
      <el-empty description="暂时没有数据" v-if="writerList.length == 0" />
      <div class="write">
        <WriterDetailCard v-for="(i, index) in writerList" btnText="阅读相关诗词" :AllText="i" :key="i.id"
          @click="goWriterDetail(i)"></WriterDetailCard>
      </div>
      <el-pagination class="pagination" v-model:current-page="currentPage" v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]" :small="small" :disabled="disabled" :background="background"
        layout="  sizes, prev, pager, next, jumper,total" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange"></el-pagination>
    </div>
    <div class="right">
      <NewCard title="相关文章"></NewCard>
    </div>
  </div>
</template>

<script setup>
import DetailItem from "@/components/detailItem/index.vue";
import NewCard from "@/components/newCard/index.vue";
import WriterDetailCard from "@/components/writerDetailCard/index.vue";
import { ref, onMounted } from "vue";
import { reqGetDynasty, reqGetWriter } from "@/api/module/writer.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
//定义分页器中的参数
let currentPage = ref(1); //当前页码
let pageSize = ref(10); //每页数据条数
let total = ref(0); //总数据条数
//朝代数据
let dynastyList = ref([]);
//朝代索引
let dynastyIndex = ref(-1);
//作者信息
let writerList = ref([]);
//分页器触发事件
//pageSize发生变化触发
const handleSizeChange = (val) => {
  pageSize.value = val;
  getWriter();
};
//currentPage发生变化触发
const handleCurrentChange = (val) => {
  currentPage.value = val;
  getWriter();
  // 页面跳转到最顶上
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
//获取朝代信息
const getDynasty = async () => {
  let res = await reqGetDynasty();
  if (res.code != 1) {
    return ElMessage({
      type: "error",
      message: "获取朝代数据失败",
    });
  }
  dynastyList.value = res.data;
  getWriter();
};
//获取诗人信息
const getWriter = async () => {
  //拿到朝代信息
  let dynasty = dynastyList.value[dynastyIndex.value] || "";
  let res = await reqGetWriter(dynasty, currentPage.value, pageSize.value);
  if (res.code != 1) {
    return ElMessage({
      type: "error",
      message: "获取诗人数据失败",
    });
  }
  writerList.value = res.data.records;
  total.value = res.data.total;
};
//触发子组件的自定义事件
const changePoetryDetail = (val) => {
  //重新发送请求
  dynastyIndex.value = val.Index;
  getWriter();
};

//跳转到作者详情
const goWriterDetail = (i) => {
  router.push({
    path: "/detail/writer",
    query: {
      id: i.id,
    },
  });
};
onMounted(() => {
  getDynasty();
});
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
}

.pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.write {
  transition: $windowScroll;
}
</style>
