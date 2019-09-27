<template>
  <div>
    <i-switch v-model="switchValue"
              :disabled="disabled"
              @input="change">
      <span slot="open">开</span>
      <span slot="close">关</span>
    </i-switch>
  </div>
</template>

<script>
const SWITCH_ERROR = "switch-error";
const SWITCH_SUCCESS = "switch-success";
export default {
  name: "TFSwitch",
  data() {
    return {
      switchValue: this.value === this.open ? true : false
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    open: {
      type: String,
      default: "F"
    },
    close: {
      type: String,
      default: "T"
    },
    propName: {
      type: String,
      default: "isHalt"
    },
    value: {
      type: String,
      default: ""
    },
    row: {
      type: Object,
      default: () => {
        return {};
      }
    },
    updateUrl: {
      type: String,
      default: ""
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
  methods: {
    async change(value) {
      const OPEN = this.open;
      const CLOSE = this.close;
      const key = this.propName;
      if (this.updateUrl === "") {
        // this.switchValue = !this.switchValue;
        this.row[key] = this.row[key] === CLOSE ? CLOSE : OPEN;
      } else {
        this.row[key] = value ? OPEN : CLOSE;
        this.row.updateIsHaltOnly = CLOSE;

        this.$http[this.method](this.updateUrl, this.row).then(resData => {
          if (resData.data.result !== 0) {
            //this.switchValue = !this.switchValue;
            this.row[key] = this.row[key] === CLOSE ? CLOSE : OPEN;
            this.$emit("input", this.row[key] === CLOSE ? CLOSE : OPEN);
            this.$emit(SWITCH_ERROR, this.row[key]);
          } else {
            this.row[key] = this.row[key] === OPEN ? CLOSE : OPEN;
            this.$emit("input", this.row[key] === OPEN ? CLOSE : OPEN);
            this.$Message.success(resData.data.msg);
            this.$emit(SWITCH_SUCCESS, this.row[key]);
          }
        });
      }
    }
  },
  watch: {
    value(val) {
      const OPEN = this.open;

      this.switchValue = val === OPEN ? true : false;
      this.$emit("input", val);
    }
  }
  // mounted() {
  //   const OPEN = this.open;
  //   const key = this.propName;
  //   this.switchValue = !!this.row && this.row[key] === OPEN;
  // }
};
</script>

<style lang="less" scoped>
.ivu-switch-checked {
  border-color: #87d067;
  background-color: #87d067;
}
</style>
