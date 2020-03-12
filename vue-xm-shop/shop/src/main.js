import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入 element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入图表插件
import Echarts from 'echarts'
Vue.prototype.echarts = Echarts
Vue.use(Echarts);


//注册
Vue.use(ElementUI);


Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
