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
        { name: "杭州", code: "hz", description: "aa", num: 100 },
        { name: "杭州", code: "huz", description: "bb", num: 300 }
      ],
      config: {
        // isEdit:true,
        autoSave: true,
        type: "new",
        columns: [
          {
            title: "年龄",
            keys: ["code", "description"], // 一个单元格中有两个字段
            type: "select", // 单元格中的'select'
            options: [
              // 如果是select,传对应的选项
              {
                code: "hz",
                description: "cc",
                label: "杭州"
              },
              {
                code: "huz",
                description: "bb",
                label: "湖州"
              },
              {
                code: "aa",
                description: "aa",
                label: "New York"
              }
            ]
          },
          {
            title: "年龄2", // 列表的列
            type: "input", // 默认可编辑的是input
            key: "name" // 对应到list的key值
          },
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
