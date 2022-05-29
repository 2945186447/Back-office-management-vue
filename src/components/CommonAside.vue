<template>


<el-menu :router="true" text-color="white" active-text-color="orange" :default-active="'/'+keepRoute" class="el-menu-vertical-demo" background-color="#545c64"  :collapse="isCollapse">
   <h4 v-show="!isCollapse">通用后台管理系统</h4>
   <!-- 一级菜单 -->
    <el-submenu  v-for="item in AsideList" :index="item.id+''" :key="item.id">
    <template slot="title">
      <i :class="Listicon[item.id]"></i>
      <span slot="title">{{item.authName}}</span>
    </template>
    <el-menu-item-group>
        <!-- 二级菜单 -->
      <el-menu-item  @click="keeproute(item1.path,item1.authName)" :index="'/'+item1.path" v-for="item1 in item.children" :key="item1.id">{{item1.authName}}</el-menu-item>
     
    </el-menu-item-group>
  </el-submenu>

   <div class="ee1"></div>


</el-menu>


</template>

<script>
  export default {
      data() {
          return {
            keepRoute:'',
              AsideList: [],
              Listicon:
                  {
                      "125":'el-icon-user',
                      "103":'el-icon-folder',
                      "101":'el-icon-goods',
                      "102":'el-icon-shopping-cart-2',
                      "145":'el-icon-monitor'
                  }
              
          };
      },
    methods: {
      handleOpen(key, keyPath) {
          console.log(key)
      },
      handleClose(key, keyPath) {
       
      },
      //浏览器刷新后保持上一次点击的高亮状态
      keeproute(str,str2){

        
          var result = this.$store.state.breadCrumbList.find((v) =>{
            return v.name === str2
          })
          if(result === undefined){
              console.log('不存在')
              this.$store.state.breadCrumbList.push({path:str,name:str2})
          }
          console.log(result)
        
          
        


              window.sessionStorage.setItem('route',str)

             
      } 
    },
    mounted(){
       this.$http.get('menus').then(
           ({data:res}) =>{
               if(res.meta.status === 200){
                    this.AsideList = res.data
                    console.log(this.AsideList)
                   
               }
           }
       ),

      this.$bus.$on('addBread',(str,str2) =>{
        this.keeproute(str,str2)
        console.log("接收")
        console.log(str,str2)
      })
       

       
    },

    computed:{
         isCollapse(){
             return  this.$store.state.isCollapse
         }
    },
    created(){
       this.keepRoute = window.sessionStorage.getItem('route')
    }
  }
</script>

<style  scoped>
   .el-row,.el-col,.el-menu{
       height: 100vh;
   }
   .ee1{
       padding-left: 200px;
   }
   h4{
     text-align: center;
     color: white;
   }
  
</style>