<template>
  <ul ref="ulparent" class="select-tab">
    <li
      v-for="(item, index) in tabData"
      :key="item.key"
      ref="item"
      class="tab-item"
      :class="[{ active: tabData[current].key === item.key }, lineStyle]"
      @click="selectTab(index)"
    >
      {{ item.value }}
    </li>
    <li
      v-if="!lineStyle"
      ref="line"
      class="border-bottom"
      :style="{ left: left,marginLeft: -baseWidth / 2 + 'px' }"
    />
  </ul>
</template>

<script>
export default {
  name: "SelectTab",
  props: {
    tabData: {
      type: Array,
      default: () => {
        return [
          { key: 1, value: "tab1" },
          { key: 2, value: "tab2" },
          { key: 3, value: "tab3" },
        ];
      },
    },
    current: {
      type: Number,
      default: 0,
    },
    lineStyle: {
      type: String,
      default: "",
    },
    baseWidth: {
      type: Number,
      default: -10
    },
  },
  data() {
    return {
      left: 0,
    };
  },
  watch:{
    current:{
      handler(){
        this.linePos();
      },
      immediate:true
    }
  },
  methods: {
    linePos() {
      this.$nextTick(() => {
        if (this.$refs.line) {
          this.$refs.line.style.width =
            this.$refs.item[this.current].clientWidth  + this.baseWidth  + "px";
          this.left = this.$refs.item[this.current].offsetLeft + "px";
        }
      });
    },
    selectTab(index) {
      // this.current = index
      // this.left = this.$refs.item[index].offsetLeft + "px";
      // if (this.$refs.line) {
      //   this.$refs.line.style.width = this.$refs.item[index].clientWidth + "px";
      // }
      this.$emit("tabClick", this.tabData[index], index);
    },
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.select-tab {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  min-width: 120px;

  .tab-item {
    font-size: 16px;
    color: #606266;
    cursor: pointer;

    & + .tab-item {
      margin-left: 36px;
    }

    // padding-bottom: 10px;
    &.active {
      color: #ff5086;
    }
  }

  .border-line {
    padding-bottom: 2px;

    &.active {
      border-bottom: 2px solid #ff5086;
    }
  }

  .border-bottom {
    position: absolute;
    bottom: -6px;
    left: 0;
    height: 4px;
    border-radius: 5px;
    background: #ff5086;
    transition: all 1s;
  }
}
</style>
