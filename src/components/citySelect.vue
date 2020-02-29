<template>
  <el-cascader v-model="city" :props="{value:'label'}" :options="options" @change="handleChange"></el-cascader>
</template>

<script>
import { regionDataPlus } from 'element-china-area-data'
export default {
    name: 'citySelect',
    props: {
        value: {
            type: Array
        }
    },
    data() {
        return {
            city: this.value,
            options:regionDataPlus
        }
    },
    methods: {
        handleChange(val) {
            this.$emit('input', val)
        }
    }
}
</script>

<style>

</style>