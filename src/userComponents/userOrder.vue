<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">查看订单</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>快来看看您的订单！</p>
            </div>
          

             <div class="table">
                   <div class="table">
                    <input  placeholder="请输入内容" class="search-input" @click="search()">
                    <button class="search-button"><i class="iconfont"></i></button>
                    </div>
            </div>

            <div class="tableData">
                <el-table :data="orderData" stripe style="width: 100%"  v-loading="loading">
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
    </div>
</template>

<script>
import mockdata from "../Mock/mock";
    export default {
      data() {
        return {
          data: [],
          value1: '',
          pic:require('../assets/images/单选框未选.png'),
          pic1:require('../assets/images/单选框已选.png'),
          check:false,
          pic16:require('../assets/images/图层16.png'),
          num1: 1,
          orderData:[],
          hover:false,
          loading:true

        }
      },
      methods:{
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
        getMenuData(){
            this.$http.get('/api/localhost/menuData').then((res=>{
                this.menuData=res.data
                console.log(res)
            }))
        },
        HoverMenu(){
            // console.log(1)
            for(var j=0;j<this.menuData.length;j++){
                 this.$set(this.menuData[j],'hover',false)
            }
        },
        showHoverMenu(i,v){
            // console.log(2)

            this.HoverMenu()
              for(var j=0;j<this.menuData.length;j++){
                  if(j==i){
                 v.hover=true
                }
            }
           
        },
        hideHoverMenu(){
             this.HoverMenu()
        }
      },
      mounted(){
          this.getMenuData()
          this.HoverMenu()
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/UserSass/userRightMain.scss'
</style>

