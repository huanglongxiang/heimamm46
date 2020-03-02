<template>
  <el-dialog
    :title="(compileOrAdd ? '新增':'编辑')+'题库' "
    class="questionAdd"
    fullscreen
    :visible.sync="dialogFormVisible"
    :destroy-on-close="isClear"
  >
    <el-form :model="form" :rules="rules" ref="formData">
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <subjectList :isShowAll="false" v-model="form.subject" />
      </el-form-item>
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
        <enterpriseSelect :isShowAll="false" v-model="form.enterprise" />
      </el-form-item>
      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <citySelect v-model="form.city"></citySelect>
      </el-form-item>
      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="试题标题" prop="title" :label-width="formLabelWidth">
        <myEditer v-model="form.title" />
      </el-form-item>
      <!-- 单选 -->
      <el-form-item
        v-if="form.type === 1"
        prop="single_select_answer"
        label="单选"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="form.single_select_answer">
          <questionAddRadio
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text.sync="item.text"
            :image.sync="item.image"
            :isRadio="true"
          />
        </el-radio-group>
      </el-form-item>
      <!-- 多选 -->
      <el-form-item
        v-else-if="form.type === 2"
        label="多选"
        prop="multiple_select_answer"
        :label-width="formLabelWidth"
      >
        <el-checkbox-group v-model="form.multiple_select_answer">
          <questionAddRadio
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text.sync="item.text"
            :image.sync="item.image"
            :isRadio="false"
          />
        </el-checkbox-group>
      </el-form-item>
      <!-- 简答 -->
      <el-form-item v-else label="简答" :label-width="formLabelWidth" prop="short_answer">
        <el-input v-model="form.short_answer" type="textarea" rows="4" placeholder></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="视频上传" :label-width="formLabelWidth">
        <questionAddVideo :video.sync="form.video"></questionAddVideo>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="答案解析" :label-width="formLabelWidth" prop="answer_analyze">
        <myEditer v-model="form.answer_analyze" />
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark" type="textarea" rows="2"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide()">取 消</el-button>
      <el-button type="primary" @click="submitForm('formData')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import questionAddRadio from "./components/questionAddRadio.vue";
import questionAddVideo from "./components/questionAddVideo.vue";
export default {
  name: "questionAdd",
  components: {
    questionAddRadio,
    questionAddVideo
  },
  props: {
    compileOrAdd: Boolean
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      isClear: false,
      form: {
        step: "",
        subject: "",
        enterprise: "",
        city: [],
        type: 1,
        difficulty: 1,
        title: "默认标题",
        answer_analyze: "默认答案",
        single_select_answer: "",
        multiple_select_answer: [],
        short_answer: "",
        video: "",
        remark: "",
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      // 表单校验
      rules: {
        // 学科 subject
        subject: [
          { required: true, message: "学科不能为空", trigger: "change" }
        ],
        // 阶段 step
        step: [{ required: true, message: "阶段不能为空", trigger: "change" }],
        // 企业 enterprise
        enterprise: [
          { required: true, message: "企业不能为空", trigger: "change" }
        ],
        // 城市 city
        city: [{ required: true, message: "城市不能为空", trigger: "change" }],
        // 题型 type
        type: [{ required: true, message: "题型不能为空", trigger: "change" }],
        // 难度 difficulty
        difficulty: [
          { required: true, message: "难度不能为空", trigger: "change" }
        ],
        // 标题 title
        title: [{ required: true, message: "标题不能为空", trigger: "change" }],
        // 单选 single_select_answer
        single_select_answer: [
          { required: true, message: "单选不能为空", trigger: "change" }
        ],
        // 多选 multiple_select_answer
        multiple_select_answer: [
          { required: true, message: "多选不能为空", trigger: "change" }
        ],
        // 简答 short_answer
        short_answer: [
          { required: true, message: "简答不能为空", trigger: "change" }
        ],
        // 答案解析 answer_analyze
        answer_analyze: [
          { required: true, message: "答案解析不能为空", trigger: "change" }
        ],
        // 试题备注 remark
        remark: [
          { required: true, message: "试题备注不能为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           let api = ''
          if (this.isClear) {
              api = 'questionAdd'
          } else {
              api = 'questionEdit'
          }
          // this.$message.success('表单验证成功');
          this.$getAPI(api, this.form).then(item => {
            if (item.code === 200) {
              this.$message.success("表单提交成功");
              this.$refs[formName].resetFields();
              this.isClear = true;
              this.dialogFormVisible = false;
              this.$emit("reading");
            }
          });
        } else {
          this.$message.warning("数据错误，请检查");
          return false;
        }
      });
    },
    hide() {
      this.dialogFormVisible = false;
      this.isClear = false;
    }
  }
};
</script>

<style lang="less">
.questionAdd {
  .el-form {
    width: 837px;
    margin: 0 auto;
  }
  .el-select,
  .el-cascader {
    width: 364px;
  }
  .videos {
    width: 278px;
    height: 147px;
  }
}
</style>