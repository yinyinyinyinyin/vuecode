<template>
	<div class="app-container">
		<el-card class="box-card pro-title" shadow="never">
		 	<span>
		 		<i class=" icon iconfont  my-icon icon-dingdan1" ></i> 
		 		<span>商品类型数据列表</span>
				<el-button class="btn-add" size="mini"   @click="handleAddList()">添加</el-button>
		 	</span>    
		</el-card>
		<div class="table-container">
		  <el-table ref="productAttrCateTable"
		            style="width: 100%"
		            :data="list"
		            v-loading="listLoading"
		            border>
		    <el-table-column label="编号" width="100" align="center">
		      <template slot-scope="scope">{{scope.row.id}}</template>
		    </el-table-column>
		    <el-table-column label="类型名称" align="center">
		      <template slot-scope="scope">{{scope.row.name}}</template>
		    </el-table-column>
		    <el-table-column label="属性数量" width="200" align="center">
		      <template slot-scope="scope">{{scope.row.attribute_count==null?0:scope.row.attribute_count}}</template>
		    </el-table-column>
		    <el-table-column label="参数数量" width="200" align="center">
		      <template slot-scope="scope">{{scope.row.param_count==null?0:scope.row.param_count}}</template>
		    </el-table-column>
		    <el-table-column label="操作" width="200" align="center">
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
		<el-dialog
		  :title="dialogTitle"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <el-form ref="productAttrCatForm" :model="productAttrCate" :rules="rules" label-width="120px">
		    <el-form-item label="类型名称" prop="name">
		      <el-input v-model="productAttrCate.name" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleConfirm('productAttrCatForm')">确 定</el-button>
		  </span>
		</el-dialog>	
	</div>
	
</template>

<script>
	import {fetchProductAttrList,createProductAttrList,updateProductAttrList,deleteProductAttrList} from '@/api/product';;
	export default{
		name: "productAttrCateList",
		data:function(){
			 return {
				list:null,
				total:null,
				listLoading: true,
				listQuery:{
					pageNum:1,
					pageSize:5
				},
				dialogVisible: false,
				dialogTitle:'',
				productAttrCate:{
				  name:'',
				  id:null
				},
				rules: {
				  name: [
				    { required: true, message: '请输入类型名称', trigger: 'blur' }
				  ]
				},
				defaultProductAttr:{
				  "name":"",
				  "attribute_count":0,
				  "param_count":0
				}
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
			  fetchProductAttrList(this.listQuery).then(response => {
			    this.listLoading = false;
			    this.list = response.data;
			    this.total = response.total;
			  });
			},
			//每页多少条数据
			handleSizeChange(val) {
			  this.listQuery.pageNum = 1;
			  this.listQuery.pageSize = val;
			  this.getList();
			},
			//当前页
			handleCurrentChange(val) {
			  this.listQuery.pageNum = val;
			  this.getList();
			},
			//添加一条记录
			handleAddList(){
				this.dialogVisible = true;
				this.dialogTitle = "添加类型";
			},
			//删除一条记录
			handleDelete(index, row) {
			  this.$confirm('是否要删除该品牌', '提示', {
			    confirmButtonText: '确定',
			    cancelButtonText: '取消',
			    type: 'warning'
			  }).then(() => {
			    deleteProductAttrList({"id":row.id}).then(response=>{
			      this.$message({
			        message: '删除成功',
			        type: 'success',
			        duration:1000
			      });
			      this.getList();
			    });
			  });
			},
			//修改一条记录
			handleUpdate(index,row){
				this.dialogVisible = true;
				this.dialogTitle = "编辑类型";
				this.productAttrCate.name = row.name;
				this.productAttrCate.id = row.id;
			},
			//添加或修改提交表单
			handleConfirm(formName){
				  this.$refs[formName].validate((valid) => {
				    if (valid) {
					  this.defaultProductAttr["name"] = this.productAttrCate.name;
				      if(this.dialogTitle==="添加类型"){
				        createProductAttrList(this.defaultProductAttr).then(response=>{
				          this.$message({
				            message: '添加成功',
				            type: 'success',
				            duration:1000
				          });
				          this.dialogVisible = false;
				          this.getList();
				        });
				      }else{
						this.defaultProductAttr["id"] = this.productAttrCate.id;
				        updateProductAttrList(this.defaultProductAttr).then(response=>{
				          this.$message({
				            message: '修改成功',
				            type: 'success',
				            duration:1000
				          });
				          this.dialogVisible = false;
				          this.getList();
				        });
				      }
				    } else {
				      console.log('error submit!!');
				      return false;
				    }
				  });
				
			}
			
		}	
	}
</script>

<style scoped="scoped">
	.pro-title{margin-bottom:20px; }
	.my-icon{margin-right: 10px;}
	.btn-add{float:right; margin-right:10px;}
</style>
