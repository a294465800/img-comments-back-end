import Vue from 'vue'
const _v = Vue.prototype
export default {
  data: {
    host: 'http://192.168.3.22:8099/',
  },

  //出错提示函数
  APIError(error) {
    _v.$alert(error, '出错啦', {
      confirmButtonText: '确定',
      // callback: action => {
      //   _v.$message({
      //     type: 'info',
      //     message: error
      //   })
      // }
    })
  },


  //登录 api
  login(data, cb) {
    _v.$http({
      url: this.data.host + 'login',
      method: 'POST',
      data: _v.$qs.stringify(data)
    }).then(res => {
      if ('OK' === res.data.code) {
        typeof cb === 'function' && cb(res)
      } else {
        this.APIError(res.data.message)
      }
    }).catch(error => {
      this.APIError(error)
    })
  },

  //获取老师信息
  getTeachers(data, cb) {
    _v.$http.get(this.data.host + 'teachers', {
      params: data,
    }).then(res => {
      if ('OK' === res.data.code) {
        typeof cb === 'function' && cb(res)
      } else {
        this.APIError(res.data.message)
      }
    }).catch(error => {
      this.APIError(error)
    })
  },

  //新增老师信息
  addTeacher(data, cb) {
    _v.$http({
      url: this.data.host + 'teacher',
      method: 'POST',
      data: _v.$qs.stringify(data)
    }).then(res => {
      if ('OK' === res.data.code) {
        typeof cb === 'function' && cb(res)
      } else {
        this.APIError(res.data.message)
      }
    }).catch(error => {
      this.APIError(error)
    })
  },

  //删除教师
  deleteTeacher(id, cb) {
    _v.$http.get(this.data.host + 'teacher/delete/' + id)
      .then(res => {
        if ('OK' === res.data.code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res.data.message)
        }
      })
      .catch(error => {
        this.APIError(error)
      })
  },

  /**
   *  获取订单信息
   * state: 0 ==> 未支付  ; state: 1 ==> 支付
   * data: {limit, page, state}
   * @param {*} data 
   * @param {*} cb 
   */
  getOrders(data, cb) {
    _v.$http.get(this.data.host + 'orders', {
      params: data,
    }).then(res => {
      if ('OK' === res.data.code) {
        typeof cb === 'function' && cb(res)
      } else {
        this.APIError(res.data.message)
      }
    }).catch(error => {
      this.APIError(error)
    })
  },

  //获取老师工资
  getTeacherCount(data, cb) {
    _v.$http.get(this.data.host + 'count', {
      params: data,
    }).then(res => {
      if ('OK' === res.data.code) {
        typeof cb === 'function' && cb(res)
      } else {
        this.APIError(res.data.message)
      }
    }).catch(error => {
      this.APIError(error)
    })
  }
}
