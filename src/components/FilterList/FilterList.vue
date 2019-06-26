<template>
  <div>
    <Input v-model="searchValue"
           @on-change="filterList"
           placeholder="代码/描述" />
    <div class="box">
      <SelectList :list="listFilter"
                  :code="code"
                  :label="label"
                  @chooseItem="searchTable">
      </SelectList>
    </div>

  </div>
</template>
<script>
import SelectList from "./SelectList.vue";
export default {
  name: "FilterList",
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    code: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      listFilter: this.list,
      searchValue: ""
      // activeIndex: 0
    };
  },
  components: {
    SelectList
  },
  watch: {
    list(val) {
      this.listFilter = val;
    }
  },
  methods: {
    searchTable(params) {
      const [code, activeIndex] = params;
      this.$emit("chooseItem", [code, activeIndex]);
    },
    filterList(e) {
      const value = e.target.value;
      if (value === "") this.listFilter = this.list;
      this.listFilter = this.list.filter(item => {
        for (let i in item) {
          if (
            item[i].indexOf(value.toUpperCase()) > -1 ||
            item[i].indexOf(value.toLowerCase()) > -1
          ) {
            return item;
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 10px 0;
  border: 1px solid #e8eaec;
}
</style>
