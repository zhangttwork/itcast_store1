import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Users from '../views/users/List.vue';
import Rights from '@/views/rights/rights';
import Roles from '@/views/rights/Roles';
import { Message } from 'element-ui';
import Categories from '@/views/goods/Categories';
// import HelloWorld from '@/components/HelloWorld';
Vue.use(Router);
// @为src文件夹
// build 目录下 webpack.base.conf 第38行配置的
// 省略 .js 的情况
// 加载规则：先找 .js / .vue /.json webpack.base.conf 35行

const router = new Router({ 
  routes: [
    {name: 'login', path: '/login', component: Login},
    {
      name: 'home',
      path: '/',
      component: Home, 
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        },
        {
          name: 'categories',
          path: '/categories',
          component: Categories
        }
      ] 
    }
  ]
});

// 前置路由守卫（路由跳转之前）
router.beforeEach((to, from, next) => {
  if(to.name === 'login'){
    next();
  } else {
    if(sessionStorage.getItem('token')) {
      next();
    } else {
      // 不能用这个，this指向不同，这个this得为vue的实例
      // this.$router.push();
      router.push('/login');
      // 登录
      Message.warning('请先登录');
    }
  }
});

export default router;
