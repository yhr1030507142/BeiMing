<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">订单管理</h2>
            <div class="showName">
                   <p>Hi,{{$store.state.userLogin.userName}}</p>
                     <p>来看看订单吧！</p>
            </div>
            <div class="table">
                   <div class="block" style="float:left">
   
    <el-date-picker
      v-model="dateValue"
      value-format="yyyy-MM-dd"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="changDate"
      :picker-options="pickerOptions">
    </el-date-picker>

     
  </div>
<div style="float:left;margin-left:20px;">
     <el-select v-model="orderStatusId" slot="prepend" placeholder="请选择" @change="changSelect">
      <el-option label="全部订单"  :value='0' ></el-option>                   
      <el-option :label="v.orderStatusName"  :value="v.orderStatusId" v-for="(v,i) in statusArr" :key="i"></el-option>      
    </el-select>
</div>

            </div>
    <div class="tableData">          
    <el-table :data="orderData" style="width: 100%;">    
    
     <el-table-column type="expand">
       
    <template slot-scope="props">
    <el-table ref="multipleTable" :data="props.row.orderMenuDtos" tooltip-effect="dark" style="width: 100%;height:auto">
    <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->

    <el-table-column  label="菜品名称">
    <template slot-scope="scope">{{ scope.row.menuName }}</template>
    </el-table-column>

    <el-table-column  label="菜品单价">
    <template slot-scope="scope">{{ scope.row.menuPrice }}</template>
    </el-table-column>

     <el-table-column  label="菜品数量">
    <template slot-scope="scope">{{ scope.row.menuNum }}</template>
    </el-table-column>


    
  </el-table>

         </template>
         
       
    </el-table-column>
    
                <el-table-column prop="orderNo"  label="订单编号" width="180"> </el-table-column>
                <el-table-column prop="orderCreateDate" label="下单时间" width="180"> </el-table-column>
                <el-table-column prop="orderStatusName" label="订单状态"></el-table-column>
                <el-table-column prop="totalPrice" label="订单总金额"></el-table-column>
                <el-table-column prop="empName" label="买家姓名"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                 <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                 <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button> -->
                </template>
                </el-table-column>
    </el-table>
            </div>       
        <el-pagination background :page-sizes="[1,2,5,10]" :page-size="pageSize" layout="prev, sizes,pager, next,total,jumper" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" @size-change="sizeChange"></el-pagination>

        </div>
        <el-dialog  :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form">
            <el-form-item label="订单编号" :label-width="formLabelWidth">
             <el-input v-model="form.orderNo" autocomplete="off" style="width:250px;" readonly="readonly"></el-input>
            </el-form-item>
             <el-form-item label="下单时间" :label-width="formLabelWidth">
             <el-input v-model="form.orderCreateDate" autocomplete="off" style="width:250px;" readonly="readonly"></el-input>
            </el-form-item>
             <el-form-item label="订单状态" :label-width="formLabelWidth">
             <el-input v-model="form.orderStatusName" autocomplete="off" style="width:250px;" readonly="readonly"></el-input>
            </el-form-item>
             <el-form-item label="订单总金额" :label-width="formLabelWidth">
             <el-input v-model="form.totalPrice" autocomplete="off" style="width:250px;" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="买家名臣" :label-width="formLabelWidth">
             <el-input v-model="form.empName" autocomplete="off" style="width:250px;" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="商铺名称" :label-width="formLabelWidth">
             <el-input v-model="form.shopName" autocomplete="off" style="width:250px;" readonly="readonly"></el-input>
            </el-form-item>
            </el-form>
             <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="changeOrder(form.btn1Url)" v-show="form.btn1">{{form.btn1}}</el-button>
                <el-button @click="changeOrder(form.btn1Ur2)" v-show="form.btn2">{{form.btn2}}</el-button>   
             </div>
        </el-dialog>
        <div>

        </div>



    </div>

</template>

