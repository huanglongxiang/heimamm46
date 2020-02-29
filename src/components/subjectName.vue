<template>
  <el-select v-model="selfSubject" placeholder="请选择学科">
    <el-option label="所有" :value="0"></el-option>
    <el-option v-for="item in subjectList" :key="item.id" :label="item.short_name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "subjectName",
  props: {
      value: {
          type: Number
      }
  },
  data() {
    return {
      subjectList: [],
      selfSubject: this.value
    };
  },
  created() {
    this.$getAPI("getSubjectList").then(res => {
      this.subjectList = res.data.items;
    });
  },
  watch: {
      selfSubject() {
          this.$emit('input', this.selfSubject)
      }
  },
};
</script>

<style>
</style>