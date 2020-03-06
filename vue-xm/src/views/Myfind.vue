<template>
	<div>
		<div class="findTitle">发现</div>
		<div class="findNav">
			<router-link to="/myfind/mytuijian">推荐</router-link>
			<router-link to="/myfind/myguanzhu">关注</router-link>
			<router-link to="/myfind/mytongcheng">同城</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
</script>

<style lang="scss">
	.findTitle{height: 50px; line-height:50px; border-bottom: 1px solid #ccc; text-align: center;}
	.findNav{
		height:36px;line-height:36px;
		display: flex; flex-wrap: nowrap; flex-direction: row;
		justify-content: space-around;
		a {
		  font-weight: bold;
		  color: #2c3e50;
		  &.router-link-exact-active {
		    color:darkblue;
			border-bottom:2px solid darkblue;
		  }
		}
	}
	
	
	
	
</style>
