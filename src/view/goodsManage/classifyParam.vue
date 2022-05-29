<template>
<el-card class="box-card">
  <el-alert title="注意:只允许为第三级分类设置相关参数" type="warning" center show-icon :closable="false"></el-alert>
  <el-form class="form">
    
     <el-form-item label="选择商品分类" prop="goods_cat">

                            <el-cascader
                            expand-trigger="hover"
                            v-model="selectCateKeys"
                            :options="cataList"
                            :props="cateProps"
                            @change="handleChange"></el-cascader>
                    </el-form-item>

   
  </el-form>


<!-- 动态参数 -->
  <el-tabs  
  @tab-click="handleClick"
  v-model="activeName"
  >
    <el-tab-pane label="动态参数" name="many">
      <el-button type="primary" :disabled="isDisabled"  @click="dialogVisible = true">添加参数</el-button>

      <el-table
    :data="manyTableData"
    style="width: 100%">

    <el-table-column type="expand">
       <!-- 展开行 -->
      <template slot-scope="scope">
        <el-form label-position="left" inline >
          <el-form-item label="">
            <el-tag
          :key="tag"
          v-for="tag in scope.row.attr_vals"
          closable
          :disable-transitions="false"
          @close="handleClose(tag,scope.row)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="scope.row.inputVisible"
          v-model="scope.row.inputValue"
          ref="saveTagInput"
          size="small"
          @blur="handleInputConfirm(scope.row)"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                  </el-form-item>
                </el-form>
      </template>
    </el-table-column>
    
  
    <el-table-column
      label="#"
      prop="#"
      type="index"
      >
    </el-table-column>
    <el-table-column
      label="参数名称"
      prop="attr_name">
    </el-table-column>

    <el-table-column
      label="操作"
      prop="desc">
      <template slot-scope="scope">
          <el-button style="float:left" icon="el-icon-edit" @click="changeCate(scope.row)" type="primary">修改</el-button>
          <el-button style="float:left" @click="delCategories(scope.row.cat_id,scope.row.attr_id)" icon="el-icon-delete" type="danger">删除</el-button>
      </template>
    </el-table-column>


  </el-table>

    </el-tab-pane>
   <!--  静态属性 -->
    <el-tab-pane label="静态属性" name="only">
 <el-button type="primary" :disabled="isDisabled" @click="dialogVisible = true">添加属性</el-button>

 <el-table
    :data="onlyTableData"
    style="width: 100%">

    <el-table-column type="expand">
 <!-- 展开行 -->
     <template slot-scope="scope">
        <el-form label-position="left" inline >
          <el-form-item label="">
            <el-tag
          :key="tag"
          v-for="tag in scope.row.attr_vals"
          closable
          :disable-transitions="false"
          @close="handleClose(tag,scope.row)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="scope.row.inputVisible"
          v-model="scope.row.inputValue"
          ref="saveTagInput"
          size="small"
          @blur="handleInputConfirm(scope.row)"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                  </el-form-item>
                </el-form>
      </template>
    </el-table-column>
    
  
    <el-table-column
      label="#"
      prop="#"
      type="index"
      >
    </el-table-column>
    <el-table-column
      label="属性名称"
      prop="attr_name">
    </el-table-column>

    <el-table-column
      label="操作"
      prop="desc">
      <template slot-scope="scope">
          <el-button style="float:left" @click="changeCate(scope.row)" icon="el-icon-edit" type="primary">修改</el-button>
          <el-button style="float:left" @click="delCategories(scope.row.cat_id,scope.row.attr_id)" icon="el-icon-delete" type="danger">删除</el-button>
      </template>
    </el-table-column>


  </el-table>



    </el-tab-pane>
   
  </el-tabs>
<!-- 添加 属性/参数 -->
     <el-dialog
  :title="'添加'+titleText"
  :visible.sync="dialogVisible"
  width="50%"
  @close="handleClose3">
  <el-form
  :model="dongParam"
  :rules="dongParamRules"
  ref="dongParam"
   label-position="left"
   label-width="100px"
  >
    <el-form-item
    :label="titleText"
    prop="attr_name"
    
    >
    <el-input v-model="dongParam.attr_name"></el-input>

    </el-form-item>
  </el-form>
  
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDongProp">确 定</el-button>
  </span>
</el-dialog>


<!-- 修改 属性/参数 -->
     <el-dialog
  :title="'修改'+titleText"
  :visible.sync="dialogVisible2"
  width="50%"
  @close="handleClose3">
  <el-form
  :model="dongParam2"
  :rules="dongParamRules"
  ref="dongParam2"
   label-position="left"
   label-width="100px"
  >
    <el-form-item
    :label="titleText"
    prop="attr_name"
    
    >
    <el-input v-model="dongParam2.attr_name"></el-input>

    </el-form-item>
  </el-form>
  
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="addDongProp2">确 定</el-button>
  </span>
</el-dialog>



</el-card>
  
</template>

