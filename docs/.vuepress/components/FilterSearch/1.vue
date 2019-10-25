<template>
  <div>
    <div class="data top">{{ searchData }}</div>
    <filter-search
      :columns="searchColumns"
      :hideBtnHide="true"
      v-model="searchData"
    ></filter-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
              key: "searchBarStas"
            }
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
      ]
    };
  }
};
</script>

<style>
.top {
  padding-bottom: 30px;
}
</style>
