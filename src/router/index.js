import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Users from '../views/users/List.vue';
import Rights from '@/views/rights/rights';

// import HelloWorld from '@/components/HelloWorld';
Vue.use(Router);
// @为src文件夹
// build 目录下 webpack.base.conf 第38行配置的
// 省略 .js 的情况
// 加载规则：先找 .js / .vue /.json webpack.base.conf 35行
export default new Router({ 
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
        }
      ] 
    }
  ]
});
