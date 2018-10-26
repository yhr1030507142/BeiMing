<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">每日菜品</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>饿了吧？来看看给您准备的菜品</p>
            </div>
            <div style="margin-top: 15px;">
  <el-input placeholder="请输入菜品名" v-model="input5" class="input-with-select" style="width:380px;">
    <!-- <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:90px;">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select> -->
    <el-button slot="append" icon="el-icon-search" @click="searchMenu"></el-button>
  </el-input>
</div>
            
            <div class="table">
                    <ul>

                    <li v-for="(v,i) in shopMenuName" :key="i" style="min-width:100px;float:left;border-right:1px solid black;text-align:center" @click="searchshop(v,i)"  :class="{active : active == v.shopName}" >{{v.shopName}}</li>
                    </ul> 
                    <ul v-show="hideMenu">
                    <li v-for="(v,i) in shopMenuMoreName" :key="i" style="min-width:100px;float:left;border-right:1px solid black;margin-left:10px;text-align:center" @click="searchshop(v,i)">{{v.shopName}}</li>
                    </ul>
                    <a href="#" @click="toggle()" style="color:red;margin-left:5px;display:inline-block"><p>{{more}}</p></a>

            </div>
                
            <div>
                <p v-show="showSeven">搜索结果(未来七天出售此商品的商铺):</p> <a href="#" v-show="showSeven" v-for="(v,i) in shopNameArr" :key="i" style="color:#f60;display:inline-block;margin-left:10px;">{{v.shopName}}({{v.dateTime}}[{{v.dayNoon}}])</a>
            
            </div>
                <div class="showSeven" style="width:100%;height:100px;">
                 <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="bottom">
                 <el-tab-pane :label="v"  v-for="(v,i) in this.dateArr" :key="i">
                 当前日期：{{dateNow}}
                 <div class="tableData">
                 <div class="box breakfast ">
                        <div class="box-top">
                           <div class='box-radius'>
                               <span></span>
                           </div>
                            <p>早餐</p>
                           
                        </div>
                        <ul class="ul1">
                            <li class="box-bottom" ><a href="#" style="font-size:14px;width:80px;text-align:center;display:inline-block">菜品</a><a href="#" style="font-size:14px;width:80px;text-align:center;display:inline-block">图片</a><a href="#" >价格</a><a href="#">评分</a><a href="#">剩余</a></li>
                            <li class="box-bottom" v-for="(v,i) in breakFast" :key='i'>
                   
                        <el-tooltip class="item" effect="dark" content="点击进行点餐" placement="top-start">
                        <el-popover placement="right" width="350"  trigger="hover">
                            <div style="width:100%;height:200px;display:flex;flex-direction: column;
                                        align-items: center;opacity:0.8;background:#000;margin:0;padding:0">
                            <p style="color:#000;font-size:24px;font-weight:600;margin-bottom:30px;color:#fff">{{v.menuName}}￥{{v.menuPrice}}</p>
                            <el-input-number  v-model="v.num" :max="v.matchMenuNum" :min="1"></el-input-number>
                            <div style="display:flex;margin-top:30px;">
                            <el-button type="warning" @click="handleAddToCart(v,i)">加入购物车</el-button><el-button type="danger" @click="account(v,i)">结算</el-button>
                        </div>
                        </div>
                        <el-button slot="reference" style="width:80px;border:none;"><p :style="i<3?'color:red;font-size:14px;font-weight:400':'color:#000;font-size:14px;font-weight:400'">{{v.menuName}}</p></el-button>
                        </el-popover>
                        </el-tooltip>
                                <a href="#"><img :src="v.menuPicPath" alt=""></a>
                                <p style="font-size:14px;">￥{{v.menuPrice}}</p>
                                <p style="font-size:14px;">{{v.menuAvgRating}}分</p>      
                                <p style="font-size:14px;"><span :style="v.matchMenuNum<=10?'color:red':'color:#999'">{{v.matchMenuNum}}</span>份</p>                                 
                            </li>   
                        </ul>
                        
                      
               </div>
                <div class="box lunch ">
                     <div class="box-top">
                           <div class='box-radius'>
                               <span></span>
                           </div>
                            <p>午餐</p>
                            
                        </div>
                        <ul class="ul2">
                            <li class="box-bottom" ><a href="#" style="font-size:14px;width:80px;text-align:center;display:inline-block">菜品</a><a href="#" style="font-size:14px;width:80px;text-align:center;display:inline-block">图片</a><a href="#" >价格</a><a href="#">评分</a><a href="#">剩余</a></li>

                                 <li class="box-bottom" v-for="(v,i) in lunch" :key='i'>
                                      <el-tooltip class="item" effect="dark" content="点击进行点餐" placement="top-start">
                                   <el-popover placement="right" width="350"  trigger="hover">
                                    <div style="width:100%;height:200px;display:flex;flex-direction: column;
                                                align-items: center;opacity:0.8;background:#000;margin:0;padding:0">
                                        <p style="color:#000;font-size:24px;font-weight:600;margin-bottom:30px;color:#fff">{{v.menuName}}￥{{v.menuPrice}}</p>
                                        <el-input-number  v-model="v.num" :max="v.matchMenuNum" :min="1"></el-input-number>
                                        <div style="display:flex;margin-top:30px;">
                                        <el-button type="warning" @click="handleAddToCart(v,i)">加入购物车</el-button><el-button type="danger" @click="account(v,i)">结算</el-button>

                                        </div>
                                    </div>
                         <el-button slot="reference" style="width:80px;border:none;"><p :style="i<3?'color:red;font-size:14px;font-weight:400':'color:#000;font-size:14px;font-weight:400'">{{v.menuName}}</p></el-button>
           
                  
                                </el-popover>
                                  </el-tooltip>
                                <a href="#"><img :src="v.menuPicPath" alt=""></a>
                                <p style="font-size:14px;">￥{{v.menuPrice}}</p>
                                <p style="font-size:14px;">{{v.menuAvgRating}}分</p>      
                                  <p style="font-size:14px;"><span :style="v.matchMenuNum<=10?'color:red':'color:#999'">{{v.matchMenuNum}}</span>份</p>                                 
                              
                              
                                </li>
                        </ul>
                </div>
                 <div class="box dinner">
                      <div class="box-top">
                            <div class='box-radius'>
                               <span></span>
                           </div>
                            <p>晚餐</p>
                            
                        </div>
                        <ul class="ul3">
                            <li class="box-bottom" ><a href="#" style="font-size:14px;width:80px;text-align:center;display:inline-block">菜品</a><a href="#" style="font-size:14px;width:80px;text-align:center;display:inline-block">图片</a><a href="#" >价格</a><a href="#">评分</a><a href="#">剩余</a></li>

                               <li class="box-bottom" v-for="(v,i) in dinner" :key='i'>
                                  <el-tooltip class="item" effect="dark" content="点击进行点餐" placement="top-start">
                                   <el-popover placement="right" width="350"  trigger="hover">
                                    <div style="width:100%;height:200px;display:flex;flex-direction: column;
                                                align-items: center;opacity:0.8;background:#000;margin:0;padding:0">
                                        <p style="color:#000;font-size:24px;font-weight:600;margin-bottom:30px;color:#fff">{{v.menuName}}￥{{v.menuPrice}}</p>
                                        <el-input-number  v-model="v.num" :max="v.matchMenuNum" :min="1"></el-input-number>
                                        <div style="display:flex;margin-top:30px;">
                                        <el-button type="warning" @click="handleAddToCart(v,i)">加入购物车</el-button><el-button type="danger" @click="account(v,i)">结算</el-button>

                                        </div>
                                    </div>
                         <el-button slot="reference" style="width:80px;border:none;"><p :style="i<3?'color:red;font-size:14px;font-weight:400':'color:#000;font-size:14px;font-weight:400'">{{v.menuName}}</p></el-button>
                        
                  
                                </el-popover>
                                  </el-tooltip>
                                <a href="#"><img :src="v.menuPicPath" alt=""></a>
                                <p style="font-size:14px;">￥{{v.menuPrice}}</p>
                                <p style="font-size:14px;">{{v.menuAvgRating}}分</p>        
                                <p style="font-size:14px;"><span :style="v.matchMenuNum<=10?'color:red':'color:#999'">{{v.matchMenuNum}}</span>份</p>                                 
                                
                               
                                </li>
                        </ul>
                 </div>

            </div>
                     </el-tab-pane>
                 </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import mockdata from "../Mock/mock";
    export default {
      data() {
        return {
          data: [],
          value5: 3.7,
          value1: '',
          pic:require('../assets/images/单选框未选.png'),
          pic1:require('../assets/images/单选框已选.png'),
          check:false,
          pic16:require('../assets/images/图层16.png'),
          num1: 1,
          menuData:[],
          menuData1:[],
          hover:false,
          hideMenu:false,
          more:'展开更多',
          select: '',
        //   显示提示头
        showSeven:false,
        // 菜品名称
          input5: '',
          //店铺ID
          shopId:'',
        // tab 默认展示名称
          activeName: 0,
        // 部分商铺名称
          shopMenuName:[],
        // 后面所有商铺名
          shopMenuMoreName:[],
        // 早餐数组
          breakFast:[],
        // 午餐数组
          lunch:[],
        //  晚餐数组
          dinner:[],
          shopName:'',
        // 未来七天的日期
          dateArr:[],
        // 当前日期
          dateNow:'',
        //查询未来七天拥有该商品的商铺     
          shopNameArr:[],
        //查询未来七天拥有该商品的所有信息    
          searchInfo:[],
        //查询未来七天拥有该商品的日期
          searchDate:[],
          active:'闯码头',
        }
      },
      methods:{
          clickCheck(){
            //   console.log(1)
              if(this.check==true){
                this.check=false
              }else{
                this.check=true
              }
            
          },
        handleClick(tab, event) {
            //  console.log(tab.index, event);
            this.dateNow = this.dateArr[tab.index]
            //  console.log(this.dateNow)
            let param =new URLSearchParams
            param.append('shopId',this.shopId)
            param.append('matchMenuDate',this.dateNow)
                this.$http.post('/api1/1024/cq1024/collocationofdishes/collocationofdishes/listofdishes',param).then((res=>{
                  this.breakFast = res.data.info.moring.info.collocationOfDishes
                    this.lunch = res.data.info.noon.info.collocationOfDishes
                      this.dinner = res.data.info.evening.info.collocationOfDishes
                     console.log(res.data.info.evening.info.collocationOfDishes)
                      this.initNum()
            }))
      },
        /**
         * 点击标签更换日期查询,
         */
        getMenuData(){         
            /**
             * 获取店铺列表
             */
             this.$http.get('/api1/1024/cq1024/collocationofdishes/collocationofdishes/shoplist').then((res=>{
               console.log(res)
                   this.shopId = res.data.info.shopList[0].shopId
                   console.log(this.shopId)
                   this.shopMenuName=res.data.info.shopList.slice(0,3)
                   this.shopMenuMoreName=res.data.info.shopList.slice(3)   
                     /**
                      * 未来七天日期
                      */
                     var dd=new Date();
                     this.dateArr=[];
                     this.dateArr[0]=dd.getFullYear()+"/"+(dd.getMonth()+1)+"/"+dd.getDate()
                     for(var i=0;i<7;i++){
                         dd.setDate(dd.getDate()+1);
                         this.dateArr.push(dd.getFullYear()+"/"+(dd.getMonth()+1)+"/"+dd.getDate())
                     }
                     console.log(typeof(this.dateArr[1]))
                     this.dateNow = this.dateArr[0]
                     this.showList()    
                         }))
          
        },
          /**
             * 初始化显示列表
             */
         showList(){
            let param =new URLSearchParams
            param.append('shopId',this.shopId)
            param.append('matchMenuDate',this.dateNow)
                this.$http.post('/api1/1024/cq1024/collocationofdishes/collocationofdishes/listofdishes',param).then((res=>{
                    console.log(res)
                    this.breakFast = res.data.info.moring.info.collocationOfDishes
                    this.lunch = res.data.info.noon.info.collocationOfDishes
                      this.dinner = res.data.info.evening.info.collocationOfDishes
                     console.log(res.data.info.evening.info.collocationOfDishes)
                        //   this.active = res.data.info.shopList
                   console.log(res)
                     this.initNum()
            }))  
            },
            /**
             * 初始化商品数量
             */
        initNum(){
            for(var j=0;j<this.breakFast.length;j++){
                 this.$set(this.breakFast[j],'num',1)
            }
             for(var j=0;j<this.lunch.length;j++){
                 this.$set(this.lunch[j],'num',1)
            }
             for(var j=0;j<this.dinner.length;j++){
                 this.$set(this.dinner[j],'num',1)
            }
        },
        /**
         * 搜索商品
         * 点击商铺进行查询
         */
        searchshop(v,i){
            // console.log(v)
            //  this.showSeven=true
             this.shopId = v.shopId
             this.active = v.shopName;
             this.showList()
        },
        /**
         * 打开关闭店铺列表
         */
        toggle(){
            if( this.hideMenu==false){
                this.hideMenu=true
                this.more='收起' 
            }else{
                this.hideMenu=false
                this.more='点击收起' 
            }      
        },
        /**
         * 点击加入购物车
         */
        handleAddToCart(v,i){
            let param =new URLSearchParams
            param.append('matchMenu.matchMenuId',v.matchMenuId)
            param.append('shoppingCarMenuNum',v.num)
            this.$http.post('/api1/1024/cq1024/shop-car/shopCar/add',param).then(res=>{
                if(res.data.code==100){
                          this.$message({
                            type:'success',
                            message:'添加成功'
                        })
                }
            },err=>{
                   this.$message({
                            type:'info',
                            message:res.data.msg
                        })  
            })
            // this.$store.commit('addCart',id)
            console.log(i)
        },
        /**
         * 搜索查询
         * 搜索菜品名称返回七天内含有该菜品的店铺及时间
         */
        searchMenu(){
            if(this.input5 == ''){
                this.showSeven=false
                this.$message({
                    type:'info',
                    message:'搜索为空'
                })
                return false
            }
            let param = new URLSearchParams
            let arr0=[]
            param.append('menuName',this.input5)
            this.$http.post('/api1/1024/cq1024/collocationofdishes/collocationofdishes/querymenu',param).then(res=>{
                if(res.data.code == 100){
                this.showSeven=true
                this.searchInfo = res.data.info.menuInfoList
                for(var i = 0;i<this.searchInfo.length;i++){  
                        arr0.push({shopName:this.searchInfo[i].shopName,dateTime:this.fmtDate(this.searchInfo[i].matchMenuDate),dayNoon:this.searchInfo[i].matchMenuTime})
                }      
                 this.shopNameArr = arr0
                 console.log(res)
                }else{
                    this.showSeven=false
                    this.$message({
                    type:'info',
                    message:res.data.msg
                })
                }
            },err=>{
                console.log(err)
            })
        },
        /**
         * 去重
         */
        unique1(arr){
         var hash=[];
         for (var i = 0; i < arr.length; i++) {
            if(hash.indexOf(arr[i])==-1){
             hash.push(arr[i]);
            }
         }
         return hash;
        },
        /**
         * 时间戳转换
         */
         fmtDate(obj){
            var date =  new Date(obj);
            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
          },
          /**
           * 结算
           */
          account(v,i){
                let arr =[]
                arr.push({matchMenu:{matchMenuId:v.matchMenuId},orderMenuNum:v.num})
                this.$store.state.accountInfo=arr
                this.$router.push('userFace')
            //  console.log(JSON.stringify(arr))
            //  let param = new URLSearchParams
            //  param.append('orderMenus',JSON.stringify(arr))
            //  param.append('snapData','')
            //  this.$http.post('/api/yangguoli/cq1024/order/add',param).then(res=>{
            //    if(res.data.code == 100){
            //         this.$message({
            //           type:'success',
            //           message:'下单成功'
            //         })
            //    }else{
            //       this.$message({
            //           type:'info',
            //           message:res.data.msg
            //         })
            //    }
            //  })
          }  
      },
      mounted(){
        this.getMenuData()        
        // this.$store.dispatch('getProductList')
        // console.log(this.list)
      },
         computed:{
          list(){
              return this.$store.state.productList
          }
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/UserSass/userRightMain.scss';
.active {
//    background: #fd7522;
//    border: 1px solid #fd7522;
//    color: #fff;
color: #fd7522;
 }
</style>

