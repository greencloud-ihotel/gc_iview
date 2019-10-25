<template>
  <div class="contanier">
    <auto-table v-bind="autoTableConfig"></auto-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoTableConfig: {
        columns: [
          { title: "用户id", key: "id" },
          {
            title: "姓名",
            key: "username"
          },
          {
            title: "启用",
            key: "username",
            render: (h, params) => {
              return h("TFSwitch", {
                props: {
                  row: params.row,
                  url: "https://yapi.ihotel.cn/mock/60/updateTable"
                }
              });
              // use jsx
              // return (<TFSwitch row={params.row}></TFSwitch>)
            }
          }
        ],
        url: "https://yapi.ihotel.cn/mock/60/AutoTable_1",
        path: "datas"
      }
    };
  }
};
</script>
