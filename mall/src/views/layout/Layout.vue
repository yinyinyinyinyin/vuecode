<template>
	<div class="app-wrapper">
		<sidebar :class="this.sidebar.opened?'sidebar-container':'sidebar-container1'" ></sidebar>
		<div  :class="this.sidebar.opened?'main-container':'main-container1'" class="">
		  <navbar ></navbar>
		  <app-main></app-main> 
		</div>
		
	</div>
</template>

<script>
	//import {Navbar,Sidebar,AppMain} from './components';
	import Sidebar from './components/Sidebar';
	import Navbar from './components/Navbar';
	import AppMain from './components/AppMain';
	import {mapGetters} from 'vuex';
	
	export default {
		name:'layout',
		components:{
			Navbar,
			Sidebar,
			AppMain
		},
		computed:{
			...mapGetters([
				'sidebar'
			])
		}
		
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#app{
	.app-wrapper {
		position: relative;
		height: 100%;
		width: 100%;
		.sidebar-container {
			width: 180px ;
			height: 100%;
			position: fixed;
			transition: 1s;
			top: 0;
			bottom: 0;
			left: 0;
			z-index: 1001;
			overflow: hidden;
			background:rgb(48, 65, 86);
		}
		.main-container{
			min-height: 100%;
			margin-left: 180px;
			// background: lightblue;
		}
		
		.sidebar-container1 {
			width: 64px ;
			height: 100%;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			z-index: 1001;
			overflow: hidden;
			background:rgb(48, 65, 86);
		}
		.main-container1{
			min-height: 100%;
			margin-left: 64px;
			// background: lightblue;
		}
		
	} 	
} 
	
</style>
