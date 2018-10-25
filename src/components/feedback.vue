<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">用户反馈</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>这里是用户反馈面板</p>
            </div>
            <div class="table">
                    <el-dropdown @command="handleCommand">
                     <el-button type="primary"  >
                       更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                     </el-button>
                     <el-dropdown-menu slot="dropdown">
                        
                       <el-dropdown-item v-for="(v,i) in suggesList" :key="i" :command="v.sugType">{{v.name}}</el-dropdown-item>                  
                     </el-dropdown-menu>
                    </el-dropdown>
            </div>

            <div class="tableData">
        <el-table :data="data" stripe style="width: 100%;height:530px;"   @selection-change="handleSelectionChange">
        <!-- <el-table-column  type="selection"  width="55"> </el-table-column> -->
                
                <el-table-column prop="" label="" width="60"> </el-table-column>
                <el-table-column prop="sugType" label="反馈类型" > </el-table-column>
                <el-table-column prop="sugContent" label="反馈信息"></el-table-column>
                <el-table-column prop="sugCreateDate" label="反馈日期"></el-table-column>
                <!-- <el-table-column fixed="right" label="操作" width="100">
                 <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                 <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column> -->
                </el-table>
<el-pagination background :page-sizes="[5,10]" :page-size="pageSize" layout="prev, sizes,pager, next,total,jumper" :total="total" :current-page="pageNum" @current-change="handleCurrentChange" @size-change="sizeChange"></el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
import mockdata from "../Mock/mock";
    export default {
      data() {
        return {
          total:0,//默认数据总数
          pageSize:5,//每页的数据条数
          pageNum:1,//默认开始页面
          data: [],
          suggesList:[  
                         {name:'全部',sugType:""},
                         {name:'菜品建议',sugType:"菜品建议"},
                         {name:'安全建议',sugType:"安全建议"},
                         {name:'卫生建议',sugType:"卫生建议"},
                       
                        ],
            sugType:'',
            form: {
            sugId: '',
            sugType: '',
            sugContent: '',
            sugCreateDate:'',
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
              let param = new URLSearchParams
              param.append('pageSize',this.pageSize)
              param.append('pageNum',this.pageNum)
              param.append('sugType',this.sugType)
                this.$http.post('/api/feedback/sug/list',param).then((res)=>{
                    if(res.data.code==100){
                         this.data=res.data.info.sugs
                         this.total=res.data.info.total
                    console.log(res.data)
                    } 
                })            
          },
           handleCommand(command) {
                    this.sugType = command
                    let param = new URLSearchParams
                     param.append('pageSize',this.pageSize)
                     param.append('pageNum',this.pageNum)
                     param.append('sugType',command)
                     this.$http.post('/api/feedback/sug/list',param).then((res)=>{
                     if(res.data.code==100){
                         this.data=res.data.info.sugs
                         this.total=res.data.info.total
                    console.log(res.data)
                    }
              })
            },
        handleCurrentChange(val){
                this.pageNum = val;
                console.log(this.pageNum)
                 this.getData()
          },
        //   search(a){
        //        let param = new URLSearchParams
        //        param.append('pageSize',this.pageSize)
        //        param.append('pageNum',this.pageNum)
        //        param.append('sugType',a)
        //     this.$http.post('/api/feedback/sug/list',param).then((res)=>{
        //               this.data=res.data.info.sugs
        //               this.total=this.data.info.total
        //       })
             
        //   },
          sizeChange(val){
              this.pageSize=val
              this.getData()
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

