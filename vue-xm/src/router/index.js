import Vue from 'vue'
import VueRouter from 'vue-router'

//引入的页面


//使用路由  加载路由
Vue.use(VueRouter)

//定义路由表
const routes = [
  {
    path: '/',
    redirect:'/mymain' //重定向
  },
  {
  	  path:'/mymain',
  	  name:'mymain',
  	  //路由栏加载,性能更好
  	  component: () => import(/* webpackChunkName: "mymain" */ '../views/Mymain.vue')
  },
  {
  	  path:'/myfind',
  	  name:'myfind',
  	  //路由栏加载,性能更好
  	  component: () => import(/* webpackChunkName: "myfind" */ '../views/Myfind.vue'),
	  children:[
		{"path":"/",redirect:'mytuijian'},
		{"path":'mytuijian',name:"mytuijian",component:()=>import(/* webpackChunkName: "mytuijian" */ '../views/Mytuijian.vue')},	
		{"path":'myguanzhu',name:"myguanzhu",component:()=>import(/* webpackChunkName: "myguanzhu" */ '../views/Myguanzhu.vue')},
		{"path":'mytongcheng',name:"mytongcheng",component:()=>import(/* webpackChunkName: "mytongcheng" */ '../views/Mytongcheng.vue')},
	  ]
  
  },
  {
  	  path:'/mymessage',
  	  name:'mymessage',
  	  //路由栏加载,性能更好
  	  component: () => import(/* webpackChunkName: "mymessage" */ '../views/Mymessage.vue')
  },
  {
  	  path:'/myme',
  	  name:'myme',
  	  //路由栏加载,性能更好
  	  component: () => import(/* webpackChunkName: "myme" */ '../views/Myme.vue')
  },
  {
  	  path:'/myitem/:itemid',
  	  name:'myitem',
  	  //路由栏加载,性能更好
  	  component: () => import(/* webpackChunkName: "myitem" */ '../views/Myitem.vue')
  }
]

//创建路由对象
const router = new VueRouter({
	linkActiveClass:'active',
  routes
})

//输出
export default router
