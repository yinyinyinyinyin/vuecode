import Vue from 'vue'
import VueRouter from 'vue-router'

//引入的页面
import Home from '../views/Home.vue'

//使用路由  加载路由
Vue.use(VueRouter)

//定义路由表
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
	  path:'/mine',
	  name:'mine',
	  //路由栏加载,性能更好
	  component: () => import(/* webpackChunkName: "mine" */ '../views/Mine.vue')
  }
]

//创建路由对象
const router = new VueRouter({
  routes
})

//输出
export default router
