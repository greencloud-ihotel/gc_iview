# SwitchCom

switch 组件封装。
扩展自 [iview switch](https://www.iviewui.com/components/switch) 可直接使用 switch 的所有 props 和 mehods。

1. 基础用法:状态开关的基础用法。

```javascript
/*vue*/
<desc>
  <p>基础用法:</p>
  <p>自动表格的基本使用方法。</p>
</desc>
<template>
  <div>
     <switch-com :updateUrl="updateUrl"  :row="rowData"></switch-com>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateUrl: "/product-room/bks/channelInfo/updateChannel",
      rowData:{
        isHalt:"T"
      },
    };
  }
};
</script>

<style>
</style>
```

1. 和 AutoTable 相结合的用法:状态开关在 AutoTable 中的使用情况请在 AutoTable 中查看。

### props

| 属性      | 说明                                                          | 是否必传 | 是否 iview 参数 |
| --------- | ------------------------------------------------------------- | -------- | --------------- |
| row       | 行数据，行数据里面要包含 isHalt 参数，F 为 False，T 为 True， | 是       | 否              |
| updateUrl | 更新 Url，参数修改后更改对应的 url 地址                       | 是       | 否              |
