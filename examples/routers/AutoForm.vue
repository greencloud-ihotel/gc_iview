<template>
  <div class="contain">
    {{ autoForm.submitForm }}
    <AutoForm
      v-model="autoForm.submitForm"
      :fields="autoForm.fields"
      :row="2"
    ></AutoForm>
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
            label: "审批人",
            num: 2,
            validators: [{ validator: validatePass }]
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
  }
};
</script>

<style>
.contain {
  width: 50%;
}
</style>
