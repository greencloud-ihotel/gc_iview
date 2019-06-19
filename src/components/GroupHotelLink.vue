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
          <Select :disabled="disableHotelGroup"
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
          <!-- <Select :disabled="disabled"
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
          </Select> -->
          <HotelFilter v-model="value.hotelCodes"
                       :codes="value.hotelGroupCode"
                       :disabled="disableHotel"
                       @changed="changeHotels"></HotelFilter>
        </FormItem>
      </i-Col>
      <i-Col :span="inline ? 12: 24"
             v-if="!multiple">
        <FormItem :label="labelTag.hotelCode"
                  prop="hotelCode">
          <Select :disabled="disableHotel"
                  v-model="value.hotelCode"
                  not-found-text="暂无可选酒店"
                  :placeholder="hotelsFetch.placeholder ? hotelsFetch.placeholder : '请选择酒店'"
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
// import { getListGroups, getListHotels } from "../server/modules/product";
import axios from "axios";
import HotelFilter from "@/components/hotelFilter.vue";
import _ from "lodash";
export default {
  name: "GroupHotelLink",
  components: {
    HotelFilter
  },
  props: {
    hotelsFetch: {
      type: Object,
      default: () => {
        return {};
      }
    },
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
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
    groupDisabled: {
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
    },
    groupFetchUrl: {
      type: String,
      default: "/platform/baseapi/listGroups"
    },
    hotelFetchUrl: {
      type: String,
      default: "/platform/baseapi/listHotels"
    },
    manualDisable: Boolean
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
    },
    disableHotelGroup() {
      let disabled = this.disabled || this.groupDisabled;
      return !this.manualDisable
        ? !this.$store.state.isUnion || disabled
        : disabled;
    },
    disableHotel() {
      return !this.manualDisable
        ? this.$store.state.isHotel || this.disabled
        : this.disabled;
    }
  },
  watch: {
    "value.hotelGroupCode"(val) {
      if (val) {
        !this.multiple && this.getHotel(val);
      } else {
        this.value.hotelCode = null;
        this.value.hotelCodes = [];
        this.hotels = [];
      }
      this.$emit("change-group", val);
    }
  },
  methods: {
    getListGroups(params) {
      return axios.get(this.groupFetchUrl, {
        params
      });
    },
    getListHotels(params) {
      return axios.get(this.hotelFetchUrl, {
        params
      });
    },
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
      this.$nextTick(() => {
        this.$set(this.value, "hotelCode", "");
      });
      this.$emit("input", this.value);
      this.$emit("change-group", data);
    },
    changeHotelCode(data) {
      if (data instanceof Array) {
        this.value["hotelCodes"] = data;
      } else {
        this.value["hotelCode"] = data;
      }
      this.$emit("input", this.value);
      this.$emit("change-hotel", data);
    },
    //获取集团搜索框数据
    async getGroup() {
      this.groups = [];
      const res = await this.getListGroups();
      if (res && res.data && res.data.retVal) {
        const list = res.data.retVal;

        list.forEach(item => {
          this.groups.push({
            value: item.code,
            label: item.descript
          });
        });

        if (!this.$store.state.isUnion) {
          this.$set(
            this.value,
            "hotelGroupCode",
            this.$store.state.userInfo.unitCode
          );
          this.$emit("input", this.value);
        }
        this.$store.state.isGroup && this.$emit("get-data", this.groups);
      }
      // this.$emit("get-group", this.groups);
    },
    //获取酒店搜索框数据
    async getHotel(hotelGroupCode) {
      this.hotels = [];
      this.hotelName = "";
      let res;
      let code = "";
      let label = "";
      if (!_.isEmpty(this.hotelsFetch)) {
        res = await axios.get(this.hotelsFetch.url, {
          params: {
            ...this.hotelsFetch.params,
            hotelGroupCode: hotelGroupCode
          }
        });
        code = this.hotelsFetch.code;
        label = this.hotelsFetch.label;
      } else {
        res = await this.getListHotels({
          hotelGroupCode: hotelGroupCode,
          needmoreInfo: ""
        });
      }

      if (res && res.data && res.data.retVal) {
        const list = res.data.retVal;
        const arr = [];
        list.forEach(item => {
          arr.push({
            value: code ? item[code] : item.code,
            label: label ? item[label] : item.descript
          });
        });
        this.hotels = arr;

        if (this.$store.state.isHotel) {
          this.$set(
            this.value,
            "hotelCode",
            this.$store.state.userInfo.hotelCode
          );
          this.$emit("input", this.value);
          this.$emit(
            "get-data",
            this.value.hotelGroupCode,
            this.$store.state.userInfo.hotelCode
          );
        }
      }
    },
    showMessage(value) {
      if (value == true && !this.value.hotelGroupCode) {
        this.$Message.warning("请先选择集团");
      }
    },
    reset() {
      this.$refs.groupHotelForm.resetFields();
      this.value.hotelGroupCode = null;
      this.value.hotelCode = null;
      this.value.hotelCodes = [];
    },
    changeHotels() {
      if (this.hasRule) this.$refs.groupHotelForm.validateField("hotelCodes");
    }
  },
  actived() {
    this.getGroup();
    if (this.value.hotelGroupCode) {
      !this.multiple && this.getHotel(this.value.hotelGroupCode);
    }
  },

  mounted() {
    this.getGroup();
    if (this.value.hotelGroupCode) {
      !this.multiple && this.getHotel(this.value.hotelGroupCode);
    }
  }
};
</script>

<style>
</style>
