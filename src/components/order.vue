<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">订单管理</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>来看看订单吧！</p>
            </div>
            <div class="table">
                   <div class="table">
                    <input  placeholder="请输入内容" class="search-input" @click="search()">
                    <button class="search-button"><i class="iconfont"></i></button>
                    </div>
            </div>

            <div class="tableData">
                <el-table :data="orderData" stripe style="width: 100%">
                <el-table-column   prop="order_no"  label="订单编号" width="180"> </el-table-column>
                <el-table-column prop="order_create_date" label="下单时间" width="180"> </el-table-column>
                <el-table-column prop="order_status" label="订单状态"></el-table-column>
                <el-table-column prop="order_money" label="订单金额"></el-table-column>
                <el-table-column prop="sell_name" label="买家姓名"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                 <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                 <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </div>          
        </div>
        <el-dialog  :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form">
            <el-form-item label="订单编号" :label-width="formLabelWidth">
             <el-input v-model="form.order_no" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
             <el-form-item label="下单时间" :label-width="formLabelWidth">
             <el-input v-model="form.order_create_date" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
             <el-form-item label="订单状态" :label-width="formLabelWidth">
             <el-input v-model="form.order_status" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
             <el-form-item label="订单金额" :label-width="formLabelWidth">
             <el-input v-model="form.order_money" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
            <el-form-item label="商铺编号" :label-width="formLabelWidth">
             <el-input v-model="form.name" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
            <el-form-item label="商铺名称" :label-width="formLabelWidth">
             <el-input v-model="form.name" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
            </el-form>
             <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                 <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
             </div>
        </el-dialog>
        <el-pagination background :page-sizes="[1,5,10,15,20]" :page-size="pageSize" layout="prev, sizes,pager, next,total,jumper" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" @size-change="sizeChange"></el-pagination>
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
          pageSize:1,//每页的数据条数
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
    form: {
            order_no: '',
            order_create_date: '',
            order_status: '',
            order_money: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
           },
           formLabelWidth: '120px'
        }
      },
      methods:{
        handleClick(row) {
            this.dialogFormVisible=true
            this.orderMinute=row
            this.form.order_no=row.order_no
            console.log(row.order_no);
        },
        clickCheck(){
            console.log(1)
            if(this.check==true){
                this.check=false
              }else{
                this.check=true
              }
            
        },
           open2() {
        this.$message({
          message: '恭喜你，搭配成功',
          type: 'success'
        });
      },
        getpage(){
            this.$http.get('/api/localhost/order',{
                  params:{
                      pageNum:this.currentPage,
                      pageSize:this.pageSize,               
                  }
                  }).then((res=>{
                this.orderData=res.data
                console.log(res)
            }))
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
          }
         
      },
      mounted(){
          this.getpage()
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/rightMain.scss'
</style>

