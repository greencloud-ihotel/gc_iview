# AutoTable

## 概述

主要用于展示大量结构化数据。扩展自 [iview Table](https://www.iviewui.com/components/table) 可直接使用 Table 的所有 props 和 mehods。

## 示例

1. 1.基础用法:自动表格的基本使用方法。
----

```javascript
/*vue*/
<template>
  <div>
    <auto-table v-bind="autoTableConfig"></auto-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoTableConfig: {
        columns: [
          { title: "标识", key: "id" },
          { title: "姓名", key: "username" },
          { title: "性别", key: "sex" },
          {
            title: "操作",
            key: "action",
            width: 160,
            align: "center",
            buttons: ["修改"]
          }
        ],
        url: "https://yapi.ihotel.cn/mock/60/AutoTable_1",
        path: "datas",

      }
    };
  }
};
</script>

<style>
</style>
```

----
2. 2.和 filterSearch 相结合的用法:AutoTable 和 filterSearch 相结合。
----

```javascript
/*vue*/
<template>
  <div>
    <auto-table v-bind="autoTableConfig">
      <Row slot="header"
           :gutter="10">
        <filter-search :columns="searchColumns"
                      v-model="searchData"></filter-search>
      </Row>
    </auto-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoTableConfig: {
        columns: [
          { title: "标识", key: "id" },
          { title: "姓名", key: "username" },
          { title: "性别", key: "sex" },
          {
          title: "操作",
          key: "action",
          width: 160,
          align: "center",
          buttons: ["修改"]
        }
        ],
        url: "https://yapi.ihotel.cn/mock/60/AutoTable_1",
        path: "datas",
      },
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
                return h("i-select",{
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

### solt

| 属性   | 说明             |                                  |     |
| ------ | ---------------- | -------------------------------- | --- |
| header | 自动表格头部插槽 | 头部插槽，一般用于表格的筛选条件 |     |

### props

| 属性        | 说明                              | 是否必传 | 是否 iview 参数                                              |
| ----------- | --------------------------------- | -------- | ------------------------------------------------------------ |
| columns     | 表格列的配置描述                  | 是       | 是 [API](https://www.iviewui.com/components/table#API)       |
| url         | 请求后台数据的 url 地址           | 是       |
| path        | 后台回传的接口中的数据的路径      | 否       |
| hidePage    | 是否隐藏分页条                    | 否       |
| initData    | 自定义传入数据,一般用于第一次搜索 | 否       |
| pageSize    | 定义每页条数                      | 否       |                                                              |
| refuseFetch | 拒绝自动获取,第一次不搜索         | 否       |
| transfer    | 分页页数下拉框放置位置            | 否       | 是 [API](https://www.iviewui.com/components/page#Page_props) |
| showSize    | 显示分页，用来改变 page-size      | 否       | 是 [API](https://www.iviewui.com/components/page#Page_props) |
