<template>
  <div class="contain">
    <auto-form
      ref="form"
      v-model="autoForm.submitForm"
      :fields="autoForm.fields"
      :row="2"
    ></auto-form>
    <i-button @click="handleSubmit">保存</i-button>
    <i-button @click="handleReset">复位</i-button>
  </div>
</template>

<script>
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
        submitForm: {},
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
