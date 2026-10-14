<template>
  <div class="user">
    <!-- 在模板中获取id -->
    <h2>User:{{ $route.params }}</h2>
  </div>
</template>

<script setup>
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
// 获取route跳转id
// const route = useRoute();
// console.log('脚本中：', route.params);

onBeforeRouteUpdate((to, from) => {
  console.log('from:', from.params);
  console.log('to:', to.params);
});
</script>

<style lang="less" scoped></style>
