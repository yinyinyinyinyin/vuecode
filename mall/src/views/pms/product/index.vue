<template> 
	<div class="app-container">
	<!--筛选搜索-->
	<el-card class="box-card pro-search" shadow="never">
	  <div slot="header" class="clearfix">
	    <span><i class=" icon iconfont  my-icon icon-sousuo-copy" ></i>筛选搜索</span>
		<el-button class="btn-add" size="mini"  type="primary" @click="handleSearchList()">查询结果</el-button>
	    <el-button class="btn-add" size="mini" @click="handleResetSearch()">重置</el-button>
		
	  </div>
	  <div >
	    <el-form class="myform" ref="form" :model="listQuery" size="small" label-width="100px">
			<el-form-item label="输入搜索:">
				<el-input class="input-width" v-model="listQuery.name" placeholder="商品名称"></el-input>
			</el-form-item>
			<el-form-item label="商品货号:">
				<el-input class="input-width" v-model="listQuery.product_sn" placeholder="商品货号"></el-input>
			</el-form-item>
			<el-form-item label="商品分类:">
				<el-cascader class="input-width"
				  clearable
				  v-model="selectProductCateValue"
				  :options="productCateOptions">
				</el-cascader>
			</el-form-item>
			<el-form-item label="商品品牌:">
			  <el-select class="input-width" v-model="listQuery.brand_id" placeholder="请选择品牌" clearable>
			    <el-option 
			      v-for="item in brandOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="上架状态:">
			  <el-select class="input-width" v-model="listQuery.publish_status" placeholder="全部" clearable>
			    <el-option 
			      v-for="item in publishStatusOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</el-form-item>
			<el-form-item label="审核状态:">
			  <el-select v-model="listQuery.verify_status" class="input-width" placeholder="全部" clearable>
			    <el-option
			      v-for="item in verifyStatusOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</el-form-item>
	    </el-form>
	  </div>
	</el-card>
	
	
	
	<!--数据title及添加按钮-->
	<el-card class="box-card pro-title" shadow="never">
		<span>
			<i class=" icon iconfont  my-icon icon-dingdan1" ></i> 
			<span>数据列表</span>
		</span>
	    <el-button class="btn-add" size="mini">添加</el-button>
	   
	</el-card>

	<!--显示商品列表-->
	<template>
		<el-table :data="list" border style="width: 100%">
			<el-table-column prop="id" label="编号"></el-table-column>
			<el-table-column label="商品图片" >
				<template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
			</el-table-column>
			<el-table-column label="商品名称" prop="name"   align="center"></el-table-column>
			<el-table-column  label="价格/货号">
				<template slot-scope="scope"><p>价格：￥{{scope.row.price}}</p> <p>货号：{{scope.row.product_sn}}</p></template>
			</el-table-column>
			<el-table-column label="标签" align="center">
			  <template slot-scope="scope">
				<p>上架：{{scope.row.publish_status|statusFilter}}</p>
				<p>新品：{{scope.row.new_status|statusFilter}}</p>
				<p>推荐：{{scope.row.recommand_status|statusFilter}}</p>
			  </template>
			</el-table-column>
			<el-table-column label="排序" prop="sort"  align="center"></el-table-column>
			<el-table-column label="销量"  align="center" prop="sale"></el-table-column>
			<el-table-column label="审核状态"  align="center">
				<!--过滤器-->
				<template slot-scope="scope"> <p>{{scope.row.verifyStatus | verifyStatusFilter}}</p></template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="150">
			  <template slot-scope="scope">
				  <el-button
					size="mini"
					@click="handleUpdateProduct(scope.$index, scope.row)">编辑
				  </el-button>
				  <el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">删除
				  </el-button>
			  </template>
			</el-table-column>
		</el-table>
	</template>
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
   
   </div> 
