<script>
import _ from "lodash";
import { InputNumber } from "iview";
export default {
  name: "CustomTable",
  props: {
    hasDelete: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    newModel: {
      type: Boolean,
      default: true
    },
    filterRow: {
      type: Boolean,
      default: false
    },
    addClickBeforeChange: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      dataClone: this.value,
      isInitSuccess: false,
      tableColumnsFilters: [],
      search: {},
      selectionAllCheckbox: false,
      filters: [{ _disabled: true }],
      initMergeEvent: true
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val.length) {
          let hasAddRow = [];
          if (this.newModel) {
            hasAddRow = val.findIndex(item => {
              if (item._customAddButton) {
                return item;
              }
            });
            if (hasAddRow === -1) {
              val.push({
                ...this.getColumnsKey(),
                _customAddButton: true
              });
            }
          } else {
            hasAddRow = val.findIndex(item => {
              if (_.has(item, ["_customAddButton"])) {
                return item;
              }
            });
            if (hasAddRow === -1) {
              // 如果item有值 就去覆盖默认的字段

              const assignKey = this.getColumnsKey();
              val.forEach((item, index) => {
                this.$set(
                  val,
                  index,
                  Object.assign({}, assignKey, item, {
                    _customAddButton: false
                  })
                );
              });
            }
          }
          this.dataClone = val;
          this.$emit("input", this.dataClone);
        } else {
          this.dataClone = val;
          //this.removeData();
          this.addCustomAddButtonKey(this.getColumnsKey());
          this.$emit("input", this.dataClone);
        }
        this.resetFilterSelection();
      },
      deep: true
    },
    columns(val) {
      this.renderFilterTableColumns();
    }
  },
  methods: {
    exportData(params) {
      this.$refs.table.exportCsv(params);
    },
    mergeEvent(events = {}, innerEvent = {}) {
      const arg = Array.from(arguments).slice(2);
      const innerEventName = Object.keys(innerEvent);
      const outEventName = Object.keys(events);
      let eventsList = {};
      //外部没有传入事件
      if (outEventName.length) {
        outEventName.forEach(outName => {
          if (outName in innerEvent) {
            const bindOnChange =
              typeof events[outName] === "function"
                ? events[outName].bind()
                : function() {};
            delete innerEvent[outName];
            events[outName] = function() {
              const innerEventArg = Array.from(arguments);

              const argumentsParams = [...innerEventArg, ...arg];

              typeof innerEvent[outName] === "function" &&
                innerEvent[outName](...argumentsParams);
              bindOnChange(...argumentsParams);
            };
          }
        });
      }
      innerEventName.forEach(innerName => {
        const bindOnChange =
          typeof innerEvent[innerName] === "function"
            ? innerEvent[innerName]
            : function() {};
        eventsList[innerName] = function() {
          const innerEventArg = Array.from(arguments);
          const argumentsParams = [...innerEventArg, ...arg];
          bindOnChange.call(this, ...argumentsParams);
        };
      });
      outEventName.forEach(outName => {
        const bindOnChange =
          typeof events[outName] === "function"
            ? events[outName]
            : function() {};
        eventsList[outName] = function() {
          const innerEventArg = Array.from(arguments);
          const argumentsParams = [...innerEventArg, ...arg];
          bindOnChange.call(this, ...argumentsParams);
        };
      });

      return eventsList;
    },
    resetFilterSelection() {
      this.$set(this.filters[0], "_checked", false);
    },
    // ‘新增’按钮组件
    addComponent(params) {
      return (
        <span
          style={{
            marginRight: "10px",
            cursor: "pointer",
            color: "#4a90e2"
          }}
          on={{
            click: () => {
              if (!this.addClickBeforeChange) {
                this.pushActiveRow(params);
              }
              const addClickBeforeChange = this.addClickBeforeChange();
              if (addClickBeforeChange && addClickBeforeChange.then) {
                addClickBeforeChange.then(() => {
                  this.pushActiveRow(params);
                });
              } else {
                this.pushActiveRow(params);
              }
            }
          }}
        >
          {"新增"}
        </span>
      );
    },
    buttonComponent(params, item, key, button) {
      let event = {};
      const innerEvent = {
        click: event => {
          if (button.key === "delete") {
            this.delete(params.index);
          }
          this.$emit(`${button.key}-click`, [button.key, params]);
        }
      };
      event = this.mergeEvent(params.column.on, innerEvent, button, params);
      // 无限渲染问题

      return (
        <span
          style={{
            marginRight: "10px",
            cursor: "pointer",
            color: "#4a90e2"
          }}
          on={{
            ...event
          }}
        >
          {button["value"]}
        </span>
      );
    },
    inputComponent(params, item, key) {
      let event = {};
      // if (params.column._renderEvent) {

      const innerEvent = {
        input: value => {
          params.row[key] = value;
          this.dataClone[params.index] = params.row;
          this.$emit("input", this.dataClone);
        }
      };

      event = this.mergeEvent(params.column.on, innerEvent, params);

      //this.$set(params.column, "_renderEvent", false);
      // }
      return (
        <Input
          {...{
            props: {
              ...params.column.props,
              placeholder: `请输入${params.column.title}`
            }
          }}
          value={params.row[key]}
          on={{
            ...event
          }}
        />
      );
    },
    linkComponent(params, item, key) {
      //if (params.column._renderEvent) {
      const event = this.mergeEvent(params.column.on, {}, params);
      //   this.$set(params.column, "_renderEvent", false);
      // }
      return (
        <a
          href="javascript:;"
          on={{
            ...event
          }}
        >
          {params.row[key]}
        </a>
      );
    },
    selectComponent(params, item, key) {
      const code = item.code || "code";
      const descript = item.descript || "descript";
      const labelInValue = item.labelInValue ? item.labelInValue : false;
      const innerEvent = {
        "on-change": target => {
          let value = target
            ? params.column.labelInValue
              ? target.value
              : target
            : target;
          params.row[key] = value;
          this.dataClone[params.index] = params.row;
          this.$emit("input", this.dataClone);
          this.$emit("select-on-change", [key, value, params]);
          if (params.column.labelInValue) {
            this.$emit("select-on-change-label", [
              target.label.replace(/[\(](([\s\S])*?)[\)]/g, ""),
              params
            ]);
          }
        }
      };
      const event = this.mergeEvent(params.column.on, innerEvent, params);
      return (
        <i-select
          {...{
            props: {
              ...params.column.props,
              placeholder: `请选择${params.column.title}`
            }
          }}
          value={params.row[key]}
          clearable
          filterable
          transfer={true}
          label-in-value={params.column.labelInValue}
          on={{
            ...event
          }}
        >
          {_.map(item.options, (option, index) => {
            return (
              <i-option value={option[code]} key={index}>
                {option[descript]}
                {labelInValue ? `(${option[code]})` : ""}
              </i-option>
            );
          })}
        </i-select>
      );
    },
    inputNumberComponent(params, item, key) {
      // 1.如果给了默认值  先赋值默认值
      // 2.如果用户再赋值，则覆盖默认值
      // 3.如果默认值和用户赋值均没有，赋值为null;
      let value;
      if (params.column.props.defaultValue) {
        if (key in params.row) {
          value = params.column.props.defaultValue;
        } else {
          value = null;
        }
      }
      if (typeof params.row[key] !== "undefined") {
        if (key in params.row) {
          value = params.row[key];
        } else {
          value = null;
        }
      } else {
        value = null;
      }

      const innerEvent = {
        input: value => {
          params.row[key] = value;
          this.dataClone[params.index] = params.row;
          this.$emit("input", this.dataClone);
          this.$emit("change-number", [item, value]);
        }
      };
      const event = this.mergeEvent(params.column.on, innerEvent, params);
      return (
        <InputNumber
          {...{
            props: {
              ...params.column.props,
              placeholder: `请输入${params.column.title}`
            }
          }}
          value={value}
          active-change={false}
          on={{
            ...event
          }}
        />
      );
    },
    textComponent(params, item, key) {
      const event = this.mergeEvent(params.column.on, {}, params);

      return (
        <p
          {...{ props: params.column.props }}
          on={{
            ...event
          }}
        >
          {params.row[key]}
        </p>
      );
    },
    getComponent(params, item, key) {
      let component;
      const componentType = item.type.toUpperCase();
      if (!params.row._customAddButton) {
        if (componentType === "INPUT") {
          component = this.inputComponent(params, item, key);
        } else if (
          componentType === "INPUTNUMBER" ||
          componentType === "NUMBER"
        ) {
          component = this.inputNumberComponent(params, item, key);
        } else if (componentType === "SELECT") {
          component = this.selectComponent(params, item, key);
        } else if (componentType === "A") {
          component = this.linkComponent(params, item, key);
        } else if (componentType === "P") {
          component = this.textComponent(params, item, key);
        }
      } else {
        component = null;
      }
      return <div class="componentWrapper">{component}</div>;
    },

    renderComponent(params, item) {
      if ("keys" in params.column) {
        const arr = [];
        for (let i = 0; i < item.keys.length; i++) {
          arr.push(this.getComponent(params, item, item.keys[i]));
        }
        return arr;
      } else if ("key" in params.column) {
        const key = params.column.key;
        return this.getComponent(params, item, key);
      }
      //const key = params.column.key;
      //if (item.key instanceof Array) {
      // const arr = [];
      // for (let i = 0; i < item.key.length; i++) {
      //   arr.push(this.getComponent(params, item, item.key[i]));
      // }
      // return arr;
      //} else {
      //return this.getComponent(params, item, key);
      //}
    },
    renderButton(params, item) {
      const key = params.column.key;
      const buttons = [];
      _.map(item.type, button => {
        buttons.push(this.buttonComponent(params, item, key, button));
      });
      return buttons;
    },
    renderFilterTableColumns() {
      this.tableColumnsFilters = [];
      this.columns.forEach(item => {
        let filter = this.copyData(item);

        if (item.key !== "action" && item.type !== "selection") {
          if (item.filter && item.filter.type) {
            filter.render = (h, params) => {
              return this.renderFilterRow(params, item);
            };
          }
        }
        if (item.type === "selection") {
          filter.render = (h, params) => {
            return this.renderFilterSelection(params, item);
          };
          filter.renderHeader = (h, params) => {
            return this.renderFilterHeaderSelection(params, item);
          };
        }

        this.tableColumnsFilters.push(filter);
      });
    },
    renderInitAddButton() {
      const { columns } = this.$props;
      const prop = {};
      _.map(columns, item => {
        if (item.key !== "action") {
          item.type = item.type ? item.type : "";
          if (Array.isArray(item.key)) {
            _.map(item.key, i => {
              if (
                item.type.toUpperCase() === "INPUTNUMBER" ||
                item.type.toUpperCase() === "NUMBER"
              ) {
                prop[i] = item.props
                  ? typeof item.props.defaultValue !== "undefined"
                    ? item.props.defaultValue
                    : 0
                  : 0;
              } else {
                prop[i] = item.props
                  ? typeof item.props.defaultValue !== "undefined"
                    ? item.props.defaultValue
                    : ""
                  : "";
              }
            });
          } else {
            if (
              item.type.toUpperCase() === "INPUTNUMBER" ||
              item.type.toUpperCase() === "NUMBER"
            ) {
              prop[item.key] = item.props
                ? typeof item.props.defaultValue !== "undefined"
                  ? item.props.defaultValue
                  : 0
                : 0;
            } else {
              prop[item.key] = item.props
                ? typeof item.props.defaultValue !== "undefined"
                  ? item.props.defaultValue
                  : ""
                : "";
            }
          }
        }

        if (typeof item.props === "undefined") {
          this.$set(item, "props", {});
        }
        if (typeof item.on === "undefined") {
          this.$set(item, "on", {});
        }
        if (typeof item.options === "undefined") {
          this.$set(item, "options", []);
        }
      });

      this.addCustomAddButtonKey(prop);
      this.$emit("input", this.dataClone);
    },
    // 添加_customAddButton字段
    addCustomAddButtonKey(prop) {
      if (this.newModel) {
        const obj = {
          ...prop,
          _customAddButton: true
        };
        this.dataClone.push(obj);
      }
      //  else {
      //   const obj = {
      //     ...prop,
      //     _customAddButton: false
      //   };
      //   this.dataClone.push(obj);
      // }
    },
    pushActiveRow() {
      const getColumnsKey = this.getColumnsKey();
      const obj = _.cloneDeep(this.dataClone[0]);

      for (let i in obj) {
        if (typeof obj[i] === "number") {
          obj[i] = 0;
        } else {
          obj[i] = "";
        }
      }
      Object.assign(obj, getColumnsKey);
      if (_.has(obj, "_customAddButton")) {
        delete obj["_customAddButton"];
      }
      this.dataClone.splice(-1, 0, obj);
      //this.$emit("input", this.dataClone);
    },
    addDeleteButton(item) {
      item.type = typeof item.type !== "undefined" ? item.type : [];
      item.type.push({
        key: "delete",
        value: "删除"
      });
    },
    delete(index) {
      this.dataClone.splice(index, 1);
    },
    // 对外暴露push方法  让用户可以不通过新增按钮动态的增加数据；
    push(data) {
      // 传入的是对象的话 直接替换pushIndex位置的数据   传入的是数组的时候  往pushIndex后面的位置push进数据；

      const pushIndex = this.newModel ? 2 : 1;
      if (data instanceof Object) {
        if (data instanceof Array) {
          this.dataClone.splice(-pushIndex, 1);
          this.dataClone.splice(-1, 0, ...data);
        } else {
          this.dataClone[this.dataClone.length - pushIndex] = data;
        }
      }
      this.$emit("input", this.dataClone);
    },
    // 返回没有_customAddButton的数据
    getTableData() {
      const data = _.cloneDeep(this.dataClone);
      const filterIndex = data.findIndex(item => {
        if (item._customAddButton) {
          return item;
        }
      });
      if (filterIndex > -1) {
        data.splice(filterIndex, 1);
      }
      return data;
    },

    removeData() {
      this.dataClone = [];
    },
    getColumnsKey() {
      const { columns } = this.$props;

      const obj = _.cloneDeep(columns);
      const prop = {};
      const key = obj.map(item => {
        if ("keys" in item) {
          return item.keys;
        } else {
          if (item.key !== "action") {
            return item.key;
          }
        }
      });
      const result = key.filter(item => {
        return typeof item !== "undefined";
      });
      result.forEach((item, index) => {
        if (!Array.isArray(obj[index]["type"])) {
          if (
            obj[index]["type"].toLocaleUpperCase() === "INPUTNUMBER" ||
            obj[index]["type"].toLocaleUpperCase() === "NUMBER"
          ) {
            if (Array.isArray(item)) {
              item.forEach(k => {
                prop[k] = obj[index].props
                  ? typeof obj[index].props.defaultValue !== "undefined"
                    ? obj[index].props.defaultValue
                    : 0
                  : 0;
              });
            } else {
              prop[item] = obj[index].props
                ? typeof obj[index].props.defaultValue !== "undefined"
                  ? obj[index].props.defaultValue
                  : 0
                : 0;
            }
          } else {
            if (Array.isArray(item)) {
              item.forEach(k => {
                prop[k] = obj[index].props
                  ? typeof obj[index].props.defaultValue !== "undefined"
                    ? obj[index].props.defaultValue
                    : ""
                  : "";
              });
            } else {
              prop[item] = obj[index].props
                ? typeof obj[index].props.defaultValue !== "undefined"
                  ? obj[index].props.defaultValue
                  : ""
                : "";
            }
          }
        }
      });
      return prop;
    },
    copyData(item) {
      const filter = {
        title: item.title,
        width: item.width,
        align: item.align
      };
      if (item.type === "selection") {
        filter.type = "";
      }

      return filter;
    },
    renderFilterRow(params, item) {
      if (item.filter.type.toUpperCase() === "INPUT") {
        return (
          <Input
            {...{
              props: {
                placeholder: "输入" + item.title,
                ...params.column.filterProps,
                icon: "ios-search"
              }
            }}
            value={
              params.column.filterProps
                ? params.column.filterProps.defaultValue
                  ? params.column.filterProps.defaultValue
                  : typeof this.search[item.key] === "undefined"
                  ? ""
                  : this.search[item.key]
                : typeof this.search[item.key] === "undefined"
                ? ""
                : this.search[item.key]
            }
            on={{
              input: val => {
                if (val) {
                  this.$set(this.search, item.key, val);
                } else {
                  this.$set(this, "search", {});
                  this.resetFilterSelection();
                  this.searchFilterResult();
                }
              },
              "on-enter": () => {
                this.resetFilterSelection();
                this.searchFilterResult();
              },
              "on-click": () => {
                this.resetFilterSelection();
                this.searchFilterResult();
              }
            }}
          />
        );
      }
    },
    renderFilterSelection(params, item) {
      if (item.type.toUpperCase() === "SELECTION") {
        return <Checkbox disabled style={{ margin: "0 auto" }} />;
      }
    },
    renderFilterHeaderSelection(params, item) {
      if (item.type.toUpperCase() === "SELECTION") {
        return (
          <Checkbox
            value={this.selectionAllCheckbox}
            style={{ margin: "0 auto" }}
            onOn-change={boolean => {
              if (boolean) {
                this.$set(this, "selectionAllCheckbox", true);
                this.$refs.table.selectAll(boolean);
              } else {
                this.$set(this, "selectionAllCheckbox", false);
                this.$refs.table.selectAll(boolean);
              }
            }}
          />
        );
      }
    },
    searchFilterResult() {
      const data = { ...this.search };
      this.$emit("on-search", data);
    },
    onSelectAll() {
      this.dataClone.forEach(item => {
        if (!item._disabled) {
          this.$set(item, "_checked", true);
        }
      });
      const value = this.dataClone.filter(item => {
        return !item._disabled;
      });
      this.$emit("on-selection-change", value);
    },
    onSelectAllCancel() {
      this.dataClone.forEach(item => {
        if (!item._disabled) {
          this.$set(item, "_checked", false);
        }
      });

      const value = this.dataClone.filter(item => {
        return !item._disabled;
      });
      this.$emit("on-selection-change", value);
    },
    onSelectChange(value) {
      value.forEach(val => {
        this.$set(val, "_checked", true);
      });

      const allData = this.dataClone.filter(item => {
        return !item._disabled;
      });
      if (value.length === allData.length) {
        this.$set(this, "selectionAllCheckbox", true);
      } else {
        this.$set(this, "selectionAllCheckbox", false);
      }
      this.$emit("on-selection-change", value);
    }
  },

  mounted() {
    this.renderInitAddButton();
    this.renderFilterTableColumns();
  },
  render() {
    const { columns } = this.$props;
    _.map(columns, item => {
      if (!_.has(item, "render")) {
        if (item.key === "action") {
          if (this.hasDelete) {
            this.addDeleteButton(item);
          }
          item.render = (h, params) => {
            if (params.row._customAddButton) {
              return this.addComponent(params);
            } else {
              return this.renderButton(params, item);
            }
          };
        } else {
          item.render = (h, params) => {
            return this.renderComponent(params, item);
          };
        }
      } else {
        // 当传入的数据有render字段的时候 调用方法 返回传入的render去做渲染
        return item.render;
      }
    });
    return (
      <div>
        {this.$slots.header}
        {this.filterRow ? (
          <i-table
            ref="filterTable"
            {...{ on: { ...this.$listeners } }}
            {...{ attrs: this.$attrs }}
            data={this.filters}
            columns={this.tableColumnsFilters}
          />
        ) : null}
        <i-table
          ref="table"
          show-header={this.filterRow ? false : true}
          columns={columns}
          data={this.dataClone}
          {...{ on: { ...this.$listeners } }}
          {...{ attrs: this.$attrs }}
          onOn-selection-change={this.onSelectChange}
        />
      </div>
    );
  }
};
</script>
<style lang="less" scoped>
.buttons {
  .button {
    margin-right: 10px;
    cursor: pointer;
    color: #4a90e2;
  }
}
.ivu-table .error td {
  background-color: #ff6600;
  color: #fff;
}
// .componentWrapper {

//   // width: 90%;
// }

.componentWrapper {
  margin: 10px 0;
  padding: 0;
  /deep/.ivu-table-cell {
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
  }
  /deep/.ivu-table td {
    height: 30px;
  }
  /deep/.ivu-table th {
    height: 30px;
  }
  .ivu-table .ivu-select {
    line-height: 24px;
    height: 24px;
  }
  /deep/ .ivu-card-body {
    padding: 0;
  }
}
</style>
