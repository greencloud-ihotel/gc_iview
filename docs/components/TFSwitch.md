# TFSWitch

## 概述

switch 组件封装,主要针对于后端返回 T 或 F ,而不是 true 或 false 的情况 ,可直接用于更新。
扩展自 [iview switch](https://www.iviewui.com/components/switch) 可直接使用 switch 的所有 props 和 mehods。

## 示例

<demo-block title='1. 基础用法' desc='状态开关的基础用法。'>
  <div slot='demo'><TFSwitch-1></TFSwitch-1></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/TFSwitch/1.vue

  </div>
</demo-block>

<demo-block title='2.在 AutoTable 中使用' >
  <div slot='demo'><TFSwitch-2></TFSwitch-2></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/TFSwitch/2.vue

  </div>
</demo-block>

## API

### props

| 属性 | 说明                                              | 是否必传 | 是否 iview 参数 |
| ---- | ------------------------------------------------- | -------- | --------------- |
| row  | 行数据，包含 isHalt 参数，F 为 False，T 为 True， | 是       | 否              |
| url  | 更新 Url，后台更新状态的 url 地址                 | 是       | 否              |
