# AutoTable

## 概述

主要用于展示大量结构化数据。扩展自 [iview Table](https://www.iviewui.com/components/table) 可直接使用 Table 的所有 props 和 mehods。

```javascript
/*vue*/
<template>
  <div>
    <AutoTable v-bind="autoTableConfig"></AutoTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoTableConfig: {
        columns: [
          { title: "username", key: "username" },
          { title: "id", key: "id" }
        ],
        url: "/api/user/list",
        path: "datas"
      }
    };
  }
};
</script>

<style>
</style>
```
