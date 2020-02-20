<template>
  <el-dialog
    center
    class="subjectAdd-content"
    width="600px"
    :title="(isShowAddOrEnter == true ? '新增':'编辑')+'企业'"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="enterpris">
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editEnterprise('enterpris')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "enterpriseEdit",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [
          {
            required: true,
            message: "企业编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "企业名称不能为空",
            trigger: "blur"
          }
        ],
        short_name: [
          {
            required: true,
            message: "企业简称不能为空",
            trigger: "blur"
          }
        ],
        intro: [
          {
            required: true,
            message: "企业简介不能为空",
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "100px",
      isShowAddOrEnter: true
    };
  },
  methods: {
    clearFrom(){
        this.$refs.enterpris.resetFields();
    },
    editEnterprise(formName) {
        // true 为新增  false为编辑
        let url = '';
        if (this.isShowAddOrEnter == true) {
            url = 'enterpriseAdd'
        } else {
            url = 'enterpriseEdit'
        }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$getAPI(url, this.form).then(data => {
            if (data.code == 200) {
              this.$message.success(`${this.isShowAddOrEnter == true ? '新增':'修改'}成功`);
              this.$emit("refEnterprise");
              this.dialogFormVisible = false;
              // 刷新数据
              this.$refs[formName].resetFields();
            } else if (data.code == 201) {
              this.$message.error("企业编号不能重复哦~");
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