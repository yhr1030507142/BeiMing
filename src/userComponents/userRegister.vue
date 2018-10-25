<template>
        <div class="register">
             <div class="w">
                    <div class="title">
                        <div class="registerLogo"></div>
                        <p class="word">欢迎来到北明食堂</p>
                    </div>
                <el-form :model="ruleForm2" ref="ruleForm2" status-icon :rules="rules2"  label-width="100px" class="form">
                   <el-form-item label="员工号:" prop="userNo">
                    <el-input type="text" v-model="ruleForm2.userNo" autocomplete="off" style="width:250px;"></el-input>
                  </el-form-item>
                  <el-form-item label="密码:" prop="userPass">
                    <el-input type="password" v-model="ruleForm2.userPass" autocomplete="off" style="width:250px;"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码:" prop="userPass2">
                    <el-input type="password" v-model="ruleForm2.userPass2" autocomplete="off" style="width:250px;"></el-input>
                  </el-form-item>
                  <el-form-item label="上传身份证:">
                   <img-inputer v-model="ruleForm2.imgFile" theme="light" size="5px" :on-change="chooseImg" type="file" accept="image/png,image/gif,image/jpeg"/>  
                  </el-form-item>
                    <el-form-item label="人脸识别:">
                            <a @click="shibie()" >开始识别</a><p>{{text}}</p>
                  </el-form-item>
                  <!-- <input type="file" @change='tijiao()' ref="fileImg"> -->
                   <!-- <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/> -->
                </el-form>
                <!-- <div class="photo" v-show="$store.state.face"></div> -->
                 <div class="div1"><button class="button1" @click="register()">注册</button></div>
                  <div class="div1"><p>已有账号？请登录</p></div>
                  <!-- <button @click="resetForm('ruleForm2')">resetForm</button> -->
                </div>
                  <!-- <router-view></router-view> -->
                  <el-dialog  :visible.sync="dialogFormVisible1" width="550px" :modal="false">
                        <photo></photo>
                  </el-dialog>
               </div>  

                 
</template>
<script>

</script>

<script>

 
 
