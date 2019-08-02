# 常用的正则表达式

## 概述

由于常用的正则表达式散落在各个地方，同学们的使用方式也是五花八门，所以将常用的正则表达式归集到gc_iview中

## 使用说明

  1. 方式一、直接使用原型上的reg

```javascript
this.$reg.mobile ,mobile为下表中的字段名:
```

|  类型  | 字段名  |        验证不通过信息        |
| :----: | :-----: | :--------------------------: |
|  手机  | mobile  |         手机号不正确         |
| 身份证 |  card   |       身份证号码不正确       |
|  邮编  | zipCode |        邮政编码不正确        |
|  日期  |  date   | 请输入格式为YYYY-MM-DD的时间 |

 内部格式如下所示，可以单独使用 pattern

```javascript
{ pattern: /reg/,message: "手机号不正确"}
```

1. 方式二、单独引入，字段名见上表

```javascript
import {mobile} from "gc_iview/libs/regExp"
```

## 示例

1. 例如在 AutoForm 中使用:

```javascript
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
  }
```
