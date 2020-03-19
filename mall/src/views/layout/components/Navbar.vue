<template>
	<div id="Navbar">
		<div class="navbar" >
			<div class="navbar-title">
				<i class="icon iconfont icon-hanbaobao my-icon" :class="{'is-active':!this.sidebar.opened}" @click="handleChangeType"></i>
				<Breadcrumb></Breadcrumb>
			</div>
				
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
				  <img class="user-avatar" :src="loginimg" />
				  <i class="el-icon-caret-bottom myicon"></i>
				</div>
				<el-dropdown-menu class="user-dropdown" slot="dropdown">
				  <router-link class="inlineBlock" to="/">
					<el-dropdown-item>
					  首页
					</el-dropdown-item>
				  </router-link>
				  <el-dropdown-item divided>
					<span @click="logout" style="display:block;">退出</span>
				  </el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import loginimg from  '@/assets/images/mz_small_icon.png';
	import Breadcrumb from '@/components/Breadcrumb';//引入一个组件
	export default {
	  data:function(){
		return {
			loginimg,
			
		}  
	  },	
	  computed: {
	    ...mapGetters([
	      'sidebar'
	    ])
	  },
	  methods: {
	    logout() {
	      this.$store.dispatch('LogOut').then(() => {
	        location.reload() // 为了重新实例化vue-router对象 避免bug
	      })
	    },
		handleChangeType(){
			this.myactive = 'active';
			this.$store.dispatch('ToggleSideBar');
			
		}
		
	  },
	  components:{
		  Breadcrumb
	  }
	}
</script>

<style lang="scss" scoped>
	.navbar {
		height: 50px;
		line-height: 50px;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: space-between;
		border-bottom:1px solid #e6e6e6;
		.navbar-title{
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			.my-icon{
				display: block;
				width:50px;
				height:50px;
				//background: pink;
				line-height: 50px;
				text-align: center;
				transform: rotate(0deg);
				transition: 1s;
				transform-origin: 50% 50%;
			}
			.is-active{
				transform: rotate(90deg);
			}
			
			
			
		}
	} 
	.avatar-wrapper{
		.user-avatar{
			width:40px;
			height:40px;
			margin-top:5px;
			border-radius: 10px;
			//border:1px solid red;
			margin-right:10px;
		}
		.my-icon{
			width:20px;
			height:50px;
			
			//border:1px solid blue;	
		}
		width:90px;
		height: 50px;
		//background: lightcoral;
	}
	 
</style>