import photo from './photo'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.userPass !== '') {
            this.$refs.ruleForm2.validateField('userPass2');
          }
          callback();
        }
       };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.userPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        dialogFormVisible1:false,
        photoBase:'',
        text:'',
        ruleForm2: {
          userNo: '',
          userPass: '',
          userPass2: '', 
          imgFile:'',
          base:'',
        },
         ruleForm: {
          userNo:'',
          region:'',
          date1:'',
          date2:'',
          delivery: false,
          type: [],
          resource:'',
          desc: ''
        },
        rules2: {
          userNo: [
           { required: true, message: '请输入员工号', trigger: 'blur' },
           { min: 6, max: 20, message: '长度至少6位', trigger: 'blur' }
          ],
          userPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userPass2: [
            { validator: validatePass2, trigger: 'blur' },
          ],
          file: [
            { required: true, message: '请选择身份证', trigger: 'change' }
          ],
        },
        
      };
      
    },
    methods: {
      tijiao(event){
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
      chooseImg:function() {      
            console.log(1)
            //上传照片时将图片转为base64
	          let file = this.ruleForm2.imgFile 
	          let reader = new FileReader()
              let img = new Image()

            // img.append('avatar', this.$refs.avatarInput.files[0])
	          // 读取图片
	          reader.readAsDataURL(file)
	          // 读取完毕后的操作
	          reader.onloadend = (e) => {
	            img.src = e.target.result
	            // 这里的e.target就是reader
	            // console.log(reader.result)
	            // reader.result就是图片的base64字符串
              this.ruleForm2.base = reader.result
              // console.log(reader.result) 
             
	          }
	        },
      update(e){
          let file = e.target.files[0];           
          let form = new FormData(); //创建form对象
           form.append('uploadPic',file);//通过append向form对象添加数据
          // param.append('chunk','0');//添加form表单中其他数据
          console.log(form.get('uploadPic')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };  //添加请求头
          this.$http.post('/api/liangsijie/menu/add', form,{
            headers:{'Content-Type':'multipart/form-data'}  
        })
          .then(response=>{
            console.log(response.data);
          })        
},
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
       handleExceed(files, fileList) {//图片上传超过数量限制
        this.$message.error('上传图片只允许一张');
        console.log(file, fileList);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      clearValidate(formName) {
        this.$refs[formName].clearValidate();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      face1(){
         this.$store.state.face=true    
      },
      shibie1(){
        const {href} =this.$router.resolve({
          name:'photo'
        })
        var top=50;
        var left=300;
        window.open(href,'_blank','toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no,width=680,height=550,top='+top+',left='+left);
      },
      shibie(){
          this.dialogFormVisible1=true
          this.$store.state.photoBox=false
      },
      registerCheck(){   
    
        
          // console.log("this.photoBase"+this.photoBase)
          // console.log("this.ruleForm2.bases"+this.ruleForm2.base)

        let param = new URLSearchParams()
        param.append('empNo', this.ruleForm2.userNo)
        param.append('snapData', this.photoBase) 
        param.append('base64Data', this.ruleForm2.base) 
         this.$http.post('/api/shexiangtou/user/registervalidate',param).then((res)=>{
            console.log(res.data.code)
            if(res.data.code==100){
              console.log(100)
                this.text="识别成功"
            }else{
               this.text="识别失败，请重新识别"
                 this.$message({
                      message: res.data.msg,
                      type: 'warning'
                     });     
            }
            
        },(err)=>{
            console.log(err)
            this.$message({
                      message: err.data.msg,
                      type: 'warning'
                     });     
        })

        
      
      },
      register(){
          if(this.ruleForm2.userNo==''||this.ruleForm2.userNo.length<6){
        this.$message({
                  message: '员工号格式不正确',
                  type: 'warning'
                 });
                 return false
        }
         if(this.ruleForm2.userPass==''||this.ruleForm2.userPass==null){
            this.$message({
                      message: '密码不能为空',
                      type: 'warning'
                     });
                        return false
        }
         if(this.ruleForm2.userPass2==''||this.ruleForm2.userPass2!=this.ruleForm2.userPass){
            this.$message({
                      message: '两次密码输入不一致',
                      type: 'warning'
                     });
                        return false
        }
        if(this.ruleForm2.base==''){
           this.$message({
                      message: '身份证上传不能为空',
                      type: 'warning'
                     });
                        return false
        }
        if(this.photoBase==''){
          this.$message({
                      message: '人脸识别不能为空',
                      type: 'warning'
                     });
                        return false
        }
        if( this.text!="识别成功"){
            this.$message({
                      message: '人脸识别失败',
                      type: 'warning'
                     });
                        return false
        }
        else{
           console.log(1)
         let param = new URLSearchParams()
        param.append('empNo', this.ruleForm2.userNo)
        param.append('userPwd', this.ruleForm2.userPass) 
        this.$http.post('/api/shexiangtou/user/register',param).then((res)=>{
          if(res.data.code==100){
             this.$message({
                      message: res.data.msg,
                      type: 'success'
                     });
                   setTimeout(() => {
                    
              this.$store.state.face=false
                    

                   }, 3000);
          }else{
             this.$message({
                      message: res.data.msg,
                      type: 'warning'
                     });
             setTimeout(() => {
                //  location.reload();
                //  this.ruleForm2.userNo='',
                //       this.ruleForm2.userPass='',
                    // this.photoBase='',
                    //  this.ruleForm2.base=''
            
              this.$store.state.face=false
                     
                   }, 3000);
          }       
        },(err)=>{
          this.text='系统异常'
           this.$message({
                      message: res.data.msg,
                      type: 'warning'
                     });
        })
      }
        },
      clearValidate(formName) {
      this.$refs[formName].clearValidate();
      },

    },
    components:{
      photo
    },
    computed:{
      baseChange(){
        return this.$store.state.base64
      },
      test(){
         return this.$store.state.test
      },
       photoBox(){
         return this.$store.state.photoBox
      },
      face(){
         return this.$store.state.face

      }
     
    },
    watch:{
      baseChange(val){
         this.photoBase = this.$store.state.base64
        console.log("监听到摄像头图片传值")
        this.registerCheck()
      },
      test(val){
        console.log(val)
      },
      photoBox(val){
        console.log('关闭摄像头')
        if(this.$store.state.photoBox == true){
          this.dialogFormVisible1=false
        }
      },
      face(){
          this.$refs['ruleForm2'].resetFields();
          this.ruleForm2.imgFile=''
          this.photoBase=''
      }
  
    },
  }
</script>

<style lang="scss">
@import '../assets/userSass/userRegister.scss';
.photo{
  width: 100%;
  height: 100%;
  position: absolute;
  border:  1px solid black;
  left: 0;
  top: 0;
}

  .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    line-height: 100px;
    vertical-align: top;
}
.el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    margin: 0 8px 8px 0;
    display: inline-block;
}
</style>


