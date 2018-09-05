<template>
    <div class="login-wrap">
       <el-form class="login-form" label-position="top" label-width="80px">
          <h2>用户登录</h2>
          <el-form-item label="用户名">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="formData.password" @keyup.enter.native="handleLogin"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
          </el-form-item>
       </el-form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // es7新语法： async await
    async handleLogin() {
      
      const response = await this.$http.post('login', this.formData);
      const { meta: { msg, status } } = response.data;
      
      if (status === 200) {
        this.$message.success(msg);
        sessionStorage.setItem('token', response.data.data.token);
        this.$router.push('/');
      } else {
        this.$message.error(msg);
      }

      // this.$http
      //   .post('login', this.formData)
      //   .then(response => {
      //     // const { meta: { msg, status } } = response.data;
      //     // if (status === 200) {
      //     //   this.$message.success(msg);
      //     //   sessionStorage.setItem('token', response.data.data.token);
      //     //   this.$router.push('/');
      //     // } else {
      //     //   this.$message.error(msg);
      //     // }
      //   });
    }
  }
};
</script>
<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 400px;
  padding: 30px;
  border-radius: 5px;
  background-color: #fff;
}
.login-btn {
    width: 100%;
}
</style>
