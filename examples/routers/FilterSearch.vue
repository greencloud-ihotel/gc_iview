<template>
  <div>
    <div class="data top">{{ searchData }}</div>
    <filter-search
      :columns="searchColumns"
      v-model="searchData"
      hidebtnhide="true"
    ></filter-search>
    <div class="show">
      <Input v-model="showInputNum" />
      <Button @click="showInput" type="primary">把第N个显示出来</Button>
      <Input v-model="hideInputNum" />
      <Button @click="hideInput" type="primary">把第N个隐藏</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideInputNum: 0,
      showInputNum: 0,
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
              label: "类型2",
              key: "searchBarStas",
              num: 0
            },
            {
              label: "请输入代码或者描述",
              key: "conditionText"
            },
            {
              label: "类型",
              key: "searchBarStas"
            },
            {
              label: "类型3",
              key: "searchBarStas2",
              render: (h, val) => {
                console.log(val);
                return <div>{val.key}</div>;
              }
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
          preExplain: "aa",
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
  },
  methods: {
    hideInput() {
      console.log(this.hideInputNum);
      this.searchColumns[0].datas[this.hideInputNum].num = 0;
    },
    showInput() {
      this.searchColumns[0].datas[this.showInputNum].num = 1;
    }
  },
  mounted() {}
};
</script>

<style>
.top {
  padding-bottom: 30px;
}
.show {
  display: flex;
  width: 50%;
}
</style>
