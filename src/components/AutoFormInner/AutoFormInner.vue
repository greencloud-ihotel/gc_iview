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
      const value =
        val.type === "input"
          ? typeof inputVal === "object"
            ? inputVal.target.value
            : inputVal
          : inputVal;
      const newVal = _.set(this.submitForm, val.key, value);
      this.submitForm = _.assign({}, newVal);
    }
  },
  created() {
    const event = this.item.on;

    if (typeof event !== "undefined" && "on-change" in event) {
      const bindOnChange = event["on-change"].bind();
      event["on-change"] = value => {
        this.changeVal(value, this.item);
        bindOnChange.call(this, value);
      };
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
                      {...{ props: val.props ? val.props : {} }}
                      placeholder={val.placeholder}
                      value={_.get(this.submitForm, val.key)}
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
                      {...{ props: val.props ? val.props : {} }}
                      placeholder={val.placeholder}
                      value={_.get(this.submitForm, val.key) || 0}
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
                      placeholder={val.placeholder}
                      {...{ props: val.props ? val.props : {} }}
                      value={_.get(this.submitForm, val.key)}
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
                            value={
                              value[
                                val.option
                                  ? val.option.code
                                    ? val.option.code
                                    : "value"
                                  : "value"
                              ]
                            }
                          >
                            {
                              value[
                                val.option
                                  ? val.option.label
                                    ? val.option.label
                                    : "label"
                                  : "label"
                              ]
                            }
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
                      {...{ props: val.props ? val.props : {} }}
                      placeholder={val.placeholder}
                      value={_.get(this.submitForm, val.key)}
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
                      {...{ props: val.props ? val.props : {} }}
                      placeholder={val.placeholder}
                      value={_.get(this.submitForm, val.key)}
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
