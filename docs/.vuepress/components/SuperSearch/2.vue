<template>
  <super-search
    v-model="result"
    :columns="columns"
    :url="url"
    url-path="retVal"
    title="筛选示例"
    placeholder="选择示例"
  ></super-search>
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
          data: [],
          dataUrl: "https://yapi.ihotel.cn/mock/230/gc_iview/listCodeCity",
          dataPath: "retVal",
          autoGetData: false,
          /* onSelected: item => {  //左侧列表点击后触发事件, item 为当前点击数据
            console.log(item, this);
          }, */

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
  created() {},
  mounted() {}
};
</script>
