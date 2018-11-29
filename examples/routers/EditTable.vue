<template>
  <div>
    {{list}}
    <EditTable v-bind="editTableConfig"
               :data.sync="list"></EditTable>
  </div>
</template>

<script>
export default {
  data() {
    // :columns="columnsTest"
    //            :isEdit="true"
    //            buttons="edit,delete"
    //            :data.sync="listTest"
    //            @check="check"
    //            type="new"></EditTable>
    return {
      list: [
        { name: "杭州", description: "湖州", modifyUser: 100 },
        { name: "杭州", description: "New York" }
      ],
      editTableConfig: {
        isEdit: false,
        // autoSave: true,
        // buttons: "edit,delete",
        columns: [
          {
            title: "年龄",
            keys: ["code", "description"],
            type: "select",
            cellClassName: {
              age: "demo-table-info-cell-age",
              address: "demo-table-info-cell-address"
            },
            options: [
              {
                description: "湖州",
                code: "abc",
                label: "杭州2"
              },
              {
                description: "New York3",
                code: "abc",
                label: "New Yo11111k3"
              }
            ]
          },
          { title: "年龄2", type: "input", key: "name" },
          {
            title: "操作",
            key: "action",
            buttons: ["查看", "Edit", "Delete"]
          }
        ]
      }
    };
  }
};
</script>

<style>
</style>
