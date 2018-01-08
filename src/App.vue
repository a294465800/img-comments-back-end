<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
  box-sizing: border-box;
}

body,
html {
  height: 100%;
}

body {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.content-wrap {
  position: absolute;
  width: auto;
  top: 70px;
  bottom: 0;
  left: 200px;
  right: 0;
  background-color: #fff;
  overflow: auto;
  padding: 20px 30px;
}
</style>
