<script>
export default {
  name: "AutoFormInner",
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
  methods: {},
  render(h) {
    const {
      type = "Input",
      on = {},
      options = [],
      option = {},
      props = {},
      render,
      scopedSlots = {},
      attrs = {},
      label,
      key
    } = this.item;
    const { labelInValue = true } = props;
    const componentJSXProps = { ...this.item };
    const value = this.submitForm[key];
    delete componentJSXProps[scopedSlots];
    console.log(this.item.scopedSlots);
    let tagName = type;
    Object.keys(iview).forEach(name => {
      if (
        Object.prototype.toString.call(iview[name]) === "[object Object]" &&
        iview[name].name
      ) {
        if (name.toUpperCase() === type.toUpperCase()) {
          tagName = iview[name].name;
        }
      }
    });
    if (render) {
      return render.call(this, h, this.item);
    } else {
      return (
        <tagName
          {...{
            ...this.componentJSXProps,
            props: {
              placeholder: label,
              clearable: true,
              filterable: true,
              labelInValue,
              ...props
            },
            attrs: {
              value,
              ...attrs
            },
            on: {
              input: value => {
                this.submitForm[key] = value;
              },
              ...on
            }
          }}
        >
          {tagName === "iSelect"
            ? options.map(value => {
                return (
                  <i-option
                    key={value[option.code || "value"]}
                    value={value[option.code || "value"]}
                  >
                    {value[option.label || "label"]}

                    {labelInValue
                      ? `( ${value[option.code || "value"]})`
                      : null}
                  </i-option>
                );
              })
            : null}

          {Object.keys(scopedSlots).map(name => {
            const content = scopedSlots[name].call(this, h, props);
            if (content) {
              content.data.slot = name;
            }
            return content;
          })}
        </tagName>
      );
    }
  }
};
</script>
