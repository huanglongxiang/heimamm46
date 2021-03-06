<template>
  <div class="login-container">
    <!-- 左侧 -->
    <div class="left-box">
      <!-- 标题 -->
      <div class="title-box">
        <img class="title-icon" src="../../assets/login_logo.png" alt />
        <span class="title">黑马面面</span>
        <div class="line"></div>
        <span class="login_title">用户登录</span>
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginForm" :rules="rules" :model="loginFrom" label-width="0">
        <!-- 手机号 -->
        <el-form-item prop="phoneNum">
          <el-input v-model="loginFrom.phoneNum" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="userProw">
          <el-input
            v-model="loginFrom.userProw"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="verify">
          <el-row>
            <el-col :span="17">
              <el-input v-model="loginFrom.verify" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="login-code" @click="changeCaptcha" :src="captcha" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 同意按钮 -->
        <el-form-item>
          <el-checkbox v-model="loginFrom.isChecked" name="type">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 登录与注册 -->
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onSubmit('loginForm')">登录</el-button>
          <el-button class="login-btn" type="primary" @click="onGoRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
    <v-register ref="register"></v-register>
  </div>
</template>

<script>
import vRegister from './components/register'
import $http from '@/js/http.js'
import { phoneChar } from '@/utils/vatildator.js'
// 登录校验逻辑
import { getLogin } from '@/api/login.js'
// token 存储引入
import { setToken } from '@/utils/token.js'

export default {
  // 写入组件可以便于调试
  name: "login",
  components: {
    vRegister
  },
  data() {
    return {
      loginFrom: {
        phoneNum: "", // 手机号
        userProw: "", //密码
        verify: "", //验证码
        isChecked: false //协议按钮
      },
      rules: {
        phoneNum: [
          {required: true,message: "请输入手机号", trigger:"blur"},
          {validator: phoneChar,trigger:"change"}
        ],
        // trigger 为 change 时是边打字边校验
        userProw: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码的长度为6-12位", trigger: "change" }
        ],
        verify: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码的长度为4位", trigger: "blur" }
        ]
      },
      captcha: $http.getCaptchaLogin.url
    };
  },
  methods: {
    // 登录
    onSubmit(formName) {
      // 上面传入的 formName 是 ruleForm
      // $refs 的作用是获取页面中使用 ref 标记的元素
      // 等同于 this.$refs['loginForm'] 相当于获取了 Element-ui 的表单
      // this.$refs['loginFrom] 等同于 this.$refs.loginForm
      // validate 这个方法是 Element-ui 的表单的方法
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$message.success('验证成功');
          // 判断是否勾选协议
          if (!this.loginFrom.isChecked) {
            return this.$message.warning("请勾选协议按钮");
          }
          // 进入登录逻辑
          getLogin({
            phone: this.loginFrom.phoneNum,
            password: this.loginFrom.userProw,
            code:this.loginFrom.verify
          }).then(res => {
            if (res.data.code == 200) {              
              setToken(res.data.data.token);
              this.$router.push('/index');
            } else {
              this.$message.error(res.data.message);
            }
          })
        } else {
          this.$message.error('验证失败');
          return false;
        }
      })
    },
    // 注册
    onGoRegister() {
      this.$refs.register.dialogFormVisible = true;
    },
    // 切换验证码
    changeCaptcha() {
      // 避免时间戳累加
      let captcha = $http.getCaptchaLogin.url;
      // 根据时间戳
      this.captcha = captcha + Date.now();
    }
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  align-items: center;
  /* 左右均分 */
  justify-content: space-around;
  .left-box {
    width: 478px;
    height: 550px;
    padding: 43px;
    font-size: 0;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);
    .title-box {
      display: flex;
      align-items: center;
      color: rgba(12, 12, 12, 1);
      margin-bottom: 29px;
      .title-icon {
        width: 22px;
        height: 17px;
        margin-right: 14px;
      }
      .line {
        margin: 0 10px;
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
      .title {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
      }
      .login_title {
        font-size: 22px;
        font-family: SourceHanSansCN;
      }
    }
    .input-text {
      margin-bottom: 25px;
    }
    .el-col-7 {
      height: 40px;
      .login-code {
        width: 100%;
        height: 40px;
      }
    }
    // 协议区布局
    .el-checkbox {
      display: flex;
      align-items: center;
      .el-checkbox__label {
        display: flex;
        padding-left: 5px;
        margin-top: -2px;
      }
    }
    // 按钮样式修改
    .login-btn {
      width: 100%;
      margin-bottom: 24px;
      margin-left: 0;
    }
  }
}
</style>