<template>
	<div>
		<!--轮播-->
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in swiperArr" :key="index">
					<img :src="item.url"  :alt="item.adtitle" />
				</div>
			</div>
			<div class="swiper-pagination"></div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
		<h3>{{itemObj.pro_name}}</h3>
		
	</div>
</template>

<script>
	//引入 axios
	import axios from 'axios'; 
	//引入swiper
	import Swiper from 'swiper';
	//引入swiper的css
	import 'swiper/dist/css/swiper.css';
	export default{
		name:"myitem",
		data:function(){
			return {
				itemObj:{},//接收内容页的对象
				swiperArr:[]//轮播数据
			}
		},
		mounted:function(){
			//通过 itemid获取 内容页数据
			//7.获取数据，将数据保存到变量中
			let params = new URLSearchParams();//创建新的查询传参对象
			//接口定义了一些实用的方法来处理 URL 的查询字符串
			params.append('pro_id',this.$route.params.itemid);
			params.append('fid','');
			axios.post("https://www.jvhv.com/siteindex.php/Lesson/Detail.html",params).then((res)=>{
				this.itemObj = res.data.data;
				console.log(this.itemObj);
				this.swiperArr = res.data.data.pro_imglist;
				console.log(this.swiperArr);
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

<style lang="scss">
	
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
	h3{font-size: 26px; font-weight: normal; margin-top:10px; padding-left:10px;}
</style>
