<template>
  <el-select v-model="selfEnterprise" placeholder="请选择企业">
    <el-option v-if="isShowAll" label="所有" :value="0"></el-option>
    <el-option v-for="item in enterprise" :key="item.eid" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "enterpriseSelect",
  props: {
      value: {
          type: [Number,String]
      },
      isShowAll: {
          type: Boolean,
          default: true
      }
  },
  data() {
      return {
          selfEnterprise: this.value,
          enterprise: []
      }
  },
  created() {
    this.$getAPI("enterpriseList").then(res => {
      this.enterprise = res.data.items;
    });
  },
  watch: {
      selfEnterprise() {
          this.$emit('input', this.selfEnterprise);
      }
  },
};
</script>

<style>
</style>