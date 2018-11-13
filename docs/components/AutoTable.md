# AutoTable

## 概述

主要用于展示大量结构化数据。扩展自 [iview Table](https://www.iviewui.com/components/table) 可直接使用 Table 的所有 props 和 mehods。

1. 基础用法:自动表格的基本使用方法。

```javascript
/*vue*/
<template>
  <div>
    <auto-table v-bind="autoTableConfig"></auto-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoTableConfig: {
        columns: [
          { title: "标识", key: "id" },
          { title: "姓名", key: "username" },
          { title: "性别", key: "sex" },
        ],
        url: "https://yapi.ihotel.cn/mock/60/AutoTable_1",
        path: "datas"
      }
    };
  }
};
</script>

<style>
</style>
```

2. 包含操作用法:自动表格包含操作的用法。

## API

### props

| 属性        | 说明                              | 是否必传 | 是否 iview 参数                                              |
| ----------- | --------------------------------- | -------- | ------------------------------------------------------------ |
| columns     | 表格列的配置描述                  | 是       | 是 [API](https://www.iviewui.com/components/table#API)       |
| url         | 请求后台数据的 url 地址           | 是       |
| path        | 后台回传的接口中的数据的路径      | 否       |
| hidePage    | 是否隐藏分页条                    | 否       |
| initData    | 自定义传入数据,一般用于第一次搜索 | 否       |
| pageSize    | 定义每页条数                      | 否       |                                                              |
| refuseFetch | 拒绝自动获取,第一次不搜索         | 否       |
| transfer    | 分页页数下拉框放置位置            | 否       | 是 [API](https://www.iviewui.com/components/page#Page_props) |
| showSize    | 显示分页，用来改变 page-size      | 否       | 是 [API](https://www.iviewui.com/components/page#Page_props) |
