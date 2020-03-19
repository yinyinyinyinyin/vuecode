<template>
	<div class="app-container">
		<el-card class="box-card pro-title" shadow="never">
		 	<span>
		 		<i class=" icon iconfont  my-icon icon-dingdan1" ></i> 
		 		<span>数据列表</span>
				<el-button class="btn-add" size="mini"   @click="handleAddList()">添加</el-button>
				<el-button class="btn-add" size="mini" v-if="parent_id "   @click="handleBack()">返回上级节点</el-button>
		 	</span>    
		</el-card>
		<div class="table-container">
			<el-table ref="productCateTable"
			          style="width: 100%"
			          :data="list"
			          v-loading="listLoading" border>
			  <el-table-column label="编号"  align="center">
			    <template slot-scope="scope">{{scope.row.id}}</template>
			  </el-table-column>
			  <el-table-column label="分类名称" align="center">
			    <template slot-scope="scope">{{scope.row.name}}</template>
			  </el-table-column>
			  <el-table-column label="级别"  align="center">
			    <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
			  </el-table-column>
			  <el-table-column label="商品数量"  align="center">
			    <template slot-scope="scope">{{scope.row.product_count }}</template>
			  </el-table-column>
			 <el-table-column label="数量单位"  align="center">
			    <template slot-scope="scope">{{scope.row.product_unit }}</template>
			  </el-table-column>
			  <el-table-column label="是否显示" width="100" align="center">
			    <template slot-scope="scope">
			      <el-switch
			        @change="handleShowStatusChange(scope.$index, scope.row)"
			        :active-value="1"
			        :inactive-value="0"
			        v-model="scope.row.show_status">
			      </el-switch>
			    </template>
			  </el-table-column>
			  <el-table-column label="排序"  align="center">
			    <template slot-scope="scope">{{scope.row.sort }}</template>
			  </el-table-column>
			  <el-table-column label="设置" width="100" align="center">
			    <template slot-scope="scope">
			      <el-button
			        size="mini"
			        :disabled="scope.row.level | disableNextLevel"
			        @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
			      </el-button>
			    </template>
			  </el-table-column>
			  <el-table-column label="操作" width="150" align="center">
			    <template slot-scope="scope">
			      <el-button
			        size="mini"
			        @click="handleUpdate(scope.$index, scope.row)">编辑
			      </el-button>
			      <el-button
			        size="mini"
			        type="danger"
			        @click="handleDelete(scope.$index, scope.row)">删除
			      </el-button>
			    </template>
			  </el-table-column>
			</el-table>
		</div>
		<div class="pagination-container">
		  <el-pagination
		    background
		    @size-change="handleSizeChange"
		    @current-change="handleCurrentChange"
		    layout="total, sizes,prev, pager, next,jumper"
		    :page-size="listQuery.pageSize"
		    :page-sizes="[5,10,15]"
		    :current-page.sync="listQuery.pageNum"
		    :total="total">
		  </el-pagination>
		</div>
	</div>
</template>

<script>
	import {fetchCategoryList,updateShowStatus,deleteProductCate} from '@/api/product';;
	export default{
		name: "productCateList",
		data:function(){
			 return {
				 list: null,
				 parent_id:0,
				 listLoading: true,
				 total:null,
				 listQuery: {
				   pageNum: 1,
				   pageSize: 5
				 },
			 }
		},
		created() {
			//重置父级节点id
			this.resetParentId();
		    this.getList();
		},
		watch: {
		  $route(route) {
		    this.resetParentId();
		    this.getList();
		  }
		},
		filters: {
		//级别过滤器
		  levelFilter(value) {
		    if (value === 0) {
		      return '一级';
		    } else if (value === 1) {
		      return '二级';
		    }
		  },
		   disableNextLevel(value) {
		     if (value === 0) {
		       return false;
		     } else {
		       return true;
		     }
		   }
		},
		methods:{
			resetParentId(){
			  if (this.$route.query.parentId != null) {
			    this.parent_id = this.$route.query.parentId;
			  } else {
			    this.parent_id = 0;
			  }
			},
			getList() {
			  this.listLoading = true;
			  console.log(this.parent_id);
			  fetchCategoryList(this.parent_id,this.listQuery).then(res => {
				  console.log(res);
			    this.listLoading = false;
			    this.list = res.data;
			    this.total = res.total;
			  });
			},
			//修改是否显示的函数
			handleShowStatusChange(index, row) {
			  updateShowStatus({"id":row.id,"show_status":row.show_status}).then(res=>{
				  console.log(res);
				  if(res.type === "success"){
					  this.$message({
					    message: '修改成功',
					    type: 'success',
					    duration: 1000
					  });
				  }
			  });
			},
			//查看下级节点
			handleShowNextLevel(index, row){
				this.$router.push({path: '/pms/productCate', query: {parentId: row.id}})
			},
			//如果是二级节点
			handleBack(){
				this.$router.push({path: '/pms/productCate' })
			},
			//删除一条记录
			handleDelete(index, row){
				this.$confirm('是否要删除该品牌', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  deleteProductCate({"id":row.id}).then(res => {
					  if(res.type === 'success' ){
						  this.$message({
						    message: '删除成功',
						    type: 'success',
						    duration: 1000
						  });
						  this.getList();
					  }
				  });
				});
			},
			//添加一条记录
			handleAddList(){
				this.$router.push('/pms/addProductCate');
			},
			//修改一条记录
			handleUpdate(index, row){
				this.$router.push({path:'/pms/updateProductCate',query:{id:row.id}});
			},
			handleSizeChange(val) {
			  this.listQuery.pageNum = 1;
			  this.listQuery.pageSize = val;
			  this.getList();
			},
			handleCurrentChange(val) {
			  this.listQuery.pageNum = val;
			  this.getList();
			},
			
			
		} 
	}
</script>

<style scoped="scoped">
	.pro-title{margin-bottom:20px; }
	.my-icon{margin-right: 10px;}
	.btn-add{float:right; margin-right:10px;}
</style>
