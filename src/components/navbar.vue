<template>	
	<div class="navbar">
		<el-row :gutter="20" v-if="isLogin">
		  <el-col :span="6" :offset="1">
		  	<div class="grid-content logo">
		  		我买网管理系统
		  	</div>
		  </el-col>
		  <el-col class="login" :span="2" :offset="12">
					<el-button type="text" @click="dialogLogin = true"> 登录</el-button>
		  </el-col>
		  <el-col class="signin" :span="2">
		  			<el-button type="text" @click="dialogSignin = true"> 注册</el-button>
		  </el-col>
		</el-row>
		<el-row :gutter="20" v-if="!isLogin">
		  <el-col :span="6" :offset="1">
		  	<div class="grid-content logo">
		  		我买网管理系统
		  	</div>
		  </el-col>
		  <el-col class="login" :span="4" :offset="9">
				<div style="font-size:16px;"> 你好! {{loginUser}}..</div>
		  </el-col>
		  <el-col class="signin" :span="2">
		  		<el-dropdown @command="handleCommand">
				  <span class="el-dropdown-link">
				    中心<i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item command="logout">注销</el-dropdown-item>
				    <el-dropdown-item>个人中心</el-dropdown-item>
				    <el-dropdown-item command="socket">发布消息</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
		  </el-col>
		  <el-col :span="1">
		  	    <i class="el-icon-setting" style="font-size:18px;color:#9d9d9d"></i>
		  </el-col>
		</el-row>
		<el-dialog title="用户登录" :visible.sync="dialogLogin">
		  <el-form :model="form" ref="form" status-icon :rules="rules">
		    <el-form-item label="用户名" :label-width="formLabelWidth" prop="name" :required="true">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="密码" :label-width="formLabelWidth" prop="password" :required="true">
		      <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
		    </el-form-item>
		     <el-form-item label="登录类型" :label-width="formLabelWidth" >
		      <el-select v-model="form.region" placeholder="类型">
		        <el-option label="管理" value="管理"></el-option>
		        <el-option label="用户" value="用户"></el-option>
		      </el-select>
		    </el-form-item>
		  </el-form >
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="clear(form)">取 消</el-button>
		    <el-button type="primary" @click="Login('form')">确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog title="用户注册" :visible.sync="dialogSignin">
		  <el-form :model="form" status-icon :rules="rules" ref="ruleForm2">
		    <el-form-item label="用户名" :label-width="formLabelWidth" prop="name" :required="true">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="密码" :label-width="formLabelWidth" prop="password" :required="true">
		      <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码" :label-width="formLabelWidth">
		      <el-input type="password" v-model="form.ensure" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email" :required="true">
		      <el-input v-model="form.email" auto-complete="off"></el-input>
		    </el-form-item>
		     <el-form-item label="注册类型" :label-width="formLabelWidth">
		      <el-select v-model="form.region" placeholder="类型">
		        <el-option label="管理" value="shanghai"></el-option>
		        <el-option label="用户" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('ruleForm2')">取 消</el-button>
		    <el-button type="primary" @click="SignUp('ruleForm2')">确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog :visible.sync="issocket"
		title="socket">
		  <el-form>
			<el-form-item label="消息" :label-width="formLabelWidth">
		      <el-input v-model="mess" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
			<div slot="footer" class="dialog-footer">
		    <el-button @click="issocket = false">取 消</el-button>
		    <el-button type="primary" @click="send">确 定</el-button>
		  </div>
		</el-dialog>
	</div>

</template>

