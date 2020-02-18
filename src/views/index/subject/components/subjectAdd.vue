<template>
  <el-dialog 
  center 
  class="subjectAdd-content" 
  width="600px" 
  title="新增学科" 
  :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "subjectAdd",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        rid: "",
        name:"",
        short_name:"",
        intro:"",
        remark:""
      },
      rules:{
        rid:[{
          required: true,
          message:"学科编号不能为空",
          trigger:"blur"
        }],
        name:[{
          required: true,
          message:"学科名称不能为空",
          trigger:"blur"
        }]
      },
      formLabelWidth: "120px"
    };
  },
  methods: {}
};
</script>

<style lang="less">
.subjectAdd-content{
  .el-dialog__header {
    background: linear-gradient(to right, #01c5fb, #1197f9);
    .el-dialog__title{
      color: #fff;
    }    
    .el-dialog__close{
      color: #fff;
    }
  }
}
</style>