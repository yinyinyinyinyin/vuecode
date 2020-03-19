import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
		console.log(123)
      const username = userInfo.username.trim()
	  console.log(username);
	  console.log(userInfo.password);
      return new Promise((resolve, reject) => {
		  console.log(1111);
        login(username, userInfo.password).then(response => {
          const data = response;
		  console.log(666);
		  console.log(response);
          const tokenStr = response['userid']+response['encryption'];
          setToken(tokenStr)
		  
		  //设置cookie
		  setToken('userid',response['userid']); //设置Session
		  setToken('roleid', response['roleid']); //设置Session
		  setToken('encryption', response['encryption']); //设置Session
		  //setToken('muid', this.$md5(this.$md5(res.data['userid']+res.data['encryption']))); //设置Session
		  //setToken('mrid', this.$md5(this.$md5(res.data['roleid']+res.data['encryption']))); //设置Session
		  
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息	//从缓存获取即可
    GetInfo({ commit, state }) {
		//console.log(userInfo);
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', 'TEST');//测试使用
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', 'admin')
          commit('SET_AVATAR', 'icon')
          resolve()
        }).catch(error => {
         reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
