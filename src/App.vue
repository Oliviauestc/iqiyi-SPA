<template>
  <div id="app">
    
    <!-- 换肤 -->
    <div id="skinningdiv">
        <div id="skinning"></div>
        <span class="skinningText"><strong>换肤</strong></span>
        <div class="btn-group-vertical hide" id="skinningSelect" role="group" aria-label="...">
            <button type="button" class="btn btn-default" id="fresh"><i class="fa fa-snowflake-o" aria-hidden="true"></i>小清新</button>
            <button type="button" class="btn btn-default" id="sport"><i class="fa fa-snowflake-o" aria-hidden="true"></i>运动风</button>
            <button type="button" class="btn btn-default" id="cute"><i class="fa fa-snowflake-o" aria-hidden="true"></i>可爱风</button>
            <button type="button" class="btn btn-default" id="cool"><i class="fa fa-snowflake-o" aria-hidden="true"></i>炫酷风</button>
            <button type="button" class="btn btn-default" id="selfDefinition"><i class="fa fa-snowflake-o" aria-hidden="true"></i>自定义</button>
            <button type="button" class="btn btn-default" id="closeSkin"><i class="fa fa-snowflake-o" aria-hidden="true"></i>关闭皮肤</button>
            <input type="file" id="upLoadImg" accept="image/gif, image/jpeg" class="hide">
        </div>
    </div>
    <!-- 回到顶部与意见反馈 -->
    <div class="backTop">
        <a href="#theTop" target="_self" class="fa fa-arrow-circle-o-up" aria-hidden="true" id="backtop"></a>
        <p>顶部</p>
        <a href="opinionbox.html" target="_blank" class="fa fa-envelope-o" aria-hidden="true"></a>
        <p>反馈</p>
    </div>


    <div class="mainbody">
      <a name="theTop" id="theTop"></a>
      <div id="topnav" class="row">
        <div id="logo" class="col-md-3 col-xs-12 col-sm-2">
            <img src="./assets/logo.png">
        </div>
        <div id="links" class="col-md-6 col-xs-12 col-sm-5">
          <router-link to="/">主页</router-link>
          <router-link to="/top">排行榜</router-link>
          <router-link to="/so">搜索</router-link>
          <a href="special.html" class="toplink" target="_blank">专题</a>
        </div>
        <div id="user" class="col-md-3 col-xs-12 col-sm-5">
          <a id="signup" href="javascript:void(0)" class="toplink">注册</a>
          <a id="login" href="javascript:void(0)" class="toplink">登录</a>
          <a href="javascript:void(0)" class="toplink login-user" style="display: none"></a>
        </div>
      </div>

      <router-view class="view" ></router-view>

      <!-- footer部分 -->
      <footer class="footer">
                <div class="footmenu">
                    <a class="footmenu-item" href="http://www.iqiyi.com/common/aboutus.html" title="公司介绍" rseat="公司介绍" target="_blank">公司介绍</a>
                    <a href="http://www.iqiyi.com/common/news.html" title="新闻动态" rseat="新闻动态" target="_blank">新闻动态</a>
                    <a href="http://www.iqiyi.com/common/contactus.html" title="联系方式" rseat="联系方式" target="_blank">联系方式</a>
                    <a href="http://zhaopin.iqiyi.com"  title="招聘英才" rseat="招聘英才" target="_blank">招聘英才</a>
                    <a href="http://labs.iqiyi.com"  title="爱奇艺实验室" rseat="爱奇艺实验室" target="_blank">爱奇艺实验室</a>
                    <a href="http://open.iqiyi.com/"  title="开放平台" rseat="开放平台" target="_blank">开放平台</a>
                    <a href="http://www.iqiyi.com/common/rz.html"  title="爱奇艺号认证" rseat="爱奇艺号认证" target="_blank">爱奇艺号认证</a>
                    <a href="http://www.iqiyi.com/zuozhe.html"  title="爱奇艺作者中心" rseat="爱奇艺作者中心" target="_blank">爱奇艺作者中心</a>
                    <a href="http://help.iqiyi.com/"  title="帮助中心" rseat="帮助中心" target="_blank">帮助中心</a>
                    <a href="http://www.iqiyi.com/common/copyright.html?entry=iqiyi"  rseat="侵权投诉" title="侵权投诉" target="_blank">侵权投诉</a>
                    <a href="http://www.iqiyi.com/common/20100420/n4813.html" title="AboutUs" rseat="About Us" target="_blank">About Us</a>
                </div>
                <p class="fEn">Copyright © 2017 <a href="http://www.iqiyi.com" title="爱奇艺" rseat="爱奇艺" target="_blank">爱奇艺</a> All Rights Reserved</p>
      </footer>

    </div>

    

  </div>
</template>

