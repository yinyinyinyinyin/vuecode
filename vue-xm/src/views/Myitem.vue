<template>
	<div>
		<!--轮播-->
		<myswiper :swiperArr="swiperArr" type="ITEM"></myswiper>
		
		<h3>{{itemObj.pro_name}}</h3>
		
	</div>
</template>

<script>
	//引入 axios
	import axios from 'axios'; 
	import myswiper from '../components/MySwiper';
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
		},
		components:{
			myswiper:myswiper
		}
	}
</script>

<style lang="scss">
	
	h3{font-size: 26px; font-weight: normal; margin-top:10px; padding-left:10px;}
</style>
