# FilterSearch

## 概述

主要用于列表页面搜索的刷选条件。

## 示例

1. 1.基础用法:自动表格的基本使用方法。里面包含了 input，select，checkbox，buttons 的内容。
----

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>自动表格的基本使用方法。</p>
</desc>
<template>
  <div>
    <filter-search :columns="searchColumns"  v-model='searchData' hideBtnHide="true"></filter-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData:{
          conditionText:'',
          searchBarStas:'',
          category:'',
          default:{
              listProduct:[
                   {
                        code: 'New York',
                        descript: 'New York'
                    },
              ]
          }
      },
      searchColumns: [
          {
          datas: [
              {
              label: "请输入代码或者描述",
              key: "conditionText"
            },
            {
              label: "类型",
              render: h => {
                const placeholder = "类型";
                return h("Select",{
                   props: {}
                })
              }
            },
          ],
          type: "inputs"
          },
          {
          datas: [
            { label: "全选", key: "", value: "" },
            { label: "待上线", key: "R", value: "R" },
            { label: "有效", key: "I", value: "I" },
            { label: "无效", key: "X", value: "X" }
          ],
          key: "searchBarStas", //传入节点值 不传扩展到根对象
          type: "checkboxs"
        },
        {
          datas: [
            {
              label: "查询",
              action: () => {
                //this.postTableData(1);
              }
            },
            {
              label: "重置",
              action: "reset"
            },
            {
              label: "新增",
              action: () => {
                //this.addAction();
              }
            }
          ],
          type: "buttons"
        }
      ],
    };
  }
};
</script>

<style>
</style>
```

## API

### props

| 属性        | 说明                                                         | 是否必传 | 是否 iview 参数 |
| ----------- | ------------------------------------------------------------ | -------- | --------------- |
| columns     | 表格列的配置描述,详下下表 columns                            | 是       | 否              |
| rowNum      | 一行显示内容个数，默认为 3 ，一行超过 3 个出现对应的隐藏按钮 | 否       |
| value       | 双向绑定到组件和外部的值                                     | 否       |
| hideBtnHide | 是否隐藏掉显示隐藏按钮                                       | 否       |

### columns表

| 属性 | 说明                                                            | 是否必传 | 默认值 |
| ---- | --------------------------------------------------------------- | -------- | ------ |
| type | 这行的类型,inputs为普通输入框,checkboxs为筛选框,buttons为按钮组 | 否       | inputs |

### columns 数据示例

```javascript
[
  {
    datas: [
      {
        label: "请输入代码或者描述",
        key: "conditionText"      //绑定到value的key
      }
    ],
    type: "inputs"
  },
  {
    datas: [
      {
        label: "苹果",
        key: "apple"
      }
    ],
    type: "checkbox"
  },
  {
    datas: [
      {
        label: "查询",
        action:this.search
      }
    ],
    type: "buttons"
  }
];
```
