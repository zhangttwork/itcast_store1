<template>
    <div class="login-wrap">

        <el-form class="login-form" label-position="top" label-width="80px" v-model="formData">
 <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formData.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formData.password"></el-input>
  </el-form-item>
  <el-form-item>
      <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
  </el-form-item>
</el-form>
    </div>
</template>
<script>
   export default {
      data () {
        return {
            formData: {
                username:'',
                password:''
            }
        }
      },
      methods:{
        handleLogin() {
            this.$http
                .post('login',this.formData)
                .then((response)=> {
                    // response.data 服务器返回的数据
                    const {meta:{msg,status}} = response.data;
                    if(status === 200){
                        alert('成功'+msg);
                    }else{
                        alert('失败'+msg);
                    }
                })
                .catch(err=> {

                });
        }
      }
   }
</script>
<style>
.login-wrap {
  /*height: 100%;*/
  background-color: #324152;
  height: 100%;
  display: flex;
  /*水平居中*/
  justify-content: center;
  /*垂直居中*/
  align-items: center;
}
.login-form {
    width: 500px;
    padding: 30px;
    border-radius: 5px;
    background-color: #fff;

}
.login-btn {
    width: 100%;
}
</style>