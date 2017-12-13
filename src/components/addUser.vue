<template>
	<div class="table"v-loading="loading"
	    element-loading-text="添加数据中"
	    element-loading-spinner="el-icon-loading"
	    element-loading-background="rgba(0, 0, 0, 0.8)">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>{{this.$store.state.onelist}}</el-breadcrumb-item>
		  <el-breadcrumb-item>{{this.$store.state.twolist}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form ref="form" 
		:model="sizeForm" label-width="80px" size="mini" status-icon :rules="rules">
	  <el-form-item label="用户名" prop="name" :required="true">
	    <el-input v-model="sizeForm.name"></el-input>
	  </el-form-item>
	  <el-form-item label="邮箱" prop="email" :required="true">
	    <el-input v-model="sizeForm.email"></el-input>
	  </el-form-item>
	  <el-form-item label="手机" prop="phone" :required="true">
	    <el-input v-model="sizeForm.phone"></el-input>
	  </el-form-item>
	  <el-form-item label="注册时间" :required="true">
	    <el-col :span="11">
	      <el-date-picker type="datetime" placeholder="选择日期" v-model="sizeForm.date" style="width: 100%;"></el-date-picker>
	    </el-col>
	  </el-form-item>
	  <!-- <el-form-item label="标签">
	    <el-checkbox-group v-model="sizeForm.type">
	      <el-checkbox-button label="美食" name="type"></el-checkbox-button>
	      <el-checkbox-button label="美妆" name="type"></el-checkbox-button>
	      <el-checkbox-button label="运动" name="type"></el-checkbox-button>
	    </el-checkbox-group>
	  </el-form-item> -->
	  <el-form-item label="级别" :required="true">
	    <el-radio-group v-model="sizeForm.resource" size="medium">
	      <el-radio border label="普通会员"></el-radio>
	      <el-radio border label="超级会员"></el-radio>
	    </el-radio-group>
	  </el-form-item>
	  <el-form-item size="large">
	    <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
	    <el-button>取消</el-button>
	  </el-form-item>
	</el-form>
	</div>
	
</template>
<style>
	.table{
		margin-left: 200px;
		height:100%;
	}
	.el-form{
		width: 70%;
		margin-top: 20px;
	}
</style>	
<script>
  export default {
    data() {
    	var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
        if (!(/^[\w\_]{6,20}$/u).test(value)) {
          callback(new Error('英文、数字、下划线6-20位字符'));
        } else{
        	callback()
        }
        }, 1000);
      };
      var checkphone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
         if (!(/1(3[0-9]|47|5((?!4)[0-9])|7(0|1|[6-8])|8[0-9])\d{8,8}/).test(value)) {
          callback(new Error('手机号不符合格式'));
        } else{
        	callback()
        }
      };
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        if (!(/[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/).test(value)) {
          callback(new Error('邮箱不符合格式'));
        } else{
        	callback()
        }
      };
      return {
      	rules: {
          phone: [
            { validator: checkphone, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        },
        sizeForm: {
          name: '',
          email: '',
          date: '',
          phone: '',
          resource: ''
        },
        loading: false
      };
    },
    methods: {
      onSubmit(formName) {
      	this.$refs[formName].validate((valid) => {
          if (valid) {
             this.loading= true
             //判断是不是手机号存在 哟偶修改
      	 $.ajax({
		      type: 'post',
		      url: '/api/consumers/add',
		      data:{
		      	username: this.sizeForm.name,
		        email: this.sizeForm.email,
		        date: this.sizeForm.date,
		        phone: this.sizeForm.phone,
		        resource: this.sizeForm.resource
		      },
		      success: (res) =>{
      	          this.loading= false
		      	  this.$message({
		          showClose: true,
		          message: '添加成功',
		          type: 'success'
		        });
		      }
		    })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      	
      }
    }
  };
</script>