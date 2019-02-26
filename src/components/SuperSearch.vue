<style lang="less">
.size(@w, @h) {
  width: @w;
  height: @h;
}

.square(@w) {
  .size(@w, @w);
}

.tagClose() {
  margin-left: 5px;
  vertical-align: middle;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

.left {
  float: left;
}
.right {
  float: right;
}

.clearfix {
  &::before,
  &::after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
}
.mr10 {
  margin-right: 10px;
}

.super-search {
  &- {
    &tag-outter.disabled {
      cursor: not-allowed;
    }
    &tag-close {
      .tagClose();
    }
    &modal {
      .flex-side {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .no-event {
        --webkit-pointer-events: none;
        pointer-events: none;
      }
      .ivu-modal {
        top: 50px;

        @media (max-width: 1366px) {
          top: 10px;
        }

        &- {
          &header {
            display: none;
          }
        }
      }

      .super-search- {
        &container {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        &condition {
          font-size: 13px;
          color: #333;
          transition: color 0.2s ease-out;

          &.selected {
            color: #4a90e2;
          }
        }
        &title {
          padding-top: 0;
          font-size: 14px;
          color: #333;
        }
        &list-item {
          display: inline-block;
          margin-right: 15px;
          padding-right: 54px;
          border-right: 1px solid #eee;
          cursor: default;

          &:last-child {
            border-right: none;
          }
        }
        &tag {
          color: #4a90e2;
          background: #e2edff;
          border-radius: 10px;

          .ivu-tag-text {
            color: inherit;
          }
          .ivu-icon-ios-close {
            color: inherit;
          }
        }
        &tag-close {
          .tagClose();
        }
        &searcher .ivu-input:not(:focus) {
          border: 1px solid #eee;
          background: #f7f7f7;
        }

        &footer {
          margin-top: 10px;
          text-align: right;

          .ivu-btn {
            width: 89px;
          }
          button + button {
            margin-left: 10px;
          }
        }

        &transfer {
          &- {
            &header {
              margin-bottom: 5px;
              padding: 2px 10px;
              border-bottom: 1px solid #eee;
              background: #f7f7f7;
            }
            &title {
              font-size: 13px;
              font-weight: 500;
              color: #586277;

              > span {
                margin-left: 5px;
              }
            }
            &btn {
              padding: 4px 11px;

              + button {
                margin-left: 5px;
              }
            }
            &searcher {
              padding: 2px 7px;
            }
            &list {
              position: relative;
              width: 316px;
              border: 1px solid #eee;
            }
            &list-content {
              height: 500px;
              overflow: auto;
              padding: 2px 7px;
              transform: translateZ(0);
              backface-visibility: hidden;

              @media (max-width: 1366px) {
                height: 300px;
              }
            }
            &list-item {
              position: relative;
              padding: 5px;
              white-space: nowrap;
              cursor: pointer;

              &:hover {
                background: #efefef;
              }

              &::before {
                content: "";
                position: absolute;
                .size(2em, 100%);
                z-index: 3;
              }

              .ivu-tooltip {
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            &empty-text {
              position: absolute;
              left: 50%;
              margin-left: -34px;
              padding: 10px;
              text-align: center;
            }
            &indicator {
              display: block;
              position: relative;
              .size(28px, 26px);
              margin: 10px 0;
              padding: 0;
              line-height: 1;
              border-radius: 3px;
            }
          }
        }
      }
    }
    &popper {
      .super-search- {
        &select-box {
          width: 176px;
        }
        &select {
          max-height: 650px;
          overflow: auto;
          padding: 8px 5px;
          border: 1px solid #dcdee2;
          cursor: pointer;

          @media (max-width: 1366px) {
            max-height: 420px;
          }
        }
        &option {
          padding: 0 2px;
          font-size: 14px;
          color: #000;
          transition: color 0.2s ease-out, background-color 0.2s ease-out;

          &:hover,
          &.current {
            position: relative;
            background: #eee;
          }
          &.current::after {
            content: "";
            position: absolute;
            top: 50%;
            right: 1px;
            .square(1em);
            margin-top: -0.5em;
            background: #2d8cf0;
            border-radius: 50%;
            transform: scale(1);
            animation: hf-dot 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
          }
          &.selected {
            color: #fff;
            background: rgb(53, 154, 255);

            &::after,
            &.current::after {
              background: #b9f0ff;
            }
          }
        }
        &table {
          width: 360px;
        }
      }
    }
  }
}

@keyframes hf-dot {
  from {
    transform: scale(0);
  }
}
</style>
<template>
  <div class="super-search">
    <!-- result start -->
    <div class="super-search-results">
      <div v-show="chosenItems.length">
        <Tag :closable="!disabled"
             class="super-search-tag-outter"
             :class="{disabled: disabled}"
             v-for="(item, index) in chosenItems"
             :key="index"
             @on-close="onRemove(item, index)"
             @click.native="toggleShow(true)">{{item.descript}}</Tag>
        <img v-show="!disabled"
             :src="imgSrc"
             width="16"
             alt="close-all"
             class="super-search-tag-close"
             @click="onRemoveAll">
      </div>
      <Button v-show="!chosenItems.length"
              :disabled="disabled"
              @click="toggleShow(true)">{{placeholder}}</Button>
    </div>
    <!-- result end -->

    <!-- modal start -->
    <Modal v-model="show"
           class="super-search-modal"
           width="725"
           :closable="false"
           :mask-closable="false"
           footer-hide>
      <h1 class="super-search-container super-search-title">{{title}}</h1>
      <div class="flex-side super-search-container super-search-bar">
        <div class
             style>
          <ul class="super-search-list">
            <li v-for="(term, index) in conditions"
                :key="index"
                class="super-search-list-item">
              <Poptip placement="bottom-start"
                      popper-class="super-search-popper"
                      :transfer="true">
                <span class="super-search-condition"
                      :class="{selected: term.selection.length}">{{term.title}}
                  <Icon type="ios-arrow-down" />
                </span>
                <div class="clearfix"
                     slot="content">
                  <div v-if="term.list"
                       class="left super-search-select-box mr10">
                    <ul class="super-search-select">
                      <li class="super-search-option"
                          v-for="(item, index) in term.list"
                          :class="{selected: item.selected, current: term.clickedIndex === index}"
                          :key="index"
                          @click="setTableData(term, item, index)">{{`${item.descript}(${item.code})`}}</li>
                    </ul>
                  </div>
                  <div class="right super-search-table">
                    <Table ref="table"
                           border
                           :columns="term.columns"
                           :data="term.data"
                           :loading="term.loading"
                           :height="term.height"
                           @on-selection-change="onSelectionChange($event, term, index)"></Table>
                  </div>
                </div>
              </Poptip>
            </li>
          </ul>
          <!-- <ul class="super-search-list">
            <li class="super-search-list-item">
              <Poptip placement="bottom-start"
                      popper-class="super-search-popper"
                      :transfer="true">
                <span class="super-search-condition"
                      :class="{selected: condition.region.selection.length}">区域
                  <Icon type="ios-arrow-down" />
                </span>
                <div class="clearfix"
                     slot="content">
                  <div class="right super-search-table">
                    <Table ref="regionTable"
                           border
                           :columns="condition.columns"
                           :data="condition.region.data"
                           :loading="condition.region.loading"
                           :height="condition.region.height"
                           @on-selection-change="onSelectRegion"></Table>
                  </div>
                </div>
              </Poptip>
            </li>
            <li class="super-search-list-item">
              <Poptip placement="bottom-start"
                      popper-class="super-search-popper"
                      :transfer="true">
                <span class="super-search-condition"
                      :class="{selected: condition.city.selection.length}">城市
                  <Icon type="ios-arrow-down" />
                </span>
                <div class="clearfix"
                     slot="content">
                  <div class="left super-search-select-box mr10">
                    <ul class="super-search-select">
                      <li class="super-search-option"
                          :class="{selected: item.selected, current: condition.city.clickedIndex === index}"
                          v-for="(item, index) in condition.city.list"
                          :key="index"
                          @click="setCity(item, index)">{{`${item.descript}(${item.code})`}}</li>
                    </ul>
                  </div>
                  <div class="right super-search-table">
                    <Table ref="cityTable"
                           border
                           :columns="condition.columns"
                           :data="condition.city.data"
                           :loading="condition.city.loading"
                           :height="condition.city.height"
                           @on-selection-change="onSelectCity"></Table>
                  </div>
                </div>
              </Poptip>
            </li>
            <li class="super-search-list-item">
              <Poptip placement="bottom-start"
                      popper-class="super-search-popper"
                      :transfer="true">
                <span class="super-search-condition"
                      :class="{selected: condition.brand.selection.length}">品牌
                  <Icon type="ios-arrow-down" />
                </span>
                <div class="clearfix"
                     slot="content">
                  <div class="right super-search-table">
                    <Table ref="brandTable"
                           border
                           :columns="condition.columns"
                           :data="condition.brand.data"
                           :loading="condition.brand.loading"
                           :height="condition.brand.height"
                           @on-selection-change="onSelectBrand"></Table>
                  </div>
                </div>
              </Poptip>
            </li>
            <li class="super-search-list-item">
              <Poptip placement="bottom-start"
                      popper-class="super-search-popper"
                      :transfer="true">
                <span class="super-search-condition"
                      :class="{selected: condition.manageType.selection.length}">管理类型
                  <Icon type="ios-arrow-down" />
                </span>
                <div class="clearfix"
                     slot="content">
                  <div class="right super-search-table">
                    <Table ref="manageTypeTable"
                           border
                           :columns="condition.columns"
                           :data="condition.manageType.data"
                           :loading="condition.manageType.loading"
                           :height="condition.manageType.height"
                           @on-selection-change="onSelectManageType"></Table>
                  </div>
                </div>
              </Poptip>
            </li>
          </ul> -->
        </div>
        <div class>
          <Input v-if="noTip"
                 v-model.trim="condition.keyword"
                 search
                 clearable
                 :disabled="condition.searchDisabled"
                 placeholder="关键字"
                 class="super-search-searcher"
                 style="width: 166px;"
                 @on-search="search" />

          <Poptip v-else
                  trigger="focus"
                  title=""
                  content="点击右侧图标或者输入酒店描述关键字后按下回车即可搜索">
            <Input v-model.trim="condition.keyword"
                   search
                   clearable
                   :disabled="condition.searchDisabled"
                   placeholder="关键字"
                   class="super-search-searcher"
                   style="width: 166px;"
                   @on-search="search" />
          </Poptip>
        </div>
      </div>
      <!-- search tag start -->
      <div class="super-search-container super-search-tag-box"
           v-show="condition.result.length">
        <Tag closable
             class="super-search-tag"
             v-for="(item, index) in condition.result"
             :key="index"
             @on-close="onDelete(item, index)">{{item.descript}}</Tag>
        <!-- <div class="super-search-tag-list">
        </div>-->
        <img :src="imgSrc"
             width="16"
             alt="close-all"
             class="super-search-tag-close"
             @click="onDeleteAll">
      </div>
      <!-- search tag end -->
      <!-- transfer start -->
      <!-- <Transfer
        :data="data4"
        filterable
        :target-keys="targetKeys4"
        :render-format="render4"
        :titles="titles"
        :list-style="listStyle"
        class="super-search-container"
        @on-change="handleChange4"
      ></Transfer>-->
      <div class="flex-side super-search-container ivu-transfer super-search-transfer super-search-container">
        <div class="super-search-transfer-list">
          <div class="flex-side super-search-transfer-header">
            <h1 class="super-search-transfer-title">
              未选
              <span>({{unselected.selection.length}}/{{unselected.wholeList.length}})</span>
            </h1>
            <div class>
              <Button type="default"
                      class="super-search-transfer-btn"
                      :disabled="moveToRightClass.allDisabled"
                      @click="onLeftCheckAll(true)">全选</Button>
              <Button type="default"
                      class="super-search-transfer-btn"
                      :disabled="moveToRightClass.allDisabled"
                      @click="onLeftCheckAll(false)">反选</Button>
            </div>
          </div>
          <div class="super-search-transfer-searcher">
            <Input v-model.trim="unselected.keyword"
                   search
                   clearable
                   placeholder="请输入搜索内容"
                   size="small"
                   @on-change="changeLeftKeyword" />
          </div>
          <p class="super-search-transfer-empty-text"
             v-show="!unselected.list.length">暂无数据</p>
          <ul class="super-search-transfer-list-content">
            <li class="flex-side super-search-transfer-list-item"
                v-for="(item, index) in unselected.list"
                :key="index"
                @click="check(item, true)">
              <Tooltip :content="item.content"
                       :transfer="true"
                       :delay="1000"
                       theme="dark">
                <Checkbox v-model="item.checked"></Checkbox>
                <span class="no-event">{{item.content}}</span>
              </Tooltip>
              <!-- <div>
                <Checkbox v-model="item.checked"></Checkbox>
                <span class="no-event">{{`${item.descript}(${item.code})`}}</span>
              </div> -->
              <span class="no-event">{{item.extra}}</span>
            </li>
          </ul>
          <Spin size="large"
                fix
                v-if="unselected.loading"></Spin>
        </div>
        <div class="super-search-transfer-indicator-list">
          <Button :type="moveToRightClass.allType"
                  class="super-search-transfer-indicator"
                  :disabled="moveToRightClass.allDisabled"
                  @click="onMoveToRightAll">
            <Icon type="ios-arrow-forward" />
            <Icon type="ios-arrow-forward"
                  style="margin-left: -4px;" />
          </Button>
          <Button :type="moveToRightClass.singleType"
                  class="super-search-transfer-indicator"
                  :disabled="moveToRightClass.singleDisabled"
                  @click="onMoveToRight">
            <Icon type="ios-arrow-forward" />
          </Button>
          <Button :type="moveToLeftClass.singleType"
                  class="super-search-transfer-indicator"
                  :disabled="moveToLeftClass.singleDisabled"
                  @click="onMoveToLeft">
            <Icon type="ios-arrow-back" />
          </Button>
          <Button :type="moveToLeftClass.allType"
                  class="super-search-transfer-indicator"
                  :disabled="moveToLeftClass.allDisabled"
                  @click="onMoveToLeftAll">
            <Icon type="ios-arrow-back"
                  style="margin-right: -4px;" />
            <Icon type="ios-arrow-back" />
          </Button>
        </div>
        <div class="super-search-transfer-list">
          <div class="flex-side super-search-transfer-header">
            <h1 class="super-search-transfer-title">
              已选
              <span>({{selected.selection.length}}/{{selected.wholeList.length}})</span>
            </h1>
            <div class>
              <Button type="default"
                      class="super-search-transfer-btn"
                      :disabled="moveToLeftClass.allDisabled"
                      @click="onRightCheckAll(true)">全选</Button>
              <Button type="default"
                      class="super-search-transfer-btn"
                      :disabled="moveToLeftClass.allDisabled"
                      @click="onRightCheckAll(false)">反选</Button>
            </div>
          </div>
          <div class="super-search-transfer-searcher">
            <Input v-model.trim="selected.keyword"
                   search
                   clearable
                   placeholder="请输入搜索内容"
                   size="small"
                   @on-change="changeRightKeyword" />
          </div>
          <p class="super-search-transfer-empty-text"
             v-show="!selected.list.length">暂无数据</p>
          <ul class="super-search-transfer-list-content">
            <li class="flex-side super-search-transfer-list-item"
                v-for="(item, index) in selected.list"
                :key="index"
                @click="check(item, false)">
              <!-- <div>
                <Checkbox v-model="item.checked"></Checkbox>
                <span>{{item.descript}}</span>
              </div> -->
              <Tooltip :content="item.content"
                       :transfer="true"
                       :delay="1000"
                       theme="dark">
                <Checkbox v-model="item.checked"></Checkbox>
                <span class="no-event">{{item.content}}</span>
              </Tooltip>
              <span>{{item.extra}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- transfer end -->
      <div class="super-search-footer">
        <Button type="primary"
                @click="toSave">提交</Button>
        <Button @click="toggleShow(false)">取消</Button>
      </div>
    </Modal>
    <!-- modal end -->
  </div>
</template>
<script>
// import store from "store";
// import request from "@/server/modules/hotelFilter";
// import _ from "lodash";

export default {
  name: "SuperSearch",
  model: {
    prop: "chosenItems",
    event: "input"
  },
  props: {
    title: {
      type: String,
      default: () => "筛选"
    },
    // 搜索条件配置
    columns: {
      type: Array,
      default: () => []
    },
    // 双向绑定数据
    chosenItems: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: () => "请选择"
    },
    codes: [String, Array], //集团代码，支持多个
    disabled: Boolean,
    param: Function,
    url: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      show: false,
      noTip: localStorage.superSearch_noTip,
      conditions: [],
      condition: {
        /* region: {
          value: [],
          list: [],
          data: [],
          loading: false,
          selection: [],
          selIndex: "",
          height: null
        },
        city: {
          value: [],
          list: [],
          data: [],
          loading: false,
          selection: [],
          selections: {},
          selIndex: [],
          height: null
        },
        brand: {
          value: [],
          list: [],
          data: [],
          loading: false,
          selection: [],
          selIndex: "",
          height: null
        },
        manageType: {
          value: [],
          list: [],
          data: [],
          loading: false,
          selection: [],
          selIndex: "",
          height: null
        }, */
        keyword: "",
        searchDisabled: false,
        columns: [
          {
            type: "selection",
            width: 50,
            align: "center"
          },
          {
            title: "代码",
            key: "code",
            width: 120,
            tooltip: true
          },
          {
            title: "描述",
            key: "descript",
            minWidth: 171,
            tooltip: true
          }
        ],
        result: [] //最终搜索条件
      },
      //  未选列表
      unselected: {
        loading: false,
        selection: [],
        list: [],
        keyword: "",
        wholeList: []
        // backupList: []
      },
      // 已选列表
      selected: {
        selection: [],
        list: [],
        keyword: "",
        wholeList: []
      },
      imgSrc:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAzxJREFUWAnNV89LG0EUflliPBhCzEFiFEXsQQrJQWzQnNprC4Jn/4L22Guhh0KvHtu/oOeC0IsICf5KoMeCpx5jUkiMMY1gk2j6fZOdZdPuL4OpfbD7ZmfezPfNezNvZkMSUPr9fqTVaj2D3sTzGN1S0Cl2D4VCFagK9Cme3VgslofusM1PQn4G7XY72el03sJuG0/Mz95sb0F/ikQi76LR6A+vPq4EMLvJZrP5Bvo1BpjyGsSj7Qqe2InH4++hfznZORIwZ/0ZHdadOo1QV4I3tpy88ReBRqORAcAXPPMjAHl1KaPxeSKR+GY3GiJgzvwrDO4bXGOW4Ykndk8YuoUxx2Kj28cFTqh5YhBL41oEuOBQeV8x1+M76XUTS7WpEJiu/46aUVe7E5BX3RVC8YihUB4w97kn+OXlpdzc3HgNqtrgXrm4uPCzmzIxxUCHCKyZZFyl2+3K3t6eFAoFYdlNbm9vpVgsyv7+vpyfn7uZ6fptYhtMr6jxzHATExOyvLws2KJydHQkvV5PD2JpgpdKJTk7O5PZ2VmZnp622lwKMWLTA5suBkPVq6ursrS0JPV6XZGwh0PPXIPncjkxDGt9D41j/yA2CfBgCSRra2uysLAgtVpNjo+PhcAavFKpqJkHBScgscPQ6kQLxABG2WxWgZbLZTk5OeFJKKOAm3ipEOL6Ex/RoARoB+YKnMAUxvwuM1edBq+2f6Bs1rpIt5OEFnphROkb6DyYRsARuA0PDw+lWq3K3Nycmj09we1HYncRYFfpgcAECH5wcKAW4eLiomxsbCjXMwQkwW1o90wAMhV64DSAoVxfX0s+n1e5gDmBi5Gu53Zj/EmC2/AuJIhNArt+BOhaZkGm45WVFWFOsIsmkUwmhbsjKAliG7xAYjDe4VyFBMLhsGQyGUmn0452f5Jg1vSRlrq80gjGH6Be+nQI1EyyzJYzMzN+9h9xO3r1fxzHPJcRjx0/yvfVTix9LbMyCLbPJM7xAkDGfSsq4aR8ChLqmm5lQlbw6gwCvL2OS3gp3dLgBLEI8MN0ywsUx0FCXcu164lHsUIw+By8H/THRBPhmniwXzNNgtr0xr//ObWTYBkeGcvv+W8yALLSE0+FfgAAAABJRU5ErkJggg=="
    };
  },
  computed: {
    co() {
      return this.columns;
    },
    moveToRightClass() {
      let hasItem = !!this.unselected.list.length,
        hasSelection = !!this.unselected.selection.length,
        primary = "primary",
        defaults = "default";

      return {
        allType: hasItem ? primary : defaults,
        allDisabled: !this.unselected.loading ? (hasItem ? false : true) : true,
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
        allDisabled: !this.unselected.loading ? (hasItem ? false : true) : true,
        singleType: hasSelection ? primary : defaults,
        singleDisabled: hasSelection ? false : true
      };
    },
    // 搜索参数
    searchParam() {
      let result = this.condition.result,
        handler = type =>
          result
            .filter(e => e.type === type)
            .map(e => e.code)
            .join(",");
      return {
        hotelGroupCodes: this.groupCodes,
        zoneCodes: handler("region"),
        brandCodes: handler("brand"),
        manageTypes: handler("manageType"),
        cityCodes: handler("city"),
        descript: encodeURI(`%${this.condition.keyword}%`)
      };
    }
  },
  methods: {
    formParam(obj) {
      let arr = [],
        i;
      for (i in obj) {
        arr.push(`${i}=${obj[i] || ""}`);
      }
      return arr.join("&");
    },
    setTableData(term, item, index) {
      if (term.loading) return;
      console.log(item, index);
      term.data = [];
      term.clickedIndex = index;
      /* this.condition.city.value.indexOf(item.code) === -1 &&
        this.condition.city.value.push(item.code); */
      if (term.onSelected) {
        term.onSelected(item);
        return;
      }

      let params = term.getParam ? term.getParam(item) : {};

      if (!term.dataUrl) return;
      term.loading = true;
      this.$http
        .get(term.dataUrl, { params })
        .then(res => {
          let data = term.dataPath ? res.data[term.dataPath] : res.data,
            type = this.conditions.indexOf(term),
            parentCode = term.map ? term.map.parentCode : "parentCode",
            each;

          this.setSelected(data, type);
          term.data = data.map(e => {
            each = {
              code: e.code,
              descript: e.descript,
              _type: type,
              _checked: e._checked
            };
            each[parentCode] = item.code;
            return each;
          });
          this.setTableHeight(type);
          setTimeout(() => {
            term.loading = false;
          }, 500);
        })
        .catch(err => {
          console.log(err);
          setTimeout(() => {
            term.loading = false;
          }, 500);
        });
    },
    onSelectionChange(rows, item, index) {
      this[item.list ? "onSelectRows" : "setCondition"](rows, item, index);
    },
    onSelectRows(rows, item, index) {
      console.log(rows);

      let parentCode = item.list[item.clickedIndex].code,
        news = [];
      item.selections[parentCode] = rows;
      for (let k in item.selections) {
        news = news.concat(item.selections[k]);
      }
      // item.selection = news.reduce((last, now) => last.concat(now), [])
      item.selection = [].concat(...news);
      this.setConditionResult();
      this.setListStatus(item);
    },
    onSelectBrand(rows) {
      this.setCondition(rows, "brand");
    },
    setListStatus(item) {
      let parentCode = item.map ? item.map.parentCode : "parentCode";
      let children = this.condition.result.filter(e => e[parentCode]);
      item.list.forEach(e => {
        e.selected = children.filter(ce => ce[parentCode] === e.code).length;
      });
    },
    setSelected(data, type) {
      if (!this.condition.result.length) return;
      let selections = JSON.parse(
          JSON.stringify(this.condition.result.filter(e => e._type === type))
        ),
        i,
        len;
      data.forEach(e => {
        len = selections.length;
        for (i = 0; i < len; i++) {
          if (
            e.code !== selections[i].code ||
            e.descript !== selections[i].descript
          )
            continue;
          e._checked = true;
          selections.splice(i, 1);
          break;
        }
      });
    },
    setCondition(rows, item, type) {
      this.conditions[type].selIndex = this.conditions[type].clickedIndex;
      this.conditions[type].selection = rows;
      this.setConditionResult();
    },
    // 最终所选条件
    setConditionResult() {
      let arr = [];
      this.conditions.forEach(e => {
        if (e.selection.length) arr = arr.concat(e.selection);
      });
      this.condition.result = arr;
    },
    // 删除单个条件tag
    onDelete(item, index) {
      this.condition.result.splice(index, 1);
      let term = this.conditions[item._type],
        selection = term.selection,
        isChild = !!term.list,
        parentCode = term.map ? term.map.parentCode : "parentCode";
      selection.splice(selection.indexOf(item), 1);

      if (isChild) {
        selection = term.selections[item[parentCode]];
        selection.splice(selection.indexOf(item), 1);
      }

      console.log(item);
      let condition = this.conditions[item._type];
      // condition.selIndex = [];
      let i,
        len = condition.data.length;
      for (i = 0; i < len; i++) {
        if (condition.data[i].code === item.code) {
          console.log(i);
          this.$refs.table[item._type].$el
            .querySelector(".ivu-table-tbody")
            .children[i].querySelector(".ivu-checkbox-wrapper")
            .click();
          break;
        }
      }
      isChild && this.setListStatus(term);
    },
    // 删除所有条件tag
    onDeleteAll() {
      // let types = ["region", "city", "brand", "manageType"]; //,i=0

      /* let reset = type => {
        this.condition[type].data.forEach(de => {
          de._checked = false
        })
        arr = this.condition[type].data
        this.condition[type].data = []
        this.condition[type].selection = []
        this.condition[type].selections = []
        this.$nextTick(() => {
          this.condition[type].data = arr
          i++
          i < 4 ? reset(types[i]) : this.condition.result = []
        })
      }
      reset(types[0]) */
      this.conditions.forEach((e, i) => {
        e.list &&
          e.list.forEach(e => {
            e.selected = false;
          });
        e.data.forEach(de => {
          de._checked = false;
        });
        let arr = e.data;
        e.data = [];
        e.selection = [];
        e.selections = {};
        this.$nextTick(() => {
          e.data = arr;
        });
        i >= this.conditions.length - 1 && (this.condition.result = []);
      });
    },
    check(item, flag) {
      console.log(item);
      item.checked = !item.checked;
      flag ? this.changeUnselected() : this.changeSelected();
    },
    changeUnselected() {
      this.unselected.selection = this.unselected.wholeList.filter(
        e => e.checked
      );
    },
    changeSelected() {
      this.selected.selection = this.selected.wholeList.filter(e => e.checked);
    },
    // 左侧全选反选
    onLeftCheckAll(flag) {
      if (flag) {
        this.unselected.list.forEach(e => {
          e.checked = true;
        });
        this.changeUnselected();
        return;
      }
      this.unselected.list.forEach(e => {
        e.checked = !e.checked;
      });
      this.changeUnselected();
    },
    // 右侧全选反选
    onRightCheckAll(flag) {
      if (flag) {
        this.selected.list.forEach(e => {
          e.checked = true;
        });
        this.changeSelected();
        return;
      }
      this.selected.list.forEach(e => {
        e.checked = !e.checked;
      });
      this.changeSelected();
    },
    // 从某数组移除同时存在于另一数组的数据
    remove(outter, inner, callback) {
      let i, which, index;
      for (i = 0; i < inner.length; i++) {
        which = inner[i];
        index = outter.indexOf(which);
        index !== -1 && outter.splice(index, 1) && i--;
        typeof callback === "function" && callback(which);
      }
    },
    // 删除外部单个已有酒店tag
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
    // 删除所有酒店tag
    onRemoveAll() {
      this.selected.keyword = "";
      this.selected.list = this.selected.wholeList;
      this.onMoveToLeftAll(() => {
        this.$emit("input", this.selected.wholeList);
        this.$nextTick(() => {
          this.$emit("changed");
        });
      });
    },
    // 移至右侧
    onMoveToRight() {
      // console.log(this.unselected.selection)
      let i,
        arr = [],
        which,
        index;
      for (i = 0; i < this.unselected.selection.length; i++) {
        which = this.unselected.selection.splice(i, 1)[0];
        which.checked = false;
        index = this.unselected.list.indexOf(which);
        index !== -1 && this.unselected.list.splice(index, 1);
        index = this.unselected.wholeList.indexOf(which);
        index !== -1 && this.unselected.wholeList.splice(index, 1);
        this.selected.wholeList.every(e => e.code !== which.code) &&
          arr.push(which);
        i--;
      }
      this.$nextTick(() => {
        this.selected.list = arr.concat(this.selected.list);
        this.selected.wholeList = arr.concat(this.selected.wholeList);
      });
    },
    // 移动左侧所选及当前展示列表至右侧
    onMoveToRightAll() {
      /*let i,
        unselectedList = this.unselected.list,
        unselectedSels = this.unselected.selection,
        which,
        index
      for (i = 0; i < unselectedSels.length; i++) {
        which = unselectedSels[i]
        which.checked = false
        index = unselectedList.indexOf(which)
        index !== -1 && unselectedList.splice(index, 1) && i--
      }*/
      this.remove(this.unselected.list, this.unselected.selection, which => {
        which.checked = false;
      });
      this.remove(this.unselected.wholeList, this.unselected.selection);

      this.$nextTick(() => {
        let concats = this.unselected.list.concat(this.unselected.selection);
        // concats.concat(this.selected.list).filter(e => this.selected.list.every(se => se.code !== e.code))
        concats.concat(this.selected.list).forEach(e => {
          this.selected.list.every(se => se.code !== e.code) &&
            this.selected.list.unshift(e);
        });
        concats.concat(this.selected.wholeList).forEach(e => {
          this.selected.wholeList.every(se => se.code !== e.code) &&
            this.selected.wholeList.unshift(e);
        });

        this.unselected.selection = [];
        if (this.unselected.list.length === this.unselected.wholeList.length) {
          this.unselected.list = [];
          this.unselected.wholeList = [];
          return;
        }
        /*for (i = 0; i < this.unselected.list.length; i++) {
          // which = unselectedList[i]
          index = this.unselected.wholeList.indexOf(unselectedList[i])
          index !== -1 && this.unselected.wholeList.splice(index, 1) && i--
        }*/
        this.remove(this.unselected.wholeList, this.unselected.list);
        this.unselected.list = [];
      });
    },
    // 移至左侧
    onMoveToLeft() {
      // console.log(this.selected.selection)
      let i,
        arr = [],
        which,
        index;
      for (i = 0; i < this.selected.selection.length; i++) {
        which = this.selected.selection.splice(i, 1)[0];
        which.checked = false;
        index = this.selected.list.indexOf(which);
        index !== -1 && this.selected.list.splice(index, 1);
        index = this.selected.wholeList.indexOf(which);
        index !== -1 && this.selected.wholeList.splice(index, 1);
        this.unselected.wholeList.every(e => e.code !== which.code) &&
          arr.push(which);
        i--;
      }
      this.$nextTick(() => {
        this.unselected.list = arr.concat(this.unselected.list);
        this.unselected.wholeList = arr.concat(this.unselected.wholeList);
      });
    },
    // 移动右侧所选及当前展示列表至左侧
    onMoveToLeftAll(callback) {
      this.remove(this.selected.list, this.selected.selection, which => {
        which.checked = false;
      });
      this.remove(this.selected.wholeList, this.selected.selection);

      this.$nextTick(() => {
        let concats = this.selected.list.concat(this.selected.selection);

        concats.concat(this.unselected.list).forEach(e => {
          this.unselected.list.every(se => se.code !== e.code) &&
            this.unselected.list.unshift(e);
        });
        concats.concat(this.unselected.wholeList).forEach(e => {
          this.unselected.wholeList.every(se => se.code !== e.code) &&
            this.unselected.wholeList.unshift(e);
        });

        this.selected.selection = [];
        if (this.selected.list.length === this.selected.wholeList.length) {
          this.selected.list = [];
          this.selected.wholeList = [];
          typeof callback === "function" && callback();
          return;
        }
        this.remove(this.selected.wholeList, this.selected.list);
        this.selected.list = [];
      });
    },
    getParam(res) {
      let map = {},
        arr = [];
      res.forEach(e => {
        this.columns.forEach((ce, i) => {
          if (e._type === i) {
            map[ce.name]
              ? map[ce.name].push(e.code)
              : (map[ce.name] = [e.code]);
          }
        });
      });
      for (let k in map) {
        arr.push(`${k}=${map[k].join(",")}`);
      }
      console.log(arr);
      return arr.join("&");
    },
    // 查询
    async searchByConditions() {
      let param =
        typeof this.param === "function"
          ? this.param(this.condition.result)
          : this.getParam(this.condition.result);
      this.condition.searchDisabled = true;
      this.unselected.loading = true;
      let res = await this.$http
        .get(this.url + "?" + param)
        .then(res =>
          res && res.data && res.data.result ? res.data.retVal : false
        );
      console.log(res);
      this.unselected.loading = false;
      if (!res) return;
      res = res.map(e => {
        return {
          checked: false,
          code: e.code,
          hotelGroupCode: e.hotelGroupCode,
          descript: e.descript,
          extra: e.extra || "",
          content: `${e.descript} (${e.code})`
        };
      });
      this.unselected.list = res;
      this.unselected.wholeList = res;
      setTimeout(() => {
        this.condition.searchDisabled = false;
      }, 1000);
      // this.unselected.backupList = _.cloneDeep(res);
    },
    search() {
      if (this.unselected.loading) return;
      this.unselected.list = [];
      this.unselected.wholeList = [];
      this.unselected.selection = [];
      this.unselected.keyword = "";
      this.searchByConditions();
      if (!this.noTip) {
        this.noTip = true;
        localStorage.hotelFilter_noTip = 1;
      }
      /* setTimeout(() => {
        let arr = [];
        for (let i = 65; i < 123; i++) {
          arr.push({
            checked: false,
            descript: `假装是酒店${String.fromCharCode(i)}`,
            extra: "杭州",
            code: `HOTEL${String.fromCharCode(i)}`
          });
        } */
      // }, 1000);
    },
    // 左侧列表本地搜索
    changeLeftKeyword(e) {
      // console.log(e);
      let value = e.target.value.trim().toUpperCase();
      if (!value) {
        this.unselected.list = this.unselected.wholeList;
        return;
      }
      this.unselected.list = this.unselected.wholeList.filter(
        e =>
          e.descript.toUpperCase().indexOf(value) !== -1 ||
          e.code.toUpperCase().indexOf(value) !== -1
      );
    },
    // 右侧列表本地搜索
    changeRightKeyword(e) {
      let value = e.target.value.trim().toUpperCase();
      if (!value) {
        this.selected.list = this.selected.wholeList;
        return;
      }
      this.selected.list = this.selected.wholeList.filter(
        e =>
          e.descript.toUpperCase().indexOf(value) !== -1 ||
          e.code.toUpperCase().indexOf(value) !== -1
      );
    },
    toSave() {
      // this.show = false;
      /* this.$Modal.info({
        title: "已选酒店",
        render: h => {
          let vnodes = this.selected.wholeList.map(e =>
            h("p", `名称：${e.descript}， 代码：${e.code}`)
          );
          return h("div", [vnodes]);
        }
      }); */
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
    setTableHeight(type) {
      if (!this.conditions[type].data.length) {
        this.conditions[type].height = null;
        return;
      }
      this.$nextTick(() => {
        let rect = this.$refs.table[type].$el.getBoundingClientRect(),
          dis = window.innerHeight - rect.top - 20;
        this.conditions[type].height = rect.height >= dis ? dis : null;
        console.log(rect.height, dis, this.conditions[type].height);
      });
    },
    setList() {
      let i,
        len = this.chosenItems.length,
        k,
        ulen = this.unselected.wholeList.length;
      for (i = 0; i < len; i++) {
        for (k = 0; k < ulen; k++) {
          if (
            this.chosenItems[i].code === this.unselected.wholeList[k].code &&
            this.chosenItems[i].descript !==
              this.unselected.wholeList[k].descript
          ) {
            console.log(this.chosenItems[i]);
            this.chosenItems[i].descript = this.unselected.wholeList[
              k
            ].descript;
            break;
          }
        }
      }

      this.selected.wholeList = this.selected.list = this.chosenItems.map(e => {
        return {
          code: e.code,
          descript: e.descript,
          content: `${e.descript} (${e.code})`,
          extra: e.extra || "",
          hotelGroupCode: e.hotelGroupCode || ""
        };
      });
      /* this.unselected.wholeList.forEach(e => {
        this.selected.wholeList
      }) */
    },
    toggleShow(flag) {
      if (this.disabled) return;
      this.show = flag;
      !flag &&
        setTimeout(() => {
          this.clear();
          this.unselected.list = this.unselected.wholeList;
          this.selected.list = this.selected.wholeList;

          this.chosenItems.length
            ? this.selected.wholeList.forEach(e => {
                this.chosenItems.every(ce => ce.code !== e.code) &&
                  this.selected.selection.push(e);
              })
            : (this.selected.selection = this.selected.wholeList);
          this.selected.selection.length && this.onMoveToLeft();

          this.chosenItems.length &&
            this.unselected.wholeList.forEach(e => {
              this.chosenItems.every(ce => ce.code === e.code) &&
                this.unselected.selection.push(e);
            });
          this.unselected.selection.length && this.onMoveToRight();
        }, 350);

      // this.setList();
      /* this.unselected.wholeList = this.unselected.list = _.cloneDeep(
        this.unselected.backupList
      ); */
    },
    clear() {
      // this.condition.city.data = [];
      // this.condition.city.clickedIndex = "";
      this.unselected.keyword = "";
      this.selected.keyword = "";
      this.condition.keyword = "";
      this.unselected.wholeList.forEach(e => {
        e.checked = false;
      });
      this.selected.wholeList.forEach(e => {
        e.checked = false;
      });
      this.unselected.selection = [];
      this.selected.selection = [];
      this.onDeleteAll();
    }
  },
  created() {
    console.log("sc created", this.disabled);
    window.sc = this;
    if (this.disabled) return;
  },
  mounted() {
    /* this.conditions = this.columns.map(e => {
      return Object.assign(
        {
          loading: false,
          clickedIndex: undefined,
          selection: [],
          selections: {},
          selIndex: [],
          height: undefined
        },
        e
      );
    });
    this.conditions.forEach((e, i) => {
      e.listUrl &&
        this.$http.get(e.listUrl).then(res => {
          let data = !e.listPath ? res.data : res.data[e.listPath];
          e.list = data.map(de => {
            return {
              code: de.code,
              descript: de.descript,
              selected: false
            };
          });
          this.conditions[i].list = e.list;
        });
      e.autoGetData &&
        e.dataUrl &&
        this.$http.get(e.dataUrl).then(res => {
          console.log(res);
          let data = !e.dataPath ? res.data : res.data[e.dataPath],
            parentCode = e.map ? e.map.parentCode : "parentCode",
            each;
          e.data = data.map(de => {
            each = {
              code: de.code,
              descript: de.descript,
              _type: i
            };
            each[parentCode] = de[parentCode];
            return each;
          });
          console.log(e);
          this.conditions[i].data = e.data;
        });
    }); */
    document.querySelectorAll(".super-search-popper").forEach(e => {
      e.onmousedown = e => {
        e.stopPropagation();
      };
    });
  },
  watch: {
    columns: {
      handler(val) {
        console.log("columns");
        this.conditions = this.columns.map(e => {
          return Object.assign(
            {
              loading: false,
              clickedIndex: undefined,
              selection: [],
              selections: {},
              selIndex: [],
              height: undefined
            },
            e
          );
        });
        this.conditions.forEach((e, i) => {
          e.listUrl &&
            this.$http.get(e.listUrl).then(res => {
              let data = !e.listPath ? res.data : res.data[e.listPath];
              e.list = data.map(de => {
                return {
                  code: de.code,
                  descript: de.descript,
                  selected: false
                };
              });
              this.conditions[i].list = e.list;
            });
          e.autoGetData &&
            e.dataUrl &&
            this.$http.get(e.dataUrl).then(res => {
              console.log(res);
              let data = !e.dataPath ? res.data : res.data[e.dataPath],
                parentCode = e.map ? e.map.parentCode : "parentCode",
                each;
              e.data = data.map(de => {
                each = {
                  code: de.code,
                  descript: de.descript,
                  _type: i
                };
                each[parentCode] = de[parentCode];
                return each;
              });
              console.log(e);
              this.conditions[i].data = e.data;
            });
        });
      },
      immediate: true,
      deep: true
    },
    chosenItems(val) {
      let i;
      for (i = 0; i < val.length; i++) {
        !val[i].code && val.splice(i, 1) && i--;
      }
      this.setList();
    },
    codes(val) {
      this.clear();
      // this.unselected.backupList =
      // this.unselected.wholeList = this.unselected.list = [];
      if (
        this.disabled ||
        !val ||
        !val.length ||
        (val instanceof Array && !val.join(","))
      )
        return;
      this.search();
    }
  }
};
</script>
