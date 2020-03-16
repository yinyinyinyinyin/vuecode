<template>
	<div class="addproduct">
		<el-card class="box-card">
			<span><i class="icon iconfont icon-dingdan1"></i> 填写商品信息</span>
		</el-card>
		<!--:model绑定的内容就是我们要提交到后台的内容  -->
		<!--:rules 验证条件-->
		<el-form :model="productValue" :rules="rules" ref="productValue" label-width="140px" class="add-product-form" >
		  <el-form-item label="商品分类:" prop="product_category_id">
		      <el-cascader class="input-width"  placeholder="请选择"  clearable
		        v-model="selectProductCateValue"
		        :options="productCateOptions"
		       ></el-cascader>
		  </el-form-item>
		  <el-form-item label="商品名称:" prop="name">
		    <el-input v-model="productValue.name" class="input-width"></el-input>
		  </el-form-item>
		  <el-form-item label="副标题:" prop="sub_title">
		     <el-input v-model="productValue.sub_title" class="input-width"></el-input>
		  </el-form-item>
		  <el-form-item label="商品品牌:" prop="brand_id">
		     <el-select v-model="productValue.brand_id" placeholder="请选择品牌"  class="input-width" >
		          <el-option v-for="item in brandOptions"
					   :key = "item.id" :label="item.name" :value="item.id"
					   ></el-option>
		        </el-select>
		  </el-form-item>
		  <el-form-item label="商品介绍:" prop="description">
		     <el-input v-model="productValue.description" class="input-width"></el-input>
		  </el-form-item>
		  <el-form-item label="图片链接地址:" prop="pic">
		     <el-input v-model="productValue.pic" class="input-width"></el-input>
		  </el-form-item>
		  <el-form-item label="商品货号:" prop="product_sn">
		     <el-input v-model="productValue.product_sn" class="input-width"></el-input>
		  </el-form-item>
		  <el-form-item label="商品售价:" prop="price">
		     <el-input v-model="productValue.price" class="input-width"></el-input>
		  </el-form-item>
		  <el-form-item label="市场价:" prop="original_price">
		     <el-input v-model="productValue.original_price" class="input-width"></el-input>
		  </el-form-item>
		  <el-form-item label="商品库存:" prop="stock">
		     <el-input v-model="productValue.stock" class="input-width"></el-input>
		  </el-form-item>
		  <el-form-item label="计量单位:" prop="unit">
		     <el-input v-model="productValue.unit" class="input-width"></el-input>
		  </el-form-item>
		  <el-form-item label="商品重量:" prop="weight">
		     <el-input v-model="productValue.weight" class="input-width"></el-input>克
		  </el-form-item>
		  <el-form-item label="排序:" prop="sort">
		     <el-input v-model="productValue.sort" class="input-width"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('productValue')">立即创建</el-button>
		    <el-button @click="resetForm('productValue')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	//http://yinruifang.cn/index/Api/product_cate_one?id=7  通过 id获取该条商品分类信息
	//http://yinruifang.cn/index/Api/brand_one?id=49   通过  id获取该条商品品牌信息
	
	//引入获取商品列表的数据api
	import {fetchCateList,fetchBrandList,createProduct} from '../../../api/product';
	export default{
		name:'addpoduct',
		data:function(){
			return {
				//商品的默认数据
				productValue:{//需要提交的数据
					brand_id: null,//商品品牌id
					brand_name: '',//商品品牌名称
					delete_status: 0,//删除标志位，默认填0，表示未删除
					description: '',//商品介绍
					name: '',//商品名称
					original_price: 0,//市场价
					pic: '',//商品图片的url地址
					price: 0,//商品售价
					product_category_id: null,//分类id
					product_category_name: '',//分类名称
					product_sn: '',//商品货号
					sort: 0,//排序
					stock: 0,//商品库存
					sub_title: '',//副标题
					unit: '',//计量单位
					weight: 0,//商品重量
					sale:0,//商品销量
					publish_status:0,//上架
					new_status:0,//新品
					recommand_status:0,//推荐
					verify_status:0//审核状态  默认是未审核
				},				
				rules:{//验证条件
					name:[
						{required:true,message:'请输入商品名称',trigger:'blur'},
						{min:2,max:140,message:'长度在2-140个字符',trigger:'blur'}
					],
					sub_title:[{required:true,message:'请输入商品副标题',trigger:'blur'}],
					product_category_id:[{required:true,message:'请选择商品分类',trigger:'blur'}],
					brand_id:[{required:true,message:'请选择商品品牌',trigger:'blur'}],
					description:[{required:true,message:'请输入商品介绍',trigger:'blur'}],
					pic:[{required:true,message:'请输入图片地址',trigger:'blur'}],
				},
				//商品分类
				productCateOptions:[],
				selectProductCateValue:null,// 选中的内容
				brandOptions:[],//品牌options数据

			}
		},
		watch:{
			//监听级联选择器的option是不是发生变化了
			selectProductCateValue:function(newValue){
				console.log(newValue);
				if(newValue !== null && newValue.length === 2){
					this.productValue.product_category_id = newValue[1];//给product_category_id赋值小类的id号
				}else{
					this.productValue.product_category_id = null;
				}
			}
		},
		mounted:function(){
			//调用商品分类
			this.getCateList();
			//获取品牌列表
			this.getBrandList();
		},
		methods:{
			//提交表单  formName 表单的名字
			submitForm:function(formName){
				console.log(formName);
				this.$refs[formName].validate((valid)=>{
					if(valid){//验证通过
						//查找选中的brand的名称
						for(var i = 0;i<this.brandOptions.length;i++){
							if(this.brandOptions[i].id == this.productValue.brand_id){
								this.productValue.brand_name = this.brandOptions[i].name;
								break;
							}
						}
						//查找选中的分类的id对应的名称
						for(var i = 0;i<this.productCateOptions.length;i++){
							for(var j = 0;j<this.productCateOptions[i].children.length;j++){
								
								if(this.productCateOptions[i].children[j].value == this.productValue.product_category_id){
									this.productValue.product_category_name = this.productCateOptions[i].children[j].label;
									break;
								}
							}
						}
						//
						//传到后台的参数
						console.log(this.productValue);
						//调用后台接口
						createProduct(this.productValue).then(res=>{
							console.log(res);
							if(res.type ==='success'){//添加成功
								this.$message({
									message:'成功添加商品',
									duration:1000,
									type:'success'
								})
								//跳转到列表页
								this.$router.push('/pms/product');
							}
						})
					}
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
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.addproduct{
		margin:10px;
		.add-product-form{
			margin:50px 0px;
		}
		.input-width{width:400px;}
	}
</style>
