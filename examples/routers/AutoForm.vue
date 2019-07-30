<template>
  <div class="contain">
    {{ autoForm.submitForm }}
    <AutoForm
      v-model="autoForm.submitForm"
      ref="form"
      :fields="autoForm.fields"
      :row="2"
    ></AutoForm>
    <Button @click="handleSubmit">保存</Button>
    <Button @click="handleReset">复位</Button>
  </div>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      console.log("====================================");
      console.log(value);
      console.log("====================================");
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
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
          name2: "@222"
        },
        fields: [
          {
            key: "name",
            type: "input",
            icon: "ios-person-outline",
            label: "审批人",
            num: 2,
            validators: [{ validator: validatePass, trigger: "blur" }]
          },
          {
            key: "a2.dd",
            type: "input",
            label: "aaa",
            validators: [{ validator: validatePass2 }]
          },
          {
            key: "a3.cc",
            type: "input",
            label: "审批人",
            validators: [{ required: true, message: "必填3" }]
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
          },
          {
            key: "name3",
            label: "name3",
            render() {
              return (
                <div>
                  <span>ddd</span>
                  <span>ddd2</span>
                </div>
              );
            }
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
