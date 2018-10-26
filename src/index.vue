<template>
  <div id="app1">
      <topMenu></topMenu>
      <leftMenu></leftMenu>
      <div class="rightMain" style="margin-left:300px;">
        <div class="w">
          <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"> </div>
 
        </div>
      </div>
 
      <router-view></router-view>
  </div>
</template>

<script>
import leftMenu from './components/leftmenu'
import topMenu  from './components/topMenu'
import rightMain from './components/rightMain'
import feedback from './components/feedback'
import match from './components/match'
import echarts from 'echarts'
export default {
  dara(){
  return{
    show:false
  }
  },
  props: {
    className: {
      type: String,
      default: 'yourClassName'
    },
    id: {
      type: String,
      default: 'yourID'
    },
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  name: 'App',
  components:{
    leftMenu,topMenu,rightMain,feedback,match
  },
  methods:{
     initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }]
      })
    },
    getSession(){
      console.log(JSON.parse(window.sessionStorage.info))
      if(JSON.parse(window.sessionStorage.info).userShopInfo == undefined){
        this.show = true
         this.$router.push('store')
      }else{
        this.initChart();
      }
    }
    
  },
  mounted(){
    this.getSession()
    // console.log(window.sessionStorage)
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
@import '../assets/UserSass/userRightMain.scss';
</style>
