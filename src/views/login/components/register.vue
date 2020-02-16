<template>
  <el-dialog
    class="register-dialog"
    width="603px"
    center
    title="收货地址"
    :visible.sync="dialogFormVisible"
  >
    <el-form status-icon :model="registerForm" :rules="rules" ref="registerSubmit">
      <!-- 图像信息 -->
      <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :action="uploadsUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 文本信息 -->
      <el-form-item label="昵称" prop="userName" :label-width="formLabelWidth">
        <el-input v-model="registerForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail" :label-width="formLabelWidth">
        <el-input v-model="registerForm.userEmail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="userPhone" :label-width="formLabelWidth">
        <el-input v-model="registerForm.userPhone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userProssword" :label-width="formLabelWidth">
        <el-input show-password v-model="registerForm.userProssword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="registerForm.imgYard" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="login-code" @click="changeCaptcha" :src="captchas" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="registerForm.verify" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button
              :disabled="delay != 0"
              @click="getCaptcha"
            >{{delay === 0 ? "获取验证码":`还有${delay}秒重新获取`}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit('registerSubmit')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import $http from "@/js/http.js";
import { sendsms } from "@/api/register";

const phoneChar = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入用户名称"));
  } else {
    let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (_reg.test(value)) {
      callback();
    } else {
      callback(new Error("手机号码格式错误，请输入正确手机号"));
    }
  }
};
const emailChar = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入用户名称"));
  } else {
    let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (_reg.test(value)) {
      callback();
    } else {
      callback(new Error("邮箱格式错误，请输入正确邮箱"));
    }
  }
};

export default {
  name: "register",
  data() {
    return {
      // 表单数据
      registerForm: {
        userName: "",
        userEmail: "",
        userPhone: "",
        userProssword: "",
        imgYard: "",
        verify: "",
        avatar: ""
      },
      formLabelWidth: "62px",
      dialogFormVisible: false,
      rules: {
        avatar: [
          { required: true, message: "用户头像不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 4, message: "用户名长度不得少于6位", trigger: "change" }
        ],
        userEmail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: emailChar, trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { validator: phoneChar, trigger: "blur" }
        ],
        userProssword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码的长度为6-12位", trigger: "change" }
        ]
      },
      // 请求验证码
      captchas: $http.getCaptcha.url,
      // 倒计时
      delay: 0,
      // 图片本机地址
      imageUrl: "",
      // 图片上传地址
      uploadsUrl: $http.getUploads.url
    };
  },
  methods: {
    //注册表单提交
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message.success("验证成功");
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
    // 改变图像验证码
    changeCaptcha() {
      // 改变验证码
      this.captchas = this.captchas + Date.now();
    },
    // 获取验证码
    getCaptcha() {
      // 手机格式校验
      let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!_reg.test(this.registerForm.userPhone)) {
        // 直接调用弹层
        this.$message.error("手机号码格式错误，请输入正确手机号");
        return;
      }
      // 验证码格式校验
      if (this.registerForm.imgYard.length != 4) {
        this.$message.error("验证码长度错误，请输入正确的验证码");
        return;
      }
      if (!this.delay) {
        this.delay = 60;
        // 开始倒计时
        const interId = setInterval(() => {
          // 时间递减
          this.delay--;
          // 时间结束清除倒计时
          if (!this.delay) {
            clearInterval(interId);
          }
        }, 100);
        // 请求短信验证码
        sendsms({
          code: this.registerForm.imgYard,
          phone: this.registerForm.userPhone
        }).then(res => {
          if (res.status === 200 && res.data.code === 200) {
            this.$message.success("验证码获取成功：" + res.data.data.captcha);
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 存储头像地址
      this.registerForm.avatar = res.data.file_path;
      // 由于 element-ui 只会检测表单元的更改，所以图片的更改需要手动去触发
      // 通过 validateField 方法来进行触发
      this.$refs.registerSubmit.validateField('avatar')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是图像格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.register-dialog {
  .el-dialog__header {
    background: linear-gradient(to right, #01c5fb, #1197f9);
  }
  .el-dialog__title {
    color: white;
  }
  .el-col-7 {
    height: 40px;
    .login-code {
      width: 100%;
      height: 40px;
    }
    .el-button--default {
      width: 100%;
    }
  }
  // 用户图片上传
  .avatar-uploader {
    text-align: center;
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>