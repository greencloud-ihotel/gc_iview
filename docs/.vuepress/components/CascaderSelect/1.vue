<template>
  <div>
    <cascader-select v-model="filterSearch.formSearch">
      <filter-search
        :columns="filterSearch.searchColumns"
        :rowNumProp="3"
        v-model="filterSearch.formSearch"
      ></filter-search>
    </cascader-select>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cascaderSelectList: [
        {
          role: "GROUP,HOTEL",
          pId: null,
          propKey: "hotelGroupCode",
          message: "请选择集团",
          placeholder: "集团",
          disabled: false,
          loadData: () => {
            return axios
              .get("https://yapi.ihotel.cn/mock/753/getGroups")
              .then(res => {
                return res.data.map(item => {
                  return {
                    label: item.descript,
                    value: item.code
                  };
                });
              });
          }
        },
        {
          role: "HOTEL",
          pId: "hotelGroupCode",
          propKey: "hotelCode",
          message: "请选择酒店",
          placeholder: "酒店",
          disabled: false,
          loadData: formData => {
            return axios
              .get("https://yapi.ihotel.cn/mock/753/getHotels", {
                params: {
                  hotelGroupCode: formData.hotelGroupCode,
                  needMoreInfo: ""
                }
              })
              .then(res => {
                return res.data.map(item => {
                  return {
                    label: item.descript,
                    value: item.code
                  };
                });
              });
          }
        }
      ],
      filterSearch: {
        searchColumns: [
          {
            datas: [],
            type: "inputs"
          },
          {
            datas: [],
            type: "buttons"
          }
        ],
        formSearch: {
          hotelGroupCode: "",
          hotelCode: "",
          keyword: "",
          country: "",
          province: "",
          city: ""
        }
      }
    };
  },
  methods: {
    renderSerachConditionSpecial(data) {
      return {
        num: 1,
        props: {
          labelWidth: 120
        },
        render: () => {
          return (
            <CascaderSelectItem
              placeholder={data.placeholder}
              propKey={data.propKey}
              loadData={data.loadData}
              pId={data.pId}
              message={data.message}
              disabled={data.disabled}
            ></CascaderSelectItem>
          );
        }
      };
    },
    renderSearchConditionNormal(data) {
      return {
        num: 1,
        label: data.label,
        key: data.key
      };
    },
    renderSearchButton() {
      return [
        {
          label: "查询",
          action: () => {}
        },
        {
          label: "重置",
          action: "reset"
        },

        {
          label: "新增",
          action: () => {
            //this.newForm();
          }
        }
      ];
    },
    renderFilterSearchColumns() {
      // 集团/酒店/关键字/国家/省份/城市/联系人
      this.cascaderSelectList.forEach(cascaderSelectItem => {
        this.filterSearch.searchColumns[0].datas.push(
          this.renderSerachConditionSpecial(cascaderSelectItem)
        );
      });
      this.filterSearch.searchColumns[0].datas.push(
        this.renderSearchConditionNormal({ label: "关键字", key: "keyword" })
      );
      // this.countryAndProvinceAndCityList.forEach(item => {
      //   this.filterSearch.searchColumns[0].datas.push(
      //     this.renderSerachConditionSpecial(item)
      //   );
      // });
      this.filterSearch.searchColumns[1].datas.push(
        ...this.renderSearchButton()
      );
    }
  },
  mounted() {
    this.renderFilterSearchColumns();
  }
};
</script>

<style lang="less" scoped></style>
