# EditTable

## 概述

主要用于展示可编辑表格数据,主要用于可编辑的表格数据，也可直接用于展示一个格子中有两行数据的情况。

扩展自 [iview Table](https://www.iviewui.com/components/table) 可直接使用 Table 的所有 props 和 mehods。

## 示例

<demo-block title='1. 基础用法' desc='可编辑表格的基本使用方法。'>
  <div slot='demo'><EditTable-1></EditTable-1></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/EditTable/1.vue

  </div>
</demo-block>

<demo-block title='2. 多个选项:' desc='一个格子中有多个选项的情况。'>
  <div slot='demo'><EditTable-2></EditTable-2></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/EditTable/2.vue

  </div>
</demo-block>

<demo-block title='3. 打开编辑和自动同步:' desc='使用 isEdit 和 autoSave。'>
  <div slot='demo'><EditTable-3></EditTable-3></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/EditTable/3.vue

  </div>
</demo-block>

<demo-block title='4. 最后行为新增行:' desc='使用 类型 type: new:'>
  <div slot='demo'><EditTable-4></EditTable-4></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/EditTable/4.vue

  </div>
</demo-block>

## API

### props

| 属性     | 说明                                    | 是否必传 | 是否 iview 参数 |
| -------- | --------------------------------------- | -------- | --------------- |
| columns  | 表格列的配置描述，扩展自 iview,详见下表 | 是       | 是 [API]        | (https://www.iviewui.com/components/table#API) |
| data     | 需要同步的数据,一般使用 data.sync       | 是       | 否              |
| autoSave | 是否在修改的时候直接同步外部数据        | 否       |
| isEdit   | 是否一进来就是可编辑状态                | 否       |
| type     | 'new':是否确定后加一条空白              | 否       |

### methods

| 属性       | 说明           | 是否必传 |
| ---------- | -------------- | -------- |
| check      | 一行确定的回调 | 否       |
| delete     | 一行删除的回调 | 否       |
| cell-click | 点击一行的回调 | 否       |

### colums 示例

```javascript
[
  {
    title: "年龄",
    keys: ["code", "description"], // 一个单元格中有两个字段
    type: "select", // 单元格中的'select'
    options: [
      // 如果是select,传对应的选项
      {
        code: "hz", //接口字段,这只是示例
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
    buttons: ["edit", "delete"] //不必传，如果要删掉某个按钮再控制
  }
];
```
