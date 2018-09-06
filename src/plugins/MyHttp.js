import axios from 'axios';
const MyHttp = {};
// VUE插件必须 有一个公共的install 方法
MyHttp.install = function(Vue) {
  // 设置 baseURL
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

  // axios 提供了一个过滤器
  axios.interceptors.request.use(function (config) {

    if(config.url !== 'login') {
      const token =sessionStorage.getItem('token');
      config.headers.Authorization = token;
    }
    return config;
  },function (error) {
    return Promise.reject(error);
  });

  Vue.prototype.$http = axios;
};
export default MyHttp;
