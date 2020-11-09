<template>
  <div class="autoForm">
    <Form
      class="form"
      ref="autoForm"
      inline
      :labelWidth="labelWidth"
      :model="submitForm"
      v-bind="$attrs"
      v-on="$listeners"
      @on-validate="validated"
    >
      <template v-for="item in fields">
        <FormItem
          :label-width="!!item.props ? item.props.labelWidth : labelWidth"
          :style="itemStyle(item)"
          :label="item.label"
          :class="[`form-item-${item.type}`]"
          :key="item.key || null"
          :prop="prop(item)"
          :rules="validatorsHandler(item)"
          :ref="item.key"
          v-if="typeof item.show === 'undefined' ? true : item.show"
        >
          <AutoFormInner
            :item="item"
            ref="autoFormInner"
            v-model="submitForm"
          ></AutoFormInner>
        </FormItem>
      </template>
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
  data() {
    return {
      validateError: null
    };
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
      return item.key;
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
    },
    resetField(name) {
      this.$refs.autoForm.fields.forEach(item => {
        if (!name || item.prop === name) {
          item.resetField();
        }
      });
    },
    deleteUnnecessaryProp() {
      const submitFormKey = Object.keys(this.submitForm);
      submitFormKey.forEach(key => {
        const findProp = this.fields.find(field => {
          return field.key === key;
        });
        if (!findProp) {
          this.$delete(this.submitForm, key, null);
        }
      });
    },
    validate(fn) {
      return new Promise(async (resolve, reject) => {
        if (fn) {
          resolve(this.$refs.autoForm.validate(fn));
        } else {
          this.$refs.autoForm.validate(valid => {
            if (!valid) {
              const prop = this.validateError;
              const instance = this.$refs[prop][0];
              this.validateError = null;
              const { top } = instance.$el.getBoundingClientRect();
              if (instance.$children[0].$children[0].focus) {
                instance.$children[0].$children[0].focus();
                return false;
              }
              if (top > window.innerHeight) {
                window.scrollTo(0, (window.innerHeight - 30) / 2);
              }
            }
            resolve(valid);
          });
        }
      });
    },
    validated(prop, status, error) {
      if (!status && !this.validateError) {
        this.validateError = prop;
      }
      this.$emit("on-validate", prop, status, error);
    },
    validatorsHandler(item) {
      item.validators = item.validators ? item.validators : [];
      const validators = !Array.isArray(item.validators)
        ? [].push(item.validators)
        : item.validators;

      validators.forEach(valid => {
        if (valid.hasOwnProperty("validator")) {
          return valid.validator;
        } else {
          valid.message = valid.hasOwnProperty("message")
            ? valid.message
            : item.type === "input" || item.type === "inputnumber"
            ? `请输入${item.label}`
            : `请选择${item.label}`;
        }
      });

      return validators;
    },
    validateField(prop, callback) {
      this.$refs.autoForm.validateField(prop, callback);
    }
    // validateHandler(prop, status, error) {
    //   console.log(prop, status, error);
    // }
  },
  mounted() {
    console.log(this.$refs.autoForm);
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
