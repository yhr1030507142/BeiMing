<template>
  <div id="app1">
      <topMenu></topMenu>
      <leftMenu></leftMenu>
      <div class="rightMain">
      <div class="w">
      
      <div ><p class="dishes-font">管理主页</p></div>
       <div class="showName">
                   <p>Hi,{{$store.state.indexLogin.userName}}</p>
                     <p>今天是{{today}},祝您心情愉快！</p>
            </div>
      
      <div class="table">
      <el-date-picker
      style="margin-left:320px;"
      v-model="dateValue"
      value-format="yyyy-MM-dd"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="changDate"
      :picker-options="pickerOptions">
    </el-date-picker>
      </div>
      
      <div style="float:left">
          <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
      </div>      
      <div class="showInfoBox">
           <ul>
              <li class="showInfo"><a href="#"><el-tag style="width:142px;text-align:center">店铺</el-tag></a><span class="span">{{this.$store.state.indexLogin.shopName}}</span></li>
            
              <li class="showInfo"><a href="#"><el-tag type="info">每日早餐最早预定时间</el-tag></a><span class="span">{{this.$store.state.indexLogin.morning}}</span></li>
              <li class="showInfo"><a href="#"><el-tag type="info">每日午餐最早预定时间</el-tag></a><span class="span">{{this.$store.state.indexLogin.noon}}</span></li>
              <li class="showInfo"><a href="#"><el-tag type="info">每日晚餐最早预定时间</el-tag></a><span class="span">{{this.$store.state.indexLogin.evening}}</span></li>
                            
           </ul>
            
      </div>

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
  data(){
     return{
       show:false,
       data:[],
       num:[],
       start:'',
       end:'',
       today:'',
       dateValue:[],
       menuName:[],
      menuName1:[],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
              console.log(picker)
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
       
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
      default: '600px'
    },
    height: {
      type: String,
      default: '400px'
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
       let param = new URLSearchParams
      param.append('start', this.start)
      param.append('end',this.end)
      this.$http.post('api1/1024/cq1024/order/menusale',param).then(res=>{
            console.log(res)
            this.data = res.data.info.menuSale
            let arr =[]
             let arr1 = []
            for(var i = 0 ;i< this.data.length;i++){
              arr[i]=res.data.info.menuSale[i].menuName 
              arr1[i]=res.data.info.menuSale[i].saleNum 
            }
            
           
           

        this.chart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
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
          data: arr,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel :{
            interval:0 ,
            rotate:-20
        }

        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '销量',
          type: 'bar',
          barWidth: '60%',
          data: arr1
        }]
      })
            
      })
     
    },
    getSession(){
      this.$http.post('api1/1024/cq1024/user/user/issession').then(res=>{
        console.log(res)
        if(res.data.code != 100){
          this.$message({
            type:'info',
            message:res.data.msg
          })
        }
      })
      // console.log(JSON.parse(window.sessionStorage.info))
      if(JSON.parse(window.sessionStorage.info).userShopInfo == undefined){
        this.show = true
         this.$router.push('store')
      }else{
        this.initChart();
      }
    },
    getData(){
        var dd=new Date();
        var dateArr=[];
        dateArr[0]=dd.getFullYear()+"-"+(dd.getMonth()+1)+"-"+dd.getDate()
        this.start = dateArr[0]
        this.end = dateArr[0] 
        this.today = dd.getFullYear()+"年"+(dd.getMonth()+1)+"月"+dd.getDate()+"日"
        this.dateValue=[this.start,this.end]
    },
    changDate(value){
              console.log(value)
              let value1= value[0]
              let value2= value[1]
              this.start = value1
              this.end =value2
              this.initChart()
          },
    
  },
  mounted(){
    this.getSession()
    this.getData()
    this.initChart();
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
.rightMain{
    position: absolute;
    left: 100px;
    top: 60px;
    width:90%;
    min-height: 900px;
    background: #f5f5f5;
    box-sizing: border-box;
}
    .w{
        width: 85%;
        height: 500px;
        background: #f5f5f5;
        margin: 70px auto;
        min-width: 800px;
    }
        .dishes-font{
            color: #5070ff;
            font-size: 22px;
            font-weight: 500;
        }
        .showName{
            margin-top: 30px;
            height: 40px;
        }
        p{
            color: #a2a7b7;
        }
         .table{
             margin-top: 50px;
             width: 100%;
             height: 70px;
             position: relative;
             border-bottom: 1px solid #e8e2e1;
         }
        
    .title-one{
  width: 100%;
  display: flex;
  width: 150px;
  flex-direction: row;
  justify-content: flex-start;
    }
    .picBox{
      display: flex;
      width: 150px;
      height: 50px;
      border: 1px solid black;
      border-radius: 10px;
      flex-direction: column;
    }
    .picBox p{
      display: flex;
    }
    .showInfoBox{
      float:right;
      border-radius:10px;
      width:500px;
      height:auto;
      border:1px solid #e8e2e1;
      margin-top:50px;
      display: flex;
      flex-direction: column;
     
    }
    
     .showInfoBox ul{
       width: 100%;
        display: flex;
        flex-direction: column; 
        align-items:center;
    } 
    .showInfo{
      display: flex;
      flex-direction: row;
      width: 100%;
      border-bottom: 1px solid #e8e2e1;
      min-height: 40px;
      align-items:center;
    }
    .showInfo a{
      display: flex;
      flex-direction: row;
      /* justify-content: flex-end; */
      width: 170px;
      margin-left: 10px;
    }
    .showInfo .span{
      display: flex;
      color: #999;
      font-size: 14px;
      font-weight: 500;
    }

</style>
