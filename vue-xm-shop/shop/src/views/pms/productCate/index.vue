<template>
	<div class="product-cate-con">
		<!--标题，添加按钮-->
		<el-card class="box-card">
		    <span><i class="icon iconfont icon-dingdan1"></i> 商品分类数据列表</span>
		    <el-button  type="primary" class="product-btn" size="mini" @click="goAddProductCate">添加</el-button> 
			<el-button type="primary" class="product-btn margin-btn" v-if="parent_id" size="mini" @click="handleBack">返回上一级</el-button> 
		</el-card>
	
		<div class="product-con">
			<template>
			  <el-table
				:data="list"
				border
				style="width: 100%">
				<el-table-column prop="id" label="编号">
				</el-table-column>
				<el-table-column label="分类名称" prop="name"> 
				</el-table-column>
				<el-table-column  label="级别">
					<template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
				</el-table-column>
				<el-table-column  prop="product_count"  label="商品数量">	
				</el-table-column>
				<el-table-column  prop="product_unit"  label="数量单位">	
				</el-table-column>
				<el-table-column  prop="show_status"  label="是否显示">
				</el-table-column>
				<el-table-column  prop="sort"  label="排序">
				</el-table-column>
				<el-table-column  prop="sort"  label="设置" width="100">
					<template slot-scope = "scope">
						<el-button size="mini" @click="handleShowNextLevel(scope.row) " 
						 :disabled="scope.row.level | disableNextLevel"
						 >查看下级</el-button>
					</template>	
				</el-table-column>
				<el-table-column  prop="sort"  label="操作" width="160">
					<template slot-scope = "scope">
						<el-button size="mini" >编辑</el-button>
						<el-button size="mini" type="danger" >删除</el-button>
					</template>
				</el-table-column>
			  </el-table>
			</template>
		</div>
		<!--分页-->
		 <el-pagination class="marginB"
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="listQuery.pageNum"
	      :page-sizes="[5,10,15]"
	      :page-size="listQuery.pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total">
	    </el-pagination>
	</div>
</template>

<script>
	import {fetchProductCate1or2} from '@/api/product';
	
	export default{
		name:'productCateList',
		data:function(){
			return{
				list:[],
				parent_id:0, //初始显示的是一级节点
				listQuery:{
					pageNum:1,
					pageSize:5
				},
				total:0
			}
		},
		mounted:function(){
			//重新获取一下parent_id
			this.resetParentId();
			//获取数据
			this.getList();
		},
		filters:{
			levelFilter:function(value){
				if(value === 0){
					return '一级'; 
				}else{
					return '二级';
				}
			},
			//查看下一级的按钮是否置灰
			disableNextLevel:function(value){
				if(value == 0){//一级
					return false;
				}else{
					return true;
				}
			}
		},
		watch:{
			$route(route){
				//重新获取一下parent_id
				this.resetParentId();
				//获取数据
				this.getList();
			}
		},
		methods:{
			//重置parent_id:如果 query传了parentid就赋值，如果没传就是赋值为0
			resetParentId:function(){
				if(this.$route.query.parentId != null){
					this.parent_id = this.$route.query.parentId;
				}else{
					this.parent_id = 0;
				}
			},
			//获取数据
			getList:function(){
				fetchProductCate1or2(this.parent_id,this.listQuery).then(res=>{
					console.log(res);
					this.list = res.data;
					this.total = res.total;
				})
			},
			//跳转到添加分类页面
			goAddProductCate:function(){
				
			},
			//更改每页多少条数据
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.listQuery.pageNum = 1;
				this.listQuery.pageSize = val;
				this.getList();		
			},
			//更改当前页
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.listQuery.pageNum = val;
				this.getList();
			},
			//查看下级节点数据
			handleShowNextLevel:function(row){
				//路由跳转
				this.$router.push({path:'/pms/productCate',query:{parentId:row.id}});
				
			},
			//返回上一级
			handleBack:function(){
				this.$router.push({path:'/pms/productCate'});
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.product-cate-con{
		margin:10px;
		.product-btn{float:right;}
		}
	.margin-btn{margin-right:10px;}	
</style>
