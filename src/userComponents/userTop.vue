<template>
   
    <div class="top">
        <div class="left">
             <a href="#" class="logo" @click="toIndex()"></a>
             <div class="title">
                 <a href="#">北明食堂服务系统</a>
             </div>
        </div>
        <div class="right">
            <div class="name"><p style="font-size:18px;text-align:center;">{{userName}}</p></div>
            <div class="pic">
                <a href="#"><el-upload
                             class="avatar-uploader"
                            action="/api/yangguoli/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                             </el-upload>
                </a>
                </div>
            <div class="close">
                <a href="#" @click="loginOut()"></a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            imageUrl: require('../assets/images/01.jpg'),
            userName:'',
        }      
    },
     methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getSession(){
        this.userInfo =window.sessionStorage.userInfo
        this.userName = JSON.parse(this.userInfo).emp.empName


        this.$store.state.userLogin.userName = this.userName

        //  console.log( 'yop'+this.userInfo)
        //  console.log(this.userName)
        },
        toIndex(){
            this.$router.push({name:'userRightMain'})
        },
        loginOut(){
            this.$http.post('/api1/1024/cq1024/user/user/loginout').then((res)=>{
                    console.log(res)
                     sessionStorage.setItem('userInfo','');
                    this.$router.push('/userLogin')

            })
           
        }

    },
    mounted(){
         this.getSession()
    
    }
    

}
</script>

<style lang='scss' scoped>
   @import '../assets/sass/top.scss';
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
     border-radius: 50%;
  }
  .avatar {
    width: 40px;
    height: 40px;
    display: block;
     border-radius: 50%;
  }
   

</style>




