<template>
    <div class="rightMain" ref="rightMain" @click="rightMain()">
        <div class="w">
           <h2 class="dishes-font">店铺管理</h2>
            <div class="showName">
                   <p>Hi,{{$store.state.indexLogin.userName}}</p>
                     <p>这里是店铺管理面板</p>
            </div>
           <p style="font-size:18px;color:#f60">{{text}}</p>
            <div class="table">
                   <input  type="text" v-model="shopName" style="float:left;width:180px;height:50px;font-size:25px;background:#f5f5f5" disabled="disabled" ref="shopName" @click.stop=""/><div style="float:left;margin-left:20px;margin-top:5px;"><el-button type="primary" icon="el-icon-edit" circle @click.stop="updateShopName()"></el-button> </div>
              <!-- <div class="button-group">
                   <button>危险按钮</button>
                     <button>危险按钮</button>
              </div> -->
            </div>

            <div class="tableData">
                <div style="width:100%;height:300px;">
                                <div style="margin-top:20px;width:100%;height:80px;"> <h2 style="float:left">早餐最晚订餐时间：</h2>
             <el-time-select v-model="valueBreakfast" style="float:left"
                      :picker-options="{start: '07:00', step: '00:15:00',end: '8:30' }" placeholder="选择时间">
              </el-time-select>
              </div> 
               <div style="margin-top:20px;width:100%;height:80px;"> <h2 style="float:left">午餐最晚订餐时间：</h2>
             <el-time-select v-model="valueLunch" style="float:left"
                      :picker-options="{start: '10:30', step: '00:15:00',end: '14:30' }" placeholder="选择时间">
              </el-time-select>
              </div> 
               <div style="margin-top:20px;width:100%;height:80px;"> <h2 style="float:left">晚餐最晚订餐时间：</h2>
             <el-time-select v-model="valueDinner" style="float:left"
                      :picker-options="{start: '17:30', step: '00:15',end: '21:30' }" placeholder="选择时间">
              </el-time-select>
              </div> 
                    <el-button type="danger" @click="saveShop()" v-show="save">创建</el-button>
                    <el-button type="danger" @click="updateShop()" v-show="!save">保存</el-button>
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
          shopName:'请编辑店铺名',
          valueBreakfast:'',
          valueLunch:'',
          valueDinner:'',
          text:'',
          save:true
        }
      },
      methods:{
            showShopData(){
                console.log(window.sessionStorage)
                this.$http.post('/api1/1024/cq1024/shop-menu/findByUserId').then(res=>{
                      this.shopName= res.data.info.shop.shopName
                      this.valueBreakfast=res.data.info.shop.shopMorning
                      this.valueLunch=res.data.info.shop.shopNoon
                      this.valueDinner=res.data.info.shop.shopEvening
                   })
          },
          updateShop(){
              let param = new URLSearchParams
              param.append('shopName',this.shopName)
              param.append('shopMorning',this.valueBreakfast)
                param.append('shopNoon',this.valueLunch)
                 param.append('shopEvening',this.valueDinner)
                this.$http.post('/api1/1024/cq1024/shop-menu/update',param).then(res=>{
                    console.log(res)
                    if(res.data.code==100){
                        this.showShopData()
                        this.$message({
                            type:'success',
                            message:'更新成功'
                        })
                    }else{
                        this.$message({
                            type:'warning',
                            message:res.data.msg
                        })
                    }
              },err=>{
                   this.$message({
                            type:'warning',
                            message:'系统异常'
                        })
              })
          },
          saveShop(){
              if(this.shopName == ''){
                   this.$message({
                            type:'warning',
                            message:'店铺名称不能为空'
                        })
                        return false
              }
               if(this.shopName == '请编辑店铺名'){
                   this.$message({
                            type:'warning',
                            message:'请添加店铺名'
                        })
                        return false
              }
              if(this.valueBreakfast == ''){
                  this.valueBreakfast = '07:00:00'
              }
               if(this.valueLunch == ''){
                  this.valueLunch = '10:30:00'
              }
               if(this.valueDinner == ''){
                  this.valueDinner = '17:30:00'
              }
               let param = new URLSearchParams
              param.append('shopName',this.shopName)
              param.append('shopMorning',this.valueBreakfast)
                param.append('shopNoon',this.valueLunch)
                 param.append('shopEvening',this.valueDinner)
                this.$http.post('/api1/1024/cq1024/shop-menu/add',param).then(res=>{
                        if(res.data.code == 100){
                        this.showShopData()
                        this.$message({
                            type:'success',
                            message:'创建成功'
                        })
                        this.text = ''
                        this.save = false
                        // this.$router.go(-1)
                        }else{
                        this.$message({
                            type:'warning',
                            message:res.data.msg
                        })
                        }

                },err=>{
                    this.$message({
                            type:'warning',
                            message:'系统异常'
                        })
                })

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
                      console.log(this.shopName)
                 }else{
                      return false
                 }
          }
      },
      mounted(){
         if(JSON.parse(window.sessionStorage.info).userShopInfo == undefined){
                       this.text ="请创建店铺"
                       this.save = true
                     }else{
                       this.text = ''
                       this.save = false
                     }
          this.showShopData()
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/rightMain.scss'
</style>

