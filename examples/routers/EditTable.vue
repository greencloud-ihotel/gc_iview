<template>
  <div>
    {{ list }}
    <EditTable v-bind="editTableConfig" :data.sync="list"></EditTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: "杭州", description: "湖州", modifyUser: 100 },
        { name: "杭州", description: "New York" },
        { name: "杭州3", description: "New York", num: 1 }
      ],
      editTableConfig: {
        isEdit: false,
        autoSave: true,
        columns: [
          {
            title: "年龄",
            keys: ["code", "description"],
            type: "select",
            options: [
              {
                code: "hz",
                label: "杭州"
              },
              {
                code: "huz",
                label: "湖州"
              }
            ]
          },
          { title: "年龄2", type: "input", key: "name" },
          {
            title: "年龄3",
            type: "number",
            key: "num",
            props: { precision: 2 }
          },
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
