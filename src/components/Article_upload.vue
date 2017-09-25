<style scoped>
.form-wrap {
  width: 600px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 300px;
  line-height: 300px;
  text-align: center;
}

.avatar {
  width: 90%;
  min-height: 300px;
  display: block;
}
</style>

<template>
  <section class="content-wrap">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- /面包屑导航 -->

    <div class="form-wrap">
      <el-form label-position="top" label-width="80px" :model="formImage">
        <el-form-item label="名称">
          <el-input v-model="formImage.name"></el-input>
        </el-form-item>
        <el-upload class="avatar-uploader" action="http://192.168.3.22:8099/upload" accept="image/jpg,image/jpeg,image/png" :show-file-list="false" :on-success="uploadSuccess" :before-upload="beforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      type: 0,
      formImage: {
        name: this.$route.params.article.name,
        type: this.$route.params.article.type,
        url: this.$route.params.article.url,
      },
      imageUrl: '',
    }
  },
  created() {
    console.log(this.$route.params)
  },

  methods: {
    uploadSuccess(res, file) {
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>
