<template>
	<div>
		<!--查询条件-->
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
			<span><i class="icon iconfont icon-sousuo-copy"></i> 筛选搜索</span>
			<el-button class="product-btn margin-btn"  type="button">重置</el-button>
			<el-button class="product-btn" type="primary" @click="handleSearchList()">查询</el-button>
		  </div>
		  <!--搜索表单项-->
		  <el-form ref="form" :model="listQuery" label-width="80px">
		    <el-form-item label="输入搜索:">
		     <el-input class="input-width"  v-model="listQuery.name" placeholder="商品名称"></el-input>
		    </el-form-item>
		  </el-form>		
		</el-card>
		
		<!--数据表格-->
		<div class="product-con">
			<template>
			  <el-table
				:data="list"
				border
				style="width: 100%">
				<el-table-column prop="id" label="编号">
				</el-table-column>
				<el-table-column label="商品图片" >
				  <template slot-scope="scope">
					  <img class="list-img" :src="scope.row.pic" />
				  </template>
				</el-table-column>
				<el-table-column
				  prop="name"
				  label="商品名称">
				</el-table-column>
				<el-table-column
				  label="价格/货号">
				  <template slot-scope="scope">
					  <div>价格：￥ {{scope.row.price}}</div>
					  <div>货号：{{scope.row.product_sn}}</div>
				  </template>
				</el-table-column>
				<el-table-column
				  label="标签">
				  <template slot-scope="scope">
					  <div>上架：{{scope.row.publish_status | statusFilter}}</div>
					  <div>新品：{{scope.row.new_status | statusFilter}}</div>
					  <div>推荐：{{scope.row.recommand_status | statusFilter}}</div>
				  </template>
				</el-table-column>
				<el-table-column label="排序" prop="sort"></el-table-column>
				<el-table-column label="销量" prop="sale"></el-table-column>
				<el-table-column label="审核状态" prop="verify_status"></el-table-column>
				<el-table-column label="操作" >
					<template slot-scope="scope">
						<button>编辑</button>
						<button>删除</button>
					</template>
					
				</el-table-column>
			  </el-table>
			</template>
		</div>
	</div>	
</template>

<script>
	//引入获取商品列表的数据api
	import {fetchList,fetchCateList} from '../../../api/product';
	export default{
		name:'productList',
		data:function(){
			return{
				list:[] ,//接收从后台传过来的列表数据
				cateList:[],//接收 分类列表数据
				listQuery:{
					name:null,//商品名称
					pageNum:1,//商品显示的页码
					pageSize:10,//每页显示的数量
					publish_status:null,//上架状态
					verify_status:null,//审核状态
					product_sn:null,//商品货号
					product_category_id:null,//商品分类的id
					brand_id:null //品牌的id
				}
			}
		},
		mounted:function(){
			//获取列表数据
			this.getList();
			
			//获取分类列表数据
			this.getCateList();
		},
		methods:{
			getList:function(){
				console.log(this.listQuery);
				//获取数据
				fetchList(this.listQuery).then(res=>{
					console.log(res);
					this.list = res.product;
				})
			},
			getCateList:function(){
				//获取数据
				fetchCateList().then(res=>{
					console.log(res);
				})
			},
			//查询
			handleSearchList:function(){
				this.getList();
			}
		},
		filters:{
			//上架、新品、推荐的状态
			statusFilter(value){
				if(value === 1){
					return "是";
				}else{
					return "否";
				}
			},
			//审核状态的过滤器，审核通过，未审核
			
		}
		
	}
</script>

<style scoped="scoped" lang="scss">
	.product-con{
		margin:10px;
		.list-img{width: 80px;}
	}
	.box-card{
		margin:10px;
		.product-btn{
			float: right; 
			padding: 5px 10px;
			
		}
		.margin-btn{margin-left:10px;}
		.input-width{width: 200px;}
	}
	
</style>
