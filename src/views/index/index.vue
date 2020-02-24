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
          <img :src="$store.state.userlogin.avatar" alt />
        </span>
        <span class="UserName">你好，{{$store.state.userlogin.username}}</span>
        <el-button type="primary" @click="exitLogin">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <template v-for="(item, index) in navRouter">
            <el-menu-item  :key="index" v-if="item.meta.rules.includes($store.state.role)" :index="item.meta.fullPath">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>

          <!-- <el-menu-item v-if="['管理员'].includes($store.state.role)" index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item v-if="['管理员','老师'].includes($store.state.role)" index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item v-if="['管理员','老师'].includes($store.state.role)" index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item v-if="['管理员','老师','学生'].includes($store.state.role)" index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main class="lh0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { exitInfo } from "@/api/index.js";
import { removeToken } from "@/utils/token";
import navRouter from "@/router/childrenRouter.js";

export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
      navRouter: navRouter
    };
  },
  created() {},
  methods: {
    // 注销逻辑
    exitLogin() {
      // 提示框
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "退出成功!"
        });
        // 接口调用
        exitInfo().then(res => {
          if (res.data.code === 200) {
            removeToken();
            // 清空仓库
            this.$store.commit("changeUserLogin", {});
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
    text-align: left;
    line-height: 0px;
  }
}
</style>