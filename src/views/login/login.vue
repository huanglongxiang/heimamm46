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
      <el-input class="input-text" placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="phoneNum"></el-input>
      <el-input class="input-text"  show-password placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="userProw"></el-input>
      <el-input class="input-text" placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="verify"></el-input>
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
          phoneNum: '',
          userProw: '',
          verify: ''
      }
  },
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
    .input-text{
        margin-bottom: 25px;
    }
  }
}
</style>