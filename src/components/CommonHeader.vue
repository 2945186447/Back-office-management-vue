<template>
<div>
  <el-button  type="info" icon="el-icon-menu" @click="display"></el-button>
  <el-button @click="edit">退出</el-button>
</div>
  
</template>

<script>
export default {
    methods:{
         edit(){
           this.$confirm("确定退出账号吗?").then(
             res =>{
                window.sessionStorage.clear(),
      this.$router.push('/login')
             },
             red =>{
               
             }
           )
     
    },
    display(){
      console.log( this.$store.state.isCollapse)
      this.$store.state.isCollapse = !this.$store.state.isCollapse
    }
    }

}
</script>

<style scoped>


 .el-button{
     margin-top: 10px;
 }
 h4{
   text-align: center;
   font: 17px;
   color: white;
 }
 .el-button:nth-child(2){
     float: right;
 }

</style>