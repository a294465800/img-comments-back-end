import Vue from 'vue'
const _v = Vue.prototype
export default {
  data: {
    // host: 'https://www.arch-seu.com/',
    host: 'http://192.168.3.22:8099/',
  },

  //出错提示函数
  APIError(error) {
    _v.$alert(error.data.message, '出错啦', {
      confirmButtonText: '确定',
    })
  },


  //登录 api
  login(data, cb) {
    _v.$http.post(this.data.host + 'login', _v.$qs.stringify(data))
      .then(res => {
        if ('OK' === res.data.code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res.data.message)
        }
      }).catch(error => {
        this.APIError(error.response)
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
      this.APIError(error.response)
    })
  },

  //新增老师信息
  addTeacher(data, cb) {
    _v.$http.post(this.data.host + 'teacher', _v.$qs.stringify(data))
      .then(res => {
        if ('OK' === res.data.code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res.data.message)
        }
      })
      .catch(error => {
        this.APIError(error.response)
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
        this.APIError(error.response)
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
      this.APIError(error.response)
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
      this.APIError(error.response)
    })
  },

  //获取文章图片
  getArticle(cb) {
    _v.$http.get(this.data.host + 'api/v1/article', {
      params: {
        type: 1
      },
    }).then(res => {
      if ('OK' === res.data.code) {
        _v.$http.get(this.data.host + 'api/v1/article', {
          params: {
            type: 2
          },
        }).then(rs => {
          if ('OK' === rs.data.code) {
            typeof cb === 'function' && cb([res.data.data, rs.data.data])
          } else {
            this.APIError(rs.data.message)
          }
        }).catch(error => {
          this.APIError(error.response)
        })
      } else {
        this.APIError(res.data.message)
      }
    }).catch(error => {
      this.APIError(error.response)
    })
  },

  //设置文章
  setArticle(data, cb) {
    _v.$http({
      url: this.data.host + 'article',
      method: 'POST',
      data: _v.$qs.stringify(data)
    }).then(res => {
      if ('OK' === res.data.code) {
        typeof cb === 'function' && cb(res)
      } else {
        this.APIError(res.data.message)
      }
    }).catch(error => {
      this.APIError(error.response)
    })
  },

  //获取点评金额
  getCommitMoney(data, cb){
    _v.$http.get(this.data.host + 'config', {
      params: data
    })
    .then(res => {
      if ('OK' === res.data.code) {
        typeof cb === 'function' && cb(res)
      } else {
        this.APIError(res.data.message)
      }
    })
    .catch(error => {
      this.APIError(error.response)      
    })
  },

  //修改点评金额
  changeCommitMoney(data, cb){
    _v.$http.post(this.data.host + 'config', _v.$qs.stringify(data))
    .then(res => {
      if ('OK' === res.data.code) {
        typeof cb === 'function' && cb(res)
      } else {
        this.APIError(res.data.message)
      }
    })
    .catch(error => {
      this.APIError(error.response)
    })
  }
}
