<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">菜品信息</h2>
            <div class="showName">
                   <p>Hi,{{$store.state.userLogin.userName}}</p>
                     <p>快来看看美味吧！</p>
            </div>
            <el-button type="danger" style="margin-top:10px" @click="goBack()">返回</el-button>
            <div class="tableDataBox">
               <div class="box">
                  <div class="pic">
                        <!-- <img-zoom :src="imgSrc" width="150" height="450" :bigsrc="imgSrc" :configs="configs"></img-zoom> -->
                        <img :src="imgSrc" alt="">
                  </div>   
                   <div class="word">
                   <span>{{this.title}}</span>
                 </div>
               </div>
               <div class="box1">
                    <div class="title">{{this.title}}</div>
                    <div><el-tag type="success">{{this.shopName}}</el-tag></div>
                    <div><el-tag type="info">{{this.menuPropertiesStyle}}</el-tag><el-tag type="warning">{{this.menuPropertiesCategory}}</el-tag><el-tag type="danger">{{this.menuPropertiesTaste}}</el-tag></div>
                    <div><el-input-number size="small" v-model="num1" @change="handleChange" :min="1"  label="请选择菜品数量"></el-input-number></div>
        <div >
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
        <div class="tableDataBox1" style="margin-top:10px;">    
             <div> <el-tag type="success">菜品评价</el-tag></div>
              <div class="userContent" v-for="(v,i) in menusug" :key="i">
                  <div class="userContent-l"><el-tag type="info">{{v.user.emp.empNo}}</el-tag></div>
                  <div class="userContent-r">
                   <div><el-rate v-model="v.menuRating" disabled  text-color="#ff9900" score-template="{value}"></el-rate></div>
                    {{v.sugContent}}</div>
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
           },
            value5: 3.7,
            menusug:[],

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
                     this.menusug=res.data.info.menusug

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
                
               
          },
          /**
           * 返回上一页
           */
          goBack(){
              this.$router.go(-1)
          },
        },
        mounted(){
          this.getdata(this.$route.params.id)
        },
        // components: { imgZoom }
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
      border-radius: 10px;
      margin: 50px auto;
      width: 85%;
      display: flex;
      flex-direction: row;
      height: auto;
      justify-content: space-around;
      background: #fff;
        .box{
          width: 300px;
          height: 350px;
          margin-top: 10px;
          border-radius: 10px;
          border: 1px solid #e8e2e1;
          display: flex;
          flex-direction: column;
          position: relative;
          
                .pic{
                    display: flex;
                    width: 100%;
                    height: 300px;
                    img{
                    border-radius: 10px;
                    width: 100%;
                    height: 100%;
                    }
                }
                .word{
                  color: #ff7d63;
                    display: flex;
                    padding: 14px;
                    flex-direction: row;
                    justify-content: center;
                }

            }
          .box1{
            display: flex;
              width: 600px;
              height: 560px;
              // border: 1px solid black;
            //  padding-left: 50px;
              flex-direction: column;
              // background: #f0f0f0;
              border-radius: 10px;
              padding: 20px 20px;
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
                    padding-bottom: 30px;
                   
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
                        border-radius: 10px;
                        &:hover{
                          cursor: pointer;
                        }
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
                        border-radius: 10px;
                         &:hover{
                          cursor: pointer;
                        }
                    }
                  }


          }
  }

  .tableDataBox1{
      margin-bottom: 100px;
      border-radius: 10px;
      margin: auto;
      width: 85%;
      display: flex;
      flex-direction: column;
      height: auto;
      justify-content: flex-start;
      background: #fff;
      .userContent{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        border-bottom: 1px solid #e8e2e1;
        border-top: 1px solid #e8e2e1;

        .userContent-l{
          display: flex;
          width: 300px;
          // border-right: 1px solid #e8e2e1;
        }
        .userContent-r{
          display: flex;
          flex-direction: column;
            div{
              display: flex;
            }
        }
      }
  }


</style>

