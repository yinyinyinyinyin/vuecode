<template>
	<el-breadcrumb separator="/">
	  <el-breadcrumb-item v-for="(item,index) in levelList" :key="index" >{{item.meta.title}}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
	export default {
		name:'Breadcrumb',
		data:function(){
			return {
				levelList:[]
			}
		},
		mounted:function(){
			this.getBreadcrumb();
		},
		watch:{
			$route(){
				this.getBreadcrumb();
			}
		},
		methods:{
			getBreadcrumb:function(){
				console.log(this.$route);
				let matched = this.$route.matched.filter(item=>item.name);
				console.log(matched);
				const first = matched[0];
				if(first && first.name !== 'home'){
					matched = [{path:'/home',meta:{title:'首页'}}].concat(matched);
					
				}
				
				this.levelList = matched;
				console.log(this.levelList);
			}
		}
	}
	
</script>

<style>
</style>
