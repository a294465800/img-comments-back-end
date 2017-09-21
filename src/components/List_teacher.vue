<style scoped>
.operation-top::after {
  content: '';
  display: block;
  clear: both;
}

.operation-btn {
  float: left;
}

.operation-search {
  float: right;
  width: 450px;
}

</style>

<template>
  <section class="content-wrap">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>教师用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->

    <!-- 表格内容 -->
    <div class="content-table">
      <div class="operation-top">
        <div class="operation-btn">
          <el-button type="primary" @click="newTeacher">新增老师</el-button>
        </div>
        <div class="operation-search" @keydown.enter="searchTeacher">
          <el-input placeholder="请输入内容" v-model="search">
            <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 110px;">
              <el-option label="ID" value="id"></el-option>
              <el-option label="教师名称" value="name"></el-option>
              <el-option label="教师工号" value="cardID"></el-option>
            </el-select>
            <el-button slot="append" icon="search" @click="searchTeacher"></el-button>
          </el-input>
        </div>
      </div>
      <el-table :data="tableData" border :stripe="true">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="250" align="center"></el-table-column>
        <el-table-column prop="cardID" label="工号" min-width="200" align="center"></el-table-column>
        <el-table-column prop="times" label="点评次数" width="150" :formatter="addTimes" align="center"></el-table-column>
        <el-table-column prop="money" label="赞助总费用" width="150" :formatter="addMoney" align="center"></el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- /表格内容 -->

    <!-- 分页 -->
    <div class="pages">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <!-- /分页 -->
  </section>
</template>

<script>
export default {
  data() {
    return {

      //搜索框
      search: '',
      select: '',

      //教师信息表单
      newTeacherInfo: {
        name: '',
        cardID: '',
      },

      total: 32,
      currentPage: 1,

      tableData: [
        {
          id: 1,
          name: '王小虎',
          cardID: 1002,
          money: 5,
          times: 5,
        }, {
          id: 2,
          name: '王小虎',
          cardID: 1002,
          money: 30,
          times: 4,
        }, {
          id: 3,
          name: '王小虎',
          cardID: 2000,
          money: 0,
          times: 35,
        }, {
          id: 4,
          name: '王小虎',
          cardID: 1002,
          money: 25.5,
          times: 2,
        }, {
          id: 4,
          name: '王小虎',
          cardID: 1121,
          money: 25.5,
          times: 2,
        }, {
          id: 4,
          name: '王小虎',
          cardID: 1002,
          money: 25.5,
          times: 2,
        }, {
          id: 4,
          name: '王小虎',
          cardID: 8090,
          money: 25.5,
          times: 2,
        }, {
          id: 4,
          name: '王小虎',
          cardID: 1002,
          money: 25.5,
          times: 2,
        }, {
          id: 4,
          name: '王小虎',
          cardID: 6053,
          money: 25.5,
          times: 2,
        }, {
          id: 4,
          name: '王小虎',
          cardID: 1002,
          money: 25.5,
          times: 2,
        }, {
          id: 4,
          name: '王小虎',
          cardID: 1002,
          money: 25.5,
          times: 2,
        }
      ]
    }
  },

  methods: {

    //教师搜索
    searchTeacher(){
      console.log('hi')
    },

    //老师表单校验
    checkTeacherInfo() {
      if (this.newTeacherInfo.name && this.newTeacherInfo.cardID) {
        return true
      }
      return false
    },

    //新增老师
    newTeacher() {
      const h = this.$createElement
      this.$msgbox({
        title: '新增教师',
        message: h('el-form',
          {
            props: {
              'label-position': "top",
              'label-width': "80px"
            }
          }, [
            h('el-form-item',
              {
                props: {
                  label: '教师名称'
                }
              }, [
                h('el-input',
                  {
                    props: {
                      placeholder: '请输入教师名称'
                    },
                    on: {
                      input: value => {
                        this.newTeacherInfo.name = value
                      }
                    }
                  })
              ]),
            h('el-form-item',
              {
                props: {
                  label: '工号'
                }
              }, [
                h('el-input',
                  {
                    props: {
                      placeholder: '请输入工号'
                    },
                    on: {
                      input: value => {
                        this.newTeacherInfo.cardID = value
                      }
                    }
                  })
              ]),
          ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            if (this.checkTeacherInfo()) {
              done()
            } else {
              this.$message({
                type: 'error',
                message: '不能留空！'
              })
            }
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'success',
          message: '新增成功！'
        })
      }).catch(cancel => {
        this.$message({
          type: 'info',
          message: '取消了操作'
        })
      })
    },

    //格式化次数
    addTimes(row, column, cellValue) {
      return cellValue + ' 次'
    },

    //格式化金额
    addMoney(row, column, cellValue) {
      return cellValue + ' 元'
    },

    //教师编辑
    handleEdit(index, row) {
      this.newTeacherInfo.name = row.name
      this.newTeacherInfo.cardID = row.cardID
      const h = this.$createElement
      this.$msgbox({
        title: '修改教师',
        message: h('el-form',
          {
            props: {
              'label-position': "top",
              'label-width': "80px"
            }
          }, [
            h('el-form-item',
              {
                props: {
                  label: '教师名称'
                }
              }, [
                h('el-input',
                  {
                    props: {
                      placeholder: '请输入教师名称',
                      value: row.name,
                    },
                    on: {
                      input: value => {
                        this.newTeacherInfo.name = value
                      }
                    }
                  })
              ]),
            h('el-form-item',
              {
                props: {
                  label: '工号'
                }
              }, [
                h('el-input',
                  {
                    props: {
                      placeholder: '请输入工号',
                      value: row.cardID,
                    },
                    on: {
                      input: value => {
                        this.newTeacherInfo.cardID = value
                      }
                    }
                  })
              ]),
          ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            if (this.checkTeacherInfo()) {
              done()
            } else {
              this.$message({
                type: 'error',
                message: '不能留空！'
              })
            }
          } else {
            done()
          }
        }
      }).then(action => {
        this.tableData[index].name = this.newTeacherInfo.name
        this.tableData[index].cardID = this.newTeacherInfo.cardID
        this.$message({
          type: 'success',
          message: '修改成功！'
        })
      }).catch(cancel => {
        this.$message({
          type: 'info',
          message: '取消了操作'
        })
      })
    },

    //教师删除
    handleDelete(index, row) {
      this.$confirm('此操作将删除该教师数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    //页码跳转
    handleCurrentChange(e) {
      console.log(e, this.$api.sayHi())
    },


  }
}
</script>