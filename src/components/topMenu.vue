<template>
   
    <div class="top">
        <div class="left">
             <a href="#" class="logo"  @click="toIndex()"></a>
             <div class="title">
                 <a href="#">北明食堂服务系统</a>
             </div>
        </div>
        <div class="right">
            <div class="name"><p>{{userName}}</p></div>
            <div class="pic">
                <a href="#"><img src="../assets/images/01.jpg" alt=""></a>
                </div>
            <div class="close">
                <a href="#" @click="loginOut()"></a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           info:'',
           userName:'',
           shopId:'',
           shopName:'',
        }
        
    },

    methods:{
        toIndex(){
            this.$router.push('/index')
        },
         loginOut(){
            this.$http.post('/api1/1024/cq1024/user/user/loginout').then((res)=>{
                    console.log(res)
                    sessionStorage.setItem('info','');
                    this.$router.push('/login')
            })
        },
        getSession(){
            this.info = window.sessionStorage.info
            console.log(JSON.parse(this.info).userInfo.emp.empName)

             // console.log('top'+this.info)
            this.userName = JSON.parse(this.info).userInfo.emp.empName
            this.shopName = JSON.parse(this.info).userShopInfo.shopName
            this.shopId = JSON.parse(this.info).userShopInfo.shopId
            this.$store.state.indexLogin.userName = this.userName
            this.$store.state.indexLogin.shopName = this.shopName
            this.$store.state.indexLogin.shopId = this.shopId

            this.$store.state.indexLogin.morning = JSON.parse(this.info).userShopInfo.shopMorning
            this.$store.state.indexLogin.noon = JSON.parse(this.info).userShopInfo.shopNoon
            this.$store.state.indexLogin.evening = JSON.parse(this.info).userShopInfo.shopEvening

            //console.log(window.sessionStorage)
        }
    },
    mounted(){
        this.getSession()
    }

}
</script>

<style lang='scss' scoped>
   @import '../assets/sass/top.scss'
   

</style>




