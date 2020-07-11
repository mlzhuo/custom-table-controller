# custom-table-controller

> 控制表格列数据的显示隐藏，以及基于Vue.Draggable实现列排序。
>
> github：https://github.com/mlzhuo/custom-table-controller



## ScreenShot

![](https://github.com/mlzhuo/custom-table-controller/blob/master/screenshot/example.gif)



## Install

``` bash
npm install custom-table-controller
```



## Attributes

|     参数      |           说明            |  类型  |  默认值  |
| :-----------: | :-----------------------: | :----: | :------: |
|   allProps    |      table所有列字段      | Array  |    []    |
| propsLabelKey |      table列名称字段      | String |  label   |
| propsValueKey |       table列值字段       | String |  value   |
|     width     |     展开拖动列表宽度      | Number |   200    |
|    height     |     展开拖动列表高度      | Number |   300    |
|   itemStyle   | 展开拖动列表item的css样式 | Object |    {}    |
|  activeColor  |      选中item的颜色       | String | \#409eff |



## Events

|     事件名称     |    说明    |        回调参数         |
| :--------------: | :--------: | :---------------------: |
| updateCheckProps | 更新选中列 |   选中的 table 列数据   |
|  updateAllProps  | 更新所有列 | 排序后的table所有列数据 |



## Slot

|    name     |                   说明                   |
| :---------: | :--------------------------------------: |
|  click-btn  |   点击显示拖动列表的控件，默认 “点击”    |
| active-icon | 拖动列表选中状态时，尾部的标志，默认 “√” |
|  drag-icon  |      拖动列表首部拖动图标，默认 “≡”      |



## Example

```vue
<template>
  <div class="root">
    <div class="table">
      <table border>
        <tr>
          <th 
            v-for="(item,index) in checkProps" 
            :key="index">{{item[propsLabelKey]}}</th>
        </tr>
        <tr v-for="(eachItem, eachIndex) in tableData" :key="eachIndex">
            <td 
              v-for="(item,index) in checkProps" 
              :key="index">{{eachItem[item[propsValueKey]]}}</td>
        </tr>
      </table>
    </div>

    <div class="controller-icon">
      <customTableController
        @updateCheckProps="updateCheckProps"
        @updateAllProps="updateAllProps"
        :allProps="allProps"
        :propsLabelKey="propsLabelKey"
        :propsValueKey="propsValueKey"
        :width="width"
        :height="height"
        :itemStyle="itemStyle"
        :activeColor="activeColor"
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
        }
      ],
      checkProps: [],
      allProps: [],
      propsLabelKey: "label",
      propsValueKey: "value",
      width: 200,
      height: 300,
      itemStyle: {},
      activeColor: "#409eff"
    };
  },
  created() {
    this.allProps = [
      { label: "职业", value: "career" },
      { label: "总购物次数", value: "buyNum" },
      { label: "所在地", value: "city" },
      { label: "生日", value: "dateOfBirth" },
      { label: "最近一次购物时间", value: "lastOrderTime" },
      { label: "第一次购物时间", value: "firstOrderTime" }
    ];
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

```

