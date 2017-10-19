<style scoped>
.operation-top::after {
  content: "";
  display: block;
  clear: both;
}

.content-wrap {
  overflow: auto;
  height: 100%;
}

.operation-btn {
  float: left;
}

.operation-search {
  float: right;
  width: 450px;
}

.pages {
  margin-top: 20px;
  text-align: right;
}
</style>

<template>
  <section class="content-wrap">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>教师管理</el-breadcrumb-item>
        <el-breadcrumb-item>教师用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->

    <div class="operation-top">
      <div class="operation-btn">
        <el-button type="primary" @click="newTeacher">新增教师</el-button>
      </div>
      <!-- <div class="operation-search" @keydown.enter="searchTeacher">
                            <el-input placeholder="请输入内容" v-model="search">
                              <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 110px;">
                                <el-option label="ID" value="id"></el-option>
                                <el-option label="教师名称" value="name"></el-option>
                                <el-option label="教师工号" value="number"></el-option>
                              </el-select>
                              <el-button slot="append" icon="search" @click="searchTeacher"></el-button>
                            </el-input>
                          </div> -->
    </div>

    <!-- 表格内容 -->
    <div class="content-table">
      <el-table :data="tableData" border :stripe="true">
        <el-table-column prop="category" label="分类" :formatter="addCategory" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="number" label="工号" align="center"></el-table-column>
        <el-table-column prop="description" label="简介" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center">
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
      //教师类型
      teacherTypes: ["建筑学", "城规", "美术学", "景观"],

      //搜索框
      search: "",
      select: "",

      //教师信息表单
      newTeacherInfo: {
        name: "",
        number: "",
        description: "",
        category: ""
      },

      editTeacherInfo: {
        name: "",
        code: "",
        description: "",
        category: ""
      },

      total: 0,
      currentPage: 1,

      tableData: []
    };
  },

  created() {
    this.$api.getTeacherCountPage("", res => {
      this.total = res.data.data;
    });
    this.$api.getTeachers({ page: 1 }, res => {
      this.tableData = res.data.data;
    });
  },

  methods: {
    //老师表单校验
    checkTeacherInfo() {
      if (this.newTeacherInfo.name && this.newTeacherInfo.number) {
        return true;
      }
      return false;
    },

    //同步分类
    SyncTeacherType(event) {
      const select = document.querySelector("#selectInput input");
      select.value = event.target.innerHTML.replace(/[<>\/span]/g, "");
    },

    //新增老师
    newTeacher() {
      const self = this;
      const h = this.$createElement;
      this.$msgbox({
        title: "新增教师",
        message: h(
          "el-form",
          {
            props: {
              "label-position": "top",
              "label-width": "80px"
            }
          },
          [
            h(
              "el-form-item",
              {
                props: {
                  label: "教师名称"
                }
              },
              [
                h("el-input", {
                  props: {
                    placeholder: "请输入教师名称"
                  },
                  on: {
                    input: value => {
                      this.newTeacherInfo.name = value;
                    }
                  }
                })
              ]
            ),
            h(
              "el-form-item",
              {
                props: {
                  label: "工号"
                }
              },
              [
                h("el-input", {
                  props: {
                    placeholder: "请输入工号"
                  },
                  on: {
                    input: value => {
                      this.newTeacherInfo.number = value;
                    }
                  }
                })
              ]
            ),
            h(
              "el-select",
              {
                domProps: {
                  id: "selectInput"
                },
                props: {
                  placeholder: "请选择教师类型"
                },
                on: {
                  input: value => {
                    this.newTeacherInfo.category = value;
                  }
                }
              },
              [
                h("el-option", {
                  props: {
                    key: 1,
                    label: "建筑学",
                    value: 1
                  },
                  nativeOn: {
                    click: event => {
                      this.SyncTeacherType(event);
                    }
                  }
                }),
                h("el-option", {
                  props: {
                    key: 2,
                    label: "城规",
                    value: 2
                  },
                  nativeOn: {
                    click: event => {
                      this.SyncTeacherType(event);
                    }
                  }
                }),
                h("el-option", {
                  props: {
                    key: 3,
                    label: "美术学",
                    value: 3
                  },
                  nativeOn: {
                    click: event => {
                      this.SyncTeacherType(event);
                    }
                  }
                }),
                h("el-option", {
                  props: {
                    key: 4,
                    label: "景观",
                    value: 4
                  },
                  nativeOn: {
                    click: event => {
                      this.SyncTeacherType(event);
                    }
                  }
                })
              ]
            ),
            h(
              "el-form-item",
              {
                domProps: {
                  style: "margin-top: 20px"
                },
                props: {
                  label: "简介"
                }
              },
              [
                h("el-input", {
                  props: {
                    placeholder: "请输入简介",
                    type: "textarea"
                  },
                  on: {
                    input: value => {
                      this.newTeacherInfo.description = value;
                    }
                  }
                })
              ]
            )
          ]
        ),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            if (
              !(
                this.newTeacherInfo.name &&
                this.newTeacherInfo.category &&
                this.newTeacherInfo.description &&
                this.newTeacherInfo.number
              )
            ) {
              this.$message({
                type: "warning",
                message: "信息不能为空",
                showClose: true
              });
              return false;
            }
            if (
              this.newTeacherInfo.name.length > 10 ||
              /\d/.test(this.newTeacherInfo.name)
            ) {
              this.$message({
                type: "warning",
                message: "名称不能为数字且10字以内"
              });
            } else if (!/^[0-9]*$/.test(this.newTeacherInfo.number)) {
              this.$message({
                type: "warning",
                message: "工号只能为数字"
              });
            } else if (this.newTeacherInfo.description.length > 50) {
              this.$message({
                type: "warning",
                message: "教师简介请控制在50字以内"
              });
            } else {
              done();
            }
          } else {
            done();
          }
        }
      })
        .then(action => {
          this.$api.addTeacher(this.newTeacherInfo, res => {
            this.$message({
              type: "success",
              message: "新增成功！"
            });
            window.location.reload();
          });
        })
        .catch(cancel => {
          this.$message({
            type: "info",
            message: "取消了操作"
          });
        });
    },

    //修改目录输出
    addCategory(row, column, cellValue) {
      return this.teacherTypes[cellValue - 1];
    },

    //格式化次数
    // addTimes(row, column, cellValue) {
    //   return cellValue + ' 次'
    // },

    //格式化金额
    // addMoney(row, column, cellValue) {
    //   return cellValue + ' 元'
    // },

    //教师编辑
    handleEdit(index, row) {
      this.editTeacherInfo.name = row.name;
      this.editTeacherInfo.code = row.number;
      this.editTeacherInfo.category = row.category;
      this.editTeacherInfo.description = row.description;
      const h = this.$createElement;
      this.$msgbox({
        title: "修改教师",
        message: h(
          "el-form",
          {
            props: {
              "label-position": "top",
              "label-width": "80px"
            }
          },
          [
            h(
              "el-form-item",
              {
                props: {
                  label: "教师名称"
                }
              },
              [
                h("el-input", {
                  props: {
                    placeholder: "请输入教师名称",
                    value: row.name
                  },
                  on: {
                    input: value => {
                      this.editTeacherInfo.name = value;
                    }
                  }
                })
              ]
            ),
            h(
              "el-form-item",
              {
                props: {
                  label: "工号"
                }
              },
              [
                h("el-input", {
                  props: {
                    placeholder: "请输入工号",
                    value: row.number
                  },
                  on: {
                    input: value => {
                      this.editTeacherInfo.code = value;
                    }
                  }
                })
              ]
            ),
            h(
              "el-select",
              {
                domProps: {
                  id: "selectInput"
                },
                props: {
                  placeholder: "请选择教师类型",
                  value: this.teacherTypes[row.category * 1 - 1]
                },
                on: {
                  input: value => {
                    this.editTeacherInfo.category = value;
                  }
                }
              },
              [
                h("el-option", {
                  props: {
                    key: 1,
                    label: "建筑学",
                    value: 1
                  },
                  nativeOn: {
                    click: event => {
                      this.SyncTeacherType(event);
                    }
                  }
                }),
                h("el-option", {
                  props: {
                    key: 2,
                    label: "城规",
                    value: 2
                  },
                  nativeOn: {
                    click: event => {
                      this.SyncTeacherType(event);
                    }
                  }
                }),
                h("el-option", {
                  props: {
                    key: 3,
                    label: "美术学",
                    value: 3
                  },
                  nativeOn: {
                    click: event => {
                      this.SyncTeacherType(event);
                    }
                  }
                }),
                h("el-option", {
                  props: {
                    key: 4,
                    label: "景观",
                    value: 4
                  },
                  nativeOn: {
                    click: event => {
                      this.SyncTeacherType(event);
                    }
                  }
                })
              ]
            ),
            h(
              "el-form-item",
              {
                domProps: {
                  style: "margin-top: 20px"
                },
                props: {
                  label: "简介"
                }
              },
              [
                h("el-input", {
                  props: {
                    placeholder: "请输入简介",
                    type: "textarea",
                    value: row.description
                  },
                  on: {
                    input: value => {
                      this.editTeacherInfo.description = value;
                    }
                  }
                })
              ]
            )
          ]
        ),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            if (
              this.editTeacherInfo.name.length > 10 ||
              /\d/.test(this.editTeacherInfo.name)
            ) {
              this.$message({
                type: "warning",
                message: "名称不能为数字且10字以内"
              });
            } else if (!/^[0-9]*$/.test(this.editTeacherInfo.code)) {
              this.$message({
                type: "warning",
                message: "工号只能为数字"
              });
            } else if (this.editTeacherInfo.description.length > 50) {
              this.$message({
                type: "warning",
                message: "教师简介请控制在50字以内"
              });
            } else {
              done();
            }
          } else {
            done();
          }
        }
      })
        .then(action => {
          this.$api.editTeacher(this.editTeacherInfo, row.id, data => {
            this.tableData[index].name = this.editTeacherInfo.name;
            this.tableData[index].number = this.editTeacherInfo.code;
            this.tableData[index].category = this.editTeacherInfo.category;
            this.tableData[
              index
            ].description = this.editTeacherInfo.description;
            this.$message({
              type: "success",
              message: "修改成功！"
            });
          });
        })
        .catch(cancel => {
          this.$message({
            type: "info",
            message: "取消了操作"
          });
        });
    },

    //教师删除
    handleDelete(index, row) {
      this.$confirm("此操作将删除该教师数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.deleteTeacher(row.id, res => {
            this.tableData.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //页码跳转
    handleCurrentChange(page) {
      this.$api.getTeachers({ page: page }, res => {
        this.tableData = res.data.data;
      });
    }
  }
};
</script>