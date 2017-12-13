<template>
	<div class="table"v-loading="loading"
		    element-loading-text="添加数据中"
		    element-loading-spinner="el-icon-loading"
		    element-loading-background="rgba(0, 0, 0, 0.8)" v-show="">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>{{this.$store.state.onelist}}</el-breadcrumb-item>
		  <el-breadcrumb-item>{{this.$store.state.twolist}}</el-breadcrumb-item>
		</el-breadcrumb>
		  <el-table
		    :data="tableData"
		    style="width: 100%;">
		    <el-table-column
		      type="selection"
		      width="50">
		    </el-table-column>
		    <el-table-column
		      prop="date"
		      label="日期"
		      sortable
		      width="140"
		      height="30">
		       <template slot-scope="scope">
		        <i class="el-icon-time"></i>
		        <span style="margin-left: 10px">{{ scope.row.date }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="username"
		      label="姓名"
		      width="100">
		       <template slot-scope="scope">
		        <el-popover trigger="hover" placement="top">
		          <p>姓名: {{ scope.row.username }}</p>
		          <p>邮箱: {{ scope.row.email  }}</p>
		          <div slot="reference" class="name-wrapper">
		            <el-tag size="medium">{{ scope.row.username }}</el-tag>
		          </div>
		        </el-popover>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="phone"
		      label="电话"
		      width="140"
		      :formatter="formatter">
		    </el-table-column>
		    <el-table-column
		      prop="resource"
		      label="标签"
		      width="100"
		      :filters="[{ text: '普通会员', value: '普通会员' }, { text: '超级会员', value: '超级会员' }]"
		      :filter-method="filterTag"
		      filter-placement="bottom-end">
		      <template slot-scope="scope">
		        <el-tag
		          :type="scope.row.resource === '普通会员' ? 'primary' : 'success'"
		          close-transition>{{scope.row.resource}}</el-tag>
		      </template>
		    </el-table-column>
				<el-table-column label="操作">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          type="primary"
			          @click="handleEdit(scope.$index, scope.row)">购物车</el-button>
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
			  <el-form :model="form" status-icon :rules="rules">
			    <el-form-item label="用户名" :label-width="formLabelWidth" prop="name" :required="true">
			      <el-input v-model="form.username" auto-complete="off"></el-input>
			    </el-form-item>
			     <el-form-item label="电话" :label-width="formLabelWidth" prop="phone" :required="true">
			      <el-input v-model="form.phone" auto-complete="off"></el-input>
			    </el-form-item>
			     <el-form-item label="邮箱" :label-width="formLabelWidth" prop="cemail" :required="true">
			      <el-input v-model="form.email" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="级别" :label-width="formLabelWidth" :required="true">
			      <el-select v-model="form.resource" placeholder="请选择级别">
			        <el-option label="普通会员" value="shanghai"></el-option>
			        <el-option label="超级会员" value="beijing"></el-option>
			      </el-select>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="update">确 定</el-button>
			  </div>
		</el-dialog>
	</div>
</template>

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
          cemail: [
            { validator: checkEmail, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        },
        tableData: [],
        loading: true,
        currentPage4: 1,
        total: 20,
        dialogFormVisible: false,
        form: {
          username: '',
          phone: '',
          email: '',
          // date1: '',
          // date2: '',
          // delivery: false,
          //type: [],
          resource: '',
          id: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      update(){
      	this.loading=true
      	$.ajax({
      		type:'post',
      		url:'/api/consumers/update',
      		data:{
      			username:this.form.username,
      			phone:this.form.phone,
      			email:this.form.email,
      			resource:this.form.resource,
      			id:this.form.id
      		},
      		success:(res) => {
      			console.log(res)
      			this.dialogFormVisible= false
      			this.loading=false
      			this.$notify({
		          title: '成功',
		          message: '更新成功',
		          type: 'success'
		        })
      			this.ajaxGetlist(this.currentPage4)
      		}
      	})
      },
      handleEdit(index, row){
      	console.log(index , row);
        this.dialogFormVisible=true
        $.ajax({
        	url:'/api/consumers/getconsumer',
        	data:{
        		id:row._id
        	},
        	success:(res) => {
        		this.form=res.data
        		this.form.id=row._id
        		console.log(res.data)
        	}
        })
      },
      formatter(row, column) {
        return row.phone;
      },
      filterTag(value, row) {
        return row.resource === value;
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
		      url: '/api/consumers/delete',
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
      	$.ajax({
		      url: '/api/consumers/getconsumerlist',
		      data:{
		      	pageNo:num,
		      	pagesize:page
		      },
		      success: (res) =>{
		      	  console.log(res);
		      	  this.tableData=res.content.data.result
      	          this.total=res.content.data.total
      	          this.currentPage4=res.content.data.pageNo
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
	.table{
		margin-left: 200px;
		height:100%;
		table{
			height:100%;
		    min-height:300px;
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
		.block{
		}
	}
</style>