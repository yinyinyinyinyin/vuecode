<template>
  <div id="app">
	  <!--路由出口-->
	  <router-view></router-view>
    <div id="nav">
		<!--相当于a标签的路由信息-->
      <router-link to="/">
		  <img src="https://www.jvhv.com/wap/static/images/footer_1_red.png" />
		  <div>首页</div>
	</router-link> 
      <router-link to="/myfind">
		  <img src="https://www.jvhv.com/wap/static/images/footer_6_red.png" />
		  <div>发现</div>
		  </router-link> 
	  <router-link to="/mymessage">
		  <img src="https://www.jvhv.com/wap/static/images/footer_8_red.png" />
		  <div>消息</div>
		  </router-link>
	  <router-link to="/myme">
		  <img src="https://www.jvhv.com/wap/static/images/footer_5_red.png" />
		  <div>我的</div>
		  
		  </router-link>
    </div>
	
  </div>
</template>
<!--lang="scss" 以下使用的是 scss语法
scoped="scoped" 该样式只在本页面起作用
-->
<style lang="scss" >
*{padding:0;margin:0;}
ul,li{list-style:none;}	
a{text-decoration: none;}	
#nav {
	background: #fff;
	font-size:12px;
  position: fixed;
  bottom:0;
  left:0;
  right:0;
  height:50px;
  border-top:1px solid #ccc;
	//line-height:50px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  a{
	color:#000;
	img{width: 27px; height:27px;}  
	div{height:23px;}
  }
  a:hover{color:#000; text-decoration: none;}
}
</style>
