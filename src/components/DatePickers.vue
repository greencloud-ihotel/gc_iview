<script>
import { DatePicker, Form, FormItem } from "iview";
import moment from "moment";
import _ from "lodash";
export default {
  name: "DatePickers",
  props: {
    value: {
      type: Object,
      default() {
        return {
          startDate: moment().format("YYYY-MM-DD"),
          endDate: moment()
            .add(1, "d")
            .format("YYYY-MM-DD")
        };
      }
    },
    options: {
      type: Object,
      default() {
        return {
          startOptions: {
            disabledDate(date) {
              return date && date.valueOf() < Date.now() - 86400000;
            }
          }
        };
      }
    }
  },
  methods: {
    changeValue(type, value) {
      switch (type) {
        case "startChange":
          if (moment(value).isAfter(this.value.endDate)) {
            this.$set(
              this.value,
              "endDate",
              moment(value)
                .add(1, "day")
                .format("YYYY-MM-DD")
            );
          }
          break;
        case "endChange":
          if (moment(value).isBefore(this.value.startDate)) {
            let beforeToday = moment(value).subtract(1, "day");
            if (!beforeToday.isBefore(moment())) {
              this.$set(
                this.value,
                "startDate",
                beforeToday.format("YYYY-MM-DD")
              );
            } else {
              this.$set(this.value, "startDate", moment().format("YYYY-MM-DD"));
            }
          }
          break;
      }
      this.$emit("input", this.value);
    },
    validator(key, callback) {
      if (_.isEmpty(_.get(this.value, key))) {
        callback(new Error(`请输入${key ? "开始" : "结束"}时间`));
      } else {
        callback();
      }
    },
    validate(fn) {
      this.$refs["datePickersForm"].validate(fn);
    },
    resetFields() {
      this.$refs["datePickersForm"].resetFields();
    }
  },
  render() {
    const { options } = this.$props;
    return (
      <div class="container">
        {this.value ? (
          <Form class="datePickers" model={this.value} ref="datePickersForm">
            {options && options.startLabel ? (
              <span class="ml10">{options.startLabel}</span>
            ) : null}
            <FormItem
              prop="startDate"
              rules={{
                required: true,
                message: "开始时间不能为空",
                trigger: "blur,change"
              }}
            >
              <DatePicker
                show-week-numbers
                value={this.value.startDate}
                onInput={value => {
                  this.$set(
                    this.value,
                    "startDate",
                    value ? moment(value).format("YYYY-MM-DD") : ""
                  );
                  this.changeValue("startChange", value);
                }}
                type="date"
                options={this.options.startOptions}
              />
            </FormItem>
            {options && options.endLabel ? (
              <span class="ml10">{options.endLabel}</span>
            ) : null}
            <FormItem
              class="ml10"
              prop="endDate"
              rules={{
                required: true,
                message: "结束时间不能为空",
                trigger: "blur,change"
              }}
            >
              <DatePicker
                show-week-numbers
                value={this.value.endDate}
                onInput={value => {
                  this.$set(
                    this.value,
                    "endDate",
                    value ? moment(value).format("YYYY-MM-DD") : ""
                  );
                  this.changeValue("endChange", value);
                }}
                type="date"
                options={this.options.startOptions}
              />
            </FormItem>
          </Form>
        ) : null}
      </div>
    );
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  .ml10 {
    margin-left: 10px;
  }
  .datePickers {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
}
</style>
