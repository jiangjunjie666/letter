<template>
  <div class="loading"></div>
</template>

<script setup></script>

<style>
.loading {
  width: 50px;
  height: 50px;
  border: 2px solid #000;
  border-top-color: transparent;
  border-radius: 100%;
  animation: circle infinite 0.55s linear;
}
@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
