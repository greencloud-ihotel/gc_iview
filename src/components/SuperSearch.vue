<style lang="less">
@import "./SuperSearch/super-search.less";
</style>
<template>
  <div class="super-search">
    <!-- result start -->
    <div class="super-search-results">
      <div v-show="chosenItems.length">
        <Tag
          :closable="!disabled"
          class="super-search-tag-outter"
          :class="{ disabled: disabled }"
          v-for="(item, index) in chosenItems"
          :key="index"
          @on-close="onRemove(item, index)"
          @click.native="toggleShow(true)"
          >{{ item[listMap.descript] }}({{ item[listMap.code] }})</Tag
        >
        <img
          v-show="!disabled"
          :src="imgSrc"
          width="16"
          alt="close-all"
          class="super-search-tag-close"
          @click="onRemoveAll"
        />
      </div>
      <Button
        v-show="!chosenItems.length"
        :disabled="disabled"
        @click="toggleShow(true)"
        >{{ placeholder }}</Button
      >
    </div>
    <!-- result end -->

    <!-- modal start -->
    <Modal
      v-model="show"
      class="super-search-modal"
      width="725"
      :closable="false"
      :mask-closable="false"
      footer-hide
    >
      <h1 class="super-search-container super-search-title">{{ title }}</h1>
      <div
        v-if="searchable || columns.length"
        class="flex-side super-search-container super-search-bar"
      >
        <Condition
          ref="condition"
          v-model="condition.result"
          :columns="columns"
          :code-text="codeText"
          :desc-text="descText"
          @click-title="clickTermTitle"
        ></Condition>
        <div v-if="searchable">
          <slot name="search">
            <!-- v-if="!$slots.search" -->
            <template>
              <Input
                v-if="noTip"
                v-model.trim="condition.keyword"
                search
                clearable
                :disabled="condition.searchDisabled"
                :placeholder="keywordDesc"
                class="super-search-searcher"
                style="width: 166px;"
                @on-search="search"
              />

              <Poptip v-else trigger="focus" title="" :content="tipText">
                <Input
                  v-model.trim="condition.keyword"
                  search
                  clearable
                  :disabled="condition.searchDisabled"
                  :placeholder="keywordDesc"
                  class="super-search-searcher"
                  style="width: 166px;"
                  @on-search="search"
                />
              </Poptip>
            </template>
          </slot>
        </div>
      </div>
      <!-- search tag start -->
      <div
        class="super-search-container super-search-tag-box"
        v-show="condition.result.length"
      >
        <Tag
          closable
          class="super-search-tag"
          v-for="(item, index) in condition.result"
          :key="index"
          @on-close="onDelete(item, index)"
          >{{ item.descript }}</Tag
        >
        <!-- <div class="super-search-tag-list">
        </div>-->
        <img
          :src="imgSrc"
          width="16"
          alt="close-all"
          class="super-search-tag-close"
          @click="onDeleteAll"
        />
      </div>
      <!-- search tag end -->
      <!-- transfer start -->
      <Transfer
        ref="transfer"
        :untransferred.sync="unselected"
        :transferred.sync="selected"
        :list-map="listMap"
        :loading="unselected.loading"
        :list-title="listTitle"
        :empty-text="emptyText"
        :placeholder="listPlaceholder"
        :btn-text="checkText"
      ></Transfer>
      <!-- transfer end -->
      <div class="super-search-footer">
        <Button type="primary" @click="toSave">{{ saveText }}</Button>
        <Button @click="toggleShow(false)">{{ cancelText }}</Button>
      </div>
    </Modal>
    <!-- modal end -->
  </div>
</template>
<script>
import Condition from "./SuperSearch/condition.vue";
import Transfer from "./SuperSearch/transfer.vue";

