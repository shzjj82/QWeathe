<template>
  <el-form class="robotConfig" label-position="top">
    <!-- 消息类型 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="消息类型" class="robotConfig__item">
          <el-select v-model="msgtype" class="select">
            <el-option
              v-for="type in msgtypes"
              :key="type.value"
              :label="type.label"
              :value="type.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="消息类型" class="robotConfig__item">
          <el-select v-model="mentioneds" class="select">
            <el-option
              v-for="mentioned in mentionedList"
              :key="mentioned.value"
              :label="mentioned.label"
              :value="mentioned.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- 文本类型 -->
      <el-col :span="24">
        <textComponent
          :value="content"
          @update:value="changeData($event, 'content')"
        ></textComponent>
      </el-col>
      <!-- 文件类型 -->
      <!-- 图片类型 -->
      <!-- 图文类型 -->
    </el-row>
  </el-form>
</template>
<script>
import { reactive } from "@vue/reactivity";
const MsgTypes = {
  Text: "text",
  Markdown: "markdown",
  Image: "image",
  News: "news",
  File: "file",
};
import textComponent from "./components/text.vue";
export default {
  name: "robotConfig",
  components: { textComponent },
  setup() {
    const config = reactive({});
    return { aaa: config };
  },
  data() {
    return {
        msgtype: "text",
        mentioneds: [],
        content: "123",
    };
  },
  computed: {
    msgtypes() {
      return [
        {
          label: "文本",
          value: "text",
        },
        {
          label: "markdown",
          value: "markdown",
        },
        {
          label: "图片",
          value: "image",
        },
        {
          label: "图文",
          value: "news",
        },
        {
          label: "文件",
          value: "file",
        },
      ];
    },
    mentionedList() {
      return [
        {
          label: "all",
          value: "@all",
        },
      ];
    },
    normalizeConfig() {
      const { msgtype } = this
      if (msgtype === MsgTypes.Text) {
        return this.normalizeTextConfig;
      }
      if (msgtype === MsgTypes.Image) {
        return this.normalizeImageConfig;
      }
      if (msgtype === MsgTypes.News) {
        return this.normalizeNewsConfig;
      }
      if (msgtype === MsgTypes.File) {
        return this.normalizeFileConfig;
      }
      return this.normalizeTextConfig;
    },
    normalizeTextConfig() {
      return {};
    },
    normalizeImageConfig() {
      return {};
    },
    normalizeNewsConfig() {
      return {};
    },
    normalizeFileConfig() {
      return {};
    },
  },
  methods: {
    changeData(value) {
      this.$data.content = value;
    },
  },
};
</script>
<style scoped>
.robotConfig__item {
}
.robotConfig__item >>> .el-form-item__label {
  line-height: normal;
  color: #333;
  font-weight: 600;
}
.select {
  width: 100%;
}
.vw50 {
  width: 50%;
}
.vw100 {
  width: 100%;
}
</style>
