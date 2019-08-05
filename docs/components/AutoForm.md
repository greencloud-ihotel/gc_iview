# AutoForm

## 概述

主要用于展示大量结构化数据。扩展自 [iview Table](https://www.iviewui.com/components/table) 可直接使用 Table 的所有 props 和 mehods。

## 示例

1. 1.基础用法:自动表格的基本使用方法。

## API

### props

| 属性        | 说明                              | 是否必传 | 是否 iview 参数 | 默认值 |
| ----------- | --------------------------------- | -------- | --------------- | ------ |
| value       | 自动表单的值，可使用v-model       | 是       | 否              | {}     |
| fields      | 请求后台数据的 url 地址           | 是       |                 | ""     |
| path        | 后台回传的接口中的数据的路径      | 否       |                 | ""     |
| hidePage    | 是否隐藏分页条                    | 否       |                 | false  |
| initData    | 自定义传入数据,一般用于第一次搜索 | 否       |                 | {}     |
| pageSize    | 定义每页条数                      | 否       |                 | 30     |
| refuseFetch | 拒绝自动获取,第一次不搜索         | 否       |                 | false  |

