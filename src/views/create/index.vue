<template>
  <div class="create">
    <el-card class="box-card">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item>
          <h1 style="color: #529dff">传作中心</h1>
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1" @click="$router.push('/create/poetry')">诗词传作</el-menu-item>
        <el-menu-item index="2" @click="$router.push('/create/analyse')">诗词赏析</el-menu-item>
        <el-menu-item index="3" @click="$router.push('/create/status')">发布动态</el-menu-item>
      </el-menu>
      <!-- 收集表单数据 -->
      <div class="heart"><router-view></router-view></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()
const activeIndex = ref('1')

const handleSelect = (e) => {
  if (e === '0') {
    return (activeIndex.value = '1')
  }
  activeIndex.value = e
}

onMounted(() => {
  const route = $route.path
  if (route === '/create/poetry') {
    activeIndex.value = '1'
  } else if (route === '/create/analyse') {
    activeIndex.value = '2'
  } else {
    activeIndex.value = '3'
  }
})
</script>

<style lang="scss" scoped>
.create {
  padding-top: 110px;
  .box-card {
    width: 1000px;
    margin: 0 auto;
  }
}
.flex-grow {
  flex-grow: 1;
}
.heart {
  margin: 10px;
}
</style>
