# DatePickers

## 概述

DatePickers可以设置开始时间和结束时间

## 示例

1.基础用法:日期选择器的基本使用方法。

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>日期选择器的基本使用方法。</p>
</desc>
<template>
  <div>
    <div class="data">{{dates}}</div>
    <p>没有Label的情况</p>
    <date-pickers v-model="dates" ></date-pickers>
    <p> 有Label的情况</p>
    <date-pickers v-model="dates" :options="options" ></date-pickers>
  </div>
</template>
<script>

export default {
  data() {
    return {
      dates:{},
      options:{
        startLabel:"开始时间:",
        endLabel:"开始时间:"
      }
    };
  }
};
</script>

<style>
</style>
```

## API

### props

| 属性    | 说明                                                                                                      | 是否必传 | 是否 iview 参数                 |
| ------- | --------------------------------------------------------------------------------------------------------- | -------- | ------------------------------- |
| value   | value 要包含字段 startDate 和 endDate                                                                     | 是       | 否                              |
| options | 日期警用内容和方式，参考 iview，现在对象里面只有 startOptions 参数，开始日期和结束日期都使用 startOptions | 是       | 是，参考 iview 对日期警用的方式 |
