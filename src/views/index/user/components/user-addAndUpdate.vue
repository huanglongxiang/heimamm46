<template>
  <el-dialog
    center
    class="subjectAdd-content"
    width="600px"
    :title="(isShowAddOrEnter == true ? '新增':'编辑')+'用户'"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="user">
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
        <el-select v-model="form.role_id" placeholder="请选择角色">
          <el-option label="所有" :value="1"></el-option>
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUser('user')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "usereEdit",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "电话不能为空",
            trigger: "blur"
          }
        ],
        role_id: [
          {
            required: true,
            message: "角色不能为空",
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "100px",
      isShowAddOrEnter: true
    };
  },
  methods: {
    // 显示与隐藏
    show(editData) {
      this.dialogFormVisible = true;
      if (editData == undefined) {
        this.$nextTick(() => {
          this.isShowAddOrEnter = true;
          delete this.form.id;
          // 刷新表单
          this.$refs.user.resetFields();
        });
      } else {
        this.$nextTick(() => {
          this.isShowAddOrEnter = false;
          this.form = editData;
        });
      }
    },
    editUser(formName) {
      // true 为新增  false为编辑
      let url = "";
      if (this.isShowAddOrEnter == false) {
        url = "userEdit";
      } else {
        url = "userAdd";
      }
      window.console.log(this.form);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$getAPI(url, this.form).then(data => {
            if (data.code == 200) {
              this.$message.success(
                `${this.isShowAddOrEnter == true ? "新增" : "修改"}成功`
              );
              this.$emit("refEnterprise");
              this.dialogFormVisible = false;
              this.$nextTick(() => {
                // 刷新数据
                this.$refs[formName].resetFields();
              });
            } else if (data.code == 201) {
              this.$message.error(data.message);
            }
          });
        } else {
          this.$message.error("数据验证失败，请检查数据！");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>