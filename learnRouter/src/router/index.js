import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

// import Home from '@/components/Home.vue';
// import About from '@/components/About.vue';

// 魔法注释
// 分包技巧
const Home = () => import(/*webpackChunkName:"home"*/ '@/components/Home.vue');
const About = () => import(/*webpackChunkName:"about"*/ '@/components/About.vue');

// 创建路由:维护一组映射关系
const router = createRouter({
  // 1.指定采用hash模式
  history: createWebHashHistory(),

  // 2.指定采用history模式
  // history: createWebHistory(),
  // 映射关系
  routes: [
    // 默认路径重定向
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [
        {
          path: '/common',
          component: () => import('../components/homeCommon.vue')
        }
      ]
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/user/:id',
      component: () => import('../components/User.vue')
    },
    {
      // '组件匹配失败，展示这个界面'
      path: '/:pathMatch(.*)',
      component: () => import('../components/notFound.vue')
    }
  ]
});

let isAdmin = true;
if (isAdmin) {
  // 添加路由 一级路由
  router.addRoute({
    path: '/admin',
    component: () => import('../components/Admin.vue')
  });

  // 添加路由 二级路由
  router.addRoute('home', {
    path: '/vip',
    component: () => import('../components/homeVip.vue')
  });
}

export default router;
