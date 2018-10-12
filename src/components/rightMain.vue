<template>
    <div class="rightMain">
        <div class="w">
           <h2 class="dishes-font">菜品管理</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>这里是菜品管理面板</p>
            </div>
            <div class="table">
                    <input  placeholder="请输入内容" class="search-input" v-model="dishName">
                    <button class="search-button" @click="search()"><i class="iconfont"></i></button>
              <div class="button-group">
                   <button>危险按钮</button>
                     <button>危险按钮</button>
              </div>
            </div>

            <div class="tableData">
                <table class="data" style="border-collapse:separate; border-spacing:0 10px;">
                    <thead>
                        <tr>
                            <th>菜品编号</th>
                            <th>菜名</th>
                            <th>种类</th>
                            <th>图片</th>
                            <th>属性</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr  v-for="(v,i) in this.data" :key="i">
                             <!-- <td rowspan="1" colspan="1">{{v.id}}</td>
                             <td rowspan="1" colspan="1">{{v.name}}</td>
                             <td rowspan="1" colspan="1">{{v.kind}}</td>
                             <td rowspan="1" colspan="1"><img :src="v.img" alt=""></td>
                             <td rowspan="1" colspan="1">{{v.property}}</td> -->
                             <td>{{v.dishName}}</td>
                             <td>
                                 <span></span>
                                 <span></span>
                             </td>
                            </tr>
                    </tbody>
                   
                </table>
<el-pagination background :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="prev, sizes,pager, next,total,jumper" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" @size-change="sizeChange"></el-pagination>
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
          total:40,//默认数据总数
          pageSize:8,//每页的数据条数
          currentPage:1,//默认开始页面
          dishName:'',
        }
      },
      methods:{
          getData(){
                this.$http.get('/api/chengpeng/dishTypes').then((res)=>{
                    // this.data=res.data
                   
                })            
          },
          getpage(){
              this.$http.get('/api/chengpeng/dishTypes',{
                  params:{
                      pageNum:this.currentPage,
                      pageSize:this.pageSize,
                      dishName:this.dishName
                  }
              }).then((res)=>{
                    this.data=res.data.dishTypes
                    this.total=res.data.total
                    console.log(res)
              })
          },
          handleCurrentChange(val){
                this.currentPage = val;
                console.log(this.currentPage)
                 this.getpage()
          },
          search(){
              this.getpage()
          },
          sizeChange(val){
              this.pageSize=val
              this.getpage()
          }
      },
      mounted(){
        //   this.getData()
          this.getpage()
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/rightMain.scss'
</style>

