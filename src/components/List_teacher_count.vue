<style scoped>
.operation-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.active {
  display: none;
}

.operation-input {
  width: 350px;
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <section class="content-wrap">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>教师管理</el-breadcrumb-item>
        <el-breadcrumb-item>教师资费</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->

    <div class="operation-wrap">
      <el-date-picker v-model="currentMonth" type="month" @change="selectMonth" placeholder="选择月">
      </el-date-picker>
      <div class="operation-input">
        <el-input placeholder="请输入点评回扣金额" v-model="commitMoney" :class="{active: isActive}">
        </el-input>
        <div :class="{active: !isActive}">当前点评回扣： {{commitMoney}} 元</div>
        <el-button type="primary" @click="changeCommitMoney">{{isActiveText}}</el-button>
      </div>
    </div>
    <!-- 表格内容 -->
    <div class="content-table">
      <el-table :data="tableData" border :stripe="true">
        <el-table-column prop="teacher_id" label="ID"></el-table-column>
        <el-table-column prop="teacher" label="姓名" align="center"></el-table-column>
        <el-table-column prop="number" label="工号" align="center"></el-table-column>
        <el-table-column prop="count" label="资费" :formatter="addMoney" align="center"></el-table-column>
        <!-- <el-table-column label="操作" width="180" align="center">
                              <template scope="scope">
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                              </template>
                            </el-table-column> -->
      </el-table>
    </div>
    <!-- /表格内容 -->

    <!-- 分页 -->
    <!-- <div class="pages">
                            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
                            </el-pagination>
                          </div> -->
    <!-- /分页 -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      total: 32,
      currentPage: 1,
      currentMonth: new Date().toDateString(),
      tableData: [],
      isActive: true,
      isActiveText: '修改',
      commitMoney: 1,
    }
  },

  created() {
    // this.$api.getOrders({ limit: 10, state: 1, page: 1 })
    this.$api.getTeacherCount('', res => {
      this.tableData = res.data.data
    })
    this.$api.getCommitMoney('', res => {
      this.commitMoney = res.data.data.price
    })
  },

  methods: {

    //格式化金额
    addMoney(row, column, cellValue) {
      return cellValue + ' 元'
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    //月份选择触发
    selectMonth(month) {
      this.$api.getTeacherCount({ time: month + '-01' }, res => {
        this.tableData = res.data.data
      })
    },

    //修改回扣金钱
    changeCommitMoney() {
      this.isActive = !this.isActive
      if (this.isActive) {
        this.isActiveText = '修改'
        this.$api.changeCommitMoney({ price: this.commitMoney }, (result) => {
          this.$message({
            type: 'success',
            showClose: true,
            message: '修改成功',
          })
        })
      } else {
        this.isActiveText = '确定'
      }
    },

    // //页码跳转
    // handleCurrentChange(e) {

    // },
  }
}
</script>