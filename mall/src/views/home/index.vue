<template>
  <div class="app-container">
	<!--订单销售额统计-->
	<div class="total-layout">
		<el-row :gutter="20">
		  <el-col :span="8">
			<div class="total-frame">
				<img :src="img_home_order" class="total-icon" />
				<div>
					<div class="total-title">今日订单总数</div>
					<div class="total-value">200</div>
				</div>
			</div>
		  </el-col>
		  <el-col :span="8">
			<div class="total-frame">
				<img :src="img_home_today_amount" class="total-icon" />
				<div>
					<div class="total-title">今日销售总额</div>
					<div class="total-value">￥5000</div>
				</div>
			</div>  
			</el-col>
		  <el-col :span="8">
			  <div class="total-frame">
			  	<img :src="img_home_yesterday_amount" class="total-icon" />
			  	<div>
			  		<div class="total-title">昨日销售总额</div>
			  		<div class="total-value">￥3000</div>
			  	</div>
			  </div>
		  </el-col>
		</el-row>
	</div>
	<!--待处理事务统计-->
	<div class="un-handle-layout">
		<div class="layout-title">待处理事务</div>
		<div class="un-handle-content">
			<el-row :gutter="20">
				<el-col :span="8" v-for="(item,index) in PendingArr" :key="index">
					 <div class="un-handle-item">
					  <span class="font-medium">{{item.name}}</span>
					  <span class="color-danger">({{item.count}})</span>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
	<!--商品总览和用户总览-->
	<div class="overview-layout">
		<el-row :gutter="20">
		  <el-col :span="12">
		    <div class="out-border">
		      <div class="layout-title">商品总览</div>
		      <div style="padding: 40px">
		        <el-row>
		          <el-col :span="6" class="color-danger overview-item-value">100</el-col>
		          <el-col :span="6" class="color-danger overview-item-value">400</el-col>
		          <el-col :span="6" class="color-danger overview-item-value">50</el-col>
		          <el-col :span="6" class="color-danger overview-item-value">500</el-col>
		        </el-row>
		        <el-row class="font-medium">
		          <el-col :span="6" class="overview-item-title">已下架</el-col>
		          <el-col :span="6" class="overview-item-title">已上架</el-col>
		          <el-col :span="6" class="overview-item-title">库存紧张</el-col>
		          <el-col :span="6" class="overview-item-title">全部商品</el-col>
		        </el-row>
		      </div>
		    </div>
		  </el-col>
		  <el-col :span="12">
		    <div class="out-border">
		      <div class="layout-title">用户总览</div>
		      <div style="padding: 40px">
		        <el-row>
		          <el-col :span="6" class="color-danger overview-item-value">100</el-col>
		          <el-col :span="6" class="color-danger overview-item-value">200</el-col>
		          <el-col :span="6" class="color-danger overview-item-value">1000</el-col>
		          <el-col :span="6" class="color-danger overview-item-value">5000</el-col>
		        </el-row>
		        <el-row class="font-medium">
		          <el-col :span="6" class="overview-item-title">今日新增</el-col>
		          <el-col :span="6" class="overview-item-title">昨日新增</el-col>
		          <el-col :span="6" class="overview-item-title">本月新增</el-col>
		          <el-col :span="6" class="overview-item-title">会员总数</el-col>
		        </el-row>
		      </div>
		    </div>
		  </el-col>
		</el-row>
	</div>
	<!--订单统计-->
	<div class="statistics-layout">
		<div class="layout-title">订单统计</div>
		<el-row>
		  <el-col :span="4">
		    <div class="stati-item" >
		      <div v-for="(item,index) in TongjiArr" :key="index" class="myitem">
		        <div class="text1" >{{item.name}}</div>
		        <div class="text2" >{{item.num}}</div>
		        <div>
		          <span :class="item.up>0?'color-success':'color-danger'" >{{item.up}}%</span>
		          <span class="text3" >{{item.type}}</span>
		        </div>
		      </div>
		    </div>
		  </el-col>
		  <el-col :span="20">
		    <div class="left-line">
		      <div>
		        <ve-line
		          :data="chartData"
		          :legend-visible="false"
		          :loading="loading"
		          :data-empty="dataEmpty"
		          :settings="chartSettings"></ve-line>
		      </div>
		    </div>
		  </el-col>
		</el-row>
		
	</div>
	
	
  </div>
