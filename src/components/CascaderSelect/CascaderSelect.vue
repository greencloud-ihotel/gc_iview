<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import Emitter from "../../libs/emitter.js";

export default {
  name: "CascaderSelect",
  mixins: [Emitter],
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      cascaderSelectList: []
    };
  },
  provide() {
    return {
      cascaderSelect: this
    };
  },
  watch: {},
  computed: {
    formData: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    findClearItem({ pId, id, value }) {
      return this.cascaderSelectList.filter(item => {
        const pIdList = item.pId ? item.pId.split(",") : [];
        return pIdList.includes(id);
      });
    }
  },
  created() {
    this.$on("on-cascader-item-clear-value", ({ pId, id, value }) => {
      const findItemList = this.findClearItem({ pId, id, value });
      if (findItemList.length) {
        findItemList.forEach(findItem => {
          findItem.reset();
          findItem.parentHasValue = false;
          this.formData[findItem.$props.propKey] = "";
        });
      }
    });
    this.$on("on-cascader-item-add", item => {
      const list = this.cascaderSelectList.map(item => item.propKey);
      if (!list.includes(item.propKey)) {
        this.cascaderSelectList.push(item);
      }
      //  else {
      //   // 防止组件v-if重新渲染的时候重复请求接口数据 防止loadData在有options的时候请求
      //   const findItem = this.cascaderSelectList.find(
      //     l => item.propKey === l.propKey
      //   );
      //   if (findItem) {
      //     item.options = findItem.options;
      //   }
      // }
    });
    this.$on("on-cascader-item-remove", item => {
      const list = this.cascaderSelectList.map(item => item.propKey);
      if (list.includes(item.propKey)) {
        this.cascaderSelectList.splice(list.indexOf(item.propKey, 1));
      }
    });
    this.$on("on-cascader-item-open-change", ({ id, pId }) => {
      const findParentItem = this.cascaderSelectList.find(
        item => item.$props.propKey === pId
      );
      const findItem = this.cascaderSelectList.find(item => {
        const pIdList = item.$props.pId ? item.$props.pId.split(",") : [];
        return pIdList.includes(pId) && item.$props.propKey === id;
      });

      if (findParentItem && this.formData[findParentItem.$props.propKey]) {
        if (findItem) {
          findItem.$data.parentHasValue = true;
          findItem.openChangeHandler(true);
        } else {
          throw `未找到对应的选中下拉框 请查看${pId}是否正确`;
        }
      } else {
        this.$Message.warning(`${findParentItem.$props.message}`);
      }
    });
  },
  mounted() {}
};
</script>

<style lang="less" scoped></style>
