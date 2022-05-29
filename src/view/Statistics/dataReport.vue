<template>
 <el-card class="box-card" shadow="hover">
         <div style=" width:100%; height:600px; margin-left:20px" ref="echarts"></div>
          
        </el-card>
</template>

<script>
import * as echarts from 'echarts';
export default {

  data() {
    return {
      property: 'value',
    };
  },
  mounted () {
    this.$http.get('reports/type/1').then(
      ({data:res}) =>{
        console.log(res)
        const E = echarts.init(this.$refs.echarts)
        E.setOption(res.data)
      }
    )
  }

}
</script>

<style scoped>
.box-card{
  margin-top: 20px;
  height:600px; 
  width:95% ;
  min-width: 1150px;
  
}
</style>