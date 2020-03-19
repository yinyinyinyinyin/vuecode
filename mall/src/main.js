import Vue from 'vue'

//重置浏览器样式的
import 'normalize.css/normalize.css';
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts';

import '@/styles/index.scss';

import App from './App.vue'
import router from './router'
import store from './store'

import '@/fonts/iconfont.css';
//路由守卫
import '@/permission' // permission control
//
Vue.use(ElementUI,{locale});
Vue.use(VCharts);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (module.hot) {
  module.hot.accept();
}