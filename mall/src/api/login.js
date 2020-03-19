import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/index/Api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/index/Api/info',
    method: 'post',
	data: {
	  username:'admin'
	}
  })
}

// export function logout() {
//   return request({
//     url: '/admin/logout',
//     method: 'post'
//   })
// }
