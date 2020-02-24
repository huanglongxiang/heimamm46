<template>
  <div class="user-content">
    <!-- 头部搜索 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="selectForm">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formInline.username" class="subjectID"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="formInline.role_id" placeholder="请选择状态">
            <el-option label="所有" value></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="refEnterprise">搜索</el-button>
          <el-button @click="clearFrom">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="addEnterprise">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="bottom-card">
      <template>
        <!-- 表格内容 -->
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="role" label="角色">
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">启用</span>
              <span v-else style="color:red">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    <userAddAndUpdate ref="userEdit" @refEnterprise="refEnterprise"></userAddAndUpdate>
  </div>
</template>

<script>
import userAddAndUpdate from './components/user-addAndUpdate'

export default {
  name: "user",
  data() {
    return {
      /* 头数据 */
      formInline: {
        username: "",
        email: "",
        role_id: "",
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
  components: {
    userAddAndUpdate
  },
  created() {
    this.reading();
  },
  methods: {
    // 添加
    addEnterprise() {
      this.$refs.userEdit.show();
    },
    // 编辑
    handleEdit(index, row) {
      this.$refs.userEdit.show(JSON.parse(JSON.stringify(row)));
    },
    // 清除
    clearFrom() {
      this.$refs.selectForm.resetFields();
      this.index = 1;
      this.reading();
    },
    // 重新加载
    refEnterprise() {
      this.reading();
    },
     // 删除
    handleDelete(index, row) {
      window.console.log(index, row);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$getAPI("userRemove", {
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
    },
    // 启用禁用
    async handleNoAllow(index, row) {
      let _data = await this.$getAPI("userStatus", { id: row.id });
      if (_data.code == 200) {
        this.$message.success("修改成功");
        this.reading();
      }
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
    // 读取数据
    reading() {
      this.$getAPI("userList",{
        limit: this.page,
        page: this.index,
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          this.tableData = res.data.items;
          this.total = res.data.pagination.total;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.user-content {
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