<style scoped>

</style>

<template>
  <section class="content-wrap">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>学生用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->

    <!-- 表格内容 -->
    <div class="content-table">
      <el-table :data="tableData" border :stripe="true">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="250" align="center"></el-table-column>
        <el-table-column prop="times" label="提交作业次数" width="150" :formatter="addTimes" align="center"></el-table-column>
        <el-table-column prop="money" label="赞助总费用" width="150" :formatter="addMoney" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
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
      total: 32,
      currentPage: 1,

      tableData: [{
        id: 1,
        name: '王小虎',
        money: 5,
        times: 5,
      }, {
        id: 2,
        name: '王小虎',
        money: 30,
        times: 4,
      }, {
        id: 3,
        name: '王小虎',
        money: 0,
        times: 35,
      }, {
        id: 4,
        name: '王小虎',
        money: 25.5,
        times: 2,
      }, {
        id: 4,
        name: '王小虎',
        money: 25.5,
        times: 2,
      }, {
        id: 4,
        name: '王小虎',
        money: 25.5,
        times: 2,
      }, {
        id: 4,
        name: '王小虎',
        money: 25.5,
        times: 2,
      }, {
        id: 4,
        name: '王小虎',
        money: 25.5,
        times: 2,
      }, {
        id: 4,
        name: '王小虎',
        money: 25.5,
        times: 2,
      }, {
        id: 4,
        name: '王小虎',
        money: 25.5,
        times: 2,
      }, {
        id: 4,
        name: '王小虎',
        money: 25.5,
        times: 2,
      }]
    }
  },

  methods: {

    //格式化次数
    addTimes(row, column, cellValue) {
      return cellValue + ' 次'
    },

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

    //页码跳转
    handleCurrentChange(e) {

    },


  }
}
</script>