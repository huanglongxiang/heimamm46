<template>
  <el-container class="userIndex">
    <el-header>
      <div class="left">
        <span class="icon el-icon-s-fold" @click="isCollapse = !isCollapse"></span>
        <img class="l-logo" src="@/assets/index_logo.png" alt />
        <span class="l-title">黑马面面</span>
      </div>
      <div class="right">
        <span class="r-userIcon">
          <img :src="userlogin.avatar" alt />
        </span>
        <span class="UserName">你好，{{userlogin.username}}</span>
        <el-button type="primary" @click="exitLogin">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="1">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getInfo, exitInfo } from "@/api/index.js";
import { removeToken } from "@/utils/token";
export default {
  name: "index",
  data() {
    return {
      userlogin: {},
      isCollapse: false
    };
  },
  created() {
    // 读取存储的 token
    getInfo().then(res => {
      window.console.log(res);
      if (res.data.code === 200) {
        this.userlogin = res.data.data;
        this.userlogin.avatar =
          process.env.VUE_APP_URL + "/" + this.userlogin.avatar;
      }
    });
  },
  methods: {
    // 注销逻辑
    exitLogin() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出成功!"
        });
        exitInfo().then(res => {
          window.console.log(res);
          if (res.data.code === 200) {
            removeToken();
            this.$router.push("/login");
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.userIndex {
  height: 100%;
  font-family: Microsoft YaHei;
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
      .r-userIcon {
        width: 43px;
        height: 43px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .UserName {
        font-size: 14px;
        color: rgba(99, 99, 99, 1);
        margin-left: 9px;
        margin-right: 38px;
      }
    }
  }

  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 200px;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
</style>