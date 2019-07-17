<script>
import _ from "lodash";
import { InputNumber } from "iview";
export default {
  name: "EditTable",
  props: ["columns", "data", "type", "isEdit", "buttons", "autoSave"],
  data() {
    return {
      tableData: !_.isEmpty(this.data) ? _.cloneDeep(this.data) : [],
      isPush: false,
      addRowNumber: 0
    };
  },
  methods: {
    cellClickHandler(params) {
      this.$emit("cell-click", params);
    },
    updateSelf(value, isNew) {
      this.tableData = _.cloneDeep(value);
      if (
        (isNew && !_.has(_.last(value), "_isUsed")) ||
        (isNew &&
          _.has(_.last(value), "_isUsed") &&
          _.find(_.last(value), "_isUsed"))
      ) {
        this.isPush = false;
        this.createObject(this.addRowNumber);
      }
    },
    update() {
      this.$emit("update:data", Object.assign([], this.tableData));
    },
    renderType(params, val) {
      if (_.has(val, "keys")) {
        let arr = [];
        _.map(val.keys, item => {
          arr.push(
            <div class="innerType">{this.renderOnce(params, val, item)}</div>
          );
        });
        return arr;
      } else {
        return this.renderOnce(params, val, val.key);
      }
    },
    renderOnce(params, val, key) {
      let render;
      const input = (value, params) => {
        params.row[key] = value;
        this.tableData[params.row._index] = params.row;
        if (this.isEdit || this.autoSave) {
          this.update();
        }
      };
      switch (val.type) {
        case "select":
          render = (
            <i-select
              {...{ props: val.props }}
              value={params.row[key]}
              clearable
              onInput={value => {
                input(value, params);
              }}
            >
              {_.map(val.options, item => {
                let optionKey = val.optionKey ? val.optionKey : key;
                return _.isEmpty(item[optionKey]) ? null : (
                  <i-option value={item[optionKey]}>
                    {item.label || item.descript || item.title}
                  </i-option>
                );
              })}
            </i-select>
          );
          break;
        case "number":
          render = (
            <InputNumber
              min={0}
              max={999999999}
              {...{ props: val.props }}
              value={params.row[key]}
              onInput={value => {
                input(value, params);
              }}
            />
          );
          break;
        case "p":
          render = (
            <p
              onClick={() => {
                console.log("a");
              }}
            >
              {params.row[key]}
            </p>
          );
          break;
        default:
          render = (
            <i-input
              {...{ props: val.props }}
              value={params.row[key]}
              onInput={value => {
                input(value, params);
              }}
            />
          );
          break;
      }
      return render;
    },
    renderDesc(params, val) {
      let defaultValue = {};
      if (val.options) {
        defaultValue = _.find(val.options, item => {
          return params.row[val.key] == item[val.optionKey];
        });
      }
      if (_.has(val, "keys")) {
        let arr = [];
        _.map(val.keys, item => {
          arr.push(<div class="innerType">{params.row[item]}</div>);
        });
        return arr;
      } else {
        return _.get(defaultValue, val.labelKey) || params.row[val.key];
      }
    },
    createObject(num, _isUsed) {
      const { columns, type } = this.$props;
      if (type == "new" && !this.isPush) {
        //如果是新增一条
        let obj = {};
        _.map(columns, val => {
          if (val.key != "action") {
            if (_.has(val, "key")) {
              obj[val.key] = null;
            } else if (_.has(val, "keys")) {
              _.map(val.keys, key => {
                obj[key] = null;
              });
            }
          }
        });
        if (_.isEmpty(this.tableData)) {
          obj.isEdit = true;
        }
        obj["_num"] = num;
        obj["_isUsed"] = _isUsed ? _isUsed : false;
        this.tableData.push(obj);
        this.isPush = true;
      }
    },
    setAddRowNumber(val) {
      this.addRowNumber = val;
    }
  },

  render() {
    const { columns } = this.$props;

    this.createObject(this.addRowNumber);

    _.map(columns, val => {
      if (!_.has(val, "render")) {
        val.render = (h, params) => {
          if (this.isEdit) {
            params.row.isEdit = true;
          }
          return val.key == "action" ? (
            <div class="buttons">
              {val.buttons && !_.includes(val.buttons, "edit") ? null : (
                <span
                  class="button"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    if (_.get(params.row, "isEdit")) {
                      //如果是确定
                      //如果是增加一行
                      if (params.row._num === this.addRowNumber) {
                        this.isPush = false;
                        this.addRowNumber += 1;
                        this.createObject(this.addRowNumber);
                      }
                      this.$emit("check", params, this.tableData);
                    }
                    this.$set(this.tableData, params.row._index, {
                      ...params.row,
                      isEdit: !params.row.isEdit,
                      _isUsed: true
                    });
                    this.update();
                  }}
                >
                  {params.row.isEdit ? "确定" : "编辑"}
                </span>
              )}
              {(val.buttons && !_.includes(val.buttons, "delete")) ||
              params.row._num == this.addRowNumber ? null : (
                <span
                  class="button"
                  onClick={() => {
                    this.tableData.splice(params.row._index, 1);
                    this.$emit("delete", params, this.tableData);
                    this.update();
                  }}
                >
                  删除
                </span>
              )}
            </div>
          ) : params.row.isEdit ? (
            this.renderType(params, val)
          ) : (
            <span
              onClick={() => {
                this.cellClickHandler(params);
              }}
              class={params.row.isError ? "error" : ""}
            >
              {this.renderDesc(params, val)}
            </span>
          );
        };
      }
    });
    return (
      <div class="buttons">
        <i-table columns={columns} data={this.tableData} {...this.$arrts} />
      </div>
    );
  }
};
</script>

<style lang="less">
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
.innerType {
  margin: 10px 0;
  width: 90%;
}
</style>
