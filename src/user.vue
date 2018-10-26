<template>
    <div id='user'>
    
      <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'user',
    data(){
        return{
          
        }
    },
    components:{
        
    }
}
</script>
<style>
#user{
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 680px;
    background: #f5f5f5;
}
</style>


