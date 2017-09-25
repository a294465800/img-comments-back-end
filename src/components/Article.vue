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
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->

    <!-- <div class="operation-top">
        <div class="operation-btn">
          <el-button type="primary" @click="newTeacher">新增老师</el-button>
        </div> -->
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
    <!-- </div> -->

    <!-- 表格内容 -->
    <div class="content-table">
      <el-table :data="tableData" border :stripe="true">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="url" label="url" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
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

      tableData: [
        {
          id: 1,
          name: '哈喽',
          url: 'https://www.baidu.com',
          type: 1,
        },
        {
          id: 2,
          name: '哈喽',
          url: 'https://www.baidu.com',
          type: 2,
        }
      ],
    }
  },

  created() {
  },

  methods: {

    //老师表单校验
    checkTeacherInfo() {
      if (this.newTeacherInfo.name && this.newTeacherInfo.number) {
        return true
      }
      return false
    },

    //图片编辑
    handleEdit(index, row) {
      this.$router.push({ name: 'Article_upload', params: { article: row } })
    },

    //页码跳转
    // handleCurrentChange(e) {
    //   console.log(e, this.$api.sayHi())
    // },


  }
}
</script>