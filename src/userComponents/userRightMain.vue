<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">每日菜品</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>饿了吧？来看看给您准备的菜品</p>
            </div>
            <div class="table">
                    <!-- <input  placeholder="请输入内容" class="search-input" type="date">
                    <button class="search-button"><i class="iconfont">&#xe609;</i></button> -->
                      
                     <el-date-picker v-model="value1" type="date" placeholder="选择日期" ></el-date-picker>
                        
                    <button class="search-button"><i class="iconfont"></i></button>
              <div class="button-group">
                   <p>未来七天匹配同样匹配同样菜品</p><span @click="clickCheck()" :style="'background-image:url('+(check?pic:pic1)+')'"></span>
              </div>
            </div>

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
                            <li class="box-bottom" v-for="(v,i) in menuData " :key='i'>
                               
                                <a href="#" @mouseover='showHoverMenu(i,v)' @mouseout="hideHoverMenu()"><img :src="v.pic" alt="">
                                  <div class="hoverShow" v-show="v.hover">
                                      <p>{{v.name}}</p>
                                      <div class="num">
                                            <el-input-number size="small" v-model="v.num"></el-input-number>
                                      </div>
                                      <div class="car"><button>添加购物车</button><button>结算</button></div>
                                  </div>
                                </a>
                                <p>{{v.name}}</p>
                                <p>12.9</p>
                                <p>**</p>
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
                           <li class="box-bottom" v-for="(v,i) in menuData " :key='i'>
                               
                                <a href="#" @mouseover='showHoverMenu(i,v)' @mouseout="hideHoverMenu()"><img :src="v.pic" alt="">
                                  <div class="hoverShow" v-show="v.hover">
                                      <p>{{v.name}}</p>
                                      <div class="num">
                                            <el-input-number size="small" v-model="v.num"></el-input-number>
                                      </div>
                                      <div class="car"><button>添加购物车</button><button>结算</button></div>
                                  </div>
                                </a>
                                <p>{{v.name}}</p>
                                <p>12.9</p>
                                <p>**</p>
                            </li>   
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
            <div class="save-button">
                <button @click="open2">保存搭配</button>
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
          menuData:[],
          hover:false,

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

