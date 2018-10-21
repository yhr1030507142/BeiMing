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
                  <el-table :data="data" stripe style="width: 100%"   @selection-change="handleSelectionChange">
        <el-table-column  type="selection"  width="55"> </el-table-column>
                <el-table-column   prop="id"  label="反馈编号" width="180"> </el-table-column>
                <el-table-column prop="kind" label="反馈类型" width="180"> </el-table-column>
                <el-table-column prop="name" label="反馈信息"></el-table-column>
                <el-table-column prop="order_money" label="属性1"></el-table-column>
                <el-table-column prop="sell_name" label="属性2"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                 <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                 <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
                </el-table>
                <!-- <table class="data" style="border-collapse:separate; border-spacing:0 10px;">
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
                   
                </table> -->
    
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
            form: {
            id: '',
            kind: '',
            name: '',
            property: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
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
@import '../assets/sass/feedback.scss'
</style>

