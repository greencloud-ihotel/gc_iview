<template>
  <div
    class="flex-side super-search-container ivu-transfer super-search-transfer super-search-container"
  >
    <List
      ref="left"
      :title="listTitle[0]"
      :list="unselected.list"
      :selection.sync="unselected.selection"
      :loading="loading"
      :empty-text="emptyText"
      :placeholder="placeholder"
      :btn-text="btnText"
      :disabled="moveToRightClass.allDisabled"
    >
      <Tooltip
        slot="leftAction"
        :content="batchActionText"
        style="margin-right: 5px;"
      >
        <!-- 批量操作 -->
        <Button
          icon="md-clipboard"
          class="hotel-filter-transfer-btn"
          :disabled="moveToRightClass.allDisabled"
          @click="batchModal.show = true"
        ></Button>
      </Tooltip>
    </List>
    <div class="super-search-transfer-indicator-list">
      <Button
        :type="moveToRightClass.allType"
        class="super-search-transfer-indicator"
        :disabled="moveToRightClass.allDisabled"
        @click="moveToRightAll"
      >
        <Icon type="ios-arrow-forward" />
        <Icon type="ios-arrow-forward" style="margin-left: -6px;" />
      </Button>
      <Button
        :type="moveToRightClass.singleType"
        class="super-search-transfer-indicator"
        :disabled="moveToRightClass.singleDisabled"
        @click="moveToRight"
      >
        <Icon type="ios-arrow-forward" />
      </Button>
      <Button
        :type="moveToLeftClass.singleType"
        class="super-search-transfer-indicator"
        :disabled="moveToLeftClass.singleDisabled"
        @click="moveToLeft"
      >
        <Icon type="ios-arrow-back" />
      </Button>
      <Button
        :type="moveToLeftClass.allType"
        class="super-search-transfer-indicator"
        :disabled="moveToLeftClass.allDisabled"
        @click="moveToLeftAll"
      >
        <Icon type="ios-arrow-back" style="margin-right: -6px;" />
        <Icon type="ios-arrow-back" />
      </Button>
    </div>
    <List
      ref="right"
      :title="listTitle[1]"
      :list="selected.list"
      :selection.sync="selected.selection"
      :empty-text="emptyText"
      :placeholder="placeholder"
      :btn-text="btnText"
      :disabled="moveToLeftClass.allDisabled"
    ></List>

    <!-- 批量操作 -->
    <Modal
      v-model="batchModal.show"
      :title="batchActionText"
      @on-visible-change="changeBatchModal"
    >
      <Alert>{{ batchActionTipText }}</Alert
      ><!-- 将需要移至右侧的代码按英文逗号分隔 -->
      <Input v-model.trim="batchModal.text" type="textarea" :rows="6" />

      <template slot="footer">
        <Button
          type="primary"
          :disabled="!batchModal.text"
          @click="moveHotelFromText"
        >
          {{ batchActionConfrimText }}
        </Button>
        <Button @click="batchModal.show = false">{{
          batchActionCancelText
        }}</Button>
      </template>
    </Modal>
  </div>
