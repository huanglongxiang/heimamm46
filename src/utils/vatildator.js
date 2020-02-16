
// 手机验证
export const phoneChar = (rule, value, callback) => {
    if (!value) {
      return callback(new Error("请输入手机号"));
    } else {
      let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (_reg.test(value)) {
        callback();
      } else {
        callback(new Error("手机号码格式错误，请输入正确手机号"));
      }
    }
  };
// 邮箱验证
export const emailChar = (rule, value, callback) => {
    if (!value) {
      return callback(new Error("请输入邮箱"));
    } else {
      let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (_reg.test(value)) {
        callback();
      } else {
        callback(new Error("邮箱格式错误，请输入正确邮箱"));
      }
    }
  };