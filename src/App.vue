<template>
  <TabbarNav v-if="$route.path != '/404'" />
  <TabbarFixed v-if="$route.path != '/404'" />
  <router-view></router-view>
</template>

<script setup>
import { useRoute } from 'vue-router'
let $route = useRoute()
</script>

<style lang="scss" scoped></style>