<script>
export default {

  data() {
    return {
      //级联选择框双向绑定的数组
      selectCateKeys:[],
       
         /* 二级菜单按钮不可点击 */
       
      
      dialogVisible2:false,
      //添加动态参数规则
      dongParamRules:{
        attr_name:[
          {required:true,message:"参数不能为空",trigger:'blur'}
        ]
      },
      //添加动态参数 参数列表
      dongParam:{
        attr_name:'',
        attr_sel:'',
      },
      dialogVisible:false,//添加动态参数
       activeName: 'many', //默认显示动态参数
      manyTableData:[], //动态参数列表
      onlyTableData:[],//静态属性列表
      cataList: [], 
       cateProps:{
                label:'cat_name',
                value:'cat_id',
                children:'children'
            },
            threeListId:0,
  //修改属性，参数data
 dongParam2:{
      cat_id:0,
      attr_name:'',
      attr_id:0
    }

    }
  
   
  },

  methods:{
  
  getParamsData(){
     //选中的不是三级分类
      console.log(this.selectCateKeys)
         if(this.selectCateKeys.length !== 3){
         this.selectCateKeys = []
         return
       }


       //选择三级分类
          console.log(this.cateId)
        this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:this.activeName}}).then(
                ({data:res}) =>{
                  if(res.meta.status === 200){
                    res.data.forEach(element => {
                       element.attr_vals =  element.attr_vals ? element.attr_vals.split(',') : []
                        //给每个二级列表下的tag中的input都设置v-model属性和是否显示
                        element.inputVisible = false
                        element.inputValue = ''

                   });
                   this.$message({
          message: '获取成功',
          type: 'success'
        });
                  }
                       
                  
        if(this.activeName === 'many'){
              this.manyTableData = res.data
        }
        else{
               this.onlyTableData = res.data
        }
            

                   
          
                }
            )
  },

    handleChange(val){
     
this.getParamsData()
       
    },




    handleClick(){
         console.log(this.activeName)
         this.getParamsData()
         
    },
    handleClose3(){
   
      this.dongParam.attr_name = ''
       this.dongParam2.attr_name = ''
       

     
    },
     addDongProp(){
       
           this.$refs.dongParam.validate(valid =>{
             if(!valid) return
                 this.$http.post(`categories/${this.cateId}/attributes`,{
                   attr_name:this.dongParam.attr_name,
                   attr_sel:this.activeName
                 }).then(
        ({data:res}) =>{
          if(res.meta.status === 201){
            this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.dialogVisible = false
          this.getParamsData()
           this.dongParam.attr_name =''
          }
          
        }
      )
             
           })
    
     },

     delCategories(cid,attrid){
         this.$confirm('此操作将永久删除该属性/参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              this.$http.delete(`categories/${cid}/attributes/${attrid}`).then(
         ({data:res}) =>{
           if(res.meta.status === 200){
                  this.$message({
          message: '删除成功',
          type: 'success'
        });
          this.getParamsData()
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
     //修改参数/属性
     changeCate(val){
     
       this.dialogVisible2 = true
       this.dongParam2.attr_name = val.attr_name
       this.dongParam2.cat_id = val.cat_id
       this.dongParam2.attr_id = val.attr_id
       
     },
     //修改参数/属性
     addDongProp2(){
        this.dialogVisible2 = false
         this.$refs.dongParam2.validate(valid =>{
              if(!valid)  return
 this.$http.put(`categories/${this.dongParam2.cat_id}/attributes/${this.dongParam2.attr_id}`,{
         attr_name:this.dongParam2.attr_name,
         attr_sel:this.activeName
       }).then(
         ({data:res}) =>{
           if(res.meta.status === 200){
        this.$message({
                  message: '修改成功',
                  type: 'success'
                });
               this.getParamsData()
               this.dongParam2.attr_name =''
           }
          
         }
       )
        })

       
     },
      //点击将tag变成输入框
      showInput(val){
        val.inputVisible = true
          this.$nextTick(_ => { //   $nextTick当页面上元素重新渲染之后才会执行回调函数
          //即当inputVisible = true 页面会重新渲染 如果直接调用 文本框获得焦点方法时 会报错
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      //删除二级菜单下的tag
      handleClose(tag,val) {
        
        val.attr_vals.splice(val.attr_vals.indexOf(tag), 1);
      },
      //添加二级菜单下的tag
     handleInputConfirm(val) {
        let inputValue = val.inputValue;
        console.log(val)
        if (inputValue) {
           val.attr_vals.push(inputValue)
        }
        val.inputVisible = false;
        val.inputValue = '';
      }
    
  },

  mounted () {
   this.$http.get('categories').then(
                ({data:res}) =>{
                    if(res.meta.status === 200){
                        console.log("catalist")
                        console.log(res)
                        this.cataList = res.data
                        
                    }
                }
            )
  },
  computed:{
    titleText(){
      if(this.activeName === 'many'){
        return '动态参数'
      }
      else{
        return '静态属性'
      }
    },
    //添加属性/参数是否可以点击
    isDisabled(){
      if(this.selectCateKeys.length !==3 ){
           return true
      }
        return false

    },
    //获取三级分类id
cateId(){
      if(this.selectCateKeys.length === 3){
         return this.selectCateKeys[2]
      }
     return null
},
    
  }

}
</script>

<style scoped>
.box-card{
   margin-top: 20px;
   min-width: 1000px;
  }
  .form{
    margin-top: 20px;
  }


  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>