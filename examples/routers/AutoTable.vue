<template>
  <div>
    <span>autoTableConfig:{{autoTableConfig}}</span>
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
        url: "/api/user/list",
        path: "datas"
      }
    };
  }
};
</script>

<style>
</style>
