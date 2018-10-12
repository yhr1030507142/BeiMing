<template>
  <div id="app1">
      <topMenu></topMenu>
      <leftMenu></leftMenu>
      <router-view></router-view>
  </div>
</template>

<script>
import leftMenu from './components/leftmenu'
import topMenu  from './components/topMenu'
import rightMain from './components/rightMain'
import feedback from './components/feedback'
import match from './components/match'
export default {
  name: 'App',
  components:{
    leftMenu,topMenu,rightMain,feedback,match
  }
}
</script>

<style>
#app1 {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 680px;
    background: #f5f5f5;
}
</style>
