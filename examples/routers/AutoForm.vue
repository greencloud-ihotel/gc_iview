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
          name: "111@qq.com",
          name2: "aaa",
          name3: "aaa",
          gg: "2019-12-22",
          a3: {
            dd: "dddzzz",
            cc: "d"
          }
        },
        fields: [
          {
            key: "gg",
            label: "gg",
            type: "datepicker",
            validators: [
              {
                required: true,
                message: "Please select the date",
                trigger: "blur"
              }
            ]
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
              {
                trigger: "blur",
                ...this.$reg.date
              }
            ]
          },
          {
            key: "a3.cc",
            type: "input",
            label: "a3.cc",
            validators: [
              { validator: validatePass, trigger: "blur" },
              { type: "url", trigger: "blur" }
            ]
          },
          {
            key: "name2",
            type: "select",
            label: "name2:",
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
