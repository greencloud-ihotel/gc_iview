<template>
  <AutoTable></AutoTable>
</template>

<script>
export default {
  data() {
    return {
      autoTableConfig: {
        columns: [
          { title: "username", key: "username" },
          { title: "id", key: "id" }
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
