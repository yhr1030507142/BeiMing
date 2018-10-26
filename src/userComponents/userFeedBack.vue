<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">用户反馈</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>这里是用户反馈面板</p>
            </div>
            <div class="table">
               
                   <el-button round @click="showMenu" >全部建议<i :class="menu?'el-icon-caret-right':'el-icon-caret-left'"></i></el-button>
                   <transition name="fade" mode="out-in">
                       <el-button type="warning" round v-show="menu" @click="setSugType('a')">菜品建议</el-button>
                    </transition>
                     <transition name="fade" mode="out-in">
                     <el-button type="danger" round v-show="menu" @click="setSugType('b')">安全建议</el-button>
                        </transition>
                      <transition name="fade" mode="out-in">
                        <el-button type="primary" round v-show="menu" @click="setSugType('c')">卫生建议</el-button>
                           </transition>
            </div>
               <p v-show="this.sugType==''">请选择建议类型</p> {{this.sugType}}
            <div class="tableData">
                <div >
                <textarea name="" cols="200" rows="8" style="font-size:24px;border:1px solid #e8e2e1;border-radius:5px;width:100%;height:300px;" v-model="sugContent"></textarea>
                <div style="width:100%;height:auto;display:flex;flex-direction:row;justify-content:center;margin-top:30px;">
                     <div style="display:flex">
                         <el-button type="danger"  style="width:200px;height:40px" @click="addSave">建议成功</el-button>
                     </div>
                     </div>
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
          data: [],
          menu:true,
          sugContent:'',
          sugType:''
        }
      },
      methods:{
          showMenu(){
              if(this.menu==false){
                  this.menu=true
              }else{
                  this.menu=false
              }
          },
           addSave(){
               
               console.log(this.sugContent)
               console.log(this.sugType)
               if(this.sugType == ""){
                   this.$message({
                       type:'warning',
                       message:'请先选择所要建议的类型'
                   })
                   return false
               }
               if(this.sugContent==""){
                    this.$message({
                       type:'warning',
                       message:'建议不能为空'
                   })
                    return false
               }
          let param = new URLSearchParams
          param.append('sugContent',this.sugContent)
          param.append('sugType',this.sugType)
          this.$http.post('/api1/1024/cq1024/sug/add',param).then((res)=>{
              console.log(res)
              if(res.data.code == 100){
                this.$message({
                       type:'success',
                       message:'建议成功'
                   })
              }else{
                   this.$message({
                       type:'warning',
                       message:res.data.msg
                   })
              }
                },(err)=>{
                    this.$message({
                       type:'warning',
                       message:'系统异常'
                   })
                })    
        },
        setSugType(value){
            var _this =this
            switch (value){
                case 'a':
                    _this.sugType='菜品建议'
                    console.log(this.sugType)
                    break;
                case 'b':
                    _this.sugType="安全建议"
                     console.log(this.sugType)
                    break;
                case 'c':
                    _this.sugType="卫生建议"
                     console.log(this.sugType)
                    break;
                default:
                    _this.sugType=""
                     console.log(this.sugType)
                    break;
                    
            }
        }
      },
     
      mounted(){
        //   this.getData()
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/feedback.scss';
.fade{
    opacity: 1;
    margin-left:0;
}
.fade-enter{
    opacity: 0;
    margin-left:-100px;
}
.fade-enter-active,.fade-leave-active{
    transition: all 1s;
}
.fade-leave{
    /*对于简单动画来说，[name]-leave也可以不写，多数情况下，此处的样式和元素正常显示是的样式是相同的*/
    opacity: 1;
    margin-left:0;
}
.fade-leave-active{
    opacity: 0;
    margin-left:-100px;
}



</style>

