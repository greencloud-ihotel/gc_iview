<template>
  <div>
    <span>autoTableConfig:{{ autoTableConfig }}</span>
    <AutoTable v-bind="autoTableConfig"></AutoTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoTableConfig: {
        columns: [
          { title: "id", key: "id" },
          { title: "username", key: "username" }
        ],
        url: "https://yapi.ihotel.cn/mock/60/AutoTable_1",
        path: "datas"
      }
    };
  }
};
</script>

<style></style>
