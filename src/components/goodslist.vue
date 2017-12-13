<template>
	<div class="table" v-loading="loading"
		    element-loading-text="添加数据中"
		    element-loading-spinner="el-icon-loading"
		    element-loading-background="rgba(0, 0, 0, 0.8)" v-show="">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>{{this.$store.state.onelist}}</el-breadcrumb-item>
		  <el-breadcrumb-item>{{this.$store.state.twolist}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-table
    		:data="tableData5"
    		style="width: 100%">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item label="商品名称">
		            <span>{{ props.row.goodsname }}</span>
		          </el-form-item>
		          <el-form-item label="商品价格">
		            <span>{{ props.row.goodsprice }}</span>
		          </el-form-item>
		          <el-form-item label="商品 ID">
		            <span>{{ props.row._id }}</span>
		          </el-form-item>
		          <el-form-item label="活动类型">
		            <span>{{ props.row.goodstag }}</span>
		          </el-form-item>
		          <el-form-item label="及时配送">
		            <span>{{ props.row.goodssend }}</span>
		          </el-form-item>
		          <el-form-item label="商品图片">
		            <img :src='"http://localhost:4000/public/"+props.row.goodsimg' />
		          </el-form-item>
		          <el-form-item label="商品描述">
		            <span>{{ props.row.desc }}</span>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="商品 ID"
		      prop="goodsid">
		    </el-table-column>
		    <el-table-column
		      label="商品名称"
		      prop="goodsname">
		    </el-table-column>
		    <el-table-column
		      prop="goodsactivity"
		      label="标签"
		      width="100"
		      :filters="[{ text: '抢购价', value: '抢购价' }, { text: '活动价', value: '活动价' }]"
		      :filter-method="filterTag"
		      filter-placement="bottom-end">
		      <template slot-scope="scope">
		        <el-tag
		          :type="scope.row.goodsactivity === '抢购价' ? 'primary' : 'success'"
		          close-transition>{{scope.row.goodsactivity}}</el-tag>
		      </template>
		    </el-table-column>
		    </el-table-column>
				<el-table-column label="操作">
			      <template slot-scope="scope">
			          <el-button
			          size="mini"
			          type="success"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			</el-table-column>
		</el-table>
		<div class="block">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage4"
		      :page-sizes="[5, 10]"
		      :page-size="5"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="this.total">
		    </el-pagination>
  		</div>
  		 <el-dialog title="信息修改" :visible.sync="dialogFormVisible">
			   <el-form ref="form" :model="tableData" label-width="80px" size="mini" status-icon :rules="rules" label-position="right">
			      <el-form-item label="商品名称" prop="goodsname" :required="true">
			        <el-input v-model="tableData.goodsname"></el-input>
			      </el-form-item>
			      <el-form-item label="商品价格" prop="goodsprice" :required="true">
			        <el-input v-model="tableData.goodsprice"></el-input>
			      </el-form-item>
			      <el-form-item label="价格活动" :required="true">
			        <el-select v-model="tableData.goodsactivity" placeholder="请选择活动区域">
			          <el-option label="抢购价" value="抢购价"></el-option>
			          <el-option label="活动价" value="活动价"></el-option>
			        </el-select>
			      </el-form-item>
			      <el-form-item label="即时配送" :required="true">
			        <el-switch v-model="tableData.goodssend"></el-switch>
			      </el-form-item>
			      <el-form-item label="商品标签" :required="true">
			        <el-checkbox-group v-model="tableData.goodstag">
			          <el-checkbox-button label="有货" name="type"></el-checkbox-button>
			          <el-checkbox-button label="自营" name="type"></el-checkbox-button>
			          <el-checkbox-button label="促销" name="type"></el-checkbox-button>
			        </el-checkbox-group>
			      </el-form-item>
				   <!--  <el-form-item label="上传图片" :required="true">
			        <el-upload
			          ref="upload"
			          :action="updata_url"
			          list-type="picture-card"
			          :on-preview="handlePictureCardPreview"
			          :on-remove="handleRemove"
			          :auto-upload="false"
			          :before-upload="bug">
			          <i class="el-icon-plus"></i>
			        </el-upload>
			        <el-dialog :visible.sync="dialogVisible" size="tiny">
			          <img width="100%" :src="dialogImageUrl" alt="">
			        </el-dialog>
			      </el-form-item> -->
			    </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="update">确 定</el-button>
			  </div>
		</el-dialog>
	</div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
      	rules: {
          
        },
         dialogImageUrl: '',
        dialogVisible: false,
        updata_url:'aaa',
      	loading: true,
        currentPage4: 1,
        total: 20,
        dialogFormVisible:false,
        fileList:[],
        tableData5: [],
        tableData:{
          _id: '',
          goodsname: '',
          goodsprice: '',
          desc: '',
          goodsimg: '',
          goodstag: '',
          goodssend: '',
          goodsactivity: '',
          url:''
        }
      }
    },
    methods:{
    	  bug(file) { 
	          this.tableData.url=file
	          return false 
	       },
	      handleRemove(file) {
	        console.log(file);
	      },
	      handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	      },
    	update(){
      	this.loading=true
      	var uploadForm = new FormData()
             //this.loading= true
             //判断是不是手机号存在 哟偶修改
             // this.uploadForm.append('Some text',111)
	         uploadForm.append('goodsname',this.tableData.goodsname)
	         uploadForm.append('goodsprice',this.tableData.goodsprice)
	         uploadForm.append('goodsactivity',this.tableData.goodsactivity)
	         uploadForm.append('goodssend',this.tableData.goodsactivity)
	         uploadForm.append('goodstag',JSON.stringify(this.tableData.goodstag))
	         uploadForm.append('pic',this.tableData.url)
	         uploadForm.append('goodsid',this.tableData.id)
         axios.post('/api/goods/addorupdate', uploadForm, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                            }).then( res =>{
                     this.dialogFormVisible= false
	      			this.loading=false
	      			this.$notify({
			          title: '成功',
			          message: '更新成功',
			          type: 'success'
			        })
	      			this.ajaxGetlist(this.currentPage4)
             })
      	// $.ajax({
      	// 	type:'post',
      	// 	url:'/api/goods/addorupdate',
      	// 	data:{
      	// 		goodsname:this.tableData.goodsname,
      	// 		goodsprice:this.tableData.goodsprice,
      	// 		goodstag:JSON.stringify(this.tableData.goodstag),
      	// 		goodssend:this.tableData.goodsactivity,
      	// 		goodsactivity :this.tableData.goodsactivity,
      	// 		goodsid:this.tableData.id
      	// 	},
      	// 	success:(res) => {
      	// 		console.log(res)
      	// 		this.dialogFormVisible= false
      	// 		this.loading=false
      	// 		this.$notify({
		     //      title: '成功',
		     //      message: '更新成功',
		     //      type: 'success'
		     //    })
      	// 		this.ajaxGetlist(this.currentPage4)
      	// 	}
      	// })
      	this.$refs.upload.submit() 
      	
      },
      filterTag(value, row) {
        return row.goodsactivity === value;
      },
    	handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        var pages =`${val}`
        this.ajaxGetlist('1',pages)//问题
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        var num=`${val}`
      	this.loading= true
       	this.ajaxGetlist(num)
      },
      handleEdit(index, row){
      	console.log(index , row);
        this.dialogFormVisible=true
        $.ajax({
        	url:'/api/goods/getgoods',
        	data:{
        		id:row._id
        	},
        	success:(res) => {
        		this.tableData=res.data
        		this.tableData.id=row._id
        		this.tableData.goodstag=JSON.parse(res.data.goodstag)
        		console.log(res.data)
        	}
        })
      },
      handleDelete(index, row){
      	const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, ' 确定要'),
            h('i', { style: 'color: teal' }, '删除')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
      	      this.loading= true
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              instance.confirmButtonLoading = false
              $.ajax({
		      url: '/api/goods/deletegoods',
		      data:{
		      	id: row._id
		      },
		      success: (res) =>{
		      	console.log(res);
		      	this.ajaxGetlist()
		      	done()
		      }
		    })    
            } else {
              done()
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: ' 删除成功'
          });
        });
      },
      ajaxGetlist(num,page){
      	this.loading= true
      	$.ajax({
		      url: '/api/goods/getgoodslist',
		      data:{
		      	pageNo:num,
		      	pagesize:page
		      },
		      success: (res) =>{
		      	  this.tableData5=res.content.data.result
      	          this.total=res.content.data.total
      	          this.currentPage4=res.content.data.pageNo
      	          console.log(res.content.data.result);
        		  //this.tableData5.goodstag=JSON.parse(res.content.data.result.goodstag)
      	          this.loading= false

		      }
		    })    
      }
    },
    mounted(){
    	this.ajaxGetlist(1)
    }
  }
</script>

<style lang="scss">
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
	.table{
		margin-left: 200px;
		height:100%;
		table{
			height:100%;
		    min-height:300px;
		}
		img{
			width:30px;
			height: 30px;
		}
		.el-table-column--selection{
			padding-left: 10px;
		}
		.nav{
			height: 50px;
			width: 97%;
			padding-left: 20px;
			line-height: 50px;
			background:#fff;
			border: 1px solid #EDF2F7;
		}
		thead{
			height: 30px;
			th{
				height: 30px;
			}
		}
		
	}
</style>