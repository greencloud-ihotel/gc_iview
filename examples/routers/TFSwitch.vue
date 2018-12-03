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
          { title: "id", key: "id" },
          {
            title: "username",
            key: "username"
          },
          {
            title: "action",
            key: "username",
            render: (h, params) => {
              console.log(params);
              return h("TFSwitch", {
                props: {
                  row: params.row,
                  url: "https://yapi.ihotel.cn/mock/60/updateTable"
                }
              });
            }
          }
        ],
        url: "https://yapi.ihotel.cn/mock/60/AutoTable_1_1543806022409",
        path: "datas"
      }
    };
  }
};
</script>

