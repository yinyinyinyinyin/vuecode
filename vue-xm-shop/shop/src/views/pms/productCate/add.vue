<template>
	<div>商品分类的添加页面</div>
</template>

<script>
	export default{
		name:'addproductcate',
		data:function(){
			return {
				productCate:{
					description: '',//描述
					icon: '',//小图标
					keywords: '',//关键字
					name: '',//分类的名称
					nav_status: 0,//是否显示在导航栏
					parent_id: 0,//父级节点id  ，顶级节点这个值为0
					product_unit: '',//数量单位
					product_count: 0,//商品数量
					show_status: 0,//是否显示
					sort: 0,//排序
					level:0//0表示一级分类 1表示二级分类
				}
			}
		}
	}
</script>

<style>
</style>
