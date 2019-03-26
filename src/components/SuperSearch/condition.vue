<template>
  <ul class="super-search-list">
    <li v-for="(term, index) in conditions" :key="index" class="super-search-list-item">
      <Poptip placement="bottom-start" popper-class="super-search-popper" :transfer="true">
        <span class="super-search-condition" :class="{selected: term.selection.length}">{{term.title}}
          <Icon type="ios-arrow-down" />
        </span>
        <div class="clearfix" slot="content">
          <div v-if="term.list" class="left super-search-select-box mr10">
            <ul class="super-search-select">
              <li class="super-search-option" v-for="(item, index) in term.list" :class="{selected: item.selected, current: term.clickedIndex === index}" :key="index" @click="setTableData(term, item, index)">{{`${item.descript}(${item.code})`}}</li>
            </ul>
          </div>
          <div class="right super-search-table">
            <Table ref="table" border :columns="term.columns" :data="term.data" :loading="term.loading" :height="term.height" @on-selection-change="onSelectionChange($event, term, index)"></Table>
          </div>
        </div>
      </Poptip>
    </li>
  </ul>
</template>
<script>
import Mixin from './mixin'

export default {
  name: 'Condition',
  mixins: [Mixin],
  model: {
    prop: 'result',
    trigger: 'input'
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    result: {
      type: Array,
      default: () => []
    },
    codeMap: {
      type: Object,
      default: () => {
        return {
          // parentCode: 'parentCode',
          listCode: 'code',
          listDescript: 'descript',
          dataCode: 'code',
          dataDescript: 'descript'
        }
      }
    }
  },
  data() {
    return {
      conditions: [],
      selfResult: []
    }
  },
  methods: {    
    // set the right table data
    setTableData(term, item, index) {
      if (term.loading) return;
      console.log(item, index);
      term.data = [];
      term.clickedIndex = index;
      // onSelected means user gets data manually
      if (term.onSelected) {
        term.onSelected(item, currTerm);
        return;
      }

      let params = term.getParam ? term.getParam(item) : {};

      if (!term.dataUrl) return;
      term.loading = true;
      this.$http
        .get(term.dataUrl, { params })
        .then(res => {
          let data = term.dataPath ? this.getPath(res.data, term.dataPath) : res.data,
            type = this.conditions.indexOf(term),
            codeMap = Object.assign({}, this.codeMap, term.map),
            each;

          this.setSelected(data, type);
          term.data = data.map(e => {
            return {
              code: e[codeMap.dataCode],
              descript: e[codeMap.dataDescript],
              parentCode: item.code,
              _type: type,
              _checked: e._checked
            };
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
      // this.columns[index].selections = rows;
      for (let k in item.selections) {
        news = news.concat(item.selections[k]);
      }
      // item.selection = news.reduce((last, now) => last.concat(now), [])
      item.selection = [].concat(...news);
      // this.columns[index].selection = [].concat(...news);
      this.setConditionResult();
      this.setListStatus(item);
    },
    // set status of left list
    setListStatus(item) {
      // let parentCode = item.map ? item.map.parentCode : "parentCode";
      let codes = {}
      this.selfResult.forEach(e => {
        !codes[e.parentCode] && (codes[e.parentCode] = 1)
      })
      item.list.forEach(e => {
        e.selected = !!codes[e.code]
      });
    },
    // set status of checkbox in right table through the result
    setSelected(data, type) {
      if (!this.selfResult.length) return;
      let selections = JSON.parse(
          JSON.stringify(this.selfResult.filter(e => e._type === type))
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
      // this.columns[type].selection = rows;
      this.setConditionResult();
    },
    // final result
    setConditionResult() {
      let arr = [];
      this.conditions.forEach(e => {
        if (e.selection.length) arr = arr.concat(e.selection);
      });
      this.selfResult = arr;
      this.$emit('input', arr)
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
        // console.log(rect.height, dis, this.conditions[type].height);
      });
    },
    // delete single condition
    delete(item, index) {
      this.selfResult.splice(index, 1);
      let term = this.conditions[item._type],
        selection = term.selection,
        isChild = !!term.list;
        // parentCode = term.map ? term.map.parentCode : "parentCode";
      selection.splice(selection.indexOf(item), 1);

      if (isChild) {
        selection = term.selections[item.parentCode];
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
      this.$emit('input', this.selfResult)
    },
    deleteAll() {
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
        if(i >= this.conditions.length - 1) {
          this.selfResult = []
          this.$emit('input', this.selfResult)
        };
      });
    }
  },
  watch: {
    columns: {
      handler(val) {
        let selection = {
            type: "selection",
            width: 50,
            align: "center"
          },
          defaultCol = [
            selection,
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
          each
        this.conditions = this.columns.map(e => {
          each = Object.assign({
            loading: false,
            clickedIndex: undefined,
            selection: [],
            selections: {},
            selIndex: [],
            height: undefined
          }, JSON.parse(JSON.stringify(e)));
          if(e.getParam) each.getParam = e.getParam
          !Array.isArray(each.columns) ? each.columns = defaultCol : each.columns.splice(0, 0, selection)
          return each
        });
        // let data
        this.conditions.forEach((e, i) => {
          let codeMap = e.map ? Object.assign({}, this.codeMap, e.map) : this.codeMap
          // handle left list
          e.listUrl &&
            this.$http.get(e.listUrl, { params: e.listParam }).then(res => {
              let data = !e.listPath ? res.data : this.getPath(res.data, e.listPath)
              e.list = data.map(de => {
                return {
                  code: de[codeMap.listCode],
                  descript: de[codeMap.listDescript],
                  selected: false
                };
              });
              // this.conditions[i].list = e.list;
            }).catch(e => console.log(e));

          // handle right table data
          e.autoGetData &&
            e.dataUrl &&
            this.$http.get(e.dataUrl, { params: e.dataParam }).then(res => {
              // console.log(res);
              let data = !e.dataPath ? res.data : this.getPath(res.data, e.dataPath)
              e.data = data.map(de => {
                return {
                  code: de[codeMap.dataCode],
                  descript: de[codeMap.dataDescript],
                  // parentCode: de[codeMap.parentCode]
                  _type: i
                };
              });
              // this.columns[i].data = e.data
              // console.log(e);
              // this.conditions[i].data = e.data;
            }).catch(e => console.log(e));
        });
      },
      immediate: true,
      // deep: true
    }
  },
  created () {
    //window.cd = this
  }
}

</script>
