<template> 
 <div class="app-container">
	<el-card class="box-card pro-title" shadow="never">
	 	<span>
	 		<i class=" icon iconfont  my-icon icon-dingdan1" ></i> 
	 		<span>添加品牌信息</span>
	 	</span>    
	</el-card>
	<el-card class="form-container" shadow="never">
	  <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
	    <el-form-item label="品牌名称：" prop="name">
	      <el-input v-model="brand.name"></el-input>
	    </el-form-item>
	    <el-form-item label="品牌首字母：">
	      <el-input v-model="brand.first_letter"></el-input>
	    </el-form-item>
	    <el-form-item label="品牌LOGO：" prop="logo">
	      <el-input v-model="brand.logo"></el-input>
	    </el-form-item>
	    <el-form-item label="品牌专区大图：">
	      <el-input v-model="brand.big_pic"></el-input>
	    </el-form-item>
	    <el-form-item label="品牌故事：">
	      <el-input
	        placeholder="请输入内容"
	        type="textarea"
	        v-model="brand.brand_story"
	        :autosize="true"></el-input>
	    </el-form-item>
	    <el-form-item label="排序：" prop="sort">
	      <el-input v-model.number="brand.sort"></el-input>
	    </el-form-item>
	    <el-form-item label="是否显示：">
	      <el-radio-group v-model="brand.show_status">
	        <el-radio :label="1">是</el-radio>
	        <el-radio :label="0">否</el-radio>
	      </el-radio-group>
	    </el-form-item>
	    <el-form-item label="品牌制造商：">
	      <el-radio-group v-model="brand.factory_status">
	        <el-radio :label="1">是</el-radio>
	        <el-radio :label="0">否</el-radio>
	      </el-radio-group>
	    </el-form-item>
	    <el-form-item>
	      <el-button type="primary" @click="handleSubmit('brandFrom')">提交</el-button>
	      <el-button  @click="resetForm('brandFrom')">重置</el-button>
	    </el-form-item>
	  </el-form>
	</el-card>
 </div>
</template>
<script>
  //引入商品分类和商品品牌
  import {createBrandList} from '@/api/product';
  export default {
    name: 'addBrand',
	data:function(){
		return {
			//商品信息默认值
			brand:{
				big_pic: '',
				brand_story: '',
				factory_status: 0,
				first_letter: '',
				logo: '',
				name: '',
				show_status: 0,
				sort: 0
			},
			rules: {//验证规则
			  name: [
			    {required: true, message: '请输入品牌名称', trigger: 'blur'},
			    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
			  ],
			  logo: [
			    {required: true, message: '请输入品牌logo', trigger: 'blur'}
			  ],
			  sort: [
			    {type: 'number', message: '排序必须为数字'}
			  ],
			},
			
		}
	},
	created:function(){
	},
	watch: {
		
	},
	methods:{
		handleSubmit(formName) {
		  this.$refs[formName].validate((valid) => {
		    if (valid) {
			  createBrandList(this.brand).then(res => {
				if(res.type === "success" ){
					this.$message({
					  message: '添加成功',
					  type: 'success',
					  duration:1000
					});
					//跳转页面
					this.$router.push('/pms/brand');
				}
				
			  });
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
		resetForm(formName) {
		  this.$refs[formName].resetFields();
		  this.brand = Object.assign({},defaultBrand);
		}
	}
  }
</script>
<style scoped>
	.pro-title{margin-bottom:20px; }
	.my-icon{margin-right: 10px;}
</style>