<script>
$(window).scroll(function(){
  if ($(window).scrollTop()>($(window).height()*0.5)){
    $(".backTop").css("visibility",'visible');
  }
  else{
    $(".backTop").css("visibility",'hidden');
  }
})
$(document).ready(function(){
    //用户背景存储
    var userLocalStorage=window.localStorage;
    $("#app").css("background-image",userLocalStorage.skin);
    //换肤效果
    $("#skinning").mouseover(function(){
        $("#skinningSelect").removeClass('hide');
    });
    $("#skinningSelect").mouseleave(function(){
        $("#skinningSelect").addClass('hide');
    });
    $("#skinningSelect").click(function(event){
        var buttonId = event.target.id;
        switch(buttonId){
            case "fresh":
                $("#app").css("background-image",'url(../src/assets/fresh.jpg)');  //这里的url必须从根目录写起，写成./assets/fresh.jpg无效
                userLocalStorage.setItem("skin", 'url(../src/assets/fresh.jpg)');
                break;
            case "sport":
                $("#app").css("background-image",'url(../src/assets/sport.jpg)');
                userLocalStorage.setItem("skin", 'url(../src/assets/sport.jpg)');
                break;
            case "cute":
                $("#app").css("background-image",'url(../src/assets/cute.jpg)');
                userLocalStorage.setItem("skin", 'url(../src/assets/cute.jpg)');
                break;
            case "cool":
                $("#app").css("background-image",'url(../src/assets/cool.jpg)');
                userLocalStorage.setItem("skin", 'url(../src/assets/cool.jpg)');
                break;
            case "closeSkin":
                $("#app").css("background-image","none");
                userLocalStorage.setItem("skin", "none");
                break;
            default:
                $("#app").css("background-image","none");
        }
    });
    //自定义皮肤文件上传
    $("#selfDefinition").click(function(){
        $("#upLoadImg").click();
    });
    $("#upLoadImg").change(function(){
        var inputfiles = document.querySelector('input[type=file]').files;
        if(inputfiles.length > 0) {
            var file = inputfiles[0];
            var reader  = new FileReader();
            reader.addEventListener("load", function () {
                $("#app").css("background-image",'url('+reader.result+')');
                userLocalStorage.setItem("skin", 'url('+reader.result+')');
                }, false);
            if(file){
                reader.readAsDataURL(file);
            }
        }
    });
})


export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  methods: {
    searchinput(){
        var key=$("#searchinput").val();
        console.log("*************"+key);
    }
  }
}
</script>
<style>

#app{
  font-family: "Microsoft Yahei",Helvetica,"Lucida Grande",Arial,"Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fefefe;
  color: #000;
  background-attachment:fixed;
  background-size:100% 100%;
  min-height: 500px;
}
/*换肤区域*/
#skinning{
    position: absolute;
    cursor: pointer;
    top:0px;
    right: 0px;
    border-top: 60px solid  #77a610;
    border-left: 60px solid  transparent;
}
.skinningText{
    position: absolute;
    top: 0px;
    right: 5px;
    color: #fff;
}
#skinningSelect{
    position: absolute;
    top: 0px;
    right: 60px;
    z-index: 999;
}
#skinningSelect button{
    font-size: 15px;
}
#skinningSelect .iconimg{
    width: 15px;
    height: 15px;
}
.fa-snowflake-o{
    color: #77a610;
}
.hide{
    display: none;
}
#skinningSelect button{
    outline: none;
}
/* 回到顶部与意见反馈 */
.backTop{
    visibility: hidden;
    position: fixed;
    bottom: 40px;
    right: 10px;
    z-index: 999;
    text-align: center;
}
.backTop a{
    display: block;
    border-radius: 40px;
    width: 40px;
    height: 40px;
    font-size: 40px;
    text-align: center;
    line-height: 40px;
    text-decoration: none;
    color: #000;
}
.backTop a.fa-envelope-o{
    font-size: 30px;
}
.backTop a:hover{
    color: #77a610;
}
/*主体部分*/
.mainbody {
  min-height: 1000px;
  background-color: #fefefe;
  margin: 0 10%;
}
.row{
  margin:0px;
  padding:0px;
}
/*导航栏*/
#topnav {
  background-color: #181818;
  padding: 5px 0px;
}
#logo{
  padding-left: 5px;
}
#links,#user{
  line-height: 35px;
  text-align: center;
}
/*#links{
  background-color:#fefefe;
}*/
#links a{
  color: #77a610;
  font-size:17px;
  margin: 0px 10px;
}
#user a{ 
  color: #fff;
  float: right;
  display: inline-block;
  margin: 0px 10px;
}
/*footer*/
.footer{
    text-align:center;
    font-size:90%;
    bottom: 0;
    width: 100%;
    padding:15px;
    clear:right;
    margin-top:50px;
}
.fEn {
    margin-top:5px;
    color: #999;
    font-family: Arial;
}
.footmenu a {
    background: url(./assets/footerline.png) no-repeat left 3px;
    padding: 0 8px 0 10px;
    color: #999;
}
.fEn a{
    color: #999;
    font-family: Arial;
}
/*媒体查询*/
@media screen and (max-width: 1024px) {
    .mainbody {
        margin: 0px;
    }
    #skinningdiv{
      visibility:hidden;
    }
}

@media screen and (max-width: 767px){
  #user {
    position: absolute;
    top: 5px;
    left: 0px;
    padding: 0px;
  }
}
</style>
