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
                  
                     <button @click="handleDeleteAll()">批量删除</button>
                      <button @click="addDish()">增加菜品</button>
              </div>
            </div>

            <div class="tableData">
                <!-- <table class="data" style="border-collapse:separate; border-spacing:0 10px;">
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
                            <tr  v-for="(v,i) in this.data" :key="i"> -->
                             <!-- <td rowspan="1" colspan="1">{{v.id}}</td>
                             <td rowspan="1" colspan="1">{{v.name}}</td>
                             <td rowspan="1" colspan="1">{{v.kind}}</td>
                             <td rowspan="1" colspan="1"><img :src="v.img" alt=""></td>
                             <td rowspan="1" colspan="1">{{v.property}}</td> -->
                             <!-- <td>{{v.menuName}}</td>
                             <td>
                                 <span></span>
                                 <span></span>
                             </td>
                            </tr>
                    </tbody>
                   
                </table> -->
                <el-table :data="data" stripe style="width: 100%"  @selection-change="handleSelectionChange">
                <el-table-column  type="selection"  width="55"> </el-table-column>
                <el-table-column   label="菜品ID">
                   <template slot-scope="scope">   
                    <span style="margin-left: 10px">{{scope.row.menuId}}</span>
                    </template>    
                 </el-table-column> 
                  <el-table-column   label="菜品编号">
                   <template slot-scope="scope">   
                    <span style="margin-left: 10px">{{scope.row.menuNo}}</span>
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
                       <span style="margin-left: 10px">{{scope.row.menuPropertiesStyle.menuPropertiesStyleName}}</span>
                    </template>   
                </el-table-column>
                <el-table-column label="菜品口味">
                    <template slot-scope="scope">   
                       <span style="margin-left: 10px">{{scope.row.menuPropertiesTaste.menuPropertiesTasteName}}</span>
                    </template>  
                </el-table-column>
                   <el-table-column label="烹饪制法">
                    <template slot-scope="scope">   
                       <span style="margin-left: 10px">{{scope.row.menuPropertiesCategory.menuPropertiesCategoryName}}</span>
                    </template>  
                </el-table-column>
                 
                <el-table-column  label="操作" width="150" align="center">
                <template slot-scope="scope">
                <el-button
                 size="mini"
                 @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                 <el-button
                 size="mini"
                 type="danger"
                 @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                </template>
                </el-table-column>
                </el-table>
        <!-- 添加模态框开始 -->
            <el-dialog  :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form" ref="form">
          

            <el-form-item label="菜品名称" :label-width="formLabelWidth">
             <el-input v-model="form.menuName" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>

             <el-form-item label="菜品类型" :label-width="formLabelWidth">
            <el-select v-model="form.menuPropertiesStyleId" placeholder="菜品类型" style="width:250px;">
                <el-option :label="v.menuPropertiesStyleName" :value="v.menuPropertiesStyleId" v-for="(v,i) in menuPropertiesStyle" :key="i"></el-option>
            </el-select>
            </el-form-item>

              <el-form-item label="菜品烹饪类型" :label-width="formLabelWidth">
            <el-select v-model="form.menuPropertiesCategoryId" placeholder="菜品类型" style="width:250px;">
                <el-option :label="v.menuPropertiesCategoryName" :value="v.menuPropertiesCategoryId" v-for="(v,i) in menuPropertiesCategory" :key="i"></el-option>
            </el-select>
            </el-form-item>

             <el-form-item label="菜品口味" :label-width="formLabelWidth">
            <el-select v-model="form.menuPropertiesTasteId" placeholder="菜品类型" style="width:250px;">
                <el-option :label="v.menuPropertiesTasteName" :value="v.menuPropertiesTasteId" v-for="(v,i) in menuPropertiesTaste" :key="i"></el-option>
            </el-select>
            </el-form-item>

             <el-form-item label="菜品价格" :label-width="formLabelWidth">
             <el-input v-model="form.menuPrice" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
            
             <el-form-item label="菜品图片" :label-width="formLabelWidth">
            <!-- <img-inputer v-model="form.imgFile" theme="light" size="small" :on-change="picFile" type="file" accept="image/png,image/gif,image/jpeg"/> -->
            <input type="file" ref="fileImg">         
             </el-form-item>
            
             

             </el-form>
             <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="closeAdd('form')">取 消</el-button>
                 <el-button type="primary" @click="addDishMenu()" >确 定</el-button>
             </div>
        </el-dialog>
      
        <!-- 添加模态框结束 -->
              <!-- 更新模态框开始 -->
            <el-dialog  :visible.sync="updateBox" width="500px">
            <el-form :model="updateForm">
            <el-form-item label="商铺号" :label-width="formLabelWidth">
             <el-input v-model="updateForm.shopId" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>

          
             <el-form-item label="菜品名称" :label-width="formLabelWidth">
             <el-input v-model="updateForm.menuName" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
             <el-form-item label="菜品价格" :label-width="formLabelWidth">
             <el-input v-model="updateForm.menuPrice" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
           
             <el-form-item label="菜品图片" :label-width="formLabelWidth">
             <!-- <el-input v-model="updateForm.uploadPic" autocomplete="off" style="width:250px;"></el-input> -->
             <!-- <img-inputer v-model="updateForm.uploadPic" theme="light" size="5px" :on-change="chooseImg" type="file" accept="image/png,image/gif,image/jpeg"/>   -->
            <!-- <input type="file"><img  :src="updateForm.uploadPic" alt="" width="100px" height="100px"> -->
            <div class="head-img" style="width:50px;height:50px;margin-bottom:20px;">
            <img :src="updateForm.uploadPic" id="my-img" width="70px" height="70px" @click="openFile()">          
            <input type="file" id="imgUpload" ref="imgFile" v-on:change="changeImg()"/>
            </div>
            </el-form-item>

            <el-form-item label="菜品类型" :label-width="formLabelWidth">
            <el-select v-model="updateForm.menuPropertiesStyleId" placeholder="菜品类型" style="width:250px;">
                <el-option :label="v.menuPropertiesStyleName" :value="v.menuPropertiesStyleId" v-for="(v,i) in menuPropertiesStyle" :key="i"></el-option>
            </el-select>
            </el-form-item>

              <el-form-item label="菜品烹饪类型" :label-width="formLabelWidth">
            <el-select v-model="updateForm.menuPropertiesCategoryId" placeholder="菜品类型" style="width:250px;">
                <el-option :label="v.menuPropertiesCategoryName" :value="v.menuPropertiesCategoryId" v-for="(v,i) in menuPropertiesCategory" :key="i"></el-option>
            </el-select>
            </el-form-item>

             <el-form-item label="菜品口味" :label-width="formLabelWidth">
            <el-select v-model="updateForm.menuPropertiesTasteId" placeholder="菜品类型" style="width:250px;">
                <el-option :label="v.menuPropertiesTasteName" :value="v.menuPropertiesTasteId" v-for="(v,i) in menuPropertiesTaste" :key="i"></el-option>
            </el-select>
            </el-form-item>
            </el-form>
             <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="closeAdd('form')">取 消</el-button>
                 <el-button type="primary" @click="updateOk()">确 定</el-button>
             </div>
        </el-dialog>
        <!-- 更新模态框结束 -->
