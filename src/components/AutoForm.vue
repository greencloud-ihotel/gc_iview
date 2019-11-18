<template>
  <div class="autoForm">
    <Form class="form"
          ref="autoForm"
          inline
          :labelWidth="labelWidth"
          :model="submitForm"
          v-bind="$attrs"
          v-on="$listeners">
      <FormItem v-for="item in fields"
                :style="itemStyle(item)"
                :label="item.label"
                :key="item.key"
                :prop="prop(item)"
                :rules="validatorsHandler(item)">
        <AutoFormInner :item="item"
                       ref="autoFormInner"
                       v-model="submitForm"></AutoFormInner>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import _ from "lodash";
import AutoFormInner from "../components/AutoFormInner/AutoFormInner";
export default {
  name: "AutoForm",
  props: {
    value: {
      //表单导出源数据
      type: Object,
      default() {
        return {};
      },
      required: true
    },
    fields: {
      //表单数据配置项
      type: Array,
      required: true
    },
    row: {
      type: Number,
      default() {
        return 2;
      }
    }
  },
  components: {
    AutoFormInner
  },
  beforeMount() {
    const arr = this.value;
    _.map(this.fields, val => {
      if (typeof val.key !== "undefined") {
        if (_.isEmpty(_.get(arr, val.key))) {
          if (val.type === "inputnumber") {
            _.set(arr, val.key, 0);
          } else {
            _.set(arr, val.key, "");
          }
        }
      }
    });
    this.submitForm = arr;
  },
  watch: {
    fields(val, oldVal) {
      const arr = this.value;
      _.map(this.fields, val => {
        if (typeof val.key !== "undefined") {
          if (_.isEmpty(_.get(arr, val.key))) {
            if (val.type === "inputnumber") {
              _.set(arr, val.key, 0);
            } else {
              _.set(arr, val.key, "");
            }
          }
        }
      });
      this.submitForm = arr;
    }
  },
  computed: {
    labelWidth() {
      if (
        !_.has(this.$attrs, "labelWidth") &&
        !_.has(this.$attrs, "label-width")
      ) {
        return 70;
      }
      return (
        _.get(this.$attrs, "labelWidth") || _.get(this.$attrs, "label-width")
      );
    },
    submitForm: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    getItem(refs) {
      const item = this.$refs.autoFormInner.find(component => {
        return Object.keys(component.$refs)[0] === refs;
      });
      if (item) {
        return item.$refs[refs];
      } else {
        return {};
      }
    },
    prop(item) {
      if (typeof item.key !== "undefined") {
        if (_.has(this.submitForm, item.key)) {
          return item.key;
        } else {
          console.error(
            `modelKey:${item.key}存在多级key为空情况.请在model里面加入父节点`
          );
        }
      }
    },
    itemStyle(item) {
      const num = item.num ? item.num : 1;
      return { width: `${(100 * num) / this.row}%` };
    },

    reset(obj) {
      _.map(obj, (val, index) => {
        if (_.isString(val)) {
          this.$set(obj, index, "");
        } else {
          if (_.isObject(val) && !_.isEmpty(val)) {
            this.reset(val);
          }
        }
      });
      this.submitForm = _.assign({}, obj);
    },
    resetFields() {
      this.$refs.autoForm.resetFields();
      this.deleteUnnecessaryProp();
      //this.reset(this.submitForm);
    },
    deleteUnnecessaryProp() {
      const submitFormKey = Object.keys(this.submitForm);
      submitFormKey.forEach(key => {
        const findProp = this.fields.find(field => {
          return field.key === key;
        });
        if (!findProp) {
          delete this.submitForm[key];
        }
      });
    },
    validate(fn) {
      this.$refs.autoForm.validate(fn);
    },
    validatorsHandler(item) {
      item.validators = item.validators ? item.validators : [];
      const validators = !Array.isArray(item.validators)
        ? [].push(item.validators)
        : item.validators;

      validators.forEach(valid => {
        valid.message = valid.message
          ? valid.message
          : `${item.type === "input" ? "请输入" : "请选择"}${item.label}`;
      });

      return validators;
    }
  }
};
</script>

<style lang="less" scoped>
.autoForm {
  .form {
    display: flex;
    flex-wrap: wrap;
  }
  .ivu-form-inline .ivu-form-item {
    margin-right: 0;
  }
  /deep/ .ivu-date-picker {
    width: 100% !important;
  }
}
</style>
