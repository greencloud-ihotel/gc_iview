<template>
  <div>
    <i-switch v-model='switchValue'
              :disabled="disabled"
              @input='change'>
      <span slot="open">开</span>
      <span slot="close">关</span>
    </i-switch>
  </div>
</template>

<script>
const OPEN = "F";
const CLOSE = "T";
const SWITCH_ERROR = "switch-error";
const SWITCH_SUCCESS = "switch-success";
export default {
  name: "TFSwitch",
  data() {
    return {
      switchValue: true,
      disabled: false
    };
  },
  props: {
    row: {
      type: Object,
      default: () => {
        return {};
      }
    },
    updateUrl: {
      type: String,
      default: "",
      required: true
    },
    method: {
      type: String,
      default: "put",
      validator: val => {
        const valid = ["get", "post", "delete", "put"];
        return valid.indexOf(val.toLocaleLowerCase()) > -1;
      }
    }
  },
  created() {
    if (this.updateUrl == "") {
      this.disabled = true;
      return false;
    }
  },
  methods: {
    async change(value) {
      this.row.isHalt = value ? OPEN : CLOSE;
      this.row.updateIsHaltOnly = CLOSE;

      this.$http[this.method](this.updateUrl, this.row).then(resData => {
        if (resData.data.result !== 0) {
          this.switchValue = !this.switchValue;
          this.row.isHalt = this.row.isHalt == CLOSE ? CLOSE : OPEN;
          this.$emit(SWITCH_ERROR, this.row.isHalt);
        } else {
          this.row.isHalt = this.row.isHalt == OPEN ? CLOSE : OPEN;
          this.$Message.success(resData.data.msg);
          this.$emit(SWITCH_SUCCESS, this.row.isHalt);
        }
      });
    }
  },
  mounted() {
    this.switchValue = !!this.row && this.row["isHalt"] == OPEN;
  }
};
</script>

<style lang="less" scoped>
.ivu-switch-checked {
  border-color: #87d067;
  background-color: #87d067;
}
</style>
