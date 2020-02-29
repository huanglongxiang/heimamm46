<template>
  <div class="question-content">
    <!-- 筛选 -->
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <subjectList v-model="formInline.subject" />
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.region" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <enterpriseSelect   :value="formInline.enterprise" @input="v=>formInline.enterprise = v"></enterpriseSelect>
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
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item class="title" label="标题">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="$refs.questionAdd.dialogFormVisible = true">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容显示区 -->
    <el-card class="content">
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="title" label="题目" width="180">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="subject_name" label="学科·阶段">
          <template slot-scope="scope">
            {{ scope.row.subject_name }}
            ·
            {{ {1:'初级', 2: '中级', 3: '高级'}[scope.row.step] }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型" width="180">
          <template slot-scope="scope">
            {{ {1:'单选', 2:'多选', 3:'简答'}[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            {{scope.row.status === 1 ? '启用': '禁用'}}
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量" width="180"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">
              {{scope.row.status === 1 ? '禁用': '启用'}}
            </el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="index"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <questionAdd ref="questionAdd"></questionAdd>
  </div>
</template>

<script>
import questionAdd from './components/questionAdd'
export default {
  name: "question",
  components: {
    questionAdd
  },
  data() {
    return {
      formInline: {
        subject: 0,
        enterprise: 0
      },
      value1: "",            
      tableData: [],
      index:  1,
      size:2,
      total:0
    };
  },
  created() {        
    this.$getAPI("questionList").then(res => {
      this.tableData = res.data.items;
    })
  },
  methods: {
    // 分页器
     handleSizeChange(val) {
        window.console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        window.console.log(`当前页: ${val}`);
      }
  }
};
</script>

<style lang="less" scoped>
.question-content {
  .el-form-item {
    &:not(:last-child) .el-form-item__content {
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
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
  }

  // 内容
  .content{
    margin-top: 21px;
    .el-pagination{
      margin-top: 31px;
      text-align: center;
    }
  }
}
</style>