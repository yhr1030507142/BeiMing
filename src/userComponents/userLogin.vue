<template>
    <div class="userlogin">
        <div class="userlogin-box">
            <div class="userlogin-box-left">
                <div class="w">
                    <div class="logo1"></div>
                    <p class="word">欢迎来到北明食堂</p>
                    <div class="form-login">
                        <div class="div">
                            <span class="span1"></span>
                            <input type="text" placeholder="userName" v-model="username">
                        </div>
                         <div class="div">
                              <span class="span2"></span>
                              <input type="password"  placeholder="PassWord" v-model="password">
                         </div>
                        <div class="div1"> <p>忘记密码?</p></div>
                        <div class="div"><button class="button1" @click="denglu()">登录</button></div>
                        <div class="div2">
                            <i></i>
                            <p>or</p>
                            <i></i>
                        </div>
                          <div class="div" style="margin-top:0px;"><button class="button2">新用户注册</button></div>
                    </div>
                </div>
            </div>
            <div class="userlogin-box-right"></div>
        
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username:'',
            password:''
        }
    },
    methods:{
        denglu(){
            this.$http.post('/api/liugaoyang/login',
               { 
                    userId:this.username,
                    password:this.password
                },
            ).then((res)=>{
                console.log(res)
                console.log(res.data.code)
                 console.log(res.data.info.message)
                 if(res.data.code==100){
                       this.$message({
                      message: '恭喜你，搭配成功',
                      type: 'success'
                     });
                     this.$router.push('./userIndex')
                 }else{
                      this.$message({
                      message: '登录失败',
                      type: 'warning'
                     });
                 }
            })
            // this.$router.push('./userIndex')
        }
    }
}
</script>

<style lang='scss'>

   @import '../assets/userSass/userLogin.scss'
</style>

