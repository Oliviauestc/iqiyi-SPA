<template>
  <div id="so">
    <!--搜索栏-->
    <div id="search-bar" class="clearfix">
      <form v-on:submit="submitSearchKey">
        <div class="search" id="searchinput">
          <input id="searchKey" type="text" >
        </div>
        <div class="search" id="search-submit" >
          <input type="submit" class="search_btn" value="搜全网">
        </div> 
      </form>
    </div>
    <!--搜索内容显示-->
    <div class="recommend-container" >
      <div class="result-info" v-if="!key" >
        <p class="result-number">推荐视频</p>
      </div>
      <div class="result-info" v-if="key" >
        <p class="result-number">搜索" <em class="keyword">{{key}}</em>  ",共找到 <em class="keyword">{{searchResults.length}}</em> 个相关视频</p>
        <button type="button" class="btn btn-default btn-sm glyphicon glyphicon-stats order" aria-hidden="true" v-on:click="sortByCount">
          <a>&thinsp;播放量从高到低</a>
        </button>
      </div>
      <div class="recommend-item row" v-for="video in searchResults">
        <a  class="video-image col-md-3 col-sm-3 col-xs-4"><img v-bind:src="video.img"></a>
        <a  class="h1 col-md-6 col-sm-6 col-xs-6">{{video.short_title}}</a>
        <span class="recommend-item-info col-md-3 col-sm-3 col-xs-5 h1">
          <p class="video-info">播放量：{{video.play_count_text}}</p>
          <p class="video-info" v-if="video.sns_score">评分：{{video.sns_score}}</p>
          <p class="video-info">日期：{{video.date_format}}</p>
        </span>
      </div>
    </div>
  </div>
</template>
 
<script type="text/javascript">
export default {
  data () {
    return {
      key:'',
      searchResultsNoOrder:[],
      searchResults:[],
      orderFlag:0
    }
  },
  methods:{
    submitSearchKey:function(){
      var key=$("#searchKey").val();
      this.key=key;
      var that=this;
      var url='http://iface.qiyi.com/openapi/batch/search?from=mobile_list&page_size=30&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw={%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22}&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1&key='+key;
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success:function(data){
          that.searchResultsNoOrder=data.data;
          that.searchResults=data.data;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("error*****"+textStatus);
        }
      });
    },
    sortByCount:function(){
      function compare(propertyName) {
        return function(object1, object2) {
          var value1 = parseInt(object1[propertyName]);
          var value2 = parseInt(object2[propertyName]);
          if (value2 < value1) {
            return -1;
          } 
          else if (value2 > value1) {
            return 1;
          } 
          else {
            return 0;
          }
        }
      }
      this.orderFlag++;
      if(this.orderFlag%2==0){    //不排序
        this.searchResults=this.searchResultsNoOrder;
      }
      else{                       ////排序
        var after=Array.from(this.searchResultsNoOrder);   //浅复制
        this.searchResults=after.sort(compare("play_count"));   
      }
    }
  },
  mounted:function(){
    var that=this;
    var url='http://iface.qiyi.com/openapi/batch/recommend?app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1';
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success:function(data){
        that.searchResults=data.data[0].video_list;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("error*****"+textStatus);
      }
    });
  },
}
</script>
 
<style>
#so {
  min-height: 1000px;
}
/*搜索栏*/
#search-bar{
  padding:20px 20%;
}
.clearfix:after {    /*清除浮动*/
  content:""; 
  display:block;
  height:0; 
  visibility:hidden; 
  clear:both; 
}
.search{
  float: left;
  display: inline;
}
#searchKey{
    width: 450px;
    height: 40px;
    padding: 0 10px;
    line-height: 38px\9;
    border: 1px solid #6fa800;
    border-right: 0;
    font-size: 14px;
    outline: 0 none;
    -webkit-appearance: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.search_btn{
    width: 140px;
    height: 40px;
    padding-left: 50px;
    background: url(//www.qiyipic.com/common/fix/movieLib_images/btn-search-movielib.png) no-repeat;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    border: 0;
    cursor: pointer;
    text-shadow: 1px 0 5px rgba(51,109,8,.36);
    -webkit-appearance: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    outline: 0 none;
}
/*搜索结果显示*/
.recommend-container{
  margin-top:2%;
}
.result-info{
    background-color: #dddddd;
    padding:10px;
}
.result-info p{
    margin:0px;
    display: inline-block;
}
.result-number{
    position:relative;
    left:5%;
}
.keyword {
    color: #ff6c00;
}
.order{
    position:relative;
    left:30%;
}
.order a{
    color: #77a610;
    text-align: center;
}
.order a:hover{
    text-decoration: none;
}
.recommend-item{
    height:auto;
    margin-bottom: 5%;
}
.recommend-item{
    height:auto;
    margin-bottom: 5%;
}
.recommend-item .video-image{
  position:relative;
  left:3%;
}
.video-image img{
    width: 120px;
    height:160px;
}
ul li{
    list-style-type: none;
}
.recommend-item-info{
  margin-top:2%;
  display:inline-block;
}
.h1{
  color: #f15a24;
  font-size: 1em;
  font-style: normal;
  font-weight: 500;
  white-space: pre-wrap;
  text-align: center;
}
.video-info{
  color: #828282;
}
a.h1:hover{
    text-decoration-line: none;
    color:#77a610;
}
@media screen and (max-width: 1023px){
  #searchKey{
    width: 250px;
  }
}
@media screen and (max-width: 425px) {
    #searchKey{
      width: 150px;
    }
    #search-bar {
     padding: 15px; 
    }
    .result-number {
        position: static; 
    }
    .order {
        position: relative;
        left: 0;
    }
    .recommend-item{
        border-bottom: 1px dashed #666;
    }
    .h1{
        margin-left: 10%;
    }
}
</style>