</template>	
<script>
  import {fetchList,fetchListWithChildren,fetchBrandList,updateDeleteStatus } from '@/api/product';
  //默认查询调件
  const defaultListQuery = {
    name: null,
    pageNum: 1,
    pageSize: 5,
    publish_status: null,
    verify_status: null,
    product_sn: null,
    product_category_id: null,
    brand_id: null
  };
  
  export default {
    name: "productList",
    data() {
      return {
		  list:[],
		  total: null,
		  listQuery: Object.assign({}, defaultListQuery),//查询条件
		  productCateOptions:[],//商品分类
		  selectProductCateValue: null,//选择的商品分类
		  brandOptions:[],//商品品牌
		  //审核状态
		  verifyStatusOptions: [{
		    value: 1,
		    label: '审核通过'
		  }, {
		    value: 0,
		    label: '未审核'
		  }],
		  publishStatusOptions: [
			  {value: 1,label: '上架'}, 
			  {value: 0,label: '下架'}
		  ],
		 
       }
    },
	created:function(){
		//获取列表数据
		this.getList();
		//获取商品分类信息
		this.getProductCateList();
		//获取品牌信息
		this.getBrandList();
	},
	watch: {
		//商品分类的检测
	  selectProductCateValue: function (newValue) {
	    if (newValue != null && newValue.length == 2) {
	      this.listQuery.product_category_id = newValue[1];
	    } else {
	      this.listQuery.product_category_id = null;
	    }
	  }
	},
	filters: {
		//审核状态过滤器
	  verifyStatusFilter(value) {
	    if (value === 1) {
	      return '审核通过';
	    } else {
	      return '未审核';
	    }
	  },
	  //上架、新品、推荐的状态过滤器
	  statusFilter(value) {
		  if(value === 1){
			  return "是";
		  }else{
			  return "否";
		  }
	  }
	},
	methods:{
		//获取商品列表
		getList:function(){
			fetchList(this.listQuery).then(res=>{
				console.log(res);
				this.list = res.product;
				this.total = res.total;
			})
		},
		//获取商品分类信息
		getProductCateList() {
		  fetchListWithChildren().then(response => {
		    let list = response.data;
		    this.productCateOptions = [];
		    for (let i = 0; i < list.length; i++) {
		      let children = [];
		      if (list[i].children != null && list[i].children.length > 0) {
		        for (let j = 0; j < list[i].children.length; j++) {
		          children.push({label: list[i].children[j].name, value: list[i].children[j].id});
		        }
		      }
		      this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
		    }
		  });
		},
		//获取品牌列表
		getBrandList() {
		  fetchBrandList().then(response => {
		    this.brandOptions = [];
		    let brandList = response.data;
		    for (let i = 0; i < brandList.length; i++) {
		      this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
		    }
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
		//按照查询条件搜索
		handleSearchList() {
		  this.listQuery.pageNum = 1;
		  this.getList();
		},
		//删除一条信息
		handleDelete(index, row){
		  this.$confirm('是否要进行删除操作?', '提示', {
		    confirmButtonText: '确定',
		    cancelButtonText: '取消',
		    type: 'warning'
		  }).then(() => {
			console.log(row.id);
			updateDeleteStatus({'id':row.id}).then(res=>{
					console.log(res);
					console.log(res.type);
					if(res.type == 'success'){
						this.getList();
					}
					 
			});
		  });
		},
		//修改一条记录
		handleUpdateProduct(index,row){
		  this.$router.push({path:'/pms/updateProduct',query:{id:row.id}});
		},
		//重置查询条件
		handleResetSearch() {
		  this.selectProductCateValue = [];
		  this.listQuery = Object.assign({}, defaultListQuery);
		  this.getList();
		},
		
	}
  }
</script>
<style scoped="scoped"  lang="scss">
	.pro-title{margin-bottom:20px; }
	.pro-search{margin-bottom:20px;}
	.btn-add{float:right; margin-right:10px;}
	.my-icon{margin-right: 10px;}
	.input-width{width:140px;}
	.myform{display: flex; flex-wrap: wrap; flex-direction: row; justify-content: space-around;}
</style>


