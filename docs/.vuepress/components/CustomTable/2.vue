<template>
  <div>
    <custom-table :columns="columns"
                  ref="customTable"
                  :newModel='false'
                  :filterRow="true"
                  v-model="data"
                  @on-search="search"></custom-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "姓名",

          type: "input",
          key: "name",
          align: "center",
          props: {},
          filter: {
            type: "input"
          }
        },
        {
          title: "性别",

          type: "select",
          key: "sex",
          align: "center",
          options: [
            {
              descript: "男",
              code: "1"
            },
            {
              descript: "女",
              code: "2"
            }
          ],
          filter: {
            type: "input"
          },
          code: "code",
          descript: "descript",
          props: {}
        },

        {
          title: "操作",
          align: "left",
          width: 120,
          key: "action"
        }
      ],
      data: [
        {
          name: "张三",
          sex: "1"
        },
        {
          name: "李雷",
          sex: "1"
        },
        {
          name: "韩梅梅",
          sex: "2"
        }
      ],
      orginalData: []
    };
  },
  computed: {
    filterData: {
      get() {
        const data = this.data.filter(item => {
          let sex = "";
          const findSexDesc = this.columns[1].options.find(sex => {
            return item.sex === sex.code;
          });
          if (findSexDesc) {
            sex = findSexDesc.descript;
          }
          return (
            item["name"].indexOf(
              this.searchData["name"] ? this.searchData["name"] : ""
            ) > -1 &&
            sex.indexOf(this.searchData["sex"] ? this.searchData["sex"] : "") >
              -1
          );
        });

        return data;
      },
      set(val) {
        console.log(val);
        // this.data = val;
      }
    }
  },
  methods: {
    search(data) {
      if (Object.getOwnPropertyNames(data).length) {
        this.orginalData = [...this.data];
        let sex = "";
        this.data = this.data.filter(item => {
          const findSexDesc = this.columns[1].options.find(sex => {
            return item.sex === sex.code;
          });
          if (findSexDesc) {
            sex = findSexDesc.descript;
          }
          return (
            item["name"].indexOf(data["name"]) > -1 &&
            item["sex"].indexOf(data["sex"])
          );
        });
      } else {
        this.data = this.orginalData;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>