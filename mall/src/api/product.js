import request from '@/utils/request'
//get 的数据是  params接收
//post 的数据是 data 接收

/*商品列表*/
//获取列表
export function fetchList(params) {
  return request({
    url:'/index/Api/product_list',
    method:'get',
	params:params
  })
}
//获取单条记录的数据
export function getProduct(params){
	return request({
	  url:'/index/Api/product_one',
	  method:'get',
	  params:params
	})
}

//修改删除标记位
export function updateDeleteStatus(params){
	return request({
	    url:'/index/Api/delete_status',
	    method:'get',
	    params:params
	  })
}

//添加商品数据
export function createProduct(data) {
  return request({
    url:'/index/Api/create_product',
    method:'post',
    data:data
  })
}

//修改商品数据
export function updateProduct(data) {
  return request({
    url:'/index/Api/update_product',
    method:'post',
    data:data
  })
}

/*商品分类*/
//通过子节点的分类id查找父节点的分类信息
export function getParentId(params){
	return request({
	  url:'/index/Api/get_parent_id',
	  method:'get',
	  params:params
	})
}

//需要子节点的分类数据
export function fetchListWithChildren() {
  return request({
    url:'/index/Api/get_product_category',
    method:'get'
  })
}

//分类数据一级
export function fetchCategoryList(parent_id,params) {
  return request({
    url:'/index/Api/get_product_category_list/'+parent_id,
    method:'get',
	params:params
  })
}

//修改商品分类是否显示
export function updateShowStatus(data){
	return request({
	  url:'/index/Api/update_show_category_status',
	  method:'post',
	  data:data
	})
}

//删除商品分类
export function deleteProductCate(data){
	return request({
	  url:'/index/Api/delete_category',
	  method:'post',
	  data:data
	})
}

//创建商品分类
export function createProductCate(data){
	console.log(data);
	return request({
	  url:'/index/Api/create_product_cate',
	  method:'post',
	  data:data
	})
}

//获取单条商品分类记录的数据
export function getProductCate(params){
	return request({
	  url:'/index/Api/product_cate_one',
	  method:'get',
	  params:params
	})
}

//修改商品分类记录的数据updateProductCate
export function updateProductCate(data){
	console.log(data);
	return request({
	  url:'/index/Api/update_product_cate',
	  method:'post',
	  data:data
	})
}

/*商品类型*/
//获取商品类型列表数据
export function fetchProductAttrList(params){
	return request({
	  url:'/index/Api/get_product_attr',
	  method:'get',
	  params:params
	})
}

//删除商品类型数据
export function deleteProductAttrList(params){
	return request({
	  url:'/index/Api/delete_product_attr',
	  method:'get',
	  params:params
	})
}

//新增商品类型数据
export function createProductAttrList(data){
	console.log(data);
	return request({
	  url:'/index/Api/create_product_attr',
	  method:'post',
	  data:data
	})
}

//修改商品类型数据
export function updateProductAttrList(data){
	return request({
	  url:'/index/Api/update_product_attr',
	  method:'post',
	  data:data
	})
}

/*品牌管理*/
//品牌列表
//获取品牌列表
export function fetchBrandList(){
	return request({
	  url:'/index/Api/get_product_brand',
	  method:'get'
	})
}

//获取品牌列表有分页和查询
export function fetchBrandListPag(params){
	return request({
	  url:'/index/Api/get_product_brand_pag',
	  method:'get',
	  params:params
	})
}

//品牌添加
export function createBrandList(data){
	console.log(data);
	return request({
	  url:'/index/Api/create_product_brand',
	  method:'post',
	  data:data
	})
}

//品牌修改
export function updateBrandList(data){
	return request({
	  url:'/index/Api/update_product_brand',
	  method:'post',
	  data:data
	})
}
//品牌删除
export function deleteBrandList(params){
	return request({
	  url:'/index/Api/delete_product_brand',
	  method:'get',
	  params:params
	})
}

//获取一条品牌管理信息
export function getBrandone(params){
	return request({
	  url:'/index/Api/brand_one',
	  method:'get',
	  params:params
	})
	
	
}

//修改 品牌制造商是否显示
export function  updateFactoryStatusBrand(data){
	return request({
	  url:'/index/Api/update_brand_factory_status',
	  method:'post',
	  data:data
	})
}
//修改该品牌是否显示
export function updateShowStatusBrand(data){
	return request({
	  url:'/index/Api/update_brand_show_status',
	  method:'post',
	  data:data
	})
}


// export function fetchSimpleList(params) {
//   return request({
//     url:'/product/simpleList',
//     method:'get',
//     params:params
//   })
// }
// 
// export function updateDeleteStatus(params) {
//   return request({
//     url:'/product/update/deleteStatus',
//     method:'post',
//     params:params
//   })
// }
// 
// export function updateNewStatus(params) {
//   return request({
//     url:'/product/update/newStatus',
//     method:'post',
//     params:params
//   })
// }
// 
// export function updateRecommendStatus(params) {
//   return request({
//     url:'/product/update/recommendStatus',
//     method:'post',
//     params:params
//   })
// }
// 
// export function updatePublishStatus(params) {
//   return request({
//     url:'/product/update/publishStatus',
//     method:'post',
//     params:params
//   })
// }
// 
// export function createProduct(data) {
//   return request({
//     url:'/product/create',
//     method:'post',
//     data:data
//   })
// }
// 
// export function updateProduct(id,data) {
//   return request({
//     url:'/product/update/'+id,
//     method:'post',
//     data:data
//   })
// }
// 
// export function getProduct(id) {
//   return request({
//     url:'/product/updateInfo/'+id,
//     method:'get',
//   })
// }

