# CurdLine

## 概述

新增行用于新增一行的数据内容。

1. 基础用法:新增行的基本使用方法。

```javascript
/*vue*/
<template>
  <div>
  {{curdLineData}}
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
          //render: (h, params) => {
            //return (
            //   <i-select value={params.countCode}>
            //     <i-option value="a">1</i-option>
            //     <i-option value="a2">33</i-option>
            //   </i-select>
            //);
          // }
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
          render: () => {
            //return <span>dd</span>;
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

### props

| 属性    | 说明                                                                                  | 是否必传 | 是否 iview 参数 |
| ------- | ------------------------------------------------------------------------------------- | -------- | --------------- |
| columns | columns 一行包含的内容元素 ,参考 iview 中 columns 元素的写法                          | 是       | 否              |
| value   | curdLineData 对应的数据，可以参考 table 的 data，这边键值和 columns 中的 key 值想对应 | 是       | 否              |
