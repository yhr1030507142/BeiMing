<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">用户反馈</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>这里是用户反馈面板</p>
            </div>
            <div class="table">
                    <input  placeholder="请输入内容" class="search-input">
                    <button class="search-button"><i class="iconfont"></i></button>
            </div>

            <div class="tableData">
                <table class="data" style="border-collapse:separate; border-spacing:0 10px;">
                    <thead>
                        <tr>
                            <th>反馈编号</th>
                            <th>反馈类型</th>
                            <th>反馈信息</th>
                            <th>属性1</th>
                            <th>属性2</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr  v-for="(v,i) in this.data" :key="i">
                             <td rowspan="1" colspan="1">{{v.id}}</td>
                             <td rowspan="1" colspan="1">{{v.name}}</td>
                             <td rowspan="1" colspan="1">{{v.kind}}</td>
                             <td rowspan="1" colspan="1"><img :src="v.img" alt=""></td>
                             <td rowspan="1" colspan="1">{{v.property}}</td>
                             <td>
                                 <span></span>
                             </td>
                            </tr>
                    </tbody>
                   
                </table>
    
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
        }
      },
      methods:{
          getData(){
                this.$http.get('/api/data').then((res)=>{
                    this.data=res.data
                    console.log(this.data)
                })            
          } 
      },
      mounted(){
          this.getData()
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/feedback.scss'
</style>

