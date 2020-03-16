<template>
	<div>
		<!--查询条件-->
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
			<span><i class="icon iconfont icon-sousuo-copy"></i> 筛选搜索</span>
			<el-button class="product-btn margin-btn"  type="button" @click = "handleresetList()">重置</el-button>
			<el-button class="product-btn" type="primary" @click="handleSearchList()">查询</el-button>
		  </div>
		  <!--搜索表单项-->
		  <el-form class="product-form" ref="form" :model="listQuery" label-width="80px">
		    <el-form-item label="输入搜索:">
		     <el-input class="input-width"  v-model="listQuery.name" placeholder="商品名称"></el-input>
		    </el-form-item>
			<el-form-item label="商品货号:">
			 <el-input class="input-width"  v-model="listQuery.product_sn" placeholder="商品货号"></el-input>
			</el-form-item>
			<el-form-item label="上架状态:">
			  <el-select v-model="listQuery.publish_status" placeholder="全部" class="input-width" >
			       <el-option v-for="item in publishStatusOptions"
				   :key = "item.value" :label="item.label" :value="item.value"
				   ></el-option>
			     </el-select>
			</el-form-item>
			<!--审核状态-->
			
			<!--品牌-->
			<el-form-item label="商品品牌:">
			  <el-select v-model="listQuery.brand_id" placeholder="请选择品牌"  class="input-width" >
			       <el-option v-for="item in brandOptions"
				   :key = "item.id" :label="item.name" :value="item.id"
				   ></el-option>
			     </el-select>
			</el-form-item>
			
			<!--商品分类-->
			<el-form-item label="商品分类:">
			  <el-cascader class="input-width"  placeholder="请选择"  clearable
			    v-model="selectProductCateValue"
			    :options="productCateOptions"
			   ></el-cascader>
			</el-form-item> 
		  </el-form>		
		</el-card>
		
		<!--标题，添加按钮-->
		<el-card class="box-card">
		    <span><i class="icon iconfont icon-dingdan1"></i> 数据列表</span>
		    <el-button  type="primary" class="product-btn" @click="goAddProduct">添加</el-button>
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
				<el-table-column label="操作" width="150" >
					<template slot-scope="scope" >
						<el-button type="primary" size="mini"  @click="handleUpdateProduct(scope.row)" >编辑</el-button>
						<el-button type="danger" size="mini" @click="handleDeleteProduct(scope.row)">删除</el-button>
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
	//引入获取商品列表的数据api
	import {fetchList,fetchCateList,fetchBrandList,deleteProduct} from '../../../api/product';
	export default{
		name:'productList',
		data:function(){
			return{
				list:[] ,//接收从后台传过来的列表数据
				total:0,
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
				},
				//上架状态数组
				publishStatusOptions:[
					{value:1,label:'上架'},
					{value:0,label:'下架'}
				],
				//审核状态*****
				
				//品牌列表
				brandOptions:[],
				//商品分类
				productCateOptions:[],
				selectProductCateValue:null// 选中的内容
			}
		},
		watch:{
			//监听级联选择器的option是不是发生变化了
			selectProductCateValue:function(newValue){
				console.log(newValue);
				if(newValue !== null && newValue.length === 2){
					this.listQuery.product_category_id = newValue[1];//给product_category_id赋值小类的id号
				}else{
					this.listQuery.product_category_id = null;
				}
			}
		},
		mounted:function(){
			//获取列表数据
			this.getList();
			
			//获取分类列表数据
			this.getCateList();
			
			//获取品牌列表
			this.getBrandList();
		},
		methods:{
			getList:function(){
				console.log(this.listQuery);
				//获取数据
				fetchList(this.listQuery).then(res=>{
					console.log(res);
					this.list = res.product;
					this.total = res.total;
				})
			},
			//获取分类列表
			getCateList:function(){
				//获取数据
				fetchCateList().then(res=>{
					console.log(res);
					//重组数据
					let list = res.data;
					this.productCateOptions = [];
					for(var i = 0;i<list.length;i++){
						let children = [];
						if(list[i].children != null && list[i].children.length>0){//表示分类有子级节点
							for(var j = 0;j<list[i].children.length;j++){//将子级节点循环
								children.push({label:list[i].children[j].name,value:list[i].children[j].id});	
							}
						}
						this.productCateOptions.push({label:list[i].name,value:list[i].id,children:children});
					}
					console.log(this.productCateOptions);
				})
			},
			//获取品牌列表
			getBrandList:function(){
				fetchBrandList().then(res=>{
					this.brandOptions = res.data;
				})
			},
			//查询
			handleSearchList:function(){
				this.getList();
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
			goAddProduct:function(){
				//跳转到添加商品页面
				this.$router.push("/pms/addproduct");
			},
			//重置查询条件
			handleresetList:function(){
				this.listQuery = {
					name:null,//商品名称
					pageNum:1,//商品显示的页码
					pageSize:10,//每页显示的数量
					publish_status:null,//上架状态
					verify_status:null,//审核状态
					product_sn:null,//商品货号
					product_category_id:null,//商品分类的id
					brand_id:null 
				}
				this.selectProductCateValue = null;
				//重置后再一次获取数据
				this.getList();	
			},
			//修改一条记录
			handleUpdateProduct:function(row){
				//跳转到修改页面
				this.$router.push({path:'/pms/updateproduct',query:{id:row.id}});
			},
			//删除
			handleDeleteProduct:function(row){
				//提示框
				this.$confirm('是否要进行删除操作？','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					console.log(row.id);
					//调用后台接口，删除该条数据
					deleteProduct({'id':row.id}).then(res=>{
						console.log(res);
						if(res.type === 'success'){
							this.getList();
						}
					})
				})
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
		.input-width{width: 160px;}
	}
	.product-form{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.marginB{margin-bottom: 50px; text-align:right;}
	
</style>
