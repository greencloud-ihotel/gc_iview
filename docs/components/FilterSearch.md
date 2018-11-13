# FilterSearch

## 概述

主要用于列表页面搜索的刷选条件。

1. 基础用法:自动表格的基本使用方法。里面包含了 input，select，checkbox，buttons 的内容。

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
                // 在项目中使用jsx 的方式，文档中只做对应的展示
                // return (
                //   <i-select
                //     filterable
                //     placeholder={placeholder}
                //     transfer={true}
                //     // loading="grops.loading}
                //     value={this.searchBar.val.category}
                //     //onOn-open-change={this.openIf}
                //     onInput={value => {
                //       this.searchBar.val.category = value;
                //     }}
                //     clearable
                //   >
                //     {this.searchBar.default.listProduct.map(val => {
                //       return (
                //         <i-option value={val.code} key={val.code}>
                //           {val.descript}
                //         </i-option>
                //       );
                //     })}
                //   </i-select>
                // );
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

| 属性        | 说明                                                                                                                            | 是否必传 | 是否 iview 参数 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| columns     | 表格列的配置描述, columns 数据格式经过改造。数据格式见下面的例子，type 可以是 input（包含 jsx 书写的 select），checkbox，button | 是       | 否              |
| rowNumProp  | 一行显示内容个数，默认为 3 ，一行超过 3 个出现对应的隐藏按钮                                                                    | 否       |
| value       | 绑定值，这边 columns 的 keys 要和 value 里面的内容对应起来                                                                      | 否       |
| hideBtnHide | 是否隐藏隐藏按钮                                                                                                                | 否       |

### columns 数据核实变化

```javascript
[
  {
    datas: [
      {
        label: "请输入代码或者描述",
        key: "conditionText"
      }
    ],
    type: "inputs"
  }
];
```
