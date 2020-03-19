import request from '@/utils/request';

//退货列表
export function fetchList(params) {
  return request({
    url:'/index/Order/order_return_list',
    method:'get',
	params:params
  })
}

//退货删除
export function deleteApply(params){
	return request({
		url:'/index/Order/delete_return_apply',
		method:'get',
		params:params
	})
}

//获取退货申请的详情
export function getApplyDetail(params){
	return request({
		url:'/index/Order/get_order_return_detail',
		method:'get',
		params:params
	})
}

//修改退货详情
export function updateApplyStatus(data){
	return request({
	  url:'/index/Order/update_apply_status',
	  method:'post',
	  data:data
	})
}

//获取发货用户信息
export function fetchCompanyList(params){
	return request({
		url:'/index/Order/fetch_company_list',
		method:'get',
		params:params
	})
}

//获取退货原因列表
export function fetchReturnReasonList(params){
	return request({
	  url:'/index/Order/return_reason_list',
	  method:'get',
	  params:params
	})
}

//删除退货原因
export function deleteReason(params){
	return request({
	  url:'/index/Order/delete_reason_one',
	  method:'get',
	  params:params
	})
}

//修改退货原因的状态
export function updateStatus(data){
	return request({
	  url:'/index/Order/update_reason_status',
	  method:'post',
	  data:data
	})
}

//添加一条退货原因
export function addReason(data){
	return request({
	  url:'/index/Order/add_reason',
	  method:'post',
	  data:data
	})
}

//获取退后原因详情
export function getReasonDetail(params){
	return request({
	  url:'/index/Order/get_reason_detail',
	  method:'get',
	  params:params
	})
}

//修改退货原因
export function updateReason(data){
	return request({
	  url:'/index/Order/update_reason',
	  method:'post',
	  data:data
	})
}