export default {
  name: "SuperSearch",
  components: {
    Condition,
    Transfer
  },
  props: {
    title: {
      type: String,
      default: "筛选"
    },
    saveText: {
      type: String,
      default: "保存"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    // 搜索条件配置
    columns: {
      type: Array,
      default: () => []
    },
    // 列表所选结果
    value: {
      type: Array,
      default: () => []
    },
    disabled: Boolean,
    loadData: {
      type: Function,
      default: () => {}
    },

    keywordName: {
      type: String,
      default: "keyword"
    },
    listMap: {
      type: Object,
      default: () => {
        return {
          key: "code",
          code: "code",
          descript: "descript"
        };
      }
    },
    listRender: Function,
    tipText: {
      type: String,
      default: "点击右侧图标或者输入关键字后按下回车即可搜索"
    },
    listTitle: {
      type: Array,
      default: () => ["待选", "已选"]
    },
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    listPlaceholder: {
      type: String,
      default: "请输入搜索内容"
    },
    checkText: {
      type: Array,
      default: () => ["全选", "反选"]
    },
    codeText: {
      type: String,
      default: "代码"
    },
    descText: {
      type: String,
      default: "描述"
    },
    keywordDesc: {
      type: String,
      default: "关键字"
    },
    searchable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      noTip: localStorage.superSearch_noTip,
      condition: {
        keyword: "",
        searchDisabled: false,
        result: [] //最终搜索条件
      },
      unselected: {
        list: [],
        selection: []
      },
      selected: {
        list: [],
        selection: []
      },
      imgSrc:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAzxJREFUWAnNV89LG0EUflliPBhCzEFiFEXsQQrJQWzQnNprC4Jn/4L22Guhh0KvHtu/oOeC0IsICf5KoMeCpx5jUkiMMY1gk2j6fZOdZdPuL4OpfbD7ZmfezPfNezNvZkMSUPr9fqTVaj2D3sTzGN1S0Cl2D4VCFagK9Cme3VgslofusM1PQn4G7XY72el03sJuG0/Mz95sb0F/ikQi76LR6A+vPq4EMLvJZrP5Bvo1BpjyGsSj7Qqe2InH4++hfznZORIwZ/0ZHdadOo1QV4I3tpy88ReBRqORAcAXPPMjAHl1KaPxeSKR+GY3GiJgzvwrDO4bXGOW4Ykndk8YuoUxx2Kj28cFTqh5YhBL41oEuOBQeV8x1+M76XUTS7WpEJiu/46aUVe7E5BX3RVC8YihUB4w97kn+OXlpdzc3HgNqtrgXrm4uPCzmzIxxUCHCKyZZFyl2+3K3t6eFAoFYdlNbm9vpVgsyv7+vpyfn7uZ6fptYhtMr6jxzHATExOyvLws2KJydHQkvV5PD2JpgpdKJTk7O5PZ2VmZnp622lwKMWLTA5suBkPVq6ursrS0JPV6XZGwh0PPXIPncjkxDGt9D41j/yA2CfBgCSRra2uysLAgtVpNjo+PhcAavFKpqJkHBScgscPQ6kQLxABG2WxWgZbLZTk5OeFJKKOAm3ipEOL6Ex/RoARoB+YKnMAUxvwuM1edBq+2f6Bs1rpIt5OEFnphROkb6DyYRsARuA0PDw+lWq3K3Nycmj09we1HYncRYFfpgcAECH5wcKAW4eLiomxsbCjXMwQkwW1o90wAMhV64DSAoVxfX0s+n1e5gDmBi5Gu53Zj/EmC2/AuJIhNArt+BOhaZkGm45WVFWFOsIsmkUwmhbsjKAliG7xAYjDe4VyFBMLhsGQyGUmn0452f5Jg1vSRlrq80gjGH6Be+nQI1EyyzJYzMzN+9h9xO3r1fxzHPJcRjx0/yvfVTix9LbMyCLbPJM7xAkDGfSsq4aR8ChLqmm5lQlbw6gwCvL2OS3gp3dLgBLEI8MN0ywsUx0FCXcu164lHsUIw+By8H/THRBPhmniwXzNNgtr0xr//ObWTYBkeGcvv+W8yALLSE0+FfgAAAABJRU5ErkJggg=="
    };
  },
  computed: {
    chosenItems: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    chosenMap() {
      const key = this.listMap.key;
      return this.chosenItems.reduce((map, item) => {
        map[item[key]] = true;
        return map;
      }, {});
    },
    selectedListToMap() {
      const key = this.listMap.key;
      return this.selected.list.reduce((map, item) => {
        map[item[key]] = true;
        return map;
      }, {});
    },
    unselectedListToMap() {
      const key = this.listMap.key;
      return this.unselected.list.reduce((map, item) => {
        map[item[key]] = true;
        return map;
      }, {});
    }
  },
  methods: {
    // 删除单个条件tag
    onDelete(item, index) {
      this.$refs.condition.delete(item, index);
    },
    // 删除所有条件tag
    onDeleteAll() {
      this.$refs.condition.deleteAll();
    },
    // 删除外部单个tag
    onRemove(item) {
      let key = this.listMap.key;
      let itemCode = item[key];
      this.chosenItems = this.selected.list.filter(e => e[key] !== itemCode);
      this.$emit("changed", this.selected.list);
      this.unselectedListToMap[itemCode] && this.unselected.list.unshift(item);
    },
    // 删除所有tag
    onRemoveAll() {
      this.selected.keyword = "";
      // this.chosenItems.forEach(item => {
      //   this.onRemove(item);
      // });
      this.unselected.list.unshift(...this.chosenItems);
      this.chosenItems = [];
      this.$emit("changed", this.chosenItems);
    },
    // 每次查询前比较已经确认选择的和在选择列表中的数据比较，保持当前已选列表中数据不会丢失
    addChosenItemsToSelectedList() {
      const { code, key } = this.listMap;
      const selectedList = this.selected.list;
      const chosenItems = this.chosenItems.filter(item => {
        return !this.selectedListToMap[item[key]];
      });
      this.selected.list = [...selectedList, ...chosenItems];
    },
    // 查询
    async searchByConditions() {
      this.condition.searchDisabled = true;
      this.unselected.loading = true;
      const { key, descript, code } = this.listMap;
      this.addChosenItemsToSelectedList();
      if (typeof this.loadData === "function") {
        const getDataFn = this.loadData();
        if (getDataFn.then) {
          getDataFn
            .then(data => {
              if (!data) return;
              this.unselected.list = data
                .filter(item => {
                  return !this.selectedListToMap[item[key]];
                })
                .map(item => {
                  return this.handle(item, descript, code, key);
                });
              this.setList(this.selected.list);
            })
            .finally(() => {
              this.condition.searchDisabled = false;
              this.unselected.loading = false;
            });
        } else {
          throw "开发错误:loadData函数需要返回一个包含then的Promise";
        }
      } else {
        throw "开发错误:loadData不是一个函数";
      }
    },
    search() {
      if (this.unselected.loading) return;
      this.unselected.list = [];
      this.unselected.selection = [];
      this.searchByConditions();
      if (!this.noTip) {
        this.noTip = true;
        localStorage.hotelFilter_noTip = 1;
      }
    },

    toSave() {
      this.chosenItems = this.selected.list;
      this.$emit("changed", this.selected.list);
      this.show = false;
      this.clear();
      this.unselected.list = this.unselected.list;
      this.selected.list = this.selected.list;
    },

    setList(selectedList = []) {
      const { key, descript, code } = this.listMap;
      selectedList = selectedList.map(item => {
        return {
          ...item,
          descript: this.unselectedListToMap[[item.key]]
        };
      });
      this.selected.list = selectedList.map((e, i) => {
        return this.handle(e, descript, code, key);
      });
    },
    handle(obj, descript, code, key) {
      return {
        ...obj,
        content:
          typeof this.listRender === "function"
            ? this.listRender(obj)
            : `${obj[descript]}(${obj[code]})`,
        checked: false,
        extra: obj.extra || "",
        key: obj[key]
      };
    },
    toggleShow(visible) {
      if (this.disabled) return;
      this.show = visible;
      if (!visible) {
        this.recoveryUnSaveData();
      }

      // if (flag) {
      //   return false;
      // }
      // this.clear();
      // let key = this.listMap.key;
      // if (this.chosenItems.length) {
      //   if (this.chosenItems.every(ce => !this.selectedListToMap[ce[key]])) {
      //     this.selected.selection.push(e);
      //   }
      // } else {
      //   this.selected.selection = this.selected.wholeList;
      // }

      // if (this.selected.selection.length) {
      //   this.$refs.transfer.moveToLeft();
      // }
      // if (this.chosenItems.length) {
      //   this.unselected.wholeList.forEach(e => {
      //     if (this.chosenItems.some(ce => ce[key] === e[key])) {
      //       this.unselected.selection.push(e);
      //     }
      //   });
      // }
      // if (this.unselected.selection.length) {
      //   this.$refs.transfer.moveToRight();
      // }
    },
    recoveryUnSaveData() {
      const { key, descript, code } = this.listMap;
      const unSaveList = this.selected.list
        .filter(item => {
          return !this.chosenMap[item[code]];
        })
        .map(item => {
          return {
            ...item,
            checked: false
          };
        });
      this.selected.list = this.selected.list
        .filter(item => {
          return this.chosenMap[item[code]];
        })
        .map(item => {
          return {
            ...item,
            checked: false
          };
        });
      this.unselected.list.unshift(...unSaveList);
      this.unselected.list = this.unselected.list.map(item => {
        return {
          ...item,
          checked: false
        };
      });
      this.selected.selection = [];
      this.unselected.selection = [];
    },
    clear() {
      this.condition.keyword = "";
      this.$refs.transfer.clear();
      this.onDeleteAll();
    },
    clickTermTitle(term, index) {
      this.$emit("click-title", term, index);
    }
  },
  watch: {
    // chosenItems: {
    //   handler(val) {
    //     this.setList(val);
    //   },
    //   deep: true
    // }
  }
};
</script>
