# AutoForm

## 概述

主要用于展示大量结构化数据。扩展自 [iview Form](https://www.iviewui.com/components/form) 可直接使用 Form 的所有 props 和 mehods。

## 示例

1. 1.基础用法:自动表单的基本使用方法。

---
```javascript
/*vue*/
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

<style>
.contain {
  width: 50%;
}
</style>

```

---

## API

### props

| 属性   | 说明                        | 是否必传 | 是否 iview 参数 | 默认值 |
| ------ | --------------------------- | -------- | --------------- | ------ |
| value  | 自动表单的值，可使用v-model | 是       | 否              | {}     |
| fields | 请求后台数据的 url 地址     | 是       | 否              | ""     |
| row    | 一行显示几个数据            | 否       | 否              | 2      |

