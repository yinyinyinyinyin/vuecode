<template> 
 <div class="app-container">
	<el-card class="box-card pro-title" shadow="never">
	 	<span>
	 		<i class=" icon iconfont  my-icon icon-dingdan1" ></i> 
	 		<span>填写商品信息</span>
	 	</span>    
	</el-card>
	<el-form :model="productValue" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
	  <el-form-item label="商品分类：" prop="product_category_id">
	    <el-cascader
	      v-model="selectProductCateValue"
	      :options="productCateOptions" clearable
		  >
	    </el-cascader>
	  </el-form-item>
	  <el-form-item label="商品名称：" prop="name">
	    <el-input v-model="productValue.name"></el-input>
	  </el-form-item>
	  <el-form-item label="副标题：" prop="sub_title">
	    <el-input v-model="productValue.sub_title"></el-input>
	  </el-form-item>
	  <el-form-item label="商品品牌：" prop="brand_id">
		  <el-select class="input-width" v-model="productValue.brand_id" placeholder="请选择品牌" clearable>
		    <el-option 
		      v-for="item in brandOptions"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
	  </el-form-item>
	  <el-form-item label="商品介绍：" prop="description">
	    <el-input
	      :autoSize="true"
	      v-model="productValue.description"
	      type="textarea"
	      placeholder="请输入内容"></el-input>
	  </el-form-item>
	  <el-form-item label="图片链接地址：" prop="pic">
	    <el-input v-model="productValue.pic"></el-input>
	  </el-form-item>
	  <el-form-item label="商品货号：">
	    <el-input v-model="productValue.product_sn"></el-input>
	  </el-form-item>
	  <el-form-item label="商品售价：">
	    <el-input v-model="productValue.price"></el-input>
	  </el-form-item>
	  <el-form-item label="市场价：">
	    <el-input v-model="productValue.original_price"></el-input>
	  </el-form-item>
	  <el-form-item label="商品库存：">
	    <el-input v-model="productValue.stock"></el-input>
	  </el-form-item>
	  <el-form-item label="计量单位：">
	    <el-input v-model="productValue.unit"></el-input>
	  </el-form-item>
	  <el-form-item label="商品重量：">
	    <el-input v-model="productValue.weight" style="width: 300px"></el-input>
	    <span style="margin-left: 20px">克</span>
	  </el-form-item>
	  <el-form-item label="排序">
	    <el-input v-model="productValue.sort"></el-input>
	  </el-form-item>
	  <el-form-item style="text-align: center">
	    <el-button type="primary" size="medium" @click="handleSubmit('productInfoForm')">提交</el-button>
	  </el-form-item>
	</el-form>
 </div>
</template>
<script>
  //引入商品分类和商品品牌
  import {fetchListWithChildren, fetchBrandList, createProduct } from '@/api/product';
  export default {
    name: 'addProduct',
	data:function(){
		return {
			//商品信息默认值
			productValue:{
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
				sale:0//商品销量
			},
			rules: {//验证规则
			  name: [
			    {required: true, message: '请输入商品名称', trigger: 'blur'},
			    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
			  ],
			  sub_title: [{required: true, message: '请输入商品副标题', trigger: 'blur'}],
			  product_category_id: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
			  brand_id: [{required: true, message: '请选择商品品牌', trigger: 'change'}],
			  description: [{required: true, message: '请输入商品介绍', trigger: 'blur'}],
			  pic: [{required: true, message: '请输入商品的图片地址', trigger: 'blur'}],
			},
			productCateOptions:[],//分类
			selectProductCateValue: [],//选择的分类信息
			brandOptions:[]//品牌
		}
	},
	created:function(){
		//获取商品分类信息
		this.getProductCateList();
		//获取品牌信息
		this.getBrandList();
	},
	watch: {
		 //商品分类的检测
		 selectProductCateValue: function (newValue) {
		   if (newValue != null && newValue.length == 2) {
			 this.productValue.product_category_id = newValue[1];
		   } else {
			 this.productValue.product_category_id = null;
		   }
		 }
	},
	methods:{
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
		handleSubmit(formName){
		  this.$refs[formName].validate((valid) => {
		    if (valid) {
		     console.log("调用后台接口",this.productValue);
			 createProduct(this.productValue).then(res=>{
				 console.log(res);
				 if(res.type === 'success'){
					this.$message({
					  message: '成功添加商品',
					  type: 'success',
					  duration:1000
					}); 
					this.$router.push('/pms/product');
				 }
			 })
			 
		    } else {
		      this.$message({
		        message: '验证失败',
		        type: 'error',
		        duration:1000
		      });
		      return false;
		    }
		  });
		},
	}
   // components: { ProductDetail }
  }
</script>
<style scoped>
	.pro-title{margin-bottom:20px; }
	.my-icon{margin-right: 10px;}
</style>
