<template>
  <div class="login-container">
     <div class="left-box"></div>
     <img src="../../assets/login_banner_ele.png" alt="">
  </div>
</template>

<script>
export default {
    // 写入组件可以便于调试
    name: 'login'
}
</script>

<style>
.login-container{
    height: 100%;
    background: linear-gradient(
        225deg,
        rgba(20,147,250,1),
        rgba(1,198,250,1)
    );
    display: flex;
    align-items: center;
    /* 左右均分 */
    justify-content: space-around;
}
.left-box{
    width: 478px;
    height: 550px;
    background:rgba(245,245,245,1);
}
</style>