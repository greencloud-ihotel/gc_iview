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
          dataUrl: "https://yapi.ihotel.cn/mock/230/gc_iview/test", // 若有此值则组件自动获取数据
          dataPath: "retVal", // dataURL 返回结果具体路径
          columns: [], //显示的表格列配置
          data: [], //表格数据
          loading: false //表格是否加载中
        },
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
          columns: [],
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
  created() {
    window.egsc = this;
    let columns = [
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
    ];
    this.columns.forEach(e => {
      e.columns = columns;
    });
  },
  mounted() {}
};
</script>
