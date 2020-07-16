<template>
  <div class="root">
    <div class="table">
      <table border>
        <tr>
          <th v-for="(item, index) in checkProps" :key="index">{{ item.label }}</th>
        </tr>
        <tr v-for="(eachItem, eachIndex) in tableData" :key="eachIndex">
          <td v-for="(item, index) in checkProps" :key="index">{{ eachItem[item.value] }}</td>
        </tr>
      </table>
    </div>

    <div class="controller-icon">
      <customTableController
        @updateCheckProps="updateCheckProps"
        @updateAllProps="updateAllProps"
        :allProps="allProps"
      ></customTableController>
    </div>
  </div>
</template>

<script>
import customTableController from "./components/customTableController";
export default {
  components: { customTableController },
  data() {
    return {
      tableData: [
        {
          career: "boss",
          buyNum: 100,
          city: "上海",
          dateOfBirth: "1996-04-06",
          lastOrderTime: "2019-05-05",
          firstOrderTime: "2019-05-05"
        },
        {
          career: "leader",
          buyNum: 10,
          city: "北京",
          dateOfBirth: "2000-01-02",
          lastOrderTime: "2020-05-05",
          firstOrderTime: "2020-05-05"
        }
      ],
      checkProps: [],
      allProps: []
    };
  },
  created() {
    this.allProps = [
      { label: "生日", value: "dateOfBirth" },
      { label: "职业", value: "career" },
      { label: "所在地", value: "city" },
      { label: "第一次购物时间", value: "firstOrderTime" },
      { label: "最近一次购物时间", value: "lastOrderTime" },
      { label: "总购物次数", value: "buyNum" }
    ];
    this.checkProps = [...this.allProps];
  },
  methods: {
    updateCheckProps(checkProps) {
      this.checkProps = checkProps;
    },
    updateAllProps(allProps) {
      this.allProps = allProps;
    }
  }
};
</script>

<style>
.root {
  display: flex;
  flex-direction: column;
}
.table,
table {
  width: 100%;
}
.table {
  padding: 50px;
  box-sizing: border-box;
}
.controller-icon {
  margin: 0 auto;
}
</style>
