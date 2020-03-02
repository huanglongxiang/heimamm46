<template>
  <div class="questionContent">
    <!-- 筛选 -->
    <el-card class="question-content">
      <el-form :inline="true" :model="formInline" ref="formData" class="demo-form-inline">
        <el-form-item label="学科" prop="subject">
          <subjectList v-model="formInline.subject" />
        </el-form-item>
        <el-form-item label="阶段"  prop="stype">
          <el-select v-model="formInline.stype" placeholder="请选择阶段">
            <el-option label="所有" value=""></el-option>
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业"  prop="enterprise">
          <enterpriseSelect :value="formInline.enterprise" @input="v=>formInline.enterprise = v"></enterpriseSelect>
        </el-form-item>
        <el-form-item label="题型"  prop="type">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="所有" value=""></el-option>
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="所有" value=""></el-option>
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="复杂" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态"  prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="所有" value=""></el-option>
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <el-date-picker v-model="formInline.create_date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item class="title" label="标题"  prop="title">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">搜索</el-button>
          <el-button @click="clearSearch('formData')">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="addQuestion">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容显示区 -->
    <el-card class="content">
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目">
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
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">{{ {1:'单选', 2:'多选', 3:'简答'}[scope.row.type] }}</template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editQuestion(scope.row)">编辑</el-button>
            <el-button type="text" @click="updateStatus(scope.$index, scope.row)">
              {{scope.row.status === 1 ? '禁用': '启用'}}
            </el-button>
            <el-button type="text" @click="delquestion(scope.row)">删除</el-button>
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
    <questionAdd ref="questionAdd" :compileOrAdd="compileOrAdd" @reading="getList"></questionAdd>
  </div>
</template>

<script>
import questionAdd from "./components/questionAdd";
export default {
  name: "question",
  components: {
    questionAdd
  },
  data() {
    return {
      compileOrAdd: true, // true 为新增  false 为编辑
      formInline: {
        subject: 0,
        title: "",
        enterprise:0,
        type:"",
        step: "",
        username:"",
        status: "",
        difficulty:"",
        create_date:""
      },
      tableData: [],
      index: 1,
      size: 2,
      total: 50
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 删除
    delquestion(row){
      // 删除提示
      this.$confirm("此操作将永久删除该题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          // 调用接口
          this.$getAPI('questionRemove', {id:row.id}).then( res => {
            if (res.code == 200) {
              this.$message.success("删除成功!");
              // 增加最后一页判断
              if (this.tableData.length == 1) {
                this.index--;
                if (this.index <= 0) {
                  this.index == 1;
                }
              }
              this.getList();
            }
          })
        }).catch(() => {
        });
    },
    // 清空查询条件
    clearSearch(form){
      this.$refs[form].resetFields();
      this.index = 1;
      this.getList();
    },
    // 修改状态
    async updateStatus(index, row){
      let _data = await this.$getAPI('questionStatus', {id: row.id});
      if (_data.code === 200) {
        this.$message.success('操作成功');
        this.getList();
      } 
    },
    // 编辑
    editQuestion(row) {
      let formdata = row;
      formdata.city = formdata.city.split(",");
      formdata.multiple_select_answer = formdata.multiple_select_answer.split(
        ","
      );
      this.compileOrAdd = false;
      this.$refs.questionAdd.dialogFormVisible = true;
      this.$refs.questionAdd.form = JSON.parse(JSON.stringify(formdata));
    },
    // 添加方法
    addQuestion() {
      this.$refs.questionAdd.dialogFormVisible = true;
      this.compileOrAdd = true;
    },
    // 获取数据
    getList() {
      this.$getAPI("questionList",{
        page: this.index,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.items;
        this.total = res.data.pagination.total;
      });
    },
    // 分页器
    handleSizeChange(val) {
      this.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.index = val;
      this.getList();
    }
  }
};
</script>

<style lang="less">
.questionContent {
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
  }
  // 内容
  .content {
    margin-top: 21px;
    .el-pagination {
      margin-top: 31px;
      text-align: center;
    }
  }
}
</style>