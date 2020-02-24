<template>
  <div class="subject-content">
    <!-- 头部搜索 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="selectForm">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid" class="subjectID"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
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
          <el-button type="primary" @click="querySubject">查询</el-button>
          <el-button @click="clearData">清除</el-button>
          <el-button
            icon="el-icon-plus"
            type="primary"
            v-if="['管理员','超级管理员','老师'].includes($store.state.role)"
            @click="$refs.subAdd.dialogFormVisible=true"
          >新增学科</el-button>
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
          <el-table-column prop="username" label="创建者"></el-table-column>
          <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">
              {{scope.row.create_time | filterTime}}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">启用</span>
              <span v-else style="color:red">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" v-if="['管理员','超级管理员'].includes($store.state.role)">
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
    <!-- 新增对话框 -->
    <subjectAdd ref="subAdd" @refSubject="refSubject"></subjectAdd>
    <!-- 编辑对话框 -->
    <subjectEdit ref="subEdit" @refSubject="refSubject"></subjectEdit>
  </div>
</template>

<script>
import subjectAdd from "./components/subjectAdd";
import subjectEdit from "./components/subjectEdit";

export default {
  name: "subject",
  components: {
    subjectAdd,
    subjectEdit
  },
  data() {
    return {
      /* 头数据 */
      formInline: {
        name: "",
        rid: "",
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
    // 数据清空
    clearData() {
      this.$refs.selectForm.resetFields();
      this.index = 1;
      this.reading();
    },
    // 数据筛选
    querySubject() {
      this.index = 1;
      this.reading();
    },
    /* 数据操作方法 */
    // 编辑
    handleEdit(index, row) {
      this.$refs.subEdit.dialogFormVisible = true;
      // 保存编辑状态
      if (row.id != this.$refs.subEdit.form.id) {
        this.$refs.subEdit.form = JSON.parse(JSON.stringify(row));
      }
    },
    // 状态切换
    async handleNoAllow(index, row) {
      let _data = await this.$getAPI("statusSubject", { id: row.id });
      if (_data.code == 200) {
        this.$message.success("修改成功");
        this.reading();
      }
    },
    // 删除
    handleDelete(index, row) {
      window.console.log(index, row);
      // 删除提示
      this.$confirm("此操作将永久删除该学科, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          // 调用接口
          this.$getAPI('removeSubject', {id:row.id}).then( res => {
            if (res.code == 200) {
              this.$message.success("删除成功!");
              // 增加最后一页判断
              if (this.tableData.length == 1) {
                this.index--;
                if (this.index <= 0) {
                  this.index == 1;
                }
              }
              this.reading();
            }
          })
        }).catch(() => {
        });
    },
    /* 分页方法 */
    handleSizeChange(val) {
      this.page = val;
      this.reading();
    },
    handleCurrentChange(val) {
      this.index = val;
      this.reading();
    },
    /* 读取数据 */
    reading() {
      this.$getAPI("getSubjectList", {
        limit: this.page,
        page: this.index,
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.items;
        // 设置分页
        this.total = res.data.pagination.total;
      });
    },
    // 刷新数据
    refSubject() {
      this.reading();
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
    .pageLocation {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>