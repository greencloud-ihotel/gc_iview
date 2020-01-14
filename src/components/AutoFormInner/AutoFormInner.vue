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
      let value = "";
      if (val.type === "input" && typeof inputVal === "object") {
        value = inputVal.target.value;
      } else if (val.type === "select") {
        // 多选
        if (Array.isArray(inputVal) && val.props.labelInValue) {
          value = inputVal.map(item => item.value);
        } else if (typeof inputVal === "object") {
          value = inputVal.value;
        } else {
          value = inputVal;
        }
      } else {
        value = inputVal;
      }
      this.$set(this, "submitForm", { ...this.submitForm, [val.key]: value });
    }
  },
  created() {
    const event = this.item.on;
    if (typeof event !== "undefined" && "on-change" in event) {
      const bindOnChange = event["on-change"].bind(this);
      event["on-change"] = value => {
        this.changeVal(value, this.item);
        bindOnChange.call(this, value);
      };
    }
    if (typeof this.item["props"] === "undefined") {
      this.$set(this.item, "props", {});
    }
    if (typeof this.item["on"] === "undefined") {
      this.$set(this.item, "on", {});
    }
    if (typeof this.item["options"] === "undefined") {
      this.$set(this.item, "options", []);
    }
    if (typeof this.item["option"] === "undefined") {
      this.$set(this.item, "option", {});
    }
  },
  render() {
    const val = this.item;

    const event = val.on;

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
                      ref={val.ref}
                      {...{
                        props: {
                          ...val.props,
                          placeholder:
                            val.props.placeholder || `请输入${val.label}`
                        }
                      }}
                      value={this.submitForm[val.key]}
                      on={{
                        "on-change": value => {
                          this.changeVal(value, val);
                        },
                        ...event
                      }}
                    >
                      {val.icon ? (
                        <Icon type={val.icon} slot="prepend" />
                      ) : null}
                    </Input>
                  );
                case "inputnumber":
                  return (
                    <InputNumber
                      ref={val.ref}
                      {...{
                        props: {
                          ...val.props,
                          placeholder:
                            val.props.placeholder || `请输入${val.label}`
                        }
                      }}
                      value={this.submitForm[val.key] || 0}
                      on={{
                        "on-change": value => {
                          this.changeVal(value, val);
                        },
                        ...event
                      }}
                    >
                      {val.icon ? (
                        <Icon type={val.icon} slot="prepend" />
                      ) : null}
                    </InputNumber>
                  );
                case "select":
                  return (
                    <i-select
                      ref={val.ref}
                      {...{
                        props: {
                          ...val.props,
                          placeholder:
                            val.props.placeholder || `请选择${val.label}`
                        }
                      }}
                      value={this.submitForm[val.key]}
                      on={{
                        "on-change": value => {
                          this.changeVal(value, val);
                        },
                        ...event
                      }}
                    >
                      {_.map(val.options, value => {
                        return (
                          <i-option
                            key={value[val.option.code || "value"]}
                            value={value[val.option.code || "value"]}
                          >
                            {value[val.option.label || "label"]}
                            {val.props.labelInValue
                              ? `( ${value[val.option.code || "value"]})`
                              : null}
                          </i-option>
                        );
                      })}
                    </i-select>
                  );
                case "datepicker":
                  return (
                    <DatePicker
                      ref={val.ref}
                      type="date"
                      {...{
                        props: {
                          ...val.props,
                          placeholder:
                            val.props.placeholder || `请选择${val.label}`
                        }
                      }}
                      value={this.submitForm[val.key]}
                      onOn-change={value => {
                        this.changeVal(value, val);
                      }}
                    />
                  );
                default:
                  return (
                    <Input
                      ref={val.ref}
                      type="text"
                      {...{
                        props: {
                          ...val.props,
                          placeholder:
                            val.props.placeholder || `请输入${val.label}`
                        }
                      }}
                      value={this.submitForm[val.key]}
                      onInput={value => {
                        this.changeVal(value, val);
                      }}
                    >
                      {val.icon ? (
                        <Icon type={val.icon} slot="prepend" />
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
