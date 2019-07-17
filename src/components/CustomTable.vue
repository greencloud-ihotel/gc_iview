<script>
import _ from "lodash";
import { InputNumber } from "iview";
export default {
  name: "CustomTable",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
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
    }
  },
  data() {
    return {
      dataClone: this.value,
      isInitSuccess: false
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val.length) {
          //if (this.isInitSuccess) {
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
        } else {
          this.removeData();
          this.addCustomAddButtonKey(this.getColumnsKey());
        }
      },
      deep: true
    }
  },
  methods: {
    // ‘新增’按钮组件
    addComponent(params) {
      return (
        <span
          style={{
            marginRight: "10px",
            cursor: "pointer",
            color: "#4a90e2"
          }}
          onClick={() => {
            this.pushActiveRow(params);
            this.$emit("add-click");
          }}
        >
          {"新增"}
        </span>
      );
    },
    buttonComponent(params, item, key, button) {
      return (
        <span
          style={{
            marginRight: "10px",
            cursor: "pointer",
            color: "#4a90e2"
          }}
          onClick={() => {
            if (button.key === "delete") {
              this.delete(params.index);
            }

            this.$emit(`${button.key}-click`, [button.key, params]);
          }}
        >
          {button["value"]}
        </span>
      );
    },
    inputComponent(params, item, key) {
      return (
        <i-input
          {...{ props: params.column.props }}
          value={params.row[key]}
          onInput={value => {
            params.row[key] = value;
            this.dataClone[params.index] = params.row;
            this.$emit("input", this.dataClone);
          }}
        />
      );
    },
    linkComponent(params, item, key) {
      return (
        <a
          href="javascript:;"
          onClick={() => {
            this.$emit("link-click", [params, item, key]);
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
      return (
        <i-select
          {...{ props: params.column.props }}
          value={params.row[key]}
          clearable
          filterable
          onOn-change={value => {
            //const { label, value } = valueLabel;
            params.row[key] = value;
            this.dataClone[params.index] = params.row;
            this.$emit("input", this.dataClone);

            this.$emit("select-on-change", [key, value, params]);
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
      let value;
      if (
        typeof params.column.props !== "undefined" &&
        typeof params.column.props.defaultValue !== "undefined"
      ) {
        if (key in params.row) {
          value = params.column.props.defaultValue;
        } else {
          value = null;
        }
      } else if (typeof params.row[key] !== "undefined") {
        if (key in params.row) {
          value = params.row[key];
        } else {
          value = null;
        }
      } else {
        value = null;
      }

      return (
        <InputNumber
          {...{ props: params.column.props }}
          value={value}
          onInput={value => {
            params.row[key] = value;
            this.dataClone[params.index] = params.row;
            this.$emit("input", this.dataClone);
            this.$emit("change-number", [item, value]);
          }}
        />
      );
    },
    textComponent(params, item, key) {
      return (
        <p
          {...{ props: params.column.props }}
          onClick={() => {
            this.$emit("text-click", [params, item, key]);
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
    renderInitAddButton() {
      const { columns } = this.$props;
      const prop = {};
      _.map(columns, item => {
        if (item.key !== "action") {
          item.type = item.type ? item.type : "";
          if (item.key instanceof Array) {
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
      });

      this.addCustomAddButtonKey(prop);
      this.$emit("input", this.dataClone);
      // nextTick 在下次事件循环的时候设置初始化状态已经完成
      //this.$nextTick(() => {
      //this.isInitSuccess = true;
      //});
    },
    // 添加_customAddButton字段
    addCustomAddButtonKey(prop) {
      if (this.newModel) {
        const obj = {
          ...prop,
          _customAddButton: true
        };
        this.dataClone.push(obj);
      } else {
        const obj = {
          ...prop,
          _customAddButton: false
        };
        this.dataClone.push(obj);
      }
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
      this.$emit("input", this.dataClone);
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
    onSelectChange(val) {
      this.$emit("on-selection-change", val);
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

      // const result = [].concat(...key).filter(item => {
      //   return typeof item !== "undefined";
      // });

      const result = key.filter(item => {
        return typeof item !== "undefined";
      });
      result.forEach((item, index) => {
        if (!(obj[index]["type"] instanceof Array)) {
          if (
            obj[index]["type"].toLocaleUpperCase() === "INPUTNUMBER" ||
            obj[index]["type"].toLocaleUpperCase() === "NUMBER"
          ) {
            if (item instanceof Array) {
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
            if (item instanceof Array) {
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
    }
  },
  activated() {},
  mounted() {
    this.renderInitAddButton();
  },
  render() {
    const { columns } = this.$props;
    _.map(columns, item => {
      if (!_.has(item, "render")) {
        if (item.key !== "action") {
          item.render = (h, params) => {
            return this.renderComponent(params, item);
          };
        } else {
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
        }
      } else {
        // 当传入的数据有render字段的时候 调用方法 返回传入的render去做渲染
        item.columnRender = (h, params) => {
          return item.render(h, params);
        };
      }
    });

    return (
      <div>
        {this.$slots.header}
        <i-table
          border={this.border}
          loading={this.loading}
          columns={columns}
          data={this.dataClone}
          {...this.$attrs}
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
.componentWrapper {
  margin: 10px 0;
  width: 90%;
}

// .componentWrapper {
//   padding: 0;
//   /deep/.ivu-table-cell {
//     padding: 0 5px;
//     height: 30px;
//     line-height: 30px;
//   }
//   /deep/.ivu-table td {
//     height: 30px;
//   }
//   /deep/.ivu-table th {
//     height: 30px;
//   }
//   .ivu-table .ivu-select {
//     line-height: 24px;
//     height: 24px;
//   }
//   /deep/ .ivu-card-body {
//     padding: 0;
//   }
// }
</style>

<script>
import _ from "lodash";
import { InputNumber } from "iview";
export default {
  name: "CustomTable",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
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
    precision: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      dataClone: this.value,
      isInitSuccess: false
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
      },
      deep: true
    }
  },
  methods: {
    // ‘新增’按钮组件
    addComponent(params) {
      return (
        <span
          style={{
            marginRight: "10px",
            cursor: "pointer",
            color: "#4a90e2"
          }}
          onClick={() => {
            this.pushActiveRow(params);
            this.$emit("add-click");
          }}
        >
          {"新增"}
        </span>
      );
    },
    buttonComponent(params, item, key, button) {
      return (
        <span
          style={{
            marginRight: "10px",
            cursor: "pointer",
            color: "#4a90e2"
          }}
          onClick={() => {
            if (button.key === "delete") {
              this.delete(params.index);
            }

            this.$emit(`${button.key}-click`, [button.key, params]);
          }}
        >
          {button["value"]}
        </span>
      );
    },
    inputComponent(params, item, key) {
      return (
        <i-input
          {...{ props: params.column.props }}
          value={params.row[key]}
          onInput={value => {
            params.row[key] = value;
            this.dataClone[params.index] = params.row;
            this.$emit("input", this.dataClone);
          }}
        />
      );
    },
    linkComponent(params, item, key) {
      return (
        <a
          href="javascript:;"
          onClick={() => {
            this.$emit("link-click", [params, item, key]);
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

      return (
        <i-select
          {...{ props: params.column.props }}
          value={params.row[key]}
          clearable
          filterable
          transfer={true}
          label-in-value={params.column.labelInValue}
          onOn-change={target => {
            if (target) {
              let value = params.column.labelInValue ? target.value : target;
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
            } else {
              params.row[key] = "";
              this.dataClone[params.index] = params.row;
              this.$emit("input", this.dataClone);
            }
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
      if (
        typeof params.column.props !== "undefined" &&
        typeof params.column.props.defaultValue !== "undefined"
      ) {
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

      return (
        <InputNumber
          {...{ props: params.column.props }}
          value={value}
          active-change={false}
          onInput={value => {
            params.row[key] = value;
            this.dataClone[params.index] = params.row;
            this.$emit("input", this.dataClone);
            this.$emit("change-number", [item, value]);
          }}
          // onOn-blur={() => {
          //   this.$set(
          //     this.dataClone[params.index],
          //     key,
          //     value.toString().match(/^\d+(?:\.\d{0,2})?/)[0] - 0
          //   );
          //   console.log(this.dataClone[params.index]);
          //   this.$nextTick(() => {
          //     this.$emit("input", this.dataClone);
          //     this.$forceUpdate();
          //   });
          // }}
        />
      );
    },
    textComponent(params, item, key) {
      return (
        <p
          {...{ props: params.column.props }}
          onClick={() => {
            this.$emit("text-click", [params, item, key]);
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
    renderInitAddButton() {
      const { columns } = this.$props;
      const prop = {};
      _.map(columns, item => {
        if (item.key !== "action") {
          item.type = item.type ? item.type : "";
          if (item.key instanceof Array) {
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
    onSelectChange(val) {
      this.$emit("on-selection-change", val);
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

      // const result = [].concat(...key).filter(item => {
      //   return typeof item !== "undefined";
      // });

      const result = key.filter(item => {
        return typeof item !== "undefined";
      });
      result.forEach((item, index) => {
        if (!(obj[index]["type"] instanceof Array)) {
          if (
            obj[index]["type"].toLocaleUpperCase() === "INPUTNUMBER" ||
            obj[index]["type"].toLocaleUpperCase() === "NUMBER"
          ) {
            if (item instanceof Array) {
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
            if (item instanceof Array) {
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
    onRowDblclick(item, index) {
      this.$emit("on-row-dblclick", [item, index]);
    },
    onRowClick(item, index) {
      this.$emit("on-row-click", [item, index]);
    }
  },
  activated() {},
  mounted() {
    this.renderInitAddButton();
  },
  render() {
    const { columns } = this.$props;
    _.map(columns, item => {
      if (!_.has(item, "render")) {
        if (item.key !== "action") {
          item.render = (h, params) => {
            return this.renderComponent(params, item);
          };
        } else {
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
        }
      } else {
        // 当传入的数据有render字段的时候 调用方法 返回传入的render去做渲染
        item.columnRender = (h, params) => {
          return item.render(h, params);
        };
      }
    });

    return (
      <div>
        {this.$slots.header}
        <i-table
          border={this.border}
          loading={this.loading}
          columns={columns}
          data={this.dataClone}
          {...{ attrs: this.$attrs }}
          onOn-row-dblclick={this.onRowDblclick}
          onOn-row-click={this.onRowClick}
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
