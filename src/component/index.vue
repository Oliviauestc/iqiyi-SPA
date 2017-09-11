<template>
  <div id="index">
    <!--轮播图-->
    <div class="carousel-wrap" id="carousel">
      <transition-group tag="ul" class='slide-ul' name="list">
        <li v-for="(list,index) in slideList" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go">
          <a :href="list.clickUrl" rel="external nofollow" >
            <img :src="list.image" :alt="list.desc" >
          </a>
        </li>
      </transition-group>
      <div class="carousel-items">
        <span v-for="(item,index) in slideList.length" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
      </div>
    </div>
    <!--频道导航-->
    <ul class="nav nav-tabs" >
      <li v-for="(item,index) in channelList" v-on:click="switchToChannel(index)" :class="{active:channelListActive[index]}">
        <a href="#">{{item.name}}</a>
      </li>
    </ul>
    <!--频道详情-->
    <div id="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 col-sm-4 col-xs-6 onefilm" v-for="(item,index) in currentChannelDetail">
          <div class="imgdiv">
            <img v-bind:src="item.img">
            <div class="item-info">
              <span class="playcount" ><i class="fa fa-play-circle" aria-hidden="true"></i>&nbsp;{{item.play_count_text}}</span>
              <span class="score">评分:{{item.sns_score}}</span>
            </div>
          </div>
          
          <p v-text="item.short_title" class="filmMainTitle"></p>  
        </div>              
      </div>
    </div>
    </div>
  
  </div>
</template>
 
<script>
//图片和轮播图高度设置
$(document).ready(function() {
  $(".imgdiv").height($(".imgdiv").width()*124/220);
  $(".imgdiv").height($(".imgdiv").width()*124/220);
  $(".carousel-wrap").height($(".carousel-wrap").width()*410/1500);
  $(".carousel-wrap li").height($(".carousel-wrap li").width()*410/1500);
  if($(".carousel-wrap li").width() < 426){
    $(".carousel-wrap").height($(".carousel-wrap").width()*410/1048);
    $(".carousel-wrap li").height($(".carousel-wrap li").width()*410/1048);
  } 
});
$(window).resize(function() {
    $(".imgdiv").height($(".imgdiv").width()*124/220);
    $(".carousel-wrap").height($(".carousel-wrap").width()*410/1500);
    $(".carousel-wrap li").height($(".carousel-wrap li").width()*410/1500);
    if($(".carousel-wrap li").width() < 426){
      $(".carousel-wrap").height($(".carousel-wrap").width()*410/1048);
      $(".carousel-wrap li").height($(".carousel-wrap li").width()*410/1048);
    }
  });

