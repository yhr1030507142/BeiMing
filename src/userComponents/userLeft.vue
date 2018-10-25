<template>
        <div class="leftMenu">
            <ul>
                <li v-for="(v,i) in this.leftMenu" :key="i"  @click="clickButton(v,i)"><router-link :to='v.to'><a href="#" :style="!v.flag?'border-right:3px solid #ff7d63':'border-right:none'"><i class="dishes" :style="'background-image:url('+(v.flag?v.url1:v.url)+')'+';'+'background-size:'+v.backgroundSize"></i></a></router-link></li>
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
                {to:'/userIndex/userRightMain',url:require('../assets/images/用户每日菜品选中.png'),url1:require('../assets/images/用户每日菜品未选.png'),backgroundSize:'45px 30px'},
                {to:'/userIndex/userFeedBack',url:require('../assets/images/用户意见选中.png'),url1:require('../assets/images/用户意见未选.png'),backgroundSize:'40px 35px'},
                {to:'/userIndex/userOrder',url:require('../assets/images/订单管理.png'),url1:require('../assets/images/订单管理未选.png'),backgroundSize:'40px 35px'},
                {to:'/userIndex/userCart',url:require('../assets/images/购物车.png'),url1:require('../assets/images/购物车未选.png'),backgroundSize:'40px 35px'},
                {to:'/userIndex/userSearch',url:require('../assets/images/商品查询1.png'),url1:require('../assets/images/商品查询.png'),backgroundSize:'40px 35px'},
                // {to:'/userIndex/userEvaluate',url:require('../assets/images/菜品评价.png'),url1:require('../assets/images/菜品评价未选.png'),backgroundSize:'40px 35px'},      
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

