<template> 
 <div class="app-container">
	<el-card class="box-card pro-title" shadow="never">
	 	<span>
	 		<i class=" icon iconfont  my-icon icon-dingdan1" ></i> 
	 		<span>修改商品分类信息</span>
	 	</span>    
	</el-card>
	<el-card class="form-container" shadow="never">
	  <el-form :model="productCate" :rules="rules" ref="productCateFrom" label-width="150px">
	    <el-form-item label="分类名称：" prop="name">
	      <el-input v-model="productCate.name"></el-input>
	    </el-form-item>
	    <el-form-item label="上级分类：">
	      <el-select v-model="productCate.parent_id"
	                 placeholder="请选择分类">
	        <el-option
	          v-for="item in selectProductCateList"
	          :key="item.id"
	          :label="item.name"
	          :value="item.id">
	        </el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="数量单位：">
	      <el-input v-model="productCate.product_unit"></el-input>
	    </el-form-item>
	    <el-form-item label="排序：">
	      <el-input v-model="productCate.sort"></el-input>
	    </el-form-item>
	    <el-form-item label="是否显示：">
	      <el-radio-group v-model="productCate.show_status">
	        <el-radio :label="1">是</el-radio>
	        <el-radio :label="0">否</el-radio>
	      </el-radio-group>
	    </el-form-item>
	    <el-form-item label="是否显示在导航栏：">
	      <el-radio-group v-model="productCate.nav_status">
	        <el-radio :label="1">是</el-radio>
	        <el-radio :label="0">否</el-radio>
	      </el-radio-group>
	    </el-form-item>
	    <el-form-item label="关键词：">
	      <el-input v-model="productCate.keywords"></el-input>
	    </el-form-item>
	    <el-form-item label="分类描述：">
	      <el-input type="textarea" :autosize="true" v-model="productCate.description"></el-input>
	    </el-form-item>
	    <el-form-item>
	      <el-button type="primary" @click="handleSubmit('productCateFrom')">提交</el-button>
	      <el-button @click="resetForm('productCateFrom')">重置</el-button>
	    </el-form-item>
	  </el-form>
	</el-card>
 </div>
</template>
<script>
  //引入商品分类和商品品牌
  import {fetchListWithChildren, fetchBrandList, createProduct,fetchCategoryList,createProductCate,getProductCate,updateProductCate  } from '@/api/product';
  const defaultProductCate = {
    description: '',
    icon: '',
    keywords: '',
    name: '',
    nav_status: 0,
    parent_id: 0,
    product_unit: '',
	product_count: 0,
    show_status: 0,
    sort: 0,
	level:0
  };
  export default {
    name: 'updateProductCate',
	data:function(){
		return {
			productCate: Object.assign({}, defaultProductCate),
			selectProductCateList: [],
			rules: {
			  name: [
			    {required: true, message: '请输入品牌名称', trigger: 'blur'},
			    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
			  ]
			},
		}
	},
	created:function(){
		//按照id获取商品信息
		getProductCate({id:this.$route.query.id}).then(response=>{
			this.productCate=response.data;
			//this.selectProductCateValue.push(2);//商品分类的父节点id
			//this.selectProductCateValue.push(19);
			// getParentId({id: this.productValue.product_category_id}).then(res=>{
			// 	this.selectProductCateValue.push(res.data.parent_id);//商品分类的父节点id
			// 	this.selectProductCateValue.push(this.productValue.product_category_id);//商品分类的子节点信息
			// })
		  
		});
		
		this.getSelectProductCateList();
	},
	
	methods: {
	  getSelectProductCateList() {
		  fetchCategoryList({'parent_id':0}).then(res => {
		  	this.selectProductCateList = res.data;
		  	this.selectProductCateList.unshift({id: 0, name: '无上级分类'});
		  });
	  },
	  handleSubmit(formName){
		  
		    this.$refs[formName].validate((valid) => {
		      if (valid) {
				   console.log("调用后台接口",this.productCate);
				   if(this.productCate.parent_id !== 0){
					   this.productCate.level = 1;
				   }
				 updateProductCate(this.productCate).then(res=>{
					 console.log(res);
					 if(res.type === 'success'){
						this.$message({
						  message: '成功修改商品分类',
						  type: 'success',
						  duration:1000
						}); 
						this.$router.push('/pms/productCate');
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
		  
	  }
	}
  }
</script>
<style scoped>
	.pro-title{margin-bottom:20px; }
	.my-icon{margin-right: 10px;}
</style>
