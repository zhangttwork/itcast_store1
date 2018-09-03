import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);
// @为src文件夹
// build 目录下 webpack.base.conf 第38行配置的
// 
// 省略 .js 的情况
// 加载规则：先找 .js / .vue /.json webpack.base.conf 35行
import Login from '@/views/Login.vue';

export default new Router({
  routes: [
    {name:'login',path:'/login',component:Login}
  ]
});
