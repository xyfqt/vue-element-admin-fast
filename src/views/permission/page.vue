<template>
  <div>
    <div class="search-fold-icon" @click="foldSearch()" v-show="showFold" :style="{'top':foldTop}">
      <i class="el-icon-s-fold icon" :style="foldStyle"></i>
    </div>
    <div class="search-area-class" :style="foldContainerStyle">
      <search-area :query-params.sync="queryParams" :query-item="queryItem"></search-area>
    </div>
    <div class="table-area" ref='tabArea'>
      <el-table
        v-loading="listLoading"
        :data="dataList"
        ref="dataTable"
        border
        fit
        highlight-current-row
        :row-key="rowKey"
        :max-height="maxHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" :reserve-selection="true" fixed="left" />
        <el-table-column label="排序" align="center" prop="sort" />
        <el-table-column label="商品ID" align="center" prop="productId" />
        <el-table-column label="商品名称" align="center" prop="name" width="270" />
        <el-table-column label="淘宝分类" align="center" prop="typeName" />
        <el-table-column label="商品价格（元）" align="center" prop="zkFinalPrice" />
        <el-table-column label="佣金" align="center" prop="commission" />
        <el-table-column label="优惠面额" align="center" prop="couponInfo" width="114" />
        <el-table-column label="补贴用户金额" align="center" prop="subsidiesUser" />
        <el-table-column label="限购库存" align="center" prop="limitNum" />
        <el-table-column label="已购商品数量" align="center" prop="albuyNum" />
        <el-table-column label="上架状态" align="center" prop="stateStr" />
        <el-table-column label="创建时间" align="center" prop="createtimeStr" width="160" />
        <el-table-column label="操作" align="center" width="340" fixed="right">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="setSubsidiesMoney(row)">设置补贴金额</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="updateStatus(row)"
            >{{ row.state ?'下架' : '上架' }}</el-button>
            <el-button type="primary" size="mini" @click="editGoods(row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delZeroGoods(row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="total>0" class="pagination">
      <el-pagination
        background
        :page-size="size"
        :current-page="currentPage"
        layout="total,sizes,prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import SearchArea from "@/components/SearchArea";
import TableMixin from "@/mixins/tableMixin";

import dataList from "./data.js";

export default {
  name: "Dashboard",
  mixins: [TableMixin],
  components: {
    SearchArea,
  },
  data() {
    return {
      queryParams: {
        keyWord: "",
        state: "",
        startPrice: "",
        endPrice: "",
        date: "",
        startTime: "",
        endTime: "",
      },
      queryItem: [
        {
          type: "input",
          column: "keyWord",
          placeholder: "商品ID/商品名称/分类名称",
        },
        {
          type: "select",
          column: "state",
          placeholder: "上架状态",
          option: [
            { key: "", value: "全部" },
            { key: "1", value: "上架中" },
            { key: "0", value: "已下架" },
          ],
        },
        {
          type: "dobulein",
          column: [" startPrice", "endPrice"],
          placeholder: "商品价格",
        },
        {
          type: "doubleDate",
          column: "date",
          placeholder: ["创建开始时间", "创建结束时间"],
        },
      ],
    };
  },
  methods: {
    getDataList() {
      this.dataList = dataList.data.list;
      this.total = dataList.data.total;
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard-container {
}
</style>