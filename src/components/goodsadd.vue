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
		<el-form ref="form" :model="sizeForm" label-width="80px" size="mini" status-icon :rules="rules" label-position="right">
      <el-form-item label="商品名称" prop="name" :required="true">
        <el-input v-model="sizeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price" :required="true">
        <el-input v-model="sizeForm.price"></el-input>
      </el-form-item>
      <el-form-item label="价格活动" :required="true">
        <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
          <el-option label="抢购价" value="抢购价"></el-option>
          <el-option label="活动价" value="活动价"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="即时配送" :required="true">
        <el-switch v-model="sizeForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="商品标签" :required="true">
        <el-checkbox-group v-model="sizeForm.type">
          <el-checkbox-button label="有货" name="type"></el-checkbox-button>
          <el-checkbox-button label="自营" name="type"></el-checkbox-button>
          <el-checkbox-button label="促销" name="type"></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="上传图片" :required="true">
        <el-upload
          ref="upload"
          :action="updata_url"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :before-upload="newImg"
          :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
import axios from 'axios'
  export default {
    data() {
    	var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品名不能为空'));
        }
        callback()
      };
      var checkprice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('价格不能为空'));
        }
         if (!(/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/).test(value)) {
          callback(new Error('价格不符合格式'));
        } else{
        	callback()
        }
      };
      return {
        fileList:[],
        updata_url:'aaa',
      	rules: {
          price: [
            { validator: checkprice, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        },
         sizeForm: {
          name: '',
          region: '',
          price: '',
          delivery: false,
          type: [],
          url:''
        },
        dialogImageUrl: '',
        dialogVisible: false,
        loading: false
      };
    },
    methods: {
      onSubmit(formName) {
      	this.$refs[formName].validate((valid) => {
          if (valid) {
            var uploadForm = new FormData()
             //this.loading= true
             //判断是不是手机号存在 哟偶修改
             // this.uploadForm.append('Some text',111)
             uploadForm.append('goodsname',this.sizeForm.name)
             uploadForm.append('goodsprice',this.sizeForm.price)
             uploadForm.append('goodsactivity',this.sizeForm.region)
             uploadForm.append('goodssend',this.sizeForm.delivery)
             uploadForm.append('goodstag',JSON.stringify(this.sizeForm.type))
             uploadForm.append('pic',this.sizeForm.url)

             axios.post('/api/goods/addorupdate', uploadForm, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                            }).then( res =>{
                     console.log(res)
             })
             // console.log(this.uploadForm);
            //this.$refs.upload.submit();
          // 	 $.ajax({
    		    //   type: 'post',
    		    //   url: '/api/goods/addorupdate',
    		    //   data: {
          //       'goodsname':this.sizeForm.name,
          //       'goodsprice':this.sizeForm.price,
          //       'goodsactivity':this.sizeForm.region,
          //       'goodssend':this.sizeForm.delivery,
          //        goodstag :JSON.stringify(this.sizeForm.type),
          //        file: this.sizeForm.file
          //     },
    		    //   success: (res) =>{
          // 	          this.loading= false
    		    //   	  this.$message({
    		    //       showClose: true,
    		    //       message: '添加成功',
    		    //       type: 'success'
    		    //     });
    		    //   }
    		    // })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      	this.$refs.upload.submit() 
      },
      newImg (file) { 
          this.sizeForm.url=file
          console.log(this.sizeForm.url);
          return false 
       },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  };
</script>