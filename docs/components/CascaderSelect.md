# CascaderSelect

## 概述

主要用于下拉框的父子数据联动(以及替代集团酒店组件，解耦)

## 示例

<demo-block title='1.在filterSearch中使用' desc='在搜索条件中使用联动组件示例'>
  <div slot='demo'><CascaderSelect-1/></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/CascaderSelect/1.vue

  </div>
</demo-block>

<demo-block title='2.在auto-form中使用' desc='在表单中使用联动组件示例'>
  <div slot='demo'><CascaderSelect-2></CascaderSelect-2></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/CascaderSelect/2.vue

  </div>
</demo-block>

## API

### CascaderSelect props

| 属性    | 说明                                      | 是否必传 | 是否 iview 参数 | 默认值 |
| ------- | ----------------------------------------- | -------- | --------------- | ------ |
| v-model | CascaderSelect 联动组件关联的表单数据对象 | 是       | 否              | {}     |

### CascaderSelectItem props

| 属性     | 说明                                                                                      | 是否必传 | 是否 iview 参数 | 默认值   |
| -------- | ----------------------------------------------------------------------------------------- | -------- | --------------- | -------- |
| propKey  | 自动表单的值，可使用 v-model                                                              | 是       | 否              | ""       |
| pId      | 需要关联的父级联动组件的 id 一般填写 propsKey 的值                                        | 否       | 否              | null     |
| disabled | 是否禁用                                                                                  | 否       | 否              | false    |
| loadData | 下拉框加载数据的方法必须要返回一个 Promise , loadData 参数带有 v-model 绑定的表单数据对象 | 是       | 否              | Function |
| message  | 出现错误的提示信息                                                                        | 否       | 否              | ""       |
