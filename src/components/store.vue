<template>
    <div class="rightMain" ref="rightMain" @click="rightMain()">
        <div class="w">
           <h2 class="dishes-font">店铺管理</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>这里是店铺管理面板</p>
            </div>
            <div class="table">
                   <input  type="text" v-model="shopName" style="float:left;width:180px;height:50px;font-size:25px;background:#f5f5f5" disabled="disabled" ref="shopName" @click.stop=""/><div style="float:left;margin-left:20px;margin-top:5px;"><el-button type="primary" icon="el-icon-edit" circle @click.stop="updateShopName()"></el-button> </div>
              <div class="button-group">
                   <button>危险按钮</button>
                     <button>危险按钮</button>
              </div>
            </div>

            <div class="tableData">
                <div style="width:100%;height:300px;">
                                <div style="margin-top:20px;width:100%;height:80px;"> <h2 style="float:left">早餐最晚订餐时间：</h2>
             <el-time-select v-model="valueBreakfast" style="float:left"
                      :picker-options="{start: '08:30', step: '00:15',end: '18:30' }" placeholder="选择时间">
              </el-time-select>
              </div> 
               <div style="margin-top:20px;width:100%;height:80px;"> <h2 style="float:left">午餐最晚订餐时间：</h2>
             <el-time-select v-model="valueLunch" style="float:left"
                      :picker-options="{start: '08:30', step: '00:15',end: '18:30' }" placeholder="选择时间">
              </el-time-select>
              </div> 
               <div style="margin-top:20px;width:100%;height:80px;"> <h2 style="float:left">晚餐最晚订餐时间：</h2>
             <el-time-select v-model="valueDinner" style="float:left"
                      :picker-options="{start: '08:30', step: '00:15',end: '18:30' }" placeholder="选择时间">
              </el-time-select>
              </div> 
                    <el-button type="danger">保存</el-button>
                </div>
               
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
          total:0,//默认数据总数
          pageSize:8,//每页的数据条数
          currentPage:1,//默认开始页面
          dishName:'',
          shopName:'店铺名',
          valueBreakfast:'',
          valueLunch:'',
          valueDinner:''
        }
      },
      methods:{
          getData(){
                this.$http.get('/api/chengpeng/dishTypes').then((res)=>{
                    // this.data=res.data
                   
                })            
          },
          getpage(){
              this.$http.get('/api/chengpeng/dishTypes',{
                  params:{
                      pageNum:this.currentPage,
                      pageSize:this.pageSize,
                      dishName:this.dishName
                  }
              }).then((res)=>{
                    this.data=res.data.dishTypes
                    this.total=res.data.total
                    console.log(res)
              })
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
          updateShopName(){
              let shopInput = this.$refs.shopName
              shopInput.disabled=false
               shopInput.style.background="#eee"
          },
          rightMain(){
               let shopInput = this.$refs.shopName
              let rightMain = this.$refs.rightMain
           
                 if(shopInput.disabled==false){
                     console.log(1)
                      shopInput.disabled=true
                      shopInput.style.background="#f5f5f5"
                 }else{
                      return false
                 }
              
          }
      },
      mounted(){
        //   this.getData()
          this.getpage()
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/rightMain.scss'
</style>

