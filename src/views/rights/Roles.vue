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
                 <el-tag closable @close="handleClose(scope.row,level1.id)">
                    {{ level1.authName }}
                 </el-tag>
               </el-col>
               <el-col :span="20">
                  <el-row v-for="level2 in level1.children" :key="level2.id">
                    <el-col :span="4">
                       <el-tag closable type="success" @close="handleClose(scope.row,level2.id)">{{ level2.authName }}</el-tag> 
                    </el-col>
                    <el-col :span="20">
                      <el-tag 
                          type="warning" 
                          closable 
                          v-for="level3 in level2.children" 
                          @close="handleClose(scope.row,level3.id)"
                          :key="level3.id">
                        {{ level3.authName }}
                     </el-tag>
                    </el-col>
                  </el-row>
               </el-col>
            </el-row>
            <el-row v-if="scope.row.children.length===0">
              <el-col :span="24">未分配权限</el-col>
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
        width="220">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="220">
      </el-table-column>
      <el-table-column
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain circle @click="handleOpenEditDialog(scope.row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delteData(scope.row.id)" circle></el-button>
            <el-button size="mini" type="success" icon="el-icon-check" plain circle @click="handleOpenDialog(scope.row)"></el-button>  
        </template>
        
      </el-table-column>
    </el-table>
    <el-dialog
      title="权限分配"
      :visible.sync="dialogVisible">
      <el-tree
      ref="tree"
      default-expand-all
      show-checkbox
      node-key="id"
      :default-checked-keys="checkedKeys"
      :data="data"
      :props="defaultProps">
     </el-tree>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleSetRights">确 定</el-button>
  </span>
    </el-dialog>

   </div> 
</template>
<script>
export default {
  data() {
    return {

        tableData: [],
        dialogVisible: false,
        data: [],
        defaultProps: {
            label: 'authName',
            children: 'children',
        },
        checkedKeys:[],
        // 记录当前角色的id
        currentRoleId: -1
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
    },
    async handleClose(role,rightId) {
        // alert(rightId);
        const response = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
        const { meta: { msg, status } } = response.data;
        if( status === 200 ) {
            // this.tableData = response.data.data;
            role.children = response.data.data;
            this.$message.success(msg);
        } else {
            this.$message.error(msg);
        }
    },
    async handleOpenDialog (role) {
        // console.log(role);
      this.dialogVisible = true;
      const response = await this.$http.get('rights/tree');
        
      // console.log(response);
      this.data = response.data.data;
        
      const arr = [];
      // 遍历一级权限
      role.children.forEach((level1) => {
        level1.children.forEach((level2) => {
          level2.children.forEach((level3) => {
            arr.push(level3.id);
          });
        });
      });
      this.checkedKeys = arr;
      
      this.currentRoleId = role.id;

        
    },
    async handleSetRights() {
      // getCheckedKeys() 与 getHalfCheckedKeys() 为tree 的方法
      const arr1 = this.$refs.tree.getCheckedKeys();
      const arr2 = this.$refs.tree.getHalfCheckedKeys();
      const arr = [...arr1,...arr2];
      const rids = arr.join(',');
      const roleId = this.currentRoleId;
      const response = await this.$http.post(`roles/${roleId}/rights`,{
        rids:rids
      });
      const { meta: { msg, status } } = response.data;
        if( status === 200 ) {
          this.dialogVisible = false;
          this.$message.success(msg);
          this.loadData();
        } else {
          this.$message.error(msg);
        }
      }
  }
}  
</script>
<style>
    
</style>