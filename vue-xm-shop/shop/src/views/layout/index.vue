<template>
	<div class="app-wrapper">
		<Sidebar :class="this.sidebar.opened?'sidebar-container':'sidebar-container1'"></Sidebar>
		<div :class="this.sidebar.opened?'main-container':'main-container1'">
			<Navbar></Navbar>
			<AppMain></AppMain>
		</div>
	</div>
</template>

<script>
	//引入getters
	import {mapGetters} from 'vuex';
	
	
	//引入 左侧，头部，主体部分的组件
	import Sidebar from './components/Sidebar';
	import Navbar from  './components/Navbar';
	import AppMain from './components/AppMain';
	export default {
		name:'layout',
		components:{
			Sidebar,
			Navbar,
			AppMain
		},
		computed:{
			...mapGetters(['sidebar'])
		}
	}
</script>
<!-- scoped="scoped" 表示以下css只在该页面起作用
lang="scss" 以下css使用 scss语法
-->
<style lang="scss"  scoped="scoped">
	#app{
		.app-wrapper{
			position: relative;
			height:100%;
			width: 100%;
			.sidebar-container{
				width: 180px;
				height: 100%;
				position: fixed;
				top:0;
				left:0;
				bottom:0;
				overflow: hidden;
				background: #304156;
				color:#fff;
			}
			.main-container{
				clear:both;
				min-height: 100%;
				margin-left: 180px;
				.navbar-container{
					height: 50px;
					background: lightgoldenrodyellow;
					line-height: 50px;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: space-between;
					border-bottom:1px solid #ccc;
				}
				.main-con{
					width:100%;
					min-height:100%;
					//background: lightcyan;
				}
			}
			
			/*当=菜单收起时需要修改样式*/
			.sidebar-container1{
				width: 64px;
				height: 100%;
				position: fixed;
				top:0;
				left:0;
				bottom:0;
				overflow: hidden;
				background: #304156;
				color:#fff;
			}
			.main-container1{
				clear:both;
				min-height: 100%;
				margin-left: 64px;
				.navbar-container{
					height: 50px;
					background: lightgoldenrodyellow;
					line-height: 50px;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: space-between;
					border-bottom:1px solid #ccc;
				}
				.main-con{
					width:100%;
					min-height:100%;
					//background: lightcyan;
				}
			}
			
		}
	}
</style>
