<template>
  <div>

    <div class="data">{{curdLineData}}</div>
    <curd-line :columns="curdLineColumn"
               v-model="curdLineData"></curd-line>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curdLineData: [
        {
          countCode: "a",
          b: "b1",
          c: 3,
          d: "",
          test: "test"
        },
        { countCode: "a2", b: "b2" }
      ],
      curdLineColumn: [
        {
          label: "描述1",
          key: "countCode"
        },
        {
          label: "描述2",
          key: "b"
        },
        {
          label: "描述3",
          key: "c"
        },
        {
          label: "描述4",
          key: "d"
        },
        {
          label: "描述5",
          key: "test",
          render: h => {
            return h("span", null, "ddd");
          }
        }
      ]
    };
  }
};
</script>

<style>
</style>
