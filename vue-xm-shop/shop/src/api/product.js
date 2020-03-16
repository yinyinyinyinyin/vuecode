//引入封装好的axios  
import request from '@/utils/request';
/*
get方式传参:params
post放肆传参:data
*/
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

/*添加一条商品信息*/
export function createProduct(data){
	return request({
		url:'/Api/create_product',
		method:'post',
		data:data
	})
}

/*通过 id号查找某一条商品信息*/
export function getOneProduct(params){
	return request({
		url:'/Api/product_one',
		method:'get',
		params:params
	})
}

/*商品分类通过子级节点的id查找到父级节点信息的接口*/
export function getParentProductCate(params){
	return request({
		url:'/Api/get_parent_id',
		method:'get',
		params:params
	})
}


/*修改一条商品信息*/
export function updateProduct(data){
	return request({
		url:'/Api/update_product',
		method:'post',
		data:data
	})
}

/*删除商品的某条数据*/
export function deleteProduct(data){
	return request({
		url:'/Api/delete_status',
		method:'post',
		data:data
	})
}


/*获取商品分类的一级或二级列表  get_product_category_list*/
/*
parent_id  表示父级节点的id号,如果是0,表示是一级节点

*/
export function fetchProductCate1or2(parent_id,params){
	return request({
		url:'/Api/get_product_category_list/'+parent_id,
		method:'get',
		params:params
	})
}