<template>
    <el-card class="card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="row">
        <el-col :span="24">
          <el-input placeholder="请输入内容"  style="width:300px">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success" plain>添加用户</el-button>
        </el-col>
      </el-row>
      <el-table style="width: 100%" :data="tableData" border>
        <el-table-column prop="date" label="#" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="邮箱">
        </el-table-column>
        <el-table-column prop="address" label="电话">
        </el-table-column>
      </el-table>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: 
      [
      // {
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1517 弄'
      // }, {
      //   date: '2016-05-01',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1519 弄'
      // }, {
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1516 弄'
      // }
      ]
    };
  },
  mounted() {
    // 设置请求头中的token
    this.$http.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
    this.$http
     .get('users',{
        query: 1,
        pagenum: 1,
        pagesize: 5

      })
     .then(response => {
       console.log(sessionStorage.getItem('token'));
       console.log(response);
      })
     .catch(err => {
       console.log(err);
     });
  }
}    
</script>
<style>
.card {
    height: 100%;
}
.row {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>