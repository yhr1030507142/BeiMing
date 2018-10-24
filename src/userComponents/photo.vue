<template>
    <div class="w1">     
                    <div class="title">{{please}}</div>
                   <video src="" id="video" ref="video" width="400" height="500" class="video"></video>
                    <canvas width="100" height="100" id="outrec" ref="outrec" class="video1"></canvas>
                    <!-- <button @click="close1">guabi</button> -->
                    <!-- <button @click="paizhao">daikai</button> -->
    </div>       
</template>
<script>
 var mediaStreamTrack;
// import '../assets/js/register.js'
// import {} from '../assets/js/register.js'

export default {
    data(){
     var mediaStreamTrack = null;
      return{
          img1:'',
          media:'',
          mediaStreamTrack:'',
          please:'请注视摄像头'
      }
    
    },
    methods:{
      close1() {
    
      mediaStreamTrack && mediaStreamTrack.stop();
      this.$store.state.photoBox=true
    },   
    paizhaoTest(){
   
    //  console.log(this.$store.state.base64)
      this.$store.state.test="changeTest"
    },
    paizhao() {
    var video = this.$refs.video;
    var Devicestate = navigator.mediaDevices.getUserMedia({
        video: true
    })
    Devicestate.then(function (mediaStream) {
        video.src = window.URL.createObjectURL(mediaStream);
        console.log(mediaStream.id)
        // photoVideo = mediaStream
        mediaStreamTrack =  mediaStream.getTracks()[0];
        
        video.onloadedmetadata = function (e) {
            video.play();
        };
    });
    //用户拒绝使用,或者没有摄像头
    Devicestate.catch(function (err) {
        alert('没摄像头')
        console.log(err.name);
    });
  
    // console.log(this.$store.state.test)
   
     setTimeout(this.paizhao1, 5000)
},
   paizhao1() {

      //视频转换到canvs

      var outrec = this.$refs.outrec;
      // var outrec = document.getElementById("outrec");
      var outreccon = outrec.getContext("2d");
      var video = this.$refs.video;
      outreccon.drawImage(video, 0, 0, 100, 100);
      var img = outrec.toDataURL("image/png");
      // var imgvideo =this.refs.imgvideo;
      // imgvideo.attr('src', img);
      this.img1 = outrec.toDataURL("image/png")
      console.log(this.img1)
       this.$store.state.base64=this.img1
  },
    
},
mounted(){
    // this.paizhaoTest()
      this.paizhao()  
},
computed:{
         photoBox(){
         return this.$store.state.photoBox
        }
},
watch:{
     img1(){
    //     let param = new URLSearchParams()
    //     param.append('snapData', 
    //     ''
    //     ) 
    //     this.$http.post('/api/yangguoli/emp/upload',
    //     param
    // ).then((res)=>{
    // console.log(res)
    // console.log(this.img1)
    // })
    
         setTimeout(this.close1,1500);
     },
    photoBox(val){
            if(this.$store.state.photoBox == false){
                    this.paizhao()
            }
            
         
        
    }
   
}
}
</script>
<style lang="scss">
body,html{
   width: 100%;
    height: 100%;
}
 .w1{
     margin: 0 auto;
     width: 400px;
     height: 400px;
     position: relative;
      .title{
            // margin: 0 auto;
            height: 100px;
            width: 90%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid #e8e2e1;
            .registerLogo{
                width: 120px;
                height: 40px;
                background: url('../assets/images/logo.png')no-repeat center center;
                display: flex;
                background-size: cover;
               
            }
            .word{
                display: flex;
                font-size: 30px;
                color: #ff7d63;
                line-height: 60px;
            }
  }
  .video{
      position: absolute;
      top: 10px;
      left: 50%;
      margin-left: -200px;
  }
   .video1{
      position: absolute;
      top: 170px;
      left: 50%;
      margin-left: -200px;
  }
  
 }
</style>


