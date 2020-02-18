<template>
  <div class="subject-content">
    <!-- 头部搜索 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.user" class="subjectID"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user" class="subjectAuthor"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>清除</el-button>
          <el-button 
          icon="el-icon-plus" 
          type="primary"
          @click="$refs.subAdd.dialogFormVisible=true">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="bottom-card">
      <template>
        <!-- 表格内容 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="rid" label="学科编号"></el-table-column>
          <el-table-column prop="name" label="学科名称"></el-table-column>
          <el-table-column prop="short_name" label="简称"></el-table-column>
          <el-table-column prop="intro" label="创建者"></el-table-column>
          <el-table-column prop="create_time" label="创建日期"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">启用</span>
              <span v-else style="color:red">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="text" @click="handleNoAllow(scope.$index, scope.row)">
                  {{ scope.row.status ===1?'禁用':'启用' }}
              </el-button>
              <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
          class="pageLocation"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </template>
    </el-card>
    <!-- 新增对话框 -->
    <subjectAdd ref="subAdd"></subjectAdd>
  </div>
</template>

<script>
import subjectAdd from './components/subjectAdd'

export default {
  name: "subject",
  components: {
    subjectAdd
  },
  data() {
    return {
      /* 头数据 */
      formInline: {
        user: "",
        region: ""
      },
      /* 表格内容数据 */
      tableData: [],
      /* 分页数据 */
      currentPage: 4
    };
  },
   created() {
    this.reading();
  },
  methods: {
    /* 数据操作方法 */
    handleEdit(index, row) {
      window.console.log(index, row);
    },
    // 状态切换
    async handleNoAllow(index, row) {
      let _data = await this.$getAPI('statusSubject',{id: row.id});
      if (_data.code == 200) {
        this.$message.success('修改成功');
        this.reading();
      }
    },
    handleDelete(index, row) {
      window.console.log(index, row);
    },
    /* 分页方法 */
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    },
    /* 读取数据 */
    async reading(){
      let _data = await this.$getAPI("getSubjectList");
      this.tableData = _data.data.items;
    }
  }
};
</script>

<style lang="less">
.subject-content {
  .box-card {
    height: 103px;
    .subjectID,
    .subjectAuthor {
      width: 100px;
    }
  }
  .bottom-card {
    margin-top: 19px;
    .pageLocation{
      margin-top: 30px;
      text-align: center
    }
  }
}
</style>