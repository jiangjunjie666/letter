<template>
  <!-- 诗词中上面的分类，到时候可能会用于名著和名家 -->
  <div>
    <div class="detailItem">
      <div class="type" :class="{ shadm: shamdT }">
        <div class="d">{{ title }}:</div>
        <ul :class="{ show: openDetail == true }">
          <li :class="{ active: activeIndex == -1 }" @click="changeDetail(-1)">不限</li>
          <li v-for="(item, index) in detailList" :class="{ active: activeIndex == index }" @click="changeDetail(index)">
            {{ item }}
          </li>
          <li class="icon" v-if="openDetail == false" @click="openDetail = true">
            <el-icon><ArrowRight /></el-icon>
          </li>
          <li class="icon" v-if="openDetail == true" @click="openDetail = false">
            <el-icon><ArrowDown /></el-icon>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
//是否打开全部
let openDetail = ref(false)
//高亮坐标
let activeIndex = ref(-1)
//接收父组件的数据props
const props = defineProps({
  //是否携带下划线
  shamdT: {
    type: Boolean,
    default: true
  },
  //列表数据
  detailList: {
    type: Array,
    default: []
  },
  //标题
  title: {
    type: String,
    default: '类型'
  }
})
//接收自定义事件
const $emit = defineEmits(['changePoetryDetail'])

//选择分类时触发自定义事件
const changeDetail = (index) => {
  activeIndex.value = index
  //触发自定义事件
  $emit('changePoetryDetail', { type: props.title, Index: index })
}
</script>

<style lang="scss" scoped>
.detailItem {
  width: 95%;
  margin: 0 auto;

  .type {
    font-size: 18px;
    padding: 10px 0;
    &.shadm {
      border-bottom: 2px dashed var(--el-border-color);
    }
    .d {
      float: left;
      font-size: 18px;
      margin: 8px 0 0 10px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      width: 90%;
      height: 34px;
      overflow: hidden;
      margin: 0 auto;

      &.show {
        overflow: auto;
        height: auto;
      }
      li {
        padding: 8px 15px;
        color: #817f7f;
        &:hover {
          color: red;
          cursor: pointer;
        }
        &.active {
          color: red;
        }
        &.icon {
          position: absolute;
          cursor: pointer;
          top: 0%;
          right: 0%;
        }
        &.icon:hover {
          color: aqua;
        }
      }
    }
  }
}
</style>
