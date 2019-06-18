# FilterSearch

## 概述

主要用于列表页面搜索的刷选条件。

## 示例

1.基础用法:筛选框的基本使用方法。

---

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>筛选框的基本使用方法。</p>
</desc>
<template>
  <div>
    <div class="data top">{{searchData}}</div>
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
              key:"searchBarStas",
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
.top{
  padding-bottom:30px
}
</style>
```

---

2.使用 render

---

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>筛选框的基本使用方法。</p>
</desc>
<template>
  <div>
    <div class="data top">{{searchData}}</div>
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
              key: "conditionText",
              render:(h,params)=>{
                return h("Select",null,
                  [
                    h("Option",{props:{value:"ddd"}})
                  ]
                )
              }
            },
            {
              label: "类型",
              key:"searchBarStas",
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
                console.log("abc")
              }
            },
            {
              label: "重置",
              action: "reset"
            },
            {
              label: "新增",
              action: this.add
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
.top{
  padding-bottom:30px
}
</style>
```

---

## API

### props

| 属性        | 说明                                                                       | 是否必传 | 是否 iview 参数 |
| ----------- | -------------------------------------------------------------------------- | -------- | --------------- |
| columns     | 表格列的配置描述,详见上表 columns                                          | 是       | 否              |
| rowNum      | 一行显示内容个数，默认为 3,拉开后默认为 5 ,一行超过 3 个出现对应的隐藏按钮 | 否       |
| value       | 双向绑定到组件和外部的值                                                   | 否       |
| hideBtnHide | 是否隐藏掉显示隐藏按钮                                                     | 否       |

### columns 表

| 属性 | 说明                                                               | 是否必传 | 默认值 |
| ---- | ------------------------------------------------------------------ | -------- | ------ |
| type | 这行的类型,inputs 为普通输入框,checkboxs 为筛选框,buttons 为按钮组 | 否       | inputs |

### checkboxs类型

| ---- | ------------------------------------------------------------------ | -------- | ------ |
| preExplain |  | 前缀文字   | 筛选条件 |

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
