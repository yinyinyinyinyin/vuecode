<template>
	<!--轮播-->
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item,index) in swiperArr" :key="index">
				<img v-if="type == 'MAIN'" :src="item.adlist_img"  :alt="item.adtitle" />
				<img v-else :src="item.url"  :alt="item.adtitle" />
			</div>
		</div>
		<div class="swiper-pagination"></div>
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
	//引入swiper
	import Swiper from 'swiper';
	//引入swiper的css
	import 'swiper/dist/css/swiper.css';
	
	export default {
		props:['swiperArr','type'],
		name:"myswiper",
		mounted:function(){
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
</style>
