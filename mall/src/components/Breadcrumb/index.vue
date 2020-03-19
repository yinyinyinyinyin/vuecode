<template>
	<el-breadcrumb separator="/" class="mybread">
		<el-breadcrumb-item v-if="this.$route.path === '/home'">
		  <span>首页</span>
		</el-breadcrumb-item>
		<template v-else >
		 <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
		   <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
		   <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
		 </el-breadcrumb-item>
		 </template>
	</el-breadcrumb>
</template>

<script>
	//导出一个组件
	export default{
		name:'Breadcrumb',
		data:function(){
			return {
				 levelList: null
			}
		},
		created() {
		  this.getBreadcrumb()
		},
		watch: {
		  $route() {
		    this.getBreadcrumb()
		  }
		},
		methods: {
		  getBreadcrumb() {
			  console.log(this.$route);
		    let matched = this.$route.matched.filter(item => item.name);
			
			const first = matched[0]
		    if (first && first.name !== 'home') {
		      matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
		    }
			
		    this.levelList = matched
		  }
		}
	}
	
</script>

<style scoped="scoped">
	.mybread{height:50px; line-height: 50px; margin-left:20px;}
	
</style>
