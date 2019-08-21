<template>
  <div class="autoForm">
    {{ $attrs }}
    <Form
      class="form"
      ref="autoForm"
      inline
      :labelWidth="labelWidth"
      :model="submitForm"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <FormItem
        v-for="item in fields"
        :style="itemStyle(item)"
        :label="item.label"
        :key="item.key"
        :prop="prop(item)"
        :rules="item.validators"
      >
        <AutoFormInner :item="item" v-model="submitForm"></AutoFormInner>
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
      if (_.isEmpty(_.get(arr, val.key))) {
        _.set(arr, val.key, "");
      }
    });
    this.submitForm = arr;
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
    prop(item) {
      if (_.has(this.submitForm, item.key)) {
        return item.key;
      } else {
        console.error(
          `modelKey:${item.key}存在多级key为空情况.请在model里面加入父节点`
        );
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
      this.reset(this.submitForm);
    },
    validate(fn) {
      this.$refs.autoForm.validate(fn);
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
