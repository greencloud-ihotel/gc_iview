# FilterSearch

## 概述

主要用于列表页面搜索的刷选条件。

## 示例

<demo-block title='1. 基础用法' desc='筛选框的基本使用方法。'>

  <div slot='demo'><FilterSearch-1></FilterSearch-1></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/FilterSearch/1.vue

  </div>
</demo-block>

<demo-block title='2. 使用 render'>

  <div slot='demo'><FilterSearch-2></FilterSearch-2></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/FilterSearch/2.vue

  </div>
</demo-block>

## API

### props

| 属性        | 说明                                                                       | 是否必传 | 是否 iview 参数 |
| ----------- | -------------------------------------------------------------------------- | -------- | --------------- |
| columns     | 表格列的配置描述,详见上表 columns                                          | 是       | 否              |
| rowNumProp  | 一行显示内容个数，默认为 3,拉开后默认为 5 ,一行超过 3 个出现对应的隐藏按钮 | 否       |
| value       | 双向绑定到组件和外部的值                                                   | 否       |
| hideBtnHide | 是否隐藏掉显示隐藏按钮                                                     | 否       |

### columns 表

| 属性       | 说明                                                               | 是否必传 | 默认值 |
| ---------- | ------------------------------------------------------------------ | -------- | ------ |
| type       | 这行的类型,inputs 为普通输入框,checkboxs 为筛选框,buttons 为按钮组 | 否       | inputs |
| directives | vue 的指令                                                         | 否       | []     |

### checkboxs 类型

| 属性       | 说明            | 是否必传 | 默认值    |
| ---------- | --------------- | -------- | --------- |
| preExplain | checkbox 的前缀 | 否       | 筛选条件: |

### columns 表示例

```javascript
[
  {
    datas: [
      {
        label: "请输入代码或者描述",
        key: "conditionText" //绑定到value的key
      }
    ],
    type: "inputs" //input类型的集合
  },
  {
    datas: [
      {
        label: "苹果",
        key: "apple"
      }
    ],
    type: "checkbox" //下面筛选框类型的集合
  },
  {
    datas: [
      {
        label: "查询",
        action: this.search //使用自己的方法
      },
      {
        label: "重置",
        action: "reset" //重置整个查询框
      }
    ],
    type: "buttons" //按钮类型的集合
  }
];
```
