# EditTable

## 概述

主要用于展示可编辑表格数据,主要用于可编辑的表格数据，也可直接用于展示一个格子中有两行数据的情况。

扩展自 [iview Table](https://www.iviewui.com/components/table) 可直接使用 Table 的所有 props 和 mehods。

## 示例

1. 基础用法:可编辑表格的基本使用方法。

---

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>可编辑表格的基本使用方法。</p>
</desc>
<template>
  <div>
    {{list}}
    <edit-table v-bind="config" :data.sync="list"></edit-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: "杭州", description: "湖州", modifyUser: 100 },
        { name: "杭州", description: "New York" }
      ],
      config: {
        columns: [
          { title: "年龄2", type: "input", key: "name" },
          {
            title: "操作",
            key: "action",
          }
        ],
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

| 属性      | 说明                                   | 是否必传 | 是否 iview 参数                                        |
| --------- | -------------------------------------- | -------- | ------------------------------------------------------ |
| columns   | 表格列的配置描述，扩展自iview,详见下表 | 是       | 是 [API](https://www.iviewui.com/components/table#API) |
| autoSave  | 是否在修改的时候直接同步外部数据       | 否       |
| isEdit    | 是否一进来就是可编辑状态               | 否       |
| precision | 数值精度                               | 否       |

### colums示例

[
  {
    title: "年龄",
    keys: ["code", "description"],
    type: "select",
    options: [
      {
        code: "hz",
        label: "杭州"
      },
      {
        code: "huz",
        label: "湖州"
      }
    ]
  },
  { title: "年龄2", type: "input", key: "name" },
  {
    title: "年龄3",
    type: "number",
    key: "num",
    props: { precision: 2 }
  },
  {
    title: "操作",
    key: "action"
  }
]
