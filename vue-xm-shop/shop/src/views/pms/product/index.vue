<template>
	<div>商品列表</div>
</template>

<script>
	//引入获取商品列表的数据api
	import {fetchList,fetchCateList} from '../../../api/product';
	export default{
		name:'productList',
		data:function(){
			return{
				list:[] ,//接收从后台传过来的列表数据
				cateList:[]//接收 分类列表数据
			}
		},
		mounted:function(){
			//获取列表数据
			this.getList();
			
			//获取分类列表数据
			this.getCateList();
		},
		methods:{
			getList:function(){
				//获取数据
				fetchList().then(res=>{
					console.log(res);
				})
			},
			getCateList:function(){
				//获取数据
				fetchCateList().then(res=>{
					console.log(res);
				})
			}
		}
	}
</script>

<style>
</style>
