<template>
	<div class="navbar-container">
		<div class="navbar-title">
			<i class="icon iconfont icon-hanbaobao my-hanbao" @click="handleChangeType"
			:class="{'is-active':!this.sidebar.opened}"></i>
			<div class="mianbaodaohang"><Breadcrumb></Breadcrumb></div>
		</div>
		<div class="navbar-img">
			<el-dropdown>
			  <div class="user-wrapper "  >
				  <img class="user-img" :src="loginimg" alt="userimg"/>
				  <i class="el-icon-caret-bottom"></i>
			  </div>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>首页</el-dropdown-item>
			    <el-dropdown-item>退出</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	/* @ 表示的是 src目录*/
	import loginimg from '@/assets/images/mz_small_icon.png';
	//引入面包屑导航的组件
	import Breadcrumb from '@/components/Breadcrumb/index';
	import {mapGetters} from 'vuex';
	export default {
		name:'navbar',
		data:function(){
			return {
				loginimg
			}
		},
		computed:{
			...mapGetters(['sidebar'])
		},
		methods:{
			handleChangeType:function(){
				//将状态提价到actions
				this.$store.dispatch('ToggleSideBar');
			}
		},
		components:{
			Breadcrumb
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.el-dropdown-link {
	    cursor: pointer;
	    color: #409EFF;
	  }
	  .el-icon-arrow-down {
	    font-size: 12px;
	  }
	  .user-wrapper{
		  .user-img{width:40px; height:40px; border-radius: 5px; margin-top:5px;margin-right:5px;}
	  }
	  .navbar-title{
		  width: 60%;
		  display: flex;
		  .my-hanbao{
			margin-left:20px;
			transform: rotate(0deg);
			transition: 1s;
			transform-origin:50% 50% ;
		  }
		  .is-active{
			  transform: rotate(90deg);
		  }
		  .mianbaodaohang{margin-left:20px; line-height:50px; height:50px;margin-top:18px;}
	  }
</style>
