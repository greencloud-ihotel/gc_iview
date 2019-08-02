const mobile = {
  pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
  message: "手机号不正确"
};
const card = {
  pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
  message: "身份证号码不正确"
};
const zipCode = { pattern: /^[1-9]\d{5}(?!\d)$/, message: "邮政编码不正确" };

export default {
  mobile,
  card,
  zipCode
};
