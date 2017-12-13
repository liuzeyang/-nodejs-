<template>
  <!-- <div class="block">
    <span class="demonstration">默认 Hover 指示器触发</span>
    <el-carousel height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div> -->
  <div class="carousel">
    <span class="demonstration">基于mongodb、vue、element-ui以及express的后台管理系统</span>
    <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item>
      <img src="../images/element.jpg" height="100%" width="100%" alt="">
    </el-carousel-item>
    <el-carousel-item>
      <img src="../images/mongodb.jpeg" height="100%" width="100%" alt="">
    </el-carousel-item>
    <el-carousel-item>
      <img src="../images/node.jpg" height="100%" width="100%" alt="">
    </el-carousel-item>
    <el-carousel-item>
      <img src="../images/vue.jpg" height="100%" width="100%" alt="">
    </el-carousel-item>
  </el-carousel>
  </div>
  
</template>
<script>
  export default{

  }
</script>
<style>
  .carousel{
    width: 100%;
    height: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel{
    position: absolute;
    top: 150px;
    left: 0;
    width: 100%;
    .el-icon-arrow-right{
      top: -100px;
    }
  }
</style>