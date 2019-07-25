<script>
import _ from "lodash";
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
  render() {
    return (
      <div class="autoForm">
        {this.submitForm.name}
        <Form
          model={this.submitForm}
          onInput={() => {}}
          class="form"
          // rules={rules}
          labelWidth={70}
          attrs={this.$attrs}
          inline
        >
          {_.map(this.fields, val => {
            const num = val.num ? val.num : 1;
            return (
              <FormItem
                key={val.key}
                prop={val.key}
                label={val.label}
                style={{ width: `${(100 * num) / this.row}%` }}
                rules={val.validators ? val.validators : {}}
              >
                {val.key}
                <Input
                  type="text"
                  placeholder={val.placeholder}
                  value={this.value[val.key]}
                  onInput={inputVal => {
                    const newVal = _.set(this.submitForm, val.key, inputVal);
                    this.submitForm = _.assign({}, newVal);
                  }}
                >
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
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
