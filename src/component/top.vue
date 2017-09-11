<template>
  <div id="top">
    <!--排行榜频道导航-->
    <ul class="nav nav-tabs" >
      <li v-on:click="switchTotopIndex" :class="{active:topIndexActive}">
        <a href="#">排行榜首页</a>
      </li>
      <li v-for="(item,index) in channelList" v-on:click="switchToChannel(index)" :class="{active:channelListActive[index]}">
        <a href="#">{{item}}</a>
      </li>
      <li >
        <a href="#">纪录片</a>
      </li>
      <li >
        <a href="#">音乐</a>
      </li>
      <li >
        <a href="#">动漫</a>
      </li>
      <li >
        <a href="#">娱乐</a>
      </li>
    </ul>
    <!-- 主体区 -->
    <div v-show="topIndexActive" class="row top-primary">
      <!-- 综艺 -->
      <div class="top-detail col-md-6 col-sm-6 col-xs-12">
        <h3 class="top-title">综艺</h3>
        <ol class="rounded-list">
          <li class="top-detail-item" v-for="video in allTopChannel[4].video_list">
            <a class="video-name">{{video.short_title}}</a>
          </li>
        </ol>
      </div>
      <!-- 资讯 -->
      <div class="top-detail col-md-6 col-sm-6 col-xs-12">
        <h3 class="top-title">资讯</h3>
        <ol class="rounded-list">
          <li class="top-detail-item" v-for="video in allTopChannel[1].video_list">
            <a class="video-name">{{video.short_title}}</a>
          </li>
        </ol>
      </div>
      <!-- 电视剧 -->
      <div class="top-detail col-md-6 col-sm-6 col-xs-12">
        <h3 class="top-title">资讯</h3>
        <ol class="rounded-list">
          <li class="top-detail-item" v-for="video in allTopChannel[2].video_list">
            <a class="video-name">{{video.short_title}}</a>
          </li>
        </ol>
      </div>
      <!-- 电影 -->
      <div class="top-detail col-md-6 col-sm-6 col-xs-12">
        <h3 class="top-title">资讯</h3>
        <ol class="rounded-list">
          <li class="top-detail-item" v-for="video in allTopChannel[3].video_list">
            <a class="video-name">{{video.short_title}}</a>
          </li>
        </ol>
      </div>
    </div>

    <!-- 分频道区 -->
    <div v-show="!topIndexActive" class="top-partition">
      <div class="top-channel-detail">
        <ol>
          <li class="row top-channel-item" v-for="video in currentTopChannel">
            <a class="video-image col-md-2 col-sm-3 col-xs-4"><img v-bind:src="video.img" alt="无法加载"></a>
            <a class="h1 col-md-4 col-sm-4 col-xs-8">{{video.short_title}}</a>
            <span class="item-info col-md-3 col-sm-7 col-xs-4">
              <p class="info-others" v-if="video.sns_score">评分:{{video.sns_score}}</p>
              <p class="info-others">更新日期:{{video.date_format}}</p>
            </span>
            <span class="item-info col-md-1 col-sm-1 col-xs-1"><img src="../assets/arrow-up.png"></span>
          </li>
        </ol>
      </div>
    </div>

  </div>
</template>
 
<script>
export default {
  data() {
    return {
      channelList:['资讯','电视剧','电影','综艺'],
      topIndexActive:true,
      channelListActive: [0,0,0,0],
      allTopChannel: [],
      currentTopChannel: [],
    }
  },
  methods: {
    switchToChannel:function(index){
      this.channelListActive=[0,0,0,0];
      this.channelListActive[index]=1;
      this.topIndexActive=false;
      this.currentTopChannel=this.allTopChannel[index+1].video_list;
      for(let i=0;i<this.currentTopChannel.length;i++){
           this.currentTopChannel[i].img=this.currentTopChannel[i].img.slice(0,-4)+'_120_160.jpg?sign=iqiyi';
      }
    },
    switchTotopIndex:function(index){
      this.channelListActive=[0,0,0,0];
      this.topIndexActive=true;
    },
  },
  mounted:function(){
    var that=this;
    var url='http://iface.qiyi.com/openapi/realtime/recommend?app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1';
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success:function(data){
        that.allTopChannel=data.data;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("error*****"+textStatus);
      }
    });
  },
}
</script>
 
<style>
/*频道列表*/
.nav-tabs>li>a{
    color: #000;
}
.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
   background-color: #77a610;
    color: #fff;
}
/*总体排行榜*/
.top-primary{
    padding:0 5%;
}
.top-detail{
    text-align: center;
    margin-bottom: 10px;
    padding:0 5%;
}
.top-title{
    line-height: 55px;
    height: 55px;
    color: #666;
}
.top-detail ol{
    counter-reset: li; /* 创建一个计数器 */
    list-style: none; /* 清除列表默认的编码*/
    *list-style: decimal; /* 让IE6/7具有默认的编码 */
    font: 15px 'trebuchet MS', 'lucida sans';
    text-shadow: 0 1px 0 rgba(255,255,255,.5);
    padding:0;
}
.rounded-list a {
    position: relative;
    display: block;
    padding: 0.4em 0.4em 0.4em 2em;
    *padding: 0.4em;/*for ie6/7*/
    margin: 0.5em 0;
    color: #444;
    text-decoration: none;
    border-radius: 0.3em;/*制作圆角*/
}
.rounded-list a:hover {
        background: #eee;
}
.rounded-list a::before {
    content: counter(li);
    counter-increment: li;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -1em;
    background-color: #77a610;
    color:#fff;
    height: 2em;
    width: 2em;
    line-height: 1.4em;
    border: 0.3em solid #fff;
    text-align: center;
    font-weight: bold;
    border-radius: 2em;
}
.top-detail-item{
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    color: #222;
    border-bottom: 1px solid #f2f2f2;
}
.top-detail-item a:hover{
    color:#77a610;
}
.video-name {
    color: #222;
    white-space: nowrap;
    word-break: keep-all;
    text-overflow: ellipsis;
    overflow: hidden;
}
/*频道分区排行*/
.top-partition{
    width:100%;
    padding-left:15%;
}
.h1{
    color: #f15a24;
    font-size: 1em;
    font-style: normal;
    font-weight: 500;
    white-space: pre-wrap;
    text-align: center;
}
a.h1:hover{
    color:#77a610;
}
.item-info{
    display:inline-block;
    margin-top:2%;
}
@media screen and (max-width: 1024px) {
    .mainbody {
        margin: 0px;
    }
    #logo{
        padding-left: 5px;
    }
    #topsearchinputdiv{
        width: 72%;
    }
}
@media screen and (max-width: 425px){
  .top-channel-item {
    border-bottom: 1px dashed #888;
  }
}
  

@media screen and (max-width: 767px) {
    .video-image img {
        width: 90px;
        height:100px;
    }
    .h1{
        text-align: left;
        margin-top:0px;
    }
    .top-partition{
        padding-left:0px;
    }
    #topnav{
        position: relative;
    }
    #topinfo{
        position: absolute;
        top: 5px;
        left: 0px;
        padding: 0px;
    }
}
@media screen and (max-width: 768px) {
    .top-navbar {
        margin-left: 15%;
    }
}
</style>