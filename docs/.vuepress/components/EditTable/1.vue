<template>
  <div>
    <div class="data">{{ list }}</div>
    <edit-table v-bind="config" :data.sync="list"></edit-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: "杭州", description: "湖州", modifyUser: 100 },
        { name: "杭州", description: "New York" }
      ],
      config: {
        columns: [
          { title: "年龄2", type: "input", key: "name" },
          {
            title: "操作",
            key: "action"
          }
        ]
      }
    };
  }
};
</script>

<style></style>
