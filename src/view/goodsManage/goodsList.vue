<template>
  <el-card class="box-card" shadow="hover">
    <el-row :gutter="20">
      <el-col :span="7">
   <el-input :clearable="true" @clear="searchGoods" v-model="xianshigoods.query" placeholder="请输入内容">
    <el-button slot="append" icon="el-icon-search"  @click="searchGoods"  clearable="true" ></el-button>
  </el-input>
      </el-col>
      <el-col :span="4" class="col2">
         <el-button type="primary" @click="goAddGoods" >添加商品</el-button>
      </el-col>
     
    </el-row>
    <!-- table表头 -->
   <el-row width="100%" >
     <el-col >
        <el-table class="goodsList"
      :data="goodsLIstData"
      :stripe="true"
      width="100%"
      
      >
      <el-table-column
        type="index"
        label="#"
        
      >
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
         min-width="380%"
        >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)"
        min-width="75%"
        >
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        min-width="60%"
        >
      </el-table-column>
      <el-table-column
        prop="#"
        label="创建时间"
        min-width="113%"
       >
       <!-- 全局过滤器改变时间格式 -->
       <template slot-scope="scope">
           {{scope.row.add_time | dataFormat}}
       </template>
      </el-table-column>
      <el-table-column
        prop="#"
        label="操作"
       min-width="100%"
       >
        <template slot-scope="scope">
        
       
       <el-button type="primary" icon="el-icon-edit" style="float:left"></el-button>
   
       <el-button type="danger" icon="el-icon-delete" style="float:left" @click="deleteGoods(scope.row.goods_id)"></el-button>
    
       
          
          
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="xianshigoods.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="xianshigoods.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
     
      :total="total">
    </el-pagination>
     </el-col>
    
   </el-row>

</el-card>

</template>

<script>
export default {
   
    data() {
        return { 
            
            goodsLIstData:[],
            total:[],
            xianshigoods:{
        query:'',
        pagenum:1,
        pagesize:10
    },
            property: 'value',
        }
    },
    methods: {
       getGoodsList(){
           this.$http.get('goods',{params:this.xianshigoods}).then(
               ({data:res}) =>{
                  console.log(res)
                   if(res.meta.status === 200){
                        this.$message({
                        message: '获取商品列表成功',
                        type: 'success'
        });
                        this.total = res.data.total
                   this.goodsLIstData = res.data.goods
                   }
                  
                  
               }
           )
       } ,
        //翻页器
handleSizeChange(val){
     this.xianshigoods.pagesize = val

    this.getGoodsList()


},
handleCurrentChange(val){

    this.xianshigoods.pagenum = val

    this.getGoodsList()

},

deleteGoods(val){
    this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             //删除角色指定权限
             this.$http.delete(`goods/${val}`).then(
                 ({data:res}) =>{
                     if(res.meta.status === 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        }); 
                        this.getGoodsList()
                     }
                     else{
                          this.$message({
                            type: 'falid',
                            message: 'info!'
                        }); 
                     }
                 }
             )
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
},
//根据名字模糊搜索商品
searchGoods(e){
   
   
         this.getGoodsList()
    
},

goAddGoods(){
    const str = '/addGoods'
    const str2 = '添加商品'
    this.$router.push('/addGoods'),
   
   this.$bus.$emit('addBread',str,str2)
}


    },
  
    mounted () {
        this.getGoodsList()
    }

}
</script>

<style scoped>

  .box-card{
      margin-top: 20px;
      width: 99%;
      min-width: 1150px;
    
  }
  .goodsList{
      margin-top: 20px;
      border: 1px solid whitesmoke;
  }
</style>