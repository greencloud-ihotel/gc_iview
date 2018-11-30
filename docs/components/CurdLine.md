# CurdLine

## 概述

类似表格一样的一行一条元素,具有新增、删除、修改功能

## 示例

新增行用于新增一行的数据内容。

1.基础用法:新增行的基本使用方法。

```javascript
/*vue*/
<template>
  <div>
    <div class="data">{{curdLineData}}</div>
    <curd-line :columns="curdLineColumn"
                v-model="curdLineData"></curd-line>
  </div>
</template>

<script>
export default {
  data() {
    return {
        curdLineData: [
        {
          countCode: "a",
          b: "b1",
          c: 3
        },
        { countCode: "a2", b: "b2" }
      ],
      curdLineColumn: [
        {
          label: "描述1",
          key: "countCode"
        },
        {
          label: "描述2",
          key: "b"
        },
        {
          label: "描述3",
          key: "c"
        },
        {
          label: "描述4",
          key: "d"
        },
        {
          label: "描述5",
          key: "test",
          render: h => {
            return h("span",null,"ddd");
          }
        }
      ],
    }
  }
};
</script>

<style>
</style>
```

## API

### props

| 属性    | 说明                                                | 是否必传 | 是否 iview 参数 |
| ------- | --------------------------------------------------- | -------- | --------------- |
| columns | 一行的定义,key为同步到外部的key,label为描述         | 是       | 否              |
| value   | v-model传入的数据，键值和 columns 中的 key 值想对应 | 是       | 否              |
