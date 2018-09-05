<template>
    <el-card class="card">
      <!-- 面包屑 -->

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 功能条 -->
      <el-row class="row">
        <el-col :span="24">
          <el-input placeholder="请输入内容"  style="width:300px" clearable v-model="searchValue">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
          <el-button type="success" plain>添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 列表信息 -->
      <el-table width:1500 :data="tableData" border>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="create_time" label="时间">
          <template slot-scope="scope">
            {{ create_time | fmDate('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="用户状态" width="80">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
              
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- scope.$index 为当前行的索引 -->
            <!-- scope.row是当前这一行的所有数据 -->
            <!-- {{ scope.row }} -->
            <el-button size="mini" type="primary" icon="el-icon-edit" plain circle></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delteData(scope.row.id)" circle></el-button>
            <el-button size="mini" type="success" icon="el-icon-check" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1,2,3,4,5]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 5,
      total: 0,
      searchValue: ''
    };
  },
  created() {
    // 设置请求头中的token
    this.loadData();
    
  },
  methods: {
    async loadData() {
      
      this.$http.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

      const response = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);

      const { meta: { msg, status } } = response.data;

      if ( status === 200 ) {
        this.tableData = response.data.data.users;
        this.total = response.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize =val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      // console.log(`当前页:${val} `);
      this.loadData();
    },
    handleSearch() {
      // console.log('aaaa');
      this.loadData();
    },
    delteData() {
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
}    
</script>
<style>
.card {
    /*height: 100%;*/
}
.row {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>