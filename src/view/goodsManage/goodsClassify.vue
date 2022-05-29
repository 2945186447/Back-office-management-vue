<template>
<div>
    <el-card>
         <el-row class="row1">
    <el-col>
         <el-button type="primary">主要按钮</el-button>
    </el-col>
         </el-row>

    <el-row>
        <el-col>
              <tree-table
            class="tb-cate"
           :data="tableData"
            :columns="columns" 
           :selection-type="false" 
           :expand-type="false" 
           show-index index-text="#"
            border 
           :show-row-hover="false"
          >
          <!-- 是否有效 -->
            <template slot="isok" slot-scope="scope">
              <i class="el-icon-error" v-if="scope.row.cat_deleted" style="color: red"></i>
              <i class="el-icon-success" v-else style="color: lightGreen"></i>
            </template>
            <!-- 排序 -->
            <template slot="level" scope="scope">
              <el-tag type="primary" effect="plain" size="mini" v-if="scope.row.cat_level == 0">
              一级
              </el-tag>
              <el-tag type="success" effect="plain" size="mini" v-else-if="scope.row.cat_level == 1">
              二级
              </el-tag>
              <el-tag type="warning" effect="plain" size="mini" v-else>三级</el-tag>
            </template>
            <!-- 操作 -->
            <template slot="opt">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="change" style="float:left">
              编辑
              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"  style="float:left">
              删除
              </el-button>
            </template>
          </tree-table>
        </el-col>
        <el-row>
     <el-col>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
     
      :total="total">
    </el-pagination>
     </el-col>
   </el-row>
    </el-row>
       
    </el-card>
   
</div>
  
</template>

<script>
export default {
    data() {
        return {
            columns: [
        { label: "分类名称", prop: "cat_name" },
        {
          label: "是否有效",
          prop: "cat_deleted",
          type: "template",
          template: "isok",
        },
        {
          label: "分类等级",
          prop: "cat_level",
          type: "template",
          template: "level",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ]
,
            
            //商品分类数据
            tableData: [],
            total:[],
              queryInfo:{

             pagenum:2,
            //当前每页显示多少条数据
              pagesize:5,

                       }
        };
    },
    methods:{
     //获取商品分类列表
     getGoodsClassifyList(){
         this.$http.get('categories',{params:this.queryInfo}).then(
             ({data:res}) =>{
                 if(res.meta.status === 200){
                     console.log(res)
                     this.tableData = res.data.result
                     this.total = res.data.total
                 }
             }
         )
     },

  handleSizeChange(val){
     this.queryInfo.pagesize = val
     this.getGoodsClassifyList()
  },
     
    //分页器其不同页面的数据
    handleCurrentChange(val){
       console.log(val)
      
       this.queryInfo.pagenum = val
        this.getGoodsClassifyList()
    }, 
    //
    change(){
        console.log("1")
    }
    },

   

    mounted () {
        this.getGoodsClassifyList()
    }

}
</script>

<style scoped>
.el-card{
    margin-top: 20px;
}
.tb-cate{
    margin-top: 20px;
}
div{
  width: 100%;
  min-width: 900px;
}

</style>