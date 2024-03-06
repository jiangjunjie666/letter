<template>
  <TabbarNav v-if="$route.path != '/404' && $route.path != '/login'" />
  <TabbarFixed v-if="$route.path != '/404' && $route.path != '/login'" />
  <router-view></router-view>
</template>

<script setup>
import { useRoute } from "vue-router";
let $route = useRoute();
console.log($route.path);
</script>

<style lang="scss" scoped></style>
