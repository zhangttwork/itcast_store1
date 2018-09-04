<template>
   <el-container class="container">
     <el-header>
       <el-row>
         <el-col :span="4">
           <img src="../assets/logo.png" height="56" width="207" alt="">
         </el-col>
         <el-col :span="18" class="middle">
           <span>电商后台管系统</span>
         </el-col>
         <el-col :span="2">
           <a href="#" class="logout" @click="handleLogout">退出登录</a>
         </el-col>
       </el-row>
     </el-header>
     <el-container>
       <el-aside width="200px">
         <el-menu default-active="0" style="height:100%" unique-opened router>
           <el-submenu index="1">
             <template slot="title">
               <i class="el-icon-location"></i>
               <span>用户管理</span>
             </template>
             <el-menu-item index="/users">
               <i class="el-icon-star-on"></i>
               <span>用户列表</span>
             </el-menu-item>
           </el-submenu>
           <el-submenu index="2">
             <template slot="title">
               <i class="el-icon-location"></i>
               <span>权限管理</span>
             </template>
             <el-menu-item index="/roles">
               <i class="el-icon-star-on"></i>
               <span>角色列表</span>
             </el-menu-item>
             <el-menu-item index="/rights">
               <i class="el-icon-star-on"></i>
               <span>权限列表</span>
             </el-menu-item>
           </el-submenu>
           <el-submenu index="3">
             <template slot="title">
               <i class="el-icon-location"></i>
               <span>商品管理</span>
             </template>
             <el-menu-item index="3-1">
               <i class="el-icon-star-on"></i>
               <span>商品列表</span>
             </el-menu-item>
             <el-menu-item index="3-2">
               <i class="el-icon-star-on"></i>
               <span>分类参数</span>
             </el-menu-item>
             <el-menu-item index="3-3">
               <i class="el-icon-star-on"></i>
               <span>商品分类</span>
             </el-menu-item>
           </el-submenu>
         </el-menu>
       </el-aside>
       <el-main>
         
       </el-main>
    </el-container>
   </el-container>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  beforeCreate() {
    const token = sessionStorage.getItem('token');
    // 判断是否获取到token
    if (!token) {
      // 如果token不存在，认为没有登录
      this.$message.warning('请先登录');
      this.$router.push('/login');
    }
  },
  methods: {
    handleLogout() {
      sessionStorage.clear();
      this.$message.success('退出成功');
      this.$router.push('/login');
    }
  }
};
</script>
<style>
.logout {
  text-decoration: none;
  color: orange;
}

.middle {
  text-align: center;
  line-height: 60px;
  font-size: 24px;
  color: #fff;
}

.el-container {
  height: 100%;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  /* text-align: center; */
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}
</style>
