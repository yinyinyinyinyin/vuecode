import request from '@/utils/request';

//订单列表
export function fetchList(params) {
  return request({
    url:'/index/Order/order_list',
    method:'get',
	params:params
  })
}


//订单删除
export function deleteOrder(params){
	return request({
		url:'/index/Order/delete_order_status',
		method:'get',
		params:params
	})
}

//订单关闭
export function closeOrder(data) {
  return request({
    url:'/index/Order/close_order',
    method:'post',
    data:data
  })
}

//根据id获取一条订单数据
export function getOrderDetail(params){
	return request({
		url:'/index/Order/get_order_detail',
		method:'get',
		params:params
	})
}

//修改备注信息
export function  updateOrderNote(data){
	return request({
	  url:'/index/Order/close_order',
	  method:'post',
	  data:data
	})
}

//修改收货人的信息
export function  updateReceiverInfo(data){
	return request({
	  url:'/index/Order/update_receiver_info',
	  method:'post',
	  data:data
	})
}

//获取配置信息
export function getOrderSetting(params){
	return request({
		url:'/index/Order/get_order_setting',
		method:'get',
		params:params
	})
}

//修改配置信息
export function updateOrderSetting(data){
	return request({
	  url:'/index/Order/update_order_setting',
	  method:'post',
	  data:data
	})
}

