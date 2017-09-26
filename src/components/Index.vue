<style>
.index-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #242f42;
}




/* header 样式 */

header {
  height: 70px;
  padding-left: 30px;
  padding-right: 30px;
  line-height: 70px;
}

header::after {
  content: '';
  display: block;
  clear: both;
}

.logo {
  float: left;
  height: 100%;
  width: 250px;
  font-size: 22px;
  font-weight: 600;
  color: #fff;
}

.login-info {
  float: right;
}

.avatar-wrap {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.nick-name {
  height: 100%;
  font-size: 14px;
  color: #fff;
  margin: 0 20px;
}




/* 左侧导航 */

.nav-bar {
  position: absolute;
  width: 200px;
  height: 100%;
  top: 70px;
  left: 0;
}

.copy {
  position: absolute;
  left: 0;
  bottom: 80px;
  width: 100%;
  text-align: center;
  color: #fff;
  margin: 0;
  font-size: 14px;
}

.nav-bar ul {
  height: 100%;
}




/* 内容 */

.content-wrap {
  position: absolute;
  width: auto;
  height: 100%;
  top: 70px;
  bottom: 0;
  left: 200px;
  right: 0;
  background-color: #fff;
  overflow-y: scroll;
  overflow-x: auto;
  padding: 20px 30px;
  /* display: flex;
  flex-direction: column; */
}

.breadcrumb {
  margin-bottom: 20px;
}

.operation-top {
  width: 100%;
  margin-bottom: 20px;
}

.content-table {
  width: 100%;
  /* flex: 1; */
}

@media screen and (max-height: 680px) {
  .content-table {
    overflow-y: scroll;
    overflow-x: auto;
  }
}
/*
.pages {
  height: 120px;
  text-align: right;
  margin-top: 20px;
} */
</style>

<template>
  <div class="index-wrap">
    <!-- 头部 -->
    <header>
      <div class="logo">大筑优图</div>
      <div class="login-info">
        <el-dropdown trigger="click">
          <span class="avatar-wrap">
            <img class="avatar" src="../assets/image/admin.jpg" alt="头像">
            <span class="nick-name">管理员</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <!-- /头部 -->

    <!-- 左侧导航 -->
    <nav class="nav-bar">
      <el-menu :default-active="currentOpen" :unique-opened="true" class="el-menu-vertical-demo" theme="dark" :router="true">
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>首页</el-menu-item>
        <el-submenu index="/list">
          <template slot="title">
            <i class="el-icon-message"></i>教师管理</template>
          <el-menu-item-group>
            <el-menu-item index="/list/student">教师资费</el-menu-item>
            <el-menu-item index="/list/teacher">老师用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>文章管理</el-menu-item>
      </el-menu>
      <p class="copy">2017 &copy;<br> Sennki All Rights Reserved</p>
    </nav>
    <!-- /左侧导航 -->

    <!-- 右侧内容 -->
    <router-view></router-view>
    <!-- 右侧内容 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentOpen: this.$route.path
    }
  },

  created() {
  },

  methods: {

    //退出
    logout(){
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>


