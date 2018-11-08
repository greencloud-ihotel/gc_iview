<template>
  <Card class="box">
    <!-- 头部插槽内容 -->
    <slot name="header"></slot>
    <!-- 块级元素 不需要Row/div嵌套 -->
    <Table :loading="tableIsLoading"
           :columns="tableColumns"
           :data="tableData"
           v-bind="$attrs"
           v-on="$listeners"></Table>
    <div class="page"
         v-if="tableData && tableData.length>0"
         v-show="!hidePage">
      <Page v-on="$listeners"
            class="pagebar"
            @on-page-size-change="pageSizeChange"
            :current="tableCurrentPage"
            :show-sizer="!showSize"
            show-elevator
            :page-size="tablePageSize"
            :total="tableTotalRows"
            @on-change="onPageChange"
            :transfer="transfer"></Page>
    </div>
  </Card>
</template>

<script>
import _ from "lodash";
export default {
  name: "AutoTable",
  inheritAttrs: false,
  props: [
    "hidePage",
    "url", //接口地址
    "path", // 根据data.retVal.path去加载data数据
    "initData", //自定义传入数据
    "columns", // 定义列
    "pageSize", // 定义每页条数
    "refuseFetch", //拒绝自动获取
    "transfer", //分页页数下拉框放置位置
    "showSize"
  ],
  data() {
    return {
      tableIsLoading: false, // 是否正在加载
      tableColumns: [], // 表头数据
      tableData: [], // 表格数据
      tableTotalRows: 0, // 表格总行数
      tableCurrentPage: 1, // 表格当前页
      tablePageSize: 10, // 表格每页条数
      currentParams: {} //当前参数
    };
  },
  created() {
    this.tablePageSize = this.pageSize || 10;
    this.tableColumns = this.columns || [];
    // 判断是否存在action列,如果有则根据buttons: ['View', 'Edit', 'Delete'] 来生存操作按钮
    if (this.tableColumns) {
      this.tableColumns.forEach(item => {
        _.set(item, "tooltip", true);
        if (item.key && !_.has(item, "render") && item.key == "action") {
          let arr = [];
          _.map(item.buttons, val => {
            arr.push(<span class="button">{val}</span>);
          });
          item.render = (h, params) => {
            return (
              <span
                onClick={e => {
                  this.$emit("on-click", {
                    type: e.target.innerHTML,
                    params
                  });
                }}
              >
                {arr}
              </span>
            );
          };
        }
      });
    }
    if (!this.refuseFetch) {
      this.fetchData();
    }
  },
  watch: {
    url() {
      // 捕获到url属性发生变化 刷新下数据
      this.refresh();
    }
  },
  methods: {
    getTableData() {
      return this.tableData;
    },
    getTableTotalRows() {
      return this.tableTotalRows;
    },
    getParams() {
      var params = {
        firstResult: (this.tableCurrentPage - 1) * this.tablePageSize,
        pageSize: this.tablePageSize
      };
      return params;
    },
    fetchData(data) {
      this.tableIsLoading = true;
      var baseParams = this.getParams();
      let params = _.merge(this.initData, data, baseParams);
      this.currentParams = params;
      this.$http
        .get(this.url, { params })
        .then(response => {
          // 使用箭头函数获取this
          this.tableIsLoading = false;
          if (_.isEmpty(this.path)) {
            this.tableData = response.data.retVal;
          } else {
            this.tableData = _.get(response.data.retVal, this.path);
          }
          this.tableTotalRows = response.data.retVal.totalRows;
          this.$emit("fetch-table-data-success");
        })
        .catch(error => {
          // 接口请求失败
          console.log(error);
          this.tableIsLoading = false;
        });
    },
    // 刷新当前页函数
    refreshAndBack(data) {
      this.tableCurrentPage = 1;
      this.fetchData(data);
    },
    refresh(data) {
      this.fetchData(data);
    },
    clearTable() {
      this.tableData = [];
    },
    onPageChange(newPage) {
      this.tableCurrentPage = newPage;
      this.fetchData(this.currentParams);
    },
    pageSizeChange(value) {
      this.tablePageSize = value;
      this.refresh();
      this.$emit("sendPageSize", value);
    }
  }
};
</script>

<style lang="less" scoped>
.button {
  margin-right: 10px;
  cursor: pointer;
  color: #4a90e2;
}
.pagebar {
  padding: 10px;
}
.page {
  text-align: right;
}
.ivu-card-bordered {
  border: none;
  &:hover {
    box-shadow: none;
    border-color: #eee;
  }
}
</style>
