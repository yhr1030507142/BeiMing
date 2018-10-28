<template>
  <div id="user1">
      <topMenu></topMenu>
      <leftMenu></leftMenu>
      <router-view></router-view>
  </div>
</template>

<script>
import leftMenu from './userComponents/userLeft'
import topMenu  from './userComponents/userTop'
export default {
  data(){
    return{
      userInfo:[],
      userName:'',
      code:''
    }
  },
  methods:{
    getSession(){
      //  if(this.$store.state.userLogin.username=='' || this.$store.state.userLogin.username==null ||this.$store.state.userLogin.username== 'undefined'){
      //  console.log(this.$store.state.userLogin.username)
      //    this.$router.push('/userLogin')
      //     return false
      // }
      // this.userInfo = JSON.parse(window.sessionStorage.userInfo)
      // this.userName = this.userInfo.emp.empName
      console.log(this.$store.state.userLogin.username)
       this.$http.post('api1/1024/cq1024/user/user/issession').then(res=>{
        console.log(res)
        this.code = res.data.code
        if(res.data.code != 100){
          this.$message({
            type:'info',
            message:res.data.msg
          })
        }
      })
    }
    
  },
  components:{
    leftMenu,topMenu
  },
  computed:{
    username(){
      return this.$store.state.userLogin.username
    }
  },
  watch:{
      code(val){
          if(this.code != 100){
            sessionStorage.setItem('userInfo','')
            this.router.push('./userLogin')
          }
      }
  },
  mounted(){
  this.getSession()
  }
}
</script>

<style>
#user1 {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 680px;
    background: #f5f5f5;
}
</style>
