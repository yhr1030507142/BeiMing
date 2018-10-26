<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">菜品信息</h2>
            <div class="showName">
                  
            </div>
            <div class="tableDataBox">
               <div class="box">
                  <div class="pic">
                        <!-- <img-zoom :src="imgSrc" width="150" height="450" :bigsrc="imgSrc" :configs="configs"></img-zoom> -->
                        <img :src="imgSrc" alt="">
                  </div>   
               </div>
           


               <div class="box1">
                    <div class="title">{{this.title}}</div>
                    <div class="style"><span>店铺:</span><el-tag type="success">{{this.shopName}}</el-tag></div>
                    <div class="price"><span>价格:</span> <i>￥</i><p>{{this.price}}</p></div>
                    <div class="style"><span>菜系:</span><p><el-tag type="info">{{this.menuPropertiesStyle}}</el-tag></p></div>
                    <div class="kind"><span>种类:</span><p><el-tag type="warning">{{this.menuPropertiesCategory}}</el-tag></p></div>
                    <div class="taste"><span>口味:</span><p><el-tag type="danger">{{this.menuPropertiesTaste}}</el-tag></p></div>
                    <div><el-input-number v-model="num1" @change="handleChange" :min="1"  label="请选择菜品数量"></el-input-number></div>
                   <div style="height:100px;">
        <el-select v-model="orderStatusId" slot="prepend" placeholder="请选择搭配日期" @change="changSelect">
       <el-option :label="v1.matchMenuDate+'|'+v1.matchMenuTime"  :value="v1.matchMenuId" v-for="(v1,i1) in arr" :key="i1"></el-option>      
      </el-select>
      </div>
                    <div class="btn">
                          <button class="button1" @click="addCart">加入购物车</button>
                           <button class="button2" @click="account">结算</button>
                    </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
import imgZoom from 'vue2.0-zoom'
    export default {
      data() {
        return {
          num1:1,
          arr:[],
          orderStatusId:'',
          data:[],
          imgSrc:'',
          title:'',
          price:'',
          mathMenuId:'',
          menuPropertiesCategory:'',
          menuPropertiesStyle:'',
          menuPropertiesTaste:'',
          shopName:'',
           configs: {
             width:550,
             height:550,
             maskWidth:100,
             maskHeight:100,
             maskColor:'red',
             maskOpacity:0.2
           }

        }
      },
      methods:{
             getdata(id){
               let param = new URLSearchParams
               param.append('menuId',id)
               this.$http.post('/api1/1024/cq1024/shop-menu/menu/findByMenuId',param).then(res=>{
                 this.data = res.data.info.menu
                 this.imgSrc = res.data.info.menu.menuPicPath
                  this.title = res.data.info.menu.menuName
                   this.price = res.data.info.menu.menuPrice
                    this.menuPropertiesCategory = res.data.info.menu.menuPropertiesCategory.menuPropertiesCategoryName
                    this.menuPropertiesStyle = res.data.info.menu.menuPropertiesStyle.menuPropertiesStyleName
                    this.menuPropertiesTaste = res.data.info.menu.menuPropertiesTaste.menuPropertiesTasteName
                     this.shopName =  res.data.info.menu.shop.shopName

                     this.arr =res.data.info.matchmenu
                   console.log(res) 
              })
             },
             /**
              * 添加购物车
              */
              handleChange(num1){
                console.log('num1'+num1)
              },
              addCart(){
                console.log(this.mathMenuId)
                console.log(this.num1)
                if(this.mathMenuId == ''){
                  this.$message({
                      type:'info',
                      message:'请选择搭配日期',
                    })
                    return false
                }

                let param =new URLSearchParams
                param.append('matchMenu.matchMenuId',this.mathMenuId)
                param.append('shoppingCarMenuNum',this.num1)
                this.$http.post('/api1/1024/cq1024/shop-car/shopCar/add',param).then(res=>{
                  console.log(res)
                  if(res.data.code == 100){
                    this.$message({
                      type:'success',
                      message:'添加成功',
                    })
                  }else{
                      this.$message({
                      type:'info',
                      message:res.data.msg,
                    })
                  }
                },err=>{
                   this.$message({
                      type:'info',
                      message:'服务器错误',
                    })
                })
              },
              /**
               * 结算
               */
              account(){
                if(this.mathMenuId == ''){
                  this.$message({
                      type:'info',
                      message:'请选择搭配日期',
                    })
                    return false
                }
                let arr = []
                arr.push({matchMenu:{matchMenuId:this.mathMenuId},orderMenuNum:this.num1}) 
                this.$store.state.accountInfo=arr                    
                this.$router.push('/userIndex/userFace')
              },
            changSelect(val){
             console.log(val)
             this.mathMenuId = val
            //  if(val == 0){
            //     this.orderStatusId = 0
            //  }else{
            //     this.orderStatusId = this.statusArr[val-1].orderStatusId
            //     console.log(this.orderStatusId)
            //  }
                
               
          }
        },
        mounted(){
          this.getdata(this.$route.params.id)
        },
        components: { imgZoom }
      }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/feedback.scss';
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .tableDataBox{
      width: 100%;
      display: flex;
      flex-direction: row;
      height: auto;
      justify-content: flex-start;
        .box{
          width: 450px;
          height: 450px;
          // border: 1px solid black;
          display: flex;
          flex-direction: column;
          position: relative;
                .pic{
                    display: flex;
                    width: 100%;
                    height: 100%;
                    img{
                       width: 100%;
                    height: 100%;
                    }
                }

            }
          .box1{
            display: flex;
             width: 400px;
              height: 500px;
              // border: 1px solid black;
              margin-left: 40px;
              flex-direction: column;
              background: #f3f3f3;
              div {
                display: flex;
                margin-top: 20px;
                flex-direction: row;
                
                 span{
                     font-family: simsun;
                     color: #999;
                     line-height: 33px;
                     font-size: 22px;
                     margin-right: 20px;
                }
              }
              .title{
                font: 700 36px Arial,"microsoft yahei";
                color: #666;
                margin-bottom: 20px;
              }
                  .price{
               
                          i{
                                color: #E4393C;
                                font-family: "microsoft yahei";
                                font-size: 26px;
                          }
                          p{
                            font-size: 32px;
                            color: #E4393C;
                          }
                    }
                  .style{
                        p{
                          font-size: 22px;
                          color: #666;
                        }
                    }
                  .kind{
                       p{
                          font-size: 22px;
                          color: #666;
                        }
                    }
                  .taste{
                      p{
                          font-size: 22px;
                          color: #666;
                        }
                    }
                  .btn{
                    display: flex;
                    flex-direction: row;
                    margin-top: 60px;
                    .button1{
                        width: 150px;
                        height: 50px;
                        border: none;
                        color: #fff;
                        height: 46px;
                        line-height: 46px;
                        padding: 0 26px;
                        font-size: 18px;
                        font-family: "microsoft yahei";
                        background: #f30213;
                        font-weight: 700;
                    }
                    .button2{
                        width: 150px;
                        height: 50px;
                        border: none;
                        color: #fff;
                        height: 46px;
                        line-height: 46px;
                        padding: 0 26px;
                        font-size: 18px;
                        font-family: "microsoft yahei";
                        background: #ff7d63;
                        font-weight: 700;
                        margin-left: 60px;
                    }
                  }


          }
  }

  

</style>

