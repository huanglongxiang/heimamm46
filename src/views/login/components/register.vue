<template>
  <el-dialog
    class="register-dialog"
    width="603px"
    center
    title="收货地址"
    :visible.sync="dialogFormVisible"
  >
    <el-form status-icon :model="registerForm" :rules="rules">
        <!-- 图像信息 -->
        
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
            <el-button :disabled="delay != 0" @click="getCaptcha">
                {{delay === 0 ? "获取验证码":`还有${delay}秒重新获取`}}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import $http from "../../../js/http.js";
import axios from "axios";

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
        verify: ""
      },
      formLabelWidth: "62px",
      dialogFormVisible: false,
      rules: {
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
      delay: 0
    };
  },
  methods: {
    // 改变图像验证码
    changeCaptcha() {
      // 改变验证码
      this.captchas = this.captchas + Date.now();
    },
    // 获取验证码
    getCaptcha() {
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
        axios({
          url: $http.getSendNote.url,
          method: $http.getSendNote.method,
          data: {
            code: this.registerForm.imgYard,
            phone: this.registerForm.userPhone
          },
          // 标识 cookie ，在请求发送的时候连带 cookie 进行发送 。。。
          // 但是存在 发送请求中包含 cookie 却没有 SameSite( cookie 的一个属性，谷歌默认是 lax)
          withCredentials: true
        }).then(res => {
          if (res.status === 200 && res.data.code === 200) {
            this.$message.success("验证码获取成功：" + res.data.data.captcha);
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
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
    .el-button--default{
        width: 100%;
    }
  }
}
</style>