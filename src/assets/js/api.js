import Vue from 'vue'
const _v = Vue.prototype
export default {
  data: {
    host: 'http://119.23.255.177:8089/api/v1/',
  },

  //登录 api
  login(username, password, cb) {
    console.log(_v.$http)
    _v.$http({
      url: this.data.host + 'login',
      method: 'POST',
      data: _v.$qs.stringify({
        username,
        password
      })
    }).then(res => {
      typeof cb === 'function' && cb()
    }).catch(error => {
      _v.$alert(error, '出错啦', {
        confirmButtonText: '确定',
        callback: action => {
          _v.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      })
    })
  }
}
