<template>
	<div>添加商品页面</div>
</template>

<script>
	export default{
		name:'addpoduct',
		data:function(){
			return {
				//商品的默认数据
				productValue:{
					brand_id: null,//商品品牌id
					brand_name: '',//商品品牌名称
					delete_status: 0,//删除标志位，默认填0，表示未删除
					description: '',//商品介绍
					name: '',//商品名称
					original_price: 0,//市场价
					pic: '',//商品图片的url地址
					price: 0,//商品售价
					product_category_id: null,//分类id
					product_category_name: '',//分类名称
					product_sn: '',//商品货号
					sort: 0,//排序
					stock: 0,//商品库存
					sub_title: '',//副标题
					unit: '',//计量单位
					weight: 0,//商品重量
					sale:0,//商品销量
					publish_status:0,//上架
					new_status:0,//新品
					recommand_status:0,//推荐
					verify_status:0//审核状态  默认是未审核
				},
			}
		}
	}
</script>

<style>
</style>
