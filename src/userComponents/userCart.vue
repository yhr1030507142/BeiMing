<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">购物车</h2>
            <div class="showName">
                   <p>Hi,{{$store.state.userLogin.userName}}</p>
                     <p>快来看看您的购物车吧！</p>
            </div>
            <div style="height:20px;width:100%"></div>
            <div class="tableData" ref="tabData">
                <div v-for="(v,i) in this.CartData.shoppingCarInfo" :key="i" style="width:100%;height:auto;background:#fff;border-radius:10px;margin-bottom:20px;">
                <!-- <p style="font-size:14px;font-weight:600">店铺名称:{{v.shopName}}</p>
                <p>订餐日期:{{v.matchMenuDate}}</p>
                <p>订餐类型:{{v.matchMenuTime}}</p> -->
               <el-tag type="success">{{v.shopName}}</el-tag>
                <el-tag type="info">{{v.matchMenuDate}}</el-tag>
                <el-tag type="warning">{{v.matchMenuTime}}</el-tag>
             
            <el-table :data="v.menuDtos" stripe style="width: 100%"  @selection-change="handleSelectionChange">
                    
                 <!-- <el-table-column  label="num">
                   <template slot-scope="scope">   
                    <span style="margin-left: 10px">{{i}}</span>
                    </template>    
                 </el-table-column>  -->
                <el-table-column  type="selection"  width="55" :key="i" :selectable='checkboxInit'> </el-table-column>
                  
                   <!-- <el-table-column   label="是否选择">
                   <template slot-scope="scope">   
                    <span style="margin-left: 10px">{{scope.row.check}}</span>
                    </template>    
                 </el-table-column>  -->

                <el-table-column   label="菜品编号">
                   <template slot-scope="scope">   
                    <span style="margin-left: 10px">{{scope.row.shoppingCarId}}</span>
                    </template>    
                 </el-table-column> 
                <el-table-column  label="菜品名称" :show-overflow-tooltip="true">
                    <template slot-scope="scope">   
                    <span style="margin-left: 10px">{{scope.row.menuName}}</span>
                    </template>    
                </el-table-column>
                <el-table-column  label="菜品价格">
                    <template slot-scope="scope">   
                    <span style="margin-left: 10px">{{scope.row.menuPrice}}</span>
                    </template>    
                </el-table-column>
                <el-table-column  label="菜品图片">
                     <template slot-scope="scope">   
                         <span> <img :src="scope.row.menuPicPath" alt="" style="width:50px;height:50px"></span>
                    </template>   
                    
                </el-table-column>
                <el-table-column  label="菜品种类">
                    <template slot-scope="scope">   
                       <span style="margin-left: 10px">{{scope.row.menuPropertiesStyleName}}</span>
                    </template>   
                </el-table-column>
                <el-table-column label="菜品口味">
                    <template slot-scope="scope">   
                       <span style="margin-left: 10px"><el-tag>{{scope.row.menuPropertiesTasteName}}</el-tag></span>
                    </template>  
                </el-table-column>
                   <el-table-column label="烹饪制法">
                    <template slot-scope="scope">   
                       <span style="margin-left: 10px"><el-tag type="success">{{scope.row.menuPropertiesCategoryName}}</el-tag></span>
                    </template>  
                </el-table-column>
                  <el-table-column label="菜品数量"  width="180">
                    <template slot-scope="scope">        
                <el-input-number v-model="scope.row.shoppingCarMenuNum" size="mini" controls-position="right" @change="handleChange(scope.row,scope.row.shoppingCarMenuNum)" :min="1" ></el-input-number>
                    </template>  
                </el-table-column>
                 
                  <el-table-column label="菜品总价">
                    <template slot-scope="scope">   
                       <span style="margin-left: 10px" ref="price">{{scope.row.shoppingCarMenuNum,scope.row.menuPrice |samllPrice}}</span>
                    </template>  
                </el-table-column>
                   <el-table-column label="菜品状态" :show-overflow-tooltip="true">
                    <template slot-scope="scope">   
                       <span style="margin-left: 10px" ref="price">{{scope.row.statusInfo}}</span>
                    </template>  
                </el-table-column>
                <el-table-column  label="操作" width="100">
                <template slot-scope="scope">
                 <el-button
                 size="mini"
                 type="danger"
                 @click="handleDelete(scope.$index,v.menuDtos)">删除</el-button>
                </template>
                </el-table-column>
                </el-table>
                <div style="width:100%;height:60px;text-align:right;margin-top:20px;">
                    <el-button style="float:right;margin-right:20px;" type="danger" @click="account(v,i)">结算</el-button>
                <p style="float:right;font-size:24px;color:#f60;margin-right:20px;">￥{{v.price}}</p>
                <el-button @click="allPrice(v,i)">查看总价</el-button>
                </div>

                </div> 

            </div>      

        </div>
        <el-dialog  :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form">
            <el-form-item label="订单编号" :label-width="formLabelWidth">
             <el-input v-model="form.order_no" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
             <el-form-item label="下单时间" :label-width="formLabelWidth">
             <el-input v-model="form.order_create_date" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
             <el-form-item label="订单状态" :label-width="formLabelWidth">
             <el-input v-model="form.order_status" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
             <el-form-item label="订单金额" :label-width="formLabelWidth">
             <el-input v-model="form.order_money" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
            <el-form-item label="商铺编号" :label-width="formLabelWidth">
             <el-input v-model="form.name" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
            <el-form-item label="商铺名称" :label-width="formLabelWidth">
             <el-input v-model="form.name" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
            </el-form>
             <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                 <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
             </div>
        </el-dialog>
        <el-dialog  :visible.sync="dialogFormVisible1" width="550px" :modal="false">
                        <photo></photo>
        </el-dialog>
    </div>
