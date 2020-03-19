<template>
	<div id="Sidebar">
		<el-menu mode="vertical"
		:default-active="$route.path" 
		:collapse="isCollapse" 
		class="my-menu" 
		background-color="#304156"  
		text-color="#fff" 
		active-text-color="#ffd04b">
			<template v-for="(item,index) in routes" v-if="!item.hidden&&item.children" >
				<template v-if="item.name == 'home'"  >					
					<el-menu-item index="/home">
						<RouterLink   to="/home"> 
							<i class="  icon iconfont my-icon" :class="item.meta.icon"></i>
							<span >{{item.meta.title}}</span>
						</RouterLink> 
					</el-menu-item>
				</template>
				<template v-else>
					<el-submenu :index="item.name||item.path" >
						<template slot="title">
							<i class=" icon iconfont  my-icon" :class="item.meta.icon"></i>
							<span >{{item.meta.title}}</span>
						</template>
					 <template v-for="(item2,index2) in item.children" v-if="!item2.hidden"  >
						<RouterLink  :to="item.path+'/'+item2.path" >
							<el-menu-item :index="item.path+'/'+item2.path">
								<i class=" icon iconfont   my-icon" :class="item2.meta.icon"></i>
								<span>{{item2.meta.title}}</span>
							</el-menu-item>
						</RouterLink>
					
					  </template> 
					</el-submenu>
				</template>	
			</template>  
		</el-menu>
		
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	import 'element-ui/lib/theme-chalk/index.css'
	export default{
		name:"sidebar",
		data:function(){
			return  {
				routes:[]
			}
		},
		computed:{
			...mapGetters([
				'sidebar'
			]),
			isCollapse(){
				return !this.sidebar.opened
			}
		},
		mounted:function(){
			console.log(this.$router.options.routes);
			this.routes = this.$router.options.routes;
			console.log(this.routes);
		}
	}
</script>

<style lang="scss" scoped>
	.my-icon{    margin-right: 10px;}
	.el-menu {border-right: 0;}
</style>