<script>
import _ from "lodash";
export default {
  name: "AutoForm",
  model: {},
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
  },
  render() {
    return (
      <div class="autoForm">
        {JSON.stringify(this.value)}
        <Form
          model={this.submitForm}
          onInput={() => {}}
          class="form"
          labelWidth={70}
          attrs={this.$attrs}
          listeners={this.$listeners}
          inline
        >
          {_.map(this.fields, val => {
            const num = val.num ? val.num : 1;
            return (
              <FormItem
                model={this.submitForm}
                onInput={() => {}}
                key={val.key}
                prop={val.key}
                label={val.label}
                style={{ width: `${(100 * num) / this.row}%` }}
                rules={val.validators ? val.validators : {}}
              >
                <Input
                  type="text"
                  placeholder={val.placeholder}
                  value={_.get(this.value, val.key)}
                  onInput={inputVal => {
                    const newVal = _.set(this.submitForm, val.key, inputVal);
                    this.submitForm = _.assign({}, newVal);
                    this.$set(this.submitForm, val._key, newVal);
                  }}
                >
                  {val.icon ? (
                    <Icon type={val.icon} slot="prepend"></Icon>
                  ) : null}
                </Input>
              </FormItem>
            );
          })}
        </Form>
      </div>
    );
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
