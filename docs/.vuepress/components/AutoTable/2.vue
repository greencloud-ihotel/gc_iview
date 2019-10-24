<template>
  <div>
    <auto-table v-bind="autoTableConfig">
      <Row slot="header">
        <filter-search :columns="searchColumns" v-model="searchData">
        </filter-search>
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
        path: "datas"
      },
      searchData: {
        conditionText: "",
        searchBarStas: "",
        category: "",
        default: {
          listProduct: [
            {
              code: "New York",
              descript: "New York"
            }
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
                return h("i-select", {
                  props: {}
                });
              }
            }
          ],
          type: "inputs"
        },
        {
          datas: [
            { label: "已上线", key: "A", value: "b" },
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
      ]
    };
  }
};
</script>

<style></style>