</template>
<script>
import List from "./list.vue";
export default {
  name: "transfer",
  components: {
    List
  },
  props: {
    batchActionConfrimText: {
      type: String,
      default: "确认"
    },
    batchActionCancelText: {
      type: String,
      default: "取消"
    },
    batchActionText: {
      type: String,
      default: "批量操作"
    },
    batchActionTipText: {
      type: String,
      default: "将需要移至右侧的代码按英文逗号分隔"
    },
    loading: Boolean,
    untransferred: {
      type: Object,
      default: () => {
        return {
          list: [],
          selection: []
        };
      }
    },
    transferred: {
      type: Object,
      default: () => {
        return {
          list: [],
          selection: []
        };
      }
    },
    listTitle: {
      type: Array,
      default: () => []
    },
    emptyText: String,
    placeholder: String,
    btnText: Array,
    listMap: Object
  },
  data() {
    return {
      batchModal: {
        show: false,
        text: ""
      }
    };
  },
  computed: {
    //  未选列表
    unselected: {
      get() {
        return this.untransferred;
      },
      set(val) {
        this.$emit("update:untransferred", val);
      }
    },
    // 已选列表
    selected: {
      get() {
        return this.transferred;
      },
      set(val) {
        this.$emit("update:transferred", val);
      }
    },
    unselectedCheckedListMap() {
      const { code } = this.listMap;
      return this.unselected.selection.reduce((map, item, index) => {
        map[item[code]] = index;
        return map;
      }, {});
    },
    unselectedListMap() {
      const { code } = this.listMap;
      return this.unselected.list.reduce((map, item, index) => {
        map[item[code]] = index;
        return map;
      }, {});
    },
    selectedCheckedListMap() {
      const { code } = this.listMap;
      return this.selected.selection.reduce((map, item, index) => {
        map[item[code]] = index;

        return map;
      }, {});
    },
    selectedListMap() {
      const { code } = this.listMap;
      return this.selected.list.reduce((map, item, index) => {
        map[item[code]] = index;

        return map;
      }, {});
    },
    moveToRightClass() {
      let hasItem = !!this.unselected.list.length,
        hasSelection = !!this.unselected.selection.length,
        primary = "primary",
        defaults = "default";

      return {
        allType: hasItem ? primary : defaults,
        allDisabled: !this.loading ? (hasItem ? false : true) : true,
        singleType: hasSelection ? primary : defaults,
        singleDisabled: hasSelection ? false : true
      };
    },
    moveToLeftClass() {
      let hasItem = !!this.selected.list.length,
        hasSelection = !!this.selected.selection.length,
        primary = "primary",
        defaults = "default";

      return {
        allType: hasItem ? primary : defaults,
        allDisabled: !this.loading ? (hasItem ? false : true) : true,
        singleType: hasSelection ? primary : defaults,
        singleDisabled: hasSelection ? false : true
      };
    }
  },
  methods: {
    moveToRight() {
      const { code } = this.listMap;
      this.unselected.list = this.unselected.list.filter(item => {
        return !this.unselectedCheckedListMap.hasOwnProperty(item[code]);
      });
      const data = this.unselected.selection.map(item => {
        return {
          ...item,
          checked: false
        };
      });
      this.unselected.selection = [];
      this.selected.list.push(...data);
    },
    // 移动左侧所选及当前展示列表至右侧
    moveToRightAll() {
      const data = this.unselected.list.map(item => {
        return {
          ...item,
          checked: false
        };
      });
      this.selected.list.push(...data);
      this.unselected.list = [];
      this.unselected.selection = [];
    },
    // 移至左侧
    moveToLeft() {
      const { code } = this.listMap;
      this.selected.list = this.selected.list.filter(item => {
        return !this.selectedCheckedListMap.hasOwnProperty(item[code]);
      });
      const data = this.selected.selection.map(item => {
        return {
          ...item,
          checked: false
        };
      });
      this.selected.selection = [];
      this.unselected.list.unshift(...data);
    },
    // 移动右侧所选及当前展示列表至左侧
    moveToLeftAll(callback) {
      const data = this.selected.list.map(item => {
        return {
          ...item,
          checked: false
        };
      });
      this.unselected.list.push(...data);
      this.selected.list = [];
      this.selected.selection = [];
    },
    clear() {
      this.$refs.left.keyword = "";
      this.$refs.right.keyword = "";
      // this.unselected.wholeList.forEach(e => {
      //   e.checked = false;
      // });
      // this.selected.wholeList.forEach(e => {
      //   e.checked = false;
      // });
      this.unselected.selection = [];
      this.selected.selection = [];
    },
    // 根据英文逗号分隔的代码批量移动至已选
    moveHotelFromText() {
      if (!this.batchModal.text) return;
      const datas = this.batchModal.text.split(",").map(e => e.toUpperCase());
      const { code, descript } = this.listMap;
      const codeMap = this.unselected.list.reduce((map, item, index) => {
        map[item[code].toUpperCase()] = item;
        return map;
      }, {});
      const descriptMap = this.unselected.list.reduce((map, item, index) => {
        map[item[descript]] = item;
        return map;
      }, {});
      datas.forEach(data => {
        const item = codeMap[data.toUpperCase()] || descriptMap[data];
        if (item) {
          item.checked = true;
        }
      });
      // let mapCode = this.listMap.code;
      // this.unselected.list.forEach(e => {
      //   if (data.some(each => each === e[mapCode].toUpperCase()))
      //     e.checked = true;
      // });
      // this.unselected.selection = this.unselected.wholeList.filter(
      //   e => e.checked
      // );
      this.moveToRight();
      this.$nextTick(() => {
        this.batchModal.show = false;
      });
    },
    changeBatchModal(visible) {
      !visible &&
        setTimeout(() => {
          this.batchModal.text = "";
        }, 200);
    }
  },
  watch: {
    loading(val) {
      if (!val) return;
      this.$refs.left.keyword = this.$refs.right.keyword = "";
    }
    // "untransferred.wholeList"(val) {
    //   this.unselected.wholeList = val;
    // },
    // "untransferred.list"(val) {
    //   this.unselected.list = val;
    // },
    // "transferred.wholeList"(val) {
    //   this.selected.wholeList = val;
    // },
    // "transferred.wholeList"(val) {
    //   this.selected.list = val;
    // }
  }
};
</script>
