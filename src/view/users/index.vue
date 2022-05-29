<template>
  <el-card class="box-card" shadow="hover">
    <el-row :gutter="20">
      <el-col :span="7">
   <el-input :clearable="true" @clear="GetUserList" v-model="queryInfo.query" placeholder="请输入内容">
    <el-button slot="append" icon="el-icon-search"  @click="GetUserList" clearable="true" ></el-button>
  </el-input>
      </el-col>
      <el-col :span="4" class="col2">
         <el-button type="primary" style="margin-top:10px"  @click="dialogVisibles">新增用户</el-button>
      </el-col>
     
    </el-row>
    <!-- table表头 -->
   <el-row>
     <el-col>
        <el-table 
        class="userlist"
      :data="userList"
      :stripe="true"
      >
      <el-table-column
        type="index"
        label="#"
      
       >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        min-width="30%">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        min-width="50%">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        min-width="40%">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色"
       min-width="35%">
      </el-table-column>
      <el-table-column
        label="状态"
        min-width="30%">
        <template slot-scope="scope">
          
              <el-switch @change="changeState(scope.row)"
        v-model="scope.row.mg_state"
       active-color="#13ce66"
       inactive-color="#ff4949">
</el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="操作"
       
       >
        <template slot-scope="scope">
        
   
       <el-button type="primary" style="float:left" icon="el-icon-edit" @click="reviseUser(scope.row)"></el-button>
  
    <el-tooltip  effect="dark" content="分配角色" placement="top-end" >
      <el-button :enterable="false"  style="float:left"  type="warning" icon="el-icon-setting" @click="assignmentRole(scope.row)"></el-button> 
  </el-tooltip>
   
       <el-button type="danger"  style="float:left" icon="el-icon-delete" @click="delectUser(scope.row.id)"></el-button>
    
       
          
          
        </template>
      </el-table-column>
    </el-table>
    
     </el-col>
   </el-row>
<!--  翻页器 -->
   <el-row>
     <el-col>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
      :page-size="queryInfo.pagesize"
     
      :total="totals">
    </el-pagination>
     </el-col>
   </el-row>
  <!-- 添加用户 -->
<el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <el-form ref="addUserMsg"
   label-width="80px"
   :model="addUserMsg"
   :rules="addUserMsgRules"
   
   >
     <el-form-item
    label="账号"
    prop="username"
    :rules="addUserMsgRules.usernameRules"
  >
    <el-input  prefix-icon="el-icon-user" type="text" v-model="addUserMsg.username"></el-input>
  </el-form-item>
   <el-form-item label="密码"
    prop="password"
    :rules="addUserMsgRules.passwordRules"
   >
    <el-input type="password" v-model="addUserMsg.password"></el-input>
  </el-form-item>
   <el-form-item label="邮箱"
    prop="email"
      :rules="addUserMsgRules.emailRules"
   
   >
    <el-input type="email" v-model="addUserMsg.email"></el-input>
  </el-form-item>
   <el-form-item label="手机号码"
   prop="mobile"
   :rules="addUserMsgRules.mobileRules"
   >
    <el-input v-model="addUserMsg.mobile"></el-input>
  </el-form-item>
    </el-form>
  <span slot="footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
  
</el-dialog>

<!-- 修改用户 -->
<el-dialog
  title="修改用户"
  :visible.sync="dialogVisible2"
  width="30%"
  >
  <el-form ref="addUserMsg"
   label-width="80px"
   :model="reserveUser"
   :rules="addUserMsgRules"
   
   >
     <el-form-item
    label="账号"
    prop="username"
    :rules="addUserMsgRules.usernameRules"
   
   
  >
    <el-input  :disabled="true"  type="text" v-model="reserveUser.username"></el-input>
  </el-form-item>
  
   <el-form-item label="邮箱"
    prop="email"
      :rules="addUserMsgRules.emailRules"
   
   >
    <el-input type="email" v-model="reserveUser.email"></el-input>
  </el-form-item>
   <el-form-item label="手机号码"
   prop="mobile"
   :rules="addUserMsgRules.mobileRules"
   >
    <el-input v-model="reserveUser.mobile"></el-input>
  </el-form-item>
    </el-form>
  <span slot="footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="enterReviseUser">确 定</el-button>
  </span>
  
</el-dialog>
<!-- 分配角色 -->

<el-dialog
  title="分配角色"
  :visible.sync="dialogVisible4"
  width="30%"
  @close="editDialogClosed"
  
 
  >
  <div>
    <p>当前用户:{{assignmentData.name}}</p>
    <p>当前角色:{{assignmentData.nowRole}}</p>
  </div>
  <el-select v-model="allRalueList" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
  
  
 
 
  <span slot="footer">
    <el-button @click="dialogVisible4 =false">取 消</el-button>
    <!-- 给用户设置角色 -->
    <el-button type="primary" @click="userAddRole">确 定</el-button>
  </span>
  
</el-dialog>





</el-card>


</template>