</template>

<script>
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';

  export default{
	name:'home',
	data:function(){
		return {
			img_home_order,
			img_home_today_amount,
			img_home_yesterday_amount,
			PendingArr:[
				{"name":"待付款订单","count":10},
				{"name":"已完成订单","count":5},
				{"name":"待确认收货订单","count":20},
				{"name":"待发货订单","count":30},
				{"name":"新缺货登记","count":6},
				{"name":"待处理退款申请","count":8},
				{"name":"已发货订单","count":12},
				{"name":"待处理退货订单","count":9},
				{"name":"广告位即将到期","count":10},
			],
			TongjiArr:[
				{"name":"本月订单统计","num":10000,"up":"+10","type":"同比上月"},
				{"name":"本周订单总数","num":1000,"up":"-10","type":"同比上周"},
				{"name":"本月销售总额","num":100000,"up":"+10","type":"同比上月"},
				{"name":"本周销售总额","num":50000,"up":"-10","type":"同比上周"},
			],
			chartData:{
				columns: ['date', 'orderCount','orderAmount'],
				rows: [
				   {date: '2018-11-01', orderCount: 10, orderAmount: 1093},
				  {date: '2018-11-02', orderCount: 20, orderAmount: 2230},
				  {date: '2018-11-03', orderCount: 33, orderAmount: 3623},
				  {date: '2018-11-04', orderCount: 50, orderAmount: 6423},
				  {date: '2018-11-05', orderCount: 80, orderAmount: 8492},
				  {date: '2018-11-06', orderCount: 60, orderAmount: 6293},
				  {date: '2018-11-07', orderCount: 20, orderAmount: 2293},
				  {date: '2018-11-08', orderCount: 60, orderAmount: 6293},
				  {date: '2018-11-09', orderCount: 50, orderAmount: 5293},
				  {date: '2018-11-10', orderCount: 30, orderAmount: 3293},
				  {date: '2018-11-11', orderCount: 20, orderAmount: 2293},
				  {date: '2018-11-12', orderCount: 80, orderAmount: 8293},
				  {date: '2018-11-13', orderCount: 100, orderAmount: 10293},
				  {date: '2018-11-14', orderCount: 10, orderAmount: 1293},
				  {date: '2018-11-15', orderCount: 40, orderAmount: 4293}
				]
			},
			loading: false,
			dataEmpty: false,
			 chartSettings: {
			  xAxisType: 'time',
			  area:true,
			  axisSite: { right: ['orderAmount']},
			labelMap: {'orderCount': '订单数量', 'orderAmount': '订单金额'}},
			
		}
	}  
  }
</script>

<style scoped>
	.app-container {margin-top: 40px;margin-left: 40px;margin-right: 40px;}
	.total-layout {margin-top: 20px;}
	.total-frame {border: 1px solid #DCDFE6;padding: 20px;height: 100px; display: flex;}
	.total-icon {color: #409EFF;width: 60px;height: 60px; margin-right:10px;}
	.total-title {font-size: 16px;color: #909399;}
	.total-value {font-size: 18px;color: #606266;}
	.un-handle-layout{border: 1px solid #DCDFE6; margin-top:20px;}
	.layout-title {color: #606266; padding: 15px 20px; background: #F2F6FC; font-weight: bold;}
	.un-handle-content {padding: 20px 40px;}
	.un-handle-item {border-bottom: 1px solid #EBEEF5; padding: 10px; display: flex; justify-content: space-between;}
	
	.overview-layout { margin-top: 20px; }
	.overview-item-value {font-size: 24px;text-align: center;}
	.overview-item-title {margin-top: 10px;text-align: center;}
	.out-border{border:1px solid #DCDFE6; }
	.statistics-layout {margin-top: 20px;border: 1px solid #DCDFE6;}
	.text1{color: #909399;font-size: 14px}
	.text2{color: #606266;font-size: 24px;padding: 10px 0;}
	.text3{color: #C0C4CC;}
	.stati-item{font-size:14px;padding-left:20px;}
	.myitem{margin-top:20px;}
	.left-line{padding: 10px;border-left:1px solid #DCDFE6}
</style>
