//引入封装好的axios  
import request from '@/utils/request';

/*获取商品列表index/Api/*/
export function fetchList(params){
	return request({
		url:'/Api/product_list',
		method:'get',
		params:params
	})
}

/*获取商品分类列表index/Api/*/
export function fetchCateList(params){
	return request({
		url:'/Api/get_product_category',
		method:'get',
		params:params
	})
}

/*获取品牌列表 所有值没有分页*/
export function fetchBrandList(params){
	return request({
		url:'/Api/get_product_brand',
		method:'get',
		params:params
	})
}