<script>
	 export default {
	 	props : ["islogined"],
	    data() {
	    	var checkname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
        if (!(/^[\w\_]{3,20}$/u).test(value)) {
          callback(new Error('英文、数字、下划线6-20位字符'));
        } else{
        	callback()
        }
        }, 1000);
      };
      var checkpassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
        setTimeout(() => {
        if (!(/^[\w\_]{3,20}$/u).test(value)) {
          callback(new Error('英文、数字、下划线6-20位字符'));
        } else{
        	callback()
        }
        }, 1000);
      };
      var checkemail = (rule, value, callback) => {
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
	      	 form: {
	          name: '',
	          region: '',
	          password:'',
	          type: [],
	          resource: '',
	          desc: '',
	          email:'',
	          ensure:''
	        },
	        rules:{
	        	name:[
	        		{validator:checkname, trigger: 'blur'}
	        	],
	        	password:[
	        		{validator:checkpassword, trigger: 'blur'}
	        	],
	        	email:[
	        		{validator:checkemail, trigger: 'blur'}
	        	]
	        },
	        formLabelWidth: '120px',
	      	dialogLogin: false,
	        dialogSignin: false,
	        issocket: false,
	        isLogin:true,
	        loginUser:'',
	        mess: ''
	      };
	    },
	    mounted(){
    		$.ajax({
		      url: '/api/users/isLogin',
		      success: (res) => {
		      	console.log(res)
		      	if(res.data.login){
					this.loginUser=res.data.username
					this.isLogin=!this.isLogin
					this.islogined()

		      	}
		        
		      }
		    })
	    	
	    },
	    methods: {
	    	resetForm(formName) {
		        this.$refs[formName].resetFields();
		      },
	    	send(){
	    		$.ajax({
	    			url: '/api/socket/send',
	    			type: 'post',
	    			data: {
	    				mes: this.mess
	    			},
	    			success: (res) =>{
	    				console.log(res);
	    				issocket = false
	    			}
	    		})
	    	},
	      SignUp(formName){
	      	this.$refs[formName].validate((valid) => {
	          if (valid) {
		        var name = this.form.name
		      	var password = this.form.password
		      	var region = this.form.region
		      	console.log(typeof name,password);
		      	$.ajax({
			      url: '/api/users/signUp',
			      type: 'post',
			      data: {
			        username: name,
			        password: password,
			        region: region
			      },
			      success: (res) => {
			      	if(res.data.success){
			      		this.$alert('注册成功', '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				          	this.dialogSignin=false
				      		this.form.name=''
					        this.form.password=''
					        this.form.ensure=''
					        this.form.email=''
				            this.form.region=''
				           }
				          });
			      	}else{
			      		this.$alert('用户名已经存在', '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				             this.form.name=''
				        	 this.form.password=''
				        	 this.form.ensure=''
				        	 this.form.email=''
				             this.form.region=''
				          }
				        });
			      	}
			      }
			    })
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	     
	      },
	      Login(formName){
	    	this.$refs[formName].validate((valid) => {
	          if (valid) {
	            var name = this.form.name
		      	var password = this.form.password
		      	var region = this.form.region
		      	$.ajax({
			      url: '/api/users/signIn',
			      type: 'post',
			      data: {
			        username: name,
			        password: password,
			        region: region
			      },
			      success: (res) => {
			      	console.log(res);
			      	if(res.data.login){
			      		this.$message({
			              type: 'info',
			              message: '欢迎回来'
			            });
			            this.dialogLogin = false
			            this.isLogin= !this.isLogin
			            this.loginUser=res.data.username
			            this.islogined()
			      	}else{
			      		this.$alert('账号密码不正确', '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				            this.form.name=''
				            this.form.password=''
				            this.form.region=''
				          }
				    });
			      	}
		      }
		    })
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      handleCommand(command) {
	      	if(command =='logout'){
	      	$.ajax({
		      url: '/api/users/logout',
		      success: (res) => {
		      	if(res.data.logout){
		      		this.loginUser=""
					this.isLogin=!this.isLogin
		            this.islogined()
		      	}
		      }
		    })
		    this.form.name=''
	        this.form.password=''
	        this.form.ensure=''
	        this.form.email=''
            this.form.region=''
	      	}else if(command =='socket'){
	      		this.issocket = true
	      	}
	      	
	      }
	    }
	  };
</script>

<style lang="scss" scoped>
	
  .navbar{
  	height:100%;
  	.logo{
  		font-size:18px;
  		color:#9d9d9d;
  		border-radius: 4px;
	    min-height: 36px;
	    height:100%;
  	}
  	.login,.signin{
  		color:#9d9d9d;
  		cursor:pointer;
  		.el-button{
  			color:#9d9d9d;
  			font-size:16px;
  		}
  	}
  }
  .el-row {
	margin-bottom: 20px;
	height:100%;
	&:last-child {
	  margin-bottom: 0;
	}
  }
  .el-col {
    border-radius: 4px;
    height:100%;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    height:100%;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>