<template>

<div>
   <router-view></router-view>
</div>

   

   
   
</template>

<script>
import Login from './components/login.vue'

export default {
 
  components:{
    Login
  }
}
</script>

<style scoped>
div{
  height: 100%;
 
}
</style>