function _transToFormData (fd, data, previousKey = '') {
  // if (this.form instanceof Object) {}
  Object.keys(data).forEach(key => {
    const value = data[key]
    if (value instanceof Object && !(value instanceof Array) && !(value instanceof File)) {
      return this._transToFormData(fd, value, key)
    }
    if (previousKey) {
      key = `${previousKey}[${key}]`
    }
    if (Array.isArray(value)) {
      value.forEach(val => {
        fd.append(`${key}[]`, val)
      })
    } else {
      if (value || value === false || value === '') {
        fd.append(key, value)
      }
    }
  })
}
export default {
  transToFormData (form = this.form) {
    let fd = new FormData()
    _transToFormData(fd, form)
    return fd
  }
}
