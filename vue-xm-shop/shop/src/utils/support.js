//对cookie的封装
import Cookie from 'js-cookie';
//设置
//expires cookie的过期时间
export function setCookie(key,value,expires){
	return Cookie.set(key,value,{expires:expires});
}

//获取
export function getCookie(key){
	return Cookie.get(key);	
}

//删除
export function removeCookie(key){
	Cookie.remove(key);
}