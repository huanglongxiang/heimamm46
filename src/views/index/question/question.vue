<template>
  <el-card class="question-content">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="学科">
        <el-select v-model="formInline.region" placeholder="请选择学科">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段">
        <el-select v-model="formInline.region" placeholder="请选择阶段">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业">
        <el-select v-model="formInline.region" placeholder="请选择企业">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型">
        <el-select v-model="formInline.region" placeholder="请选择题型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <br />
      <el-form-item label="难度">
        <el-select v-model="formInline.region" placeholder="请选择难度">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.region" placeholder="请选择状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-input v-model="formInline.user" placeholder="请选择日期"></el-input>
      </el-form-item>
      <br />
      <el-form-item class="title" label="标题">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>清除</el-button>
        <el-button icon="el-icon-plus" type="primary">新增试题</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  methods: {}
};
</script>

<style lang="less">
.question-content {
  .el-form-item {    
    &:not(:last-child) .el-form-item__content{
      width: 150px;
    }
    &.title {
      .el-form-item__content {
        width: 388px;
      }
    }
  }

  // 头卡
  .el-card__body {
    padding-left: 11px;
  }
  .el-form-item__label {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>