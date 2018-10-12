<template>
    <div class="login">
        <!-- <router-link to='/index'>denglu</router-link> -->
        <div class="form-box">
             <div class="form">
            <h1>登录</h1>
            <form action="">
                <div class="form-input">
                    <label>用户名</label>
                    <input type="text" placeholder="UsingName@beiming.com" />
                    <i class="icon"></i>
                </div>
                <div class="form-input">
                <label>密码</label>
                <input type="password" placeholder='PassWord'/>
                    <i class="icon1"></i>
                </div>
               <div class="form-input">
                    <div class="forgetPas"><span>忘记密码?</span></div>
               </div>
               <div class="form-input">
                   <button class="btn1" @click="denglu()">登录</button>
                   <button class="btn2">新用户注册</button>
               </div>
            </form>
        </div>
        
        </div>
       

    </div>
</template>
<script>
export default {
    methods:{
        denglu(){
            this.$router.push('./index')
        }
    }
}
</script>

<style lang='scss'>
   @import '../assets/sass/login.scss'
</style>

