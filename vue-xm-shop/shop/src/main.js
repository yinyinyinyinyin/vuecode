import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入 element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入 vcharts
import VCharts from 'v-charts';

//注册
Vue.use(ElementUI);
Vue.use(VCharts);


Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
