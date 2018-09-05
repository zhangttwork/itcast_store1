// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import moment from 'moment';

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';

Vue.filter('fmDate',(value,fmStr)=>{
    return moment(value).format(fmStr);
})
import MyHttp from '@/plugins/MyHttp';
Vue.use(ElementUI);
Vue.use(MyHttp);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
