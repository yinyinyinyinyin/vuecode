import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/home/index.vue'
//引入框架页面
import Layout from '../views/layout';

Vue.use(VueRouter)

const routes = [
  {path:'/login',component:()=>import(/*webpackChunkName:"login"*/'@/views/login/index')},
  {path:'/404',component:()=>import(/*webpackChunkName:"404"*/'@/views/404')},
  {path:'',component:Layout,redirect:'/home',name:'home',
  children:[
	  {
		path:'home',
		name:'myhome',
		component:()=>import(/*webpackChunkName:"home"*/'@/views/home/index')  
	  }
	  
  ]
  },
]

const router = new VueRouter({
  routes
})

export default router
