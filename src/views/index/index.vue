<template>
  <el-container class="userIndex">
    <el-header>
      <div class="left">
        <span class="icon el-icon-s-fold"></span>
        <img class="l-logo" src="@/assets/index_logo.png" alt />
        <span class="l-title">黑马面面</span>
      </div>
      <div class="right">
        <span class="r-userIcon">
          <img src alt />
        </span>
        <span class="UserName">你好，傻逼</span>
        <el-button type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getToken } from '@/utils/token.js'
import { getInfo } from '@/api/index.js'
export default {
    name: 'index',
    created() {
        // 读取存储的 token
        let token = getToken();
        window.console.log(token)
        getInfo({
            token: token
        }).then(res => {
            window.console.log(res);
        })
    }
};
</script>

<style lang="less" scoped>
.userIndex {
  height: 100%;
  font-family:Microsoft YaHei;
  .el-header {
    background-color: #fff;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    box-shadow: 10px 10px 5px #888888;
    .left {
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 1);
      }
      .l-logo {
        width: 33px;
        height: 28px;
        margin-left: 22px;
        margin-right: 11px;
      }
      .l-title {
        font-size: 22px;
        font-family: Microsoft YaHei;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
        display: flex;
        align-items: center;
        .r-userIcon{
            width:43px;
            height:43px;
            background: #333;
        }
        .UserName{
            font-size:14px;
            color:rgba(99,99,99,1);
            margin-left: 9px;
            margin-right: 38px;
        }
    }
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
</style>