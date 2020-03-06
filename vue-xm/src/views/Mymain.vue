<template>
	<div>
		<h2>首页</h2>
		<!--轮播-->
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in swiperArr" :key="index">
					<img :src="item.adlist_img"  :alt="item.adtitle" />
				</div>
			</div>
			<div class="swiper-pagination"></div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
		
		<!--精选-->
		<!--注意：循环时必须写 :key 第一写key提高性能，第二没有key会报警告-->
		<div class="jingxuanCon">
			<h3>为您精选</h3>
			<ul>
				<li v-for="(item,index) in jingxuanArr"  :key="index">
					<div><img :src="item.pro_img[0].url" :alt="item.pro_name"/></div>
					<div class="jingxuantitle">{{item.pro_name}}</div>
					<div class="jingxuantext">{{item.pro_Joiner}}人已参加</div>
				</li>
			</ul>
		</div> 
		<!--top5-->
		<div class="top5Con">
			<h2>本周最受欢迎TOP5</h2>
			<ul class="top5list">
				<li v-for="(item,index) in top5Arr"  :key="index">
					<router-link :to="'/myitem/'+item.pro_id">
						<div class="top5_img"><img :src="item.pro_img[0].url" /></div>
						<div class="top5_text">
							<div>{{item.pro_name}}</div>
							<div>{{item.pro_Joiner}}人已参加</div>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>	
</template>

<script>
	//引入 axios
	import axios from 'axios';
	//引入swiper
	import Swiper from 'swiper';
	//引入swiper的css
	import 'swiper/dist/css/swiper.css';
	
	export default {
		name:'Mymain',
		data:function(){
			return {
				top5Arr:[],
				swiperArr:[],
				jingxuanArr:[]
			}
		},
		//挂载的函数
		mounted:function(){
			//获取数据
			axios.post("https://www.jvhv.com/siteindex.php/Index/Index.html").then((res)=>{
				console.log(res);
				//top5数据
				this.top5Arr = res.data.data.CourseTop5;
				//轮播数据
				this.swiperArr = res.data.data.top_ad.list;
				this.jingxuanArr = res.data.data.CourseforYou;
			})
			
			var mySwiper = new Swiper ('.swiper-container', {
			    loop: true,
			    autoplay:2000,
			    speed:1000,
			    observer:true,//处理异步数据
			    observeParents:true,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
			    // 如果需要前进后退按钮
			    nextButton: '.swiper-button-next',
			    prevButton: '.swiper-button-prev',
			  })        
			
			
		}
		
	}
</script>

<!--lang="scss" 以下使用的是 scss语法
scoped="scoped" 该样式只在本页面起作用
-->
<style scoped="scoped" lang="scss">
	//轮播图样式
	.swiper-container{
		border-bottom:#f5f5f5 solid 10px;
		height:170px;
		.swiper-wrapper{
			.swiper-slide{
				img{width: 100%; height:170px;}
			}
		}
	}
	//为您精选
	.jingxuanCon{
		h3{margin-top:10px; padding-left:10px; margin-bottom:10px;}
		width:100%;
		border-bottom:#f5f5f5 solid 10px;
		ul{
			width: 100%;
			display: flex; 
			flex-wrap: wrap; 
			flex-direction: row; 
			justify-content: space-around;
			li{
				width: 40%;
				height:160px;
				.jingxuantitle{font-weight: bold;}
				.jingxuantext{color:#ccc;font-size:12px;}
				div{
					img{
						width: 100%; 
						height:110px; 
						border-radius: 5px;
						}
				}
			}
		}
	}
	
	
	.top5Con{
		width: 90%; height:400px; background: #004b9e; border-radius: 10px; margin: auto;
		margin-top:20px;
		margin-bottom:50px;
	}
	.top5Con h2{color:#fff; padding:20px; }
	.top5list{background: #fff; margin:10px; height:300px;border-radius: 10px;}
	.top5list li a{display: flex; flex-direction: row; flex-wrap: nowrap; height:60px;
	 padding:6px ; border-bottom:1px solid #ddd; }
	.top5list li a .top5_img{width:30%;}
	.top5list li a .top5_img img{width: 80%; height: 50px;}			
	.top5list li a .top5_text{width: 70%;}
	
</style>
