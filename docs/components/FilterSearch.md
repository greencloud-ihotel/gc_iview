# FilterSearch

## 概述

主要用于列表页面搜索的刷选条件。

1. 基础用法:自动表格的基本使用方法。

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>自动表格的基本使用方法。</p>
</desc>
<template>
  <div>
    <filter-search v-bind="searchColumns"  v-model='searchData'></filter-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData:{
          conditionText:'',
          searchBarStas:'',
      },
      searchColumns: [

          {
          datas: [
            {
              label: "查询",
              action: () => {
                //this.postTableData(1);
              }
            },
            {
              label: "重置",
              action: "reset"
            },
            {
              label: "新增",
              action: () => {
                //this.addAction();
              }
            }
          ],
          type: "buttons"
        }
      ],
    };
  }
};
</script>

<style>
</style>
```
