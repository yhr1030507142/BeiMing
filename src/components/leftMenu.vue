<template>
        <div class="leftMenu">
            <ul>
                <li v-for="(v,i) in this.leftMenu" :key="i"  @click="clickButton(v,i)"><router-link :to='v.to'><a href="#" :style="!v.flag?'border-right:3px solid #ff7d63':'border-right:none'"><i class="dishes" :style="'background-image:url('+(v.flag?v.url:v.url1)+')'+';'+'background-size:'+v.backgroundSize"></i></a></router-link></li>
                <!-- <li><router-link to='/'><a href="#"><i class="dishes"></i></a></router-link></li> -->
                <!-- <li><router-link to='/'><a href="#"><i class="dishes"></i></a></router-link></li> -->
                <!-- <li><router-link to='/'><a href="#"><i class="dishes"></i></a></router-link></li> -->
            </ul>
        </div>
    
</template>
<script>
export default {
    data(){
        return{
            leftMenu:[
                {to:'/index/rightMain',url:require('../assets/images/菜品管理1.png'),url1:require('../assets/images/菜品管理.png'),backgroundSize:'45px 30px'},
                {to:'/index/match',url:require('../assets/images/菜品搭配1.png'),url1:require('../assets/images/菜品搭配.png'),backgroundSize:'40px 35px'},
                {to:'/index/feedback',url:require('../assets/images/用户反馈1.png'),url1:require('../assets/images/用户反馈.png'),backgroundSize:'40px 35px'},
                {to:'/index/order',url:require('../assets/images/订单管理未选.png'),url1:require('../assets/images/订单管理.png'),backgroundSize:'40px 35px'},
                {to:'/index/store',url:require('../assets/images/店铺管理未选.png'),url1:require('../assets/images/店铺管理.png'),backgroundSize:'40px 35px'},
                // {to:'/index/getFood',url:require('../assets/images/人脸识别未选.png'),url1:require('../assets/images/人脸识别.png'),backgroundSize:'40px 35px'},
           
           ],
        }
        
    },
    methods:{
        addFlad(){
              for(var j=0;j<this.leftMenu.length;j++){
                   this.$set(this.leftMenu[j],'flag',true)
                   if(this.leftMenu[j].to==this.$route.path){
                       this.$set(this.leftMenu[j],'flag',false)
                   }
              }
            //   alert(this.$route.path)

              
        },
        changeColor(v,i){
            // console.log(i)
              this. addFlad();
            for(var j=0;j<this.leftMenu.length;j++){
                if(j==i){
                 v.flag=false
                }

            }
        },
        clickButton(v,i){
             this. addFlad();
             for(var j=0;j<this.leftMenu.length;j++){
                if(j==i){
                 v.flag=false
                }

            }
        }

       
    },
      mounted(){
                this. addFlad();
                
        }
}
</script>


<style lang='scss'>
  @import '../assets/font/iconfont.css';
  @import '../assets/sass/left.scss'
</style>

