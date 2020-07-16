<template>
  <div class="root" :style="{ width: width + 'px' }">
    <div class="btn-icon" @click="isShowList = !isShowList">
      <slot name="click-btn">
        <span class="iconfont icon-shezhi"></span>
      </slot>
    </div>
    <div
      class="props-view"
      :style="{ width: width + 'px', 'max-height': height + 'px' }"
      v-if="isShowList"
    >
      <slot name="list-header">
        <div class="header">
          表头设置
          <span class="iconfont icon-cuohao" @click="isShowList = !isShowList"></span>
        </div>
      </slot>
      <draggable v-model="_allProps" @end="onEnd">
        <transition-group>
          <div
            class="item-view"
            v-for="(item, index) in _allProps"
            :style="itemStyle"
            :key="item[propsValueKey]"
            @click="clickAction(item)"
          >
            <div class="icon-drag-view">
              <slot name="drag-icon">
                <span class="iconfont icon-tuodong"></span>
              </slot>
            </div>
            <div
              class="label"
              :style="{
                color: isActiveThisProps(item[propsValueKey]) ? activeColor : ''
              }"
            >{{ item[propsLabelKey] }}</div>
            <div class="icon-check-view" :style="{ color: activeColor }">
              <slot name="active-icon" v-if="isActiveThisProps(item[propsValueKey])">
                <span class="iconfont icon-jianchacheck35"></span>
              </slot>
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "custom-table-controller",
  props: {
    // table 表头字段
    allProps: {
      type: Array,
      default: () => {
        return [];
      },
      required: true
    },
    checkProps: {
      type: Array,
      default: () => {
        return [];
      },
      required: true
    },
    // 表头名称key
    propsLabelKey: {
      type: String,
      default: "label"
    },
    // 表头名称对应的字段key
    propsValueKey: {
      type: String,
      default: "value"
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 300
    },
    itemStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    activeColor: {
      type: String,
      default: "#409eff"
    }
  },
  components: {
    draggable
  },
  computed: {
    _allProps: {
      get() {
        return [...this.allProps];
      },
      set() {}
    },
    _checkProps: {
      get() {
        return [...this.checkProps];
      },
      set() {}
    }
  },
  data() {
    return {
      isShowList: false
    };
  },
  created() {},
  methods: {
    clickAction(data) {
      const value = data[this.propsValueKey];
      const index = this._checkProps.findIndex(
        v => v[this.propsValueKey] == value
      );
      if (index === -1) {
        const index = this._allProps.findIndex(
          v => v[this.propsValueKey] == value
        );
        this._checkProps.splice(index, 0, data);
      } else {
        this._checkProps.splice(index, 1);
      }
      this.$emit("updateCheckProps", this._checkProps);
      this.$emit("updateAllProps", this._allProps);
    },
    isActiveThisProps(props) {
      const index = this._checkProps.findIndex(
        v => v[this.propsValueKey] == props
      );
      return index !== -1;
    },
    onEnd(e) {
      const { newIndex, oldIndex } = e;
      let tempArr = [...this._allProps];
      const tempItem = this._allProps[oldIndex];
      tempArr.splice(oldIndex, 1);
      tempArr.splice(newIndex, 0, tempItem);

      let tempCheckArr = [];
      tempArr.forEach(v => {
        const index = this._checkProps.findIndex(
          vv => vv[this.propsValueKey] == v[this.propsValueKey]
        );
        if (index !== -1) {
          tempCheckArr.push(v);
        }
      });
      this.$emit("updateAllProps", tempArr);
      this.$emit("updateCheckProps", tempCheckArr);
    }
  }
};
</script>

<style scoped>
@import url("../assets/style.css");
.root {
  display: flex;
  flex-direction: column;
  position: relative;
}
.btn-icon {
  display: inline-block;
  align-self: flex-end;
}
.props-view {
  overflow-y: auto;
  padding: 10px 0;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
  line-height: 34px;
}
.props-view .header {
  font-size: 14px;
  color: #555;
  font-weight: bold;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 10px;
}
.props-view .header span {
  padding-left: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-weight: normal;
}
.props-view .item-view {
  color: #606266;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  margin: 0;
  display: flex;
  padding: 0 10px;
}
.item-view:hover {
  background-color: #f5f7fa;
}
.props-view .icon-drag-view {
  cursor: move;
}
.props-view .label {
  flex: 1;
  margin-left: 10px;
}
::-webkit-scrollbar {
  width: 8px;
  background-color: transparent;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #9093994d;
}
</style>
