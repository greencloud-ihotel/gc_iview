# DatePickers

主要用于有开始时间和结束时间的地方,一般用于入住离住。

## 概述

DatePickers 可以设置开始时间和结束时间

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
    <date-pickers v-model="dates" ></date-pickers>
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

2.使用 Label:日期选择器的传入 label。

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>日期选择器的基本使用方法。</p>
</desc>
<template>
  <div>
    <div class="data">{{dates}}</div>
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
        endLabel:"结束时间:"
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

| 属性    | 说明                           | 是否必传 | 是否 iview 参数 |
| ------- | ------------------------------ | -------- | --------------- |
| value   | value,v-model 数据             | 是       | 否              |
| options | 主要用来传 label，使用方法见 2 | 是       | 否              |
