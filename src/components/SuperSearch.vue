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
          >{{ item.descript }}</Tag
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
      <div class="flex-side super-search-container super-search-bar">
        <Condition
          ref="condition"
          v-model="condition.result"
          :columns="columns"
        ></Condition>
        <div>
          <Input
            v-if="noTip"
            v-model.trim="condition.keyword"
            search
            clearable
            :disabled="condition.searchDisabled"
            placeholder="关键字"
            class="super-search-searcher"
            style="width: 166px;"
            @on-search="search"
          />

          <Poptip
            v-else
            trigger="focus"
            title=""
            content="点击右侧图标或者输入关键字后按下回车即可搜索"
          >
            <Input
              v-model.trim="condition.keyword"
              search
              clearable
              :disabled="condition.searchDisabled"
              placeholder="关键字"
              class="super-search-searcher"
              style="width: 166px;"
              @on-search="search"
            />
          </Poptip>
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
        :loading="unselected.loading"
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
import Mixin from "./SuperSearch/mixin";

export default {
  name: "SuperSearch",
  components: {
    Condition,
    Transfer
  },
  mixins: [Mixin],
  model: {
    prop: "chosenItems",
    event: "input"
  },
  props: {
    title: {
      type: String,
      default: () => "筛选"
    },
    saveText: {
      type: String,
      default: () => "保存"
    },
    cancelText: {
      type: String,
      default: () => "取消"
    },
    placeholder: {
      type: String,
      default: () => "请选择"
    },
    // 搜索条件配置
    columns: {
      type: Array,
      default: () => []
    },
    // 列表所选结果
    chosenItems: {
      type: Array,
      default: () => []
    },
    // codes: [String, Array],
    disabled: Boolean,
    paramer: Function,
    url: {
      type: String,
      default: () => ""
    },
    urlPath: {
      type: String,
      default: () => ""
    },
    keywordName: {
      type: String,
      default: () => "keyword"
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
    listRender: Function
  },
  data() {
    return {
      show: false,
      noTip: false,
      condition: {
        keyword: "",
        searchDisabled: false,
        result: [] //最终搜索条件
      },
      unselected: {
        list: [],
        wholeList: [],
        selection: []
      },
      selected: {
        list: [],
        wholeList: [],
        selection: []
      },
      imgSrc:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAzxJREFUWAnNV89LG0EUflliPBhCzEFiFEXsQQrJQWzQnNprC4Jn/4L22Guhh0KvHtu/oOeC0IsICf5KoMeCpx5jUkiMMY1gk2j6fZOdZdPuL4OpfbD7ZmfezPfNezNvZkMSUPr9fqTVaj2D3sTzGN1S0Cl2D4VCFagK9Cme3VgslofusM1PQn4G7XY72el03sJuG0/Mz95sb0F/ikQi76LR6A+vPq4EMLvJZrP5Bvo1BpjyGsSj7Qqe2InH4++hfznZORIwZ/0ZHdadOo1QV4I3tpy88ReBRqORAcAXPPMjAHl1KaPxeSKR+GY3GiJgzvwrDO4bXGOW4Ykndk8YuoUxx2Kj28cFTqh5YhBL41oEuOBQeV8x1+M76XUTS7WpEJiu/46aUVe7E5BX3RVC8YihUB4w97kn+OXlpdzc3HgNqtrgXrm4uPCzmzIxxUCHCKyZZFyl2+3K3t6eFAoFYdlNbm9vpVgsyv7+vpyfn7uZ6fptYhtMr6jxzHATExOyvLws2KJydHQkvV5PD2JpgpdKJTk7O5PZ2VmZnp622lwKMWLTA5suBkPVq6ursrS0JPV6XZGwh0PPXIPncjkxDGt9D41j/yA2CfBgCSRra2uysLAgtVpNjo+PhcAavFKpqJkHBScgscPQ6kQLxABG2WxWgZbLZTk5OeFJKKOAm3ipEOL6Ex/RoARoB+YKnMAUxvwuM1edBq+2f6Bs1rpIt5OEFnphROkb6DyYRsARuA0PDw+lWq3K3Nycmj09we1HYncRYFfpgcAECH5wcKAW4eLiomxsbCjXMwQkwW1o90wAMhV64DSAoVxfX0s+n1e5gDmBi5Gu53Zj/EmC2/AuJIhNArt+BOhaZkGm45WVFWFOsIsmkUwmhbsjKAliG7xAYjDe4VyFBMLhsGQyGUmn0452f5Jg1vSRlrq80gjGH6Be+nQI1EyyzJYzMzN+9h9xO3r1fxzHPJcRjx0/yvfVTix9LbMyCLbPJM7xAkDGfSsq4aR8ChLqmm5lQlbw6gwCvL2OS3gp3dLgBLEI8MN0ywsUx0FCXcu164lHsUIw+By8H/THRBPhmniwXzNNgtr0xr//ObWTYBkeGcvv+W8yALLSE0+FfgAAAABJRU5ErkJggg=="
    };
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
    onRemove(item, index) {
      console.log(item, index);
      let itemCode = item.code,
        same = this.selected.wholeList.filter(e => e.code === itemCode)[0],
        sameIndex = this.selected.wholeList.indexOf(same);
      this.selected.wholeList.splice(sameIndex, 1);
      this.$emit("input", this.selected.wholeList);
      this.$nextTick(() => {
        this.$emit("changed");
      });
      this.unselected.wholeList.every(e => e.code !== itemCode) &&
        this.unselected.wholeList.unshift(item);
      this.unselected.list.every(e => e.code !== itemCode) &&
        this.unselected.list.unshift(item);
    },
    // 删除所有tag
    onRemoveAll() {
      this.selected.keyword = "";
      this.selected.list = this.selected.wholeList;
      this.$refs.transfer.moveToLeftAll(() => {
        this.$emit("input", this.selected.wholeList);
        this.$nextTick(() => {
          this.$emit("changed");
        });
      });
    },
    getParam(res) {
      let map = {};
      res.forEach(e => {
        this.columns.forEach((ce, i) => {
          if (e._type === i) {
            map[ce.name]
              ? (map[ce.name] += "," + e.code)
              : (map[ce.name] = e.code);
          }
        });
      });
      map[this.keywordName] = this.condition.keyword;
      return map;
    },
    handle(obj) {
      obj.content =
        typeof this.listRender === "function"
          ? this.listRender(obj)
          : `${obj[this.listMap.descript]}(${obj[this.listMap.code]})`;
      obj.checked = false;
      if (!obj.extra) obj.extra = "";
      obj.key = obj[this.listMap.key];
    },
    // 查询
    async searchByConditions() {
      let params =
        typeof this.paramer === "function"
          ? this.paramer(this.condition.result, this.condition.keyword)
          : this.getParam(this.condition.result);
      this.condition.searchDisabled = true;
      this.unselected.loading = true;
      let res = await this.$http
        .get(this.url, { params })
        .then(res =>
          res && res.data
            ? this.urlPath
              ? this.getPath(res.data, this.urlPath)
              : res.data
            : false
        );
      console.log(res);
      this.unselected.loading = false;
      if (!res) return;

      res.forEach((e, i) => {
        this.handle(e, i);
      });
      this.unselected.list = res;
      this.unselected.wholeList = res;
      setTimeout(() => {
        this.condition.searchDisabled = false;
      }, 150);
    },
    search() {
      if (this.unselected.loading) return;
      this.unselected.list = [];
      this.unselected.wholeList = [];
      this.unselected.selection = [];
      // this.unselected.keyword = "";
      this.searchByConditions();
      if (!this.noTip) {
        this.noTip = true;
        //localStorage.hotelFilter_noTip = 1;
      }
    },

    toSave() {
      this.$emit("input", this.selected.wholeList);
      this.$nextTick(() => {
        this.$emit("changed");
      });
      this.show = false;
      setTimeout(() => {
        this.clear();
        this.unselected.list = this.unselected.wholeList;
        this.selected.list = this.selected.wholeList;
      }, 350);
    },

    setList() {
      let i,
        len = this.chosenItems.length,
        k,
        ulen = this.unselected.wholeList.length;
      for (i = 0; i < len; i++) {
        for (k = 0; k < ulen; k++) {
          if (
            this.chosenItems[i][this.listMap.key] ===
              this.unselected.wholeList[k][this.listMap.key] &&
            this.chosenItems[i][this.listMap.descript] !==
              this.unselected.wholeList[k][this.listMap.descript]
          ) {
            console.log(this.chosenItems[i]);
            this.chosenItems[i][
              this.listMap.descript
            ] = this.unselected.wholeList[k][this.listMap.descript];
            break;
          }
        }
      }

      let each;
      this.selected.wholeList = this.selected.list = this.chosenItems.map(
        (e, i) => {
          each = e;
          this.handle(each, i);
          return each;
        }
      );
    },
    toggleShow(flag) {
      if (this.disabled) return;
      this.show = flag;
      !flag &&
        setTimeout(() => {
          this.clear();
          this.unselected.list = this.unselected.wholeList;
          this.selected.list = this.selected.wholeList;
          let key = this.listMap.key;
          this.chosenItems.length
            ? this.selected.wholeList.forEach(e => {
                this.chosenItems.every(ce => ce[key] !== e[key]) &&
                  this.selected.selection.push(e);
              })
            : (this.selected.selection = this.selected.wholeList);
          this.selected.selection.length && this.$refs.transfer.moveToLeft();

          this.chosenItems.length &&
            this.unselected.wholeList.forEach(e => {
              this.chosenItems.some(ce => ce[key] === e[key]) &&
                this.unselected.selection.push(e);
            });
          this.unselected.selection.length && this.$refs.transfer.moveToRight();
        }, 350);
    },
    clear() {
      this.condition.keyword = "";
      this.$refs.transfer.clear();
      this.onDeleteAll();
    }
  },
  mounted() {
    document.querySelectorAll(".super-search-popper").forEach(e => {
      e.onmousedown = e => {
        e.stopPropagation();
      };
    });
  },
  watch: {
    chosenItems(val) {
      let i,
        key = this.listMap.key;
      for (i = 0; i < val.length; i++) {
        !val[i][key] && val.splice(i, 1) && i--;
      }
      this.setList();
    }
  }
};
</script>
