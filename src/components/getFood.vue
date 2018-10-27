<template>
    <div class="rightMain" ref="rightMain">
        <div class="w">
           <h2 class="dishes-font">商品结算</h2>
            <div class="showName">
                   <p>Hi,UserName</p>
                     <p>这里是支付界面</p>
            </div>
            <div class="table">
                     <p>请注视摄像头</p>
                 
            </div>
            <div class="tableData">       
                     <div class="box">
                      <video src="" id="video" ref="video" width="320" height="320" class="video"></video>
                      <canvas width="100" height="100" id="outrec" ref="outrec" class="video1" style="display:none"></canvas>
                      <el-button type="primary" class="btn" @click="paizhao()">{{text}}</el-button>
                      <!-- <el-button type="primary" class="btn" @click="close1()" v-show="btnShow">关闭</el-button> -->

                     </div>   
                 </div>
        </div>
    </div>
</template>

<script>
import mockdata from "../Mock/mock";
var mediaStreamTrack;
    export default {
      data() {
        return {
             img1:'',
             text:'开始识别',
             btnShow:false,
        }
      },
      methods:{
  
  openPhoto() {
    var video = this.$refs.video;
    var Devicestate = navigator.mediaDevices.getUserMedia({
        video: true
    })
    Devicestate.then(function (mediaStream) {
        video.src = window.URL.createObjectURL(mediaStream);
        //console.log(mediaStream.id)
        mediaStreamTrack =  mediaStream.getTracks()[0];
        video.onloadedmetadata = function (e) {
            video.play();
        };
    });
    //用户拒绝使用,或者没有摄像头
    Devicestate.catch(function (err) {
        alert('无法识别摄像头，请重新识别')
        // console.log(err.name);
        setTimeout(this.close1,1500);
        
    });
    // setTimeout(this.paizhao, 5000)
    // console.log(this.$store.state.test)
    },

    // 拍照
     paizhao() {
        // this.btnShow=true
      //视频转换到canvs
      var outrec = this.$refs.outrec;
      var outreccon = outrec.getContext("2d");
      var video = this.$refs.video;
      outreccon.drawImage(video, 0, 0, 100, 100);
      var img = outrec.toDataURL("image/png");
      // var imgvideo =this.refs.imgvideo;
      // imgvideo.attr('src', img);
      this.img1 = outrec.toDataURL("image/png")
    //   this.$store.state.base64=this.img1
    //    console.log(this.img1)
    },
    // 关闭
      close1() {
      mediaStreamTrack && mediaStreamTrack.stop();
       this.$router.go(-1)
    //   this.$store.state.photoBox=true
    },   
    // 识别
    check(){
         let param = new URLSearchParams
         param.append('snapData',this.img1)
         param.append('orderNo',this.$route.params.id)
         this.$http.post('/api1/1024/cq1024/order/checkface',param).then(res=>{
             console.log(res)
             if(res.data.code == 100){
                 this.$message({
                     type:'success',
                     message:'识别成功'
                 })
                 this.paySuccess()
             }else{
                  this.$message({
                     type:'warning',
                     message:res.data.msg
                 })
                 this.text = '重新识别'
             }  
         },err=>{
             this.btnShow=true
                  this.$message({
                     type:'warning',
                     message:'系统异常'
                 })
                //  this.btnShow=true        
         })
    },
    paySuccess(){
         this.$http.get('/api1/1024/cq1024/order/update/4/'+this.$route.params.id,{
                  params:{
                      snapData:''
                  }
              }).then(res=>{
                  if(res.data.code == 100){
                      this.$message({
                          type:'success',
                          message:'取餐成功'
                      })
                      this.$router.go(-1)
                  }else{
                       this.$message({
                          type:'info',
                          message:res.data.msg
                      })
                  }
              },err=>{
                  console.log(err)
              })
    }
 },
    watch:{
        img1(){
           this.check()
        }
    },
      mounted(){
         this.openPhoto()
       
         console.log(this.$route.params.id)
      }
    }
  </script>
<style lang="scss" scoped>
@import '../assets/sass/rightMain.scss';
.box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .vedio{
        display: flex;
    }
    .btn{
        height: 50px;
        display: flex;
        margin-left: 50px;
    }
}
</style>

