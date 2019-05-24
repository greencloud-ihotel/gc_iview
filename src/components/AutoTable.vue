<template>
  <Card :class="[{'box':originalStyle }]  ">
    <!-- 头部插槽内容 -->
    <slot name="header"></slot>
    <!-- 块级元素 不需要Row/div嵌套 -->
    <Table :loading="tableIsLoading"
           :columns="columns"
           :data="tableData"
           :height="tableHeight"
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
            show-total
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
  props: {
    hidePage: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: "",
      required: true,
      validator: value => {
        // 这个值必须匹配下列字符串中的一个
        return value !== "";
      }
    }, //接口地址
    path: {
      type: String,
      default: ""
    }, // 根据data.retVal.path去加载data数据
    initData: {
      type: Object,
      default: () => {
        return {};
      }
    }, //自定义传入数据
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    }, // 定义列
    pageSize: {
      type: Number,
      default: 30
    }, // 定义每页条数
    refuseFetch: {
      type: Boolean,
      default: false
    }, //拒绝自动获取
    transfer: {
      type: Boolean,
      default: false
    }, //分页页数下拉框放置位置
    showSize: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 420
    },
    originalStyle: {
      type: Boolean,
      default: true
    }
    //是否使用原始样式，默认为false
  },
  data() {
    return {
      tableIsLoading: false, // 是否正在加载

      tableData: [], // 表格数据
      tableTotalRows: 0, // 表格总行数
      tableCurrentPage: 1, // 表格当前页
      tablePageSize: 30, // 表格每页条数
      currentParams: {}, //当前参数
      tableHeight: 420
    };
  },
  created() {
    this.tablePageSize = this.pageSize;

    this.tableHeight = this.height;

    // 判断是否存在action列,如果有则根据buttons: ['View', 'Edit', 'Delete'] 来生存操作按钮
    if (this.columns) {
      this.columns.forEach(item => {
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
    "initData.firstResult": {
      handler(value) {
        this.tableCurrentPage = (value || 0) / this.tablePageSize + 1;
      }
    },
    url(value) {
      if (value) {
        // 捕获到url属性发生变化 刷新下数据
        this.refresh();
      }
    },
    height(val) {
      this.tableHeight = val;
    }
  },
  methods: {
    getTableData() {
      return this.tableData;
    },
    getTableTotalRows() {
      return this.tableTotalRows;
    },
    getParams(isInSide) {
      var params = {
        firstResult: isInSide
          ? (this.tableCurrentPage - 1) * this.tablePageSize
          : 0,
        pageSize: this.tablePageSize
      };
      return params;
    },
    fetchDataInitail(data, isInSide) {
      this.tableIsLoading = true;
      var baseParams = this.getParams(isInSide);
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
          this.$nextTick(() => {
            this.tableTotalRows = response.data.retVal.totalRows;
          });
          this.$emit("fetch-table-data-success", this.tableData);
          this.$emit("input", this.tableData);
        })
        .catch(error => {
          // 接口请求失败
          console.log(error);
          this.tableIsLoading = false;
        });
    },
    fetchDataInSide(data) {
      this.fetchDataInitail(data, true);
    },
    fetchData(data) {
      this.fetchDataInitail(data);
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
      this.fetchDataInSide(this.currentParams);
    },
    pageSizeChange(value) {
      this.tablePageSize = value;
      this.pageSizeChangeFlag = true;
      if (this.tableCurrentPage === 1) {
        //this.refresh();
        this.fetchData(this.currentParams);
      }
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
// .box {
//   text-align: center;
// }
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
.box {
  padding: 0;
  /deep/.ivu-table-cell {
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
  }
  /deep/.ivu-table td {
    height: 30px;
  }
  /deep/.ivu-table th {
    height: 30px;
  }
  .ivu-table .ivu-select {
    line-height: 24px;
    height: 24px;
  }
  /deep/ .ivu-card-body {
    padding: 0;
  }
}
</style>
