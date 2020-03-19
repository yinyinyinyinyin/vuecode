import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
import Layout from '../views/layout/Layout';

const routes = [
	{path: '/login', component: () => import(/* webpackChunkName: "login" */'@/views/login/index'), hidden: true},
	{path: '/404', component: () => import(/* webpackChunkName: "404" */'@/views/404'), hidden: true},
	{
		path: '',
		component: Layout,
		redirect: '/home',
		name:'home',
		meta: {title: '首页', icon: 'icon-home'},
		children: [
			{
			  path: 'home',
			  name: 'home1',
			  component: () => import(/* webpackChunkName: "home" */'@/views/home/index'),
			  meta: {title: '首页', icon: 'icon-home'}
			},
		]
	},
	{
	  path: '/pms',
	  component: Layout,
	  redirect: '/pms/product',
	  name: 'pms',
	  meta: {title: '商品', icon: 'icon-shangpin'},
	  children: [
			{
				path: 'product',
				name: 'product',
				component: () => import('@/views/pms/product/index'),
				meta: {title: '商品列表', icon: 'icon-liebiao1'}
			},
			{
				path: 'addProduct',
				name: 'addProduct',
				component: () => import('@/views/pms/product/add'),
				meta: {title: '添加商品', icon: 'icon-tianjia'}
			},
			{
				path: 'updateProduct',
				name: 'updateProduct',
				component: () => import('@/views/pms/product/update'),
				meta: {title: '修改商品', icon: 'icon-tianjia'},
				hidden: true
			},
			{
				path: 'productCate',
				name: 'productCate',
				component: () => import('@/views/pms/productCate/index'),
				meta: {title: '商品分类', icon: 'icon-fenlei'}
			},
			{
			  path: 'addProductCate',
			  name: 'addProductCate',
			  component: () => import('@/views/pms/productCate/add'),
			  meta: {title: '添加商品分类'},
			  hidden: true
			},
			{
			  path: 'updateProductCate',
			  name: 'updateProductCate',
			  component: () => import('@/views/pms/productCate/update'),
			  meta: {title: '修改商品分类'},
			  hidden: true
			},
			{
				path: 'productAttr',
				name: 'productAttr',
				component: () => import('@/views/pms/productAttr/index'),
				meta: {title: '商品类型', icon: 'icon-haofangtuo400iconfontzhuzhaileixing'}
			},
			{
				path: 'brand',
				name: 'brand',
				component: () => import('@/views/pms/brand/index'),
				meta: {title: '品牌管理', icon: 'icon-pinpaitemai'}
			},
			{
			  path: 'addBrand',
			  name: 'addBrand',
			  component: () => import('@/views/pms/brand/add'),
			  meta: {title: '添加品牌'},
			  hidden: true
			},
			{
			  path: 'updateBrand',
			  name: 'updateBrand',
			  component: () => import('@/views/pms/brand/update'),
			  meta: {title: '编辑品牌'},
			  hidden: true
			}
	  ]
	},
	{
		
		  path: '/oms',
		  component: Layout,
		  redirect: '/oms/order',
		  name: 'oms',
		  meta: {title: '订单', icon: 'icon-dingdan'},
		  children: [
		    {
		      path: 'order',
		      name: 'order',
		      component: () => import('@/views/oms/order/index'),
		      meta: {title: '订单列表', icon: 'icon-liebiao1'}
		    },
		    {
		      path: 'orderDetail',
		      name: 'orderDetail',
		      component: () => import('@/views/oms/order/orderDetail'),
		      meta: {title: '订单详情'},
		      hidden:true
		    },
		    {
		      path: 'orderSetting',
		      name: 'orderSetting',
		      component: () => import('@/views/oms/order/setting'),
		      meta: {title: '订单设置', icon: 'icon-duomeitiicon-'}
		    },
		    {
		      path: 'returnApply',
		      name: 'returnApply',
		      component: () => import('@/views/oms/apply/index'),
		      meta: {title: '退货申请处理', icon: 'icon-tuihuo'}
		    },
		    {
		      path: 'returnReason',
		      name: 'returnReason',
		      component: () => import('@/views/oms/apply/reason'),
		      meta: {title: '退货原因设置', icon: 'icon-wenjian'}
		    },
		    {
		      path: 'returnApplyDetail',
		      name: 'returnApplyDetail',
		      component: () => import('@/views/oms/apply/applyDetail'),
		      meta: {title: '退货原因详情'},
		      hidden:true
		    }
		  ]
		
	},
	{path: '*', redirect: '/404', hidden: true}
]


const router = new VueRouter({
  routes
})

export default router;