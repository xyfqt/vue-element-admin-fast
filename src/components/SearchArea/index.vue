<template>
  <div class="filter-container" @keyup.enter="search()">
    <span v-for="(item,index) in queryItem" :key="index" class="in-search" v-show="!item.hidden">
      <el-input
        v-if="item.type=='input' && !item.hidden"
        v-model.trim="queryParams[item.column]"
        :placeholder="item.placeholder"
        clearable
        class="filter-item"
      >
        <template v-if="item.suffix" slot="suffix">
          <div style="display: flex;align-items: center;width: 16px;height:100%">{{ item.suffix }}</div>
        </template>
      </el-input>
      <span v-else-if="item.type=='dobulein' && !item.hidden" class="dobulein">
        <el-input
          v-model.trim="queryParams[item.column[0]]"
          :placeholder="item.placeholder"
          class="filter-item"
        />
        <span>至</span>
        <el-input
          v-model.trim="queryParams[item.column[1]]"
          :placeholder="item.placeholder"
          class="filter-item"
        />
      </span>

      <el-select
        v-else-if="item.type=='select' && !item.hidden"
        v-model="queryParams[item.column]"
        :placeholder="item.placeholder"
        clearable
        class="filter-item"
      >
        <el-option v-for="val in item.option" :key="val.key" :value="val.key" :label="val.value" />
      </el-select>
      <el-date-picker
        v-else-if="item.type=='doubleDate' && !item.hidden"
        v-model="queryParams[item.column]"
        type="daterange"
        range-separator="至"
        :start-placeholder="item.placeholder[0]"
        :end-placeholder="item.placeholder[1]"
      />

      <el-date-picker
        v-else-if="item.type=='date' && !item.hidden"
        v-model="queryParams[item.column]"
        type="date"
        :placeholder="item.placeholder"
      />
    </span>
    <!-- <el-tooltip content="可按回车键搜索" placement="top"> -->
      <el-button
        v-if="showSearch"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="search()"
      >搜索</el-button>
    <!-- </el-tooltip> -->
    <el-button v-if="showSearch" class="filter-item" type="info" plain @click="reset()">重置</el-button>
    <slot name="diybtn" :params="queryParams" />
  </div>
</template>

<script>
export default {
  name: "SearchArea",
  props: {
    queryItem: {
      type: Array,
      default: [],
    },
    queryParams: {
      type: Object,
      default: {},
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    queryItem: {
      handler: function (val, oldval) {
        if (val) {
          for (const item in val) {
            if (Array.isArray(item.column)) {
              this.queryParams[item.column[0]] = "";
              this.queryParams[item.column[1]] = "";
            } else if (item.column) {
              this.queryParams[item.column] = "";
            }
          }
        }
      },
      immediate: true, // 关键
      deep: true,
    },
  },
  methods: {
    search() {
      this.$emit("update:queryParams", this.queryParams);
      this.$emit("search", this.queryParams);
    },
    reset() {
      Object.keys(this.queryParams).map((item) => {
        this.queryParams[item] = "";
      });
      this.$emit("update:queryParams", this.queryParams);
      this.$emit("search", this.queryParams);
    },
    add() {
      this.$emit("add");
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  background: #fff;
  border-bottom-width: 0;
  .filter-item {
    vertical-align: 0;
  }
}

.in-search {
  display: inline-block;
  padding-right: 10px;

  ::v-deep .filter-item {
    width: 200px !important;
  }
}

@media only screen and (max-width: 481px) {
  .in-search {
    ::v-deep .filter-item {
      width: 22vh !important;
    }
  }
}
</style>
