<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">菜品搭配</h2>
            <div class="showName">
                   <p>{{$store.state.indexLogin.userName}}</p>
                     <p>现在为每天的菜品进行搭配吧！</p>
            </div>
            <div class="table">
                    <!-- <input  placeholder="请输入内容" class="search-input" type="date">
                    <button class="search-button"><i class="iconfont">&#xe609;</i></button> -->
                      
                     <el-date-picker :picker-options="pickerOptions" v-model="dateNow" type="date" placeholder="选择日期" @change="changDate" value-format="yyyy-MM-dd" ></el-date-picker>
                        
                    <!-- <button class="search-button"><i class="iconfont"></i></button> -->
              <div class="button-group">
                   <p>未来七天匹配同样匹配同样菜品</p><span @click="clickCheck()" :style="'background-image:url('+(check?pic1:pic)+')'"></span>
              </div>
            </div>

            <div class="tableData">
               <div class="box breakfast ">
                    <!-- <div class='box-radius'></div> -->
                        <div class="box-top">
                            <span></span>
                            <p>早餐</p>
                            <i @click="openBreakFast"></i>
                        </div>
                        <ul>
                            <li class="box-bottom" v-for="(v,i) in breakfast " :key='i'>
                                <!-- <span @click="deleteMenu(v,i)"></span> -->
                              <div class="delete-box"><i class="el-icon-delete delete" @click="deleteMenu(v,i)"></i></div>
                                <a href="#"><img :src="v.menuPicPath" alt=""></a>
                                <p>{{v.menuName}}</p>
                                <div class="num">
                                  <el-input-number size="small" v-model="v.matchMenuNum" @change="handleChange(v)"></el-input-number>
                                </div>
                            </li>
                             
                        </ul>
               </div>
               <!-- 早餐添加 -->
               <el-dialog  :visible.sync="breakfastOpen" width="600px">
                <el-transfer v-model="value" :data="data" @change="rightContent" :titles="['未选', '已选']"></el-transfer>
                 <div slot="footer" class="dialog-footer">
                  <el-button @click="noAddBreakFast">取 消</el-button>
                  <el-button type="primary" @click="addBreakFast">确 定</el-button>
                </div>
               </el-dialog>
               <!-- 早餐添加结束 -->
              
                <div class="box lunch ">
                     <div class="box-top">
                            <span></span>
                            <p>午餐</p>
                            <i @click="openLunch"></i>
                        </div>
                        <ul>
                            <li class="box-bottom" v-for="(v,i) in lunch " :key='i'>
                                <!-- <span @click="deleteMenu(v,i)"></span> -->
                              <div class="delete-box"><i class="el-icon-delete delete" @click="deleteMenu(v,i)"></i></div>                               
                                <a href="#"><img :src="v.menuPicPath" alt=""></a>
                                <p>{{v.menuName}}</p>
                                <div class="num">
                                  <el-input-number size="small" v-model="v.matchMenuNum" @change="handleChange(v)"></el-input-number>
                                </div>
                            </li>
                        </ul>
                </div>
                 <!-- 午餐添加 -->
               <el-dialog  :visible.sync="lunchOpen" width="600px"> 
                <el-transfer v-model="value1" :data="data" :titles="['未选', '已选']"></el-transfer>
                 <div slot="footer" class="dialog-footer">
                  <el-button @click="noAddBreakFast">取 消</el-button>
                  <el-button type="primary" @click="addLunch">确 定</el-button>
                </div>
               </el-dialog>
               <!-- 午餐添加结束 -->
                 <div class="box dinner">
                      <div class="box-top">
                            <span></span>
                            <p>晚餐</p>
                            <i @click="openDinner"></i>
                        </div>
                        <ul>
                            <li class="box-bottom" v-for="(v,i) in dinner " :key='i'>
                                <!-- <span @click="deleteMenu(v,i)"></span> -->
                              <div class="delete-box"><i class="el-icon-delete delete" @click="deleteMenu(v,i)"></i></div>                              
                                <a href="#"><img :src="v.menuPicPath" alt=""></a>
                                <p>{{v.menuName}}</p>
                                <div class="num">
                                  <el-input-number size="small" v-model="v.matchMenuNum" @change="handleChange(v)"></el-input-number>
                                </div>
                            </li>
                        </ul>
                 </div>
                  <!-- 晚餐添加 -->
               <el-dialog  :visible.sync="dinnerOpen" width="600px">
                <el-transfer v-model="value2" :data="data"  :titles="['未选', '已选']"></el-transfer>
                 <div slot="footer" class="dialog-footer">
                  <el-button @click="noAddBreakFast">取 消</el-button>
                  <el-button type="primary" @click="addDinner">确 定</el-button>
                </div>
               </el-dialog>
               <!-- 晚餐添加结束 -->
            </div>
            <!-- <div class="save-button">
                <button @click="open2">保存搭配</button>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
         
      data() {
          
        return {
          data: [],
          pic:require('../assets/images/单选框未选.png'),
          pic1:require('../assets/images/单选框已选.png'),
          check:false,
          pic16:require('../assets/images/图层16.png'),
          num: 1,
        //  全部菜品信息列表
          menuData:[],
          breakfastOpen:false,
          lunchOpen:false,
          dinnerOpen:false,
          data:[],
        //   早餐穿梭框
          value: [],
        //   午餐穿梭框
          value1:[],
        //   晚餐穿梭框
          value2:[],
        // 七天日期数组 
          dateArr:[],
        //   早餐数组
          breakfast:[],
        //   午餐数组
          lunch:[],
        //   晚餐数组
          dinner:[],
        //   当前时间
         dateNow:'',
        //   formLabelWidth: '120px'
         pickerOptions: {
             disabledDate(time) {
                return time.getTime() < (Date.now()-3600*24*1000) || time.getTime() > (Date.now()+3600*24*1000*7);
                },
         },
        }
      },
      methods:{
          clickCheck(){
              console.log(1)
              if(this.check==true){
                this.check=false
              }else{
                this.check=true
              }
            
          },
           open2() {
        this.$message({
          message: '恭喜你，搭配成功',
          type: 'success'
        });
      },
        getMenuData(){
          //  this.$http.get('/api1/1024/cq1024/collocationofdishes/collocationofdishes/menulist').then(res=>{
          //     console.log(res)
          //  })
            var dd=new Date();
            var dateArr=[];
             dateArr[0]=dd.getFullYear()+"/"+(dd.getMonth()+1)+"/"+dd.getDate()
            for(var i=0;i<7;i++){
                dd.setDate(dd.getDate()+1);
                dateArr.push(dd.getFullYear()+"/"+(dd.getMonth()+1)+"/"+dd.getDate())
            }
            this.dateNow = dateArr[0]
             this.$http.get('/api1/1024/cq1024/collocationofdishes/collocationofdishes/menulist').then((res=>{
               console.log(res)
                this.menuData=res.data.info.menuList
                console.log(this.menuData)
                  for (let i = 0; i <= this.menuData.length; i++) {
                      this.data.push({
                      key: i,
                      label:res.data.info.menuList[i].menuName+"￥"+res.data.info.menuList[i].menuPrice,
                      menuId:res.data.info.menuList[i].menuId,
                      menuPrice:res.data.info.menuList[i].menuPrice,
                      menuName:res.data.info.menuList[i].menuName,
                      menuPicPath:res.data.info.menuList[i].menuPicPath
                    //   disabled: i % 4 === 0
                    }); 
                }
                console.log(res)
            }))  
            this.showMenuInfo()    
        },
        /**
         * 初始化显示早中晚菜品信息
         */
        showMenuInfo(){
          console.log(this.$store.state.indexLogin.shopId)
              let param =new URLSearchParams
              console.log(this.$store.state.indexLogin.shopId)
             param.append('shopId',this.$store.state.indexLogin.shopId)
             param.append('matchMenuDate',this.dateNow)
               this.$http.post('/api1/1024/cq1024/collocationofdishes/collocationofdishes/listofdishes',param).then((res)=>{
                   console.log(res)
                   if(res.data.code==100){
                   this.breakfast=res.data.info.moring.info.collocationOfDishes
                   console.log(this.breakfast)
                   this.lunch=res.data.info.noon.info.collocationOfDishes
                   this.dinner=res.data.info.evening.info.collocationOfDishes
                   }else{
                       this.$message({
                           type:'warning',
                           message:res.data.msg
                       })
                   }
                  
               
            })  
        },
          openBreakFast(){
              this.breakfastOpen=true
          },
          /**
           * 穿梭狂右侧内容
           */
          rightContent(val){
              console.log(this.value)
          },
          addBreakFast(){
            //   console.log(this.dateNow)
            let date = this.dateNow.replace(/\//g,'-')
            //   console.log(date)
            console.log(this.value.length)
            console.log(this.value)
            console.log(this.data)
            console.log(this.menuData)
              let arr= []
               for(var j  in this.value){
                //   console.log( )
                   arr[j]={"menu":{"menuId":this.menuData[this.value[j]].menuId,"menuName":this.menuData[this.value[j]].menuName},matchMenuDate:date,matchMenuTime:"早餐"}
               }
                console.log(JSON.stringify(arr))
              let param = new URLSearchParams
              param.append('jsonMatchMenus',JSON.stringify(arr))
              param.append('seven',this.check)
            this.$http.post('/api1/1024/cq1024/collocationofdishes/collocationofdishes/addmatchmenu',param).then((res)=>{
            //    console.log(res)
                console.log(res.data.code)
            if(res.data.code == 100){
                 this.$message({
                            type:'success',
                            message:res.data.info
                        })
                        this.showMenuInfo()
                        this.breakfastOpen=false

                }else{
                      this.$message({
                            type:'warning',
                            message:res.data.info
                        })
                }
            })
          },
          noAddBreakFast(){
              
          },
          openLunch(){
            this.lunchOpen=true
          },
           addLunch(){
            //   console.log(this.dateNow)
            let date = this.dateNow.replace(/\//g,'-')
            //   console.log(date)
            console.log(this.value1.length)
            console.log(this.value1)
            console.log(this.data)
            console.log(this.menuData)
              let arr= []
               for(var j  in this.value1){
                //   console.log( )
                   arr[j]={"menu":{"menuId":this.menuData[this.value1[j]].menuId,"menuName":this.menuData[this.value1[j]].menuName},matchMenuDate:date,matchMenuTime:"午餐"}
               }
                console.log(JSON.stringify(arr))
              let param = new URLSearchParams
              param.append('jsonMatchMenus',JSON.stringify(arr))
              param.append('seven',this.check)
            this.$http.post('/api1/1024/cq1024/collocationofdishes/collocationofdishes/addmatchmenu',param).then((res)=>{
            //    console.log(res)
                console.log(res.data.code)
            if(res.data.code == 100){
                 this.$message({
                            type:'success',
                            message:res.data.info
                        })
                        this.showMenuInfo()
                        this.lunchOpen=false
                }else{
                      this.$message({
                            type:'warning',
                            message:res.data.info
                        })
                }
            })
          },
          openDinner(){
              this.dinnerOpen=true
          },
           addDinner(){
            //   console.log(this.dateNow)
            let date = this.dateNow.replace(/\//g,'-')
            //   console.log(date)
            console.log(this.value2.length)
            console.log(this.value2)
            console.log(this.data)
            console.log(this.menuData)
              let arr= []
               for(var j  in this.value2){
                //   console.log( )
                   arr[j]={"menu":{"menuId":this.menuData[this.value2[j]].menuId,"menuName":this.menuData[this.value2[j]].menuName},matchMenuDate:date,matchMenuTime:"晚餐"}
               }
                console.log(JSON.stringify(arr))
              let param = new URLSearchParams
              param.append('jsonMatchMenus',JSON.stringify(arr))
              param.append('seven',this.check)
            this.$http.post('/api1/1024/cq1024/collocationofdishes/collocationofdishes/addmatchmenu',param).then((res)=>{
            //    console.log(res)
                console.log(res.data.code)
            if(res.data.code == 100){
                 this.$message({
                            type:'success',
                            message:res.data.info
                        })
                        this.showMenuInfo()
                        this.dinnerOpen=false
                }else{
                      this.$message({
                            type:'warning',
                            message:res.data.info
                        })
                }
            })
          },
          changDate(value){
           
            //  console.log(value)
             value= value.replace(/-/g, '/')
             this.dateNow=value
             
             this.showMenuInfo()    
          },
          deleteMenu(v,i){
              console.log(v)
               this.$confirm('是否删除菜品?', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
               }).then(() => {
                   let param = new URLSearchParams
                   param.append('matchMenuId',v.matchMenuId)
                   param.append('seven',this.check)
              this.$http.post('/api1/1024/cq1024/collocationofdishes/collocationofdishes/delmatchmenu',param).then(res=>{
                  if(res.data.code==100){
                    this.$message({
                   type: 'success',
                   message: '删除成功!'
                 });
                  this.showMenuInfo()
                  }else{
                       this.$message({
                         type: 'info',
                         message: res.data.msg
                             });          
             }
              },err=>{
                   this.$message({
                         type: 'info',
                         message: '系统异常'
                             });    
              })                      
                
               }).catch(() => {
                 this.$message({
                   type: 'info',
                   message: '已取消删除'
                 });          
               });
          },
          handleChange(v) {
                // console.log('更改数量成功'+v.matchMenuNum)
                let param =new URLSearchParams
                param.append('matchMenuId',v.matchMenuId)
                param.append('matchMenuNum',v.matchMenuNum)
                param.append('seven',this.check)
                this.$http.post('/api1/1024/cq1024/collocationofdishes/collocationofdishes/updatematchmenunum',param).then((res)=>{
                       if(res.data.code == 100){
                         console.log('修改数量OK')
                       }
                       
                })
      },
      },
    computed:{
    },
    filters:{
       
    },
      mounted(){
          this.getMenuData()
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/match.scss';
.delete-box{
  width: 40px;
  .delete{
    font-size: 24px;
    color: #606266;
    &:hover{
      cursor: pointer;
      color: #f60;
    }
    }
}

</style>

