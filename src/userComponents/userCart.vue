<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">购物车</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>快来看看您的购物车吧！</p>
            </div>
            <div class="table">
                   <div class="table">
                    <input  placeholder="请输入内容" class="search-input">
                    <button class="search-button"><i class="iconfont"></i></button>
                    </div>
            </div>
            <div class="tableData" ref="tabData">
                <div v-for="(v,i) in this.CartData.shoppingCarInfo" :key="i" style="width:100%;height:auto;border:1px solid black;margin-top:20px;">
                <!-- <p>店铺名称:{{v.shopName}}</p>
                <p>订餐日期:{{v.matchMenuDate}}</p>
                <p>订餐类型:{{v.matchMenuTime}}</p>
                {{i}} -->
               
            <el-table :data="v.menuDtos" stripe style="width: 100%"  @selection-change="handleSelectionChange" >
                    
                    <el-table-column  label="num">
                   <template slot-scope="scope">   
                    <span style="margin-left: 10px">{{i}}</span>
                    </template>    
                 </el-table-column> 
                    <el-table-column  type="selection"  width="55" :key="i"> </el-table-column>
                <el-table-column   label="菜品编号">
                   <template slot-scope="scope">   
                    <span style="margin-left: 10px">{{scope.row.shoppingCarId}}</span>
                    </template>    
                 </el-table-column> 
                <el-table-column  label="菜品名称">
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
                       
                <el-input-number v-model="scope.row.shoppingCarMenuNum" size="mini" controls-position="right" @change="handleChange" :min="1" ></el-input-number>
                    </template>  
                </el-table-column>
                 
                  <el-table-column label="菜品总价">
                    <template slot-scope="scope">   
                       <span style="margin-left: 10px" ref="price">{{scope.row.shoppingCarMenuNum,scope.row.menuPrice |samllPrice}}</span>
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
                    <el-button style="float:right;margin-right:20px;" type="danger" @click="allPrice(v,i)">结算</el-button>
                <p style="float:right;font-size:24px;color:#f60;margin-right:20px;"  v-show="aa" @click="allPrice(v,i)">点击计算总计:￥ {{v.price}}</p>
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
        
    </div>
</template>

<script>
import mockdata from "../Mock/mock";
import product_data from '../Mock/produce'
    export default {
      data() {
        return {
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
            aa:true,
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
            // this.$http.get('/api/chengpeng/shoppingCars').then((res=>{
            //     this.CartData=res.data.info.shoppingCarInfo
            //     console.log(res.data.info.shoppingCarInfo[0].matchMenu.menu.menuName)
            //     this.form.menuName=res.data.info.shoppingCarInfo[0].matchMenu.menu.menuName
            // }))
            // setTimeout(()=>{
            //     this.product = product_data.find(item => item.id === this.id)
            //     console.log(this.product)
            // },500)
            //  this.$http.get('/api/yang/shopCar/list').then((res)=>{
             this.$http.get('/api/localhost/cart1').then((res)=>{

                // console.log(res.data.info)
                this.CartData=res.data.info
             for(var i =0 ;i< this.CartData.shoppingCarInfo.length;i++){
                 this.$set(this.CartData.shoppingCarInfo[i],'price',0)
                //   console.log(this.CartData.shoppingCarInfo)
                }
                // console.log(this.CartData)           
            })        
              
        },
         handleSelectionChange(val) {
           console.log(val)
           this.price = 0;

            for(var j in val){
                console.log(j)
                this.price += val[j].menuPrice* val[j].shoppingCarMenuNum                       
            }
            },
            allPrice(v,i){
                for(var n= 0;n<this.CartData.shoppingCarInfo.length;n++){
                 if(n == i){
                    //  this.$set(this.CartData.shoppingCarInfo[n],'price',this.price1)
                     v.price = this.price
                 }    
                }
            },
        handleChange(value) {
        console.log(value);
      },
       handleDelete(index,row) {
           console.log(index)
                console.log(row);
                 console.log(row[index].shoppingCarId);
                this.$http.delete('/api/yang/shoppingCar/'+row[index].shoppingCarId).then((res)=>{
                    console.log(res.msg)
                })
                 row.splice(index,1);
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
          }
          
      },
      mounted(){
        //    this.$store.dispatch('getCartList')
           this.getMenuData()
         
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/rightMain.scss'
</style>

