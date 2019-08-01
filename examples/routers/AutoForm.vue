<template>
  <div class="contain">
    router:{{ autoForm.submitForm }}
    <AutoForm
      ref="form"
      v-model="autoForm.submitForm"
      :fields="autoForm.fields"
      :row="2"
    ></AutoForm>
    <Button @click="handleSubmit">保存</Button>
    <Button @click="handleReset">复位</Button>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        callback();
      }
    };
    return {
      autoForm: {
        submitForm: {
          name: "111",
          name2: "aaa",
          name3: "aaa",
          gg: "bbb",
          a3: {
            dd: "dddzzz"
          }
        },
        fields: [
          {
            key: "gg",
            label: "gg",
            type: "datepicker",
            validators: [{ required: true, trigger: "blur" }]
          },
          {
            key: "name3",
            label: "name3",
            type: "input",
            render: val => {
              return (
                <i-input
                  value={_.get(this.autoForm.submitForm, val.key)}
                  onInput={value => {
                    console.log(val);
                    const newVal = _.set(
                      this.autoForm.submitForm,
                      val.key,
                      value
                    );
                    this.autoForm.submitForm = _.assign({}, newVal);
                  }}
                ></i-input>
              );
            },
            validators: [{ required: true, trigger: "blur" }]
          },
          {
            key: "datepickers",
            num: 2,
            label: "开始时间",
            render: () => {
              return (
                <DatePickers options={{ endLabel: "结束时间" }}></DatePickers>
              );
            }
          },
          {
            key: "name",
            type: "input",
            icon: "ios-person-outline",
            label: "审批人",
            num: 1,
            validators: [
              { required: true, trigger: "blur" },
              { type: "email", trigger: "blur" }
            ]
          },
          {
            key: "a2.dd",
            type: "input",
            label: "a2.dd",
            validators: [{ required: true, message: "必填a2.dd" }]
          },
          {
            key: "a3.cc",
            type: "input",
            label: "a3.cc",
            validators: [{ required: true, message: "必填a3.cc" }]
          },
          {
            key: "name2",
            type: "select",
            label: "name2:",
            validators: [{ validator: validatePass, trigger: "blur" }],
            options: [
              {
                label: "dddd",
                value: "aaa"
              },
              {
                label: "2d22",
                value: "aaddda"
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset() {
      this.$refs["form"].resetFields();
    }
  }
};
</script>

<style>
.contain {
  width: 50%;
}
</style>
