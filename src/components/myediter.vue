<template>
  <div class="myEditer">
      <div class="totlerbar" ref="totlerbar"></div>
      <div class="content" ref="content"></div>
  </div>
</template>

<script>
import wangediter from 'wangeditor'
export default {
    props: {
        value: String
    },
    mounted() {
        let editer = new wangediter(this.$refs.totlerbar, this.$refs.content);
        // 注册事件
        editer.customConfig.onchange = html => {
            this.$emit('input', html);
        }
        // 在创建， 富文本编辑器
        editer.create();
        // 设置默认内容
        editer.txt.html(this.value);
    },
}
</script>

<style lang="less" scoped>
    .myEditer{
        .totlerbar{
            border: 1px solid #ccc;
            border-bottom: none;
        }
        .content{
            border: 1px solid #ccc;
            height: 100px;
        }
    }
</style>