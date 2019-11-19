<template>
  <div>
    <custom-table :columns="columns"
                  ref="customTable"
                  :newModel='true'
                  v-model="data"></custom-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "姓名",

          type: "input",
          key: "name",
          align: "center",
          props: {}
        },
        {
          title: "性别",

          type: "select",
          key: "sex",
          align: "center",
          options: [
            {
              descript: "男",
              code: "1"
            },
            {
              descript: "女",
              code: "2"
            }
          ],
          code: "code",
          descript: "descript",
          props: {}
        },

        {
          title: "操作",
          align: "left",
          width: 120,
          key: "action"
        }
      ],
      data: []
    };
  }
};
</script>

<style lang="less" scoped>
</style>