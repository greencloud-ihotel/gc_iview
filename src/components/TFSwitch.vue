<template>
  <div>
    <i-switch v-model='switchValue'
              @input='change'>
      <span slot="open">开</span>
      <span slot="close">关</span>
    </i-switch>
  </div>
</template>

<script>
export default {
  name: "TFSwitch",
  data() {
    return {
      switchValue: true
    };
  },
  props: {
    row: Object,
    url: String
  },
  created() {
    this.switchValue = !!this.row && this.row["isHalt"] == "F";
  },
  methods: {
    async change(value) {
      this.row.isHalt = value ? "F" : "T";
      this.row.updateIsHaltOnly = "T";
      this.$http.put(this.url, this.row).then(resData => {
        if (resData.data.result !== 0) {
          this.switchValue = !this.switchValue;
          this.row.isHalt = this.row.isHalt == "T" ? "T" : "F";
          // this.$Message.error(resData.data.msg);
          this.$emit("switch-error", this.row.isHalt);
        } else {
          this.row.isHalt = this.row.isHalt == "F" ? "T" : "F";
          this.$Message.success(resData.data.msg);
          this.$emit("switch-success", this.row.isHalt);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-switch-checked {
  border-color: #87d067;
  background-color: #87d067;
}
</style>
