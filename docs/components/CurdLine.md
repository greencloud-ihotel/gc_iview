# CurdLine

## 概述

类似表格一样的一行一条元素,具有新增、删除、修改功能

## 示例

新增行用于新增一行的数据内容。

<demo-block title='1. 基础用法' desc='新增行的基本使用方法。'>
  <div slot='demo'><CurdLine-1></CurdLine-1></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/CurdLine/1.vue

  </div>
</demo-block>
## API

### props

| 属性    | 说明                                                 | 是否必传 | 是否 iview 参数 |
| ------- | ---------------------------------------------------- | -------- | --------------- |
| columns | 一行的定义,key 为同步到外部的 key,label 为描述       | 是       | 否              |
| value   | v-model 传入的数据，键值和 columns 中的 key 值想对应 | 是       | 否              |
