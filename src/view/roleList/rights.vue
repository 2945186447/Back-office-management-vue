<template>
  <el-card  class="box-card"
   shadow="hover">
      <el-table
    :data="tableData"
    stripe
    style="width: 100%"
   
    >
    <el-table-column
    type="index"
      prop="#"
      label="#"
      >
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      min-width="100%">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      min-width="100%">
    </el-table-column>
     <el-table-column
      prop="level"
      label="权限等级"
      >
      <template slot-scope="scope">
          
          <el-tag v-show="scope.row.level === '0'">一级</el-tag>
<el-tag type="success" v-show="scope.row.level === '1'">二级</el-tag>
<el-tag type="warning" v-show="scope.row.level === '2'">三级</el-tag>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                
            ],
        };
    },
    methods: {
        getPowerList(){
           this.$http.get('rights/list').then(
               ({data:res}) =>{
                   console.log(res)
                   this.tableData = res.data
               }
           )
        }
    },

    mounted () {
        this.getPowerList()
    }

}
</script>

<style scoped>
 .box-card {
    width: 99%;
    margin-top: 20px;

  }
</style>