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
        path: "datas"
      }
    };
  }
};
</script>

<style></style>
