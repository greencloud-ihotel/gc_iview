<template>
  <Form ref="groupHotelForm"
        style="position:relative;top:-1px"
        :model="value"
        :label-width="labelWidth"
        :rules="hasRule ? rules : rulesNull">
    <Row>
      <i-Col :span="inline ? 12: 24">
        <FormItem :label="labelTag.hotelGroupCode"
                  prop="hotelGroupCode">
          <Select :disabled="disabled"
                  not-found-text="暂无可选集团"
                  v-model="value.hotelGroupCode"
                  placeholder="请选择集团"
                  :transfer="true"
                  clearable
                  filterable
                  @on-change='changeHotelGroupCode'>
            <Option v-for="(item,index) in groups"
                    :value="item.value"
                    :key="index">{{item.label}}({{item.value}})</Option>
          </Select>
        </FormItem>
      </i-Col>
      <i-Col :span="inline ? 12: 24"
             v-if="multiple">
        <FormItem :label="labelTag.hotelCode"
                  prop="hotelCodes">
          <Select :disabled="disabled"
                  v-model="value.hotelCodes"
                  not-found-text="暂无可选酒店"
                  placeholder="请选择酒店"
                  :transfer="true"
                  clearable
                  filterable
                  @on-change='changeHotelCode'
                  @on-open-change='showMessage'
                  :multiple="multiple">
            <Option v-for="(item,index) in hotels"
                    :value="item.value"
                    :key="index">{{item.label}}({{item.value}})</Option>
          </Select>
        </FormItem>
      </i-Col>
      <i-Col :span="inline ? 12: 24"
             v-if="!multiple">
        <FormItem :label="labelTag.hotelCode"
                  prop="hotelCode">
          <Select :disabled="disabled"
                  v-model="value.hotelCode"
                  not-found-text="暂无可选酒店"
                  placeholder="请选择酒店"
                  :transfer="true"
                  clearable
                  filterable
                  @on-change='changeHotelCode'
                  @on-open-change='showMessage'
                  :multiple="multiple">
            <Option v-for="(item,index) in hotels"
                    :value="item.value"
                    :key="index">{{item.label}}({{item.value}})</Option>
          </Select>
        </FormItem>
      </i-Col>
    </Row>
    <slot name="otherFormItem"></slot>
  </Form>
</template>
<script>
/* name:集团酒店联动搜索框组件*/
import { getListGroups, getListHotels } from "../server/modules/product";
import axios from "axios";
export default {
  name: "groupHotelLink",
  props: {
    hotelsFetch: Object,
    value: Object,
    hasLabel: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },

    labelWidth: {
      type: Number,
      default: 10
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hasRule: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const validateHotelGroupCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选择集团"));
      } else {
        callback();
      }
    };
    const validateHotelCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选择酒店"));
      } else {
        callback();
      }
    };
    const validateHotelCodes = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error("请选择酒店"));
      } else {
        callback();
      }
    };
    return {
      gropName: null,
      hotelName: null,
      groups: [],
      hotels: [],
      rules: {
        hotelGroupCode: [
          {
            validator: validateHotelGroupCode,
            trigger: "change",
            required: this.hasRule
          }
        ],
        hotelCode: [
          {
            validator: validateHotelCode,
            trigger: "change",
            required: this.hasRule
          }
        ],
        hotelCodes: [
          {
            validator: validateHotelCodes,
            trigger: "change",
            required: this.hasRule
          }
        ]
      },
      rulesNull: {}
    };
  },
  computed: {
    labelTag() {
      let labelTag = {
        hotelGroupCode: null,
        hotelCode: null
      };
      if (this.hasLabel) {
        labelTag = {
          hotelGroupCode: "集团:",
          hotelCode: "酒店:"
        };
      }
      return labelTag;
    }
  },
  watch: {
    "value.hotelGroupCode"(val) {
      if (val) {
        this.getHotel(val);
      } else {
        this.value.hotelCode = null;
        this.value.hotelCodes = null;
        this.hotels = [];
      }
      // this.$nextTick(() => {
      //   this.$refs.groupHotelForm.validateField("hotelGroupCode");
      // });
    }
    //"value.hotelCode"() {
    // this.$nextTick(() => {
    //   this.$refs.groupHotelForm.validateField("hotelCode");
    // });
    //}
  },
  methods: {
    validateHotelGroupCode() {
      this.$refs.groupHotelForm.validateField("hotelGroupCode");
    },
    validateHotelCode() {
      this.$refs.groupHotelForm.validateField("hotelCode");
    },
    validateHandler(cb) {
      this.$refs.groupHotelForm.validate(valid => {
        cb && cb(valid);
      });
    },
    //集团和酒店搜索框值改变事件
    changeHotelGroupCode(data) {
      this.value["hotelGroupCode"] = data;
      this.$emit("input", this.value);
    },
    changeHotelCode(data) {
      if (data instanceof Array) {
        this.value["hotelCodes"] = data;
      } else {
        this.value["hotelCode"] = data;
      }
      this.$emit("input", this.value);
    },
    //获取集团搜索框数据
    async getGroup() {
      this.groups = [];
      const res = await getListGroups();
      if (res && res.data && res.data.retVal) {
        const list = res.data.retVal;

        list.forEach(item => {
          this.groups.push({
            value: item.code,
            label: item.descript
          });
        });
      }
    },
    //获取酒店搜索框数据
    async getHotel(hotelGroupCode) {
      this.hotels.list = [];
      this.hotelName = "";
      let res;
      if (this.hotelsFetch) {
        res = await axios.get(this.hotelsFetch.url, {
          params: {
            ...this.hotelsFetch.params,
            hotelGroupCode: hotelGroupCode
          }
        });
      } else {
        res = await getListHotels({
          hotelGroupCode: hotelGroupCode,
          needmoreInfo: ""
        });
      }

      if (res && res.data && res.data.retVal) {
        const list = res.data.retVal;
        const arr = [];
        list.forEach(item => {
          arr.push({
            value: item.code,
            label: item.descript
          });
        });
        this.hotels = arr;
      }
    },
    showMessage(value) {
      // console.log("value:" + value);
      if (value == true && !this.value.hotelGroupCode) {
        this.$Message.warning("请先选择集团");
      }
    },
    reset() {
      // this.value.hotelGroupCode = null;
      // this.value.hotelCodes = null;
      // this.value.hotelCode = null;
      // this.groups = [];
      // this.hotels = [];
      //if (this.value.hotelGroupCode || this.value.hotelCode) {
      this.$refs.groupHotelForm.resetFields();
      //}
    }
  },

  mounted() {
    this.getGroup();
  }
};
</script>

<style>
</style>
