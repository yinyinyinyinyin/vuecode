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