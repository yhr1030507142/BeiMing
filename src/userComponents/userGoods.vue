<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">菜品信息</h2>
            <div class="showName">
                  
            </div>
            <div class="tableDataBox">
               <div class="box">
                  <div class="pic">
                        <img-zoom :src="imgSrc" width="450" height="450" :bigsrc="imgSrc" :configs="configs"></img-zoom>
                  </div>   
               </div>
           
               <div class="box1">
                    <div class="title">{{this.title}}</div>
                    <div class="style"><span>店铺:</span><p>{{this.shopName}}</p></div>
                    <div class="price"><span>价格:</span> <i>￥</i><p>{{this.price}}</p></div>
                    <div class="style"><span>菜系:</span><p>{{this.menuPropertiesStyle}}</p></div>
                    <div class="kind"><span>种类:</span><p>{{this.menuPropertiesCategory}}</p></div>
                    <div class="taste"><span>口味:</span><p>{{this.menuPropertiesTaste}}</p></div>
                    <div><el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number></div>
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
          data:[],
          imgSrc:'',
          title:'',
          price:'',
          menuPropertiesCategory:'',
          menuPropertiesStyle:'',
          menuPropertiesTaste:'',
          shopName:'',
           configs: {
             width:650,
             height:650,
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
               this.$http.post('/api/liangsijie/menu/findByMenuId',param).then(res=>{
                 this.data = res.data.info.menu
                 this.imgSrc = res.data.info.menu.menuPicPath
                  this.title = res.data.info.menu.menuName
                   this.price = res.data.info.menu.menuPrice
                    this.menuPropertiesCategory = res.data.info.menu.menuPropertiesCategory.menuPropertiesCategoryName
                    this.menuPropertiesStyle = res.data.info.menu.menuPropertiesStyle.menuPropertiesStyleName
                    this.menuPropertiesTaste = res.data.info.menu.menuPropertiesTaste.menuPropertiesTasteName
                     this.shopName =  res.data.info.menu.shop.shopName

                   console.log(res) 
              })
             },
             /**
              * 添加购物车
              */
              addCart(){
                 let param =new URLSearchParams
                 param.append('matchMenu.matchMenuId',v.matchMenuId)
                 param.append('shoppingCarMenuNum',v.num)
                 this.$http.post('/api/gouwuche/shopCar/add',param).then(res=>{
                if(res.data.code==100){
                          this.$message({
                            type:'success',
                            message:'添加成功'
                        })
                }
            },err=>{
                   this.$message({
                            type:'info',
                            message:res.data.msg
                        })  
            })
              },
              /**
               * 结算
               */
              account(){

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
                }

            }
          .box1{
            display: flex;
             width: 400px;
              height: 400px;
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