</template>

<script>
import mockdata from "../Mock/mock";
import product_data from '../Mock/produce'
import photo from './photo'
    export default {
      data() {
        return {
            photoBase:'',
          data: [],
          value1: '',
          pic:require('../assets/images/单选框未选.png'),
          pic1:require('../assets/images/单选框已选.png'),
          check:false,
          pic16:require('../assets/images/图层16.png'),
          num1: 1,
          CartData:[],
          dialogFormVisible:false,
          orderMinute:[],
          productList:product_data,
          carArr:[],
          pp:'',
          price1 : 0,
          price:0,
          aa:false,
          arr:[],
          all:0,
          multipleSelection:[],
          i:'',
          dialogFormVisible1:false,
          boxShow:true,
          carLength:'',
    form: {
            menuName: '546',
            order_create_date: '',
            order_status: '',
            order_money: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            menuPrcie1:0,
            dataI:[],
           },
           formLabelWidth: '120px'
        }
      },
      methods:{
        handleClick(row) {
            this.dialogFormVisible=true
            this.orderMinute=row
            this.form.order_no=row.order_no
            console.log(row.order_no);
        },
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
              this.$http.get('/api1/1024/cq1024/shop-car/shopCar/list').then((res)=>{
                  if(res.data.code == 100){
                        this.CartData=res.data.info
                         for(var i =0 ;i< this.CartData.shoppingCarInfo.length;i++){                
                 this.$set(this.CartData.shoppingCarInfo[i],'price',this.all)             
                }
                let arr =[]
             for(var i =0 ;i< this.CartData.shoppingCarInfo.length;i++){
                    arr[i] = this.CartData.shoppingCarInfo[i].menuDtos                  
                }
                let arr1 = []
                 for(var j =0;j<arr.length;j++){
                        for(var m =0 ;m<arr[j].length;m++){
                             this.$set(arr[j][m],'check',false)   
                        }             
                }
                //  console.log(arr)
                 this.arr = arr
                // console.log(this.CartData)           
                  }
            
            
            })                      
        },
        checkboxInit(row,index){
             if (row.statusInfo=="信息过期" || row.statusInfo=="不可下单" || row.statusInfo=="余量不足") 
                return 0;//不可勾选
             else
                return 1;//可勾选
        },
         handleSelectionChange(val) {
        //    console.log(val)
           for(var i in val){
               val[i].check =true
           }
            },
            allPrice(v,i){
               let arr =[]
               let pArr= 0
                for(var j= 0;j<v.menuDtos.length;j++){
                    if(v.menuDtos[j].check==true){
                    pArr += (v.menuDtos[j].menuPrice)*(v.menuDtos[j].shoppingCarMenuNum)
                    }
                }
                v.price = pArr   
            },
          account(v,i){
               let arr =[]
               let pArr= 0
                for(var j= 0;j<v.menuDtos.length;j++){
                    if(v.menuDtos[j].check==true){
                    arr.push({matchMenu:{matchMenuId:v.menuDtos[j].matchMenuId},orderMenuNum:v.menuDtos[j].shoppingCarMenuNum})  
                    pArr += (v.menuDtos[j].menuPrice)*(v.menuDtos[j].shoppingCarMenuNum)
                    }
                }
                 v.price = pArr
                 console.log(arr.length)
                 if(arr.length == 0){
                       this.$message({
                       message: '请选择菜品',
                       type: 'info'
                     });
                     return false
                 }
                this.$store.state.accountInfo=arr
                this.$router.push('userFace')
            },
        handleChange(a,b) {
                console.log(a.shoppingCarId);
                console.log(b)
                let param =new URLSearchParams
                param.append('shoppingCarMenuNum',b)
                param.append('shoppingCarId',a.shoppingCarId)
                this.$http.post('/api1/1024/cq1024/shop-car/shopCar/update',param).then((res)=>{
                    console.log(res.data.msg)
                })
      },
       handleDelete(index,row) {
        //    console.log(index)
        //  this.carLength = row.length
        //   console.log(row[index].shoppingCarId);
        console.log(index)
         this.$confirm('是否删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
             }).then(() => {
                   this.$http.get('/api1/1024/cq1024/shop-car/shopCar/delete/'+row[index].shoppingCarId).then((res)=>{
                    console.log(res.data.msg)
                    if(res.data.code==100){
                        this.$message({
                            type:"success",
                            message:res.data.msg
                        })
                         row.splice(index,1);
                       this.getMenuData()
                          
                    }else{
                        this.$message({
                            type:"warning",
                            message:res.data.msg
                        })
                    }
                })
            }).catch(() => {
             this.$message({
               type: 'info',
               message: '已取消删除'
             });          
        }); 
            },
        setPrice(){
            var arr1 = this.CartData.shoppingCarInfo
        }      
      },
      filters:{
           samllPrice(a,b){
              return a*b
            },
            bigPrice(c){
                for(var i in c){
                    var d= 0
                    d += c[i]
                }
                return d
            }
      },
      computed:{
          cartList(){
              return this.$store.state.cartList
          },
          productDictList(){
              const dict = {};
              this.productList.forEach(item => {
                  dict[item.id] = item;
              });
              return dict;
          },

          totalPrice(){
              var arr= this.priceArr;
              var price;
              for(var i=0;i<arr.lenght;i++){
                   price += arr[i].menuPrice*arr[i].shoppingCarMenuNum
              }
              return price
          },
            baseChange(){
        return this.$store.state.base64
      },
   
      },
      watch:{
        baseChange(val){
         this.photoBase = this.$store.state.base64
        console.log("cart监听到摄像头图片传值")
        },
        carLength(val){
        //       if(row.length == 0){
        //      
        //    }
             console.log(val)
        }
      },
      mounted(){
        //    this.$store.dispatch('getCartList')
           this.getMenuData()
         
      },
       components:{
              photo
          }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/rightMain.scss';
</style>

