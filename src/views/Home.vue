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
           <el-submenu 
             v-for="level1 in menus"
             :key="level1.id"
             :index="level1.path"
           >
             <template slot="title">
               <i class="el-icon-location"></i>
               <span>{{ level1.authName }}</span>
             </template>
             <el-menu-item 
                v-for="level2 in level1.children"
                :key="level2.id"
                :index="'/'+level2.path"
             >
               <i class="el-icon-star-on"></i>
               <span>{{ level2.authName }}</span>
             </el-menu-item>
           </el-submenu>
         </el-menu>
       </el-aside>
       <el-main>
         <router-view></router-view>
       </el-main>
    </el-container>
   </el-container>
</template>
<script>
export default {
  data() {
    return {
      // 获取菜单数据
      menus: []
    };
  },
  created() {
    this.loadMenus();
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
    },
    async loadMenus() {
      const response = await this.$http.get('menus');
      const { meta: { msg, status } } = response.data;
        if( status === 200 ) {
          this.menus = response.data.data;
        } else {
          this.$message.error(msg);
        }
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
  /*text-align: center;*/
}
</style>