<script>
import mockdata from "../Mock/mock";
    export default {
      data() {
        return {
          data: [],
        //分页数据开始
          total:5,//默认数据总数
          pageSize:2,//每页的数据条数
          currentPage:1,//默认开始页面
        //分页数据结束
          value1: '',
          pic:require('../assets/images/单选框未选.png'),
          pic1:require('../assets/images/单选框已选.png'),
          check:false,
          pic16:require('../assets/images/图层16.png'),
          num1: 1,
          orderData:[],
          dialogFormVisible:false,
          orderMinute:[],
          orderDataChildren:[],
          arr:[],
        //   日期
          dateValue:[],
          orderStatusId:0,
        //   状态接口
          statusArr:[],
          start:'',
          end:'',
    form: {
            orderNo: '',
            orderCreateDate: '',
            orderStatusName: '',
            totalPrice: '',
            empName:'',
            shopName:'',
            btns:[],
            btn1:'',
            btn2:'',
            btn1Url:'',
            btn1Ur2:'',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
           },
           formLabelWidth: '120px',
    
    pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
              console.log(picker)
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        }
        
      },
      methods:{
        handleClick(row) {
            console.log(row)
            this.dialogFormVisible=true
            this.code = row.orderNo
              this.$http.get('/api1/1024/cq1024/order/details/'+this.code).then(res=>{
                    console.log(res.data.info.orderDto)
                     this.arr = res.data.info.orderDto
                        this.form.orderNo = this.arr.orderNo
                        this.form.orderCreateDate=this.arr.orderCreateDate
                        this.form.orderStatusName=this.arr.orderStatusName,
                        this.form.totalPrice=this.arr.totalPrice
                        this.form.empName=this.arr.empName
                        this.form.shopName=this.arr.shopName
                        this.form.btns=this.arr.btns
                       this.form.btn1 =this.arr.btns.btn1Name
                       this.form.btn1Url=this.arr.btns.btn1Url
                        this.form.btn2 =this.arr.btns.btn2Name
                       this.form.btn1Ur2=this.arr.btns.btn2Url
            console.log(row.orderNo);

                })
                console.log(this.arr)
            
          
        },
            changDate(value){
              console.log(value)
              let value1= value[0]
              let value2= value[1]
              this.start = value1
              this.end =value2
              this.getpage()    
          },
        clickCheck(){
            console.log(1)
            if(this.check==true){
                this.check=false
              }else{
                this.check=true
              }
            
        },
        getpage(){
          if(this.start == '' || this.end ==''){
            this.$http.get('/api1/1024/cq1024/order/list',{
                  params:{
                      currentPage:this.currentPage,
                      pageSize:this.pageSize, 
                      statusId: this.orderStatusId          
                  }
                  }).then((res=>{
                    console.log(res)
                this.orderData=res.data.info.orders.list
                this.total =res.data.info.orders.total
                // this.orderDataChildren=res.data.info.orders.list
                let arr =[];
                for(var i = 0;i<this.orderData.length;i++){
                        arr[i]=this.orderData[i].orderMenuDtos
                }
                 this.orderDataChildren = arr
            }))
          }else{
               this.$http.get('/api1/1024/cq1024/order/list',{
                  params:{
                      currentPage:this.currentPage,
                      pageSize:this.pageSize, 
                      start:this.start,
                      end:this.end,
                      statusId: this.orderStatusId          
                  }
                  }).then((res=>{
                    console.log(res)
                this.orderData=res.data.info.orders.list
                this.total =res.data.info.orders.total
                // this.orderDataChildren=res.data.info.orders.list
                let arr =[];
                for(var i = 0;i<this.orderData.length;i++){
                        arr[i]=this.orderData[i].orderMenuDtos
                }
                 this.orderDataChildren = arr
            }))
          }
      
        },
          handleCurrentChange(val){
                this.currentPage = val;
                console.log(this.currentPage)
                 this.getpage()
          },
          search(){
              this.getpage()
          },
          sizeChange(val){
              this.pageSize=val
              this.getpage()
          },
        //   订单修改
          changeOrder(val){
            console.log(val)
            if(val == "/order/menus"){
                this.$http.get('/api1/1024/cq1024/'+val+'/'+this.code,{
                  params:{
                      snapData:''
                  }
              }).then(res=>{
                    console.log(res)
                    let order = res.data.info.orderMenuDtos[0].orderNo
                    this.$router.push('userEvaluate/'+order)
                    //this.$router.push({name:'yaohuiqian'})
                    // return false
              })
            }
              console.log(val)
              this.$http.get('/api1/1024/cq1024/'+val+'/'+this.code,{
                  params:{
                      snapData:''
                  }
              }).then(res=>{
                    console.log(res)
              })
          },
        //   更改下拉状态
          getSelectData(){
                this.$http.get('/api1/1024/cq1024/order/status').then(res=>{
                    if(res.data.code==100){
                    this.statusArr = res.data.info.orderStatuses
                    }
                     
                })
            
          },

          changSelect(val){
             console.log(val)
             if(val == 0){
                this.orderStatusId = 0
             }else{
                this.orderStatusId = this.statusArr[val-1].orderStatusId
                console.log(this.orderStatusId)
             }
                
                 this.getpage()
          }
         
      },

      mounted(){
          this.getpage()
          this.getSelectData()
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/rightMain.scss';
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

