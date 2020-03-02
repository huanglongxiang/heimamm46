<template>
  <div class="videoQuestion">
    <el-upload
      class="upload-demo"
      :action="videoURL"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传MP4文件，且不超过2MB</div>
    </el-upload>
    <video :src="imageUrl" controls class="videos"></video>
  </div>
</template>

<script>
export default {
  name: "videoQuestion",
  props: {
      video: String
  },
  data() {
    return {
      videoURL: process.env.VUE_APP_URL + "/question/upload",
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('update:video',res.data.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传视频只能是MP4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 4MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
</style>