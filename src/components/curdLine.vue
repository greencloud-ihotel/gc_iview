<script>
import { Form, FormItem, Input, Icon } from "iview";
import _ from "lodash";
export default {
  data() {
    return {
      user: ""
    };
  },
  props: ["value", "columns"],
  methods: {
    create() {
      let obj = {};
      _.map(this.columns, val => {
        obj[val["key"]] = "";
      });
      this.value.push(obj);
    },
    delete(item) {
      this.value.splice(_.indexOf(this.value, item), 1);
    }
  },
  render(h) {
    return (
      <div class="curdLine">
        <Form inline>
          <ul>
            {_.map(this.value, val => {
              return (
                <li class="line">
                  {_.map(this.columns, item => {
                    return (
                      <FormItem class="formItem" label={`${item.label}:`}>
                        {_.has(item, "render") ? (
                          item.render(h, val)
                        ) : (
                          <Input
                            type="text"
                            value={val[item.key]}
                            placeholder={item.label}
                            onInput={value => {
                              this.$set(val, item.key, value);
                            }}
                          />
                        )}
                      </FormItem>
                    );
                  })}

                  <Icon
                    type="ios-close-circle"
                    class="icon"
                    onClick={() => {
                      this.delete(val);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </Form>
        <Icon class="icon" onClick={this.create} type="md-add-circle" />
      </div>
    );
  }
};
</script>

<style lang="less" scoped>
.curdLine {
  .icon {
    font-size: 26px;
    cursor: pointer;
  }
  .line {
    display: flex;
    .formItem {
      display: flex;
      flex: 1;
    }
    .icon {
      margin-top: 3px;
    }
  }
}
</style>
