# EditTable

## 概述

主要用于展示可编辑表格数据,主要用于可编辑的表格数据，也可直接用于展示一个格子中有两行数据的情况。

扩展自 [iview Table](https://www.iviewui.com/components/table) 可直接使用 Table 的所有 props 和 mehods。

## 示例

---

1.基础用法:可编辑表格的基本使用方法。

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

---

2.多个选项:一个格子中有多个选项的情况。

---

```javascript
/*vue*/
<desc>
  <p>多个选项:</p>
  <p>一个格子中有多个选项的情况。</p>
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
        { name: "杭州",description: "湖州", num: 100 },
        { name: "杭州", description: "New York",num:300 }
      ],
      config: {
        isNew:true,

        columns: [
          {
            title: "年龄",
            keys: ["code", "description"], // 一个单元格中有两个字段
            type: "select", // 单元格中的'select'
            options: [    // 如果是select,传对应的选项
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
          {
            title: "年龄2", // 列表的列
            type: "input", // 默认可编辑的是input
            key: "name" // 对应到list的key值
          },
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
        ],
      }
    };
  }
};
</script>

<style>
</style>
```

---

3.打开编辑和自动同步:使用isEdit和autoSave。

---

```javascript
/*vue*/
<desc>
  <p>isEdit和autoSave:</p>
  <p>打开编辑和自动同步</p>
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
        { name: "杭州",code:"hz", description: "aa", num: 100 },
        { name: "杭州",code:"huz",description: "bb",num:300 }
      ],
      config: {
        isEdit:true,
        autoSave:true,
        columns: [
          {
            title: "年龄",
            keys: ["code", "description"], // 一个单元格中有两个字段
            type: "select", // 单元格中的'select'
            options: [    // 如果是select,传对应的选项
              {
                code: "hz",
                description:"cc",
                label: "杭州"
              },
              {
                code: "huz",
                description:"bb",
                label: "湖州"
              },
               {
                code: "aa",
                 description:"aa",
                label: "New York"
              }
            ]
          },
          {
            title: "年龄2", // 列表的列
            type: "input", // 默认可编辑的是input
            key: "name" // 对应到list的key值
          },
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
        ],
      }
    };
  }
};
</script>

<style>
</style>
```

---

3.类型type: new:有新增行

---

```javascript
/*vue*/
<desc>
  <p>类型type:</p>
  <p>有新增行</p>
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
        { name: "杭州",code:"hz", description: "aa", num: 100 },
        { name: "杭州",code:"huz",description: "bb",num:300 }
      ],
      config: {
        // isEdit:true,

        autoSave:true,
        type:"new",
        columns: [
          {
            title: "年龄",
            keys: ["code", "description"], // 一个单元格中有两个字段
            type: "select", // 单元格中的'select'
            options: [    // 如果是select,传对应的选项
              {
                code: "hz",
                description:"cc",
                label: "杭州"
              },
              {
                code: "huz",
                description:"bb",
                label: "湖州"
              },
               {
                code: "aa",
                 description:"aa",
                label: "New York"
              }
            ]
          },
          {
            title: "年龄2", // 列表的列
            type: "input", // 默认可编辑的是input
            key: "name" // 对应到list的key值
          },
          {
            title: "年龄3",
            type: "number",
            key: "num",
            props: { precision: 2 }
          },
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

| 属性     | 说明                                   | 是否必传 | 是否 iview 参数 |
| -------- | -------------------------------------- | -------- | --------------- |
| columns  | 表格列的配置描述，扩展自iview,详见下表 | 是       | 是 [API]        | (https://www.iviewui.com/components/table#API) |
| data     | 需要同步的数据,一般使用data.sync       | 是       | 否              |
| autoSave | 是否在修改的时候直接同步外部数据       | 否       |
| isEdit   | 是否一进来就是可编辑状态               | 否       |
| type     | 'new':是否确定后加一条空白             | 否       |

### methods

| 属性       | 说明           | 是否必传 |
| ---------- | -------------- | -------- |
| check      | 一行确定的回调 | 否       |
| delete     | 一行删除的回调 | 否       |
| cell-click | 点击一行的回调 | 否       |

### colums示例

```javascript
[
  {
    title: "年龄",
    keys: ["code", "description"], // 一个单元格中有两个字段
    type: "select", // 单元格中的'select'
    options: [    // 如果是select,传对应的选项
      {
        code: "hz",    //接口字段,这只是示例
        label: "杭州"
      },
      {
        code: "huz",
        label: "湖州"
      }
    ]
  },
  {
    title: "年龄2", // 列表的列
    type: "input", // 默认可编辑的是input
    key: "name" // 对应到list的key值
  },
  {
    title: "年龄3",
    type: "number",
    key: "num",
    props: { precision: 2 }
  },
  {
    title: "操作",
    key: "action",
    buttons:["edit","delete"] //不必传，如果要删掉某个按钮再控制
  }
]
```