export default {
  data() {
    return {
      channelList: [],
      channelListActive: [1,0,0,0,0,0,0],
      currentChannelDetail:[],    //当前显示的频道详情
      slideList: 
      [ {
          "clickUrl": "#",
          "desc": "nhwc",
          "image": "../src/assets/rotation1.jpg"
        },
        {
          "clickUrl": "#",
          "desc": "rsdh",
          "image": "../src/assets/rotation2.jpg"
        },
        {
          "clickUrl": "#",
          "desc": "rsdh",
          "image": "../src/assets/rotation3.jpg"
        },
        {
          "clickUrl": "#",
          "desc": "rsdh",
          "image": "../src/assets/rotation4.jpg"
        },
        {
          "clickUrl": "#",
          "desc": "rsdh",
          "image": "../src/assets/rotation5.jpg"
        },
      ],
      currentIndex: 0,
      timer: ''
    }
  },
  methods: {
    go() {
      this.timer = setInterval(() => {
        this.autoPlay();
      },4000)
    },
    stop() {
      clearInterval(this.timer)
        this.timer = null;
    },
    change(index) {
      this.currentIndex = index;
    },
    autoPlay() {
      this.currentIndex++;
      if (this.currentIndex > this.slideList.length - 1) {
        this.currentIndex = 0;
      }
    },
    switchToChannel:function(index){
      this.channelListActive=[0,0,0,0,0,0,0];
      this.channelListActive[index]=1;
      var channel_name=this.channelList[index].name;  //当前要显示的频道名字
      console.log("******"+channel_name);
      var that=this;
      var channelDetailUrl='http://iface.qiyi.com/openapi/batch/channel?type=detail&mode=11&is_purchase=2&page_size=30&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1&channel_name='+channel_name;
      $.ajax({
        url: channelDetailUrl,
        type: "GET",
        dataType: "json",
        success:function(data){
          that.currentChannelDetail=data.data.video_list;
          for(let i=0;i<that.currentChannelDetail.length;i++){
            that.currentChannelDetail[i].img=that.currentChannelDetail[i].img.slice(0,-4)+'_220_124.jpg?sign=iqiyi';
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("error*****"+textStatus);
        }
      });
    }
  },
  mounted:function(){
    var that=this;
    var channelListUrl='http://iface.qiyi.com/openapi/batch/channel?type=list&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1';
    var channelDetailUrl='http://iface.qiyi.com/openapi/batch/channel?type=detail&channel_name=%E7%94%B5%E5%BD%B1&mode=11&is_purchase=2&page_size=30&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1';      //实例挂载时首先显示的是第一屏，即电影的详细列表
      $.ajax({
        url: channelDetailUrl,
        type: "GET",
        dataType: "json",
        success:function(data){
          that.currentChannelDetail=data.data.video_list;
          for(let i=0;i<that.currentChannelDetail.length;i++){
            that.currentChannelDetail[i].img=that.currentChannelDetail[i].img.slice(0,-4)+'_220_124.jpg?sign=iqiyi';
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("error*****"+textStatus);
        }
      });
    $.ajax({
      url: channelListUrl,
      type: "GET",
      dataType: "json",
      success:function(data){
        that.channelList=data.data.slice(0,7);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("error*****"+textStatus);
      }
    });
  },
  updated:function(){
    // this.imgUrl();
  }
}
</script>
 
<style>
/*轮播图*/
.carousel-wrap {
  position: relative;
  height: 410px;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
}
 
.slide-ul {
 width: 100%;
 height: 100%;
 padding:0px;
}
.slide-ul li {
  list-style-type:none;
  position: absolute;
  width: 100%;
  height: 100%;
}
.slide-ul img {
   width: 100%;
   height: 100%;
  }
 
.carousel-items {
 position: absolute;
 z-index: 10;
 top: 380px;
 width: 100%;
 margin: 0 auto;
 text-align: center;
 font-size: 0;
}
.carousel-items span {
  display: inline-block;
  height: 6px;
  width: 30px;
  margin: 0 3px;
  background-color: #b2b2b2;
  cursor: pointer;
 }
 .carousel-items.active {
  background-color: #666;
 }
.list-enter-active {
 transition: all 0s ease;
 transform: translateX(0)
}
 
.list-leave-active {
 transition: all 0s ease;
 transform: translateX(-100%)
}
 
.list-enter {
 transform: translateX(100%)
}
 
.list-leave {
 transform: translateX(0)
}
/*频道列表*/
.nav-tabs>li>a{
    color: #000;
}
.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
   background-color: #77a610;
    color: #fff;
}
/*频道详情*/
#content {
    padding-top: 20px;
}
#content .container-fluid{
    padding-left: 0px;
    padding-right: 0px;
}
#content .row{
    height: 200px;
}
#content .onefilm{
  position:relative;
}
.imgdiv{
  position:relative;
    width: 100%;
    height: 124px;
}
.imgdiv img{
    width: 100%;
    height: 100%;
    background: #f2f2f2;
}
.imgdiv  .item-info {
  position: absolute;
  width: 100%;
  bottom: 3px;
}
.score{
    float: right;
}
.playcount{
    float: left;
}
.onefilm .item-info span {
    display: inline-block;
    padding: 0px 3px;
    border-radius: 3px;
    color: #E8E8E8;
    font-size: 12px;
    background-color: rgba(0,0,0,0.7);
}
#content .onefilm .filmMainTitle{
  background-color: #E8E8E8;
  padding:10px 5px;
  width: 100%;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
/*媒体查询*/
@media screen and (max-width: 767px) {
    .rotation {
        margin-top: 32px;
    }
}
@media screen and (max-width: 426px) {
    .rotation,.swiper-slide{
        height: 150px;
    }
}

</style>