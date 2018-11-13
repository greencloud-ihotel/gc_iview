# EditTable

## 概述

主要用于展示可编辑表格数据。
扩展自 [iview Table](https://www.iviewui.com/components/table) 可直接使用 Table 的所有 props 和 mehods。

1. 基础用法:自动表格的基本使用方法。

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>可编辑表格的基本使用方法。</p>
</desc>
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

## API

### props

| 属性      | 说明                              | 是否必传 | 是否 iview 参数                                        |
| --------- | --------------------------------- | -------- | ------------------------------------------------------ |
| columns   | 表格列的配置描述                  | 是       | 是 [API](https://www.iviewui.com/components/table#API) |
| data      | 请求后台数据的 url 地址           | 否       |
| type      | 后台回传的接口中的数据的路径      | 否       |
| isEdit    | 是否隐藏分页条                    | 否       |
| buttons   | 自定义传入数据,一般用于第一次搜索 | 否       |
| autoSave  | 定义每页条数                      | 否       |                                                        |
| precision | 拒绝自动获取,第一次不搜索         | 否       |
