# AutoForm

## 概述

主要用于展示大量结构化数据。扩展自 [iview Form](https://www.iviewui.com/components/form) 可直接使用 Form 的所有 props 和 mehods。

## 示例

<demo-block>
  <div slot='title'>1. 基本用法</div>
  <div slot='desc'>自动表单的基础使用</div>
  <div slot='demo'><AutoForm-1></AutoForm-1></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/AutoForm/1.vue

  </div>
</demo-block>

## API

### slot

| slot 名 | 说明       | 是否必传 | 是否 iview 参数 | 默认值 |
| ------- | ---------- | -------- | --------------- | ------ |
| footer  | 搜索框底部 | 否       | 否              | 无     |

### props

| 属性   | 说明                         | 是否必传 | 是否 iview 参数 | 默认值 |
| ------ | ---------------------------- | -------- | --------------- | ------ |
| value  | 自动表单的值，可使用 v-model | 是       | 否              | {}     |
| fields | 请求后台数据的 url 地址      | 是       | 否              | ""     |
| row    | 一行显示几个数据             | 否       | 否              | 2      |
