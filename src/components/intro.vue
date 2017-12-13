<template>
	<el-card class="box-card">
	  <div slot="header" class="clearfix">
	    <span>我买网管理系统</span>
	    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
	  </div>
	  <div class="text item">
	    用户管理
	  </div>
	  <div class="text item">
	    用户管理
	  </div>
	  <div class="text item">
	    用户管理
	  </div>
	</el-card>
</template>
<script>
	
</script>
<style>
   .box-card{
   	margin: auto auto;
   }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>