<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">评价菜品</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>快来评价你的菜品吧！</p>
            </div>
            <div class="tableData">
                <div class="box-title"><p>店铺:</p><a href="#">北明包粥铺</a></div>
                <div  class="box">
                       <div class="table-box">
                            <div class="box-top">
                            <div class="box-top-left">
                                <a href="#"><img src="https://img.alicdn.com/bao/uploaded/i6/TB1f2yBpbZnBKNjSZFGxuHt3FXa_031333.jpg" alt=""></a>
                                <p>大包子</p>
                                <span><el-tag>不辣</el-tag></span>
                                <span><el-tag type="success">面食</el-tag></span>
                            </div>
                            <div class="box-top-right">
                                 <p>菜品打分</p>
                             <div class="evaluate">
                                  <el-rate
                                  v-model="value"
                                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                                </el-rate>
                             </div>
                            </div>
                        </div>
                         <div class="box-bottom">
                              <textarea name="" id="500" cols="200" rows="8" style="border:1px solid #e8e2e1;border-radius:5px;"></textarea>
                         </div>
                       </div>
                        <!-- <div class="table-box">
                            <div class="box-top">
                            <div class="box-top-left">
                                <a href="#"><img src="https://img.alicdn.com/bao/uploaded/i6/TB1f2yBpbZnBKNjSZFGxuHt3FXa_031333.jpg" alt=""></a>
                                <p>大包子</p>
                                <span><el-tag>不辣</el-tag></span>
                                <span><el-tag type="success">面食</el-tag></span>
                            </div>
                            <div class="box-top-right">
                                 <p>菜品打分</p>
                             <div class="evaluate">
                                  <el-rate
                                  v-model="value"
                                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                                </el-rate>
                             </div>
                            </div>
                        </div>
                         <div class="box-bottom">
                              <textarea name="" id="500" cols="200" rows="8" style="border:1px solid #e8e2e1;border-radius:5px;"></textarea>
                         </div>
                       </div> -->
                        <div class="e-button"> <el-button type="danger">评价</el-button></div>
                </div>
            
            </div>
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
            value:'',
          data: [],
            form: {
            id: '',
            kind: '',
            name: '',
            property: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
           },
           formLabelWidth: '120px'
        }
      },
      methods:{
          getData(){
                this.$http.get('/api/localhost/data').then((res)=>{
                    this.data=res.data

                    console.log(this.data)
                })            
          },
            handleSelectionChange(val) {
                console.log(val)
            }      
      },
      mounted(){
          this.getData()
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
    .e-button{
        width: 90%;
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 30px;
        
    }
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
</style>

