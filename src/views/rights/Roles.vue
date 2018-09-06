<template>
   <div>
       <my-breadcrumb level1="权限管理" level2="角色列表">    
    </my-breadcrumb>
    <el-button style="margin:10px 0">添加角色</el-button>
    <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%">
      <!-- 展开行 -->
      <el-table-column type="expand">
         <template slot-scope="scope">
             <!-- 一级权限 -->
            <el-row
              v-for="level1 in scope.row.children"
              :key="level1.id">
               <el-col :span="4">
                 <!-- 展示以及权限的名字 -->
                 <el-tag closable>
                    {{ level1.authName }}
                 </el-tag>
               </el-col>
               <el-col :span="20">
                  <el-row v-for="level2 in level1.children" :key="level2.id">
                    <el-col :span="4">
                       <el-tag closable type="success">{{ level2.authName }}</el-tag> 
                    </el-col>
                    <el-col :span="20"></el-col>
                  </el-row>
               </el-col>
            </el-row>
         </template> 
      </el-table-column>
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="300">
      </el-table-column>
      <el-table-column
        label="操作"
        width="300">
        <el-button size="mini" type="primary" icon="el-icon-edit" plain circle @click="handleOpenEditDialog(scope.row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delteData(scope.row.id)" circle></el-button>
            <el-button size="mini" type="success" icon="el-icon-check" plain circle @click="handleOpenSetRoleDialog(scope.row)"></el-button>
      </el-table-column>
    </el-table>
   </div> 
</template>
<script>
export default {
  data() {
    return {
        tableData: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
        const response = await this.$http.get('roles');
        const { meta: { msg, status } } = response.data;
        if( status === 200 ) {
            this.tableData = response.data.data;
        } else {
            this.$message.error(msg);
        }
    }
  }
}  
</script>
<style>
    
</style>