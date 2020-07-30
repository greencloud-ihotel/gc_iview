# AutoTable

## 概述

主要用于展示大量结构化数据。扩展自 [iview Table](https://www.iviewui.com/components/table) 可直接使用 Table 的所有 props 和 mehods。

## 示例

<demo-block title='1. 基本用法' desc='自动表格的基本使用方法'>
  <div slot='demo'><AutoTable-1/></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/AutoTable/1.vue

  </div>
</demo-block>

<demo-block title='2. 搭配FilterSearch' desc='搭配 FilterSearch 组件 相结合的用法:AutoTable 和 FilterSearch 相结合。'>
  <div slot='demo'><AutoTable-2/></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/AutoTable/2.vue

  </div>
</demo-block>

## API

### solt

| 属性   | 说明             |                                  |     |
| ------ | ---------------- | -------------------------------- | --- |
| header | 自动表格头部插槽 | 头部插槽，一般用于表格的筛选条件 |     |

### props

| 属性          | 说明                                                                          | 是否必传 | 是否 iview 参数                                              | 默认值   |
| ------------- | ----------------------------------------------------------------------------- | -------- | ------------------------------------------------------------ | -------- |
| columns       | 表格列的配置描述                                                              | 是       | 是 [API](https://www.iviewui.com/components/table#API)       | []       |
| url           | 请求后台数据的 url 地址                                                       | 是       |                                                              | ""       |
| path          | 后台回传的接口中的数据的路径                                                  | 否       |                                                              | ""       |
| hidePage      | 是否隐藏分页条                                                                | 否       |                                                              | false    |
| initData      | 自定义传入数据,一般用于第一次搜索                                             | 否       |                                                              | {}       |
| pageSize      | 定义每页条数                                                                  | 否       |                                                              | 30       |
| refuseFetch   | 拒绝自动获取,第一次不搜索                                                     | 否       |                                                              | false    |
| transfer      | 分页页数下拉框放置位置                                                        | 否       | 是 [API](https://www.iviewui.com/components/page#Page_props) | false    |
| showSize      | 显示分页，用来改变 page-size                                                  | 否       | 是 [API](https://www.iviewui.com/components/page#Page_props) | false    |
| originalStyle | 是否显示原始 iview 的样式                                                     | 否       | 是 [API](https://www.iviewui.com/components/page#Page_props) | true     |
| loadData      | loadData 加载表格数据， url 和 loadData 二选一，loadData 需要返回一个 Promise | 否       | 否                                                           | Function |

### columns

| directives | 指令 在 buttons 中的传入方式为 buttons: [
{
label: "修改",
value: "edit",
directives: [{ name: "name", value: "value" }]
}
], | 否 | | directives: [{ name: "name", value: "value" }] |
