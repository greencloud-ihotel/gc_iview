<template>
  <div class="autoForm">
    value:{{ this.value }}
    <div>submitForm: {{ this.submitForm }}</div>
    <Form
      :labelWidth="70"
      :model="submitForm"
      class="form"
      attrs="$attrs"
      listeners="$listeners"
      inline
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
  data() {
    return {
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        name2: [
          {
            required: true,
            message: "The name2 cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
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
  computed: {
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
        console.log(item);
        console.error(`not found ${item.key}`);
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
      setTimeout(() => {
        this.submitForm = _.assign({}, obj);
      }, 0);
    },
    resetFields() {
      this.reset(this.submitForm);
    },
    validate() {
      console.log("====================================");
      console.log("validate");
      console.log("====================================");
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
}
</style>
