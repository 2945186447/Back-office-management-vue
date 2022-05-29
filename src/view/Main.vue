<template>
  <el-container>
  <el-aside width="auto">
      <CommonAside/>
  </el-aside>
  <el-container>
      <el-header>
        <CommonHeader></CommonHeader>
      </el-header>
    <el-main>
    <Breadcrumb></Breadcrumb>
        <router-view></router-view>
    </el-main>
    
  </el-container>
  
</el-container>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
export default {
  components:{
      CommonAside,
      CommonHeader,
      Breadcrumb
  },

  mounted () {
//获取侧边栏列表
     
  }
}
</script>

<style scoped>


.el-container{
    height: 100%;
}
.el-header{
    background-color: white;
}



</style>