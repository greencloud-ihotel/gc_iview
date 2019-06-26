<template>
  <div>
    <Row>
      <i-Col span="6">
        <filter-list @chooseItem="getCode"
                     code="value"
                     label="descript"
                     :list="list"></filter-list>
      </i-Col>
      <i-Col span="18">
        <div>
          {{getData}}
        </div>
      </i-Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          value: "aaa",
          descript: "AAA",
          code: "1111"
        },
        {
          value: "bbb",
          descript: "BBB",
          code: "2222"
        },
        {
          value: "ccc",
          descript: "CCC",
          code: "3333"
        },
        {
          value: "ddd",
          descript: "DDD",
          code: "4444"
        },
        {
          value: "eee",
          descript: "EEE",
          code: "5555"
        },
        {
          value: "fff",
          descript: "FFF",
          code: "6666"
        }
      ],
      getData: []
    };
  },
  methods: {
    getCode() {
      console.log(...arguments);
      this.getData = JSON.stringify(arguments);
    }
  }
};
</script>

<style scoped>
</style>