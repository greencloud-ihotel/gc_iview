# TFSwitch

## 概述

DatePickers 日期范围的封装。
扩展自 [iview switch](https://www.iviewui.com/components/switch) 可直接使用 switch 的所有 props 和 mehods。

1. 基础用法:日期选择器的基本使用方法。

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>日期选择器的基本使用方法。</p>
</desc>
<template>
  <div>
    <p>没有Label的情况</p>
    <date-pickers v-model="dateData" ></date-pickers>
    <p>单个Label的情况</p>
    <date-pickers v-model="dateData" :options="options" ></date-pickers>
    <p>两个Label的情况</p>
    <date-pickers v-model="dateData" :options="endOptions" ></date-pickers>
  </div>
</template>
<script>

export default {
  data() {
    return {
      dateData: {
        //startDate: , 默认为当天
        //endDate: ,   默认为当天的后一天
      },
      options:{
        startLabel:"开始时间:"
      },
      endOptions:{
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
