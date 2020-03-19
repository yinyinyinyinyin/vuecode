import router from './router'
import store from './store'

import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
 console.log(to);
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
			console.log(store.getters);
			next();
    //   if (store.getters.roles.length === 0) {
		  // next()
    //     store.dispatch('GetInfo').then(res => { // 拉取用户信息
    //       next()
    //     }).catch((err) => {
    //       // store.dispatch('FedLogOut').then(() => {
    //       //   Message.error(err || 'Verification failed, please login again')
    //       //   next({ path: '/' })
    //       // })
    //     })
    //   } else {
    //     next()
    //   }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

