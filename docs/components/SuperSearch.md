# SuperSearch

## 概述

基于iview，可自定义搜索条件的独立搜索组件

## 示例

<demo-block title='1. 基础用法' desc='提供简单的搜索条件。'>
  <div slot='demo'><SuperSearch-1></SuperSearch-1></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/SuperSearch/1.vue

  </div>
</demo-block>

<demo-block title='1. 提供左右两侧筛选条件用法'>
  <div slot='demo'><SuperSearch-2></SuperSearch-2></div>
  <div slot='code'>

<<< @/docs/.vuepress/components/SuperSearch/2.vue

  </div>
</demo-block>

## API

### props

| 属性    | 说明                                                | 是否必传 | 是否 iview 参数 |
| - | - | - | - |
| value | 最终选择的结果集，可用v-model双向绑定 | 是 | 否 |
| title | 左上角显示标题名称 | 否 | 否 |
| saveText | 保存按钮文本 | 否 | 否 |
| cancelText | 取消按钮文本 | 否 | 否 |
| placeholder | 最终所选搜索结果为空时按钮显示的文本 | 否 | 否 |
| disabled | 是否禁用组件 | 否 | 否 |
| keywordName | 关键字对应的参数名，默认为 keyword | 否 | 否 |
| url | 搜索结果时请求的接口 | 是 | 否 |
| urlPath | 告知组件从url返回结果的某一属性而非结果本身中获取数据,多级通过 . 分隔. 如返回结果为 {retVal: {data: []} } , 需要获取 data, 则赋值为 'retVal.data' | 否 | 否 |
| columns | 筛选条件配置集合，具体看下方说明 | 是 | 否 |
| paramer | Function类型，用于自定义搜索最终结果的参数，否则组件使用默认形式计算。参数为选择的条件及输入的关键字 | 否 | 否 |
| listMap | 最终返回结果的key映射, 默认如下<br/>{<br/>   key:  'code',  // 指定数据的唯一键, 默认为 code<br/>   code:  'code',  //指定列表的code属性应绑定返回结果的某一属性, 默认为 code<br/>   descript:  'descript' //指定列表的descript属性应绑定返回结果的某一属性, 默认为 descript<br/>} | 否 | 否 |
| listRender | 自定义列表结果渲染文本，参数为当前行数据及索引 | 否 | 否 |


##### columns 配置
| 属性 | 说明 | 是否必传 | 是否 iview 参数 |
|-|-|-|-|
| name | 最终搜索时对应的参数名 | 是 | 否 |
| title | 显示的条件名称 | 是 | 否 |
| listUrl | 获取左侧一级条件数据的后端接口 | 否 | 否 |
| listParam | listUrl 的参数, eg: {code: '123'} | 否 | 否 |
| listPath | 告知组件从listUrl返回结果的某一属性而非结果本身中获取数据,多级通过 . 分隔. 如返回结果为 {retVal: {data: []} }, 需要获取 data, 则赋值为 'retVal.data' | 否 | 否 |
| dataUrl | 获取条件数据的后端接口 | 否 | 否 |
| dataParam | dataUrl 的参数, eg: {code: '123'} | 否 | 否 |
| autoGetData | 是否自动根据dataUrl获取数据 | 否 | 否 |
| dataPath | 告知组件从dataURL返回结果的某一属性而非结果本身中获取数据, 配置同listPath | 否 | 否 |
| columns | 条件表格列配置, 若无额外需求，无需配置 | 否 | 是 [API](https://www.iviewui.com/components/table#API)  |
| data | 条件表格数据 | 否 | 是 [API](https://www.iviewui.com/components/table#API)  |
| onSelected | 左侧列表点击后触发事件, 默认参数为当前点击行数据。一般用于手动根据左侧一级条件获取右侧数据 | 否 | 否 |
| getParam  | Function类型，存在左侧一级列表时指定根据dataURL获取数据时的参数，参数为当前行数据 | 否 | 否 |
| map | 部分数据对应key映射。如配置为: <br/>{<br/>  listCode:  'leftCode', //指定左侧列表数据的code应绑定返回数据的 leftCode 属性值, 默认为 code<br/>  listDescript: 'leftDescript', //指定左侧列表数据的descript应绑定返回数据的 leftDescript 属性值, 默认为 descript<br/>  dataCode: 'rightCode', //指定右侧列表数据的code应绑定返回数据的 rightCode 属性值, 默认为 code<br/>  dataDescript: 'rightDescript' //指定右侧列表数据的descript应绑定返回数据的 rightDescript 属性值, 默认为 descript<br/>} | 否 | 否 |



