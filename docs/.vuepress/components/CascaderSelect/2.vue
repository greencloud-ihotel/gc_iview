<template>
  <cascader-select v-model="autoForm.submitForm">
    <auto-form
      ref="autoForm"
      :fields="autoForm.fields"
      v-model="autoForm.submitForm"
    >
    </auto-form>
  </cascader-select>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      autoForm: {
        submitForm: {
          hotelGroupCode: "",
          hotelCode: ""
        },
        fields: []
      },
      cascaderSelectList: [
        {
          role: "GROUP",
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
      ]
    };
  },
  created() {
    const groupAndHotel = this.cascaderSelectList.map(item => {
      return {
        num: 1,
        label: item.placeholder,
        props: {
          labelWidth: 120
        },
        validators: [
          {
            trigger: "change",
            required: true,
            message: `请选择${item.placeholder}`
          }
        ],
        render: () => {
          return (
            <CascaderSelectItem
              placeholder={item.placeholder}
              propKey={item.propKey}
              loadData={item.loadData}
              pId={item.pId}
              message={item.message}
              disabled={item.disabled}
            ></CascaderSelectItem>
          );
        }
      };
    });
    this.autoForm.fields.push(...groupAndHotel, {
      num: 1,
      label: "关键字",
      key: "keyword",
      props: {
        labelWidth: 120
      },
      type: "input",
      validators: [
        {
          trigger: "blur",
          required: true,
          message: `请选择关键字`
        }
      ]
    });
  }
};
</script>

<style lang="less" scoped></style>
