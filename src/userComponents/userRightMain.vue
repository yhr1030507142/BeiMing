<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">每日菜品</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>饿了吧？来看看给您准备的菜品</p>
            </div>
            <div style="margin-top: 15px;">
  <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" style="width:380px;">
    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:90px;">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</div>
            <div class="table">
                    <ul>
                    <li v-for="(v,i) in shopMenuName" :key="i" style="float:left;">{{v.shopName}}</li>
        
                    </ul> 
                    <ul v-show="hideMenu">
                    <li v-for="(v,i) in shopMenuMoreName" :key="i" style="float:left;border-left:1px solid black;margin-left:10px;text-align:center">{{v.shopName}}</li>
                    </ul>
                    <a href="#" @click="toggle()">{{more}}</a>
            </div>
        
            <div class="showSeven" style="width:100%;height:100px;">
                <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="bottom">
                     <el-tab-pane label="2018-10-18" name="first">
                             <div class="tableData">
               <div class="box breakfast ">
                    
                        <div class="box-top">
                           <div class='box-radius'>
                               <span></span>
                           </div>
                            <p>早餐</p>
                            <i></i>
                        </div>
                        <ul class="ul1">
                            <li class="box-bottom" v-for="(v,i) in list " :key='i'>
                               
                                <a href="#" @mouseover='showHoverMenu(v,i)' @mouseout="hideHoverMenu()"><img :src="v.img" alt="">
                                  <div class="hoverShow" v-show="v.hover">
                                      <p>{{v.name}}</p>
                                      <div><el-rate v-model="value5" disabled show-score text-color="#ff9900" score-template="{value}"> </el-rate></div>
                                      <div class="num">
                                            <el-input-number size="small" v-model="v.num"></el-input-number>
                                      </div>
                                      <div class="car"><button @click="handleAddToCart(v.id)">添加购物车</button><button>结算</button></div>
                                  </div>
                                </a>
                                <p><router-link :to="{name:'userGoods'}">{{v.name}}</router-link></p>
                                <p>12.9</p>
                                <p>3.7分</p>         
                            </li>   
                        </ul>
                      
               </div>
                <div class="box lunch ">
                     <div class="box-top">
                           <div class='box-radius'>
                               <span></span>
                           </div>
                            <p>午餐</p>
                            <i></i>
                        </div>
                        <ul class="ul2">
                    
                                <li class="box-bottom"></li>
                                 <li class="box-bottom"></li>
                        </ul>
                </div>
                 <div class="box dinner">
                      <div class="box-top">
                            <div class='box-radius'>
                               <span></span>
                           </div>
                            <p>晚餐</p>
                            <i></i>
                        </div>
                        <ul class="ul3">
                            <li class="box-bottom">
                                <span></span>
                                <a href="#"><img :src="this.pic16" alt=""></a>
                                <p>抄手</p>
                                <div class="num">
                                  <el-input-number size="small" v-model="num1"></el-input-number>
                                </div>
                            </li>
                                <li class="box-bottom"></li>
                                 <li class="box-bottom"></li>
                        </ul>
                 </div>

            </div>
                     </el-tab-pane>
                     <el-tab-pane label="2018-10-19" name="second"> <div class="table">没有</div></el-tab-pane>
                     <el-tab-pane label="2018-10-20" name="third"><div class="table">没有</div></el-tab-pane>
                     <el-tab-pane label="2018-10-21" name="fourth"><div class="table">没有</div></el-tab-pane>
                 </el-tabs>
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
          value5: 3.7,
          value1: '',
          pic:require('../assets/images/单选框未选.png'),
          pic1:require('../assets/images/单选框已选.png'),
          check:false,
          pic16:require('../assets/images/图层16.png'),
          num1: 1,
          menuData:[],
          menuData1:[],
          hover:false,
          hideMenu:false,
          more:'展开更多',
          select: '',
          input5: '',
          activeName: 'first',
          shopMenuName:[],
          shopMenuMoreName:[],
        }
      },
      methods:{
          clickCheck(){
            //   console.log(1)
              if(this.check==true){
                this.check=false
              }else{
                this.check=true
              }
            
          },
        handleClick(tab, event) {
        console.log(tab, event);
      },
           open2() {
        this.$message({
          message: '恭喜你，搭配成功',
          type: 'success'
        });
      },
        getMenuData(){
            // this.$http.get('/api/localhost/menuData').then((res=>{
            //     this.menuData=res.data
            //       this.menuData1=res.data
            //     console.log(res)
            // }))
            console.log(1)
             this.$http.get('/api/liugaoyang/collocationofdishes/shoplist').then((res=>{
                   this.shopMenuName=res.data.info.shopList.slice(0,1)
                   this.shopMenuMoreName=res.data.info.shopList.slice(1)
                console.log(res)
            }))
           
        },
        HoverMenu(){
            
            for(var j=0;j<this.list.length;j++){
                 this.$set(this.list[j],'hover',false)
            }
        },
        showHoverMenu(v,i){
            // console.log(2)

            this.HoverMenu()
              for(var j=0;j<this.list.length;j++){
                  if(j==i){
                 v.hover=true
                }
            }
           
        },
        hideHoverMenu(){
             this.HoverMenu()
        },
        toggle(){
            if( this.hideMenu==false){
                this.hideMenu=true
                this.more='收起' 
            }else{
                this.hideMenu=false
                this.more='点击收起' 
            }
           
        },
        handleAddToCart(id){
            this.$store.commit('addCart',id)
            console.log(id)
        }

         
      },
      mounted(){
        this.getMenuData()
        //   this.HoverMenu()
        // this.$store.dispatch('getProductList')
        // console.log(this.list)
      },
         computed:{
          list(){
              return this.$store.state.productList
          }
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/UserSass/userRightMain.scss'
</style>

