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
      this.userInfo = JSON.parse(window.sessionStorage.userInfo)
      this.userName = this.userInfo.emp.empName
      console.log(this.userInfo)
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
