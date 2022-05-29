<template>
<div class="container">
    <el-row class="row1">

    <el-col>
         <el-button type="primary">添加角色</el-button>
    </el-col>








</el-row>
    <el-row class="row2">
        <el-col class="col2">
            <el-card class="tableCard">
                <el-table
    :data="tableData"
    class="roleTable"
    >
    <el-table-column type="expand">
      <template slot-scope="scope">
          <el-row v-for="(item,index) in scope.row.children" :key="item.id"
          :class="['el-rowbotm',index ===0 ? 'el-rowtop':'','flex']"
          >
              <el-col :span="5" class="twoList1">
                    <el-tag @close="handleClose(scope.row.id,item.id)"  closable>{{item.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                  <el-row :class="[i<=2 ? 'el-rowtop':'','flex']" v-for="(item2,i) in item.children" :key="item2.id">
                        <el-col :span="6">
                            <el-tag @close="handleClose(scope.row.id,item2.id)" closable type="success">{{item2.authName}}</el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <el-col :span="18">
                            
                            <el-tag @close="handleClose(scope.row.id,item3.id)" closable type="warning" v-for="item3 in item2.children" :key="item3.id">
                                {{item3.authName}}
                            </el-tag>
                        </el-col>
                       
                  </el-row>
                  
              </el-col>
              
          </el-row>
      </template>
    </el-table-column>
    <el-table-column
      label="#"
      type="index"
      prop="#"
     
      >
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName"
      min-width="25%"
      
      >
    </el-table-column>
    <el-table-column
      label="角色描述"
      prop="roleDesc"
      min-width="30%"
      >
    </el-table-column>
      <el-table-column
      label="操作"
      prop="#"
      min-width="50%"
     
      >
      <template slot-scope="scope">
          <el-row :gutter="25">
              <el-col :span="25">
                   <el-button icon="el-icon-edit" type="primary">编辑</el-button>
            <el-button icon="el-icon-setting" type="warning" @click="getpowerLists(scope.row)">分配权限</el-button> 
            <el-button icon="el-icon-delete"  type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
              </el-col>
              
          </el-row>
            
      </template>
    </el-table-column>
  </el-table>
            </el-card>
        </el-col>
    </el-row>

    <!-- 修改权限对话框 -->
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible3"
  width="40%"
  :before-close="colseDialogVisible3"
  >
       <el-tree
       :show-checkbox="true"
       node-key="id"
       :default-checked-keys="defKeys"
  :data="treeData" 
  :props="defaultProps"
  ref="treeRef"
  >
</el-tree>


  <span slot="footer" class="dialog-footer">
    <el-button @click="colseDialogVisible3()">取 消</el-button>
    <el-button type="primary" @click="allotRights()">确 定</el-button>
  </span>
</el-dialog>
</div>

</template>

<script>
export default {
    data() {
        return {
            //默认选择节点id值数据
            defKeys:[],
            dialogVisible3:false,
            //树形控件的属性绑定对象
            defaultProps: {
          children: 'children',
          label: 'authName'
        },
            //权限数据
            treeData:[],
            tableData: [],
            sentRoleId:0,
        }
    },
    methods:{
        //获取角色列表
        getRoleList(){
            this.$http.get('roles').then(
                ({data:res}) =>{
                    console.log(res)
                    this.tableData = res.data
                }
            )
        },
        //点击x后发请求取消角色指定权限
        handleClose(rolid,rigid){
          
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             //删除角色指定权限
             this.$http.delete(`roles/${rolid}/rights/${rigid}`).then(
                 res =>{
                     console.log(res)
                     this.getRoleList()
                 }
             )
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      
        },

        //请求list形式的权限列表
        getpowerLists(role){

            //单独保存用户id，为后续点击修改权限时为传入的参数
            this.sentRoleId = role.id,
            
            this.dialogVisible3 = true
            this.$http.get('rights/tree').then(
                ({data:res}) =>{
                 if(res.meta.status){
                    
                     this.treeData = res.data
                     console.log("treeData数据")
                      console.log(this.treeData)
                      this.getTreeKeys(role,this.defKeys)
                 }
                }
            )
        },
        //递归的形式，获取角色列表下三级权限的id
        getTreeKeys(node,arr){
            if(!node.children){
               return arr.push(node.id)
            }
            node.children.forEach(element => {
                this.getTreeKeys(element,arr)
            });
        },

        //关闭修改权限弹窗，同时清除递归的数组（避免对下一次递归产生影响）
        colseDialogVisible3(){
            this.dialogVisible3 = false
            this.defKeys = [];
        },
    //确定后通过被选中的checkbox给用户设置权限
    allotRights(){
const key =   [...this.$refs.treeRef.getCheckedKeys(),
...this.$refs.treeRef.getHalfCheckedKeys]

console.log(key)

const idStr = key.join(',')
//发请求修改用户权限
this.$http.post(`roles/${this.sentRoleId}/rights`,{rids:idStr}).then(
   ({data:res}) =>{
        if(res.meta.status){
            this.$message({
          message: '修改权限成功成功',
          type: 'success'
        });
      
        this.dialogVisible3 = false 
         this.getRoleList()
         this.defKeys=[];
        
        }
    }
)

       
        

    },
    //删除角色
    deleteRole(id){
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

 this.$http.delete(`roles/${id}`).then(
             ({data:res}) =>{
                if(res.meta.status === 200){
                    this.$message({
            type: 'success',
            message: '删除成功!'
          })
                }
             }
         )
            
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    }

    },
    mounted () {
        this.getRoleList()
        console.log(this.tableData)
    }

}
</script>

<style scoped>
.row1,.row2{
    margin-top: 10px;
}

.el-tag{
    margin: 7px;
   
}
.el-rowbotm{
     border-bottom: 1px solid whitesmoke;
}

.el-rowtop{
     border-top: 1px solid whitesmoke;
}
.flex{
    display: flex;
    align-items: center;
}
.roleTable{
  width: 100%;
 
}
.container{
  width: 100%;
  min-width: 1000px;
 
}


</style>