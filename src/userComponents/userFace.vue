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
                      <video src="" id="video" ref="video" width="320" height="320" class="video"
                      ></video>
                      <canvas width="100" height="100" id="outrec" ref="outrec" class="video1" style="display:none"></canvas>
            <div class="btn-box" v-show="btnShow">
                          <el-button type="primary" class="btn" @click="paizhao()">重新识别</el-button>
                      <el-button type="primary" class="btn" @click="close1()">关闭</el-button>
            </div>
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
        console.log(err.name);
    });
     setTimeout(this.paizhao, 5000)
    // console.log(this.$store.state.test)
    },

    // 拍照
     paizhao() {
        this.btnShow=true
      //视频转换到canvs
      var outrec = this.$refs.outrec;
      var outreccon = outrec.getContext("2d");
      var video = this.$refs.video;
      outreccon.drawImage(video, 0, 0, 100, 100);
      var img = outrec.toDataURL("image/png");
      // var imgvideo =this.refs.imgvideo;
      // imgvideo.attr('src', img);
      this.img1 = outrec.toDataURL("image/png")
      this.$store.state.base64=this.img1
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
         this.$http.post('/api1/1024/cq1024/order/checkface',param).then(res=>{
             console.log(res)
             if(res.data.code == 100){
                 this.$message({
                     type:'success',
                     message:'识别成功'
                 })
                 this.account()
             }else{
                //  this.btnShow=true
                  this.$message({
                     type:'warning',
                     message:res.data.msg
                 })
                    this.btnShow=true


             }  
         },err=>{
             this.btnShow=true
                  this.$message({
                     type:'warning',
                     message:'系统异常'
                 })
                 this.btnShow=true
                 
         })
    },
     account(){
           let param = new URLSearchParams
           param.append('orderMenus',JSON.stringify(this.$store.state.accountInfo))
           this.$http.post('/api1/1024/cq1024/order/add',param).then(res=>{
               console.log(res)
            if(res.data.code == 100){
               this.$message({
                 type:'success',
                 message:'下单成功'
               })
              let _this =this
              setTimeout(_this.close1,1500);
              }else{
                 this.$message({
                     type:'info',
                     message:res.data.msg
                   })
                this.btnShow=true
              }
        })
            },
 },
    watch:{
        img1(){
           this.check()
        }
    },
      mounted(){
        this.openPhoto()
       
        console.log( JSON.stringify(this.$store.state.accountInfo))
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
    .btn-box{
        display: flex;
        flex-direction: row;
        justify-content: center;
    .btn{
        height: 50px;
        display: flex;
        margin-left: 50px;
    }
    }
   
}
</style>

