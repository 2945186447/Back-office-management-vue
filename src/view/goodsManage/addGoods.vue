<template>
    <el-card class="topCard">
        <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
        <el-steps :active="Number(tabName)" finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
             <el-step title="商品图片"></el-step>
              <el-step title="商品内容"></el-step>
               <el-step title="完成"></el-step>
         </el-steps>
         <el-row>
             <el-col :span="25" class="col8">
               <el-form :model="addGoodsData" :rules="goodsListRules" ref="ruleForm"
               label-position="top"
                label-width="100px">
                    <el-tabs
                    :before-leave="beforeTabLeave"
                     v-model="tabName" tab-position="left" style="height: auto;" >
                        <el-tab-pane label="基本信息" >
                              <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="addGoodsData.goods_name"></el-input>
                    </el-form-item>

                     <el-form-item label="商品价格" prop="goods_price">
                        <el-input type="number" v-model="addGoodsData.goods_price"></el-input>
                    </el-form-item>

                     <el-form-item label="商品重量" prop="goods_weight">
                        <el-input type="number" v-model="addGoodsData.goods_weight"></el-input>
                    </el-form-item>

                     <el-form-item label="商品数量" prop="goods_number">
                        <el-input type="number" v-model="addGoodsData.goods_number"></el-input>
                    </el-form-item>

                    <el-form-item label="商品分类" prop="goods_cat">

                            <el-cascader
                            expand-trigger="hover"
                            v-model="addGoodsData.goods_cat"
                            :options="cataList"
                            :props="cateProps"
                            @change="handleChange"></el-cascader>
                    </el-form-item>

                    

                                

                        </el-tab-pane>
                        <el-tab-pane label="商品参数">
                            <!-- 渲染商品参数 -->
                            <el-form-item
                            v-for="item in cataCanShuData" :key="item.attr_id"
                           
                            >
                           
                            <el-checkbox-group v-model="item.attr_vals">
                               <el-checkbox v-for="(items,index) in item.attr_vals" :key="index" :label="items" border></el-checkbox>
                            </el-checkbox-group>

                            

                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="商品属性">
                            <el-form-item
                             v-for="item in goodsPropList" :key="item.attr_id"
                            >
                                 <el-input :value="item.attr_vals"></el-input>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="商品图片">

                            <el-upload
                            :on-success="uploadPath"
                            :headers="headsObj"
                            action="http://1.12.237.228:8888/api/private/v1/upload" 
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            list-type="picture"
                            >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>

                        </el-tab-pane>
                        <el-tab-pane label="商品内容">
                            <quill-editor v-model="addGoodsData.goods_introduce"
                                 ref="myQuillEditor"
                            >


                            </quill-editor>
                            <el-button @click="addGoosdAllMsg" class="submitBU" type="primary">添加商品</el-button>
                        </el-tab-pane>
                        
                    </el-tabs> 
                 </el-form>
                  
             </el-col>
             
         </el-row>

         <!-- 图片显示大图 -->

         <el-dialog
         @close="clearPath"
        :visible.sync="dialogVisible"
        width="50%"
       >
        <img :src="imgSrc">
        
        </el-dialog>
    </el-card>
</template>

