<template>
  <!-- 路由出口 -->
  <router-view></router-view>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #01c5fb, #1197f9);
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__close {
    color: #fff;
  }
}
</style>


