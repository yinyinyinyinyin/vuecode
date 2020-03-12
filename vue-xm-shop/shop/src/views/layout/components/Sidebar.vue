<template>
	<div class="sidebar-container">
		 <el-menu
		      default-active="2"
		      class="el-menu-vertical-demo"
		      @open="handleOpen"
		      @close="handleClose"
		      background-color="#545c64"
		      text-color="#fff"
		      active-text-color="#ffd04b">
			  <template v-for="(item,index) in routes"  v-if="!item.hidden">
				  <template v-if= "item.name=='home'"><!--首页-->
					  <el-menu-item index="/home" >
						<router-link to="/home">
							  <i class="el-icon-location"></i>
							  <span>{{item.meta.title}}</span>
						</router-link>
					  </el-menu-item>
				  </template>
				  
				  <template v-else>
					 <el-submenu :index="item.name" >
					    <template slot="title" >
					      <i class="el-icon-location"></i>
					      <span>{{item.meta.title}}</span>
					    </template>
					    <el-menu-item-group v-for="(item2,index2) in item.children" :key="index2">		         
					      <router-link :to="item.path+'/'+item2.path">
					  				  <el-menu-item :index="item.path+'/'+item2.path">{{item2.meta.title}}</el-menu-item>
					  				  </router-link>
					    </el-menu-item-group> 
					  </el-submenu>
				  </template><!--非首页-->
			  </template>
			  
			  
		     
		      
		    </el-menu>
		
		
		
		
	</div>
</template>

<script>
	export default{
		name:'sidebar',
		data:function(){
			return {
				routes:[]//左侧菜单的数组
			}
		},
		methods:{
			//菜单打开时触发的函数
			handleOpen(key, keyPath) {
			    console.log(key, keyPath);
			},
			//菜单关闭时触发的函数
			handleClose(key, keyPath) {
			    console.log(key, keyPath);
			}
		},
		mounted:function(){
			console.log(this.$router);
			this.routes = this.$router.options.routes;
		}
	}
</script>

<style>
</style>
