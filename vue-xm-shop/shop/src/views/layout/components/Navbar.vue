<template>
	<div class="navbar-container">
		<div class="navbar-title">首页</div>
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
	export default {
		data:function(){
			return {
				loginimg
			}
		},
		name:'navbar'
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
</style>
