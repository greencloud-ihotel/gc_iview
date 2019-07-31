<script>
import _ from "lodash";
export default {
  props: {
    value: {
      required: true
    },
    item: {
      required: true
    }
  },
  computed: {
    submitForm: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  render() {
    const val = this.item;
    return (
      <div>
        {val.render ? (
          val.render(val)
        ) : (
          <Input
            type="text"
            placeholder={val.placeholder}
            value={_.get(this.submitForm, val.key)}
            onInput={inputVal => {
              const newVal = _.set(this.submitForm, val.key, inputVal);
              this.submitForm = _.assign({}, newVal);
            }}
          >
            {val.icon ? <Icon type={val.icon} slot="prepend"></Icon> : null}
          </Input>
        )}
      </div>
    );
  }
};
</script>
