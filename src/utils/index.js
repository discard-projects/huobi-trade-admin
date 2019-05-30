import formData from './formData'
import validators from './validators'
export default {
  install (Vue) {
    Vue.use(validators)
    Vue.prototype.utils = {
      transToFormData: formData.transToFormData
    }
  }
}
