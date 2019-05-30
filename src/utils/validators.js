export default {
  install (Vue) {
    Vue.prototype.$validators = {
      required (opt = {}) {
        return Object.assign({ required: true, message: '不允许为空', trigger: 'blur' }, opt)
      },
      minValue (minValue, canEqual = true) {
        return function (rule, value, callback) {
          if (value === undefined || value === '') {
            callback()
          } else if (isNaN(Number(value).toFixed(5))) {
            callback(new Error('请输入纯数字'))
          } else if (value <= minValue) {
            if (canEqual && value !== minValue) {
              callback(new Error(`数字必须大于等于 ${minValue}`))
            } else {
              callback(new Error(`数字必须大于 ${minValue}`))
            }
          } else {
            callback()
          }
        }
      },
      maxValue (maxValue, canEqual = true) {
        return function (rule, value, callback) {
          if (value > maxValue) {
            if (!canEqual && value === maxValue) {
              callback(new Error(`数字必须小于等于${maxValue}`))
            } else {
              callback(new Error(`数字必须小于${maxValue}`))
            }
          }
          callback()
        }
      },
      mobile (options) {
        function phoneValidator (rule, value, callback) {
          if (!(value && value.match(/^1\d{10}$/))) {
            callback(new Error('手机号格式不正确'))
          }
          callback()
        }
        return Object.assign({ validator: phoneValidator, message: '请输入手机号格式', trigger: 'blur' }, options)
      },
      number (options) {
        function phoneValidator (rule, value, callback) {
          if (!(value && value.match(/^-?[0-9]\d*$/))) {
            callback(new Error('要求整数'))
          }
          callback()
        }
        return Object.assign({ validator: phoneValidator, message: '要求整数', trigger: 'blur' }, options)
      },
      people (options) {
        function phoneValidator (rule, value, callback) {
          if (!(value && value.match(/^[1-9]\d*$/))) {
            callback(new Error('要求正整数'))
          }
          callback()
        }
        return Object.assign({ validator: phoneValidator, message: '要求正整数', trigger: 'blur' }, options)
      },
      email (opt = {required: false}) {
        return Object.assign({ type: 'email', message: '请输入正确邮箱格式', trigger: 'blur' }, opt)
      }
    }
  }
}
