<template>
  <super-search
    v-model="result"
    :columns="columns"
    :url="url"
    :url-path="urlPath"
    :keyword-name="keywordName"
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
      urlPath: "retVal", //指定获取通过url返回结果的某一属性
      result: [], //所选列表结果
      keywordName: "defKeyword", //查询接口的关键字对应参数名
      columns: [
        {
          name: "test", //最终搜索时对应的参数名
          title: "测试", //显示的条件名
          autoGetData: true, //是否自动根据dataUrl获取数据
          dataUrl: "https://yapi.ihotel.cn/mock/230/gc_iview/test",
          dataPath: "retVal", // dataURL 返回结果具体路径
          data: [], //表格数据
          loading: false //表格是否加载中
        }
      ]
    };
  }
};
</script>
