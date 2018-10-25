<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">评价菜品</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>快来评价你的菜品吧！</p>
            </div>
            <div class="tableData" v-for="(v,i) in data" :key="i" style="margin-top:20px;">
                <div class="box-title"><p>店铺:</p><a href="#">{{shopName}}</a></div>
                <div  class="box">
                       <div class="table-box">
                            <div class="box-top">
                            <div class="box-top-left">
                                <!-- <a href="#"><img :src="v.pic" alt=""></a> -->
                                <p>{{v.menuName}}</p>
                                <span><el-tag>{{v.menuPropertiesStyleName}}</el-tag></span>
                                <span><el-tag type="success">{{v.menuPropertiesCategoryName}}</el-tag></span>
                                <span><el-tag type="success">{{v.menuPropertiesTasteName}}</el-tag></span>

                            </div>
                            <div class="box-top-right">
                                 <p>菜品打分</p>
                             <div class="evaluate">
                                  <el-rate
                                  v-model="v.menuRating"
                                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                                </el-rate>
                             </div>
                            </div>
                        </div>
                         <div class="box-bottom" style="padding-bottom:30px;">
                              <textarea name="" v-model="v.sugContent" id="500" cols="200" rows="8" style="border:1px solid #e8e2e1;border-radius:5px;"></textarea>
                         </div>
                       </div>
                </div>
            </div>
                        <div class="e-button" > <el-button type="danger" @click="save()" class="save">评价</el-button> <el-button type="danger" @click="backGo()" class="save">返回</el-button></div>

        </div>
    </div>
</template>

<script>
import mockdata from "../Mock/mock";
    export default {
      data() {
        return {
            input:'',
            select:'1',
            loading:false,
            value:0,
            meunId:[],
            data: [],
            shopName:'',
            whichMeal:'',
            orderPayDate:'',
            text:'',
        }
      },
      methods:{
          getData(){
                // this.$http.get('/api/localhost/data').then((res)=>{
                //     this.data=res.data
                //     console.log(this.data)
                // })     
                 this.$http.get('/api/yangguoli/cq1024/order/menus/'+this.$route.params.id).then((res)=>{
                      console.log(res)
                    this.data =res.data.info.orderMenuDtos
                    this.shopName = res.data.info.shopName
                    this.whichMeal=res.data.info.whichMeal
                    this.orderPayDate = res.data.info.orderPayDate

                    console.log(this.data)
                })       
                for(var i =0;i<this.data.length;i++){
                    this.$set(this.data[i],'sug','')
                    this.$set(this.data[i],'valueStar',0)
                }
                 

          },
            handleSelectionChange(val) {
                console.log(val)
            },
            save(){
                // console.log(this.data)
                let param =new URLSearchParams
                let menuSugs = []
                for(var i = 0;i<this.data.length;i++){
                    menuSugs.push({menuSugId:this.data[i].menuSugId,menu:{menuId:this.data[i].menuId},sugContent:this.data[i].sugContent,menuRating:this.data[i].menuRating})
                }
                
                 console.log(JSON.stringify(menuSugs))
                param.append('menuSugs',JSON.stringify(menuSugs))
                param.append('orderNo',this.$route.params.id)
                this.$http.post('/api/yangguoli/cq1024/order/appraise',param).then(res=>{
                        console.log(res)
                        if(res.data.code==100){
                            this.$message({
                                type:'sucess',
                                message:'评价成功'
                            })
                        }else{
                             this.$message({
                                type:'info',
                                message:res.data.msg
                            })
                        }
                },err=>{
                    this.$message({
                                type:'info',
                                message:'系统异常'
                            })
                })
            },
            backGo(){
                this.$router.go(-1)
            }   
      },
      mounted(){
          this.getData()
          console.log(this.$route.params.id)
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/feedback.scss';
.box-title{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width:100%;
    p{
        display: flex;
        color: #ff7d63;
        font-size: 14px;
    }
    a{
         display: flex;
         margin-left: 10px;
    }
}
.box{
    background: #fff;
    width: 100%;
    height: auto;
    display:flex;
    border-radius: 5px;
    flex-direction: column;
    
    .table-box{
    .box-top{
        width: 90%;
        height: 100px;
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .box-top-left{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            a{
                display: flex;
                width: 50px;
                height: 50px;
                border-radius:50%;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            p{
                  display: flex;
                  font-size: 14px;
                  color: #999; 
                  margin-left: 35px;
                  margin-right: 55px;
            }
            span{
                display: flex;

            }
        }
        .box-top-right{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            p{
                display: flex;
                color: #999;
                margin-right: 25px;
            }
            .evaluate{
                        display: flex;
                    }
        }
    }
    }
    .box-bottom{
        margin-top: 10px;
        display: flex;
        width: 90%;
        margin: auto;
    }

   
}

 .e-button{
        width: 90%;
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 30px;
        .save{
            display: flex;
        }
    }
</style>

