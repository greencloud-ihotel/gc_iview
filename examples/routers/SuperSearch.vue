<template>
  <SuperSearch v-model="result"
               :columns="columns"
               :url="url"
               :url-path="urlPath"
               title="筛选示例"
               placeholder="选择示例"></SuperSearch>
</template>

<script>
export default {
  name: "eg_SuperSearch",
  data() {
    return {
      url: "https://yapi.ihotel.cn/mock/230/gc_iview/superSearch",
      urlPath: 'retVal', //指定获取通过url返回结果的某一属性
      result: [], //所选列表结果
      //keywordName: 'keyword', //查询接口的关键字对应参数名
      columns: [
        {
          name: "test", //最终搜索时对应的参数名
          title: "测试", //显示的条件名
          autoGetData: true, //是否自动根据dataUrl获取数据
          listUrl: '', //用于获取左侧父级列表数据
          listParam: '', //listUrl的参数
          dataUrl: "https://yapi.ihotel.cn/mock/230/gc_iview/test", // 用于获取右侧表格数据
          dataParam: {}, //dataUrl的参数
          dataPath: "retVal", // dataURL 返回结果具体路径, 多个则用 . 分隔，如 retVal.list 表示获取返回结果的retVal的list属性值
          // columns: [], //显示的表格列配置,一般无需配置
          data: [], //表格数据
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
          // columns: [],
          data: [],
          dataUrl: "https://yapi.ihotel.cn/mock/230/gc_iview/listCodeCity",
          dataPath: "retVal",
          // autoGetData: false,
          /* onSelected: (item, term) => {  //左侧列表点击后触发事件, item 为当前点击数据, term 为当前条件数据
            console.log(item);
            // 通过 term.data 获取右侧表格数据并赋值
            this.$http.get('', {params: {
              provinceCode: item.code
            }}).then(res => {
              term.data = res.map(e => {
                return {
                  code: '',
                  descript: ''
                }
              })
            })
          }, */
          // 用于指定列表数据的code和descript获取返回数据的对应属性
          map: {
            // listCode: 'leftCode', //指定左侧列表数据的code应绑定返回数据的 leftCode 属性值
            // listDescript: 'leftDescript', //指定左侧列表数据的descript应绑定返回数据的 leftDescript 属性值
            // dataCode: 'rightCode', //指定右侧列表数据的code应绑定返回数据的 rightCode 属性值
            // dataDescript: 'rightDescript' //指定右侧列表数据的descript应绑定返回数据的 rightDescript 属性值
          },
          getParam(item) {
            return {
              provinceCode: item.code
            };
          }
        }
      ]
      // 自定义搜索参数，否则组件使用默认形式计算
      /* paramer(res, keyword) {
          let map = {}
          res.forEach(e => {
            this.columns.forEach((ce, i) => {
              if (e._type === i) {
                map[ce.name]
                  ? map[ce.name] = ',' + e.code
                  : map[ce.name] = e.code;
              }
            });
          });
          map.keyword = keyword
          return map
      } */
    };
  },
  created() {
    window.egsc = this;
  },
  mounted() {}
};
</script>
