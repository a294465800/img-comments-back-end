<style scoped>
.operation-search {
  float: right;
  width: 450px;
}

.pages {
  text-align: right;
  margin-top: 20px;
}
</style>

<template>
  <section class="content-wrap">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>所有图片</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->

    <!-- 表格内容 -->
    <div class="content-table">
      <el-table :data="tableData" border :stripe="true">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="category" label="分类" :formatter="addCategory" align="center"></el-table-column>
        <el-table-column prop="user_id" label="用户ID" align="center"></el-table-column>
        <el-table-column label="打赏费用" align="center">
          <template scope="scope">{{scope.row.price}} 元</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template scope="scope">{{scope.row.stete == 1 ?'未点评':'已点评'}} </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
      teacherTypes: ['建筑学', '城规', '美术学', '景观'],

      currentPage: 1,

      tableData: [],

      total: 0,
    }
  },

  created() {
    this.$api.getPicturesCount('', res => {
      this.total = res.data.data
    })
    this.$api.getAllPictures({ type: 3, page: 1 }, (res) => {
      this.tableData = res.data.data
    })
  },

  methods: {

    //修改目录输出
    addCategory(row, column, cellValue) {
      return this.teacherTypes[cellValue - 1]
    },

    //教师删除
    handleDelete(index, row) {
      this.$confirm('此操作将删除该学生图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deletePicture(row.id, res => {
          this.tableData.splice(index, 1)
          this.total--
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    //页码跳转
    handleCurrentChange() {
      this.$api.getAllPictures({ type: 3, page: this.currentPage }, (res) => {
        this.tableData = res.data.data
      })
    },


  }
}
</script>