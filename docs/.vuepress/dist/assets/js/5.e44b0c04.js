(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{445:function(e,t,a){"use strict";a.r(t);var r={data:function(){return{autoForm:{submitForm:{},fields:[{key:"gg",label:"gg",type:"datepicker",validators:[{required:!0,message:"Please select the date",trigger:"blur"}]},{key:"a3.cc",type:"input",label:"a3.cc",validators:[{validator:function(e,t,a){""===t?a(new Error("Please enter your password")):a()},trigger:"blur"},{type:"url",trigger:"blur"}]},{key:"name2",type:"select",label:"name2:",options:[{label:"dddd",value:"aaa"},{label:"2d22",value:"aaddda"}]}]}}},methods:{handleSubmit:function(){var e=this;this.$refs.form.validate((function(t){t?e.$Message.success("Success!"):e.$Message.error("Fail!")}))},handleReset:function(){this.$refs.form.resetFields()}}},s=a(3),o=Object(s.a)(r,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contain"},[a("auto-form",{ref:"form",attrs:{fields:e.autoForm.fields,row:2},model:{value:e.autoForm.submitForm,callback:function(t){e.$set(e.autoForm,"submitForm",t)},expression:"autoForm.submitForm"}}),e._v(" "),a("i-button",{on:{click:e.handleSubmit}},[e._v("保存")]),e._v(" "),a("i-button",{on:{click:e.handleReset}},[e._v("复位")])],1)}),[],!1,null,null,null);t.default=o.exports}}]);