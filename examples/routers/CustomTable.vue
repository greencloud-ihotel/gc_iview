<template>
  <div>
    {{ customTableValue }}
    <custom-table
      :columns="columns"
      :newModel="true"
      :hasDelete="false"
      v-model="customTableValue"
      @change-click="changeHandler"
      ref="custmTable"
    ></custom-table>
    <Button @click="getData">获取数据</Button>
    <p>获取数据data:{{ columnsHanlderData }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnsHanlderData: [],
      columns: [
        {
          keys: ["salePriceName", "floorPriceName"],
          title: " ",
          type: "p"
        },
        {
          title: "售价",
          keys: ["floor", "sale"],
          type: "input"
        },
        {
          title: "BBB",
          key: "bbb",
          type: "input"
        },
        {
          title: "CCC",
          key: "ccc",
          type: "inputnumber",
          props: {
            precision: 2,
            defaultValue: 0,
            min: 0,
            max: 999
          }
        },
        {
          title: "DDD",
          key: "ddd",
          type: "inputnumber"
        },
        {
          title: "EEE",
          key: "eee",
          type: "p"
        },
        {
          title: "FFF",
          key: "fff",
          type: "p",
          render: (h, params) => {
            return <p style="color:red">{params.row.eee}</p>;
          }
        },
        {
          key: "hotelCode",
          title: "所属门店",
          align: "center",
          type: "select",
          code: "code",
          descript: "descript",
          labelInValue: true,
          options: []
        },
        {
          key: "action",
          title: "操作",
          align: "center",
          type: [
            {
              key: "change",
              value: "修改"
            }
          ]
        }
      ],
      customTableValue: [
        {
          salePriceName: "卖价",
          floorPriceName: "底价",
          floor: 999,
          sale: 1999,
          aaa: "456",
          bbb: "789",
          ccc: 1,
          ddd: 98,
          eee: "红色"
        },
        {
          salePriceName: "卖价",
          floorPriceName: "底价",
          floor: 999,
          sale: 1999,
          aaa: "45",
          bbb: "79",
          ccc: 22,
          ddd: 33,
          eee: "黑色"
        }
      ]
    };
  },
  methods: {
    getData() {
      this.columnsHanlderData = this.$refs.custmTable.getTableData();
      console.table(this.columnsHanlderData);
    },
    changeHandler(e) {
      console.log(e);
    },
    getSelectList() {
      setTimeout(() => {
        this.columns[7].options = [
          {
            code: "GCBZG",
            descript: "gcbzg"
          },
          {
            code: "GCGG",
            descript: "gcgg"
          }
        ];
        console.log(this.columns[2].options);
      }, 1000);
    }
  },
  mounted() {
    this.getSelectList();
  }
};
</script>
