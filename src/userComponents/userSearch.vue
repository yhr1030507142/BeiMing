<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">菜品查询</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>快来查询你想点的菜品吧！</p>
            </div>
            <div style="width:100%">
                 <el-carousel :interval="4000" type="card" height="300px">
                <el-carousel-item v-for="item in pic" :key="item">
                <!-- <h3>{{ item }}</h3> -->
                <img :src="item.name" alt="" style="width:100%;height:100%">
                </el-carousel-item>
            </el-carousel>
            </div>
            <div class="table">
                    <el-input placeholder="请输入内容" v-model="inputSearch" class="input-with-select" style="width:380px;">
                  <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:90px;">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>

            <div class="tableData">
                <ul class="ul">
                    <li class="li">
                        <a href="#"><img src="https://img.alicdn.com/bao/uploaded/i7/TB1BaWYNXXXXXaOXVXXdtWs9XXX_035043.jpg" alt=""></a>
                        <a href="#" class="aa"><i>￥</i><p>3000</p></a>
                        <p>名字：大馅包子</p>
                        <a href="#" class="bb">商铺：杨国力包子铺</a>
                    </li>
                     <li class="li"></li>
                      <li class="li"></li>
                       <li class="li"></li>
                        <li class="li"></li>
                         <li class="li"></li>
                          <li class="li"></li>
                      <li class="li"></li>
                       <li class="li"></li>
                        <li class="li"></li>
                         <li class="li"></li>
                          <li class="li"></li>
                      <li class="li"></li>
                       <li class="li"></li>
                        <li class="li"></li>
                         <li class="li"></li>
                </ul>
                 
            </div>
        </div>
    </div>
</template>

<script>
import mockdata from "../Mock/mock";
    export default {
      data() {
        return {
            inputSearch:'',
            select:'1',
            pic:[
                {name:'https://img.alicdn.com/bao/uploaded/i7/TB1BaWYNXXXXXaOXVXXdtWs9XXX_035043.jpg'},
                {name:'https://img.alicdn.com/bao/uploaded/i7/TB1BaWYNXXXXXaOXVXXdtWs9XXX_035043.jpg'},
                {name:'https://img.alicdn.com/bao/uploaded/i7/TB1BaWYNXXXXXaOXVXXdtWs9XXX_035043.jpg'}


            ],
          data: [],
            form: {
            id: '',
            kind: '',
            name: '',
            property: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
           },
           formLabelWidth: '120px'
        }
      },
      methods:{
          getData(){
                this.$http.get('/api/localhost/data').then((res)=>{
                    this.data=res.data
                    console.log(this.data)
                })            
          },
            handleSelectionChange(val) {
                console.log(val)
            }      
      },
      mounted(){
          this.getData()
      }
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
.ul{
    width:100%;
    height:auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    .li{
         width:220px;
         height:300px;
         border:1px solid black;
         display:flex;
         margin-left: 20px;
         margin-top: 10px;
         flex-direction: column;
            a{
                display: flex;
                width: 100%;
                     img{
                         width: 100%;
                         height: 200px;
                         }
              }
            .aa{
                  display: flex;
                width: 100%;
                flex-direction: row;
                  i{
                        display: flex;
                        font-size: 16px;
                        color: red;
                    }
                     p{
                         display: flex;
                         font-size: 20px;
                         font-weight: 600;
                         color: red;
                    }       
                }
            p{
                      display: flex;
                      font-size: 20px;
                      font-weight: 600;
                     
            }       
            .bb{
                color: #999;
              margin-top: 20px;
              font-size: 14px;
                &:hover{
                    text-decoration: red;
                     color: red;
                }
             }
            
             
           
        }
    }
</style>