<script>
import _ from 'lodash'
export default {
    data() {
        return {
            editorOption:[],
            dialogVisible:false,
            imgSrc:'',
            //上传图片请求头
            headsObj:{
                Authorization:
                window.sessionStorage.getItem('token')
            },
            //商品属性
            goodsPropList:[],
            //商品参数
            cataCanShuData:[],
         //参数切割出来的
            cateProps:{
                label:'cat_name',
                value:'cat_id',
                children:'children'
            },
//商品分类列表
       cataList:[],
            tabName:0,
            addGoodsData:
                {
                    goods_name:'',
                    goods_cat:[],
                    goods_price:'0',
                    goods_number:'0',
                    goods_weight:'0',
                    goods_introduce:'',
                    pics:[
                       
                    ],
                    attrs:[]
                }
            ,goodsListRules:{
                goods_name:[
                    {required:true,message:"商品名称不能为空",trigger:'blur'}
                ],
                goods_price:[
                    {required:true,message:"商品价格不能为空",trigger:'blur'}
                ],
                goods_number:[
                    {required:true,message:"商品数量不能为空",trigger:'blur'}
                ],
                goods_cat:[
                    {required:true,message:"商品分类不能为空",trigger:'blur'}
                ],
                goods_weight:[
                    {required:true,message:"商品重量不能为空",trigger:'blur'}
                ],
                goods_cat:[
                    {required:true,message:"商品分类不能为空",trigger:'blur'}
                ]

            }

            
        };
    },

    methods: {

        
      //提交商品全部信息
      addGoosdAllMsg(){ 
         
          this.$refs.ruleForm.validate(valid =>{
             
              if(!valid){
                
                  return this.$message.error('请填写必要的表单项')
              }
              //lodash cloneDeep(obj)深拷贝
             const form =  _.cloneDeep(this.addGoodsData)
              form.goods_cat = 
              form.goods_cat.join(',')
             console.log("goods_attrs字符串")
           
           //处理动态参数
           this.cataCanShuData.forEach(item =>{
               const newInfo = {
                   attr_id:item.attr_id,
                   attr_value:item.attr_vals.join(" ")
               }

               this.addGoodsData.attrs.push(newInfo)
           })
           //静态属性
           this.goodsPropList.forEach(item =>{
               const newInfo = {
                   attr_id:item.attr_id,
                   attr_value:item.attr_vals
               }
               this.addGoodsData.attrs.push(newInfo)
           })
           form.attrs = this.addGoodsData.attrs

           console.log(form)
           //发请求添加商品
         
   
           this.$http.post('goods',form).then(
               ({data:res}) =>{
                  if(res.meta.status === 201){
                      this.$message({
                    message: '添加商品成功成功',
                    type: 'success'
                             });
                         this.$router.push('/goods')    
                  }
               }
           )





          })
      },
        getGoodsList(){
            this.$http.get('categories').then(
                ({data:res}) =>{
                    if(res.meta.status === 200){
                        console.log("catalist")
                       
                        this.cataList = res.data
                         console.log(this.cataList)
                    }
                }
            )
        },
        //获取商品参数
        getCatecanshu(){
            this.$http.get(`categories/${this.cateid}/attributes`,{params:{sel:'many'}}).then(
                ({data:res}) =>{
                    console.log(this.cateid)
                    console.log(res)
                 res.data.forEach(element => {
                   element.attr_vals = element.attr_vals.length === 0 ? [] : element.attr_vals.split(",")    
                    });

                    this.cataCanShuData = res.data
                }
            )
        },
        //获取商品属性
        getGoodsProp(){
            this.$http.get(`categories/${this.cateid}/attributes`,{params:{sel:'only'}}).then(
                ({data:res}) =>{
                    console.log("商品属性")
                    console.log(res)
                 this.goodsPropList = res.data
                }
            )
        },
        handleChange() {
        console.log(this.addGoodsData.goods_cat);
        if(this.addGoodsData.goods_cat.length !== 3){
            this.addGoodsData.goods_cat = [];
        }
      },
   //进入下一个步骤时验证当前步骤是否填写正确
      beforeTabLeave(val,oldVal){  //获取对应的name值
          console.log("进入标签页"+val)
          console.log("离开标签页"+oldVal)
          if(oldVal === '0' && this.addGoodsData.goods_cat.length !== 3){
              
                  this.$message({
          message: '商品信息输入不完整',
          type: 'warning'
        });return false
              
          }
          //获取cata参数列表 商品参数 进入商品参数时触发
          if(val === '1'){
             
              this.getCatecanshu()
          }
          else if(val === '2'){
              this.getGoodsProp()
          }
      },
      //上传图片
      //处理图片预览效果
      handlePreview(file){
      this.dialogVisible = true
      const path = 'http://1.12.237.228:8888/'+file.response.data.tmp_path
     
      this.imgSrc = path
      console.log(this.imgSrc)

      },
      //预览后清除路劲
      clearPath(){
          this.imgSrc = ''
      },
      //处理图片移除效果
      handleRemove(file){
          console.log(file)
          const temPath = file.response.data.tmp_path //获取要移除图片的零时路劲
      const i =    this.addGoodsData.pics.findIndex(x =>{
              x.pic = temPath //找到数组addGoodsData中pics下pic 等于temPath 的索引
          }) 
          this.addGoodsData.pics.splice(i,1) //删除对应索引的值
         /*  console.log(this.addGoodsData.pics) */
      },
      //图片上传成功 将地址赋值给上传商品信息的中的pic
      uploadPath(res){
          const picInfo = {pic:res.data.tmp_path}
          this.addGoodsData.pics.push(picInfo)
          console.log(res)
          console.log(this.addGoodsData)
          
      }
       
    },//计算三级列表Id
    computed:{
     cateid(){
         if(this.addGoodsData.goods_cat.length === 3){
             return this.addGoodsData.goods_cat[2]
         }
         else{
             return null
         }
     }
    },

    mounted () {
        this.getGoodsList()
    }

}
</script>

<style scoped>
.el-steps {
    margin-top: 20px;
}
.col8{
    margin-top: 20px;
}
.el-card{
    margin-top: 20px;
}
.el-input{
    width: 300px;
}
img{
    width: 100%;
}
.submitBU{
    float: left;
}
.topCard{
    width: 100%;
    min-width: 500px;
}
</style>