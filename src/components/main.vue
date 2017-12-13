<template>
	<div class="main">
		<div class="show" v-show="logined">
			<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
		  <el-radio-button :label="false">展开</el-radio-button>
		  <el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group>
		<el-menu default-active="1-3-1" class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
		  <el-submenu index="1">
		    <template slot="title">
		      <i class="el-icon-menu"></i>
		      <span slot="title">用户管理</span>
		    </template>
		    <el-menu-item-group>
		      <el-menu-item index="/userlist" @click="$store.commit('changeOneList',1.1 )">用户列表</el-menu-item>
		      <el-menu-item index="/adduser" @click="$store.commit('changeOneList',1.2)">添加用户</el-menu-item>
		    </el-menu-item-group>
		    <!-- <el-submenu index="1-4">
		      <span slot="title">选项4</span>
		      <el-menu-item index="1-4-1">选项1</el-menu-item>
		    </el-submenu> -->
		  </el-submenu>
		   <el-submenu index="2">
		    <template slot="title">
		      <i class="el-icon-sold-out"></i>
		      <span slot="title">商品管理</span>
		    </template>
		    <el-menu-item-group>
		      <el-menu-item index="/goodslist" @click="$store.commit('changeOneList',2.1)">商品列表</el-menu-item>
		      <el-menu-item index="/goodsadd" @click="$store.commit('changeOneList',2.2)">添加商品</el-menu-item>
		    </el-menu-item-group>
		  </el-submenu>
		   <el-submenu index="3">
		    <template slot="title">
		      <i class="el-icon-picture-outline"></i>
		      <span slot="title">统计</span>
		    </template>
		    <el-menu-item-group>
		      <el-menu-item index="/echarts" @click="$store.commit('changeOneList',3.1)">销售产品统计</el-menu-item>
		      <el-menu-item index="/echarts2" @click="$store.commit('changeOneList',3.2)">全国代理统计</el-menu-item>
		    </el-menu-item-group>
		  </el-submenu>
		</el-menu>
		</div>
		
		<!---      跑马灯    -->
		<Carousel v-if="!logined"></Carousel>
		<!--      图表页     -->
		<router-view v-show="logined"></router-view>
	</div>
</template>

<script>
import Carousel from './carousel.vue'

export default {
	props:["logined"],
	data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components:{
    	Carousel
    }
  }
</script>

<style lang="scss" scoped>
     .el-main{
     	line-height: 30px;
     }
	.main{
		height: 100%;
		width: 100%;
		position:relative;

		.el-radio-group{
			position: absolute;
			top:0px;
			left:0;
		}
		.el-menu{
			position: absolute;
			top:50px;
			left: 0;
		}
	}
</style>