<script>
export default {
  data() {
    return {
      //给用户分配角色的值 role id
      allRalueList:'', 
      //所有角色信息
      options:[],
      //分配角色dialog弹窗
      dialogVisible4:false,
      //修改用户表单信息
      reserveUser:{
        username:'',
        id:0,
        email:"",
        mobile:""
       
      },
      //添加用户表单的信息
      addUserMsg:{
        username:'',
        password:'',
        email:'',
        mobile:''

      },
      //添加用户表单规则验证
      addUserMsgRules:{
        usernameRules:[
          { required: true, message: '账号不能为空',trigger:'blur'},
        {min:4,max:10,message:"长度在3-10个字符",trigger:'blur'}
        ],
        passwordRules:[
           { required: true, message: '密码不能为空'},
          {min:6,max:15,message:"长度在6-15个字符",trigger:'blur'}
        ],
        emailRules:[
          {required:false},
          {
            validator: function(rule, value, callback) {
              if (
                /^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(
                  value
                ) == false
              ) {
                callback(new Error("邮箱格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          },
          
        ],
        mobileRules:[
            {required:false},
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("手机号格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
        

      },
      //修改用户弹窗是否显示
      dialogVisible:false,

      //修改
      dialogVisible2:false,
      //获取用户列表参数对象
      queryInfo:{
        query:'',
        pagenum:1,
        //当前每页显示多少条数据
        pagesize:7
      },
      //分配角色参数列表
      assignmentData:[{
        name:'',
        nowRole:'',
        id:'',
        roleId:'',
      }],
 //用户列表
      userList:[],
      //总人数
      totals:[],
      userID:''
      
    };
  },
  mounted () {
      this.GetUserList()
  },

  methods:{
    //get请求列表
    GetUserList(){
      this.$http.get('users',{params:this.queryInfo}).then(
        ({data:res}) =>{
         
          if(res.meta.status === 200){
            
               this.userList=res.data.users
              this.totals=  res.data.total
             

              this.$message({
          message: '获取用户列表成功',
          type: 'success'
        });
          }
          else{
           this.$message({
          message: '获取用户列表失败',
          type: 'error'
        });
          }
        }
      )
    },
//分页器 监听pagesize改变的事件
 handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.queryInfo.pagesize = val
        this.GetUserList()
      },
      //监听 页码值改变的事件
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
         this.queryInfo.pagenum = val
        this.GetUserList()
      },

 //改变switch 用户mg_state状态
  changeState(val){   
     this.$http.put(`users/${val.id}/state/${val.mg_state}`).then(
       ({data:res}) =>{
         if(res.meta.status !== 200){
            val.mg_state = !val.mg_state
         }
       }
     )
    

  },

 // 添加用户dialog上的按钮
   handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.dialogVisible = false
            this.dialogVisible2 = false
            this.$refs.addUserMsg.resetFields()
           
          })
          .catch(_ => {});
      },

     

//添加用户确定后发起添加用户请求

addUser(){
 console.log(this.addUserMsg)
 //验证表单规则
 this.$refs.addUserMsg.validate(value =>{
   console.log(value)
   if(!value) return
this.$http.post('users',this.addUserMsg).then(
   ({data:res}) =>{
     console.log(res)
     if(res.meta.status === 201){
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.$refs.addUserMsg.resetFields()
        this.GetUserList()
     }
     else{
       this.$message({
          message: '添加失败',
          type: 'error'
        });
     }
   }
 )
 })
 

},
//添加用户列表点击显示
dialogVisibles(){
  this.dialogVisible = !this.dialogVisible
},

//删除用户
delectUser(val){
  this.$confirm("确定退出账号吗?").then(
             res =>{
               this.$http.delete(`users/${val}`).then(
    ({data:res}) =>{
      console.log(res.meta)
      if(res.meta.status === 200){
          this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.GetUserList()
      }
    }
  )
             },
             red =>{
               
             }
           )
  
}

//修改用户
,
reviseUser(val){
   this.dialogVisible2 = true
   console.log(val)
  this.reserveUser.username = val.username
  this.reserveUser.id = val.id
  this.reserveUser.email = val.email
  this.reserveUser.mobile = val.mobile 
},
//删除用户
enterReviseUser(){
 this.reserveUser.id = Number(this.reserveUser.id)



      this.$http.put('users/'+this.reserveUser.id,{
        email:this.reserveUser.email,
        mobile:this.reserveUser.mobile
      }).then(
        ({data:res}) =>{
          if(res.meta.status === 200){
               this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.GetUserList()
         this.dialogVisible2 = false
          }
         
        }
      )
},
//为用户分配角色
assignmentRole(val){
  console.log(val)
  
  this.dialogVisible4 = true

//获取所有角色列表
this.assignmentData.id = val.id //用户id
this.$http.get('roles').then(
  ({data:res}) =>{
    this.options = res.data
  }
)


  this.assignmentData.name = val.username
  this.assignmentData.nowRole = val.role_name

},
//给用户设置角色
userAddRole(){
  this.$http.put(`users/${this.assignmentData.id}/role`,{rid:this.allRalueList}).then(
    ({data:res}) =>{
     this.$message({
          message: '设置角色成功',
          type: 'success'
        });
          this.dialogVisible4 = false
          this.GetUserList()
          
    }
  )
},
//设置角色对话框关闭后 重置下拉选择列表
  editDialogClosed(){
    console.log("关闭")
    this.allRalueList =''
    this.assignmentData = {}
  }
  },
  
  

 

}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
    min-width: 800px;
    margin-top: 20px;
  }
  .col2{
   
    margin-top: -10px;
  }
  .userlist{
    margin-top: 20px;
    border: 1px solid whitesmoke;
    width: 100%;
  }
 
</style>