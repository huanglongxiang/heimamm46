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
      <el-form ref="form" :model="loginFrom" label-width="0">
        <!-- 手机号 -->
        <el-form-item>
          <el-input v-model="loginFrom.phoneNum" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input v-model="loginFrom.userProw" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <el-row>
            <el-col :span="17">
              <el-input v-model="loginFrom.verify" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="login-code" src="../../assets/login_captcha.png" alt />
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
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  // 写入组件可以便于调试
  name: "login",
  data() {
    return {
      loginFrom: {
        phoneNum: "", // 手机号
        userProw: "", //密码
        verify: "", //验证码
        isChecked: false //协议按钮
      }
    };
  },
  methods: {
    onSubmit() {}
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
    .login-code {
      width: 100%;
      height: 40px;
    }
    //
    .el-checkbox {
      display: flex;
      align-items: center;
      .el-checkbox__label {
        display: flex;
        padding-left: 5px;
        margin-top: -2px;
      }
    }
  }
}
</style>