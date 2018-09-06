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
          <el-button type="success" plain @click="addUserdialogFormVisible = true">添加用户</el-button>
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
            {{ scope.row.create_time | fmDate('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="用户状态" width="80">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="handleChange(scope.row)"> 
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- scope.$index 为当前行的索引 -->
            <!-- scope.row是当前这一行的所有数据 -->
            <!-- {{ scope.row }} -->
            <el-button size="mini" type="primary" icon="el-icon-edit" plain circle @click="handleOpenEditDialog(scope.row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delteData(scope.row.id)" circle></el-button>
            <el-button size="mini" type="success" icon="el-icon-check" plain circle @click="handleOpenSetRoleDialog(scope.row)"></el-button>
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


      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="addUserdialogFormVisible" @close="handleClose">
        <el-form :model="formData" :rules="rules"  label-width="80px" ref="formName">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formData.password" auto-complete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formData.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserdialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改用户的对话框 -->
      <el-dialog title="修改用户" :visible.sync="editUserdialogFormVisible" @close="handleClose">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="formData.username" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formData.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editUserdialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEdit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 分配角色 -->
      <el-dialog title="修改用户" :visible.sync="setRoledialogFormVisible" @close="handleClose">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="当前用户">
            {{ formData.username }}
          </el-form-item>
          <el-form-item label="请选择角色">
            <el-select v-model="currentRoleId" placeholder="请选择">
              <!-- <el-option
                label="请选择"
                :value="-1" disabled>
              </el-option> -->
              <el-option v-for="item in options" 
              :key="item.id"
              :label="item.roleName" :value="item.id">
              </el-option>
              <!-- <el-option
                label="主管"
                :value="1">
              </el-option>
              <el-option
                label="员工"
                :value="2">
              </el-option> -->
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="setRoledialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSetRole()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 2,
      total: 0,
      searchValue: '',
      addUserdialogFormVisible: false,
      editUserdialogFormVisible: false,
      setRoledialogFormVisible: false,
      formData:{
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules:{
        username:[
        {required: true,message:'请输入用户名',trigger: 'blur'},
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[],
        email:[],
        mobile:[]
      },
      // 绑定下拉框
      currentRoleId: -1,
      // 绑定下拉框的数据
      options: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      
      // this.$http.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

      const response = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);

      const { meta: { msg, status } } = response.data;

      if ( status === 200 ) {
        this.tableData = response.data.data.users;
        this.total = response.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    // 处理 pagesize 改变的情况
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize =val;
      this.pagenum = 1;
      this.loadData();
    },
    // 处理页码改变的情况
    handleCurrentChange(val) {
      
      this.pagenum = val;
      // console.log(`当前页:${val} `);
      this.loadData();
    },
    // 处理搜索
    handleSearch() {
      // console.log('aaaa');
      this.loadData();
    },
    // 删除用户
    delteData(id) {
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const response = await this.$http.delete(`users/${id}`);
        const { meta: { status, msg } } = response.data;
        if (status === 200 ) {
          this.$message.success(msg);
 
          // 如果是最后一页，并且当前页只有一条数据
          if (this.pagenum > 1 && this.tableData.length === 1) {
            this.pagenum --;
          }

          this.loadData();
          // this.pagenum =
        } else {
          this.$message.error(msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 更改用户是否禁用状态
    async handleChange(users) {
      const response = await this.$http.put(`users/${users.id}/state/${users.mg_state}`);
      const { meta: { status, msg } } = response.data;
      if ( status === 200 ) {
        this.$message.success(msg);
      }else {
        this.$message.error(msg);
      }
      // alert(1);
    },
    // 添加处理
    handleAdd() {
      // 表单验证
      this.$refs.formName.validate(async (valid) => {
        if (!valid) {
          this.$message.warning('验证失败');
          return;
        } else {
          const response = await this.$http.post('users',this.formData);
          const { meta: { status, msg } } = response.data;
          if ( status ===201 ) {
            this.$message.success(msg);
            this.loadData();
            this.addUserdialogFormVisible = false;
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    // 处理 添加/修改 用户的所有关闭
    handleClose() {
      // 统一设置空对象容易造成内存泄漏
      // this.formData = {};
      
      // 清空文本框
      for (let key in this.formData) {
        this.formData[key] = '';
      }
      this.currentRoleId = -1;
    },
    // 处理打开编辑的对话框
    handleOpenEditDialog(user) {
      this.editUserdialogFormVisible = true;
      // 点击编辑按钮时记录用户的Id
      this.formData.id = user.id;
      this.formData.username = user.username;
      this.formData.email = user.email;
      this.formData.mobile = user.mobile;

    },
    // 处理确认编辑
    async handleEdit() {
      const response = await this.$http.put(`/users/${this.formData.id}`,{
        email: this.formData.email,
        mobile: this.formData.mobile
      });

      const { meta: { status, msg } } = response.data;

      if (status === 200) {
        // 关闭对话框
        this.editUserdialogFormVisible = false;
        this.loadData();
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }

    },
    // 点击分配角色，打开对话框
    async handleOpenSetRoleDialog(user) {
      this.setRoledialogFormVisible = true;
      this.formData.username = user.username;

      const response = await this.$http.get('roles');
      this.options = response.data.data;
      // console.log(this.options);
      // 
      const res = await this.$http.get(`users/${user.id}`);
      this.currentRoleId = res.data.data.rid;
      // 记录用户ID
      this.formData.id = user.id;
    },
    // 设置用户角色
    async handleSetRole() {
      const response = await this.$http.put(`users/${this.formData.id}/role`,{
        rid:this.currentRoleId
      });
      const { meta: { msg, status } } = response.data;
      if(status === 200) {
        this.$message.success(msg);
        this.setRoledialogFormVisible = false;
        // this.pagenum = this.pagenum;
        this.loadData();
      } else {
        this.$message.error(msg);
      }

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