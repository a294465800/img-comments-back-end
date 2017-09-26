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
  min-height: 300px;
  line-height: 300px;
  text-align: center;
}

.avatar {
  width: 90%;
  min-height: 300px;
  border-radius: 0;
  height: auto;
}

.submit-class {
  margin-bottom: 60px;
  margin-top: 20px;
  padding-left: 60px;
  padding-right: 60px;
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
        <el-upload class="avatar-uploader" action="http://192.168.3.22:8099/upload" with-credentials accept="image/jpg,image/jpeg,image/png" :show-file-list="false" :on-success="uploadSuccess" :before-upload="beforeUpload" :on-error="uploadError">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="submitForm" class="submit-class" size="large">提交</el-button>
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
        url: '',
      },
      imageUrl: this.$api.data.host + this.$route.params.article.url,
    }
  },
  created() {
    // console.log(this.$route.params)
  },

  methods: {

    //上传成功
    uploadSuccess(res, file) {
      this.formImage.url = res.base_url
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    //上传之前检测
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },

    //上传出错
    uploadError(err, file, fileList){
      this.$message.error('上传失败')
    },

    //提交上传
    submitForm(){
      if(this.formImage.name && this.formImage.url){
        this.$api.setArticle(this.formImage, (result) => {
          this.$router.push('/article')
        })
      }
    }
  }
}
</script>