<el-pagination background :page-sizes="[1,5,10,15,20]" :page-size="pageSize" layout="prev, sizes,pager, next,total,jumper" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" @size-change="sizeChange"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import mockdata from "../Mock/mock";
import Qs from 'qs'
    export default {
      data() {
        return {
          data: [],
          total:0,//默认数据总数
          pageSize:5,//每页的数据条数
          currentPage:1,//默认开始页面
          dishName:'',
          dialogFormVisible:false,
          updateBox:false,
          menuIdArr:'',
          menuPropertiesStyle:'',
          menuPropertiesTaste:'',
          menuPropertiesCategory:'',
          imgUpdate:'',
          aa:'',
           form: {
            menuName:'',
            menuPropertiesCategoryId:'',
            menuPropertiesStyleId:'',
            menuPropertiesTasteId:'',
            menuPrice:'',
            menuNo:'',
            // imgFile:'',
            shopId:'',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
          
           },
           formLabelWidth: '120px',
           updateForm:{
             menuName:'',
             menuPropertiesCategoryId:'',
             menuPropertiesStyleId:'',
             menuPropertiesTasteId:'',
             menuPrice:'',
             menuNo:'',
             uploadPic:'',
             shopId:'',
             menuId:'',
             pic:false,
           },
        }
      },
      methods:{
        //   getData(){
        //         this.$http.post('/api/liangsijie/menu/findAllByPage',{params:{
        //             currentPage:3,
        //             pageSize:2
        //             }}).then((res)=>{
        //             // this.data=res.data
        //            console.log(res)
        //         })            
        //   },
          getpage(){
              let param =new URLSearchParams
              param.append('pageNum',this.currentPage)
              param.append('pageSize',this.pageSize)
              this.$http.post('/api/liangsijie/menu/findAllByPage',param).then((res)=>{
                    this.data=res.data.info.info.list
                    this.total=res.data.info.info.total
                    console.log(res)
              })
          },
          handleCurrentChange(val){
                this.currentPage = val;
                console.log(this.currentPage)
                 this.getpage()
          },
          search(){
              console.log(1)
            let param =new URLSearchParams
              param.append('pageNum',this.currentPage)
              param.append('pageSize',this.pageSize)
              param.append('menuName',this.dishName)
             this.$http.post('/api/liangsijie/menu/findAllByPage',param
              ).then((res)=>{
                  if(res.data.code == 100){
                     this.data=res.data.info.info.list
                     this.total=res.data.info.info.total
                  }
              })
             
          },
          sizeChange(val){
              this.pageSize=val
              this.search()
          },
        handleSelectionChange(val) {
            console.log(val)
            this.menuIdArr = val    
            },
        handleChange(value) {
        console.log(value);
      },
       //   打开更新模态框
       handleEdit(index, row) {
        console.log(index, row);
        console.log(row)
          this.getSelectData()
         this.updateBox=true
         this.updateForm.menuId = row.menuId
         this.updateForm.menuName = row.menuName
         this.updateForm.menuPrice = row.menuPrice
         this.updateForm.menuPropertiesCategoryId = row.menuPropertiesCategory.menuPropertiesCategoryId	
         this.updateForm.menuPropertiesStyleId = row.menuPropertiesStyle.menuPropertiesStyleId
         this.updateForm.menuPropertiesTasteId = row.menuPropertiesTaste.menuPropertiesTasteId
         this.updateForm.shopId = row.shop.shopId
         this.updateForm.menuNo = row.menuNo
         this.updateForm.uploadPic=row.menuPicPath
      },
    //   进行更新操作
        updateOk(){
                 let aa = this.$refs.imgFile
                 let reader =new FileReader();  
                  let img2=aa.files[0]; 
                 this.imgUpdate =img2
                 this.aa = aa
                 let img =new FormData()
                  var max_size = 300;
                 if(this.updateForm.menuNo==""){
                 this.$message({
                  message:'菜品编号不能为空',
                  type: 'warning'
                    });     
                    return false
                   }
                 if(this.updateForm.menuName==""){
                     this.$message({
                      message:'菜品名称不能为空',
                      type: 'warning'
                        });     
                        return false
                }
                   if(this.updateForm.menuPropertiesStyleId==""){
                     this.$message({
                      message:'菜品类型不能为空',
                      type: 'warning'
                        });     
                        return false
                }
                if(this.updateForm.menuPropertiesCategoryId==""){
                     this.$message({
                      message:'菜品分类不能为空',
                      type: 'warning'
                        });     
                        return false
                }
              
                 if(this.updateForm.menuPropertiesTasteId==""){
                     this.$message({
                      message:'菜品口味不能为空',
                      type: 'warning'
                        });     
                        return false
                }
                 if(this.updateForm.menuPrice==""){
                     this.$message({
                      message:'价格不能为空',
                      type: 'warning'
                        });     
                        return false
                }
              
                if(this.imgUpdate == undefined){
                this.$message({
                      message:'图片不能为空',
                      type: 'warning'
                        });     
                        return false
                }
                 if(!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(this.aa.value)){
                     this.$message({
                      message:'图片类型必须是.gif,jpeg,jpg,png中的一种',
                      type: 'warning'
                        });     
                        return false
                     
                     }
                if (this.imgUpdate.size > max_size * 1024) {
                      this.$message({
                      message:'图片大小不能超过300k',
                      type: 'warning'
                        });     
                        return false
                 }
               
                  if(this.updateForm.shopId==""){
                     this.$message({
                      message:'商铺编号不能为空',
                      type: 'warning'
                        });     
                        return false
                }
                 img.append('uploadPic',this.imgUpdate)
                 img.append('menuPropertiesCategory.menuPropertiesCategoryId',this.updateForm.menuPropertiesCategoryId)
                 img.append('menuPropertiesStyle.menuPropertiesStyleId',this.updateForm.menuPropertiesStyleId)
                 img.append('menuPropertiesTaste.menuPropertiesTasteId',this.updateForm.menuPropertiesTasteId)
                 img.append('menuPrice',this.updateForm.menuPrice)
                 img.append('menuName',this.updateForm.menuName)
                 img.append('menuId',this.updateForm.menuId)
            this.$http.post('/api/liangsijie/menu/update',img).then((res)=>{
                console.log(res)
                if(res.data.code==0){
                 this.$message({
                      message:'更新成功',
                      type: 'success'
                        });     
                     }else{
                          this.$message({
                      message:res.data.msg,
                      type: 'warning'
                        });     
                     }
                      this.getpage()
                 var self = this
                 setTimeout(function(){ self.updateBox=false},1500)
                    
            },(err)=>{
                console.log(err)
            })
        },
        //单条删除
       handleDelete(index,row) {
                // console.log(row.menuId);
                // console.log(row);
                  this.$confirm('此操作将删除该菜品, 是否继续?', '提示', {
                         confirmButtonText: '确定',
                         cancelButtonText: '取消',
                         type: 'warning'
                        }).then(() => {
                         this.$http.get('/api/liangsijie//menu/delete',{params:{menuId:row.menuId}}).then((res)=>{
                         console.log(res)
                  if(res.data.code==100){ 
                      this.data.splice(index,1)
                      this.$message({
                                        message:'删除成功',
                                        type: 'success'
                                    });     
                     }
                       this.getpage()
                    })   
               
                        }).catch(() => {
                   this.$message({
                     type: 'info',
                     message: '已取消删除'
                   });          
                 });   
        },
        // 批量删除
         handleDeleteAll() {
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                       let arr= [];
                     for(var i in this.menuIdArr){
                         arr[i]=this.menuIdArr[i].menuId
                     }
                     var arr1 =arr.join(",")
                     console.log(arr1)
                      this.$http.get('/api/liangsijie//menu/delete',{params:{menuId:arr1}}).then((res)=>{
                          console.log(res)
                          if(res.data.code==100)
                        { 
                              // this.data.splice(index,1)
                               this.$message({
                                   message:'删除成功',
                                   type: 'success'
                                     });     
                        }
                                 this.getpage()
                        })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                    });   
        },
        // 打开添加界面
        addDish(){
              this.dialogFormVisible=true
             this.getSelectData()

        },
        // 获取下拉数据
        getSelectData(){
             this.$http.get('api/liangsijie/menuPropertiesStyle').then((res)=>{
                    this.menuPropertiesStyle=res.data.info.menuPropertiesCategories
                    console.log(res.data.info.menuPropertiesCategories)
              },(err)=>{
                  console.log(res)
              });
                this.$http.get('api/liangsijie/menuPropertiesTaste').then((res)=>{
                    this.menuPropertiesTaste=res.data.info.menuPropertiesCategories
                    console.log(res.data.info.menuPropertiesCategories)
              },(err)=>{
                  console.log(res)
              });
                this.$http.get('api/liangsijie/menuPropertiesCategory').then((res)=>{
                    this.menuPropertiesCategory=res.data.info.menuPropertiesCategories
                    console.log(res.data.info.menuPropertiesCategories)
              },(err)=>{
                  console.log(res)
              })
        },
        // 添加操作
        addDishMenu(){
                // let aa= this.form.imgFile 
                  let aa = this.$refs.fileImg
                 let img1=aa.files[0]; 
                 this.imgUpdate = img1
                 this.aa = aa
                 let img =new FormData()
                  var max_size = 300;
                 
                 if(this.form.menuName==""){
                     this.$message({
                      message:'菜品名称不能为空',
                      type: 'warning'
                        });     
                        return false
                }
                   if(this.form.menuPropertiesStyleId==""){
                     this.$message({
                      message:'菜品类型不能为空',
                      type: 'warning'
                        });     
                        return false
                }
                if(this.form.menuPropertiesCategoryId==""){
                     this.$message({
                      message:'菜品分类不能为空',
                      type: 'warning'
                        });     
                        return false
                }
              
                 if(this.form.menuPropertiesTasteId==""){
                     this.$message({
                      message:'菜品口味不能为空',
                      type: 'warning'
                        });     
                        return false
                }
                 if(this.form.menuPrice==""){
                     this.$message({
                      message:'价格不能为空',
                      type: 'warning'
                        });     
                        return false
                }
              
                if(img1 == undefined){
                this.$message({
                      message:'图片不能为空',
                      type: 'warning'
                        });     
                        return false
                }
                 if(!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(aa.value)){
                     this.$message({
                      message:'图片类型必须是.gif,jpeg,jpg,png中的一种',
                      type: 'warning'
                        });     
                        return false
                     
                     }
                if (img1.size > max_size * 1024) {
                      this.$message({
                      message:'图片大小不能超过300k',
                      type: 'warning'
                        });     
                        return false
                 }
                 
                console.log(aa.value)
                 img.append('uploadPic',img1)
                 img.append('menuPropertiesCategory.menuPropertiesCategoryId',this.form.menuPropertiesCategoryId)
                 img.append('menuPropertiesStyle.menuPropertiesStyleId',this.form.menuPropertiesStyleId)
                 img.append('menuPropertiesTaste.menuPropertiesTasteId',this.form.menuPropertiesTasteId)             
                 img.append('menuPrice',this.form.menuPrice)
                 img.append('menuName',this.form.menuName)
            this.$http.post('/api/liangsijie/menu/add',img).then((res)=>{
                console.log(res)
                if(res.data.code==0){
                 this.$message({
                      message:'添加成功',
                      type: 'success'
                        });     
                     }
                      this.getpage()
                var self = this
                setTimeout(function(){ 
                     self.form.menuName = ''
                    self.form.menuPrice = ''
                    self.form.menuPropertiesCategoryId = ''
                    self.form.menuPropertiesStyleId = ''
                    self.form.menuPropertiesTasteId = ''
                    self.form.shopId = ''
                    self.form.menuNo = ''
                    self.form.uploadPic=''
                    aa.value=""
                    self.dialogFormVisible=false
                
                },1500)
            },(err)=>{
                console.log(err)
            })
        },
        closeAdd(formName){
         
         this.form.menuName = ''
         this.form.menuPrice = ''
         this.form.menuPropertiesCategoryId = ''
         this.form.menuPropertiesStyleId = ''
         this.form.menuPropertiesTasteId = ''
         this.form.shopId = ''
         this.form.menuNo = ''
         this.form.uploadPic=''
 this.dialogFormVisible = false   
        },
        deleteDishMenu(){       
             this.$http.post('/api/liangsijie/',{
                 params:{
                    
                        }
             }).then((res)=>{
             })
        },
        picFile(){
             var aa = this.$refs.fileImg
             let reader =new FileReader();  
             let img1=aa.files[0]; 
             let form = new FormData();   
             form.append('uploadPic',img1); 
             this.$http.post('/api/liangsijie/menu/add',form,{
                 headers:{'Content-Type':'multipart/form-data'}  
             }).then((res)=>{
                 console.log(res)  
             })
        },
        openFile(){
            this.$refs.imgFile.click();
        },
        changeImg(){
            console.log(this.$refs.imgFile.files[0])
            var img=new Image() ;
           var  url=window.URL.createObjectURL(this.$refs.imgFile.files[0]) // 得到bolb对象路径，可当成普通的文件路径一样使用，赋值给src;
            this.updateForm.uploadPic=url;
             
        }
      }, 
      
      mounted(){
        //   this.getData()
          this.getpage()
         
      },

   
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/rightMain.scss';
.head-img{
    text-align: center;
}

#imgUpload{
    display: none;
}
</style>

