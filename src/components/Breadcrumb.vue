<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
  <el-breadcrumb-item v-for="item in this.$store.state.breadCrumbList" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
 
</el-breadcrumb>
</template>

<script>
export default {

}
</script>


<style>
 .bread{
        width: 100%;
        min-width: 1150px;
      }
</style>