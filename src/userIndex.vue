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
    }
  },
  methods:{
    getSession(){
      // this.userInfo = JSON.parse(window.sessionStorage.userInfo)
      // this.userName = this.userInfo.emp.empName
      // console.log(this.userInfo)
       this.$http.post('api1/1024/cq1024/user/user/issession').then(res=>{
        console.log(res)
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
  mounted(){
    // this.getSession()
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
