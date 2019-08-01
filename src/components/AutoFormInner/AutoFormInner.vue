<script>
import _ from "lodash";
export default {
  props: {
    value: {
      required: true
    },
    item: {
      required: true
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
    changeVal(inputVal, val) {
      console.log("====================================");
      console.log(val);
      console.log("====================================");
      const newVal = _.set(this.submitForm, val.key, inputVal);
      this.submitForm = _.assign({}, newVal);
    }
  },
  render() {
    const val = this.item;
    return (
      <div>
        {val.render
          ? val.render(val)
          : (() => {
              switch (val.type) {
                case "input":
                  return (
                    <Input
                      type="text"
                      placeholder={val.placeholder}
                      value={_.get(this.submitForm, val.key)}
                      onInput={value => {
                        this.changeVal(value, val);
                      }}
                    >
                      {val.icon ? (
                        <Icon type={val.icon} slot="prepend"></Icon>
                      ) : null}
                    </Input>
                  );
                case "select":
                  return (
                    <i-select
                      placeholder={val.placeholder}
                      value={_.get(this.submitForm, val.key)}
                      onInput={value => {
                        this.changeVal(value, val);
                      }}
                    >
                      {_.map(val.options, val => {
                        return (
                          <i-option value={val.value}>{val.label}</i-option>
                        );
                      })}
                    </i-select>
                  );
                case "datepicker":
                  return (
                    <DatePicker
                      type="date"
                      placeholder={val.placeholder}
                      value={_.get(this.submitForm, val.key)}
                      onOn-change={value => {
                        console.log("====================================");
                        console.log(value);
                        console.log("====================================");
                        this.changeVal(value, val);
                      }}
                    ></DatePicker>
                  );
                default:
                  return (
                    <Input
                      type="text"
                      placeholder={val.placeholder}
                      value={_.get(this.submitForm, val.key)}
                      onInput={value => {
                        this.changeVal(value, val);
                      }}
                    >
                      {val.icon ? (
                        <Icon type={val.icon} slot="prepend"></Icon>
                      ) : null}
                    </Input>
                  );
              }
            })()}
      </div>
    );
  }
};
</script>
