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
  components:{
    leftMenu,topMenu
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
