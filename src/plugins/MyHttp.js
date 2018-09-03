import axios from 'axios';
const MyHttp = {};
// VUE插件必须 有一个公共的install 方法
MyHttp.install = function (Vue) {
   //设置 baseURL
   axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
   Vue.prototype.$http = axios;
}

export default MyHttp;

