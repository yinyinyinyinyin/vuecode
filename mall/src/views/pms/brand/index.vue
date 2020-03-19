<template>
	<div class="app-container">
		<el-card class="box-card pro-title" shadow="never">
		 	<span>
		 		<i class=" icon iconfont  my-icon icon-dingdan1" ></i> 
		 		<span>品牌管理列表</span>
				<el-button class="btn-add" size="mini"   @click="handleAddList()">添加</el-button>
		 	</span>    
		</el-card>
		<div class="table-container">
		  <el-table ref="brandTable"
		            :data="list"
		            style="width: 100%"
		            v-loading="listLoading"
		            border>
		    <el-table-column type="selection"  align="center"></el-table-column>
		    <el-table-column label="编号"  align="center">
		      <template slot-scope="scope">{{scope.row.id}}</template>
		    </el-table-column>
		    <el-table-column label="品牌名称" align="center">
		      <template slot-scope="scope">{{scope.row.name}}</template>
		    </el-table-column>
		    <el-table-column label="品牌首字母"  align="center">
		      <template slot-scope="scope">{{scope.row.first_letter}}</template>
		    </el-table-column>
		    <el-table-column label="排序"  align="center">
		      <template slot-scope="scope">{{scope.row.sort}}</template>
		    </el-table-column>
		    <el-table-column label="品牌制造商"  align="center">
		      <template slot-scope="scope">
		        <el-switch
		          @change="handleFactoryStatusChange(scope.$index, scope.row)"
		          :active-value="1"
		          :inactive-value="0"
		          v-model="scope.row.factory_status">
		        </el-switch>
		      </template>
		    </el-table-column>
		    <el-table-column label="是否显示"  align="center">
		      <template slot-scope="scope">
		        <el-switch
		          @change="handleShowStatusChange(scope.$index, scope.row)"
		          :active-value="1"
		          :inactive-value="0"
		          v-model="scope.row.show_status">
		        </el-switch>
		      </template>
		    </el-table-column>
		    <el-table-column label="相关"  align="center">
		      <template slot-scope="scope">
		        <span>商品：</span>
		        <el-button
		          size="mini"
		          type="text"
		          @click="getProductList(scope.$index, scope.row)">100
		        </el-button><br/>
		        <span>评价：</span>
		        <el-button
		          size="mini"
		          type="text"
		          @click="getProductCommentList(scope.$index, scope.row)">1000
		        </el-button>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作" width="160" align="center">
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
		<!--显示分页-->
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
		<!--添加或修改的弹出框-->
		
	</div>
	
</template>

<script>
	import {fetchBrandListPag,deleteBrandList,updateFactoryStatusBrand,updateShowStatusBrand} from '@/api/product';
	export default{
		name: "brandList",
		data:function(){
			 return {
				list:null,
				total:null,
				listLoading: true,
				listQuery: {
				  keyword: null,
				  pageNum: 1,
				  pageSize: 5
				},
			 }
		},
		created() {
			this.getList();
		},	
		watch: {
	
		},
		filters: {
		
		},
		methods:{
			getList() {
			  this.listLoading = true;
			  fetchBrandListPag(this.listQuery).then(response => {
			    this.listLoading = false;
			    this.list = response.data;
			    this.total = response.total;
			  });
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
			//删除
			handleDelete(index,row){
				this.$confirm('是否要删除该品牌', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  deleteBrandList({"id":row.id}).then(response => {
				    this.$message({
				      message: '删除成功',
				      type: 'success',
				      duration: 1000
				    });
				    this.getList();
				  });
				});
			},
			//跳转到添加
			handleAddList(){
				this.$router.push({path: '/pms/addBrand'})
			},
			//修改品牌信息
			handleUpdate(index, row) {
			  this.$router.push({path: '/pms/updateBrand', query: {id: row.id}})
			},
			handleFactoryStatusChange(index, row) {
			  updateFactoryStatusBrand({"factory_status":row.factoryStatus}).then(response => {
			    this.$message({
			      message: '修改成功',
			      type: 'success',
			      duration: 1000
			    });
			  }).catch(error => {
			    if (row.factory_status === 0) {
			      row.factory_status = 1;
			    } else {
			      row.factory_status = 0;
			    }
			  });
			},
			handleShowStatusChange(index, row) {
			  updateShowStatusBrand({"show_status":row.show_status}).then(response => {
			    this.$message({
			      message: '修改成功',
			      type: 'success',
			      duration: 1000
			    });
			  }).catch(error => {
			    if (row.show_status === 0) {
			      row.show_status = 1;
			    } else {
			      row.show_status = 0;
			    }
			  });
			},
			
		}	
	}
</script>

<style scoped="scoped">
	.pro-title{margin-bottom:20px; }
	.my-icon{margin-right: 10px;}
	.btn-add{float:right; margin-right:10px;}
</style>
