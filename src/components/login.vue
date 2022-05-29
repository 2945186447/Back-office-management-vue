<template>
<div class="login_contanier">
    <div class="login_img">
        <img src="data:image/jpeg;base64,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"
         alt="">
    </div>
     <el-form :model="formMsg" ref="formMsg" label-width="100px" class="demo-ruleForm">
  <el-form-item
    label=""
    prop="username"
    :rules="rules.usernamerules"
  >
    <el-input placeholder="请输入账号"  prefix-icon="el-icon-user" type="username" v-model="formMsg.username" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item
    label=""
    prop="password"
    :rules="rules.passwordrules"
  >
    <el-input prefix-icon="el-icon-lock"
     type="password"
     placeholder="请输入密码"
      v-model="formMsg.password"
       autocomplete="off"
       size='medium'
       ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('formMsg')">登录</el-button>
     <el-button type="normal" @click="resetForm('formMsg')">重置</el-button>

  </el-form-item>
</el-form>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        formMsg: {
          username: '',
          password:''
        },
        rules:{
          usernamerules:  [
      { required: true, message: '账号不能为空',trigger:'blur'},
      {min:4,max:10,message:"长度在3-10个字符",trigger:'blur'}
     
       ],passwordrules:  [
      { required: true, message: '密码不能为空'},
       {min:6,max:15,message:"长度在3-10个字符",trigger:'blur'}
     
       ]
         }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if(valid){
                console.log("登录")
                var params = new URLSearchParams();
                params.append('username',this.formMsg.username)
                 params.append('password',this.formMsg.password)
                 axios.post('http://106.55.14.142:8888/api/private/v1/login',params).then(
                     (res) =>{                 
                            if(res.status ===200){
                                 console.log('登录成功')
                              const token = res.data.data.token
                                sessionStorage.setItem("token",token)
                              this.$router.push({name:'Main'}) 
                              this.open()//
                            }
                     }
                 )

            }
           
          
        });
      },
       resetForm(formName) {
        this.$refs[formName].resetFields();
      },
            open() {
       this.$message({
          message: '登录成功',
          type: 'success'
        });
      },

    }
  }
</script>

<style scoped>
.login_img{
    width: 100px;
    height: 100px;
    overflow: hidden; 
    border-radius: 50%; 
  margin: 0 auto;
  margin-top: 10px;
   
}
.login_img img{
    width: 200px;
}


.login_contanier{
     box-shadow: 0 1px 3px 2px gainsboro;
   border-radius: 10px;
    width: 600px;
    height: 400px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

.demo-ruleForm{
   margin-top: 130px;
   background-color: white;
  margin: 0 auto;
  

}

.el-input{
    
    width: 400px;
    font-size: 20px;
    

}

.el-form-item:nth-child(1){
    margin-top: 40px;
  
}


.el-form-item:nth-child(3){
  padding-left: 120px;
  
}
.el-button:nth-child(2){
   
   float: right;
   margin-right: 200px;
   
}

</style>

