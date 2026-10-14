<template>
  <div class="app">
    <h2>app content</h2>
    <div class="nav">
      <router-link to="/home" active-class="active">首页</router-link>
      <router-link to="/about" active-class="active">关于</router-link>
      <router-link to="/user/123" active-class="active">用户123</router-link>
      <router-link to="/user/456" active-class="active">用户456</router-link>

      <!-- <router-link to="/home">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-link to="/user/123">用户123</router-link>
      <router-link to="/user/456">用户456</router-link> -->

      <br />
      <!-- 其他普通元素的跳转 -->
      <span @click="homeSpanClick">首页</span>
      <button @click="aboutButtonClick">关于</button>
    </div>
    <!-- 渲染占位 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function homeSpanClick() {
  router.push('/home');
}
function aboutButtonClick() {
  router.push({
    path: '/about',
    query: {
      name: '张三',
      age: '19'
    }
  });
}
</script>

<style lang="less" scoped>
// 默认选中会添加的类名
// .router-link-active {
//   color: red;
//   font-size: 20px;
// }

.active {
  color: blue;
  font-size: 30px;
}
</style>
