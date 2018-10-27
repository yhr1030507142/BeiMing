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
                          <div class="div" style="margin-top:0px;"><button class="button2" @click="register()" >新用户注册</button></div>
                    </div>
                </div>
            </div>
            <div class="userlogin-box-right"></div>
        
        </div>



<el-dialog  :visible.sync="dialogFormVisible" width="550px" :before-close="handleClose">
            <userRegister></userRegister>
</el-dialog>
    </div>
    
</template>
<script>
import userRegister from './userRegister'
export default {
    data(){
        return{
            username:'',
            password:'',
            dialogFormVisible: this.$store.state.face,
       
        }
    },
    components:{
        userRegister
    },
    methods:{
        denglu(){
            //   this.$router.push('./userIndex')
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
                    this.userInfo = res.data.info.userInfo;
                     console.log(res.data.info.userInfo)

                     if(this.userInfo.roleId == 2){
                        this.$message({
                         message: '登陆成功',
                        type: 'success'
                        });
                     window.sessionStorage.userInfo = JSON.stringify(this.userInfo);
                     console.log('login'+window.sessionStorage.userInfo)
                     this.$router.push('./userIndex/userRightMain')
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
            // this.$router.push('./userIndex')
        },
        register(){
            // this.dialogFormVisible= true,
            console.log(this.$store.state.face)
               this.$store.commit('changeFaceT')
               this.dialogFormVisible=this.$store.state.face
        },
        handleClose(done){
            this.$store.state.face = false
            done()
        }
    },
    mounted(){
        if(sessionStorage.getItem('userInfo') != null){
               this.$router.push('./userIndex')
        }
    }
  
}
</script>

<style lang='scss'>
   @import '../assets/userSass/userLogin.scss'
</style>