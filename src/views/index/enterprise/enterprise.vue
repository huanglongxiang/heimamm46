<template>
  <div class="enterprise-content">
    <!-- 头部搜索 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="selectForm">
        <el-form-item label="企业编号" prop="rid">
          <el-input v-model="formInline.eid" class="subjectID"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username" class="subjectAuthor"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="所有" value></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="refEnterprise">查询</el-button>
          <el-button @click="clearFrom">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="addEnterprise">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="bottom-card">
      <template>
        <!-- 表格内容 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="eid" label="企业编号"></el-table-column>
          <el-table-column prop="name" label="企业名称"></el-table-column>
          <el-table-column prop="username" label="创建者"></el-table-column>
          <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">{{scope.row.create_time | filterTime}}</template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">启用</span>
              <span v-else style="color:red">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleNoAllow(scope.$index, scope.row)"
              >{{ scope.row.status ===1?'禁用':'启用' }}</el-button>
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
          :page-sizes="[2, 5, 10, 12]"
          :page-size="page"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </template>
    </el-card>
    <!-- 弹框组件 -->
    <enterpriseEdit ref="enterpriseEdit" @refEnterprise="refEnterprise"></enterpriseEdit>
  </div>
</template>

<script>
import enterpriseEdit from "./components/enterpriseEdit";

export default {
  name: "enterprise",
  components: {
    enterpriseEdit
  },
  data() {
    return {
      /* 头数据 */
      formInline: {
        name: "",
        eid: "",
        username: "",
        status: ""
      },
      /* 表格内容数据 */
      tableData: [],
      /* 分页数据 */
      currentPage: 1,
      total: 400,
      page: 5,
      index: 1
    };
  },
  created() {
    this.reading();
  },
  methods: {
    // 新增企业
    addEnterprise() {
      this.$refs.enterpriseEdit.show();
    },
    // 清空表单
    clearFrom() {
      this.$refs.selectForm.resetFields();
      this.index = 1;
      this.reading();
    },
    // 重新加载
    refEnterprise() {
      this.reading();
    },
    // 启用禁用
    async handleNoAllow(index, row) {
      let _data = await this.$getAPI("enterpriseStatus", { id: row.id });
      if (_data.code == 200) {
        this.$message.success("修改成功");
        this.reading();
      }
    },
    // 读取列表数据
    reading() {
      this.$getAPI("enterpriseList", {
        limit: this.page,
        page: this.index,
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.items;
        this.total = res.data.pagination.total;
      });
    },
    // 分页
    handleSizeChange(val) {
      this.page = val;
      this.reading();
    },
    handleCurrentChange(val) {
      this.index = val;
      this.reading();
    },
    // 编辑
    handleEdit(index, row) {
      this.$refs.enterpriseEdit.show(JSON.parse(JSON.stringify(row)));
    },
    // 删除
    handleDelete(index, row) {
      window.console.log(index, row);
      this.$confirm("此操作将永久删除该企业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$getAPI("enterpriseRemove", {
            id: row.id
          }).then(res => {
            if (res.code == 200) {
              this.$message.success("删除成功");
              this.index--;
              if (this.index <= 0) {
                this.index = 1;
              }
              this.reading();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less">
.enterprise-content {
  .box-card {
    height: 103px;
    .subjectID,
    .subjectAuthor {
      width: 100px;
    }
  }
  .bottom-card {
    margin-top: 19px;
    .pageLocation {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>