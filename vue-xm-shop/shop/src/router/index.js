import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/home/index.vue'
//引入框架页面
import Layout from '../views/layout';

Vue.use(VueRouter)

const routes = [
  {
	  path:'/login',
	  component:()=>import(/*webpackChunkName:"login"*/'@/views/login/index'),
	  name:"login",
	  meta:{title:'登录'},
	  hidden:true
  },
  {
	  path:'/404',
	  component:()=>import(/*webpackChunkName:"404"*/'@/views/404'),
	  name:"404",
	  meta:{title:'404页'},
	  hidden:true
	},
  {
	  path:'',
	  component:Layout,
      redirect:'/home',
      name:'home',
	  meta:{title:'首页'},
	  children:[
		  {
			path:'home',
			name:'myhome',
			meta:{title:"首页"},
			component:()=>import(/*webpackChunkName:"home"*/'@/views/home/index')  
		  }  
	  ]
  },
  {
	  path:'/pms',
	  component:Layout,
	  redirect:'/pms/product',
	  name:'pms',
	  meta:{title:'商品'},
	  children:[
		  {
			  path:'product',
			  name:'product',
			  meta:{title:"商品列表"},
			  component:()=>import(/*webpackChunkName:"product"*/'@/views/pms/product/index') 
		  },
		  {
			  path:'addproduct',
			  name:'addproduct',
			  meta:{title:"添加商品"},
			  component:()=>import(/*webpackChunkName:"addproduct"*/'@/views/pms/product/add') 
		  },
		  {
			  path:'productCate',
			  name:'productCate',
			  meta:{title:"商品分类"},
			  component:()=>import(/*webpackChunkName:"productCate"*/'@/views/pms/productCate/index') 
		  },
		  {
			  path:'productAttr',
			  name:'productAttr',
			  meta:{title:"商品类型"},
			  component:()=>import(/*webpackChunkName:"productAttr"*/'@/views/pms/productAttr/index') 
		  },
		  {
			  path:'brand',
			  name:'brand',
			  meta:{title:"品牌管理"},
			  component:()=>import(/*webpackChunkName:"brand"*/'@/views/pms/brand/index') 
		  }  
	  ]
  }
]

const router = new VueRouter({
  routes
})

export default router
