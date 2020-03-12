//引入封装好的axios  
import request from '@/utils/request';

/*获取商品列表*/
export function fetchList(params){
	return request({
		url:'index/Api/product_list',
		method:'get',
		params:params
	})
}

/*获取商品分类列表*/
export function fetchCateList(params){
	return request({
		url:'index/Api/get_product_category',
		method:'get',
		params:params
	})
}