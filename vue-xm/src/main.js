//引入vue库
import Vue from 'vue'
//引入App模板文件
import App from './App.vue'
//引入路由
import router from './router'

//执行环境 默认是开发环境
Vue.config.productionTip = false

//创建新的vue对象
new Vue({
  router,//注册路由
  render: h => h(App) //将主vue文件在#app的dom节点渲染
}).$mount('#app')
