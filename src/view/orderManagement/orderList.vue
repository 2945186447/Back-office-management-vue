<template>
 <el-card class="box-card"  shadow="hover">
    <el-row :gutter="20">
      <el-col :span="7">
   <el-input :clearable="true" @clear="searchGoods" v-model="searchOrder.query" placeholder="请输入内容">
    <el-button slot="append" icon="el-icon-search"  @click="searchGoods"  clearable="true" ></el-button>
  </el-input>
      </el-col>
    </el-row>
    <!-- table表头 -->
   <el-row width="100%" >
     <el-col >
        <el-table class="orderList"
      :data="orderListData"
      :stripe="true"
     
     
      >
      <el-table-column
        type="index"
        label="#"
       
      >
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
         min-width="200%"
        >
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格(元)"
        min-width="110%"
        >
      </el-table-column>
      <el-table-column
        prop="pay_status"
        label="是否付款"
        min-width="90%"
        >
        
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay === '0'" type="danger">未付款</el-tag>
           <el-tag v-else>已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pay_status"
        label="是否发货"
        min-width="90%"
        >
        <template slot-scope="scope">
          <span>{{scope.row.is_send}}</span>
        </template>}
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="下单时间"
        min-width="200%"
       >
       <!-- 全局过滤器改变时间格式 -->
       <template slot-scope="scope">
              {{scope.row.create_time | dataFormat}} 
       </template>
      </el-table-column>
      <el-table-column
        prop="#"
        label="操作"
       min-width="108%"
       >
        <template slot-scope="scope">
        
   
       <el-button type="primary" icon="el-icon-edit" style="float:left" @click="dialogVisible = true" ></el-button>
   
       <el-button type="success" icon="el-icon-location" style="float:left" @click="Logistics_progress(scope.row.order_id)" ></el-button>
    
       
          
          
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchOrder.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="searchOrder.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
         :total='total'
     >
    </el-pagination>
     </el-col>
    
   </el-row>
   <!-- 修改地址 -->
   <el-dialog
  title="修改地址"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">

  <el-form
  :model="location"
  :rules="locationRules"
  :ref="location"
  label-width="100px"
  >
    <el-form-item
    label="省市区/县"
    prop="address1"
    >
     <el-cascader
    v-model="location.address1"
    :options="citydata"
    :props="{ expandTrigger: 'hover' }"
    ></el-cascader>
    </el-form-item>
    <el-form-item
    label="详细地址"
    prop="address2"
    >
      <el-input v-model="location.address2"></el-input>
    </el-form-item>
  </el-form>

 
 
  <span slot="footer">
    <el-button @click="dialogVisible = false" >取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

<!-- 物流进度 -->

 <el-dialog
  title="物流进度"
  :visible.sync="dialogVisible2"
  width="50%"
  :before-close="handleClose"> 


     <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.time">
      {{activity.context}}
    </el-timeline-item>
  </el-timeline>
 
  <span slot="footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  </span>
</el-dialog>

</el-card>
</template>

<script>
import citydata from './citydata'
export default {
  data() {
    return {
      citydata,
      location:{
        address1:[],
        address2:''
      },
      locationRules:{
        address1:[
          {required:true,message:'请选择省市区/县',trigger:'blur'}
        ],
         address2:[
          {required:true,message:'请输入详细地址',trigger:'blur'}
        ]
        
      },
      dialogVisible2:false,
       dialogVisible:false,
      //订单总数
      total:0,
      //订单列表数据
      orderListData: [],
      //订单列表查询
      searchOrder:
        {
          pagenum:1,
          query:'',
          pagesize:10
        },

        //物流数据
        activities: [
    {
      time: "2018-05-10 09:39:00",
      ftime: "2018-05-10 09:39:00",
      context: "已签收,感谢使用顺丰,期待再次为您服务",
      location: ""
    },
    {
      time: "2018-05-10 08:23:00",
      ftime: "2018-05-10 08:23:00",
      context: "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
      location: ""
    },
    {
      time: "2018-05-10 07:32:00",
      ftime: "2018-05-10 07:32:00",
      context: "快件到达 [北京海淀育新小区营业点]",
      location: ""
    },
    {
      time: "2018-05-10 02:03:00",
      ftime: "2018-05-10 02:03:00",
      context: "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
      location: ""
    },
    {
      time: "2018-05-09 23:05:00",
      ftime: "2018-05-09 23:05:00",
      context: "快件到达 [北京顺义集散中心]",
      location: ""
    },
    {
      time: "2018-05-09 21:21:00",
      ftime: "2018-05-09 21:21:00",
      context: "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
      location: ""
    },
    {
      time: "2018-05-09 13:07:00",
      ftime: "2018-05-09 13:07:00",
      context: "顺丰速运 已收取快件",
      location: ""
    },
    {
      time: "2018-05-09 12:25:03",
      ftim: "2018-05-09 12:25:03",
      context: "卖家发货",
      location: ""
    },
    {
      time:    "2018-05-09 12:22:24",
      ftime:   "2018-05-09 12:22:24",
      context:  "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
      location: ""
    },
    {
      time:    "2018-05-08 21:36:04",
      ftime:   "2018-05-08 21:36:04",
      context:  "商品已经下单",
      location: ""
    }
  ]
      

    };
  },

  methods: {
    //订单显示数量
    handleSizeChange(val){
      this.searchOrder.pagesize = val
        this.findOrderList()
       
    },
    //翻页
    handleCurrentChange(val){
      this.searchOrder.pagenum = val
       this.findOrderList()
  
    },
    //查询订单
    searchGoods(){
          console.log(this.searchOrder.query)
    },
    //获取订单列表
     findOrderList(){
        this.$http.get('orders',{params:this.searchOrder}).then(
      ({data:res}) =>{
        console.log(res)
        this.orderListData  =res.data.goods
        this.total = res.data.total
      }
    )
     },
     //
     handleClose(){
             this.dialogVisible = false
             this.dialogVisible2 = false
     },
     //显示物流进度  没有接口方法
     Logistics_progress(val){
       console.log(val)
        this.dialogVisible2 = true
        
        
     }
  },

  mounted () {
    this.findOrderList()
  }

}
</script>

<style scoped>
.box-card{
  margin-top: 20px;
  width: 99%;
  min-width: 1150px;
}
.el-table{
  border: 1px solid white;
}
.orderList{
  width: 100%;
}
</style>