<template>
    <div class="login">
        <!-- <router-link to='/index'>denglu</router-link> -->
        <div class="form-box">
             <div class="form">
            <h1>登录</h1>
            <form action="">
                <div class="form-input">
                    <label>用户名</label>
                    <input type="text" placeholder="UsingName@beiming.com" v-model="username"/>
                    <i class="icon"></i>
                </div>
                <div class="form-input">
                <label>密码</label>
                <input type="password" placeholder='PassWord' v-model="password"/>
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
    data(){
        return{
              username:'',
              password:'',
        }
    },
    methods:{
         denglu(){
            //  console.log(window.sessionStorage.Info)
            //   this.$router.push('index')
            if(this.username==""||this.username==null){
                       this.$message({
                      message: '用户名不能为空',
                      type: 'warning'
                     });
                     return false
                }
                 if(this.username.length<6){
                       this.$message({
                      message: '用户名格式不正确',
                      type: 'warning'
                     });
                     return false
                }
            if(this.password==''){
                 this.$message({
                      message: '密码不能为空',
                      type: 'warning'
                     });
                      return false
            }  
         let param = new URLSearchParams()
        param.append('empNo', this.username)
        param.append('userPwd', this.password) 
            this.$http.post('/api1/1024/cq1024/user/user/login',param,  
            ).then((res)=>{
                console.log(res)
                // console.log(res.data.code)
                // console.log(res.data.info.message)
                 
                 if(res.data.code==100){
                    this.info = res.data.info;
                    if(this.info.userInfo.roleId == 1){
                        this.$message({
                         message: res.data.msg,
                         type: 'success'
                        });
                 window.sessionStorage.info = JSON.stringify(this.info);
                 //console.log('login'+res.data.info)
                 this.$router.push('./index')
                    }else{
                         this.$message({
                         message: '身份不符',
                         type: 'success'
                        });
                    }
                   
                   
                 }else{
                      this.$message({
                      message: res.data.msg,
                      type: 'warning'
                     });
                 }
            })
         }
            // this.$router.push('./userIndex')
    },
    mounted(){
        //  if(sessionStorage.getItem('info')!=''){
        //        this.$router.push('./index')
        // }
    }
}
</script>

<style lang='scss'>
   @import '../assets/sass/login.scss'
</style>

