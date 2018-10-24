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
                <el-carousel-item v-for="(v,i) in pic" :key="i">
                
                <img :src="v" alt="" style="width:100%;height:100%">
                </el-carousel-item>
                </el-carousel>
            </div>
            <div >
                    <el-input placeholder="请输入菜品名" v-model="inputSearch" class="input-with-select" style="width:380px;">
                  <!-- <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:90px;">
                    <el-option label="菜品名称" value="1"></el-option>
                    <el-option label="店铺名" value="2"></el-option>
                    
                  </el-select> -->
                  <el-button slot="append" icon="el-icon-search" @click="searchShopName()"></el-button>
                </el-input>
                
                <div>
                    <ul class="ul1"><li class="type style" @click="searchAll()">全部</li></ul>    
                    <ul class="ul1"><li class="type">类型：</li><li class="style" v-for="(v,i) in menuPropertiesCategory" :key="i" @click="searchCategory(v.menuPropertiesCategoryId)">{{v.menuPropertiesCategoryName}}</li></ul>    
                    <ul class="ul1"><li class="type">菜系：</li><li class="style" v-for="(v,i) in menuPropertiesStyle" :key="i" @click="searchStyle(v.menuPropertiesStyleId)">{{v.menuPropertiesStyleName}}</li></ul>    
                    <ul class="ul1"><li class="type">口味：</li><li class="style" v-for="(v,i) in menuPropertiesTaste" :key="i" @click="searchTaste(v.menuPropertiesTasteId)">{{v.menuPropertiesTasteName}}</li></ul>                       
                   
                    
                </div> 
            </div>

            <div class="tableData" style="margin-top:30px;">
                <ul class="ul">
                    <li   v-for="(v,i) in data" :key="i">
                       <router-link tag="a" class="li" :to="'userGoods/'+v.menuId">
                             <a href="#"><img :src="v.menuPicPath" alt=""></a>
                             <a href="#" class="aa"><i>￥</i><p>{{v.menuPrice}}</p></a>
                             <p>名字：{{v.menuName}}</p>
                             <a href="#" class="bb">商铺：{{v.shop.shopName}}</a>
                       </router-link>
                      
                        
                    </li>
                </ul>
                 
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
            data:[],
            inputSearch:'',
            select:'1',
            menuPropertiesTaste:[],
            menuPropertiesStyle:[],
            menuPropertiesCategory:[],
            pic:[
               'https://img.alicdn.com/bao/uploaded/i7/TB1BaWYNXXXXXaOXVXXdtWs9XXX_035043.jpg',
                'https://img.alicdn.com/bao/uploaded/i7/TB1BaWYNXXXXXaOXVXXdtWs9XXX_035043.jpg',
                'https://img.alicdn.com/bao/uploaded/i7/TB1BaWYNXXXXXaOXVXXdtWs9XXX_035043.jpg'
            ],
        }
      },
      methods:{
          getdata(){
               this.$http.post('/api/liangsijie/menu/findAllMenuInfo').then(res=>{
                    this.data = res.data.info.info
                    
                    // console.log(res)
              })
           
          },
          searchAll(){
              this.getdata()
          },
          searchCategory(val){
              console.log(val)
              let param = new URLSearchParams
              param.append('menuPropertiesCategoryId',val)
              this.$http.post('/api/liangsijie/findAllByMenuPropertiesCategoryId',param).then(res=>{
                  console.log(res)
                     this.data = res.data.info.Info
              }) 
          },
          searchShopName(){
               let param = new URLSearchParams
              param.append('menuName',this.inputSearch)
              this.$http.post('/api/liangsijie/menu/fuzzySearch',param).then(res=>{
                  console.log(res)
                     this.data = res.data.info.menuInfo
              }) 
          }

      },
      mounted(){
          this.getdata()
           //   口味
              this.$http.post('/api/liangsijie/menuPropertiesTaste').then(res=>{
                    this.menuPropertiesTaste = res.data.info.menuPropertiesCategories
                    console.log(this.menuPropertiesTaste )
              })
            // 种类
               this.$http.post('/api/liangsijie/menuPropertiesCategory').then(res=>{
                    this.menuPropertiesCategory = res.data.info.menuPropertiesCategories
                    console.log(this.menuPropertiesTaste )
              })
            //   菜系
               this.$http.post('/api/liangsijie/menuPropertiesStyle').then(res=>{
                    this.menuPropertiesStyle = res.data.info.menuPropertiesCategories
                    console.log(this.menuPropertiesTaste )
              }) 
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/feedback.scss';
// .el-carousel__item h3 {
//     color: #475669;
//     font-size: 14px;
//     opacity: 0.75;
//     line-height: 200px;
//     margin: 0;
//   }
  
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

    .ul1{
        width: 100%;
        height: 30px;
        border-bottom: 1px solid #e8e2e1;
        margin-top: 15px;
        li{
            float: left;
            font-size: 16px;
            margin-left: 12px;
        }
        .type{
            font-size: 14px;
            color: #000;
            font-weight: 600;
        }
        .style{
             font-size: 14px;
            color: #999;
            &:hover{
                color: #f60;
                cursor: pointer;
            }
        }
    }
</style>

