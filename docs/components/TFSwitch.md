# TFSWitch

## 概述

switch 组件封装,主要针对于后端返回 T 或 F ,而不是 true 或 false 的情况 ,可直接用于更新。
扩展自 [iview switch](https://www.iviewui.com/components/switch) 可直接使用 switch 的所有 props 和 mehods。

## 示例

1.基础用法:状态开关的基础用法。

---

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>自动表格的基本使用方法。</p>
</desc>
<template>
  <div>
     <t-f-switch :updateUrl="updateUrl"  :row="rowData"></t-f-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateUrl: "/product-room/bks/channelInfo/updateChannel",
      rowData:{
        isHalt:"T"
      },
    };
  }
};
</script>

<style>
</style>
```

---

2.在 AutoTable 中使用。

---

```javascript
/*vue*/
<template>
  <div class="contanier">
    <auto-table v-bind="autoTableConfig"></auto-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoTableConfig: {
        columns: [
          { title: "用户id", key: "id" },
          {
            title: "姓名",
            key: "username"
          },
          {
            title: "启用",
            key: "username",
            render: (h,params) => {
              return h("TFSwitch", {
                props: {
                  row: params.row,
                  url: "https://yapi.ihotel.cn/mock/60/updateTable"
                }
              });
              // use jsx
              // return (<TFSwitch row={params.row}></TFSwitch>)
            }
          }
        ],
        url: "https://yapi.ihotel.cn/mock/60/AutoTable_1",
        path: "datas"
      }
    };
  }
};
</script>

```

## API

### props

| 属性 | 说明                                              | 是否必传 | 是否 iview 参数 |
| ---- | ------------------------------------------------- | -------- | --------------- |
| row  | 行数据，包含 isHalt 参数，F 为 False，T 为 True， | 是       | 否              |
| url  | 更新 Url，后台更新状态的 url 地址                 | 是       | 否              |
