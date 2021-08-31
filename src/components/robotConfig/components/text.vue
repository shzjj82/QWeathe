<template>
  <el-form-item :label="label" class="robotConfig__item">
    <el-input
      type="textarea"
      :value="value"
      @input="input"
      :autosize="{ minRows: 4, maxRows: 4}"
      resize="none"
    ></el-input>
  </el-form-item>
</template>
<script>
export default {
  name: "textComponent",
  props: {
    label: {
      default: "文本内容",
      type: String,
    },
    value: {
      required: true,
      type: String,
    },
  },
  emits:['update:value'],
  methods:{
    input(value){
      console.log(value)
      this.$emit("update:value",value)
    }
  },
};
</script>
<style scoped>
.robotConfig__item >>> .el-form-item__label {
  line-height: normal;
  color: #333;
  font-weight: 600;
}
</style>
