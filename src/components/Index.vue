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
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.nick-name {
  height: 100%;
  font-size: 16px;
  color: #fff;
  margin: 0 20px;
}


/* 左侧导航 */

.nav-bar {
  position: absolute;
  width: 250px;
  height: 100%;
  top: 70px;
  left: 0;
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
  left: 250px;
  right: 0;
  background-color: #fff;
  overflow-y: scroll;
  overflow-x: auto;
}
</style>

<template>
  <div class="index-wrap">
    <!-- 头部 -->
    <header>
      <div class="logo">大筑优图</div>
      <div class="login-info">
        <el-dropdown trigger="click">
          <span class="avatar-wrap">
            <img class="avatar" src="https://avatars0.githubusercontent.com/u/25625618?v=4&s=460" alt="头像">
            <span class="nick-name">SHINING</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <!-- /头部 -->

    <!-- 左侧导航 -->
    <nav class="nav-bar">
      <el-menu default-active="2" class="el-menu-vertical-demo" theme="dark" :router="true">
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>首页</el-menu-item>
        <el-submenu index="list">
          <template slot="title">
            <i class="el-icon-message"></i>用户信息</template>
          <el-menu-item-group>
            <el-menu-item index="/student/list">学生用户</el-menu-item>
            <el-menu-item index="/teacher/list">老师用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/article">
          <i class="el-icon-setting"></i>文章</el-menu-item>
      </el-menu>
    </nav>
    <!-- /左侧导航 -->

    <!-- 右侧内容 -->
    <section class="content-wrap">
      <router-view></router-view>
    </section>
    <!-- 右侧内容 -->
  </div>
</template>

<script>
export default {

}
</script>


