<style scoped>
.operation-search {
  float: right;
  width: 450px;
}

.pages {
  text-align: right;
  margin-top: 20px;
}

.pre-img-wrap {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.sub-wrap {
  width: 70%;
  text-align: center;
}

.sub-wrap > img {
  max-width: 100%;
}

.sub-wrap > span {
  position: absolute;
  top: 30px;
  right: 30px;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
}

.pre-img-wrap.active {
  display: flex;
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
        <el-table-column prop="category" label="分类" :formatter="addCategory" align="center"></el-table-column>
        <el-table-column prop="nickname" label="用户名称" align="center"></el-table-column>
        <el-table-column prop="avatarUrl" label="用户头像" align="center">
           <template scope="scope">
            <img :src="'https://www.arch-seu.com/' + scope.row.avatarUrl" :alt="scope.row.nickname" :title="scope.row.nickname" style="height: 40px; text-align: center; vertical-align: middle; cursor: pointer;border-radius: 50%;">
          </template>
        </el-table-column>
        <el-table-column label="图片预览" align="center">
          <template scope="scope">
            <img :src="'https://www.arch-seu.com/' + scope.row.url" alt="点击预览" title="点击预览" style="height: 40px; text-align: center; vertical-align: middle; cursor: pointer;" @click="preImgFnc(scope.row.url)">
          </template>
        </el-table-column>
        <el-table-column label="打赏费用" align="center">
          <template scope="scope">{{scope.row.price}} 元</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template scope="scope">{{scope.row.state == 1 ?'未点评':'已点评'}} </template>
        </el-table-column>
        <el-table-column prop="created_at" label="提交时间" show-overflow-tooltip align="center"></el-table-column>
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

    <!-- 图片预览 -->
    <div class="pre-img-wrap" :class="{'active': isPre}">
      <div class="sub-wrap">
        <img :src="preImg" alt="图片">
        <span @click="closePreImg">关闭</span>
      </div>
    </div>
    <!-- /图片预览 -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      //图片预览数据
      isPre: false,
      preImg: "",

      //教师类型
      teacherTypes: ["建筑学", "城规", "美术学", "景观"],

      currentPage: 1,

      tableData: [],

      total: 0
    };
  },

  created() {
    this.$api.getPicturesCount("", res => {
      this.total = res.data.data;
    });
    this.$api.getAllPictures({ type: 3, page: 1 }, res => {
      this.tableData = res.data.data;
    });
  },

  methods: {
    //修改目录输出
    addCategory(row, column, cellValue) {
      return this.teacherTypes[cellValue - 1];
    },

    //教师删除
    handleDelete(index, row) {
      this.$confirm("此操作将删除该学生图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.deletePicture(row.id, res => {
            this.tableData.splice(index, 1);
            this.total--;
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
    handleCurrentChange(currentPage) {
      this.$api.getAllPictures({ type: 3, page: currentPage }, res => {
        this.tableData = res.data.data;
      });
    },

    //图片预览
    preImgFnc(url) {
      this.isPre = true;
      this.preImg = this.$api.data.host + url;
    },

    //关闭预览
    closePreImg() {
      this.isPre = false;
    }
  }
};
</script>