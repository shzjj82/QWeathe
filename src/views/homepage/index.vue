<template>
  <div class="table-container">
    <row class="table-container__header">
      <el-button
        class="button"
        type="primary"
        :disabled="!multipleSelection.length"
        @click="visible = true"
      >
        添加机器人
      </el-button>
    </row>
    <el-table
      class="table"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="column in columns"
        :key="column.value"
        :prop="column.value"
        :label="column.label"
        :width="column.width"
      >
        <template #default="scope">
          <template v-if="column.tag === 'image'">
            <img :src="scope.row[column.value]" class="icon" />
          </template>
          <template v-else>{{ scope.row[column.value] }}</template>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="visible" title="添加机器人" width="700px">
      <robotConfig></robotConfig>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="visible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import setupWeather from "../../common/setup/weather";
import robotConfig from "../../components/robotConfig/index.vue";
export default {
  components: { robotConfig },
  setup: setupWeather,
  data() {
    return {
      multipleSelection: [],
      visible: false,
      tableData: [{
        address:"上海",
        location:"123,123",
      }],
      columns: [
        {
          label: "address",
          value: "address",
          width: 150,
        },
        {
          label: "location",
          value: "location",
          width: 200,
        },
        {
          label: "temp",
          value: "temp",
          width: 200,
        },
        {
          label: "weather",
          value: "text",
          width: 200,
        },
        {
          label: "icon",
          value: "icon",
          tag: "image",
        },
      ],
    };
  },
  computed: {
    locations() {
      return this.locationInfo.map(
        (locationItem) => `${locationItem.lon},${locationItem.lat}`
      );
    },
    locationData() {
      return this.locationInfo.map((locationItem) => ({
        address: locationItem.name,
        location: `${locationItem.lon},${locationItem.lat}`,
      }));
    },
  },
  watch: {
    locationInfo() {
      this.loadData();
    },
  },
  methods: {
    async loadData() {
      await Promise.all(this.locations.map(this.getWeatherInfo)).then(
        (responses) => {
          this.tableData = responses.map((response, index) => {
            response.icon = require(`../../assets/color-256/${response.icon}.png`);
            return Object.assign(this.locationData[index], response);
          });
        }
      );
      console.log(this.tableData);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style >
.table-container {
  width: 1080px;
  margin: 30px auto;
}
.table-container__header {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
.table-container__header .button {
  margin: 0 10px;
}
.icon {
  width: 28px;
  height: 28px;
}
.el-dialog__body{
  padding: 0 20px;
}
</style>
