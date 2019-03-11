# SuperSearch

## 概述

一个用于搜索的东东

## 示例

1. 基础用法: 提供简单的搜索条件。

```javascript
/*vue*/
<template>
  <SuperSearch v-model="result"
               :columns="columns"
               :url="url"
               title="筛选示例"
               placeholder="选择示例"></SuperSearch>
</template>

<script>
export default {
  name: "eg_SuperSearch",
  data() {
    return {
      url: "https://yapi.ihotel.cn/mock/230/gc_iview/superSearch",
      result: [], //所选列表结果
      columns: [
        {
          name: "test", //最终搜索时对应的参数名
          title: "测试", //显示的条件名
          autoGetData: true, //是否自动根据dataUrl获取数据
          dataUrl: "https://yapi.ihotel.cn/mock/230/gc_iview/test",
          dataPath: "retVal", // dataURL 返回结果具体路径
          columns: [ //显示的表格列配置
            {
              type: "selection",
              width: 50,
              align: "center"
            },
            {
              title: "代码",
              key: "code",
              width: 120,
              tooltip: true
            },
            {
              title: "描述",
              key: "descript",
              minWidth: 171,
              tooltip: true
            }
          ],
          data: [], //表格数据
          loading: false //表格是否加载中
        }
      ]
    };
  }
};
</script>

```

2. 提供左右两侧筛选条件用法

```javascript
/*vue*/
<template>
  <SuperSearch v-model="result"
               :columns="columns"
               :url="url"
               title="筛选示例"
               placeholder="选择示例"></SuperSearch>
</template>

<script>
export default {
  name: "eg_SuperSearch",
  data() {
    return {
      url: "https://yapi.ihotel.cn/mock/230/gc_iview/superSearch",
      result: [], //所选列表结果
      columns: [
        {
          name: "test2",
          title: "测试2",
          list: [
            {
              code: "AN",
              descript: "安徽"
            },
            {
              code: "CQ",
              descript: "重庆"
            },
            {
              code: "FU",
              descript: "福建"
            }
          ],
          columns: [
            {
              type: "selection",
              width: 50,
              align: "center"
            },
            {
              title: "代码",
              key: "code",
              width: 120,
              tooltip: true
            },
            {
              title: "描述",
              key: "descript",
              minWidth: 171,
              tooltip: true
            }
          ],
          data: [],
          dataUrl: "https://yapi.ihotel.cn/mock/230/gc_iview/listCodeCity",
          dataPath: "retVal",
          autoGetData: false,
          loading: false,
          /* onSelected: item => {  //左侧列表点击后触发事件, item 为当前点击数据
            console.log(item, this);
          }, */          
          map: {
            // 当有左侧列表时，右侧表格数据对应的左侧列表数据的键名。 如根据左侧省份选择右侧城市， 则城市数据包含对应的省份的code值，其属性名为 provinceCode ， parentCode 默认为 parentCode
            parentCode: "provinceCode"
          },
          getParam(item) {
            return {
              provinceCode: item.code
            };
          }
        }
      ]
      // 自定义搜索参数，否则组件使用默认形式计算
      /* param(res) {
          let map = {}
        res.forEach(e => {
          this.columns.forEach((ce, i) => {
            if(e._type === i) {
              map[ce.name] ? map[ce.name].push(e.code) :  map[ce.name] = [e.code]
            }
          })
        })
          for(let k in map) {
            arr.push(`${k}=${map[k].join(',')}`)
          }
        return arr.join('&')
      } */
    };
  },
  created() {},
  mounted() {}
};
</script>
```

## API

### props

| 属性    | 说明                                                | 是否必传 | 是否 iview 参数 |
| - | - | - | - |
| value | 最终选择的结果集，可用v-model双向绑定 | 是 | 否 |
| title | 左上角显示标题名称 | 否 | 否 |
| placeholder | 最终所选搜索结果为空时按钮显示的文本 | 否 | 否 |
| url | 搜索结果时请求的接口 | 是 | 否 |
| columns | 筛选条件配置集合，具体看下方说明 | 是 | 否 |

##### columns 配置
| 属性 | 说明 | 是否必传 | 是否 iview 参数 |
|-|-|-|-|
| name | 最终搜索时对应的参数名 | 是 | 否 |
| title | 显示的条件名称 | 是 | 否 |
| listUrl | 获取左侧一级条件数据的后端接口 | 否 | 否 |
| listPath | 告知组件从listUrl返回结果的某一属性而非结果本身中获取数据 | 否 | 否 |
| dataUrl | 获取条件数据的后端接口 | 否 | 否 |
| autoGetData | 是否自动根据dataUrl获取数据 | 否 | 否 |
| dataPath | 告知组件从dataURL返回结果的某一属性而非结果本身中获取数据 | 否 | 否 |
| columns | 条件表格列配置 | 是 | 是 [API](https://www.iviewui.com/components/table#API)  |
| data | 条件表格数据 | 否 | 是 [API](https://www.iviewui.com/components/table#API)  |
| onSelected | 左侧列表点击后触发事件, 默认参数为当前点击行数据。一般用于手动根据左侧一级条件获取右侧数据 | 否 | 否 |
| map | 部分数据对应key映射，目前可配置parentCode。当有左侧列表时，右侧表格数据对应的左侧列表某一数据的键名。 如根据左侧省份获取右侧城市， 则城市数据包含对应的省份的code值，其属性名为 provinceCode ，则可配置map: {parentCode: 'provinceCode'}。 parentCode 默认为 'parentCode'| 否 | 否 |
| getParam | Function类型，存在左侧一级列表时指定根据dataURL获取数据时的参数，默认值为当前行数据 | 否 | 否 |
| param | Function类型，用于自定义搜索最终结果的参数，否则组件使用默认形式计算。默认参数为选择的条件 | 否 | 否 |