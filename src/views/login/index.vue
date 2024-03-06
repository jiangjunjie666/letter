<template>
  <div class="login">
    <GetLoginCard @loginChange="loginChange"></GetLoginCard>
  </div>
</template>

<script setup>
import GetLoginCard from "@/components/GetLoginCard/index.vue";
import { useRouter } from "vue-router";
const $router = useRouter();
const loginChange = () => {
  //跳转至首页
  $router.push("/");
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
