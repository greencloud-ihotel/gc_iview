# CustomTable

## 概述

主要用于展示可编辑表格数据,主要用于可编辑的表格数据。扩展自 [iview Table](https://www.iviewui.com/components/table) 可直接使用 Table 的所有 props 和 mehods。

## 示例

<demo-block title='1. 基础用法' desc='可编辑表格的基本使用方法。'>
  <div slot='demo' >
    <CustomTable-1></CustomTable-1>
  </div>
  <div slot='code'>

<<< @/docs/.vuepress/components/CustomTable/1.vue

  </div>
</demo-block>
<demo-block title='2. 带搜索头部的用法' desc='带搜索头部的基本使用方法。'>
  <div slot='demo' >
    <CustomTable-2></CustomTable-2>
  </div>
  <div slot='code'>

<<< @/docs/.vuepress/components/CustomTable/2.vue

  </div>
</demo-block>

## API

### solt

| 属性   | 说明             |          |     |
| ------ | ---------------- | -------- | --- |
| header | 自动表格头部插槽 | 头部插槽 |     |

### props

| 属性                 | 说明                                                    | 是否必传 | 是否 iview 参数                                        | 默认值   |
| -------------------- | ------------------------------------------------------- | -------- | ------------------------------------------------------ | -------- |
| columns              | 表格列的配置描述                                        | 是       | 是 [API](https://www.iviewui.com/components/table#API) | []       |
| newModel             | 是否显示新增按钮行                                      | 否       |                                                        | true     |
| v-model              | 表格数据项                                              | 否       |                                                        | []       |
| filterRow            | 是否显示搜索框 (暂时请在非新增模式下使用)               | 否       |                                                        | false    |
| addClickBeforeChange | 新增按钮点击增加一行前的方法，返回 Promise 可以阻止新增 | 否       |                                                        | Function |
| hasDelete            | 是否需要删除按钮                                        | 否       |                                                        | true     |

### event

| 事件名    | 说明                                                         | 返回值   |
| --------- | ------------------------------------------------------------ | -------- |
| on-search | 头部搜索框点击搜索时触发，并且在清空搜索框的时候也会触发一次 | 搜索的值 |

### columns

| 属性     | 说明                                                                                                                                         | 是否必传 | 是否 iview 参数 | 默认值     |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- | ---------- |
| title    | 标题                                                                                                                                         | 否       |                 | ""         |
| type     | 渲染的内容 'select','input','inputnumber','p' ,'a' ,如果没有可以通过 render 渲染,,key 为'action'时 type 可以传入一个数组对象，key value 形式 | 否       |                 | ""         |
| key      | 字段关键字                                                                                                                                   | 是       |                 | ""         |
| align    | 当前列的对齐方式                                                                                                                             | 否       |                 | "left"     |
| options  | type 为 select 时的下拉数据列表                                                                                                              | 是       |                 | []         |
| props    | 当前列的属性事件等传递，参考 vue 的 jsx 内的属性均可以传递                                                                                   | 否       |                 | {}         |
| render   | 自定义渲染内容                                                                                                                               | 否       |                 | Function   |
| code     | options 列表中的 value 映射字段                                                                                                              | 否       |                 | "code"     |
| descript | options 列表中的 描述 映射指端                                                                                                               | 否       |                 | "descript" |
