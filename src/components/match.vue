<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">菜品搭配</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>现在为每天的菜品进行搭配吧！</p>
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
                    <!-- <div class='box-radius'></div> -->
                        <div class="box-top">
                            <span></span>
                            <p>早餐</p>
                            <i></i>
                        </div>
                        <ul>
                            <li class="box-bottom" v-for="(v,i) in menuData " :key='i'>
                                <span></span>
                                <a href="#"><img :src="v.pic" alt=""></a>
                                <p>{{v.name}}</p>
                                <div class="num">
                                  <el-input-number size="small" v-model="v.num"></el-input-number>
                                </div>
                            </li>
                             
                        </ul>
                      
               </div>
                <div class="box lunch ">
                     <div class="box-top">
                            <span></span>
                            <p>午餐</p>
                            <i></i>
                        </div>
                        <ul>
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
                 <div class="box dinner">
                      <div class="box-top">
                            <span></span>
                            <p>晚餐</p>
                            <i></i>
                        </div>
                        <ul>
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
        }
         
      },
      mounted(){
          this.getMenuData()
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/match.scss'
</style>

