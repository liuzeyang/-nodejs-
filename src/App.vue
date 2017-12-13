<template lang="html">
  <el-container class='container'>
    <el-header class='header'>
        <Header :islogined="Logined" ></Header>
    </el-header>
    <el-container class='show'>
      <!-- <el-aside width="220px" class='aside'>
        <Aside></Aside>
      </el-aside> -->
      <el-main class='main'>
        <router-view :logined="logined"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from './components/navbar.vue'
import Aside from './components/aside.vue'

// import axios  from 'axios'
export default {
  name: 'app',
  components:{
    Header,
    Aside
  },
  data(){
    return{
      logined: false 
    }
  },
  methods:{
    Logined(){
      this.logined=!this.logined
    }
  }

}
</script>

<style lang="scss">

  html,body,#app{
    width: 100%;
    height: 100%;
    background:#ccc
  }
   .el-header, .el-footer {
    background-color: #101010;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    line-height: 30px;
  }
  
  .el-container {
    height:100%;
  }
</style>
